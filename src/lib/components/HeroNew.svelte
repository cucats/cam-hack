<script>
  import { onMount } from 'svelte';
  
  let daysSince = 0;
  
  onMount(() => {
    const eventDate = new Date('2025-11-01T00:00:00');
    const now = new Date();
    const diffTime = Math.abs(now - eventDate);
    daysSince = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  });
</script>

<div class="relative min-h-screen flex items-center justify-center overflow-hidden">
  <div class="absolute inset-0 bg-gradient-to-b from-transparent via-slate-900/50 to-slate-900"></div>
  
  <div class="relative z-10 mx-auto max-w-7xl px-4 py-20 text-center">
    <div class="mb-12 animate-slide-in" style="animation-delay: 0.2s; opacity: 0;">
      <img
        src="/cam-hack-logo-text.png"
        alt="Cam Hack Logo"
        class="mx-auto h-64 w-64 animate-float drop-shadow-2xl"
      />
    </div>
    
    <div class="mb-8 animate-slide-in" style="animation-delay: 0.4s; opacity: 0;">
      <h1 class="mb-6 text-7xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-green-300 to-cyan-400 drop-shadow-lg md:text-8xl">
        Cam Hack 2025
      </h1>
      
      <div class="mb-6 text-3xl font-bold text-emerald-300 drop-shadow-lg md:text-4xl">
        1st – 2nd November
      </div>
      
      <div class="mx-auto mb-8 max-w-2xl rounded-2xl border border-emerald-500/30 bg-slate-900/50 p-8 backdrop-blur-lg animate-glow">
        <div class="text-sm font-semibold uppercase tracking-widest text-emerald-400 mb-2">
          Days Since Event
        </div>
        <div class="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-500 md:text-7xl">
          {daysSince}
        </div>
      </div>
    </div>
    
    <div class="mb-8 flex flex-wrap justify-center gap-6 animate-slide-in" style="animation-delay: 0.6s; opacity: 0;">
      <a
        target="_blank"
        href="/discord"
        class="group relative overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-500 to-green-600 px-8 py-5 text-xl font-bold text-white shadow-2xl transition-all hover:scale-105 hover:shadow-emerald-500/50"
      >
        <span class="relative z-10">Join the Discord!</span>
        <div class="absolute inset-0 -z-0 bg-gradient-to-r from-green-600 to-emerald-700 opacity-0 transition-opacity group-hover:opacity-100"></div>
      </a>
      
      <button
        disabled
        class="cursor-not-allowed rounded-2xl border border-slate-600 bg-slate-800/50 px-8 py-5 text-xl font-bold text-slate-500 backdrop-blur-sm"
      >
        Signups Closed
      </button>
    </div>
    
    <div class="animate-slide-in text-2xl font-semibold text-emerald-200 drop-shadow-lg md:text-3xl" style="animation-delay: 0.8s; opacity: 0;">
      What can you make in 2 days?
    </div>
  </div>
  
  <div class="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
    <svg class="h-8 w-8 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
    </svg>
  </div>
</div>
