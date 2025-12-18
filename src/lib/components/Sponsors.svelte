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

<section class="section-padding relative" bind:this={sectionRef}>
  <div
    class="pointer-events-none absolute inset-0 bg-gradient-to-br from-purple-900/10 via-transparent to-cyan-900/10"
  ></div>

  <div class="relative z-10 mx-auto max-w-7xl">
    <div
      class="mb-16 text-center {visible
        ? 'animate-slide-up opacity-0-initial'
        : 'opacity-0'}"
    >
      <h2 class="text-gradient mb-4">Sponsored by</h2>
    </div>

    <div class="mb-16 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
      {#each sponsors as sponsor, i}
        <a
          href={sponsor.url}
          target="_blank"
          class="group glass-card flex items-center justify-center rounded-2xl border border-zinc-800 p-6 transition-all duration-500 hover:scale-105 hover:border-emerald-500/50 hover:shadow-lg hover:shadow-emerald-500/10 {visible
            ? 'animate-slide-up opacity-0-initial'
            : 'opacity-0'}"
          style="animation-delay: {0.05 * i + 0.1}s;"
        >
          <img
            class="max-h-16 w-auto opacity-70 grayscale transition-all duration-500 group-hover:opacity-100 group-hover:grayscale-0 {sponsor.className}"
            src={sponsor.logo}
            alt={sponsor.name}
          />
        </a>
      {/each}
    </div>

    <div
      class="text-center {visible
        ? 'animate-fade-in stagger-4 opacity-0-initial'
        : 'opacity-0'}"
    >
      <h3 class="mb-8 text-zinc-400">{organizers.runBy.title}</h3>
      <a href={organizers.runBy.url} target="_blank" class="group inline-block">
        <div
          class="glass-card rounded-2xl border border-zinc-800 px-8 py-6 transition-all duration-500 hover:scale-105 hover:border-emerald-500/50"
        >
          <img
            class="mx-auto h-16 w-auto opacity-80 transition-all duration-500 group-hover:opacity-100"
            src={organizers.runBy.logo}
            alt={organizers.runBy.name}
          />
        </div>
      </a>
    </div>
  </div>
</section>
