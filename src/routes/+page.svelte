<script>
  import { onMount, onDestroy } from 'svelte';
  import * as THREE from 'three';
  import { fade, fly } from 'svelte/transition';

  let canvas;
  let renderer;
  let scene;
  let camera;
  let animationId;
  let daysSince = 0;

  const eventDate = new Date('2025-11-01T09:00:00');
  const today = new Date();
  
  const diffTime = today.getTime() - eventDate.getTime();
  daysSince = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  
  if (daysSince < 0) daysSince = 0;

  const projects = [
    { title: "EcoSync", desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore." },
    { title: "NeuralFlow", desc: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo." },
    { title: "CyberGuard", desc: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur." },
    { title: "BioSense", desc: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim." },
    { title: "QuantumLeap", desc: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium." }
  ];

  onMount(() => {
    // Scene Setup
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x020a05);
    scene.fog = new THREE.FogExp2(0x020a05, 0.002);

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 30;

    renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    const geometry = new THREE.IcosahedronGeometry(1, 0);
    const material = new THREE.MeshPhongMaterial({ 
      color: 0x00ff66, 
      wireframe: true,
      emissive: 0x004411,
      shininess: 100
    });

    const particles = [];
    const particleCount = 100;

    for (let i = 0; i < particleCount; i++) {
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.x = (Math.random() - 0.5) * 100;
      mesh.position.y = (Math.random() - 0.5) * 100;
      mesh.position.z = (Math.random() - 0.5) * 50;
      mesh.rotation.x = Math.random() * Math.PI;
      mesh.rotation.y = Math.random() * Math.PI;
      
      const scale = Math.random() * 2;
      mesh.scale.set(scale, scale, scale);

      mesh.userData = {
        speed: Math.random() * 0.02 + 0.01,
        rotationSpeed: Math.random() * 0.02,
        yOffset: Math.random() * 100
      };

      scene.add(mesh);
      particles.push(mesh);
    }

    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0x00ff66, 1, 100);
    pointLight.position.set(10, 10, 10);
    scene.add(pointLight);
    
    const pointLight2 = new THREE.PointLight(0x86e6c6, 1, 100);
    pointLight2.position.set(-10, -10, 10);
    scene.add(pointLight2);

    const animate = (time) => {
      animationId = requestAnimationFrame(animate);

      const t = time * 0.001;

      particles.forEach((mesh) => {
        mesh.rotation.x += mesh.userData.rotationSpeed;
        mesh.rotation.y += mesh.userData.rotationSpeed;
        mesh.position.y += Math.sin(t + mesh.userData.yOffset) * 0.05;
      });

      camera.position.x = Math.sin(t * 0.1) * 5;
      camera.position.y = Math.cos(t * 0.1) * 5;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };

    animate(0);

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
      if (renderer) renderer.dispose();
    };
  });
</script>

<svelte:head>
  <title>Cam Hack 2025</title>
</svelte:head>

<div class="fixed inset-0 -z-10 bg-[#020a05]">
  <canvas bind:this={canvas} class="w-full h-full"></canvas>
</div>

<main class="relative z-10 min-h-screen text-white overflow-hidden">
  <!-- Hero Section -->
  <section class="min-h-screen flex flex-col justify-center items-center text-center p-4">
    <div in:fly={{ y: 50, duration: 1000, delay: 200 }}>
      <h1 class="text-6xl md:text-8xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#00ff66] to-[#86e6c6] mb-4 drop-shadow-[0_0_15px_rgba(0,255,102,0.5)]">
        Cam Hack 2025
      </h1>
      <p class="text-2xl md:text-3xl font-light text-[#86e6c6] tracking-widest mb-8">
        1st &ndash; 2nd November
      </p>
      
      <div class="inline-block bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-[#00ff66]/30 shadow-[0_0_30px_rgba(0,255,102,0.2)]">
        <span class="block text-5xl md:text-7xl font-mono font-bold text-[#00ff66] mb-2">
          {daysSince}
        </span>
        <span class="uppercase tracking-widest text-sm text-gray-300">Days Since Event</span>
      </div>
    </div>

    <div class="absolute bottom-10 left-0 right-0 text-center animate-bounce">
      <p class="text-[#00ff66]/70 text-sm tracking-wider uppercase">Scroll to Explore</p>
      <svg class="w-6 h-6 mx-auto mt-2 text-[#00ff66]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
      </svg>
    </div>
  </section>

  <!-- Featured Projects -->
  <section class="min-h-screen flex flex-col justify-center py-20 px-4 md:px-20 bg-gradient-to-b from-transparent to-[#020a05]/90">
    <h2 class="text-4xl md:text-5xl font-bold text-center mb-16 text-[#00ff66] drop-shadow-[0_0_10px_rgba(0,255,102,0.3)]">
      Featured Projects
    </h2>
    
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
      {#each projects as project, i}
        <div class="group relative bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-[#00ff66]/20 hover:border-[#00ff66]/60 transition-all duration-300 hover:transform hover:-translate-y-2 hover:shadow-[0_0_20px_rgba(0,255,102,0.2)]">
          <div class="absolute inset-0 bg-gradient-to-br from-[#00ff66]/5 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <h3 class="text-2xl font-bold text-[#86e6c6] mb-4 group-hover:text-[#00ff66] transition-colors">{project.title}</h3>
          <p class="text-gray-300 font-light leading-relaxed">{project.desc}</p>
        </div>
      {/each}
    </div>
  </section>
</main>

<style>
  :global(body) {
    background-color: #020a05;
    margin: 0;
    padding: 0;
    overflow-x: hidden;
  }
</style>