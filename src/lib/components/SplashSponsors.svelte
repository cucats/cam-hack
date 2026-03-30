<script>
  import { sponsors, organizers } from "./sponsors-data.js";
  import { onMount } from "svelte";

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
      { threshold: 0.2 }
    );

    if (sectionRef) observer.observe(sectionRef);

    return () => observer.disconnect();
  });
</script>

<div bind:this={sectionRef} class="mx-auto max-w-7xl py-20">
  <h2 class="text-4xl sm:text-5xl md:text-6xl font-bold text-center mb-4">
    <span class="gradient-text">Sponsors</span>
  </h2>
  <p class="text-center text-gray-400 mb-16 text-lg">
    Lorem ipsum dolor sit amet consectetur adipiscing elit
  </p>

  <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 mb-16">
    {#each sponsors as sponsor, i}
      <a
        href={sponsor.url}
        target="_blank"
        class="card flex items-center justify-center p-6 min-h-[120px] sponsor-item"
        style="animation-delay: {i * 0.1}s"
        class:visible
      >
        <img
          src={sponsor.logo}
          alt={sponsor.name}
          class="max-h-16 w-auto opacity-70 grayscale transition-all duration-500 hover:opacity-100 hover:grayscale-0 hover:scale-110"
        />
      </a>
    {/each}
  </div>

  <div class="text-center">
    <h3 class="text-2xl font-bold mb-8 text-gray-300">
      {organizers.runBy.title}
    </h3>
    <a
      href={organizers.runBy.url}
      target="_blank"
      class="card inline-flex items-center justify-center p-8 sponsor-item"
      class:visible
    >
      <img
        src={organizers.runBy.logo}
        alt={organizers.runBy.name}
        class="max-h-20 w-auto opacity-70 grayscale transition-all duration-500 hover:opacity-100 hover:grayscale-0 hover:scale-110"
      />
    </a>
  </div>
</div>

<style>
  .sponsor-item {
    opacity: 0;
    transform: scale(0.9);
  }

  .sponsor-item.visible {
    animation: pop-in 0.5s ease-out forwards;
  }

  @keyframes pop-in {
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
</style>
