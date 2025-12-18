<script>
  import { onMount } from "svelte";
  import * as THREE from "three";

  let container;

  onMount(() => {
    if (!container) return;

    const reduce = globalThis.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x060a08, 0.12);

    const camera = new THREE.PerspectiveCamera(55, 1, 0.01, 80);
    camera.position.set(0, 0, 6);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    renderer.setPixelRatio(Math.min(2, globalThis.devicePixelRatio || 1));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    const pointer = new THREE.Vector2(0, 0);
    const pointerTarget = new THREE.Vector2(0, 0);

    const planeGeo = new THREE.PlaneGeometry(18, 10, 1, 1);
    const planeMat = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      uniforms: {
        uTime: { value: 0 },
        uA: { value: new THREE.Color("#0a1f16") },
        uB: { value: new THREE.Color("#07d27b") },
        uC: { value: new THREE.Color("#86e6c6") }
      },
      vertexShader: "varying vec2 vUv;\nvoid main(){\nvUv=uv;\nvec4 mv=modelViewMatrix*vec4(position,1.0);\ngl_Position=projectionMatrix*mv;\n}",
      fragmentShader:
        "uniform float uTime;\nuniform vec3 uA;\nuniform vec3 uB;\nuniform vec3 uC;\nvarying vec2 vUv;\nfloat hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453123);}\nfloat noise(vec2 p){\nvec2 i=floor(p);\nvec2 f=fract(p);\nfloat a=hash(i);\nfloat b=hash(i+vec2(1.0,0.0));\nfloat c=hash(i+vec2(0.0,1.0));\nfloat d=hash(i+vec2(1.0,1.0));\nvec2 u=f*f*(3.0-2.0*f);\nreturn mix(a,b,u.x)+(c-a)*u.y*(1.0-u.x)+(d-b)*u.x*u.y;\n}\nvoid main(){\nvec2 uv=vUv;\nvec2 q=uv*vec2(2.2,1.2);\nfloat n=noise(q*2.2+uTime*0.05);\nfloat n2=noise(q*5.0-uTime*0.08);\nfloat v=pow(1.0-abs(uv.y-0.52)*1.8,2.0);\nvec3 col=mix(uA,uB,clamp(uv.x*0.9+0.05+n*0.25,0.0,1.0));\ncol=mix(col,uC,clamp(v*0.75+n2*0.35,0.0,1.0));\nfloat a=smoothstep(0.0,0.7,v)*0.95;\nfloat vign=smoothstep(1.25,0.25,length(uv-0.5));\ngl_FragColor=vec4(col,a*vign);\n}"
    });

    const plane = new THREE.Mesh(planeGeo, planeMat);
    plane.position.z = -5.5;
    scene.add(plane);

    const count = reduce ? 0 : 5200;
    const pos = new Float32Array(count * 3);
    const seed = new Float32Array(count);
    const size = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const r1 = Math.random();
      const r2 = Math.random();
      const r3 = Math.random();
      pos[i3 + 0] = (r1 - 0.5) * 14;
      pos[i3 + 1] = (r2 - 0.5) * 8;
      pos[i3 + 2] = (r3 - 0.5) * 10;
      seed[i] = Math.random();
      size[i] = 1.8 + Math.random() * 2.4;
    }

    const pointsGeo = new THREE.BufferGeometry();
    pointsGeo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    pointsGeo.setAttribute("aSeed", new THREE.BufferAttribute(seed, 1));
    pointsGeo.setAttribute("aSize", new THREE.BufferAttribute(size, 1));

    const pointsMat = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: {
        uTime: { value: 0 },
        uPointer: { value: new THREE.Vector2(0, 0) },
        uA: { value: new THREE.Color("#22c55e") },
        uB: { value: new THREE.Color("#86e6c6") }
      },
      vertexShader:
        "uniform float uTime;\nuniform vec2 uPointer;\nattribute float aSeed;\nattribute float aSize;\nvarying float vSeed;\nvoid main(){\nvec3 p=position;\nfloat t=uTime*0.22;\nfloat s=aSeed*12.0;\np.x+=sin(t+s)*0.45;\np.y+=cos(t*1.12+s*0.9)*0.35;\np.z+=sin(t*0.9+s*0.7)*0.55;\np.xy+=uPointer*0.9*(0.15+aSeed);\nvec4 mv=modelViewMatrix*vec4(p,1.0);\ngl_Position=projectionMatrix*mv;\ngl_PointSize=aSize*(160.0/(-mv.z));\nvSeed=aSeed;\n}",
      fragmentShader:
        "uniform float uTime;\nuniform vec3 uA;\nuniform vec3 uB;\nvarying float vSeed;\nvoid main(){\nvec2 uv=gl_PointCoord-0.5;\nfloat d=length(uv);\nfloat a=smoothstep(0.5,0.0,d);\nfloat flick=0.65+0.35*sin(uTime*2.2+vSeed*30.0);\nvec3 c=mix(uA,uB,fract(vSeed*7.13+uTime*0.02));\nfloat core=pow(max(0.0,1.0-d*1.8),2.0);\nvec3 col=c*(0.65+0.35*core);\ngl_FragColor=vec4(col,a*a*flick);\n}"
    });

    const points = new THREE.Points(pointsGeo, pointsMat);
    scene.add(points);

    const clock = new THREE.Clock();

    const resize = () => {
      const w = container.clientWidth || 1;
      const h = container.clientHeight || 1;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h, false);
    };

    const onMove = (e) => {
      const x = (e.clientX / globalThis.innerWidth) * 2 - 1;
      const y = (e.clientY / globalThis.innerHeight) * 2 - 1;
      pointerTarget.set(x, -y);
    };

    const onLeave = () => {
      pointerTarget.set(0, 0);
    };

    resize();
    globalThis.addEventListener("resize", resize, { passive: true });
    globalThis.addEventListener("pointermove", onMove, { passive: true });
    globalThis.addEventListener("pointerleave", onLeave, { passive: true });

    let raf = 0;

    const tick = () => {
      raf = globalThis.requestAnimationFrame(tick);
      const t = clock.getElapsedTime();

      pointer.lerp(pointerTarget, 0.08);

      planeMat.uniforms.uTime.value = t;
      pointsMat.uniforms.uTime.value = t;
      pointsMat.uniforms.uPointer.value.set(pointer.x, pointer.y);

      points.rotation.z = t * 0.04;
      points.rotation.y = Math.sin(t * 0.12) * 0.06;

      renderer.render(scene, camera);
    };

    tick();

    return () => {
      globalThis.cancelAnimationFrame(raf);
      globalThis.removeEventListener("resize", resize);
      globalThis.removeEventListener("pointermove", onMove);
      globalThis.removeEventListener("pointerleave", onLeave);
      renderer.dispose();
      pointsGeo.dispose();
      pointsMat.dispose();
      planeGeo.dispose();
      planeMat.dispose();
      container.removeChild(renderer.domElement);
    };
  });
</script>

<div class="three" bind:this={container}></div>

<style>
  .three {
    position: absolute;
    inset: 0;
    pointer-events: none;
  }

  .three :global(canvas) {
    width: 100% !important;
    height: 100% !important;
    display: block;
  }
</style>
