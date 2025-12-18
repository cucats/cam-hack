<script>
  import { onMount } from 'svelte';

  let mounted = $state(false);
  let daysSinceEvent = $state(0);

  const eventDate = new Date('2025-11-02T18:30:00');

  function calculateDaysSince() {
    const now = new Date();
    const diff = now.getTime() - eventDate.getTime();
    daysSinceEvent = Math.floor(diff / (1000 * 60 * 60 * 24));
  }

  onMount(() => {
    mounted = true;
    calculateDaysSince();
    const interval = setInterval(calculateDaysSince, 60000);
    return () => clearInterval(interval);
  });
</script>

<section class="relative min-h-screen flex items-center justify-center px-4 sm:px-8 overflow-hidden">
  <div class="max-w-7xl mx-auto text-center z-10">
    <div class="mb-8 opacity-0 {mounted ? 'animate-scale-in' : ''}">
      <img
        src="/cam-hack-logo-text.png"
        alt="Cam Hack Logo"
        class="mx-auto w-40 h-40 sm:w-56 sm:h-56 md:w-72 md:h-72 animate-float"
      />
    </div>

    <h1 class="font-display text-5xl sm:text-7xl md:text-8xl font-bold mb-4 opacity-0 {mounted ? 'animate-slide-up delay-200' : ''}">
      <span class="bg-gradient-to-r from-emerald-400 via-green-300 to-emerald-500 bg-clip-text text-transparent glow-text-strong">
        Cam Hack 2025
      </span>
    </h1>

    <p class="font-display text-2xl sm:text-3xl md:text-4xl text-emerald-300 mb-8 opacity-0 {mounted ? 'animate-slide-up delay-300' : ''}">
      1st&nbsp;&ndash;&nbsp;2nd&nbsp;November
    </p>

    <div class="glass-card inline-block px-8 py-6 mb-10 opacity-0 {mounted ? 'animate-scale-in delay-400' : ''}">
      <p class="text-lg text-gray-400 mb-2 font-mono uppercase tracking-wider">Days Since Event</p>
      <div class="text-6xl sm:text-7xl md:text-8xl font-display font-bold text-emerald-400 glow-text-strong">
        {daysSinceEvent}
      </div>
    </div>

    <p class="text-xl sm:text-2xl text-gray-300 mb-10 opacity-0 {mounted ? 'animate-slide-up delay-500' : ''}">
      What can you make in 2 days?
    </p>

    <div class="flex flex-wrap justify-center gap-4 opacity-0 {mounted ? 'animate-slide-up delay-600' : ''}">
      <a
        target="_blank"
        href="/discord"
        class="group relative px-8 py-4 bg-emerald-500/20 border border-emerald-500/50 rounded-xl text-emerald-300 font-display font-semibold text-lg transition-all duration-300 hover:bg-emerald-500/30 hover:border-emerald-400 hover:scale-105 hover:shadow-lg hover:shadow-emerald-500/20"
      >
        <span class="relative z-10">Join the Discord!</span>
      </a>
      <a
        href="/signup"
        class="px-8 py-4 bg-gray-700/30 border border-gray-600/50 rounded-xl text-gray-400 font-display font-semibold text-lg cursor-not-allowed"
      >
        Signups closed
      </a>
    </div>

    <div class="mt-20 opacity-0 {mounted ? 'animate-slide-up delay-700' : ''}">
      <a href="#featured" class="inline-block animate-bounce" aria-label="Scroll to featured projects">
        <svg class="w-8 h-8 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
        </svg>
      </a>
    </div>
  </div>
</section>
