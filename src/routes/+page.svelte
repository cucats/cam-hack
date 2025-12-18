<script>
  import { onMount, onDestroy } from 'svelte';
  import * as THREE from 'three';

  let canvas;
  let daysSince = 0;
  let frameId;

  // Calculate days since Nov 1, 2025
  const eventDate = new Date('2025-11-01T00:00:00');
  const today = new Date();
  const diff = today.getTime() - eventDate.getTime();
  daysSince = Math.floor(diff / (1000 * 60 * 60 * 24));

  onMount(() => {
    if (!canvas) return;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x000000, 0.05);

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;
    camera.position.y = 2;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Geometry - Grid Terrain
    const planeGeometry = new THREE.PlaneGeometry(20, 20, 40, 40);
    const planeMaterial = new THREE.MeshBasicMaterial({ 
      color: 0x00ff00, 
      wireframe: true,
      transparent: true,
      opacity: 0.5
    });
    const plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.rotation.x = -Math.PI / 2;
    plane.position.y = -1;
    scene.add(plane);

    // Floating Particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 500;
    const posArray = new Float32Array(particlesCount * 3);
    
    for(let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 20;
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.05,
      color: 0x39ff14,
      transparent: true,
      opacity: 0.8
    });
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    // Floating Geometries
    const shapeGeometry = new THREE.IcosahedronGeometry(0.5, 0);
    const shapeMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true });
    const shapes = [];
    
    for(let i=0; i<3; i++) {
        const mesh = new THREE.Mesh(shapeGeometry, shapeMaterial);
        mesh.position.x = (Math.random() - 0.5) * 10;
        mesh.position.y = Math.random() * 4;
        mesh.position.z = (Math.random() - 0.5) * 10;
        scene.add(mesh);
        shapes.push(mesh);
    }

    const clock = new THREE.Clock();

    function animate() {
      frameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Terrain movement simulation
      plane.position.z = (elapsedTime * 1) % 1; 

      // Particles rotation
      particlesMesh.rotation.y = elapsedTime * 0.05;

      // Shapes animation
      shapes.forEach((shape, i) => {
          shape.rotation.x += 0.01;
          shape.rotation.y += 0.01;
          shape.position.y += Math.sin(elapsedTime + i) * 0.005;
      });

      renderer.render(scene, camera);
    }

    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(frameId);
      renderer.dispose();
      planeGeometry.dispose();
      planeMaterial.dispose();
    };
  });
</script>

<svelte:head>
  <title>Cam Hack 2025</title>
</svelte:head>

<div class="relative min-h-screen bg-black text-green-500 font-mono overflow-x-hidden selection:bg-green-500 selection:text-black">
  <canvas bind:this={canvas} class="fixed inset-0 pointer-events-none opacity-60"></canvas>
  
  <div class="relative z-10 flex flex-col items-center w-full max-w-7xl mx-auto px-4 py-12">
    <!-- Hero Section -->
    <div class="min-h-[80vh] flex flex-col items-center justify-center text-center space-y-8 animate-fade-in">
        <h1 class="text-6xl md:text-8xl font-bold tracking-tighter glitch-text mb-4" data-text="CAM HACK 2025">
            CAM HACK 2025
        </h1>
        
        <div class="flex flex-col items-center space-y-2">
            <h2 class="text-2xl md:text-3xl text-green-400 font-bold border-b-2 border-green-500 pb-1">
                1st &ndash; 2nd November
            </h2>
            <p class="text-xl md:text-2xl opacity-90">What can you make in 2 days?</p>
        </div>

        <div class="mt-12 p-6 border-2 border-green-500/50 bg-black/50 backdrop-blur-sm rounded-lg transform hover:scale-105 transition-transform duration-300">
            <div class="text-5xl md:text-7xl font-bold text-white mb-2 font-mono">
                {daysSince}
            </div>
            <div class="text-sm md:text-base tracking-widest text-green-400 uppercase">
                Days Since Event
            </div>
        </div>
    </div>

    <!-- Featured Projects Section -->
    <div class="w-full py-20 space-y-12">
        <h3 class="text-4xl font-bold text-center mb-12 border-b border-green-800 pb-4 inline-block w-full">
            FEATURED PROJECTS
        </h3>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <!-- Project 1: Unintended Behaviour -->
            <div class="group relative overflow-hidden rounded-xl border border-green-800 bg-black/80 hover:border-green-400 transition-all duration-300">
                <div class="aspect-video overflow-hidden">
                    <img 
                        src="/unintended.png" 
                        alt="Unintended Behaviour" 
                        class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100 filter grayscale group-hover:grayscale-0"
                    />
                </div>
                <div class="p-6 relative">
                    <div class="absolute inset-0 bg-gradient-to-t from-green-900/20 to-transparent pointer-events-none"></div>
                    <h4 class="text-2xl font-bold mb-2 text-white group-hover:text-green-400 transition-colors">
                        Unintended Behaviour
                    </h4>
                    <p class="text-sm text-green-300/80 mb-4">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    </p>
                    <div class="flex gap-2">
                        <span class="px-2 py-1 text-xs border border-green-600 rounded text-green-400">AI</span>
                        <span class="px-2 py-1 text-xs border border-green-600 rounded text-green-400">Web</span>
                    </div>
                </div>
            </div>

            <!-- Project 2: Mocked Project -->
            <div class="group relative overflow-hidden rounded-xl border border-green-800 bg-black/80 hover:border-green-400 transition-all duration-300">
                <div class="aspect-video bg-green-900/20 flex items-center justify-center overflow-hidden relative">
                    <div class="absolute inset-0 grid grid-cols-8 grid-rows-8 opacity-20">
                        {#each Array(64) as _}
                            <div class="border border-green-500/30"></div>
                        {/each}
                    </div>
                    <span class="text-6xl animate-pulse">?</span>
                </div>
                <div class="p-6 relative">
                    <div class="absolute inset-0 bg-gradient-to-t from-green-900/20 to-transparent pointer-events-none"></div>
                    <h4 class="text-2xl font-bold mb-2 text-white group-hover:text-green-400 transition-colors">
                        Project Null
                    </h4>
                    <p class="text-sm text-green-300/80 mb-4">
                        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </p>
                    <div class="flex gap-2">
                        <span class="px-2 py-1 text-xs border border-green-600 rounded text-green-400">System</span>
                        <span class="px-2 py-1 text-xs border border-green-600 rounded text-green-400">Rust</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
  </div>
</div>

<style>
  :global(body) {
    background-color: black;
    color: #00ff00;
  }

  .glitch-text {
    position: relative;
    text-shadow: 2px 2px #003300;
  }

  .glitch-text::before,
  .glitch-text::after {
    content: attr(data-text);
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .glitch-text::before {
    left: 2px;
    text-shadow: -1px 0 #ff00c1;
    clip-path: inset(44% 0 61% 0);
    animation: glitch-anim-1 2.5s infinite linear alternate-reverse;
  }

  .glitch-text::after {
    left: -2px;
    text-shadow: -1px 0 #00fff9;
    clip-path: inset(58% 0 43% 0);
    animation: glitch-anim-2 3s infinite linear alternate-reverse;
  }

  @keyframes glitch-anim-1 {
    0% { clip-path: inset(20% 0 80% 0); }
    20% { clip-path: inset(60% 0 10% 0); }
    40% { clip-path: inset(40% 0 50% 0); }
    60% { clip-path: inset(80% 0 5% 0); }
    80% { clip-path: inset(10% 0 70% 0); }
    100% { clip-path: inset(30% 0 20% 0); }
  }

  @keyframes glitch-anim-2 {
    0% { clip-path: inset(10% 0 60% 0); }
    20% { clip-path: inset(80% 0 5% 0); }
    40% { clip-path: inset(30% 0 20% 0); }
    60% { clip-path: inset(10% 0 80% 0); }
    80% { clip-path: inset(50% 0 30% 0); }
    100% { clip-path: inset(90% 0 10% 0); }
  }

  .animate-fade-in {
      animation: fadeIn 2s ease-out;
  }

  @keyframes fadeIn {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
  }
</style>
