<script>
  import { onMount } from "svelte";

  let canvas;

  onMount(() => {
    let destroyed = false;
    let renderer;
    let scene;
    let camera;
    let composer;
    let frame = 0;
    let ro;
    let onPointerMove;
    let onVisibility;
    let running = true;
    let targetX = 0;
    let targetY = 0;
    let px = 0;
    let py = 0;
    let start = performance.now();
    let reduced = false;

    (async () => {
      if (!canvas) return;
      reduced =
        typeof window !== "undefined" &&
        window.matchMedia &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

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

      if (destroyed) return;

      scene = new THREE.Scene();
      scene.fog = new THREE.FogExp2(0x03110b, 0.06);

      camera = new THREE.PerspectiveCamera(50, 1, 0.1, 200);
      camera.position.set(0, 0.2, 6.5);

      renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      });
      renderer.setClearColor(0x000000, 0);
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.1;

      composer = new EffectComposer(renderer);
      composer.addPass(new RenderPass(scene, camera));
      const bloom = new UnrealBloomPass(
        new THREE.Vector2(1, 1),
        reduced ? 0.6 : 1.35,
        0.55,
        0.12
      );
      composer.addPass(bloom);

      const ambient = new THREE.AmbientLight(0xb6ffe1, 0.25);
      scene.add(ambient);

      const key = new THREE.DirectionalLight(0x86e293, 1.2);
      key.position.set(3, 4, 2);
      scene.add(key);

      const rim = new THREE.PointLight(0x86e6c6, 3.5, 30);
      rim.position.set(-6, 1.5, 6);
      scene.add(rim);

      const sparkGeom = new THREE.BufferGeometry();
      const count = reduced ? 6000 : 18000;
      const pos = new Float32Array(count * 3);
      const seed = new Float32Array(count);
      for (let i = 0; i < count; i++) {
        const u = Math.random();
        const v = Math.random();
        const w = Math.random();
        const r = 7.5 * Math.cbrt(u);
        const theta = 2 * Math.PI * v;
        const phi = Math.acos(2 * w - 1);
        const x = r * Math.sin(phi) * Math.cos(theta);
        const y = r * Math.cos(phi) * 0.6;
        const z = r * Math.sin(phi) * Math.sin(theta);
        pos[i * 3 + 0] = x;
        pos[i * 3 + 1] = y;
        pos[i * 3 + 2] = z;
        seed[i] = Math.random();
      }
      sparkGeom.setAttribute("position", new THREE.BufferAttribute(pos, 3));
      sparkGeom.setAttribute("aSeed", new THREE.BufferAttribute(seed, 1));

      const sparkMat = new THREE.ShaderMaterial({
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        uniforms: {
          uTime: { value: 0 },
          uPixelRatio: { value: 1 },
        },
        vertexShader: `
          uniform float uTime;
          uniform float uPixelRatio;
          attribute float aSeed;
          varying float vSeed;
          varying float vDepth;
          void main() {
            vSeed = aSeed;
            vec3 p = position;
            float t = uTime * 0.6 + aSeed * 20.0;
            p.x += sin(t * 1.3) * 0.10;
            p.y += cos(t * 1.1) * 0.08;
            p.z += sin(t * 1.7) * 0.10;
            vec4 mv = modelViewMatrix * vec4(p, 1.0);
            vDepth = -mv.z;
            gl_Position = projectionMatrix * mv;
            float size = 9.0 + 10.0 * sin(t);
            gl_PointSize = (size * uPixelRatio) / max(0.3, vDepth);
          }
        `,
        fragmentShader: `
          precision highp float;
          varying float vSeed;
          varying float vDepth;
          void main() {
            vec2 uv = gl_PointCoord - 0.5;
            float d = length(uv);
            float a = smoothstep(0.5, 0.0, d);
            float tw = 0.5 + 0.5 * sin(vSeed * 120.0 + vDepth * 0.6);
            vec3 c1 = vec3(0.525, 0.886, 0.576);
            vec3 c2 = vec3(0.525, 0.902, 0.776);
            vec3 col = mix(c1, c2, tw);
            gl_FragColor = vec4(col, a * (0.30 + 0.70 * tw));
          }
        `,
      });
      const sparks = new THREE.Points(sparkGeom, sparkMat);
      sparks.position.set(0, -0.1, 0);
      scene.add(sparks);

      const knot = new THREE.Mesh(
        new THREE.TorusKnotGeometry(1.25, 0.36, 240, 32, 2, 5),
        new THREE.MeshStandardMaterial({
          color: 0x0b2a1c,
          emissive: 0x86e293,
          emissiveIntensity: reduced ? 0.6 : 1.25,
          roughness: 0.22,
          metalness: 0.78,
        })
      );
      knot.position.set(0.0, -0.05, 0.0);
      scene.add(knot);

      const ring = new THREE.Mesh(
        new THREE.TorusGeometry(2.55, 0.022, 16, 320),
        new THREE.MeshBasicMaterial({
          color: 0x86e6c6,
          transparent: true,
          opacity: 0.35,
        })
      );
      ring.rotation.x = Math.PI * 0.52;
      ring.rotation.y = Math.PI * 0.10;
      scene.add(ring);

      const root = canvas.parentElement ?? canvas;

      const resize = () => {
        const rect = root.getBoundingClientRect();
        const w = Math.max(1, Math.floor(rect.width));
        const h = Math.max(1, Math.floor(rect.height));
        const dpr = Math.min(2, window.devicePixelRatio || 1);
        renderer.setPixelRatio(dpr);
        renderer.setSize(w, h, false);
        composer.setSize(w, h);
        composer.setPixelRatio(dpr);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        sparkMat.uniforms.uPixelRatio.value = dpr;
      };

      ro = new ResizeObserver(resize);
      ro.observe(root);
      resize();

      onPointerMove = (e) => {
        const rect = root.getBoundingClientRect();
        const nx = (e.clientX - rect.left) / Math.max(1, rect.width);
        const ny = (e.clientY - rect.top) / Math.max(1, rect.height);
        targetX = (nx - 0.5) * 2;
        targetY = (ny - 0.5) * 2;
      };
      window.addEventListener("pointermove", onPointerMove, { passive: true });

      onVisibility = () => {
        running = document.visibilityState === "visible";
      };
      document.addEventListener("visibilitychange", onVisibility, { passive: true });

      const tick = (now) => {
        if (destroyed) return;
        frame = requestAnimationFrame(tick);
        if (!running) return;

        const t = (now - start) / 1000;
        sparkMat.uniforms.uTime.value = t;

        px += (targetX - px) * 0.035;
        py += (targetY - py) * 0.035;

        camera.position.x = px * 0.55;
        camera.position.y = 0.2 + -py * 0.35;
        camera.lookAt(0, 0, 0);

        sparks.rotation.y = t * 0.06;
        sparks.rotation.x = Math.sin(t * 0.12) * 0.08;

        knot.rotation.y = t * 0.34;
        knot.rotation.x = t * 0.22;
        knot.rotation.z = Math.sin(t * 0.28) * 0.18;

        ring.rotation.z = t * 0.08;

        composer.render();
      };
      frame = requestAnimationFrame(tick);
    })();

    return () => {
      destroyed = true;
      cancelAnimationFrame(frame);
      if (onPointerMove) window.removeEventListener("pointermove", onPointerMove);
      if (onVisibility) document.removeEventListener("visibilitychange", onVisibility);
      if (ro) ro.disconnect();
      if (composer) composer.dispose();
      if (renderer) renderer.dispose();
      if (scene) {
        scene.traverse((o) => {
          if (o.geometry) o.geometry.dispose();
          if (o.material) {
            if (Array.isArray(o.material)) o.material.forEach((m) => m.dispose());
            else o.material.dispose();
          }
        });
      }
    };
  });
</script>

<canvas bind:this={canvas} class="h-full w-full"></canvas>
