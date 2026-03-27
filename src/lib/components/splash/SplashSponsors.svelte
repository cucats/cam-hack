<script>
  import { onMount } from 'svelte';
  import { sponsors, organizers } from '../sponsors-data.js';

  let visible = $state(false);
  let sectionEl;

  onMount(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) visible = true;
        });
      },
      { threshold: 0.2 }
    );
    if (sectionEl) observer.observe(sectionEl);
    return () => observer.disconnect();
  });
</script>

<section bind:this={sectionEl} class="relative py-24 px-4 sm:px-8">
  <div class="max-w-7xl mx-auto">
    <div class="text-center mb-16 opacity-0 {visible ? 'animate-slide-up' : ''}">
      <h2 class="font-display text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
        <span class="bg-gradient-to-r from-emerald-400 to-green-300 bg-clip-text text-transparent glow-text">
          Sponsored by
        </span>
      </h2>
      <div class="w-24 h-1 bg-gradient-to-r from-emerald-400 to-green-300 mx-auto rounded-full"></div>
    </div>

    <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8 mb-16">
      {#each sponsors as sponsor, i}
        <a
          target="_blank"
          href={sponsor.url}
          class="glass-card-hover p-6 flex items-center justify-center min-h-[120px] opacity-0 {visible ? 'animate-scale-in' : ''}"
          style="animation-delay: {0.1 + i * 0.08}s"
        >
          <img
            src={sponsor.logo}
            alt={sponsor.name}
            class="max-h-16 sm:max-h-20 w-auto object-contain filter brightness-0 invert opacity-80 hover:opacity-100 transition-opacity"
          />
        </a>
      {/each}
    </div>

    <div class="text-center opacity-0 {visible ? 'animate-slide-up delay-500' : ''}">
      <h3 class="font-display text-2xl sm:text-3xl font-bold text-gray-300 mb-8">{organizers.runBy.title}</h3>
      <a
        target="_blank"
        href={organizers.runBy.url}
        class="inline-block glass-card-hover p-8"
      >
        <img
          src={organizers.runBy.logo}
          alt={organizers.runBy.name}
          class="h-16 sm:h-20 w-auto object-contain filter brightness-0 invert opacity-80 hover:opacity-100 transition-opacity"
        />
      </a>
    </div>
  </div>
</section>
