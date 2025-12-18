<script>
  import ThreeBackground from "$lib/components/ThreeBackground.svelte";
  import { onMount } from "svelte";

  // Calculate days since Nov 2, 2025
  const eventDate = new Date('2025-11-02T00:00:00');
  let daysSince = $state(0);

  onMount(() => {
    const now = new Date();
    const diffTime = Math.abs(now - eventDate);
    daysSince = Math.floor(diffTime / (1000 * 60 * 60 * 24)); 
  });

  const projects = [
    {
      title: "Unintended Behaviour",
      description: "A revolutionary approach to software testing that leverages chaos engineering to predict system failures before they happen. Winner of the Best Technical Complexity award.",
      image: "/unintended.png", 
      link: "https://cam-hack-2025.devpost.com"
    },
    {
      title: "EcoSynthesizer",
      description: "Using AI to optimize urban farming layouts, reducing water usage by 40% while increasing crop yield. A sustainable solution for the future of food.",
      image: null, // Will use placeholder
      link: "#"
    },
    {
      title: "Quantum Secure",
      description: "Post-quantum cryptography implementation for securing IoT devices against future threats. Featured by major tech blogs for its innovative key distribution.",
      image: null,
      link: "#"
    },
    {
      title: "CamTheme",
      description: "The official theme generator for the hackathon, turning sci-fi concepts into reality through immersive web experiences.",
      image: "/cam-hack-theme.png",
      link: "https://cam-hack-2025.devpost.com/project-gallery"
    }
  ];
</script>

<svelte:head>
  <title>Cam Hack 2025 - Showcase</title>
</svelte:head>

<ThreeBackground />

<div class="relative z-10 min-h-screen text-white overflow-hidden selection:bg-emerald-500 selection:text-white">
  <!-- Hero Section -->
  <section class="min-h-screen flex flex-col items-center justify-center text-center px-4 pt-20">
    <div class="mb-8 animate-fade-in-up">
        <h1 class="text-6xl md:text-8xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-emerald-300 to-green-500 filter drop-shadow-[0_0_10px_rgba(16,185,129,0.5)]">
            Cam Hack 2025
        </h1>
        <h2 class="text-2xl md:text-3xl text-emerald-100 font-light tracking-wider mb-2">
            1st &ndash; 2nd November
        </h2>
        <p class="text-emerald-200/80 text-lg md:text-xl">What can you make in 2 days?</p>
    </div>

    <!-- Countdown -->
    <div class="mt-12 p-8 border border-emerald-500/30 rounded-2xl bg-black/40 backdrop-blur-sm shadow-[0_0_30px_rgba(16,185,129,0.2)] animate-pulse-slow">
        <div class="text-7xl font-bold text-white font-playpen">
            {daysSince}
        </div>
        <div class="text-emerald-400 uppercase tracking-[0.2em] text-sm mt-2 font-playpen">
            Days Since The Event
        </div>
    </div>

    <div class="mt-24 animate-bounce">
        <span class="text-emerald-500/50 text-sm font-playpen">Scroll to explore</span>
        <div class="w-px h-16 bg-gradient-to-b from-emerald-500/50 to-transparent mx-auto mt-4"></div>
    </div>
  </section>

  <!-- Featured Projects Section -->
  <section class="min-h-screen py-20 px-4 md:px-12 bg-gradient-to-b from-transparent to-black/80">
    <h2 class="text-4xl md:text-5xl font-bold text-center mb-16 text-emerald-300 drop-shadow-lg">Featured Projects</h2>
    
    <div class="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-7xl mx-auto">
        {#each projects as project}
            <a href={project.link} target="_blank" class="group block relative overflow-hidden rounded-3xl border border-emerald-900/50 bg-black/60 backdrop-blur-md transition-all duration-500 hover:scale-[1.02] hover:border-emerald-500/50 hover:shadow-[0_0_50px_rgba(16,185,129,0.15)]">
                <div class="aspect-video w-full overflow-hidden bg-emerald-950/30 relative">
                    {#if project.image}
                        <img src={project.image} alt={project.title} class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100" />
                    {:else}
                        <div class="w-full h-full flex items-center justify-center text-emerald-800">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-24 w-24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                            </svg>
                        </div>
                    {/if}
                    <div class="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"></div>
                </div>
                
                <div class="p-8 relative">
                    <h3 class="text-2xl font-bold text-emerald-100 mb-3 group-hover:text-emerald-300 transition-colors">{project.title}</h3>
                    <p class="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">
                        {project.description}
                    </p>
                    <div class="mt-6 flex items-center text-emerald-500 text-sm font-semibold tracking-wider uppercase group-hover:translate-x-2 transition-transform">
                        View Project <span class="ml-2">&rarr;</span>
                    </div>
                </div>
            </a>
        {/each}
    </div>

    <!-- Additional Decorative Elements -->
    <div class="mt-32 text-center pb-20">
        <p class="text-emerald-600/50 text-sm font-mono max-w-lg mx-auto">
            // This event has concluded. The creativity lives on. <br>
            // Next iteration loading...
        </p>
    </div>
  </section>
</div>

<style>
    :global(body) {
        background-color: #000;
        overflow-x: hidden;
    }
    
    .animate-fade-in-up {
        animation: fadeInUp 1s ease-out forwards;
        opacity: 0;
        transform: translateY(20px);
    }

    @keyframes fadeInUp {
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    .animate-pulse-slow {
        animation: pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
    }
</style>
