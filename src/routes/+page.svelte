<script>
  import { onMount } from 'svelte';
  import * as THREE from 'three';

  let canvas;
  let daysSince = 0;

  onMount(() => {
    const startDate = new Date('2025-11-01T00:00:00');
    const now = new Date();
    daysSince = Math.floor((now.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x050a05);
    scene.fog = new THREE.FogExp2(0x050a05, 0.002);

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 5, 10);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const geometry = new THREE.BufferGeometry();
    const count = 2000;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 50;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 50;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 50;

      colors[i * 3] = 0.5;
      colors[i * 3 + 1] = 1;
      colors[i * 3 + 2] = 0.5;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 0.2,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    const gridHelper = new THREE.GridHelper(100, 50, 0x00ff00, 0x004400);
    scene.add(gridHelper);

    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0x00ff00, 1, 100);
    pointLight.position.set(10, 10, 10);
    scene.add(pointLight);

    const clock = new THREE.Clock();

    const animate = () => {
      const elapsedTime = clock.getElapsedTime();

      particles.rotation.y = elapsedTime * 0.05;
      particles.rotation.x = elapsedTime * 0.02;

      const positions = particles.geometry.attributes.position.array;
      for (let i = 0; i < count; i++) {
        const y = positions[i * 3 + 1];
        positions[i * 3 + 1] = y + Math.sin(elapsedTime + positions[i * 3]) * 0.02;
      }
      particles.geometry.attributes.position.needsUpdate = true;

      gridHelper.position.z = (elapsedTime * 2) % 2; 

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
    };
  });
</script>

<svelte:head>
  <title>Cam Hack 2025</title>
</svelte:head>

<div class="relative min-h-screen w-full overflow-hidden bg-[#050a05] text-[#86e293]">
  <canvas bind:this={canvas} class="absolute inset-0 h-full w-full opacity-60"></canvas>

  <div class="relative z-10 flex min-h-screen flex-col items-center justify-start px-4 pt-20 sm:pt-32">
    <div class="animate-fade-in mb-12 text-center">
      <h1 class="mb-4 text-6xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600 sm:text-8xl drop-shadow-[0_0_15px_rgba(34,197,94,0.5)]">
        Cam Hack 2025
      </h1>
      <p class="text-xl font-bold uppercase tracking-widest text-emerald-400 sm:text-2xl drop-shadow-[0_0_5px_rgba(52,211,153,0.8)]">
        1st - 2nd November
      </p>
      <div class="mt-8 rounded-xl border border-emerald-500/30 bg-black/50 px-8 py-4 backdrop-blur-md">
        <p class="text-sm uppercase tracking-widest text-emerald-500/80">Time Since Protocol Initiation</p>
        <p class="mt-2 text-5xl font-mono font-bold text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">
          {daysSince} <span class="text-lg text-emerald-400">DAYS</span>
        </p>
      </div>
    </div>

    <div class="w-full max-w-6xl">
      <h2 class="mb-8 text-center text-3xl font-bold uppercase tracking-wider text-emerald-400 sm:text-4xl drop-shadow-[0_0_8px_rgba(52,211,153,0.6)]">
        Featured Projects
      </h2>
      
      <div class="grid gap-8 sm:grid-cols-2">
        <a href="https://cam-hack-2025.devpost.com" target="_blank" class="group relative overflow-hidden rounded-2xl border border-emerald-500/30 bg-black/40 p-4 transition-all hover:border-emerald-400 hover:bg-emerald-900/10 hover:shadow-[0_0_30px_rgba(16,185,129,0.2)]">
          <div class="relative aspect-video w-full overflow-hidden rounded-xl">
            <img src="/unintended.png" alt="Unintended Behaviour" class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
            <div class="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
            <div class="absolute bottom-4 left-4">
              <h3 class="text-2xl font-bold text-white group-hover:text-emerald-300">Unintended Behaviour</h3>
              <p class="text-sm text-emerald-200/80">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>
          </div>
        </a>

        <a href="https://cam-hack-2025.devpost.com/project-gallery" target="_blank" class="group relative overflow-hidden rounded-2xl border border-emerald-500/30 bg-black/40 p-4 transition-all hover:border-emerald-400 hover:bg-emerald-900/10 hover:shadow-[0_0_30px_rgba(16,185,129,0.2)]">
          <div class="relative aspect-video w-full overflow-hidden rounded-xl">
            <img src="/cam-hack-theme.png" alt="Sci-Fi Reality" class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
            <div class="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
            <div class="absolute bottom-4 left-4">
              <h3 class="text-2xl font-bold text-white group-hover:text-emerald-300">Sci-Fi Reality</h3>
              <p class="text-sm text-emerald-200/80">Turning Sci-fi into reality.</p>
            </div>
          </div>
        </a>
      </div>
    </div>
  </div>
</div>

<style>
  :global(body) {
    background-color: #050a05;
    margin: 0;
    overflow-x: hidden;
  }
  
  .animate-fade-in {
    animation: fadeIn 1.5s ease-out forwards;
    opacity: 0;
  }

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
</style>