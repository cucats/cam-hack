<script>
  import { onMount } from "svelte";
  import * as THREE from "three";
  import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
  import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
  import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";

  let container;
  let canvas;

  onMount(() => {
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x05080a, 0.035);

    const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 120);
    camera.position.set(0, 0.15, 6.2);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    const composer = new EffectComposer(renderer);
    const renderPass = new RenderPass(scene, camera);
    composer.addPass(renderPass);

    const bloom = new UnrealBloomPass(new THREE.Vector2(1, 1), 1.0, 0.25, 0.1);
    bloom.strength = 1.05;
    bloom.radius = 0.22;
    bloom.threshold = 0.08;
    composer.addPass(bloom);

    const root = new THREE.Group();
    scene.add(root);

    const ambient = new THREE.AmbientLight(0xb6ffe0, 0.6);
    scene.add(ambient);
    const key = new THREE.DirectionalLight(0xa8ffcc, 1.35);
    key.position.set(2.2, 2.6, 3.6);
    scene.add(key);
    const rim = new THREE.DirectionalLight(0x46f48a, 0.9);
    rim.position.set(-3.2, -1.1, -2.4);
    scene.add(rim);

    const clock = new THREE.Clock();

    const pointer = { x: 0, y: 0 };
    const pointerTarget = { x: 0, y: 0 };

    const v = `
      uniform float uTime;
      uniform float uBreathe;
      attribute float aSeed;
      varying float vSeed;
      varying float vDepth;
      void main() {
        vSeed = aSeed;
        vec3 p = position;
        float t = uTime * 0.55 + aSeed * 10.0;
        float w = sin(t) * 0.45 + cos(t * 1.3) * 0.25;
        p.x += sin(p.z * 0.75 + t) * 0.25;
        p.y += cos(p.x * 0.85 + t) * 0.25;
        p.z += w * uBreathe;
        vec4 mv = modelViewMatrix * vec4(p, 1.0);
        vDepth = -mv.z;
        gl_Position = projectionMatrix * mv;
        gl_PointSize = (6.0 + 18.0 * aSeed) * (1.0 / max(0.25, vDepth)) * 140.0;
      }
    `;

    const f = `
      precision highp float;
      uniform vec3 uA;
      uniform vec3 uB;
      uniform float uTime;
      varying float vSeed;
      varying float vDepth;
      void main() {
        vec2 uv = gl_PointCoord.xy * 2.0 - 1.0;
        float r = dot(uv, uv);
        float m = smoothstep(1.0, 0.0, r);
        float tw = 0.55 + 0.45 * sin(uTime * 1.25 + vSeed * 12.0);
        vec3 col = mix(uA, uB, vSeed);
        col = mix(col, vec3(1.0), 0.12 * tw);
        float fade = smoothstep(0.0, 12.0, vDepth);
        float alpha = m * (0.35 + 0.65 * tw) * fade;
        gl_FragColor = vec4(col, alpha);
      }
    `;

    const particleCount = 3400;
    const positions = new Float32Array(particleCount * 3);
    const seeds = new Float32Array(particleCount);

    const rng = (n) => {
      const x = Math.sin(n * 999.123) * 43758.5453;
      return x - Math.floor(x);
    };

    for (let i = 0; i < particleCount; i++) {
      const a = rng(i + 1) * Math.PI * 2;
      const b = Math.acos(2 * rng(i + 7) - 1);
      const r = 1.2 + 2.8 * Math.pow(rng(i + 13), 1.35);

      const x = r * Math.sin(b) * Math.cos(a);
      const y = r * Math.cos(b) * 0.72;
      const z = r * Math.sin(b) * Math.sin(a);

      positions[i * 3 + 0] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
      seeds[i] = rng(i + 101);
    }

    const particlesGeo = new THREE.BufferGeometry();
    particlesGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    particlesGeo.setAttribute("aSeed", new THREE.BufferAttribute(seeds, 1));

    const particlesMat = new THREE.ShaderMaterial({
      vertexShader: v,
      fragmentShader: f,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: {
        uTime: { value: 0 },
        uBreathe: { value: 0.8 },
        uA: { value: new THREE.Color("#46f48a") },
        uB: { value: new THREE.Color("#86e6c6") },
      },
    });

    const particles = new THREE.Points(particlesGeo, particlesMat);
    particles.rotation.x = -0.2;
    root.add(particles);

    const knotMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color("#0b2b1f"),
      emissive: new THREE.Color("#46f48a"),
      emissiveIntensity: 1.1,
      metalness: 0.35,
      roughness: 0.2,
    });

    const knots = [];
    const knotGeos = [
      new THREE.TorusKnotGeometry(1.05, 0.18, 360, 18, 2, 3),
      new THREE.TorusKnotGeometry(1.35, 0.1, 420, 14, 3, 7),
    ];
    for (let i = 0; i < knotGeos.length; i++) {
      const mesh = new THREE.Mesh(knotGeos[i], knotMat);
      mesh.position.set(i === 0 ? -0.4 : 0.65, i === 0 ? 0.1 : -0.25, i === 0 ? -1.4 : -2.1);
      mesh.rotation.set(rng(i + 31) * 0.5, rng(i + 41) * 0.9, rng(i + 51) * 0.4);
      mesh.scale.setScalar(i === 0 ? 1.0 : 0.9);
      root.add(mesh);
      knots.push(mesh);
    }

    const planeGeo = new THREE.PlaneGeometry(30, 30, 1, 1);
    const planeMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color("#05080a"),
      transparent: true,
      opacity: 0.55,
    });
    const plane = new THREE.Mesh(planeGeo, planeMat);
    plane.position.set(0, 0, -8);
    root.add(plane);

    const resize = () => {
      const w = container?.clientWidth || window.innerWidth;
      const h = container?.clientHeight || window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h, false);
      composer.setSize(w, h);
      bloom.setSize(w, h);
    };
    resize();

    const onPointer = (e) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      pointerTarget.x = (x - 0.5) * 2;
      pointerTarget.y = (y - 0.5) * 2;
    };

    const onScroll = () => {};

    window.addEventListener("pointermove", onPointer, { passive: true });
    window.addEventListener("resize", resize, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });

    let raf = 0;
    const animate = () => {
      raf = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      pointer.x += (pointerTarget.x - pointer.x) * 0.06;
      pointer.y += (pointerTarget.y - pointer.y) * 0.06;

      root.rotation.y = pointer.x * 0.25 + Math.sin(t * 0.08) * 0.08;
      root.rotation.x = -pointer.y * 0.18 + Math.cos(t * 0.07) * 0.06;

      particlesMat.uniforms.uTime.value = t;
      particlesMat.uniforms.uBreathe.value = prefersReducedMotion ? 0.12 : 0.8 + 0.15 * Math.sin(t * 0.7);

      for (let i = 0; i < knots.length; i++) {
        const k = knots[i];
        const s = i === 0 ? 1 : -1;
        k.rotation.x += (0.0024 + i * 0.001) * s;
        k.rotation.y += (0.0019 + i * 0.0008) * -s;
        k.position.y = (i === 0 ? 0.1 : -0.25) + Math.sin(t * 0.55 + i * 1.7) * (prefersReducedMotion ? 0.01 : 0.06);
      }

      camera.position.x = pointer.x * 0.25;
      camera.position.y = 0.15 - pointer.y * 0.2;
      camera.lookAt(0, 0, -1.8);

      composer.render();
    };

    animate();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onPointer);
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", onScroll);

      particlesGeo.dispose();
      particlesMat.dispose();
      knotGeos.forEach((g) => g.dispose());
      knotMat.dispose();
      planeGeo.dispose();
      planeMat.dispose();
      composer.dispose();
      renderer.dispose();
    };
  });
</script>

<div bind:this={container} class="scene">
  <canvas bind:this={canvas} class="scene-canvas"></canvas>
</div>

<style>
  .scene {
    position: absolute;
    inset: 0;
    overflow: hidden;
  }

  .scene-canvas {
    width: 100%;
    height: 100%;
    display: block;
  }
</style>
