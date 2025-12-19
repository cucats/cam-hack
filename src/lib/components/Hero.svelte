<script>
  import { onMount } from "svelte";

  let daysSince = $state(0);
  let mounted = $state(false);

  onMount(() => {
    const eventDate = new Date("2025-11-01T00:00:00");
    const now = new Date();
    const diffTime = now.getTime() - eventDate.getTime();
    daysSince = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    mounted = true;
  });
</script>

<div class="hero-wrapper">
  <div class="relative z-10 mx-auto max-w-7xl px-4 sm:px-8">
    <div
      class="flex min-h-screen flex-col items-center justify-center py-20 text-center"
    >
      <div
        class="logo-container mb-8 opacity-0 {mounted
          ? 'animate-scale-in'
          : ''}"
        style="animation-delay: 0.2s;"
      >
        <img
          src="/cam-hack-logo-text.png"
          alt="Cam Hack Logo"
          class="animate-float mx-auto h-40 w-40 sm:h-56 sm:w-56 md:h-64 md:w-64"
        />
      </div>

      <h1
        class="font-display mb-4 text-5xl font-bold tracking-tight opacity-0 sm:text-7xl md:text-8xl {mounted
          ? 'animate-slide-up'
          : ''}"
        style="animation-delay: 0.4s;"
      >
        <span class="gradient-text text-glow-strong">Cam Hack 2025</span>
      </h1>

      <h3
        class="font-display mb-8 text-xl text-emerald-400 opacity-0 sm:text-2xl md:text-3xl {mounted
          ? 'animate-slide-up'
          : ''}"
        style="animation-delay: 0.6s;"
      >
        1st – 2nd November
      </h3>

      <div
        class="countdown-wrapper mb-10 opacity-0 {mounted
          ? 'animate-scale-in'
          : ''}"
        style="animation-delay: 0.8s;"
      >
        <div class="glass neon-border rounded-2xl px-8 py-6 sm:px-12 sm:py-8">
          <p
            class="font-display mb-2 text-sm tracking-widest text-gray-400 uppercase"
          >
            Days Since The Event
          </p>
          <div
            class="countdown-number font-display text-6xl font-bold text-white sm:text-7xl md:text-8xl"
          >
            <span class="gradient-text text-glow-strong">{daysSince}</span>
          </div>
          <p class="font-display mt-2 text-lg text-emerald-400">days</p>
        </div>
      </div>

      <p
        class="mb-8 text-xl text-gray-300 opacity-0 sm:text-2xl {mounted
          ? 'animate-slide-up'
          : ''}"
        style="animation-delay: 1s;"
      >
        What can you make in 2 days?
      </p>

      <div
        class="flex flex-wrap justify-center gap-4 opacity-0 {mounted
          ? 'animate-slide-up'
          : ''}"
        style="animation-delay: 1.2s;"
      >
        <a
          target="_blank"
          href="/discord"
          class="btn-glow rounded-xl px-8 py-4 text-lg font-semibold tracking-wider uppercase"
        >
          Join the Discord!
        </a>
        <a
          target="_blank"
          href="https://cam-hack-2025.devpost.com"
          class="btn-neon rounded-xl px-8 py-4 text-lg tracking-wider uppercase"
        >
          View Projects
        </a>
      </div>

      <div
        class="scroll-indicator absolute bottom-8 left-1/2 -translate-x-1/2 opacity-0 {mounted
          ? 'animate-scale-in'
          : ''}"
        style="animation-delay: 1.5s;"
      >
        <div class="flex flex-col items-center gap-2 text-emerald-400">
          <span class="text-sm tracking-widest uppercase">Scroll</span>
          <div class="h-12 w-6 rounded-full border-2 border-emerald-400 p-1">
            <div
              class="animate-pulse-glow h-2 w-2 rounded-full bg-emerald-400"
            ></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<style>
  .hero-wrapper {
    position: relative;
    min-height: 100vh;
    overflow: hidden;
  }

  .logo-container {
    filter: drop-shadow(0 0 30px rgba(34, 197, 94, 0.4));
  }

  .countdown-number {
    font-variant-numeric: tabular-nums;
  }

  .scroll-indicator {
    animation: float 3s ease-in-out infinite;
  }

  .scroll-indicator div:last-child div {
    animation: scroll-bounce 2s ease-in-out infinite;
  }

  @keyframes scroll-bounce {
    0%,
    100% {
      transform: translateY(0);
      opacity: 1;
    }
    50% {
      transform: translateY(16px);
      opacity: 0.3;
    }
  }
</style>
