<script>
  import { onMount } from "svelte";

  const eventDate = new Date("2025-11-01T10:00:00");
  let daysSince = $state(0);
  let isVisible = $state(false);
  let titleLetters = $state([]);

  const title = "CAM HACK 2025";

  onMount(() => {
    const now = new Date();
    const diffTime = now.getTime() - eventDate.getTime();
    daysSince = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    titleLetters = title.split("").map((char, i) => ({
      char,
      delay: i * 50,
      visible: false,
    }));

    setTimeout(() => {
      isVisible = true;
      titleLetters.forEach((letter, i) => {
        setTimeout(() => {
          titleLetters[i].visible = true;
          titleLetters = [...titleLetters];
        }, letter.delay + 300);
      });
    }, 100);
  });
</script>

<div
  class="relative flex min-h-screen items-center justify-center overflow-hidden"
>
  <div class="grid-overlay"></div>

  <div class="relative z-10 mx-auto max-w-6xl px-4 text-center">
    <div
      class="mb-8 {isVisible
        ? 'translate-y-0 opacity-100'
        : 'translate-y-10 opacity-0'} transition-all duration-1000 ease-out"
    >
      <img
        src="/cam-hack-logo-text.png"
        alt="Cam Hack Logo"
        class="animate-float mx-auto w-48 drop-shadow-[0_0_30px_rgba(0,255,136,0.5)] sm:w-64 md:w-80"
      />
    </div>

    <h1
      class="mb-6 {isVisible
        ? 'opacity-100'
        : 'opacity-0'} transition-opacity duration-500"
    >
      {#each titleLetters as letter, i}
        <span
          class="inline-block transition-all duration-300 {letter.visible
            ? 'translate-y-0 opacity-100'
            : 'translate-y-4 opacity-0'} {letter.char === ' ' ? 'w-4' : ''}"
          style="transition-delay: {letter.delay}ms"
        >
          {#if letter.char !== " "}
            <span class="gradient-text-animate">{letter.char}</span>
          {/if}
        </span>
      {/each}
    </h1>

    <div
      class="mb-8 overflow-hidden {isVisible
        ? 'translate-y-0 opacity-100'
        : 'translate-y-10 opacity-0'} transition-all delay-700 duration-1000"
    >
      <h3
        class="text-cyber-cyan text-glow-cyan font-mono text-xl tracking-widest sm:text-2xl md:text-3xl"
      >
        1ST&nbsp;&ndash;&nbsp;2ND&nbsp;NOVEMBER
      </h3>
    </div>

    <div
      class="mb-12 {isVisible
        ? 'scale-100 opacity-100'
        : 'scale-90 opacity-0'} transition-all delay-1000 duration-1000"
    >
      <div class="cyber-card box-glow inline-block rounded-2xl p-8">
        <p
          class="mb-2 font-mono text-sm tracking-widest text-gray-400 uppercase"
        >
          Days Since The Event
        </p>
        <div class="flex items-center justify-center gap-2">
          <span
            class="font-display gradient-text animate-pulse-glow text-6xl font-bold sm:text-7xl md:text-8xl"
          >
            {daysSince}
          </span>
          <span class="font-mono text-2xl text-gray-400">DAYS</span>
        </div>
      </div>
    </div>

    <div
      class="mb-8 {isVisible
        ? 'translate-y-0 opacity-100'
        : 'translate-y-10 opacity-0'} transition-all delay-[1200ms] duration-1000"
    >
      <p class="text-xl font-light text-gray-300 sm:text-2xl">
        <span class="text-cyber-green">&#123;</span>
        What can you make in 2 days?
        <span class="text-cyber-green">&#125;</span>
      </p>
    </div>

    <div
      class="flex flex-wrap justify-center gap-4 {isVisible
        ? 'translate-y-0 opacity-100'
        : 'translate-y-10 opacity-0'} transition-all delay-[1400ms] duration-1000"
    >
      <a
        target="_blank"
        href="/discord"
        class="cyber-button font-display rounded-xl px-8 py-4 text-lg font-semibold tracking-wider"
      >
        <span>JOIN DISCORD</span>
      </a>
      <a
        href="https://cam-hack-2025.devpost.com/project-gallery"
        target="_blank"
        class="cyber-button font-display rounded-xl px-8 py-4 text-lg font-semibold tracking-wider"
      >
        <span>VIEW PROJECTS</span>
      </a>
    </div>

    <div
      class="absolute bottom-8 left-1/2 -translate-x-1/2 {isVisible
        ? 'opacity-100'
        : 'opacity-0'} transition-opacity delay-[2000ms] duration-1000"
    >
      <div class="animate-bounce">
        <svg
          class="text-cyber-green h-8 w-8"
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
  </div>

  <div
    class="to-cyber-dark pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent"
  ></div>
</div>
