<script>
  import { onMount } from "svelte";
  import * as THREE from "three";
  import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
  import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
  import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
  import { AfterimagePass } from "three/examples/jsm/postprocessing/AfterimagePass.js";

  let canvas;
  let root;

  let daysSince = 0;

  let renderer;
  let scene;
  let camera;
  let composer;
  let raf = 0;

  let time = 0;
  let pointerX = 0;
  let pointerY = 0;
  let smoothPointerX = 0;
  let smoothPointerY = 0;
  let scrollY = 0;
  let smoothScrollY = 0;

  function resize() {
    if (!root || !renderer || !camera || !composer) return;
    const w = root.clientWidth;
    const h = root.clientHeight;
    renderer.setSize(w, h, false);
    composer.setSize(w, h);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }

  function clamp(n, a, b) {
    return Math.max(a, Math.min(b, n));
  }

  onMount(() => {
    const eventEnd = Date.UTC(2025, 10, 2, 23, 59, 59);
    daysSince = Math.max(0, Math.floor((Date.now() - eventEnd) / 86400000));

    renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: "high-performance" });
    renderer.setPixelRatio(Math.min(2, window.devicePixelRatio || 1));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;

    scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2("#050907", 0.06);

    camera = new THREE.PerspectiveCamera(55, 1, 0.1, 120);
    camera.position.set(0, 0.3, 7.5);

    const group = new THREE.Group();
    scene.add(group);

    const lightA = new THREE.PointLight("#3dff9b", 40, 35);
    lightA.position.set(-6, 4, 4);
    scene.add(lightA);

    const lightB = new THREE.PointLight("#86e6c6", 22, 28);
    lightB.position.set(7, -2, 7);
    scene.add(lightB);

    const ambient = new THREE.AmbientLight("#0a160f", 1.5);
    scene.add(ambient);

    const ico = new THREE.IcosahedronGeometry(1.7, 4);
    const core = new THREE.Mesh(
      ico,
      new THREE.MeshStandardMaterial({
        color: "#06110b",
        roughness: 0.35,
        metalness: 0.15,
        emissive: "#0bd86a",
        emissiveIntensity: 0.55
      })
    );
    core.position.set(0.2, 0.15, 0);
    group.add(core);

    const wire = new THREE.LineSegments(
      new THREE.WireframeGeometry(ico),
      new THREE.LineBasicMaterial({ color: "#39ff96", transparent: true, opacity: 0.22 })
    );
    wire.position.copy(core.position);
    group.add(wire);

    const count = 26000;
    const positions = new Float32Array(count * 3);
    const scales = new Float32Array(count);
    const seeds = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      const r = Math.pow(Math.random(), 0.65) * 10.5;
      const t = Math.random() * Math.PI * 2;
      const p = Math.acos(THREE.MathUtils.lerp(1, -1, Math.random()));
      const x = r * Math.sin(p) * Math.cos(t);
      const y = r * Math.cos(p);
      const z = r * Math.sin(p) * Math.sin(t);

      positions[i * 3 + 0] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      scales[i] = THREE.MathUtils.lerp(0.6, 2.2, Math.pow(Math.random(), 1.8));
      seeds[i] = Math.random() * 1000;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("aScale", new THREE.BufferAttribute(scales, 1));
    geo.setAttribute("aSeed", new THREE.BufferAttribute(seeds, 1));

    const mat = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: {
        uTime: { value: 0 },
        uPixelRatio: { value: Math.min(2, window.devicePixelRatio || 1) }
      },
      vertexShader: "\n        uniform float uTime;\n        uniform float uPixelRatio;\n        attribute float aScale;\n        attribute float aSeed;\n        varying float vPulse;\n        varying float vFade;\n        void main() {\n          vec3 p = position;\n          float t = uTime * 0.45 + aSeed;\n          p.x += sin(t * 0.9 + position.z * 0.12) * 0.18;\n          p.y += sin(t * 1.1 + position.x * 0.14) * 0.16;\n          p.z += sin(t * 0.8 + position.y * 0.12) * 0.18;\n          vec4 mv = modelViewMatrix * vec4(p, 1.0);\n          float dist = length(p) * 0.08;\n          vFade = smoothstep(1.15, 0.1, dist);\n          vPulse = 0.5 + 0.5 * sin(t * 1.6);\n          gl_Position = projectionMatrix * mv;\n          gl_PointSize = (aScale * uPixelRatio) * (320.0 / (-mv.z));\n        }\n      ",
      fragmentShader: "\n        varying float vPulse;\n        varying float vFade;\n        void main() {\n          vec2 uv = gl_PointCoord - 0.5;\n          float d = length(uv);\n          float a = smoothstep(0.5, 0.18, d);\n          vec3 c1 = vec3(0.02, 0.98, 0.56);\n          vec3 c2 = vec3(0.53, 0.90, 0.78);\n          vec3 col = mix(c2, c1, vPulse);\n          float alpha = a * vFade;\n          gl_FragColor = vec4(col, alpha);\n        }\n      "
    });

    const points = new THREE.Points(geo, mat);
    points.position.set(0, 0.1, -2);
    group.add(points);

    const auraGeo = new THREE.PlaneGeometry(24, 24, 1, 1);
    const auraMat = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: { uTime: { value: 0 } },
      vertexShader: "\n        varying vec2 vUv;\n        void main() {\n          vUv = uv;\n          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);\n        }\n      ",
      fragmentShader: "\n        uniform float uTime;\n        varying vec2 vUv;\n        float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123); }\n        float noise(vec2 p){\n          vec2 i = floor(p);\n          vec2 f = fract(p);\n          float a = hash(i);\n          float b = hash(i + vec2(1.0, 0.0));\n          float c = hash(i + vec2(0.0, 1.0));\n          float d = hash(i + vec2(1.0, 1.0));\n          vec2 u = f * f * (3.0 - 2.0 * f);\n          return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;\n        }\n        void main(){\n          vec2 uv = vUv * 2.0 - 1.0;\n          float t = uTime * 0.05;\n          float n = 0.0;\n          n += noise(uv * 1.2 + vec2(t, -t));\n          n += 0.5 * noise(uv * 2.3 + vec2(-t * 1.4, t * 1.1));\n          n += 0.25 * noise(uv * 4.2 + vec2(t * 1.6, t * 0.7));\n          float v = smoothstep(0.15, 0.95, n);\n          float m = smoothstep(1.2, 0.15, length(uv));\n          vec3 col = mix(vec3(0.01, 0.08, 0.05), vec3(0.04, 0.95, 0.55), v);\n          float a = v * m * 0.45;\n          gl_FragColor = vec4(col, a);\n        }\n      "
    });
    const aura = new THREE.Mesh(auraGeo, auraMat);
    aura.position.set(0, 0.2, -10);
    aura.rotation.x = -0.2;
    scene.add(aura);

    composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene, camera));

    const bloom = new UnrealBloomPass(new THREE.Vector2(1, 1), 1.1, 0.6, 0.15);
    composer.addPass(bloom);

    const after = new AfterimagePass();
    after.uniforms["damp"].value = 0.88;
    composer.addPass(after);

    const onPointerMove = (e) => {
      const rect = root.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      pointerX = (x - 0.5) * 2;
      pointerY = (y - 0.5) * 2;
    };

    const onScroll = () => {
      scrollY = window.scrollY || 0;
    };

    window.addEventListener("resize", resize, { passive: true });
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });

    resize();

    const tick = () => {
      raf = requestAnimationFrame(tick);
      time += 0.016;

      smoothPointerX += (pointerX - smoothPointerX) * 0.06;
      smoothPointerY += (pointerY - smoothPointerY) * 0.06;
      smoothScrollY += (scrollY - smoothScrollY) * 0.05;

      const scrollInfluence = clamp(smoothScrollY / 900, 0, 1);

      camera.position.x = smoothPointerX * 0.45;
      camera.position.y = 0.3 + smoothPointerY * -0.25;
      camera.position.z = 7.5 + scrollInfluence * 1.4;
      camera.lookAt(0, 0.05, 0);

      group.rotation.y = time * 0.08 + smoothPointerX * 0.12;
      group.rotation.x = time * 0.05 + smoothPointerY * 0.08;

      core.rotation.y = time * 0.25;
      core.rotation.x = time * 0.18;

      wire.rotation.copy(core.rotation);

      mat.uniforms.uTime.value = time;
      auraMat.uniforms.uTime.value = time;

      composer.render();
    };

    tick();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
      if (composer) composer.dispose();
      if (scene) {
        scene.traverse((o) => {
          if (o.geometry) o.geometry.dispose();
          if (o.material) {
            if (Array.isArray(o.material)) o.material.forEach((m) => m.dispose());
            else o.material.dispose();
          }
        });
      }
      if (renderer) renderer.dispose();
      renderer = undefined;
      scene = undefined;
      camera = undefined;
      composer = undefined;
    };
  });
</script>

<div class="splash" bind:this={root}>
  <canvas class="splash-canvas" bind:this={canvas}></canvas>

  <div class="splash-overlay">
    <div class="splash-grid">
      <div class="splash-hero">
        <img src="/cam-hack-logo-text.png" alt="Cam Hack Logo" class="splash-logo" />
        <h1 class="splash-title">Cam&nbsp;Hack&nbsp;2025</h1>
        <h3 class="splash-subtitle">1st&nbsp;&ndash;&nbsp;2nd&nbsp;November</h3>

        <div class="splash-actions">
          <a target="_blank" href="/discord" class="splash-button splash-button-primary">
            Join the Discord!
          </a>
          <a target="_blank" href="/signup" class="splash-button splash-button-disabled">
            Signups closed
          </a>
        </div>

        <p class="splash-question">What can you make in 2 days?</p>
      </div>

      <div class="splash-counter" aria-hidden="true">
        <div class="splash-counter-inner">
          <div class="splash-counter-number">{daysSince}</div>
        </div>
      </div>
    </div>
  </div>
</div>

<style>
  .splash {
    position: relative;
    height: min(100vh, 980px);
    min-height: 680px;
    overflow: hidden;
    background: radial-gradient(1200px 600px at 15% 25%, rgba(11, 216, 106, 0.16), transparent 60%),
      radial-gradient(900px 600px at 70% 15%, rgba(134, 230, 198, 0.14), transparent 55%),
      radial-gradient(900px 900px at 50% 85%, rgba(11, 216, 106, 0.08), transparent 60%),
      linear-gradient(180deg, #050907 0%, #030605 100%);
  }

  .splash-canvas {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
  }

  .splash-overlay {
    position: absolute;
    inset: 0;
    display: grid;
    place-items: center;
    padding: 32px 20px;
  }

  .splash-grid {
    width: min(1120px, 100%);
    display: grid;
    gap: 28px;
    align-items: center;
    grid-template-columns: 1.25fr 0.75fr;
  }

  .splash-hero {
    color: rgba(255, 255, 255, 0.92);
    text-shadow: 0 2px 28px rgba(0, 0, 0, 0.28);
  }

  .splash-logo {
    width: 280px;
    max-width: 72vw;
    filter: drop-shadow(0 22px 45px rgba(0, 0, 0, 0.35));
    transform-origin: 20% 60%;
    animation: splashFloat 7.5s ease-in-out infinite;
  }

  .splash-title {
    margin: 0;
    font-family: "Space Grotesk", ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    font-weight: 800;
    letter-spacing: -0.02em;
    font-size: clamp(42px, 5vw, 72px);
    line-height: 1.02;
  }

  .splash-subtitle {
    margin: 10px 0 16px;
    font-family: "Space Grotesk", ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    font-weight: 700;
    letter-spacing: -0.01em;
    font-size: clamp(22px, 2.2vw, 36px);
    color: rgba(255, 255, 255, 0.86);
  }

  .splash-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    margin: 18px 0 14px;
  }

  .splash-button {
    border-radius: 18px;
    padding: 14px 18px;
    font-family: "Space Grotesk", ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    font-weight: 700;
    letter-spacing: -0.01em;
    user-select: none;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    position: relative;
    overflow: hidden;
    transform: translateZ(0);
    transition: transform 220ms ease, filter 220ms ease, background-color 220ms ease;
    backdrop-filter: blur(10px);
  }

  .splash-button::after {
    content: "";
    position: absolute;
    inset: -40% -20%;
    background: conic-gradient(from 180deg, rgba(255, 255, 255, 0.02), rgba(11, 216, 106, 0.3), rgba(255, 255, 255, 0.02));
    opacity: 0.85;
    transform: translateX(-45%) rotate(12deg);
    transition: transform 380ms ease;
    pointer-events: none;
    mix-blend-mode: screen;
  }

  .splash-button:hover {
    transform: translateY(-2px) scale(1.02);
    filter: drop-shadow(0 16px 34px rgba(11, 216, 106, 0.16));
  }

  .splash-button:hover::after {
    transform: translateX(18%) rotate(12deg);
  }

  .splash-button-primary {
    background: rgba(11, 216, 106, 0.16);
    color: rgb(210, 255, 232);
    border: 1px solid rgba(11, 216, 106, 0.28);
  }

  .splash-button-primary:hover {
    background: rgba(11, 216, 106, 0.2);
  }

  .splash-button-disabled {
    background: rgba(255, 255, 255, 0.08);
    color: rgba(255, 255, 255, 0.6);
    border: 1px solid rgba(255, 255, 255, 0.12);
    cursor: not-allowed;
  }

  .splash-button-disabled:hover {
    transform: none;
    filter: none;
  }

  .splash-button-disabled:hover::after {
    transform: translateX(-45%) rotate(12deg);
  }

  .splash-question {
    margin: 0;
    font-size: clamp(18px, 1.4vw, 22px);
    color: rgba(255, 255, 255, 0.84);
  }

  .splash-counter {
    justify-self: end;
    align-self: stretch;
    display: grid;
    place-items: center;
    perspective: 800px;
  }

  .splash-counter-inner {
    width: min(360px, 42vw);
    aspect-ratio: 1 / 1;
    border-radius: 32px;
    background: radial-gradient(110% 120% at 20% 30%, rgba(11, 216, 106, 0.12), rgba(255, 255, 255, 0.04) 55%, rgba(0, 0, 0, 0.18)),
      linear-gradient(180deg, rgba(255, 255, 255, 0.06), rgba(255, 255, 255, 0.02));
    border: 1px solid rgba(11, 216, 106, 0.18);
    box-shadow: 0 42px 120px rgba(0, 0, 0, 0.55);
    display: grid;
    place-items: center;
    transform: rotateY(-12deg) rotateX(6deg);
    animation: splashTilt 6.2s ease-in-out infinite;
    backdrop-filter: blur(12px);
  }

  .splash-counter-number {
    font-size: clamp(64px, 9vw, 120px);
    font-family: "Space Grotesk", ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    font-weight: 900;
    letter-spacing: -0.06em;
    line-height: 0.92;
    color: rgba(255, 255, 255, 0.92);
    text-shadow: 0 22px 90px rgba(11, 216, 106, 0.24);
    background: linear-gradient(180deg, rgba(255, 255, 255, 0.95), rgba(208, 255, 232, 0.85) 60%, rgba(11, 216, 106, 0.7));
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    filter: drop-shadow(0 18px 40px rgba(0, 0, 0, 0.38));
  }

  @keyframes splashFloat {
    0% {
      transform: translateY(0) rotate(-1deg) scale(1);
    }
    50% {
      transform: translateY(-10px) rotate(1.4deg) scale(1.01);
    }
    100% {
      transform: translateY(0) rotate(-1deg) scale(1);
    }
  }

  @keyframes splashTilt {
    0% {
      transform: rotateY(-12deg) rotateX(6deg) translateY(0);
    }
    50% {
      transform: rotateY(-8deg) rotateX(10deg) translateY(-10px);
    }
    100% {
      transform: rotateY(-12deg) rotateX(6deg) translateY(0);
    }
  }

  @media (max-width: 900px) {
    .splash {
      min-height: 760px;
      height: auto;
      padding-bottom: 24px;
    }

    .splash-overlay {
      position: relative;
    }

    .splash-grid {
      grid-template-columns: 1fr;
    }

    .splash-counter {
      justify-self: start;
    }

    .splash-counter-inner {
      width: min(420px, 86vw);
      transform: rotateY(-8deg) rotateX(6deg);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .splash-logo,
    .splash-counter-inner {
      animation: none;
    }

    .splash-button,
    .splash-button::after {
      transition: none;
    }
  }
</style>
