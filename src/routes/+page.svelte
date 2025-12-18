<script>
  import { onMount } from "svelte";
  import * as THREE from "three";
  import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
  import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
  import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";

  import Hero from "$lib/components/Hero.svelte";
  import Sponsors from "$lib/components/Sponsors.svelte";
  import About from "$lib/components/About.svelte";
  import Schedule from "$lib/components/Schedule.svelte";
  import Rules from "$lib/components/Rules.svelte";
  import FAQ from "$lib/components/FAQ.svelte";
  import Organisers from "$lib/components/Organisers.svelte";

  let canvas = $state(null);
  let daysSince = $state(0);

  function reveal(node) {
    node.dataset.revealed = "0";
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) node.dataset.revealed = "1";
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.08 }
    );
    io.observe(node);
    return {
      destroy() {
        io.disconnect();
      }
    };
  }

  onMount(() => {
    const eventEndUtcMs = Date.UTC(2025, 10, 2, 12, 0, 0);
    daysSince = Math.max(0, Math.floor((Date.now() - eventEndUtcMs) / 86400000));

    if (!canvas) return;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: "high-performance"
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setClearColor(0x000000, 0);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x030b08, 0.13);

    const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 100);
    camera.position.set(0, 0.25, 4.2);

    const ambient = new THREE.AmbientLight(0x9bffd0, 0.38);
    scene.add(ambient);

    const key = new THREE.DirectionalLight(0x64ffb5, 1.1);
    key.position.set(2.5, 3.2, 2.2);
    scene.add(key);

    const rim = new THREE.PointLight(0x7c3aed, 2.2, 14, 2);
    rim.position.set(-2.4, 1.2, 1.6);
    scene.add(rim);

    const bgUniforms = {
      uTime: { value: 0 },
      uScroll: { value: 0 },
      uTintA: { value: new THREE.Color("#19ff8a") },
      uTintB: { value: new THREE.Color("#0b1220") }
    };

    const bg = new THREE.Mesh(
      new THREE.PlaneGeometry(18, 10, 1, 1),
      new THREE.ShaderMaterial({
        transparent: true,
        depthWrite: false,
        depthTest: false,
        uniforms: bgUniforms,
        vertexShader: `
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          varying vec2 vUv;
          uniform float uTime;
          uniform float uScroll;
          uniform vec3 uTintA;
          uniform vec3 uTintB;

          float hash(vec2 p) {
            p = fract(p * vec2(123.34, 456.21));
            p += dot(p, p + 34.345);
            return fract(p.x * p.y);
          }

          float noise(vec2 p) {
            vec2 i = floor(p);
            vec2 f = fract(p);
            float a = hash(i);
            float b = hash(i + vec2(1.0, 0.0));
            float c = hash(i + vec2(0.0, 1.0));
            float d = hash(i + vec2(1.0, 1.0));
            vec2 u = f * f * (3.0 - 2.0 * f);
            return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
          }

          float fbm(vec2 p) {
            float v = 0.0;
            float a = 0.5;
            mat2 m = mat2(1.6, 1.2, -1.2, 1.6);
            for (int i = 0; i < 5; i++) {
              v += a * noise(p);
              p = m * p;
              a *= 0.52;
            }
            return v;
          }

          void main() {
            vec2 uv = vUv;
            vec2 p = (uv - 0.5) * vec2(1.7, 1.0);
            float t = uTime * 0.12;
            float s = uScroll * 0.0015;
            float n = fbm(p * 2.1 + vec2(t, -t * 0.7) + s);
            float n2 = fbm(p * 3.3 + vec2(-t * 0.6, t * 0.9) - s);
            float band = smoothstep(0.2, 0.95, n) * smoothstep(1.1, 0.25, abs(p.y + 0.18 * sin(p.x * 2.0 + t * 1.6)));
            vec3 col = mix(uTintB, uTintA, band);
            col += 0.25 * uTintA * smoothstep(0.55, 1.0, n2) * (0.45 + 0.55 * band);
            float vignette = smoothstep(1.15, 0.2, length(p));
            float grain = (hash(uv * vec2(1200.0, 600.0) + uTime) - 0.5) * 0.07;
            float alpha = clamp(0.92 * vignette + 0.18 * band, 0.0, 1.0);
            gl_FragColor = vec4(col + grain, alpha);
          }
        `
      })
    );
    bg.position.set(0, 0, -5.8);
    scene.add(bg);

    const coreGeo = new THREE.TorusKnotGeometry(0.82, 0.22, 360, 36);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0x0c2a1a,
      metalness: 0.65,
      roughness: 0.22,
      emissive: 0x39ff9a,
      emissiveIntensity: 0.55
    });
    const core = new THREE.Mesh(coreGeo, coreMat);
    core.position.set(0, -0.02, 0.1);
    scene.add(core);

    const wire = new THREE.Mesh(
      coreGeo,
      new THREE.MeshBasicMaterial({
        color: 0x7c3aed,
        transparent: true,
        opacity: 0.14,
        wireframe: true
      })
    );
    wire.position.copy(core.position);
    scene.add(wire);

    const pointsCount = 2200;
    const positions = new Float32Array(pointsCount * 3);
    const seeds = new Float32Array(pointsCount);
    for (let i = 0; i < pointsCount; i++) {
      const r = 3.2 + Math.random() * 6.0;
      const a = Math.random() * Math.PI * 2;
      const y = (Math.random() - 0.5) * 3.0;
      positions[i * 3 + 0] = Math.cos(a) * r;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = Math.sin(a) * r - 2.0;
      seeds[i] = Math.random();
    }
    const pointsGeo = new THREE.BufferGeometry();
    pointsGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    pointsGeo.setAttribute("aSeed", new THREE.BufferAttribute(seeds, 1));

    const pointsUniforms = {
      uTime: { value: 0 },
      uScroll: { value: 0 },
      uColor: { value: new THREE.Color("#64ffb5") }
    };

    const pointsMat = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: pointsUniforms,
      vertexShader: `
        uniform float uTime;
        uniform float uScroll;
        attribute float aSeed;
        varying float vSeed;
        void main() {
          vSeed = aSeed;
          vec3 p = position;
          float t = uTime * 0.35 + aSeed * 10.0;
          p.xz += vec2(sin(t), cos(t)) * (0.05 + 0.12 * aSeed);
          p.y += sin(t * 1.5) * 0.05;
          p.z += uScroll * 0.0009 * (0.2 + 0.8 * aSeed);
          vec4 mv = modelViewMatrix * vec4(p, 1.0);
          gl_Position = projectionMatrix * mv;
          gl_PointSize = (2.0 + 8.0 * aSeed) * (1.0 / max(0.6, -mv.z));
        }
      `,
      fragmentShader: `
        uniform vec3 uColor;
        varying float vSeed;
        void main() {
          vec2 p = gl_PointCoord - 0.5;
          float d = dot(p, p);
          float m = smoothstep(0.25, 0.0, d);
          vec3 c = mix(vec3(0.48, 0.23, 0.93), uColor, 0.55 + 0.45 * vSeed);
          gl_FragColor = vec4(c, m * (0.55 + 0.45 * vSeed));
        }
      `
    });

    const points = new THREE.Points(pointsGeo, pointsMat);
    scene.add(points);

    const composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene, camera));
    const bloom = new UnrealBloomPass(new THREE.Vector2(1, 1), 1.15, 0.42, 0.2);
    composer.addPass(bloom);

    let w = 0;
    let h = 0;
    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      w = Math.max(1, Math.floor(rect.width));
      h = Math.max(1, Math.floor(rect.height));
      renderer.setSize(w, h, false);
      composer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      bloom.setSize(w, h);
    };
    resize();

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    let mx = 0;
    let my = 0;
    const onMove = (e) => {
      const cx = (e.clientX / window.innerWidth) * 2 - 1;
      const cy = (e.clientY / window.innerHeight) * 2 - 1;
      mx = cx;
      my = cy;
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    const onScroll = () => {
      const y = window.scrollY || 0;
      bgUniforms.uScroll.value = y;
      pointsUniforms.uScroll.value = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    const clock = new THREE.Clock();
    let raf = 0;
    const animate = () => {
      raf = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();
      bgUniforms.uTime.value = t;
      pointsUniforms.uTime.value = t;

      core.rotation.x = t * 0.28 + my * 0.15;
      core.rotation.y = t * 0.42 + mx * 0.25;
      wire.rotation.copy(core.rotation);

      points.rotation.y = t * 0.06 + mx * 0.04;
      points.rotation.x = t * 0.03 - my * 0.03;

      camera.position.x = mx * 0.38;
      camera.position.y = 0.25 - my * 0.22;
      camera.lookAt(0, 0, 0);

      composer.render();
    };
    animate();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", onScroll);
      ro.disconnect();
      composer.dispose();
      renderer.dispose();
      pointsGeo.dispose();
      pointsMat.dispose();
      coreGeo.dispose();
      coreMat.dispose();
      wire.material.dispose();
      bg.geometry.dispose();
      bg.material.dispose();
    };
  });
</script>

<svelte:head>
  <title>Cam Hack 2025</title>
</svelte:head>

<div class="splash-page">
  <section class="splash-hero">
    <canvas bind:this={canvas} class="splash-canvas"></canvas>
    <div class="splash-overlays">
      <div class="splash-vignette"></div>
      <div class="splash-grid"></div>
      <div class="splash-glow"></div>
    </div>
    <div class="splash-shell">
      <div class="days-chip" aria-hidden="true">{daysSince}</div>
      <div class="splash-card">
        <Hero />
      </div>
    </div>
  </section>

  <section class="unintended-section m-0" use:reveal>
    <div class="mx-auto max-w-7xl px-4 sm:px-8">
      <h1 class="py-8 text-center">Unintended Behaviour</h1>
      <a target="_blank" href="https://cam-hack-2025.devpost.com" class="block">
        <div class="project-frame">
          <img src="/unintended.png" alt="Unintended" class="m-0 block w-full" />
        </div>
      </a>
    </div>
  </section>

  <section class="sponsors-section" use:reveal>
    <Sponsors />
  </section>

  <section id="about" use:reveal>
    <About />
  </section>

  <section id="schedule" use:reveal>
    <Schedule />
  </section>

  <section id="rules" use:reveal>
    <Rules />
  </section>

  <section id="faq" use:reveal>
    <FAQ />
  </section>

  <section use:reveal>
    <Organisers />
  </section>
</div>

<style>
  .splash-page {
    background: radial-gradient(
        1200px 700px at 70% -10%,
        rgba(25, 255, 138, 0.16),
        transparent 60%
      ),
      radial-gradient(
        900px 600px at 12% 8%,
        rgba(124, 58, 237, 0.14),
        transparent 55%
      ),
      linear-gradient(180deg, #030b08 0%, #060913 45%, #070b0a 100%);
    color: rgba(226, 232, 240, 0.88);
  }

  .splash-page :global(h1),
  .splash-page :global(h2),
  .splash-page :global(h3),
  .splash-page :global(h4),
  .splash-page :global(h5),
  .splash-page :global(h6) {
    font-family: var(--font-display);
    color: rgba(248, 250, 252, 0.98);
  }

  .splash-page :global(strong) {
    color: rgba(248, 250, 252, 0.95);
  }

  .splash-hero {
    position: relative;
    padding: 0;
    overflow: clip;
    min-height: calc(100svh - 72px);
    display: grid;
    align-items: center;
  }

  .splash-canvas {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
  }

  .splash-overlays {
    position: absolute;
    inset: 0;
    pointer-events: none;
  }

  .splash-vignette {
    position: absolute;
    inset: -2px;
    background: radial-gradient(
        900px 520px at 50% 40%,
        rgba(3, 11, 8, 0.2),
        rgba(3, 11, 8, 0.92) 72%
      ),
      linear-gradient(180deg, rgba(3, 11, 8, 0.25), rgba(3, 11, 8, 0.88));
  }

  .splash-grid {
    position: absolute;
    inset: 0;
    opacity: 0.35;
    background-image: linear-gradient(
        rgba(100, 255, 181, 0.14) 1px,
        transparent 1px
      ),
      linear-gradient(90deg, rgba(100, 255, 181, 0.14) 1px, transparent 1px);
    background-size: 64px 64px;
    mask-image: radial-gradient(
      900px 520px at 50% 40%,
      rgba(0, 0, 0, 1),
      rgba(0, 0, 0, 0) 70%
    );
    transform: perspective(900px) rotateX(66deg) translateY(26%);
    transform-origin: 50% 35%;
    animation: grid-drift 10s ease-in-out infinite alternate;
  }

  .splash-glow {
    position: absolute;
    inset: 0;
    background: radial-gradient(
      650px 320px at 52% 32%,
      rgba(25, 255, 138, 0.18),
      transparent 65%
    );
    filter: blur(14px);
    opacity: 0.9;
    animation: glow-pulse 5.2s ease-in-out infinite;
  }

  .splash-shell {
    position: relative;
    z-index: 2;
    max-width: 80rem;
    margin: 0 auto;
    padding: 2.75rem 1rem;
    width: 100%;
  }

  .days-chip {
    position: absolute;
    top: 1.2rem;
    right: 1.2rem;
    font-family: var(--font-display);
    font-weight: 700;
    letter-spacing: 0.08em;
    font-size: clamp(1.15rem, 2.6vw, 2.1rem);
    color: rgba(100, 255, 181, 0.92);
    text-shadow: 0 0 28px rgba(25, 255, 138, 0.25);
    padding: 0.6rem 0.85rem;
    border-radius: 999px;
    border: 1px solid rgba(100, 255, 181, 0.22);
    background: linear-gradient(
      180deg,
      rgba(8, 12, 16, 0.65),
      rgba(4, 7, 10, 0.35)
    );
    backdrop-filter: blur(10px);
  }

  .splash-card {
    border-radius: 28px;
    border: 1px solid rgba(100, 255, 181, 0.22);
    background: linear-gradient(
      180deg,
      rgba(6, 10, 14, 0.78),
      rgba(6, 10, 14, 0.36)
    );
    box-shadow: 0 30px 90px rgba(0, 0, 0, 0.45),
      0 0 0 1px rgba(124, 58, 237, 0.09),
      0 0 90px rgba(25, 255, 138, 0.12);
    backdrop-filter: blur(14px);
    padding: clamp(1.2rem, 3vw, 2rem);
    transform: translate3d(0, 0, 0);
    animation: card-float 6.2s ease-in-out infinite;
  }

  .splash-hero :global(h1),
  .splash-hero :global(h2),
  .splash-hero :global(h3) {
    font-family: var(--font-display);
    color: rgba(248, 250, 252, 0.98);
    text-shadow: 0 16px 40px rgba(0, 0, 0, 0.6);
  }

  .splash-hero :global(p) {
    color: rgba(226, 232, 240, 0.88);
  }

  .splash-hero :global(a) {
    color: inherit;
  }

  section {
    background: transparent;
  }

  section:not(.splash-hero):not(.unintended-section) {
    border-top: 1px solid rgba(100, 255, 181, 0.09);
  }

  .unintended-section {
    background: transparent !important;
    margin: 0 !important;
    padding-top: 2.25rem;
    padding-bottom: 2.5rem;
  }

  .unintended-section :global(h1) {
    font-family: var(--font-display);
    color: rgba(248, 250, 252, 0.98);
  }

  .project-frame {
    border-radius: 28px;
    border: 1px solid rgba(100, 255, 181, 0.18);
    background: linear-gradient(
      180deg,
      rgba(12, 18, 24, 0.6),
      rgba(12, 18, 24, 0.24)
    );
    box-shadow: 0 36px 120px rgba(0, 0, 0, 0.55),
      0 0 70px rgba(25, 255, 138, 0.12);
    overflow: hidden;
    transform: perspective(1200px) rotateX(0deg) rotateY(0deg)
      translate3d(0, 0, 0);
    transition: transform 650ms cubic-bezier(0.2, 0.9, 0.2, 1),
      box-shadow 650ms cubic-bezier(0.2, 0.9, 0.2, 1);
  }

  .project-frame:hover {
    transform: perspective(1200px) rotateX(4deg) rotateY(-5deg)
      translate3d(0, -6px, 0);
    box-shadow: 0 44px 150px rgba(0, 0, 0, 0.62),
      0 0 110px rgba(25, 255, 138, 0.18);
  }

  .project-frame img {
    display: block;
    width: 100%;
    margin: 0 !important;
    filter: saturate(1.04) contrast(1.02);
    transform: scale(1.005);
  }

  section.unintended-section {
    background-color: transparent !important;
  }

  section.sponsors-section {
    background-color: transparent !important;
  }

  .splash-page :global([data-revealed="0"]) {
    opacity: 0;
    transform: translate3d(0, 20px, 0) scale(0.995);
    filter: blur(12px);
  }

  .splash-page :global([data-revealed="1"]) {
    opacity: 1;
    transform: translate3d(0, 0, 0) scale(1);
    filter: blur(0px);
    transition: opacity 900ms cubic-bezier(0.2, 0.85, 0.2, 1),
      transform 900ms cubic-bezier(0.2, 0.85, 0.2, 1),
      filter 900ms cubic-bezier(0.2, 0.85, 0.2, 1);
  }

  @keyframes grid-drift {
    0% {
      transform: perspective(900px) rotateX(66deg) translateY(26%) translateX(-1%);
      opacity: 0.32;
    }
    100% {
      transform: perspective(900px) rotateX(66deg) translateY(24%) translateX(1%);
      opacity: 0.4;
    }
  }

  @keyframes glow-pulse {
    0% {
      opacity: 0.75;
      transform: scale(1);
    }
    50% {
      opacity: 1;
      transform: scale(1.02);
    }
    100% {
      opacity: 0.78;
      transform: scale(1);
    }
  }

  @keyframes card-float {
    0% {
      transform: translate3d(0, 0, 0);
    }
    50% {
      transform: translate3d(0, -10px, 0);
    }
    100% {
      transform: translate3d(0, 0, 0);
    }
  }
</style>
