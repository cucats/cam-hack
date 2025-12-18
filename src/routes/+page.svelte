<script>
  import { onMount } from 'svelte';
  import * as THREE from 'three';

  let canvas;
  let container;
  
  const eventDate = new Date('2025-11-01T09:00:00'); 
  const today = new Date();
  const diffTime = Math.abs(today - eventDate);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
  
  const projects = [
    {
      title: "Unintended Behaviour",
      desc: "An exploration of unexpected system states and their consequences.",
      image: "/unintended.png"
    },
    {
      title: "EcoSynth",
      desc: "AI-driven biological material synthesis for sustainable packaging.",
      image: null
    },
    {
      title: "Quantum Ledger",
      desc: "Distributed consensus mechanisms for post-quantum cryptography.",
      image: null
    }
  ];

  onMount(() => {
    if (!canvas) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x050505);
    scene.fog = new THREE.FogExp2(0x050505, 0.002);

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 2000);
    camera.position.z = 1000;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);

    const geometry = new THREE.BufferGeometry();
    const particles = 2000;
    const positions = [];
    const colors = [];
    const color = new THREE.Color();

    for (let i = 0; i < particles; i++) {
      const x = Math.random() * 2000 - 1000;
      const y = Math.random() * 2000 - 1000;
      const z = Math.random() * 2000 - 1000;
      positions.push(x, y, z);

      color.setHSL(0.3 + Math.random() * 0.1, 1.0, 0.5);
      colors.push(color.r, color.g, color.b);
    }

    geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 4,
      vertexColors: true,
      transparent: true,
      opacity: 0.8
    });

    const particleSystem = new THREE.Points(geometry, material);
    scene.add(particleSystem);

    const icoGeometry = new THREE.IcosahedronGeometry(200, 1);
    const wireframe = new THREE.WireframeGeometry(icoGeometry);
    const lineMaterial = new THREE.LineBasicMaterial({ color: 0x00ff00, transparent: true, opacity: 0.3 });
    const icoLines = new THREE.LineSegments(wireframe, lineMaterial);
    scene.add(icoLines);

    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const windowHalfX = window.innerWidth / 2;
    const windowHalfY = window.innerHeight / 2;

    const onDocumentMouseMove = (event) => {
      mouseX = (event.clientX - windowHalfX);
      mouseY = (event.clientY - windowHalfY);
    };

    const onWindowResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    document.addEventListener('mousemove', onDocumentMouseMove);
    window.addEventListener('resize', onWindowResize);

    let frameId;
    const animate = () => {
      frameId = requestAnimationFrame(animate);

      targetX = mouseX * 0.001;
      targetY = mouseY * 0.001;

      particleSystem.rotation.y += 0.001;
      particleSystem.rotation.x += 0.0005;

      icoLines.rotation.x += 0.005;
      icoLines.rotation.y += 0.005;
      
      camera.position.x += (mouseX - camera.position.x) * 0.05;
      camera.position.y += (-mouseY - camera.position.y) * 0.05;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(frameId);
      document.removeEventListener('mousemove', onDocumentMouseMove);
      window.removeEventListener('resize', onWindowResize);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      icoGeometry.dispose();
      lineMaterial.dispose();
    };
  });
</script>

<div class="relative min-h-screen bg-black overflow-hidden text-emerald-50">
  <canvas
    bind:this={canvas}
    class="absolute inset-0 z-0 h-full w-full"
  ></canvas>

  <div class="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 sm:px-8">
    <div class="mb-12 text-center">
      <h1 class="font-mono text-6xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-green-600 drop-shadow-[0_0_15px_rgba(52,211,153,0.5)] sm:text-8xl">
        CAM HACK
      </h1>
      <h2 class="mt-4 font-mono text-3xl font-bold text-emerald-400 sm:text-4xl">
        2025
      </h2>
      <p class="mt-2 text-xl text-emerald-200/80">
        1st &ndash; 2nd November
      </p>
    </div>

    <div class="mb-16 rounded-2xl border border-emerald-500/30 bg-black/50 p-8 backdrop-blur-sm">
      <div class="text-center">
        <p class="text-sm uppercase tracking-widest text-emerald-500">Mission Status</p>
        <div class="mt-2 text-5xl font-bold text-white sm:text-7xl">
          T+{diffDays}<span class="text-2xl text-emerald-500">days</span>
        </div>
      </div>
    </div>

    <div class="w-full max-w-6xl">
      <h3 class="mb-8 text-center text-2xl font-bold uppercase tracking-wider text-emerald-400">
        Featured Projects
      </h3>
      <div class="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {#each projects as project}
          <div class="group relative overflow-hidden rounded-xl border border-emerald-500/20 bg-slate-900/40 p-6 transition-all hover:-translate-y-1 hover:border-emerald-500/50 hover:shadow-[0_0_20px_rgba(16,185,129,0.2)]">
            <div class="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100"></div>
            {#if project.image}
              <div class="mb-4 overflow-hidden rounded-lg">
                <img src={project.image} alt={project.title} class="h-48 w-full object-cover transition-transform duration-500 group-hover:scale-110" />
              </div>
            {:else}
              <div class="mb-4 flex h-48 w-full items-center justify-center rounded-lg bg-emerald-900/20 border border-emerald-500/10">
                <span class="text-4xl">🚀</span>
              </div>
            {/if}
            <h4 class="relative text-xl font-bold text-white">{project.title}</h4>
            <p class="relative mt-2 text-sm text-gray-400">{project.desc}</p>
          </div>
        {/each}
      </div>
    </div>
    
    <div class="mt-20 pb-10 text-center">
        <p class="text-emerald-500/60 text-sm">System Normal. Operations Nominal.</p>
    </div>
  </div>
</div>

<style>
  :global(body) {
    background-color: black;
    color: white;
  }
</style>
