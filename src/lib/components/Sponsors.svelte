<script>
  import { onMount } from "svelte";
  import { sponsors, organizers } from "./sponsors-data.js";

  let visible = $state(false);
  let sectionRef;

  onMount(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            visible = true;
          }
        });
      },
      { threshold: 0.1 },
    );

    if (sectionRef) {
      observer.observe(sectionRef);
    }

    return () => observer.disconnect();
  });
</script>

<div bind:this={sectionRef} class="section-dark relative py-24">
  <div class="relative z-10 mx-auto max-w-7xl px-4 sm:px-8">
    <div class="mb-12 text-center">
      <h2
        class="font-display mb-4 text-4xl font-bold sm:text-5xl {visible
          ? 'animate-slide-up'
          : 'opacity-0'}"
      >
        <span class="gradient-text text-glow">Sponsored By</span>
      </h2>
      <div
        class="neon-line mx-auto w-24 {visible
          ? 'animate-scale-in delay-200'
          : 'opacity-0'}"
      ></div>
    </div>

    <div class="mb-16 grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-4">
      {#each sponsors as sponsor, index}
        <a
          target="_blank"
          href={sponsor.url}
          class="group glass-dark card-hover flex items-center justify-center rounded-xl p-6 transition-all {visible
            ? 'animate-scale-in'
            : 'opacity-0'}"
          style="animation-delay: {0.3 + index * 0.1}s;"
        >
          <img
            class="h-auto max-h-16 w-auto transition-all duration-300 {sponsor.className} grayscale group-hover:grayscale-0"
            src={sponsor.logo}
            alt={sponsor.name}
            style="filter: brightness(0.9);"
          />
        </a>
      {/each}
    </div>

    <div class="text-center">
      <div
        class="glass neon-border mx-auto inline-block rounded-2xl p-8 {visible
          ? 'animate-slide-up delay-700'
          : 'opacity-0'}"
      >
        <h3 class="font-display mb-4 text-2xl font-bold text-white">
          {organizers.runBy.title}
        </h3>
        <a
          target="_blank"
          href={organizers.runBy.url}
          class="group inline-block"
        >
          <img
            class="mx-auto h-auto max-h-20 w-auto grayscale transition-all duration-300 group-hover:grayscale-0"
            src={organizers.runBy.logo}
            alt={organizers.runBy.name}
          />
        </a>
      </div>
    </div>
  </div>
</div>
