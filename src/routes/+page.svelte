<script>
  import { onMount } from 'svelte';
  import * as THREE from 'three';
  import Sponsors from "$lib/components/Sponsors.svelte";
  import About from "$lib/components/About.svelte";
  import Schedule from "$lib/components/Schedule.svelte";
  import Rules from "$lib/components/Rules.svelte";
  import FAQ from "$lib/components/FAQ.svelte";
  import Organisers from "$lib/components/Organisers.svelte";

  let canvas;
  let daysSince = 0;

  const eventDate = new Date('2025-11-01T00:00:00');

  const featuredProjects = [
    {
      title: "Unintended Behaviour",
      description: "A generative AI system that predicts and visualizes the unintended consequences of code changes in real-time.",
      image: "/unintended.png",
      link: "https://cam-hack-2025.devpost.com"
    },
    {
      title: "EcoSphere",
      description: "Simulating closed-loop ecosystems for Mars colonization using detailed biological modeling and environmental sensors.",
      image: null,
      link: "#"
    },
    {
      title: "MindMeld",
      description: "Direct brain-to-computer interface for rapid prototyping, allowing developers to code at the speed of thought.",
      image: null,
      link: "#"
    }
  ];

  onMount(() => {
    // Countdown Logic
    const now = new Date();
    // Calculate days since event
    const diffTime = Math.abs(now - eventDate);
    daysSince = Math.floor(diffTime / (1000 * 60 * 60 * 24)); 
    
    // Three.js Setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x000000, 0.002);

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 50; // Initial position
    camera.position.y = 20;
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Particles
    const geometry = new THREE.BufferGeometry();
    const particleCount = 2000;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const color = new THREE.Color();
    color.setHex(0x00ff00); // Green

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() * 200) - 100;
      positions[i * 3 + 1] = (Math.random() * 100) - 50;
      positions[i * 3 + 2] = (Math.random() * 200) - 100;
      
      // Variation in green
      color.setHSL(0.3 + Math.random() * 0.1, 1, 0.5);
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 0.8,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);
    
    // Grid Helper for "Floor" effect
    const gridHelper = new THREE.GridHelper(200, 50, 0x00ff00, 0x004400);
    gridHelper.position.y = -20;
    scene.add(gridHelper);

    // Animation Loop
    let time = 0;
    const animate = () => {
      requestAnimationFrame(animate);

      time += 0.005;

      // Rotate particles slightly
      particles.rotation.y = time * 0.1;

      // Wave effect
      const positions = particles.geometry.attributes.position.array;
      for (let i = 0; i < particleCount; i++) {
        const x = positions[i * 3];
        // positions[i * 3 + 1] += Math.sin(time + x * 0.05) * 0.1; // Subtle wave
      }
      particles.geometry.attributes.position.needsUpdate = true;
      
      // Camera movement
      camera.position.x = Math.sin(time * 0.2) * 10;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
    };
  });
</script>

<svelte:head>
  <title>Cam Hack 2025 - Enter the Grid</title>
</svelte:head>

<canvas bind:this={canvas} class="fixed top-0 left-0 w-full h-full -z-10 bg-black"></canvas>

<div class="relative min-h-screen text-white overflow-x-hidden font-sans selection:bg-green-500 selection:text-black">
  
  <!-- Hero Section -->
  <section class="flex flex-col items-center justify-center min-h-screen p-6 text-center z-10">
    <div class="animate-fade-in-up">
      <img src="/cam-hack-logo-text.png" alt="Cam Hack Logo" class="w-48 md:w-64 mx-auto mb-8 drop-shadow-[0_0_15px_rgba(74,222,128,0.5)] invert brightness-0 saturate-100 sepia-0 hue-rotate-0 filter" style="filter: brightness(0) invert(1) drop-shadow(0 0 5px #00ff00);" />
      
      <h1 class="text-6xl md:text-8xl font-black mb-2 tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600">
        CAM HACK 2025
      </h1>
      
      <p class="text-2xl md:text-3xl font-light mb-12 text-green-100 tracking-widest">
        1ST &ndash; 2ND NOVEMBER
      </p>

      <div class="inline-flex flex-col items-center bg-black/40 backdrop-blur-md border border-green-500/30 p-8 rounded-2xl shadow-[0_0_30px_rgba(0,255,0,0.1)] mb-12 transform hover:scale-105 transition-all duration-500 group">
        <span class="text-7xl font-mono font-bold text-green-400 tabular-nums group-hover:text-green-300 transition-colors">
          {daysSince}
        </span>
        <span class="text-sm uppercase tracking-[0.3em] text-green-600/80 mt-2 font-bold group-hover:text-green-500/80 transition-colors">
          Days Since Launch
        </span>
      </div>

      <p class="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto font-light leading-relaxed">
        What can you make in 2 days? <br />
        <span class="text-green-400 font-normal">Turning Sci-Fi into Reality.</span>
      </p>
    </div>
  </section>

  <!-- Featured Projects -->
  <section class="py-24 px-4 relative z-10">
    <div class="max-w-7xl mx-auto">
      <h2 class="text-4xl md:text-5xl font-bold text-center mb-16 text-white flex items-center justify-center gap-4">
        <span class="w-12 h-1 bg-green-500 rounded-full"></span>
        Featured Projects
        <span class="w-12 h-1 bg-green-500 rounded-full"></span>
      </h2>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        {#each featuredProjects as project}
          <a href={project.link} target="_blank" class="group relative block h-full">
            <div class="absolute inset-0 bg-green-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
            <div class="relative bg-gray-900/60 backdrop-blur-md border border-green-500/20 rounded-2xl overflow-hidden hover:border-green-500/50 transition-colors duration-300 h-full flex flex-col">
              <div class="h-48 overflow-hidden bg-black/50 relative">
                {#if project.image}
                  <img src={project.image} alt={project.title} class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100" />
                {:else}
                  <div class="absolute inset-0 flex items-center justify-center bg-[url('/cam-hack-theme.png')] bg-cover bg-center opacity-40 group-hover:opacity-60 transition-opacity">
                    <!-- Fallback generic visual -->
                  </div>
                  <div class="absolute inset-0 flex items-center justify-center">
                    <span class="text-6xl text-green-500/50 group-hover:text-green-400 transition-colors">❖</span>
                  </div>
                {/if}
              </div>
              <div class="p-6 flex-1 flex flex-col">
                <h3 class="text-2xl font-bold text-green-400 mb-3 group-hover:text-green-300 transition-colors">{project.title}</h3>
                <p class="text-gray-400 leading-relaxed text-sm flex-1">{project.description}</p>
              </div>
            </div>
          </a>
        {/each}
      </div>
    </div>
  </section>

  <!-- Content Containers (Wrapped for Dark Theme) -->
  <div class="bg-white/5 backdrop-blur-xl border-t border-green-500/20 relative z-10">
    
    <!-- About -->
    <section class="py-20 px-4 md:px-8 max-w-7xl mx-auto text-center">
      <div class="bg-white/90 text-black rounded-3xl p-8 shadow-2xl">
        <About />
      </div>
    </section>

    <!-- Sponsors -->
    <section class="py-12 px-4 md:px-8 max-w-7xl mx-auto">
      <div class="bg-white rounded-3xl p-8 shadow-2xl">
         <Sponsors />
      </div>
    </section>

    <!-- Schedule -->
    <section class="py-12 px-4 md:px-8 max-w-7xl mx-auto">
      <div class="bg-white/90 text-black rounded-3xl p-8 shadow-2xl">
        <Schedule />
      </div>
    </section>

    <!-- Rules -->
    <section class="py-12 px-4 md:px-8 max-w-7xl mx-auto">
      <div class="bg-white/90 text-black rounded-3xl p-8 shadow-2xl">
        <Rules />
      </div>
    </section>

    <!-- FAQ -->
    <section class="py-12 px-4 md:px-8 max-w-7xl mx-auto">
      <div class="bg-white/90 text-black rounded-3xl p-8 shadow-2xl">
        <FAQ />
      </div>
    </section>

    <!-- Organisers -->
    <section class="py-12 px-4 md:px-8 max-w-7xl mx-auto">
      <div class="bg-white/90 text-black rounded-3xl p-8 shadow-2xl mb-20">
        <Organisers />
      </div>
    </section>

  </div>

</div>

<style>
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .animate-fade-in-up {
    animation: fadeInUp 1s ease-out forwards;
  }
</style>
