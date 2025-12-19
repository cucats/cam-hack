<script>
  import { onDestroy, onMount } from "svelte";

  let canvas;

  let raf = 0;
  let cleanup = () => {};

  onMount(async () => {
    const reduceMq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduceMq.matches) return;

    const THREE = await import("three");
    const { EffectComposer } = await import(
      "three/examples/jsm/postprocessing/EffectComposer.js"
    );
    const { RenderPass } = await import(
      "three/examples/jsm/postprocessing/RenderPass.js"
    );
    const { UnrealBloomPass } = await import(
      "three/examples/jsm/postprocessing/UnrealBloomPass.js"
    );

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio ?? 1, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(50, 1, 0.01, 200);
    camera.position.set(0, 0.1, 5.25);

    const group = new THREE.Group();
    scene.add(group);

    const ambient = new THREE.AmbientLight(0xffffff, 0.55);
    scene.add(ambient);

    const key = new THREE.DirectionalLight(0xb8ffd9, 1.15);
    key.position.set(3, 3, 2);
    scene.add(key);

    const rim = new THREE.DirectionalLight(0x00ff88, 0.7);
    rim.position.set(-4, 1, -3);
    scene.add(rim);

    const knot = new THREE.Mesh(
      new THREE.TorusKnotGeometry(1.25, 0.3, 520, 22),
      new THREE.MeshStandardMaterial({
        color: 0x08190f,
        emissive: 0x1bff88,
        emissiveIntensity: 0.55,
        metalness: 0.8,
        roughness: 0.18,
      })
    );
    knot.position.set(0, 0.15, 0);
    group.add(knot);

    const halo = new THREE.Mesh(
      new THREE.TorusGeometry(1.85, 0.018, 16, 520),
      new THREE.MeshBasicMaterial({
        color: 0x38ff9a,
        transparent: true,
        opacity: 0.65,
        blending: THREE.AdditiveBlending,
      })
    );
    halo.rotation.x = Math.PI * 0.5;
    halo.position.set(0, 0.12, 0);
    group.add(halo);

    const pointCount = 3600;
    const base = new Float32Array(pointCount * 3);
    const positions = new Float32Array(pointCount * 3);
    const colors = new Float32Array(pointCount * 3);

    const cA = new THREE.Color("#35f28e");
    const cB = new THREE.Color("#86e6c6");

    for (let i = 0; i < pointCount; i++) {
      const i3 = i * 3;
      const r = Math.pow(Math.random(), 0.55) * 6.5;
      const a = Math.random() * Math.PI * 2;
      const y = (Math.random() - 0.5) * 3.2;

      base[i3 + 0] = Math.cos(a) * r;
      base[i3 + 1] = y;
      base[i3 + 2] = Math.sin(a) * r;

      positions[i3 + 0] = base[i3 + 0];
      positions[i3 + 1] = base[i3 + 1];
      positions[i3 + 2] = base[i3 + 2];

      const mix = Math.random();
      const col = cA.clone().lerp(cB, mix);
      colors[i3 + 0] = col.r;
      colors[i3 + 1] = col.g;
      colors[i3 + 2] = col.b;
    }

    const pointsGeo = new THREE.BufferGeometry();
    pointsGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    pointsGeo.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const pointsMat = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: {
        uTime: { value: 0 },
        uSize: { value: 14.0 },
      },
      vertexShader: `
        uniform float uTime;
        uniform float uSize;
        attribute vec3 color;
        varying vec3 vColor;
        void main() {
          vColor = color;
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          gl_Position = projectionMatrix * mvPosition;
          float pulse = 0.65 + 0.35 * sin(uTime * 1.7 + position.x * 0.08 + position.z * 0.06);
          gl_PointSize = uSize * pulse * (1.0 / -mvPosition.z);
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        void main() {
          vec2 uv = gl_PointCoord - vec2(0.5);
          float d = length(uv);
          float a = smoothstep(0.5, 0.08, d);
          float core = smoothstep(0.18, 0.0, d);
          vec3 col = vColor + core * 0.85;
          gl_FragColor = vec4(col, a);
        }
      `,
    });

    const points = new THREE.Points(pointsGeo, pointsMat);
    group.add(points);

    const composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene, camera));

    const bloom = new UnrealBloomPass(new THREE.Vector2(1, 1), 1.05, 0.8, 0.08);
    composer.addPass(bloom);

    let w = 1;
    let h = 1;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const nextW = Math.max(1, Math.floor(rect.width));
      const nextH = Math.max(1, Math.floor(rect.height));
      if (nextW === w && nextH === h) return;
      w = nextW;
      h = nextH;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h, false);
      composer.setSize(w, h);
    };

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const mouse = { x: 0, y: 0, tx: 0, ty: 0 };

    const onPointer = (e) => {
      const cx = window.innerWidth * 0.5;
      const cy = window.innerHeight * 0.5;
      mouse.tx = (e.clientX - cx) / cx;
      mouse.ty = (e.clientY - cy) / cy;
    };

    window.addEventListener("pointermove", onPointer, { passive: true });

    const clock = new THREE.Clock();

    const tick = () => {
      const t = clock.getElapsedTime();
      pointsMat.uniforms.uTime.value = t;

      mouse.x += (mouse.tx - mouse.x) * 0.06;
      mouse.y += (mouse.ty - mouse.y) * 0.06;

      const scroll = window.scrollY / Math.max(1, window.innerHeight);

      group.rotation.y = t * 0.22 + scroll * 0.15;
      group.rotation.x = t * 0.08 - mouse.y * 0.22;
      group.rotation.z = t * 0.05 + mouse.x * 0.12;

      knot.rotation.y += 0.0025;
      knot.rotation.x += 0.0012;

      halo.rotation.z = t * 0.35;

      const swirl = 0.35 + 0.18 * Math.sin(t * 0.7);
      const p = pointsGeo.attributes.position.array;

      for (let i = 0; i < pointCount; i++) {
        const i3 = i * 3;
        const bx = base[i3 + 0];
        const by = base[i3 + 1];
        const bz = base[i3 + 2];

        const a = Math.atan2(bz, bx) + t * 0.22 + by * 0.06;
        const r = Math.sqrt(bx * bx + bz * bz) + Math.sin(t + i * 0.004) * 0.06;

        p[i3 + 0] = Math.cos(a) * r;
        p[i3 + 1] = by + Math.sin(t * 0.9 + r * 0.25) * 0.18;
        p[i3 + 2] = Math.sin(a) * r;
      }

      pointsGeo.attributes.position.needsUpdate = true;

      camera.position.x = mouse.x * 0.35;
      camera.position.y = 0.1 - mouse.y * 0.25;
      camera.position.z = 5.25 + scroll * 0.08;

      bloom.strength = 0.95 + swirl;
      bloom.radius = 0.62 + 0.18 * Math.sin(t * 0.5);

      composer.render();
      raf = requestAnimationFrame(tick);
    };

    const onVis = () => {
      if (document.hidden) {
        cancelAnimationFrame(raf);
        raf = 0;
      } else if (!raf) {
        clock.start();
        raf = requestAnimationFrame(tick);
      }
    };

    document.addEventListener("visibilitychange", onVis);

    resize();
    raf = requestAnimationFrame(tick);

    cleanup = () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("visibilitychange", onVis);
      window.removeEventListener("pointermove", onPointer);
      ro.disconnect();

      composer.dispose();
      pointsGeo.dispose();
      pointsMat.dispose();
      knot.geometry.dispose();
      knot.material.dispose();
      halo.geometry.dispose();
      halo.material.dispose();
      renderer.dispose();
    };
  });

  onDestroy(() => cleanup());
</script>

<canvas bind:this={canvas} class="cam-three" aria-hidden="true"></canvas>

<style>
  .cam-three {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    display: block;
    pointer-events: none;
  }

  @media (prefers-reduced-motion: reduce) {
    .cam-three {
      display: none;
    }
  }
</style>
