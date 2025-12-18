<script>
  import { onMount } from 'svelte';
  import * as THREE from 'three';

  let canvas;
  let daysSince = 0;
  let mounted = false;

  const projects = [
    { title: "NeuroSync", desc: "Brain-computer interface for controlling smart home devices." },
    { title: "EcoChain", desc: "Blockchain-based supply chain transparency for sustainable fashion." },
    { title: "AI-Mediator", desc: "Resolving conflicts using sentiment analysis and game theory." },
    { title: "QuantumSafe", desc: "Post-quantum cryptography implementation for secure messaging." }
  ];

  // Calculate time
  const eventDate = new Date('2025-11-01T00:00:00');
  // Use a fixed current date for consistency with the prompt's context if needed, 
  // but "countdown... of time since" implies dynamic. 
  // However, since I am in a simulation where "Today's date" is Dec 18, 2025, 
  // I will use new Date() which picks up the system time. 
  // If the system time is not Dec 18, 2025, it might be weird. 
  // I will assume the environment time is correct or just calculate based on the prompt's fact.
  // Actually, to be safe and consistent with "Today's date: Thursday Dec 18, 2025", 
  // I will force the calculation to be relative to the actual current time, 
  // assuming the browser rendering this page will have a date >= Nov 1 2025.
  
  onMount(() => {
    mounted = true;
    const now = new Date();
    const diffTime = now.getTime() - eventDate.getTime();
    daysSince = Math.floor(diffTime / (1000 * 3600 * 24));
    if (daysSince < 0) daysSince = 0; // Just in case

    // Three.js Setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x050505);
    scene.fog = new THREE.FogExp2(0x050505, 0.002);

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.z = 100; // Moved closer

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Particles
    const geometry = new THREE.BufferGeometry();
    const particleCount = 200; // Increased count
    const positions = new Float32Array(particleCount * 3);
    const velocities = [];

    const range = 200; // Range for particles

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * range;
      positions[i * 3 + 1] = (Math.random() - 0.5) * range;
      positions[i * 3 + 2] = (Math.random() - 0.5) * range;

      velocities.push({
        x: (Math.random() - 0.5) * 0.2,
        y: (Math.random() - 0.5) * 0.2,
        z: (Math.random() - 0.5) * 0.2
      });
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    
    // Custom shader material for glowing green particles
    const material = new THREE.PointsMaterial({
        color: 0x00ff00,
        size: 3,
        sizeAttenuation: true,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // Lines connecting particles
    const lineMaterial = new THREE.LineBasicMaterial({
        color: 0x00ff00,
        transparent: true,
        opacity: 0.15
    });

    const lineGeometry = new THREE.BufferGeometry();
    const lines = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(lines);

    // Animation Loop
    const animate = () => {
      if (!mounted) return;
      requestAnimationFrame(animate);

      const positions = particles.geometry.attributes.position.array;
      
      // Move particles
      for (let i = 0; i < particleCount; i++) {
        positions[i * 3] += velocities[i].x;
        positions[i * 3 + 1] += velocities[i].y;
        positions[i * 3 + 2] += velocities[i].z;

        // Bounce off walls (wrap around)
        const limit = range / 2;
        if (positions[i * 3] > limit || positions[i * 3] < -limit) velocities[i].x *= -1;
        if (positions[i * 3 + 1] > limit || positions[i * 3 + 1] < -limit) velocities[i].y *= -1;
        if (positions[i * 3 + 2] > limit || positions[i * 3 + 2] < -limit) velocities[i].z *= -1;
      }
      particles.geometry.attributes.position.needsUpdate = true;

      // Update lines
      const linePositions = [];
      const connectDistance = 35; // Connection distance

      for (let i = 0; i < particleCount; i++) {
        for (let j = i + 1; j < particleCount; j++) {
            const dx = positions[i * 3] - positions[j * 3];
            const dy = positions[i * 3 + 1] - positions[j * 3 + 1];
            const dz = positions[i * 3 + 2] - positions[j * 3 + 2];
            const distSq = dx * dx + dy * dy + dz * dz;

            if (distSq < connectDistance * connectDistance) {
                linePositions.push(
                    positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2],
                    positions[j * 3], positions[j * 3 + 1], positions[j * 3 + 2]
                );
            }
        }
      }
      
      lineGeometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));

      // Rotate scene slowly
      scene.rotation.y += 0.001;
      scene.rotation.x += 0.0005;

      renderer.render(scene, camera);
    };

    animate();

    // Resize handler
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      mounted = false;
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      lineGeometry.dispose();
      lineMaterial.dispose();
    };
  });
</script>

<svelte:head>
    <title>Cam Hack 2025</title>
</svelte:head>

<div class="relative w-full min-h-screen bg-neutral-950 text-green-400 overflow-x-hidden font-playpen selection:bg-green-900 selection:text-white">
  <canvas bind:this={canvas} class="fixed top-0 left-0 w-full h-full z-0 pointer-events-none"></canvas>
  
  <div class="relative z-10 container mx-auto px-4 py-20 flex flex-col items-center min-h-screen text-center">
    
    <!-- Hero Section -->
    <div class="mb-24 mt-12 space-y-6 animate-fade-in">
      <h1 class="text-7xl md:text-9xl font-bold tracking-tighter glow text-white mb-2">Cam Hack</h1>
      <h2 class="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600">2025</h2>
      
      <div class="h-px w-32 bg-green-500/50 mx-auto my-8"></div>
      
      <p class="text-2xl md:text-3xl text-green-100 font-light tracking-wide">Unintended Behaviour</p>
      <p class="text-xl text-green-400/80 font-mono">1st – 2nd November</p>
      
      <div class="mt-16 inline-flex flex-col items-center justify-center p-8 border border-green-500/30 rounded-2xl bg-black/40 backdrop-blur-md shadow-[0_0_30px_rgba(74,222,128,0.1)] hover:shadow-[0_0_50px_rgba(74,222,128,0.2)] transition-shadow duration-500">
        <span class="text-sm uppercase tracking-[0.2em] text-green-500 mb-2">Time Elapsed</span>
        <span class="text-7xl font-bold text-white tabular-nums">{daysSince}</span>
        <span class="text-sm text-green-400/60 mt-2">Days Since Event</span>
      </div>
    </div>

    <!-- Featured Projects -->
    <div class="w-full max-w-6xl mt-12 mb-24">
      <div class="flex items-center justify-center gap-4 mb-12">
        <div class="h-px w-12 bg-green-500/30"></div>
        <h3 class="text-3xl font-bold text-white tracking-tight">Featured Projects</h3>
        <div class="h-px w-12 bg-green-500/30"></div>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
        {#each projects as project}
          <div class="group relative p-8 border border-green-500/20 rounded-xl bg-black/30 hover:bg-green-900/10 transition-all duration-300 backdrop-blur-sm overflow-hidden hover:-translate-y-1">
             <div class="absolute inset-0 bg-gradient-to-br from-green-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
             <div class="absolute top-0 left-0 w-1 h-full bg-green-500 opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
             
             <h4 class="text-2xl font-bold text-green-300 group-hover:text-white transition-colors relative z-10">{project.title}</h4>
             <p class="text-green-400/70 text-lg mt-3 leading-relaxed relative z-10">{project.desc}</p>
          </div>
        {/each}
      </div>
    </div>
    
  </div>
</div>

<style>
  .glow {
    text-shadow: 0 0 20px rgba(74, 222, 128, 0.3), 0 0 40px rgba(74, 222, 128, 0.1);
  }
  
  :global(html) {
    background-color: #0a0a0a;
  }
</style>
