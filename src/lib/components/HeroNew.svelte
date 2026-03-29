<script>
  import { onMount } from "svelte";

  let daysSince = $state(0);
  let visible = $state(false);

  const eventDate = new Date("2025-11-01T00:00:00");

  onMount(() => {
    const now = new Date();
    const diffTime = now.getTime() - eventDate.getTime();
    daysSince = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    if (daysSince < 0) daysSince = 0;

    setTimeout(() => {
      visible = true;
    }, 100);
  });
</script>

<div
  class="hero-container relative z-10 flex min-h-screen flex-col items-center justify-center px-4 text-center"
>
  <div class="hero-content max-w-5xl" class:visible>
    <div class="logo-container animate-float mb-8">
      <img
        src="/cam-hack-logo-text.png"
        alt="Cam Hack Logo"
        class="mx-auto h-40 w-40 drop-shadow-2xl sm:h-56 sm:w-56 md:h-64 md:w-64"
      />
    </div>

    <h1
      class="font-display text-gradient mb-4 text-5xl font-bold tracking-tight sm:text-7xl md:text-8xl"
    >
      Cam Hack 2025
    </h1>

    <p class="font-display mb-6 text-2xl font-light text-gray-300 sm:text-3xl">
      1st – 2nd November
    </p>

    <div class="countdown-container mb-8">
      <div class="glass glow-box mx-auto inline-block rounded-2xl px-8 py-6">
        <p class="text-hack-cyan mb-2 text-sm tracking-widest uppercase">
          Days Since The Event
        </p>
        <div class="text-gradient font-display text-6xl font-bold sm:text-7xl">
          {daysSince}
        </div>
      </div>
    </div>

    <p class="font-display mb-10 text-xl text-gray-400 sm:text-2xl">
      What can you make in 2 days?
    </p>

    <div class="flex flex-wrap justify-center gap-4">
      <a
        href="/discord"
        target="_blank"
        class="btn-primary flex items-center gap-2 text-lg"
      >
        <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
          <path
            d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"
          />
        </svg>
        Join the Discord!
      </a>
      <a
        href="/signup"
        class="btn-secondary pointer-events-none flex cursor-not-allowed items-center gap-2 text-lg opacity-50"
      >
        Signups closed
      </a>
    </div>
  </div>

  <div class="scroll-indicator absolute bottom-8 left-1/2 -translate-x-1/2">
    <div class="animate-bounce">
      <svg
        class="text-hack-green h-8 w-8 opacity-60"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M19 14l-7 7m0 0l-7-7m7 7V3"
        />
      </svg>
    </div>
  </div>
</div>

<style>
  .hero-content {
    opacity: 0;
    transform: translateY(30px);
    transition: all 1s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .hero-content.visible {
    opacity: 1;
    transform: translateY(0);
  }

  .text-hack-cyan {
    color: #06b6d4;
  }

  .text-hack-green {
    color: #10b981;
  }

  .countdown-container {
    perspective: 1000px;
  }

  @keyframes shimmer {
    0% {
      background-position: -200% center;
    }
    100% {
      background-position: 200% center;
    }
  }

  .logo-container img {
    filter: drop-shadow(0 0 30px rgba(16, 185, 129, 0.4));
  }
</style>
