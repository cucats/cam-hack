<script>
  import { onMount } from "svelte";

  export let quality = 1;

  let host;

  onMount(async () => {
    const [THREE, { EffectComposer }, { RenderPass }, { UnrealBloomPass }, { AfterimagePass }, { FilmPass }] =
      await Promise.all([
        import("three"),
        import("three/examples/jsm/postprocessing/EffectComposer.js"),
        import("three/examples/jsm/postprocessing/RenderPass.js"),
        import("three/examples/jsm/postprocessing/UnrealBloomPass.js"),
        import("three/examples/jsm/postprocessing/AfterimagePass.js"),
        import("three/examples/jsm/postprocessing/FilmPass.js")
      ]);

    const prefersReducedMotion = globalThis.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;

    const canvas = document.createElement("canvas");
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.style.display = "block";
    host.appendChild(canvas);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: "high-performance"
    });

    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x05070a, 0.16);

    const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 140);
    camera.position.set(0, 0.1, 8.2);

    const ambient = new THREE.AmbientLight(0xb8ffe9, 0.5);
    const key = new THREE.DirectionalLight(0xb1ff7a, 1.25);
    key.position.set(3, 4, 2);
    const rim = new THREE.DirectionalLight(0x7df7ff, 0.7);
    rim.position.set(-4, -2, 3);

    scene.add(ambient, key, rim);

    const root = new THREE.Group();
    scene.add(root);

    const grid = new THREE.GridHelper(40, 80, 0x2bff79, 0x0d2a1e);
    grid.position.y = -2.1;
    grid.rotation.x = Math.PI / 2;
    grid.material.transparent = true;
    grid.material.opacity = 0.18;
    root.add(grid);

    const knotGeo = new THREE.TorusKnotGeometry(1.4, 0.45, 540, 24);
    const knotMat = new THREE.MeshStandardMaterial({
      color: 0x2bff79,
      emissive: 0x0aff85,
      emissiveIntensity: 1.0,
      metalness: 0.35,
      roughness: 0.12
    });
    const knot = new THREE.Mesh(knotGeo, knotMat);
    knot.position.set(0.2, 0.2, -1.6);
    root.add(knot);

    const haloGeo = new THREE.IcosahedronGeometry(2.35, 6);
    const haloMat = new THREE.MeshStandardMaterial({
      color: 0x062016,
      emissive: 0x1cffaa,
      emissiveIntensity: 0.55,
      metalness: 0.0,
      roughness: 0.15,
      transparent: true,
      opacity: 0.34
    });
    const halo = new THREE.Mesh(haloGeo, haloMat);
    halo.position.copy(knot.position);
    root.add(halo);

    const particles = 1800;
    const pos = new Float32Array(particles * 3);
    const seed = new Float32Array(particles);

    for (let i = 0; i < particles; i++) {
      const r = 7.5 * Math.pow(Math.random(), 0.65);
      const a = Math.random() * Math.PI * 2;
      const b = (Math.random() - 0.5) * Math.PI;
      const x = Math.cos(a) * Math.cos(b) * r;
      const y = Math.sin(b) * r * 0.55;
      const z = Math.sin(a) * Math.cos(b) * r - 2.5;
      pos[i * 3 + 0] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;
      seed[i] = Math.random() * 10;
    }

    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute("position", new THREE.BufferAttribute(pos, 3));

    const pMat = new THREE.PointsMaterial({
      size: 0.022,
      color: 0x7df7ff,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    const pts = new THREE.Points(pGeo, pMat);
    root.add(pts);

    const composer = new EffectComposer(renderer);
    const renderPass = new RenderPass(scene, camera);
    const bloom = new UnrealBloomPass(new THREE.Vector2(1, 1), 1.0, 0.35, 0.0);
    bloom.threshold = 0.0;
    bloom.strength = prefersReducedMotion ? 0.55 : 1.25;
    bloom.radius = 0.62;
    const trails = new AfterimagePass(prefersReducedMotion ? 0.83 : 0.9);
    const film = new FilmPass(0.2, 0.12, 648, false);

    composer.addPass(renderPass);
    composer.addPass(bloom);
    composer.addPass(trails);
    composer.addPass(film);

    let w = 0;
    let h = 0;
    let raf = 0;
    let t0 = performance.now();

    const pointer = { x: 0, y: 0 };
    const target = { x: 0, y: 0 };

    const setSize = () => {
      const rect = host.getBoundingClientRect();
      w = Math.max(1, Math.floor(rect.width));
      h = Math.max(1, Math.floor(rect.height));

      const dpr = Math.max(1, Math.min(2.25, (globalThis.devicePixelRatio ?? 1) * quality));
      renderer.setPixelRatio(dpr);
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      composer.setSize(w, h);
      bloom.setSize(w, h);
    };

    const ro = new ResizeObserver(setSize);
    ro.observe(host);
    setSize();

    const onMove = (e) => {
      const rect = host.getBoundingClientRect();
      const nx = (e.clientX - rect.left) / rect.width;
      const ny = (e.clientY - rect.top) / rect.height;
      pointer.x = (nx - 0.5) * 2;
      pointer.y = (ny - 0.5) * 2;
    };

    host.addEventListener("pointermove", onMove, { passive: true });

    const tick = (t) => {
      const dt = Math.min(34, t - t0);
      t0 = t;

      const time = t * 0.0006;
      const damp = 1 - Math.pow(0.0012, dt);

      target.x += (pointer.x - target.x) * damp;
      target.y += (pointer.y - target.y) * damp;

      const rx = prefersReducedMotion ? 0.15 : 0.55;
      const ry = prefersReducedMotion ? 0.2 : 0.75;

      root.rotation.y = THREE.MathUtils.lerp(root.rotation.y, target.x * ry, 0.07);
      root.rotation.x = THREE.MathUtils.lerp(root.rotation.x, -target.y * rx, 0.07);

      knot.rotation.x = time * 1.15;
      knot.rotation.y = time * 1.35;
      knot.rotation.z = time * 0.65;

      halo.rotation.x = -time * 0.42;
      halo.rotation.y = time * 0.36;
      halo.rotation.z = -time * 0.28;

      const base = pGeo.attributes.position.array;
      for (let i = 0; i < particles; i++) {
        const k = i * 3;
        const s = seed[i];
        base[k + 1] += Math.sin(time * 2.2 + s) * 0.0009;
        base[k + 0] += Math.cos(time * 1.9 + s) * 0.0007;
      }
      pGeo.attributes.position.needsUpdate = true;

      camera.position.x = target.x * 0.45;
      camera.position.y = 0.12 + -target.y * 0.25;
      camera.lookAt(0, 0.05, -1.8);

      composer.render();
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      host.removeEventListener("pointermove", onMove);
      ro.disconnect();
      composer.dispose();
      renderer.dispose();
      knotGeo.dispose();
      knotMat.dispose();
      haloGeo.dispose();
      haloMat.dispose();
      pGeo.dispose();
      pMat.dispose();
      grid.geometry.dispose();
      if (Array.isArray(grid.material)) {
        for (const m of grid.material) m.dispose();
      } else {
        grid.material.dispose();
      }
      canvas.remove();
    };
  });
</script>

<div bind:this={host} class="absolute inset-0"></div>