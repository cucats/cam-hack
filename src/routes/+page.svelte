<script>
  import { onMount } from 'svelte';
  import * as THREE from 'three';
  import '../app.css';

  let canvasContainer;
  let daysSince = 0;

  const projects = [
    { title: "NEURAL_LACE", desc: "Direct neural interface for high-bandwidth data transfer." },
    { title: "QUANTUM_GARDEN", desc: "Procedural ecosystem simulation using q-bits." },
    { title: "SYNTH_WAVE", desc: "Audio-reactive visualizer for deep space signals." },
    { title: "CYBER_CITY", desc: "Optimizing smart city traffic with swarm intelligence." }
  ];

  onMount(() => {
    const eventDate = new Date('2025-11-01T00:00:00');
    const now = new Date();
    const diffTime = Math.abs(now - eventDate);
    daysSince = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);
    scene.fog = new THREE.FogExp2(0x000000, 0.0025);

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;
    camera.position.y = 3;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    canvasContainer.appendChild(renderer.domElement);

    const planeGeometry = new THREE.PlaneGeometry(200, 200, 50, 50);
    const planeMaterial = new THREE.MeshBasicMaterial({ 
      color: 0x00ff41, 
      wireframe: true,
      transparent: true,
      opacity: 0.15,
      side: THREE.DoubleSide
    });
    const plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.rotation.x = -Math.PI / 2;
    scene.add(plane);

    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 2000;
    const posArray = new Float32Array(particlesCount * 3);
    for(let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 100;
    }
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.1,
      color: 0x00ff41,
      transparent: true,
      opacity: 0.8
    });
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    let time = 0;
    const clock = new THREE.Clock();

    const animate = () => {
      const delta = clock.getDelta();
      time += delta;

      plane.position.z = (time * 5) % 4; 

      particlesMesh.rotation.y = time * 0.05;
      particlesMesh.rotation.x = time * 0.02;

      camera.position.x = Math.sin(time * 0.5) * 0.5;
      camera.lookAt(0, 0, -10);

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
      if (canvasContainer && canvasContainer.contains(renderer.domElement)) {
        canvasContainer.removeChild(renderer.domElement);
      }
      renderer.dispose();
      planeGeometry.dispose();
      planeMaterial.dispose();
      particlesGeometry.dispose();
      particlesMaterial.dispose();
    };
  });
</script>

<svelte:head>
  <title>Cam Hack 2025</title>
</svelte:head>

<div class="bg-black min-h-screen text-[#00ff41] font-mono overflow-x-hidden selection:bg-[#00ff41] selection:text-black">
  <div bind:this={canvasContainer} class="fixed inset-0 z-0 opacity-60"></div>

  <div class="relative z-10 container mx-auto px-6 py-20 flex flex-col items-center">
    
    <section class="min-h-[80vh] flex flex-col items-center justify-center text-center space-y-8 animate-fade-in-up">
      <div class="space-y-4">
        <h1 class="text-6xl md:text-9xl font-bold tracking-tighter glitch-text" data-text="CAM HACK">CAM HACK</h1>
        <div class="text-2xl md:text-4xl tracking-[0.5em] opacity-80">2025</div>
      </div>

      <div class="flex flex-col items-center space-y-2 mt-12 border border-[#00ff41] p-8 bg-black/50 backdrop-blur-sm shadow-[0_0_20px_rgba(0,255,65,0.2)] transform hover:scale-105 transition-transform duration-300">
        <span class="text-sm uppercase tracking-widest text-[#00ff41]/70">Time Elapsed</span>
        <div class="text-6xl md:text-8xl font-bold font-mono tabular-nums">
          {daysSince}
        </div>
        <span class="text-xl uppercase tracking-widest">Days Since Launch</span>
      </div>

      <div class="mt-8 text-lg md:text-xl opacity-90">
        <p>1st &ndash; 2nd November</p>
        <p class="text-sm mt-2 opacity-70 max-w-md mx-auto">
          The simulation has concluded. The impact remains.
        </p>
      </div>
    </section>

    <section class="w-full max-w-6xl py-20">
      <h2 class="text-3xl md:text-5xl font-bold mb-12 text-center border-b border-[#00ff41] pb-4 inline-block w-full">
        FEATURED_PROJECTS
      </h2>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        {#each projects as project}
          <div class="group relative bg-black/80 border border-[#00ff41]/30 p-8 hover:border-[#00ff41] transition-all duration-300 overflow-hidden hover:shadow-[0_0_15px_rgba(0,255,65,0.3)]">
            <div class="absolute inset-0 bg-[#00ff41] opacity-0 group-hover:opacity-5 transition-opacity duration-300"></div>
            <h3 class="text-2xl font-bold mb-4 flex items-center">
              <span class="mr-2 opacity-50">&gt;</span> 
              {project.title}
            </h3>
            <p class="text-[#00ff41]/80 leading-relaxed">
              {project.desc}
            </p>
            <div class="mt-6 flex justify-end">
               <span class="text-xs border border-[#00ff41] px-2 py-1 rounded opacity-50 group-hover:opacity-100 transition-opacity">
                 ACCESS_DATA
               </span>
            </div>
          </div>
        {/each}
      </div>
    </section>
  </div>
</div>

<style>
  @keyframes scanline {
    0% { transform: translateY(-100%); }
    100% { transform: translateY(100%); }
  }
  
  .glitch-text {
    position: relative;
    color: #00ff41;
  }
  
  .glitch-text::before,
  .glitch-text::after {
    content: attr(data-text);
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: black;
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
    clip-path: inset(50% 0 30% 0);
    animation: glitch-anim-2 3s infinite linear alternate-reverse;
  }

  @keyframes glitch-anim-1 {
    0% { clip-path: inset(20% 0 80% 0); }
    20% { clip-path: inset(60% 0 10% 0); }
    40% { clip-path: inset(40% 0 50% 0); }
    60% { clip-path: inset(80% 0 5% 0); }
    80% { clip-path: inset(10% 0 60% 0); }
    100% { clip-path: inset(30% 0 30% 0); }
  }

  @keyframes glitch-anim-2 {
    0% { clip-path: inset(10% 0 70% 0); }
    20% { clip-path: inset(70% 0 10% 0); }
    40% { clip-path: inset(20% 0 40% 0); }
    60% { clip-path: inset(60% 0 20% 0); }
    80% { clip-path: inset(5% 0 80% 0); }
    100% { clip-path: inset(40% 0 40% 0); }
  }

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translate3d(0, 40px, 0);
    }
    to {
      opacity: 1;
      transform: translate3d(0, 0, 0);
    }
  }

  .animate-fade-in-up {
    animation: fadeInUp 1s ease-out forwards;
  }

  :global(body) {
    background-color: black;
    overflow-x: hidden;
  }
</style>
