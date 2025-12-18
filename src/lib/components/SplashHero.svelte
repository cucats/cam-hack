<script>
  import { onMount, onDestroy } from "svelte";

  let daysSince = $state(0);
  let mounted = $state(false);
  let glitchActive = $state(false);
  let interval;

  const eventDate = new Date("2025-11-01T10:00:00");

  function calculateDays() {
    const now = new Date();
    const diff = now.getTime() - eventDate.getTime();
    daysSince = Math.floor(diff / (1000 * 60 * 60 * 24));
  }

  function triggerGlitch() {
    glitchActive = true;
    setTimeout(() => (glitchActive = false), 200);
  }

  onMount(() => {
    mounted = true;
    calculateDays();
    interval = setInterval(calculateDays, 60000);
    setInterval(triggerGlitch, 5000);
  });

  onDestroy(() => {
    if (interval) clearInterval(interval);
  });
</script>

<div
  class="relative flex min-h-screen items-center justify-center overflow-hidden"
>
  <div
    class="via-dark-void/50 to-dark-void absolute inset-0 bg-gradient-to-b from-transparent"
  ></div>

  <div class="relative z-10 mx-auto max-w-6xl px-4 text-center">
    <div class="animate-float mb-8">
      <img
        src="/cam-hack-logo-text.png"
        alt="Cam Hack Logo"
        class="mx-auto w-48 drop-shadow-[0_0_30px_rgba(0,255,136,0.5)] sm:w-64 md:w-80"
      />
    </div>

    <h1
      class="relative mb-4 text-5xl font-bold sm:text-7xl md:text-8xl lg:text-9xl"
      class:glitch={glitchActive}
    >
      <span class="gradient-text">Cam&nbsp;Hack</span>
      <span class="neon-text">&nbsp;2025</span>
    </h1>

    <p class="font-display mb-8 text-xl text-gray-400 sm:text-2xl md:text-3xl">
      1st&nbsp;&ndash;&nbsp;2nd&nbsp;November
    </p>

    <div
      class="glass-panel animate-pulse-glow mb-12 inline-block rounded-2xl px-8 py-6"
    >
      <p class="mb-2 text-sm tracking-widest text-gray-400 uppercase">
        Days Since Event
      </p>
      <div class="neon-text font-mono text-6xl font-bold sm:text-8xl">
        {#if mounted}
          {daysSince > 0 ? daysSince : 0}
        {:else}
          ---
        {/if}
      </div>
    </div>

    <p class="font-display mb-12 text-2xl text-white sm:text-3xl">
      Lorem ipsum dolor sit amet?
    </p>

    <div class="mb-8 flex flex-wrap justify-center gap-4">
      <a
        href="/discord"
        class="group bg-neon-green/20 text-neon-green border-neon-green/50 hover:bg-neon-green hover:text-dark-void relative overflow-hidden rounded-xl border px-8 py-4 transition-all duration-500 hover:scale-105 hover:shadow-[0_0_40px_rgba(0,255,136,0.5)]"
      >
        <span class="relative z-10 text-lg font-bold">Join the Discord!</span>
      </a>
      <a
        href="/signup"
        class="bg-dark-elevated border-dark-border cursor-not-allowed rounded-xl border px-8 py-4 text-gray-500"
      >
        <span class="text-lg font-bold">Signups closed</span>
      </a>
    </div>
  </div>

  <div class="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
    <svg
      class="text-neon-green h-8 w-8 opacity-50"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M19 14l-7 7m0 0l-7-7m7 7V3"
      ></path>
    </svg>
  </div>
</div>

<style>
  .glitch {
    animation: glitch 0.2s linear;
  }

  @keyframes glitch {
    0% {
      transform: translate(0);
    }
    20% {
      transform: translate(-2px, 2px);
    }
    40% {
      transform: translate(-2px, -2px);
    }
    60% {
      transform: translate(2px, 2px);
    }
    80% {
      transform: translate(2px, -2px);
    }
    100% {
      transform: translate(0);
    }
  }
</style>
