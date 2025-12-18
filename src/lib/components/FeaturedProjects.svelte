<script>
  import { onMount } from "svelte";

  let sectionRef;
  let isVisible = $state(false);

  onMount(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            isVisible = true;
          }
        });
      },
      { threshold: 0.2 },
    );

    observer.observe(sectionRef);

    return () => observer.disconnect();
  });
</script>

<div bind:this={sectionRef} class="relative mx-auto max-w-6xl">
  <div
    class="{isVisible
      ? 'translate-y-0 opacity-100'
      : 'translate-y-10 opacity-0'} transition-all duration-700"
  >
    <h2 class="text-center">
      <span class="gradient-text">★</span>
      <span class="text-white">Featured Projects</span>
      <span class="gradient-text">★</span>
    </h2>
    <p class="mx-auto mb-12 max-w-2xl text-center text-gray-400">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua.
    </p>
  </div>

  <div
    class="{isVisible
      ? 'scale-100 opacity-100'
      : 'scale-95 opacity-0'} transition-all delay-300 duration-1000"
  >
    <a
      href="https://cam-hack-2025.devpost.com"
      target="_blank"
      class="group cyber-card relative block overflow-hidden rounded-3xl"
    >
      <div
        class="from-cyber-dark absolute inset-0 z-10 bg-gradient-to-t via-transparent to-transparent transition-opacity group-hover:opacity-70"
      ></div>

      <div
        class="bg-cyber-green/10 absolute inset-0 z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
      ></div>

      <img
        src="/unintended.png"
        alt="Unintended Behaviour - Winning Project"
        class="h-auto w-full transform transition-transform duration-700 group-hover:scale-105"
      />

      <div class="absolute right-0 bottom-0 left-0 z-20 p-8">
        <div class="mb-4 flex items-center gap-4">
          <span
            class="bg-cyber-green/20 border-cyber-green text-cyber-green rounded-full border px-4 py-2 font-mono text-sm"
          >
            🏆 WINNER
          </span>
          <span
            class="bg-cyber-cyan/20 border-cyber-cyan text-cyber-cyan rounded-full border px-4 py-2 font-mono text-sm"
          >
            Main Track
          </span>
        </div>
        <h3
          class="group-hover:text-cyber-green mb-2 text-3xl text-white transition-colors md:text-4xl"
        >
          Unintended Behaviour
        </h3>
        <p class="max-w-2xl text-gray-400">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent
          commodo cursus magna, vel scelerisque nisl consectetur.
        </p>

        <div
          class="mt-6 flex items-center gap-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        >
          <span class="text-cyber-green flex items-center gap-2 font-mono">
            View on Devpost
            <svg
              class="h-5 w-5 transform transition-transform group-hover:translate-x-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              ></path>
            </svg>
          </span>
        </div>
      </div>

      <div
        class="absolute top-4 right-4 z-20 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
      >
        <div
          class="bg-cyber-green/20 border-cyber-green/50 flex h-12 w-12 items-center justify-center rounded-full border backdrop-blur"
        >
          <svg
            class="text-cyber-green h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
            ></path>
          </svg>
        </div>
      </div>
    </a>
  </div>

  <div
    class="mt-12 text-center {isVisible
      ? 'translate-y-0 opacity-100'
      : 'translate-y-10 opacity-0'} transition-all delay-500 duration-700"
  >
    <a
      href="https://cam-hack-2025.devpost.com/project-gallery"
      target="_blank"
      class="cyber-button font-display inline-flex items-center gap-3 rounded-xl px-8 py-4 font-semibold tracking-wider"
    >
      <span>VIEW ALL PROJECTS</span>
      <svg
        class="h-5 w-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M17 8l4 4m0 0l-4 4m4-4H3"
        ></path>
      </svg>
    </a>
  </div>
</div>
