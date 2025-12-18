<script>
  import { onDestroy, onMount } from "svelte";
  import * as THREE from "three";

  let canvas;
  let root;

  let renderer;
  let scene;
  let camera;
  let group;
  let frame = 0;
  let ro;

  const uniforms = {
    uTime: { value: 0 },
    uPixelRatio: { value: 1 },
    uAccentA: { value: new THREE.Color("#22c55e") },
    uAccentB: { value: new THREE.Color("#34d399") },
    uAccentC: { value: new THREE.Color("#5eead4") },
  };

  function createPointsFromImage(img) {
    const w = 512;
    const h = Math.round((img.height / img.width) * w);
    const c = document.createElement("canvas");
    c.width = w;
    c.height = h;
    const ctx = c.getContext("2d", { willReadFrequently: true });
    ctx.clearRect(0, 0, w, h);
    ctx.drawImage(img, 0, 0, w, h);
    const { data } = ctx.getImageData(0, 0, w, h);

    const step = 3;
    const positions = [];
    const seeds = [];
    const alphas = [];
    for (let y = 0; y < h; y += step) {
      for (let x = 0; x < w; x += step) {
        const i = (y * w + x) * 4;
        const a = data[i + 3] / 255;
        if (a < 0.25) continue;
        const px = (x / w - 0.5) * 2.4;
        const py = (0.5 - y / h) * 1.2;
        const pz = (Math.random() - 0.5) * 0.25;
        positions.push(px, py, pz);
        seeds.push(Math.random(), Math.random(), Math.random(), Math.random());
        alphas.push(a);
      }
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(positions, 3),
    );
    geometry.setAttribute(
      "aSeed",
      new THREE.Float32BufferAttribute(seeds, 4),
    );
    geometry.setAttribute(
      "aAlpha",
      new THREE.Float32BufferAttribute(alphas, 1),
    );

    const material = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms,
      vertexShader: `
        uniform float uTime;
        uniform float uPixelRatio;
        attribute vec4 aSeed;
        attribute float aAlpha;
        varying float vAlpha;
        varying float vMix;

        float hash11(float p) {
          p = fract(p * 0.1031);
          p *= p + 33.33;
          p *= p + p;
          return fract(p);
        }

        void main() {
          vec3 p = position;
          float t = uTime * 0.18;
          float r = length(p.xy);
          float ang = atan(p.y, p.x);
          float drift = (aSeed.x - 0.5) * 0.85;
          float swirl = sin(ang * 2.0 + t * 2.2 + aSeed.y * 6.2831) * 0.08;
          float pulse = sin(t * 3.0 + r * 3.0 + aSeed.z * 6.2831) * 0.06;
          p.xy += vec2(cos(ang), sin(ang)) * pulse;
          p.xy += vec2(-sin(ang), cos(ang)) * swirl;
          p.z += drift * 0.15 + sin(t * 2.0 + aSeed.w * 6.2831) * 0.06;

          vMix = smoothstep(0.0, 1.5, r) * 0.7 + (aSeed.y * 0.3);
          vAlpha = aAlpha;

          vec4 mv = modelViewMatrix * vec4(p, 1.0);
          gl_Position = projectionMatrix * mv;

          float size = 4.5 + hash11(aSeed.x + aSeed.y * 11.0) * 6.0;
          size *= (1.0 / max(0.35, -mv.z));
          gl_PointSize = size * uPixelRatio;
        }
      `,
      fragmentShader: `
        uniform vec3 uAccentA;
        uniform vec3 uAccentB;
        uniform vec3 uAccentC;
        varying float vAlpha;
        varying float vMix;

        void main() {
          vec2 uv = gl_PointCoord * 2.0 - 1.0;
          float d = dot(uv, uv);
          float m = exp(-d * 2.8);
          vec3 col = mix(uAccentA, uAccentB, vMix);
          col = mix(col, uAccentC, smoothstep(0.15, 0.95, 1.0 - d));
          float a = m * (0.55 + vAlpha * 0.55);
          gl_FragColor = vec4(col * a, a);
        }
      `,
    });

    const points = new THREE.Points(geometry, material);
    points.frustumCulled = false;
    return points;
  }

  function setSize() {
    if (!root || !renderer || !camera) return;
    const r = root.getBoundingClientRect();
    const w = Math.max(1, Math.floor(r.width));
    const h = Math.max(1, Math.floor(r.height));
    const pr = Math.min(2, window.devicePixelRatio || 1);
    uniforms.uPixelRatio.value = pr;
    renderer.setPixelRatio(pr);
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }

  onMount(() => {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(46, 1, 0.01, 50);
    camera.position.set(0, 0, 3.35);

    renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setClearColor(0x000000, 0);

    group = new THREE.Group();
    scene.add(group);

    const ambient = new THREE.AmbientLight(0xffffff, 0.2);
    scene.add(ambient);

    const glow = new THREE.PointLight(0x22c55e, 3.2, 12);
    glow.position.set(1.5, 1.2, 2.5);
    scene.add(glow);

    const img = new Image();
    img.decoding = "async";
    img.src = "/cam-hack-logo-text.png";
    img.onload = () => {
      const points = createPointsFromImage(img);
      points.scale.set(1.05, 1.05, 1);
      group.add(points);
    };

    const starGeo = new THREE.BufferGeometry();
    const starCount = 1400;
    const starPos = new Float32Array(starCount * 3);
    const starSeed = new Float32Array(starCount * 4);
    for (let i = 0; i < starCount; i++) {
      const ix = i * 3;
      const r = Math.pow(Math.random(), 0.6) * 5.5;
      const a = Math.random() * Math.PI * 2;
      const y = (Math.random() - 0.5) * 2.4;
      starPos[ix + 0] = Math.cos(a) * r;
      starPos[ix + 1] = y;
      starPos[ix + 2] = (Math.random() - 0.5) * 2.6 - 1.2;
      const is = i * 4;
      starSeed[is + 0] = Math.random();
      starSeed[is + 1] = Math.random();
      starSeed[is + 2] = Math.random();
      starSeed[is + 3] = Math.random();
    }
    starGeo.setAttribute("position", new THREE.BufferAttribute(starPos, 3));
    starGeo.setAttribute("aSeed", new THREE.BufferAttribute(starSeed, 4));
    const stars = new THREE.Points(
      starGeo,
      new THREE.ShaderMaterial({
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        uniforms,
        vertexShader: `
          uniform float uTime;
          uniform float uPixelRatio;
          attribute vec4 aSeed;
          varying float vFade;
          void main() {
            vec3 p = position;
            float t = uTime * 0.08;
            p.xz *= mat2(cos(t + aSeed.x), -sin(t + aSeed.x), sin(t + aSeed.x), cos(t + aSeed.x));
            vec4 mv = modelViewMatrix * vec4(p, 1.0);
            gl_Position = projectionMatrix * mv;
            float s = 1.4 + aSeed.y * 2.4;
            s *= (1.0 / max(0.35, -mv.z));
            gl_PointSize = s * uPixelRatio;
            vFade = 0.35 + aSeed.z * 0.65;
          }
        `,
        fragmentShader: `
          uniform vec3 uAccentC;
          varying float vFade;
          void main() {
            vec2 uv = gl_PointCoord * 2.0 - 1.0;
            float d = dot(uv, uv);
            float m = exp(-d * 3.5);
            float a = m * vFade * 0.45;
            gl_FragColor = vec4(uAccentC * a, a);
          }
        `,
      }),
    );
    stars.frustumCulled = false;
    group.add(stars);

    let mx = 0;
    let my = 0;
    const onMove = (e) => {
      const r = root.getBoundingClientRect();
      mx = ((e.clientX - r.left) / Math.max(1, r.width) - 0.5) * 2;
      my = ((e.clientY - r.top) / Math.max(1, r.height) - 0.5) * 2;
    };
    root.addEventListener("pointermove", onMove, { passive: true });

    ro = new ResizeObserver(setSize);
    ro.observe(root);
    setSize();

    const tick = (t) => {
      uniforms.uTime.value = t / 1000;
      const targetX = my * 0.22;
      const targetY = mx * 0.22;
      group.rotation.x += (targetX - group.rotation.x) * 0.06;
      group.rotation.y += (targetY - group.rotation.y) * 0.06;
      group.rotation.z = Math.sin(uniforms.uTime.value * 0.15) * 0.03;
      renderer.render(scene, camera);
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);

    return () => {
      root.removeEventListener("pointermove", onMove);
    };
  });

  onDestroy(() => {
    if (frame) cancelAnimationFrame(frame);
    if (ro) ro.disconnect();
    if (scene) {
      scene.traverse((o) => {
        if (o.isMesh || o.isPoints) {
          if (o.geometry) o.geometry.dispose();
          if (o.material) o.material.dispose();
        }
      });
    }
    if (renderer) renderer.dispose();
  });
</script>

<div bind:this={root} class="three-root">
  <canvas bind:this={canvas} class="three-canvas"></canvas>
  <div class="three-vignette"></div>
  <div class="three-scan"></div>
</div>

<style>
  .three-root {
    position: absolute;
    inset: 0;
    overflow: hidden;
    pointer-events: none;
  }

  .three-canvas {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    display: block;
    filter: saturate(1.15) contrast(1.05);
    transform: translateZ(0);
  }

  .three-vignette {
    position: absolute;
    inset: -20%;
    background:
      radial-gradient(closest-side at 50% 55%, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.75) 62%, rgba(0, 0, 0, 0.95) 100%),
      radial-gradient(closest-side at 20% 20%, rgba(34, 197, 94, 0.14) 0%, rgba(0, 0, 0, 0) 55%),
      radial-gradient(closest-side at 80% 30%, rgba(94, 234, 212, 0.12) 0%, rgba(0, 0, 0, 0) 60%);
    mix-blend-mode: multiply;
  }

  .three-scan {
    position: absolute;
    inset: -50%;
    background: repeating-linear-gradient(
      to bottom,
      rgba(255, 255, 255, 0) 0px,
      rgba(255, 255, 255, 0) 3px,
      rgba(255, 255, 255, 0.04) 4px
    );
    opacity: 0.12;
    transform: translate3d(0, 0, 0);
    animation: scan 8s linear infinite;
  }

  @keyframes scan {
    0% {
      transform: translate3d(0, -12%, 0);
    }
    100% {
      transform: translate3d(0, 12%, 0);
    }
  }
</style>
