<script>
  import { onDestroy, onMount } from "svelte";
  import * as THREE from "three";

  let host;
  let canvas;

  let renderer;
  let scene;
  let camera;
  let raf = 0;
  let ro;
  let io;

  let pointerX = 0;
  let pointerY = 0;
  let targetX = 0;
  let targetY = 0;
  let t = 0;
  let active = true;

  const onPointerMove = (e) => {
    if (!host) return;
    const r = host.getBoundingClientRect();
    const x = (e.clientX - r.left) / Math.max(1, r.width);
    const y = (e.clientY - r.top) / Math.max(1, r.height);
    pointerX = (x - 0.5) * 2;
    pointerY = (y - 0.5) * 2;
  };

  const setSize = () => {
    if (!host || !renderer || !camera) return;
    const r = host.getBoundingClientRect();
    const w = Math.max(1, Math.floor(r.width));
    const h = Math.max(1, Math.floor(r.height));
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  };

  onMount(() => {
    renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(2, window.devicePixelRatio || 1));

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(48, 1, 0.1, 80);
    camera.position.set(0, 0, 8);

    const ambient = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambient);

    const key = new THREE.DirectionalLight(0xefffee, 1.2);
    key.position.set(2.6, 2.2, 3.5);
    scene.add(key);

    const rim = new THREE.DirectionalLight(0x00ff88, 0.9);
    rim.position.set(-2.8, -1.8, 2.8);
    scene.add(rim);

    const bg = new THREE.Mesh(
      new THREE.PlaneGeometry(32, 18, 1, 1),
      new THREE.ShaderMaterial({
        transparent: true,
        depthWrite: false,
        uniforms: {
          uTime: { value: 0 },
          uA: { value: new THREE.Color("#0b1a12") },
          uB: { value: new THREE.Color("#08110d") },
          uC: { value: new THREE.Color("#0a2c18") },
        },
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
          uniform vec3 uA;
          uniform vec3 uB;
          uniform vec3 uC;
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
          void main() {
            vec2 uv = vUv;
            vec2 p = (uv - 0.5) * vec2(1.6, 1.0);
            float n1 = noise(p * 2.4 + uTime * 0.05);
            float n2 = noise(p * 5.2 - uTime * 0.08);
            float v = smoothstep(-0.2, 1.2, 0.55 + 0.28 * sin(uTime * 0.4 + p.x * 2.0) + 0.35 * n1 + 0.18 * n2);
            vec3 col = mix(uB, uA, v);
            float glow = pow(max(0.0, 1.0 - length(p) * 0.9), 2.2);
            col = mix(col, uC, glow);
            float alpha = 0.92 * smoothstep(1.1, 0.2, length(p));
            gl_FragColor = vec4(col, alpha);
          }
        `,
      }),
    );
    bg.position.set(0, 0, -10);
    scene.add(bg);

    const group = new THREE.Group();
    scene.add(group);

    const ribbons = 5;
    for (let i = 0; i < ribbons; i += 1) {
      const pts = [];
      const turns = 9 + i * 2;
      const radius = 1.4 + i * 0.18;
      for (let k = 0; k < 140; k += 1) {
        const a = (k / 140) * Math.PI * 2 * turns;
        const r = radius + 0.35 * Math.sin(a * 0.33 + i * 1.8);
        const x = Math.cos(a) * r;
        const y = Math.sin(a) * r * 0.7;
        const z = 0.65 * Math.sin(a * 0.22 + i * 2.2);
        pts.push(new THREE.Vector3(x, y, z));
      }
      const curve = new THREE.CatmullRomCurve3(pts, true, "catmullrom", 0.5);
      const tube = new THREE.TubeGeometry(curve, 700, 0.035 + i * 0.008, 10, true);
      const mat = new THREE.MeshPhysicalMaterial({
        color: new THREE.Color(i % 2 === 0 ? "#00ff88" : "#86e6c6"),
        roughness: 0.2,
        metalness: 0.35,
        transmission: 0.85,
        thickness: 0.7,
        transparent: true,
        opacity: 0.85,
        emissive: new THREE.Color("#00ff88"),
        emissiveIntensity: 0.32,
      });
      const mesh = new THREE.Mesh(tube, mat);
      mesh.rotation.z = (i / ribbons) * Math.PI * 0.9;
      group.add(mesh);
    }

    const stars = 1600;
    const starGeom = new THREE.BufferGeometry();
    const pos = new Float32Array(stars * 3);
    const col = new Float32Array(stars * 3);
    const c1 = new THREE.Color("#00ff88");
    const c2 = new THREE.Color("#6a5cff");
    for (let i = 0; i < stars; i += 1) {
      const u = Math.random();
      const v = Math.random();
      const theta = 2 * Math.PI * u;
      const phi = Math.acos(2 * v - 1);
      const r = 5.5 + Math.pow(Math.random(), 1.7) * 14;
      pos[i * 3 + 0] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.7;
      pos[i * 3 + 2] = r * Math.cos(phi);
      const cc = c1.clone().lerp(c2, Math.random() * 0.35);
      col[i * 3 + 0] = cc.r;
      col[i * 3 + 1] = cc.g;
      col[i * 3 + 2] = cc.b;
    }
    starGeom.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    starGeom.setAttribute("color", new THREE.BufferAttribute(col, 3));
    const starMat = new THREE.PointsMaterial({
      size: 0.02,
      transparent: true,
      opacity: 0.9,
      depthWrite: false,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
    });
    const starField = new THREE.Points(starGeom, starMat);
    scene.add(starField);

    setSize();

    ro = new ResizeObserver(() => setSize());
    ro.observe(host);

    io = new IntersectionObserver(
      (entries) => {
        active = entries.some((e) => e.isIntersecting);
      },
      { threshold: 0.08 },
    );
    io.observe(host);

    const tick = () => {
      raf = requestAnimationFrame(tick);
      if (!active) return;
      t += 0.016;
      targetX += (pointerX - targetX) * 0.06;
      targetY += (pointerY - targetY) * 0.06;
      camera.position.x = targetX * 0.8;
      camera.position.y = -targetY * 0.55;
      camera.lookAt(0, 0, 0);
      group.rotation.y = t * 0.22 + targetX * 0.35;
      group.rotation.x = t * 0.14 - targetY * 0.22;
      starField.rotation.y = -t * 0.03;
      starField.rotation.x = t * 0.02;
      bg.material.uniforms.uTime.value = t;
      renderer.render(scene, camera);
    };

    raf = requestAnimationFrame(tick);
    host.addEventListener("pointermove", onPointerMove, { passive: true });
    host.addEventListener("pointerleave", () => {
      pointerX = 0;
      pointerY = 0;
    });
  });

  onDestroy(() => {
    if (host) host.removeEventListener("pointermove", onPointerMove);
    if (raf) cancelAnimationFrame(raf);
    if (ro) ro.disconnect();
    if (io) io.disconnect();
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
  });
</script>

<div bind:this={host} class="three-host">
  <canvas bind:this={canvas} class="three-canvas"></canvas>
</div>

<style>
  .three-host {
    position: absolute;
    inset: 0;
    overflow: hidden;
    pointer-events: auto;
  }

  .three-canvas {
    width: 100%;
    height: 100%;
    display: block;
  }
</style>
