<script>
  import { onMount } from "svelte";

  let canvas;
  let host;

  let ready = $state(false);

  onMount(() => {
    let dispose = () => {};

    (async () => {
      const prefersReduced = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;

      const THREE = await import("three");
      const { EffectComposer } = await import(
        "three/examples/jsm/postprocessing/EffectComposer.js"
      );
      const { RenderPass } = await import("three/examples/jsm/postprocessing/RenderPass.js");
      const { UnrealBloomPass } = await import(
        "three/examples/jsm/postprocessing/UnrealBloomPass.js"
      );

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: "high-performance"
    });

    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 80);
    camera.position.set(0, 0.2, 6.5);

    const ambient = new THREE.AmbientLight(0xffffff, 0.45);
    scene.add(ambient);

    const key = new THREE.DirectionalLight(0xffffff, 1.25);
    key.position.set(4, 7, 5);
    scene.add(key);

    const rim = new THREE.DirectionalLight(0x86e293, 1.05);
    rim.position.set(-6, -2, 2);
    scene.add(rim);

    const knotGeo = new THREE.TorusKnotGeometry(1.15, 0.32, 360, 24);
    const knotMat = new THREE.MeshStandardMaterial({
      color: 0x2dfc7a,
      roughness: 0.22,
      metalness: 0.7,
      emissive: 0x082013,
      emissiveIntensity: 0.6
    });
    const knot = new THREE.Mesh(knotGeo, knotMat);
    knot.position.set(1.1, -0.2, 0);
    scene.add(knot);

    const haloGeo = new THREE.IcosahedronGeometry(1.25, 3);
    const haloMat = new THREE.MeshBasicMaterial({
      color: 0x86e6c6,
      transparent: true,
      opacity: 0.08,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
    const halo = new THREE.Mesh(haloGeo, haloMat);
    halo.position.copy(knot.position);
    halo.scale.setScalar(2.2);
    scene.add(halo);

    const particleCount = 14000;
    const positions = new Float32Array(particleCount * 3);
    const seeds = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      const r = 8.5 * Math.cbrt(Math.random());
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.cos(phi);
      const z = r * Math.sin(phi) * Math.sin(theta);

      positions[i * 3 + 0] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
      seeds[i] = Math.random();
    }

    const particlesGeo = new THREE.BufferGeometry();
    particlesGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    particlesGeo.setAttribute("aSeed", new THREE.BufferAttribute(seeds, 1));

    const uniforms = {
      uTime: { value: 0 },
      uPointer: { value: new THREE.Vector2(0, 0) },
      uPixelRatio: { value: Math.min(window.devicePixelRatio || 1, 2) }
    };

    const particlesMat = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms,
      vertexShader: `
        uniform float uTime;
        uniform vec2 uPointer;
        uniform float uPixelRatio;
        attribute float aSeed;

        float hash(float n) { return fract(sin(n) * 43758.5453123); }

        void main() {
          vec3 p = position;
          float t = uTime * 0.35;

          float n1 = hash(aSeed * 91.17);
          float n2 = hash(aSeed * 17.33);

          float swirl = 0.55 + n1 * 0.7;
          float ang = t * swirl + n2 * 6.283185;

          float s = sin(ang);
          float c = cos(ang);
          p.xz = mat2(c, -s, s, c) * p.xz;

          float lift = sin(t * 1.1 + aSeed * 18.0) * 0.35;
          p.y += lift;

          vec3 dir = normalize(vec3(uPointer.x, -uPointer.y, 0.35));
          p += dir * (0.35 + n2 * 0.35);

          vec4 mv = modelViewMatrix * vec4(p, 1.0);
          gl_Position = projectionMatrix * mv;

          float size = 2.0 + 10.0 * pow(n1, 2.0);
          size *= (1.0 / max(0.15, -mv.z));
          gl_PointSize = size * uPixelRatio;
        }
      `,
      fragmentShader: `
        void main() {
          vec2 uv = gl_PointCoord.xy - 0.5;
          float d = dot(uv, uv);
          float a = smoothstep(0.25, 0.0, d);
          vec3 c1 = vec3(0.176, 0.988, 0.478);
          vec3 c2 = vec3(0.525, 0.902, 0.776);
          vec3 col = mix(c2, c1, gl_PointCoord.y);
          gl_FragColor = vec4(col, a * 0.9);
        }
      `
    });

    const particles = new THREE.Points(particlesGeo, particlesMat);
    scene.add(particles);

    const composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene, camera));

    const bloom = new UnrealBloomPass(new THREE.Vector2(1, 1), 1.25, 0.55, 0.2);
    composer.addPass(bloom);

    const pointer = { x: 0, y: 0 };

    const onPointerMove = (e) => {
      const rect = host.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      pointer.x = x * 2 - 1;
      pointer.y = y * 2 - 1;
    };

    const onScroll = () => {
      const rect = host.getBoundingClientRect();
      const h = Math.max(1, window.innerHeight);
      const t = 1 - Math.min(1, Math.max(0, rect.bottom / (h + rect.height)));
      bloom.strength = 1.1 + t * 0.75;
      bloom.radius = 0.42 + t * 0.3;
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });

    const setSize = () => {
      const w = host.clientWidth;
      const h = host.clientHeight;

      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      renderer.setSize(w, h, false);

      camera.aspect = w / h;
      camera.updateProjectionMatrix();

      composer.setSize(w, h);
      bloom.setSize(w, h);

      uniforms.uPixelRatio.value = Math.min(window.devicePixelRatio || 1, 2);
    };

      const ro = new ResizeObserver(() => setSize());
      ro.observe(host);

    setSize();
    onScroll();

    const clock = new THREE.Clock();
    let raf = 0;

    const tick = () => {
      raf = requestAnimationFrame(tick);

      const t = clock.getElapsedTime();
      uniforms.uTime.value = t;

      const px = pointer.x;
      const py = pointer.y;

      uniforms.uPointer.value.set(px, py);

      const ease = 0.045;
      camera.position.x += (px * 0.55 - camera.position.x) * ease;
      camera.position.y += (py * 0.25 - camera.position.y) * ease;
      camera.lookAt(0, 0, 0);

      knot.rotation.x = t * 0.35;
      knot.rotation.y = t * 0.5;
      halo.rotation.y = -t * 0.18;
      halo.rotation.z = t * 0.12;

      particles.rotation.y = t * 0.05;

      if (prefersReduced) {
        renderer.render(scene, camera);
        return;
      }

      composer.render();
    };

      ready = true;
      tick();

      dispose = () => {
        cancelAnimationFrame(raf);
        ro.disconnect();
        window.removeEventListener("pointermove", onPointerMove);
        window.removeEventListener("scroll", onScroll);

        composer?.dispose?.();
        bloom?.dispose?.();
        renderer.dispose();

        knotGeo.dispose();
        knotMat.dispose();
        haloGeo.dispose();
        haloMat.dispose();
        particlesGeo.dispose();
        particlesMat.dispose();
      };
    })();

    return () => dispose();
  });
</script>

<div bind:this={host} class="three-hero" data-ready={ready}>
  <canvas bind:this={canvas} class="three-canvas"></canvas>
  <div class="vignette"></div>
</div>

<style>
  .three-hero {
    position: absolute;
    inset: 0;
    overflow: hidden;
    border-radius: 2rem;
    isolation: isolate;
    transform: translateZ(0);
  }

  .three-canvas {
    width: 100%;
    height: 100%;
    display: block;
  }

  .vignette {
    position: absolute;
    inset: 0;
    background:
      radial-gradient(1200px 600px at 20% 15%, rgba(45, 252, 122, 0.16), rgba(0, 0, 0, 0)),
      radial-gradient(900px 500px at 90% 45%, rgba(134, 230, 198, 0.14), rgba(0, 0, 0, 0)),
      linear-gradient(180deg, rgba(4, 6, 10, 0.1), rgba(4, 6, 10, 0.75));
    pointer-events: none;
    mix-blend-mode: screen;
  }

  .three-hero[data-ready="false"] {
    opacity: 0;
  }

  .three-hero[data-ready="true"] {
    opacity: 1;
    transition: opacity 600ms ease;
  }
</style>
