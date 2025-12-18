<script>
  import { onMount } from "svelte";

  let canvas;
  let daysSince = 0;

  const eventEndUtc = Date.UTC(2025, 10, 2, 0, 0, 0);

  function computeDaysSince(nowMs) {
    const delta = nowMs - eventEndUtc;
    return Math.max(0, Math.floor(delta / 86400000));
  }

  onMount(() => {
    let cancelled = false;
    let cleanup = () => {
      cancelled = true;
    };
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const setDays = () => {
      daysSince = computeDaysSince(Date.now());
    };

    setDays();
    const daysTimer = window.setInterval(setDays, 60 * 60 * 1000);
    cleanup = () => {
      cancelled = true;
      window.clearInterval(daysTimer);
    };

    if (!canvas || prefersReducedMotion) {
      return () => cleanup();
    }

    (async () => {
      const THREE = await import("three");
      if (cancelled) return;

      const renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
        alpha: true,
        powerPreference: "high-performance"
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

      const scene = new THREE.Scene();
      scene.fog = new THREE.Fog(new THREE.Color("#07130d"), 6, 18);

      const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 60);
      camera.position.set(0.1, 0.2, 10.5);

      const root = new THREE.Group();
      scene.add(root);

      const ambient = new THREE.AmbientLight(new THREE.Color("#b6ffe0"), 0.45);
      scene.add(ambient);

      const key = new THREE.DirectionalLight(new THREE.Color("#38f28e"), 1.15);
      key.position.set(4, 6, 7);
      scene.add(key);

      const rim = new THREE.DirectionalLight(new THREE.Color("#86e6c6"), 0.9);
      rim.position.set(-6, -2, 9);
      scene.add(rim);

      const orbGeo = new THREE.IcosahedronGeometry(1.85, 6);
      const orbMat = new THREE.MeshStandardMaterial({
        color: new THREE.Color("#0a2318"),
        emissive: new THREE.Color("#38f28e"),
        emissiveIntensity: 0.65,
        metalness: 0.2,
        roughness: 0.25
      });
      const orb = new THREE.Mesh(orbGeo, orbMat);
      root.add(orb);

      const edgeGeo = new THREE.EdgesGeometry(orbGeo, 16);
      const edgeMat = new THREE.LineBasicMaterial({
        color: new THREE.Color("#86e293"),
        transparent: true,
        opacity: 0.55
      });
      const edges = new THREE.LineSegments(edgeGeo, edgeMat);
      root.add(edges);

      const haloGeo = new THREE.TorusGeometry(2.55, 0.08, 24, 220);
      const haloMat = new THREE.MeshBasicMaterial({
        color: new THREE.Color("#38f28e"),
        transparent: true,
        opacity: 0.35
      });
      const halo = new THREE.Mesh(haloGeo, haloMat);
      halo.rotation.x = Math.PI * 0.5;
      root.add(halo);

      const dustCount = 3400;
      const dustGeo = new THREE.BufferGeometry();
      const dustPos = new Float32Array(dustCount * 3);
      const dustCol = new Float32Array(dustCount * 3);
      const cA = new THREE.Color("#38f28e");
      const cB = new THREE.Color("#86e6c6");

      for (let i = 0; i < dustCount; i++) {
        const r = 6.2 + Math.random() * 9.5;
        const u = Math.random();
        const v = Math.random();
        const theta = 2 * Math.PI * u;
        const phi = Math.acos(2 * v - 1);
        const s = Math.sin(phi);
        const x = r * s * Math.cos(theta);
        const y = r * Math.cos(phi);
        const z = r * s * Math.sin(theta);
        const idx = i * 3;
        dustPos[idx] = x;
        dustPos[idx + 1] = y;
        dustPos[idx + 2] = z;
        const tt = Math.pow(Math.random(), 1.4);
        const c = cA.clone().lerp(cB, tt);
        dustCol[idx] = c.r;
        dustCol[idx + 1] = c.g;
        dustCol[idx + 2] = c.b;
      }

      dustGeo.setAttribute("position", new THREE.BufferAttribute(dustPos, 3));
      dustGeo.setAttribute("color", new THREE.BufferAttribute(dustCol, 3));
      const dustMat = new THREE.PointsMaterial({
        size: 0.035,
        vertexColors: true,
        transparent: true,
        opacity: 0.9,
        blending: THREE.AdditiveBlending,
        depthWrite: false
      });
      const dust = new THREE.Points(dustGeo, dustMat);
      root.add(dust);

      const bgGeo = new THREE.PlaneGeometry(30, 20, 1, 1);
      const bgMat = new THREE.ShaderMaterial({
        transparent: true,
        uniforms: {
          uTime: { value: 0 },
          uA: { value: new THREE.Color("#06100c") },
          uB: { value: new THREE.Color("#0b2a1b") },
          uC: { value: new THREE.Color("#38f28e") }
        },
        vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
        fragmentShader: `
        precision highp float;
        varying vec2 vUv;
        uniform float uTime;
        uniform vec3 uA;
        uniform vec3 uB;
        uniform vec3 uC;
        float hash(vec2 p) {
          p = fract(p * vec2(123.34, 345.45));
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
        void main() {
          vec2 p = vUv;
          float n1 = noise(p * 4.0 + vec2(uTime * 0.04, -uTime * 0.03));
          float n2 = noise(p * 10.0 + vec2(-uTime * 0.06, uTime * 0.05));
          float sweep = smoothstep(0.0, 1.0, 0.5 + 0.45 * sin(uTime * 0.35 + p.x * 6.0));
          vec3 base = mix(uA, uB, p.y);
          float glow = pow(max(0.0, 1.0 - distance(p, vec2(0.52, 0.58)) * 1.2), 2.3);
          base += uC * (0.10 + 0.15 * sweep) * glow;
          float grain = 0.035 * (n2 - 0.5);
          float band = 0.08 * (n1 - 0.5);
          vec3 col = base + vec3(grain + band);
          float alpha = 0.95;
          gl_FragColor = vec4(col, alpha);
        }
      `
      });
      const bg = new THREE.Mesh(bgGeo, bgMat);
      bg.position.z = -12;
      scene.add(bg);

      let w = 1;
      let h = 1;
      const pointer = new THREE.Vector2(0, 0);
      const targetCam = new THREE.Vector3();
      const clock = new THREE.Clock();

      const resize = () => {
        const rect = canvas.getBoundingClientRect();
        w = Math.max(1, Math.floor(rect.width));
        h = Math.max(1, Math.floor(rect.height));
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h, false);
      };

      const onPointerMove = (e) => {
        const rect = canvas.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        pointer.set((x - 0.5) * 2.0, (0.5 - y) * 2.0);
      };

      let raf = 0;
      const animate = () => {
        const t = clock.getElapsedTime();
        bgMat.uniforms.uTime.value = t;

        root.rotation.y = t * 0.18;
        root.rotation.x = Math.sin(t * 0.35) * 0.07;

        orb.rotation.y = -t * 0.22;
        orb.rotation.x = t * 0.15;
        edges.rotation.y = t * 0.28;
        halo.rotation.z = t * 0.55;

        dust.rotation.y = t * 0.05;
        dust.rotation.x = Math.cos(t * 0.09) * 0.03;

        targetCam.set(pointer.x * 0.6, pointer.y * 0.45, 10.5);
        camera.position.lerp(targetCam, 0.06);
        camera.lookAt(0, 0, 0);

        renderer.render(scene, camera);
        raf = requestAnimationFrame(animate);
      };

      resize();
      window.addEventListener("resize", resize, { passive: true });
      window.addEventListener("pointermove", onPointerMove, { passive: true });
      raf = requestAnimationFrame(animate);

      cleanup = () => {
        cancelled = true;
        window.clearInterval(daysTimer);
        window.removeEventListener("resize", resize);
        window.removeEventListener("pointermove", onPointerMove);
        cancelAnimationFrame(raf);
        bgGeo.dispose();
        bgMat.dispose();
        dustGeo.dispose();
        dustMat.dispose();
        haloGeo.dispose();
        haloMat.dispose();
        edgeGeo.dispose();
        edgeMat.dispose();
        orbGeo.dispose();
        orbMat.dispose();
        renderer.dispose();
      };
    })();

    return () => cleanup();
  });
</script>

<div class="hero">
  <div class="hero-canvas-wrap">
    <canvas bind:this={canvas} class="hero-canvas"></canvas>
  </div>

  <div class="hero-content mx-auto max-w-7xl max-sm:text-center">
    <div class="hero-card">
      <div class="hero-grid">
        <div class="hero-brand">
          <img
            src="/cam-hack-logo-text.png"
            alt="Cam Hack Logo"
            class="mx-auto size-60 max-md:mb-4 sm:float-left sm:mr-8 sm:size-72 md:size-80"
          />
        </div>

        <div class="hero-copy">
          <h1 class="sm:pt-12 sm:text-5xl">Cam&nbsp;Hack&nbsp;2025</h1>
          <div class="hero-subline">
            <h3 class="sm:text-3xl">1st&nbsp;&ndash;&nbsp;2nd&nbsp;November</h3>
            <div class="hero-counter" aria-hidden="true">
              {daysSince}
            </div>
          </div>

          <div class="mb-4 flex flex-wrap gap-4 max-sm:justify-center">
            <a
              target="_blank"
              href="/discord"
              class="hero-cta-primary rounded-2xl bg-emerald-100/80 px-6 py-4 text-green-900 transition-all select-none hover:scale-105 hover:bg-emerald-100"
            >
              Join the Discord!
            </a>
            <a
              target="_blank"
              href="/signup"
              class="hero-cta-secondary cursor-not-allowed rounded-2xl bg-gray-300/80 px-6 py-4 text-gray-600 transition-all select-none"
            >
              Signups closed
            </a>
          </div>
          <p class="text-xl">What can you make in 2 days?</p>
          <p class="clear-left"></p>
        </div>
      </div>
    </div>
  </div>
</div>

<style>
  .hero {
    position: relative;
    isolation: isolate;
    min-height: min(92vh, 980px);
    display: grid;
    align-items: center;
    padding: clamp(16px, 3vw, 32px);
    border-radius: 32px;
    overflow: hidden;
    background: radial-gradient(
        1200px 700px at 30% 25%,
        rgba(56, 242, 142, 0.18),
        rgba(6, 16, 12, 0)
      ),
      radial-gradient(
        900px 650px at 80% 65%,
        rgba(134, 230, 198, 0.16),
        rgba(6, 16, 12, 0)
      ),
      linear-gradient(180deg, rgba(6, 16, 12, 0.92), rgba(6, 16, 12, 0.72));
    box-shadow:
      0 30px 80px rgba(6, 16, 12, 0.35),
      inset 0 1px 0 rgba(255, 255, 255, 0.08);
  }

  .hero-canvas-wrap {
    position: absolute;
    inset: 0;
    z-index: -2;
  }

  .hero-canvas {
    width: 100%;
    height: 100%;
    display: block;
  }

  .hero-content {
    width: 100%;
  }

  .hero-card {
    position: relative;
    padding: clamp(16px, 2.6vw, 28px);
    border-radius: 28px;
    background: linear-gradient(
      135deg,
      rgba(255, 255, 255, 0.09),
      rgba(255, 255, 255, 0.03)
    );
    backdrop-filter: blur(16px);
    border: 1px solid rgba(134, 230, 198, 0.22);
    box-shadow:
      0 18px 60px rgba(0, 0, 0, 0.35),
      inset 0 1px 0 rgba(255, 255, 255, 0.12);
  }

  .hero-card:before {
    content: "";
    position: absolute;
    inset: -2px;
    border-radius: 30px;
    background: conic-gradient(
      from 140deg,
      rgba(56, 242, 142, 0.6),
      rgba(134, 230, 198, 0.25),
      rgba(134, 226, 147, 0.55),
      rgba(56, 242, 142, 0.6)
    );
    filter: blur(18px);
    opacity: 0.48;
    z-index: -1;
    animation: heroGlow 6.5s ease-in-out infinite;
  }

  @keyframes heroGlow {
    0% {
      transform: translate3d(0, 0, 0) scale(1);
      opacity: 0.42;
    }
    50% {
      transform: translate3d(0, -8px, 0) scale(1.02);
      opacity: 0.6;
    }
    100% {
      transform: translate3d(0, 0, 0) scale(1);
      opacity: 0.42;
    }
  }

  .hero-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: clamp(12px, 2.4vw, 24px);
  }

  @media (min-width: 720px) {
    .hero-grid {
      grid-template-columns: 420px 1fr;
      align-items: center;
    }
  }

  .hero-copy {
    color: rgba(248, 250, 252, 0.92);
    text-shadow: 0 1px 0 rgba(0, 0, 0, 0.2);
  }

  .hero-copy :global(h1),
  .hero-copy :global(h3),
  .hero-copy :global(p) {
    color: rgba(248, 250, 252, 0.92);
  }

  .hero-subline {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    gap: 16px;
    flex-wrap: wrap;
  }

  .hero-counter {
    font-family: "JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, Monaco,
      Consolas, "Liberation Mono", "Courier New", monospace;
    font-variant-numeric: tabular-nums;
    font-feature-settings: "tnum";
    letter-spacing: -0.04em;
    padding: 10px 14px;
    border-radius: 999px;
    background: rgba(6, 16, 12, 0.55);
    border: 1px solid rgba(56, 242, 142, 0.35);
    color: rgba(56, 242, 142, 0.92);
    box-shadow:
      0 10px 28px rgba(0, 0, 0, 0.35),
      inset 0 1px 0 rgba(255, 255, 255, 0.08);
    animation: counterFloat 3.4s ease-in-out infinite;
  }

  @keyframes counterFloat {
    0% {
      transform: translate3d(0, 0, 0);
    }
    50% {
      transform: translate3d(0, -6px, 0);
    }
    100% {
      transform: translate3d(0, 0, 0);
    }
  }

  .hero-cta-primary,
  .hero-cta-secondary {
    position: relative;
    will-change: transform;
  }

  .hero-cta-primary {
    box-shadow:
      0 16px 40px rgba(56, 242, 142, 0.18),
      inset 0 1px 0 rgba(255, 255, 255, 0.32);
  }

  .hero-cta-primary:before {
    content: "";
    position: absolute;
    inset: -1px;
    border-radius: 18px;
    background: radial-gradient(
      120px 70px at 30% 20%,
      rgba(56, 242, 142, 0.42),
      rgba(56, 242, 142, 0)
    );
    opacity: 0;
    transition: opacity 280ms ease;
    pointer-events: none;
  }

  .hero-cta-primary:hover:before {
    opacity: 1;
  }

  @media (prefers-reduced-motion: reduce) {
    .hero-card:before,
    .hero-counter {
      animation: none;
    }
  }
</style>
