<script>
  import SplashScene from "$lib/components/SplashScene.svelte";
  import Countdown from "$lib/components/Countdown.svelte";
  import FeaturedProjects from "$lib/components/FeaturedProjects.svelte";
</script>

<svelte:head>
  <title>Cam Hack 2025</title>
</svelte:head>

<SplashScene />

<div class="relative z-10 min-h-screen text-green-500 font-mono overflow-x-hidden selection:bg-green-900 selection:text-white">
  
  <section class="min-h-screen flex flex-col items-center justify-center text-center p-4 relative">
    <div class="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/80 pointer-events-none"></div>
    
    <div class="z-10 backdrop-blur-sm p-8 rounded-3xl bg-black/40 border border-green-500/20 shadow-[0_0_50px_rgba(0,255,0,0.1)] fade-in-up">
      <h1 class="text-6xl md:text-8xl font-black mb-4 tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600 drop-shadow-[0_0_10px_rgba(0,255,0,0.5)]">
        CAM HACK
      </h1>
      <h2 class="text-3xl md:text-4xl font-bold text-green-100 mb-8">
        2025
      </h2>
      
      <div class="mb-12">
        <p class="text-xl md:text-2xl text-green-300 mb-2">1st &ndash; 2nd November</p>
        <p class="text-lg text-green-400/80">What can you make in 2 days?</p>
      </div>

      <div class="mb-12">
        <Countdown />
      </div>

      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <button class="px-8 py-3 bg-green-600 hover:bg-green-500 text-black font-bold rounded-lg transition-all shadow-[0_0_20px_rgba(0,255,0,0.3)] hover:shadow-[0_0_30px_rgba(0,255,0,0.5)] hover:-translate-y-1">
          ENTER MAINFRAME
        </button>
      </div>
    </div>
    
    <div class="absolute bottom-10 animate-bounce">
      <svg class="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
      </svg>
    </div>
  </section>

  <section class="min-h-screen bg-black/80 backdrop-blur-md py-20 px-4 border-t border-green-900/50">
    <div class="max-w-7xl mx-auto">
      <h2 class="text-4xl md:text-6xl font-black text-center mb-16 text-green-400 tracking-tight">
        <span class="text-green-600">&lt;</span> FEATURED_PROJECTS <span class="text-green-600">/&gt;</span>
      </h2>
      
      <FeaturedProjects />
      
      <div class="mt-20 text-center">
        <p class="text-green-500/60 max-w-2xl mx-auto">
          "The future belongs to those who believe in the beauty of their dreams." - Eleanor Roosevelt
        </p>
      </div>
    </div>
  </section>

</div>

<style>
  :global(body) {
    background-color: #000;
    color: #4ade80;
  }

  .fade-in-up {
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
</style>
