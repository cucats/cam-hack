<script>
  import { onMount } from "svelte";
  import { sponsors, organizers } from "./sponsors-data.js";

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
      { threshold: 0.1 },
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
      <span class="gradient-text">&#91;</span>
      <span class="text-white">Sponsors</span>
      <span class="gradient-text">&#93;</span>
    </h2>
  </div>

  <div class="mb-16 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
    {#each sponsors as sponsor, i}
      <a
        href={sponsor.url}
        target="_blank"
        class="group cyber-card flex min-h-[140px] items-center justify-center rounded-2xl p-6 {isVisible
          ? 'scale-100 opacity-100'
          : 'scale-90 opacity-0'} transition-all duration-500"
        style="transition-delay: {200 + i * 100}ms"
      >
        <img
          src={sponsor.logo}
          alt={sponsor.name}
          class="h-auto max-h-20 max-w-full object-contain opacity-70 brightness-0 invert filter transition-all duration-300 group-hover:scale-110 group-hover:opacity-100"
        />
      </a>
    {/each}
  </div>

  <div
    class="{isVisible
      ? 'translate-y-0 opacity-100'
      : 'translate-y-10 opacity-0'} transition-all delay-1000 duration-700"
  >
    <h3 class="text-center text-gray-400">
      <span class="gradient-text">&#60;</span>
      {organizers.runBy.title}
      <span class="gradient-text">/&#62;</span>
    </h3>

    <div class="flex justify-center">
      <a
        href={organizers.runBy.url}
        target="_blank"
        class="group cyber-card inline-flex items-center justify-center rounded-2xl p-8"
      >
        <img
          src={organizers.runBy.logo}
          alt={organizers.runBy.name}
          class="h-16 object-contain opacity-70 brightness-0 invert filter transition-all duration-300 group-hover:scale-110 group-hover:opacity-100 sm:h-20"
        />
      </a>
    </div>
  </div>
</div>
