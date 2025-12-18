<script>
  import { onMount } from "svelte";

  let daysSince = $state(0);
  let visible = $state(false);
  let countdownVisible = $state(false);

  const eventDate = new Date("2025-11-01T00:00:00");

  function calculateDaysSince() {
    const now = new Date();
    const diffTime = now.getTime() - eventDate.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    return Math.max(0, diffDays);
  }

  onMount(() => {
    daysSince = calculateDaysSince();

    setTimeout(() => {
      visible = true;
    }, 100);

    setTimeout(() => {
      countdownVisible = true;
    }, 800);

    const interval = setInterval(() => {
      daysSince = calculateDaysSince();
    }, 60000);

    return () => clearInterval(interval);
  });
</script>

<div
  class="relative flex min-h-screen items-center justify-center overflow-hidden"
>
  <div
    class="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/60"
  ></div>

  <div class="relative z-10 mx-auto max-w-6xl px-4 text-center">
    <div
      class="mb-8 {visible
        ? 'animate-slide-up opacity-0-initial'
        : 'opacity-0'}"
    >
      <img
        src="/cam-hack-logo-text.png"
        alt="Cam Hack Logo"
        class="animate-float mx-auto h-40 w-40 drop-shadow-2xl sm:h-56 sm:w-56 md:h-72 md:w-72"
        style="filter: drop-shadow(0 0 30px rgba(16, 185, 129, 0.5));"
      />
    </div>

    <h1
      class="mb-4 {visible
        ? 'animate-slide-up stagger-2 opacity-0-initial'
        : 'opacity-0'}"
    >
      <span class="text-gradient">Cam Hack 2025</span>
    </h1>

    <h3
      class="mb-8 font-mono text-emerald-300/90 {visible
        ? 'animate-slide-up stagger-3 opacity-0-initial'
        : 'opacity-0'}"
    >
      1st – 2nd November
    </h3>

    <div
      class="{countdownVisible
        ? 'animate-fade-in opacity-0-initial'
        : 'opacity-0'} mb-12"
    >
      <div class="glass-card glow-green inline-block rounded-2xl px-8 py-6">
        <p
          class="mb-2 font-mono text-sm tracking-widest text-emerald-400/70 uppercase"
        >
          Days Since The Event
        </p>
        <div
          class="text-gradient-green font-mono text-6xl font-bold sm:text-7xl md:text-8xl"
        >
          {daysSince}
        </div>
      </div>
    </div>

    <p
      class="mb-12 text-2xl text-white/80 sm:text-3xl {visible
        ? 'animate-slide-up stagger-4 opacity-0-initial'
        : 'opacity-0'}"
    >
      What can you make in 2 days?
    </p>

    <div
      class="flex flex-wrap justify-center gap-4 {visible
        ? 'animate-slide-up stagger-5 opacity-0-initial'
        : 'opacity-0'}"
    >
      <a
        target="_blank"
        href="/discord"
        class="group relative inline-flex items-center gap-2 rounded-xl border border-emerald-500/50 bg-emerald-500/20 px-8 py-4 text-lg font-semibold text-emerald-300 transition-all duration-300 hover:scale-105 hover:border-emerald-400 hover:bg-emerald-500/30 hover:shadow-lg hover:shadow-emerald-500/25"
      >
        <span>Join the Discord!</span>
        <svg
          class="h-5 w-5 transition-transform group-hover:translate-x-1"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M13 7l5 5m0 0l-5 5m5-5H6"
          />
        </svg>
      </a>
      <a
        target="_blank"
        href="/signup"
        class="inline-flex cursor-not-allowed items-center gap-2 rounded-xl border border-zinc-600/50 bg-zinc-800/50 px-8 py-4 text-lg font-semibold text-zinc-400"
      >
        <span>Signups closed</span>
      </a>
    </div>
  </div>

  <div
    class="absolute bottom-8 left-1/2 -translate-x-1/2 {visible
      ? 'animate-fade-in stagger-6 opacity-0-initial'
      : 'opacity-0'}"
  >
    <a
      href="#projects"
      aria-label="Scroll to projects"
      class="block animate-bounce text-emerald-400/50 transition-colors hover:text-emerald-400"
    >
      <svg
        class="h-8 w-8"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M19 14l-7 7m0 0l-7-7m7 7V3"
        />
      </svg>
    </a>
  </div>
</div>
