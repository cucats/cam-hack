<script>
  import { onMount } from 'svelte';
  import * as THREE from 'three';

  let canvas;
  let daysSince = 0;

  const eventDate = new Date('2025-11-01T09:00:00');
  
  function updateTimer() {
    const now = new Date();
    const diff = now.getTime() - eventDate.getTime();
    daysSince = Math.floor(diff / (1000 * 60 * 60 * 24));
  }

  updateTimer();

  onMount(() => {
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x000000, 0.002);

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 30;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const geometry = new THREE.TorusKnotGeometry(10, 3, 100, 16);
    const material = new THREE.MeshBasicMaterial({ 
        color: 0x86e293,
        wireframe: true,
        transparent: true,
        opacity: 0.8
    });
    const torusKnot = new THREE.Mesh(geometry, material);
    scene.add(torusKnot);

    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 1000;
    const posArray = new Float32Array(particlesCount * 3);

    for(let i = 0; i < particlesCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 100;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.2,
        color: 0x86e6c6,
        transparent: true,
        opacity: 0.5
    });
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    const clock = new THREE.Clock();

    const animate = () => {
      const elapsedTime = clock.getElapsedTime();

      torusKnot.rotation.x = elapsedTime * 0.1;
      torusKnot.rotation.y = elapsedTime * 0.2;

      particlesMesh.rotation.y = elapsedTime * 0.05;
      
      camera.position.x = Math.sin(elapsedTime * 0.2) * 5;
      camera.position.y = Math.cos(elapsedTime * 0.2) * 5;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
      requestAnimationFrame(animate);
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
      geometry.dispose();
      material.dispose();
    };
  });
</script>

<svelte:head>
  <title>Cam Hack 2025</title>
</svelte:head>

<div class="relative w-full bg-black text-[#86e293] overflow-hidden">
  
  <div class="fixed top-0 left-0 w-full h-full z-0 pointer-events-none">
    <canvas bind:this={canvas} class="w-full h-full"></canvas>
  </div>

  <section class="relative z-10 min-h-screen flex flex-col items-center justify-center p-8 text-center bg-transparent">
    <div class="backdrop-blur-sm bg-black/30 p-8 rounded-3xl border border-[#86e293]/30 shadow-[0_0_50px_rgba(134,226,147,0.2)] transform hover:scale-105 transition-transform duration-500">
        <h1 class="text-6xl md:text-8xl font-bold mb-4 animate-pulse drop-shadow-[0_0_15px_rgba(134,226,147,0.8)]">
            Cam Hack 2025
        </h1>
        
        <h2 class="text-3xl md:text-4xl mb-8 text-[#86e6c6]">
            1st &ndash; 2nd November
        </h2>

        <div class="flex flex-col items-center gap-4 mb-12">
            <div class="text-xl md:text-2xl font-mono border border-[#86e293] p-4 rounded-xl bg-black/50">
                <span class="text-4xl font-bold block mb-2">{daysSince}</span>
                <span class="opacity-80">Days Since Event</span>
            </div>
        </div>

        <p class="text-xl md:text-2xl max-w-2xl mx-auto leading-relaxed">
            What can you make in 2 days?
        </p>
    </div>
  </section>

  <section class="relative z-10 py-20 px-4 md:px-8 bg-black/80 backdrop-blur-md min-h-screen flex flex-col justify-center">
    <h2 class="text-5xl font-bold text-center mb-16 text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">
        Featured Projects
    </h2>

    <div class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div class="group bg-[#0a0a0a] border border-[#86e293]/50 p-6 rounded-2xl hover:bg-[#1a1a1a] transition-all duration-300 hover:shadow-[0_0_30px_rgba(134,226,147,0.3)]">
            <div class="h-48 mb-6 bg-gradient-to-br from-[#111] to-[#222] rounded-xl flex items-center justify-center overflow-hidden relative">
                 <div class="absolute inset-0 bg-[#86e293] opacity-5 group-hover:opacity-10 transition-opacity"></div>
                 <span class="text-5xl">🍞</span>
            </div>
            <h3 class="text-2xl font-bold mb-3 text-white group-hover:text-[#86e293] transition-colors">AI Sourdough Starter</h3>
            <p class="text-gray-400 leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.
            </p>
        </div>

        <div class="group bg-[#0a0a0a] border border-[#86e293]/50 p-6 rounded-2xl hover:bg-[#1a1a1a] transition-all duration-300 hover:shadow-[0_0_30px_rgba(134,226,147,0.3)]">
            <div class="h-48 mb-6 bg-gradient-to-br from-[#111] to-[#222] rounded-xl flex items-center justify-center overflow-hidden relative">
                <div class="absolute inset-0 bg-[#86e293] opacity-5 group-hover:opacity-10 transition-opacity"></div>
                <span class="text-5xl">📅</span>
            </div>
            <h3 class="text-2xl font-bold mb-3 text-white group-hover:text-[#86e293] transition-colors">Quantum Calendar</h3>
            <p class="text-gray-400 leading-relaxed">
                Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum.
            </p>
        </div>

        <div class="group bg-[#0a0a0a] border border-[#86e293]/50 p-6 rounded-2xl hover:bg-[#1a1a1a] transition-all duration-300 hover:shadow-[0_0_30px_rgba(134,226,147,0.3)]">
             <div class="h-48 mb-6 bg-gradient-to-br from-[#111] to-[#222] rounded-xl flex items-center justify-center overflow-hidden relative">
                <div class="absolute inset-0 bg-[#86e293] opacity-5 group-hover:opacity-10 transition-opacity"></div>
                <span class="text-5xl">🐹</span>
            </div>
            <h3 class="text-2xl font-bold mb-3 text-white group-hover:text-[#86e293] transition-colors">Crypto Hamster Wheel</h3>
            <p class="text-gray-400 leading-relaxed">
                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste.
            </p>
        </div>
    </div>
  </section>

</div>

<style>
  :global(body) {
    background-color: black;
    color: white;
  }
</style>
