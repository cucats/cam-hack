<script>
  import { onMount } from "svelte";
  import * as THREE from "three";

  let host;

  onMount(() => {
    if (!host) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(48, 1, 0.01, 80);
    camera.position.set(0, 0.2, 7.2);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(2, window.devicePixelRatio || 1));
    renderer.setClearAlpha(0);
    host.appendChild(renderer.domElement);

    const root = new THREE.Group();
    scene.add(root);

    const palette = {
      a: new THREE.Color("#22c55e"),
      b: new THREE.Color("#86e293"),
      c: new THREE.Color("#86e6c6"),
      d: new THREE.Color("#7c3aed"),
    };

    const fog = new THREE.FogExp2("#071510", 0.12);
    scene.fog = fog;

    const ambient = new THREE.AmbientLight("#c7ffd7", 0.55);
    scene.add(ambient);

    const key = new THREE.DirectionalLight("#d9fff0", 1.1);
    key.position.set(3.5, 4.5, 4);
    scene.add(key);

    const rim = new THREE.DirectionalLight("#86e6c6", 0.8);
    rim.position.set(-5, 1.6, -2);
    scene.add(rim);

    const torusGeo = new THREE.TorusKnotGeometry(1.1, 0.34, 220, 28, 2, 3);
    const torusMat = new THREE.MeshPhysicalMaterial({
      color: palette.a,
      roughness: 0.25,
      metalness: 0.12,
      transmission: 0.45,
      thickness: 0.9,
      ior: 1.35,
      clearcoat: 0.9,
      clearcoatRoughness: 0.15,
      sheen: 0.35,
      sheenColor: palette.c,
      emissive: palette.d,
      emissiveIntensity: 0.06,
    });
    const knot = new THREE.Mesh(torusGeo, torusMat);
    knot.position.set(-0.35, 0.1, 0);
    root.add(knot);

    const haloGeo = new THREE.RingGeometry(1.65, 2.45, 128);
    const haloMat = new THREE.MeshBasicMaterial({
      color: palette.c,
      transparent: true,
      opacity: 0.22,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const halo = new THREE.Mesh(haloGeo, haloMat);
    halo.rotation.x = Math.PI / 2;
    halo.position.set(0.8, 0.06, -0.35);
    root.add(halo);

    const count = 9000;
    const positions = new Float32Array(count * 3);
    const seeds = new Float32Array(count);
    const colors = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const r = Math.pow(Math.random(), 0.6) * 14.5;
      const t = Math.random() * Math.PI * 2;
      const p = (Math.random() - 0.5) * Math.PI;
      const x = Math.cos(t) * Math.cos(p) * r;
      const y = Math.sin(p) * r * 0.55;
      const z = Math.sin(t) * Math.cos(p) * r;
      positions[i * 3 + 0] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
      seeds[i] = Math.random();
      const mix = Math.random();
      const col =
        mix < 0.55
          ? palette.b.clone().lerp(palette.c, mix * 1.4)
          : palette.a.clone().lerp(palette.d, (mix - 0.55) * 1.6);
      colors[i * 3 + 0] = col.r;
      colors[i * 3 + 1] = col.g;
      colors[i * 3 + 2] = col.b;
    }

    const starGeo = new THREE.BufferGeometry();
    starGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    starGeo.setAttribute("aSeed", new THREE.BufferAttribute(seeds, 1));
    starGeo.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const uniforms = {
      uTime: { value: 0 },
      uPointer: { value: new THREE.Vector2(0, 0) },
      uScroll: { value: 0 },
    };

    const starMat = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      vertexColors: true,
      uniforms,
      vertexShader: `
        uniform float uTime;
        uniform vec2 uPointer;
        uniform float uScroll;
        attribute float aSeed;
        varying vec3 vColor;
        varying float vAlpha;
        float hash(float n){ return fract(sin(n)*43758.5453123); }
        void main() {
          vec3 p = position;
          float t = uTime * 0.22;
          float w = sin(t + aSeed * 6.2831) * 0.55 + cos(t * 0.7 + aSeed * 12.0) * 0.25;
          float swirl = (p.x * 0.03 + p.z * 0.03) + uScroll * 0.002;
          float ang = swirl + w * 0.12;
          float cs = cos(ang);
          float sn = sin(ang);
          p.xz = mat2(cs, -sn, sn, cs) * p.xz;
          vec2 pointer = uPointer * vec2(2.0, 1.4);
          float pull = exp(-length(p.xz * 0.08 - pointer) * 2.2);
          p.y += (pull - 0.2) * 0.9;
          p.x += pointer.x * pull * 1.4;
          p.z += pointer.y * pull * 1.4;
          vec4 mv = modelViewMatrix * vec4(p, 1.0);
          float size = mix(0.8, 4.6, hash(aSeed * 19.13)) * (1.0 + pull * 1.5);
          gl_PointSize = size * (350.0 / -mv.z);
          gl_Position = projectionMatrix * mv;
          vColor = color;
          vAlpha = clamp(0.25 + pull * 0.9, 0.0, 1.0);
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        varying float vAlpha;
        void main() {
          vec2 uv = gl_PointCoord - 0.5;
          float r = length(uv);
          float glow = exp(-r * 7.0);
          float core = smoothstep(0.16, 0.0, r);
          float a = (glow + core) * vAlpha;
          vec3 col = vColor * (0.55 + glow * 1.25);
          gl_FragColor = vec4(col, a);
        }
      `,
    });

    const stars = new THREE.Points(starGeo, starMat);
    stars.position.set(0.2, -0.2, -2.5);
    root.add(stars);

    let raf = 0;
    let w = 1;
    let h = 1;
    const pointer = new THREE.Vector2(0, 0);
    const pointerTarget = new THREE.Vector2(0, 0);

    const resize = () => {
      const rect = host.getBoundingClientRect();
      w = Math.max(1, Math.floor(rect.width));
      h = Math.max(1, Math.floor(rect.height));
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h, false);
    };

    const ro = new ResizeObserver(resize);
    ro.observe(host);
    resize();

    const onPointer = (e) => {
      const rect = host.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      pointerTarget.set((x - 0.5) * 0.8, (0.5 - y) * 0.8);
    };

    const onLeave = () => {
      pointerTarget.set(0, 0);
    };

    host.addEventListener("pointermove", onPointer, { passive: true });
    host.addEventListener("pointerleave", onLeave, { passive: true });

    const clock = new THREE.Clock();

    const tick = () => {
      raf = requestAnimationFrame(tick);
      const t = clock.getElapsedTime();
      pointer.lerp(pointerTarget, 0.08);
      uniforms.uTime.value = t;
      uniforms.uPointer.value.copy(pointer);
      uniforms.uScroll.value = window.scrollY || 0;

      knot.rotation.y = t * 0.35;
      knot.rotation.x = Math.sin(t * 0.35) * 0.18;
      knot.position.y = 0.12 + Math.sin(t * 0.65) * 0.12;

      halo.rotation.z = t * 0.18;
      halo.material.opacity = 0.15 + 0.1 * (0.5 + 0.5 * Math.sin(t * 0.9));

      root.rotation.y = pointer.x * 0.55;
      root.rotation.x = pointer.y * 0.35;

      camera.position.x = pointer.x * 0.45;
      camera.position.y = 0.2 + pointer.y * 0.35;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };

    tick();

    return () => {
      cancelAnimationFrame(raf);
      host.removeEventListener("pointermove", onPointer);
      host.removeEventListener("pointerleave", onLeave);
      ro.disconnect();
      renderer.dispose();
      torusGeo.dispose();
      haloGeo.dispose();
      torusMat.dispose();
      haloMat.dispose();
      starGeo.dispose();
      starMat.dispose();
      if (renderer.domElement.parentNode) renderer.domElement.parentNode.removeChild(renderer.domElement);
    };
  });
</script>

<div bind:this={host} class="three-host" aria-hidden="true"></div>

<style>
  .three-host {
    position: absolute;
    inset: 0;
    overflow: hidden;
    pointer-events: auto;
  }

  .three-host :global(canvas) {
    width: 100%;
    height: 100%;
    display: block;
  }
</style>
