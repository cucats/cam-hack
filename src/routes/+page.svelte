<script>
  import { onMount } from 'svelte';
  import * as THREE from 'three';
  import { fade, fly } from 'svelte/transition';

  // Content
  const eventDate = new Date('2025-11-01T00:00:00');
  let daysSince = 0;

  // Projects
  const projects = [
    {
      title: "Unintended Behaviour",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      image: "/unintended.png", 
      link: "https://cam-hack-2025.devpost.com"
    },
    {
      title: "Bio-Rhythm Synth",
      desc: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor.",
      image: "/cam-hack-theme.png",
      link: "#"
    },
    {
      title: "Athena AI",
      desc: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat.",
      image: "/athena.jpg",
      link: "#"
    }
  ];

  let canvas;

  onMount(() => {
    // Calculate days since
    const now = new Date();
    // Normalize to start of day to avoid partial day issues if desired, 
    // but straight diff is fine. We want full days.
    const diffTime = now.getTime() - eventDate.getTime();
    daysSince = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    // Three.js Setup
    const scene = new THREE.Scene();
    // No background color set on scene to allow CSS background or transparent
    // But we want a deep space look.
    scene.fog = new THREE.FogExp2(0x050a14, 0.002);

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Create a fancy particle system
    const geometry = new THREE.BufferGeometry();
    const count = 3000;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);

    const color1 = new THREE.Color(0x86e293); // Light green
    const color2 = new THREE.Color(0x10b981); // Emerald
    const color3 = new THREE.Color(0x3b82f6); // Blueish for depth

    for(let i = 0; i < count; i++) {
      // Spiral galaxy shape
      const angle = Math.random() * Math.PI * 2;
      const radius = 5 + Math.random() * 20;
      const spiralOffset = angle + radius * 0.2;
      
      positions[i * 3] = Math.cos(spiralOffset) * radius;
      positions[i * 3 + 1] = (Math.random() - 0.5) * (radius * 0.5); // Spread in Y
      positions[i * 3 + 2] = Math.sin(spiralOffset) * radius;

      // Randomize slightly off the spiral
      positions[i * 3] += (Math.random() - 0.5) * 2;
      positions[i * 3 + 2] += (Math.random() - 0.5) * 2;

      const mixedColor = Math.random() > 0.5 ? color1 : color2;
      // Add some blue depth
      if (Math.random() > 0.8) mixedColor.lerp(color3, 0.5);

      colors[i * 3] = mixedColor.r;
      colors[i * 3 + 1] = mixedColor.g;
      colors[i * 3 + 2] = mixedColor.b;
      
      sizes[i] = Math.random() * 2;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    // We can use size in shader material or just rely on PointsMaterial size attenuation?
    // PointsMaterial doesn't support per-vertex size easily without ShaderMaterial.
    // We'll stick to uniform size for simplicity or use sprites if needed.
    
    // Let's use a custom shader for extra fanciness (pulsing)
    // Or just simple PointsMaterial for robustness. 
    // "Extremely fancy" -> Let's try to animate the points.

    const material = new THREE.PointsMaterial({
      size: 0.15,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      sizeAttenuation: true,
      blending: THREE.AdditiveBlending
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // Add some connecting lines for a "network" feel in the center
    const geometryLines = new THREE.IcosahedronGeometry(4, 2);
    const materialLines = new THREE.MeshBasicMaterial({ 
        color: 0x86e293, 
        wireframe: true, 
        transparent: true, 
        opacity: 0.1 
    });
    const sphere = new THREE.Mesh(geometryLines, materialLines);
    scene.add(sphere);

    camera.position.z = 15;
    camera.position.y = 5;
    camera.lookAt(0, 0, 0);

    // Mouse interaction
    let mouseX = 0;
    let mouseY = 0;
    
    const onDocumentMouseMove = (event) => {
        mouseX = (event.clientX - window.innerWidth / 2) * 0.05;
        mouseY = (event.clientY - window.innerHeight / 2) * 0.05;
    };
    document.addEventListener('mousemove', onDocumentMouseMove);

    // Animation
    let time = 0;
    const animate = () => {
      requestAnimationFrame(animate);
      time += 0.002;

      // Rotate entire system
      particles.rotation.y = time * 0.5;
      sphere.rotation.y = -time;
      sphere.rotation.x = time * 0.5;

      // Gentle camera movement
      camera.position.x += (mouseX - camera.position.x) * 0.05;
      camera.position.y += (-mouseY + 5 - camera.position.y) * 0.05;
      camera.lookAt(0, 0, 0);

      // Pulse the sphere
      const scale = 1 + Math.sin(time * 2) * 0.05;
      sphere.scale.set(scale, scale, scale);

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
      document.removeEventListener('mousemove', onDocumentMouseMove);
      renderer.dispose();
      // Dispose geometry/materials
      geometry.dispose();
      material.dispose();
      geometryLines.dispose();
      materialLines.dispose();
    };
  });
</script>

<svelte:head>
  <title>Cam Hack 2025</title>
</svelte:head>

<!-- Background Canvas -->
<canvas bind:this={canvas} class="fixed top-0 left-0 w-full h-full -z-10 bg-[#050a14]"></canvas>

<div class="relative min-h-screen text-white overflow-x-hidden">
  
  <!-- Hero Section -->
  <div class="flex flex-col items-center justify-center min-h-screen p-4 text-center relative">
    
    <!-- Floating Logo -->
    <div in:fly={{ y: -50, duration: 1000, delay: 200 }} class="mb-8 relative group">
      <div class="absolute inset-0 bg-emerald-500/20 blur-3xl rounded-full group-hover:bg-emerald-500/30 transition-all duration-500"></div>
      <img 
        src="/cam-hack-logo-text.png" 
        alt="Cam Hack Logo" 
        class="relative w-64 md:w-96 drop-shadow-2xl z-10"
      />
    </div>
    
    <h1 in:fade={{ duration: 1000, delay: 500 }} class="text-5xl md:text-8xl font-bold mb-4 font-playpen tracking-tighter bg-clip-text text-transparent bg-gradient-to-br from-emerald-300 via-green-400 to-emerald-600 drop-shadow-lg">
      Cam Hack 2025
    </h1>
    
    <h2 in:fade={{ duration: 1000, delay: 700 }} class="text-2xl md:text-3xl font-playpen mb-8 text-emerald-100/80">
      1st &ndash; 2nd November
    </h2>

    <div in:fade={{ duration: 1000, delay: 800 }} class="mb-12 flex flex-wrap gap-4 justify-center relative z-20">
      <a
        target="_blank"
        href="/discord"
        class="rounded-2xl bg-emerald-500/80 px-8 py-4 text-white font-bold text-lg transition-all hover:scale-105 hover:bg-emerald-500 hover:shadow-[0_0_20px_rgba(16,185,129,0.5)] backdrop-blur-sm border border-emerald-400/50"
      >
        Join the Discord!
      </a>
      <a
        href="#"
        class="cursor-not-allowed rounded-2xl bg-slate-700/80 px-8 py-4 text-gray-400 font-bold text-lg transition-all backdrop-blur-sm border border-slate-600"
      >
        Signups closed
      </a>
    </div>
    
    <p in:fade={{ duration: 1000, delay: 900 }} class="text-xl md:text-2xl text-emerald-200/90 font-playpen italic mb-16">
      What can you make in 2 days?
    </p>

    <!-- Countdown / Time Since -->
    <div in:fly={{ y: 50, duration: 1000, delay: 1000 }} class="relative group cursor-default">
      <div class="absolute inset-0 bg-emerald-500/10 blur-xl rounded-2xl group-hover:bg-emerald-500/20 transition-all"></div>
      <div class="bg-black/40 backdrop-blur-md border border-emerald-500/30 p-8 md:p-12 rounded-2xl relative z-10 shadow-2xl hover:border-emerald-500/60 transition-colors">
        <div class="flex items-baseline justify-center gap-4">
          <span class="text-7xl md:text-9xl font-bold font-mono text-white tracking-widest tabular-nums animate-pulse-slow">
            {daysSince}
          </span>
        </div>
        <div class="text-xl md:text-2xl text-emerald-200 font-playpen uppercase tracking-widest mt-2 border-t border-emerald-500/30 pt-4">
          Days Since
        </div>
      </div>
    </div>

    <!-- Scroll Indicator -->
    <div in:fade={{ delay: 2000 }} class="absolute bottom-8 animate-bounce text-emerald-400 opacity-70">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
    </div>
  </div>

  <!-- Featured Projects Section -->
  <section class="container mx-auto px-4 py-32 relative z-10">
    <div class="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-900/10 to-transparent pointer-events-none"></div>
    
    <h2 class="text-4xl md:text-6xl font-bold text-center mb-24 font-playpen text-transparent bg-clip-text bg-gradient-to-r from-emerald-200 to-white drop-shadow-md">
      Featured Projects
    </h2>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-12">
      {#each projects as project, i}
        <div 
          class="group perspective-1000"
        >
          <a href={project.link} target="_blank" class="block h-full relative preserve-3d transition-transform duration-500 hover:-translate-y-2">
            <!-- Card Background with Glow -->
            <div class="absolute -inset-0.5 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-500"></div>
            
            <div class="relative h-full bg-slate-900 rounded-2xl overflow-hidden border border-emerald-500/20 shadow-xl flex flex-col">
              <!-- Image Container -->
              <div class="relative h-64 overflow-hidden">
                <div class="absolute inset-0 bg-emerald-900/20 group-hover:bg-transparent transition-colors z-10"></div>
                <img 
                  src={project.image} 
                  alt={project.title} 
                  class="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out" 
                />
              </div>
              
              <!-- Content -->
              <div class="p-8 flex-1 flex flex-col">
                <h3 class="text-2xl font-bold mb-4 text-emerald-300 font-playpen group-hover:text-emerald-200">{project.title}</h3>
                <p class="text-gray-400 font-playpen leading-relaxed flex-1">
                  {project.desc}
                </p>
                
                <div class="mt-6 flex items-center text-emerald-400 font-bold text-sm uppercase tracking-wide group-hover:translate-x-2 transition-transform">
                  View Project <span class="ml-2">&rarr;</span>
                </div>
              </div>
            </div>
          </a>
        </div>
      {/each}
    </div>
  </section>

  <!-- Simple Footer for this page -->
  <div class="text-center py-12 text-emerald-500/40 text-sm font-playpen">
    &copy; 2025 Cam Hack. The Hackathon that was.
  </div>

</div>

<style>
  :global(body) {
    background-color: #050a14;
    overflow-x: hidden;
  }
  
  .animate-pulse-slow {
    animation: pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  }

  @keyframes pulse {
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: .8;
    }
  }

  /* Custom Scrollbar */
  :global(::-webkit-scrollbar) {
    width: 8px;
  }
  :global(::-webkit-scrollbar-track) {
    background: #050a14;
  }
  :global(::-webkit-scrollbar-thumb) {
    background: #10b981;
    border-radius: 4px;
  }
  :global(::-webkit-scrollbar-thumb:hover) {
    background: #34d399;
  }
</style>