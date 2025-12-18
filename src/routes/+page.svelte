<script>
  import { onMount, onDestroy } from 'svelte';
  import * as THREE from 'three';
  import { browser } from '$app/environment';

  let canvas;
  let renderer, scene, camera;
  let animationId;
  let daysSince = 0;

  const projects = [
    {
      title: "Unintended Behaviour",
      desc: "An exploration of chaotic systems within controlled digital environments. This project simulates the unpredictable nature of quantum algorithms when subjected to noise.",
      img: "/unintended.png"
    },
    {
      title: "Cam Hack Theme",
      desc: "A recursive visual interface designed to enhance developer focus through subliminal color theory and dynamic contrast adjustment.",
      img: "/cam-hack-theme.png"
    },
    {
      title: "Neural Net V2",
      desc: "Optimizing synaptic weights in real-time using biological feedback loops derived from plant bio-signals.",
      img: null
    },
    {
      title: "Green Horizon",
      desc: "Sustainable blockchain consensus mechanism visualization, demonstrating low-energy validation nodes in a distributed mesh.",
      img: null
    }
  ];

  onMount(() => {
    const eventDate = new Date('2025-11-01T00:00:00');
    const now = new Date();
    const diffTime = now - eventDate;
    daysSince = Math.floor(diffTime / (1000 * 60 * 60 * 24)); 

    if (browser) {
      initThree();
      window.addEventListener('resize', onWindowResize);
    }
  });

  onDestroy(() => {
    if (browser) {
      window.removeEventListener('resize', onWindowResize);
      if (renderer) renderer.dispose();
      cancelAnimationFrame(animationId);
    }
  });

  function initThree() {
    scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x000500, 0.002);

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;
    camera.position.y = 2;

    renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const geometry = new THREE.PlaneGeometry(100, 100, 64, 64);
    
    const count = geometry.attributes.position.count;
    const positions = geometry.attributes.position;
    for (let i = 0; i < count; i++) {
        const x = positions.getX(i);
        const y = positions.getY(i);
        positions.setZ(i, Math.sin(x / 2) * Math.cos(y / 2) * 2 + Math.random() * 0.5);
    }
    geometry.computeVertexNormals();

    const material = new THREE.MeshBasicMaterial({ 
        color: 0x00ff41, 
        wireframe: true,
        transparent: true,
        opacity: 0.3
    });

    const terrain = new THREE.Mesh(geometry, material);
    terrain.rotation.x = -Math.PI / 2;
    scene.add(terrain);

    // Particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 1000;
    const posArray = new Float32Array(particlesCount * 3);

    for(let i = 0; i < particlesCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 50;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.05,
        color: 0x00ff41,
        transparent: true,
        opacity: 0.8
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    const animate = () => {
      animationId = requestAnimationFrame(animate);

      terrain.position.z += 0.05;
      if (terrain.position.z > 10) {
          terrain.position.z = 0;
      }

      particlesMesh.rotation.y += 0.001;

      renderer.render(scene, camera);
    };

    animate();
  }

  function onWindowResize() {
    if (camera && renderer) {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }
  }
</script>

<svelte:head>
  <title>Cam Hack 2025 | SYSTEM STATUS: ONLINE</title>
</svelte:head>

<style global>
  header, footer {
    display: none !important;
  }
  body {
    background-color: #000500;
    overflow-x: hidden;
  }
</style>

<div class="relative min-h-screen w-full overflow-hidden bg-black text-[#00ff41] font-mono selection:bg-[#00ff41] selection:text-black">
  <canvas bind:this={canvas} class="fixed top-0 left-0 w-full h-full z-0 pointer-events-none"></canvas>

  <div class="relative z-10 container mx-auto px-4 py-12 flex flex-col items-center justify-center min-h-screen">
    
    <div class="text-center mb-24 space-y-6 animate-fade-in-up">
      <div class="inline-block border border-[#00ff41] px-4 py-1 text-sm tracking-widest mb-4 bg-black/50 backdrop-blur-sm">
        SYSTEM STATUS: ONLINE
      </div>
      
      <h1 class="text-6xl md:text-9xl font-black tracking-tighter glitch-effect mb-4" data-text="CAM HACK">
        CAM HACK
      </h1>
      
      <div class="text-3xl md:text-5xl font-bold tracking-tight mb-8">
        2025
      </div>

      <div class="flex flex-col md:flex-row items-center justify-center gap-8 text-lg md:text-xl font-bold uppercase tracking-widest">
        <div class="flex items-center gap-2">
          <span class="w-2 h-2 bg-[#00ff41] rounded-full animate-pulse"></span>
          Nov 1st - 2nd
        </div>
        <div class="hidden md:block w-px h-8 bg-[#00ff41]/30"></div>
        <div>
          T + {daysSince} DAYS
        </div>
      </div>

      <p class="mt-8 max-w-2xl mx-auto text-[#00ff41]/80 text-lg md:text-xl leading-relaxed">
        What can you make in 2 days? The system is waiting for your input.
      </p>

      <div class="mt-12 flex flex-wrap justify-center gap-6">
        <a href="https://cam-hack-2025.devpost.com" target="_blank" 
           class="group relative px-8 py-4 bg-[#00ff41]/10 border border-[#00ff41] overflow-hidden hover:bg-[#00ff41] transition-all duration-300">
           <span class="relative z-10 font-bold group-hover:text-black transition-colors">INITIATE DISCORD</span>
           <div class="absolute inset-0 bg-[#00ff41] transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
        </a>
      </div>
    </div>

    <div class="w-full max-w-6xl mt-24">
      <div class="flex items-center gap-4 mb-12">
        <div class="h-px flex-1 bg-[#00ff41]/30"></div>
        <h2 class="text-2xl md:text-4xl font-bold tracking-widest uppercase">Featured Protocols</h2>
        <div class="h-px flex-1 bg-[#00ff41]/30"></div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        {#each projects as project, i}
          <div class="group relative border border-[#00ff41]/30 bg-black/40 backdrop-blur-md p-6 hover:border-[#00ff41] transition-all duration-300 overflow-hidden">
            <div class="absolute inset-0 bg-[#00ff41]/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
            
            <div class="relative z-10">
              <div class="flex justify-between items-start mb-4">
                <h3 class="text-2xl font-bold">{project.title}</h3>
                <span class="text-xs border border-[#00ff41]/50 px-2 py-1">ID_0{i+1}</span>
              </div>
              
              {#if project.img}
                <div class="mb-4 overflow-hidden border border-[#00ff41]/20 group-hover:border-[#00ff41]/50 transition-colors h-48">
                  <img src={project.img} alt={project.title} class="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 scale-100 group-hover:scale-105" />
                </div>
              {:else}
                <div class="mb-4 h-48 border border-[#00ff41]/20 bg-[#00ff41]/5 flex items-center justify-center">
                   <span class="animate-pulse">[NO VISUAL DATA]</span>
                </div>
              {/if}

              <p class="text-[#00ff41]/70 leading-relaxed text-sm">
                {project.desc}
              </p>
            </div>
          </div>
        {/each}
      </div>
    </div>

    <div class="mt-32 text-center text-[#00ff41]/40 text-sm">
        // END OF STREAM
    </div>

  </div>
</div>

<style>
  .glitch-effect {
    position: relative;
  }
  
  .glitch-effect::before,
  .glitch-effect::after {
    content: attr(data-text);
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .glitch-effect::before {
    left: 2px;
    text-shadow: -1px 0 #ff00c1;
    clip: rect(44px, 450px, 56px, 0);
    animation: glitch-anim 5s infinite linear alternate-reverse;
  }

  .glitch-effect::after {
    left: -2px;
    text-shadow: -1px 0 #00fff9;
    clip: rect(44px, 450px, 56px, 0);
    animation: glitch-anim2 5s infinite linear alternate-reverse;
  }

  @keyframes glitch-anim {
    0% { clip: rect(42px, 9999px, 44px, 0); }
    5% { clip: rect(12px, 9999px, 59px, 0); }
    10% { clip: rect(48px, 9999px, 29px, 0); }
    15.0% { clip: rect(42px, 9999px, 73px, 0); }
    20% { clip: rect(63px, 9999px, 27px, 0); }
    25% { clip: rect(34px, 9999px, 55px, 0); }
    30.0% { clip: rect(86px, 9999px, 73px, 0); }
    35% { clip: rect(20px, 9999px, 20px, 0); }
    40% { clip: rect(26px, 9999px, 60px, 0); }
    45% { clip: rect(25px, 9999px, 66px, 0); }
    50% { clip: rect(57px, 9999px, 98px, 0); }
    55.0% { clip: rect(5px, 9999px, 46px, 0); }
    60.0% { clip: rect(82px, 9999px, 31px, 0); }
    65% { clip: rect(54px, 9999px, 27px, 0); }
    70% { clip: rect(28px, 9999px, 99px, 0); }
    75% { clip: rect(45px, 9999px, 69px, 0); }
    80% { clip: rect(23px, 9999px, 85px, 0); }
    85.0% { clip: rect(54px, 9999px, 84px, 0); }
    90% { clip: rect(45px, 9999px, 47px, 0); }
    95% { clip: rect(37px, 9999px, 20px, 0); }
    100% { clip: rect(4px, 9999px, 91px, 0); }
  }

  @keyframes glitch-anim2 {
    0% { clip: rect(65px, 9999px, 100px, 0); }
    5% { clip: rect(52px, 9999px, 74px, 0); }
    10% { clip: rect(79px, 9999px, 85px, 0); }
    15.0% { clip: rect(75px, 9999px, 5px, 0); }
    20% { clip: rect(67px, 9999px, 61px, 0); }
    25% { clip: rect(14px, 9999px, 79px, 0); }
    30.0% { clip: rect(1px, 9999px, 66px, 0); }
    35% { clip: rect(86px, 9999px, 30px, 0); }
    40% { clip: rect(23px, 9999px, 98px, 0); }
    45% { clip: rect(85px, 9999px, 72px, 0); }
    50% { clip: rect(71px, 9999px, 75px, 0); }
    55.0% { clip: rect(2px, 9999px, 48px, 0); }
    60.0% { clip: rect(30px, 9999px, 16px, 0); }
    65% { clip: rect(59px, 9999px, 50px, 0); }
    70% { clip: rect(98px, 9999px, 16px, 0); }
    75% { clip: rect(71px, 9999px, 2px, 0); }
    80% { clip: rect(66px, 9999px, 46px, 0); }
    85.0% { clip: rect(2px, 9999px, 98px, 0); }
    90% { clip: rect(60px, 9999px, 5px, 0); }
    95% { clip: rect(35px, 9999px, 49px, 0); }
    100% { clip: rect(31px, 9999px, 63px, 0); }
  }
</style>
