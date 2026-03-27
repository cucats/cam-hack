<script>
  import { onMount } from 'svelte';

  let visible = $state(false);
  let sectionEl;

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
    if (sectionEl) observer.observe(sectionEl);
    return () => observer.disconnect();
  });
</script>

<section id="featured" bind:this={sectionEl} class="relative py-24 px-4 sm:px-8">
  <div class="max-w-7xl mx-auto">
    <div class="text-center mb-16 opacity-0 {visible ? 'animate-slide-up' : ''}">
      <h2 class="font-display text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
        <span class="bg-gradient-to-r from-emerald-400 to-green-300 bg-clip-text text-transparent glow-text">
          Featured Projects
        </span>
      </h2>
      <div class="w-24 h-1 bg-gradient-to-r from-emerald-400 to-green-300 mx-auto rounded-full"></div>
    </div>

    <div class="glass-card-hover p-6 sm:p-10 opacity-0 {visible ? 'animate-scale-in delay-200' : ''}">
      <h3 class="font-display text-2xl sm:text-3xl font-bold text-emerald-300 mb-6 text-center glow-text">
        Unintended Behaviour
      </h3>
      <a target="_blank" href="https://cam-hack-2025.devpost.com" class="block group">
        <div class="relative overflow-hidden rounded-2xl">
          <img
            src="/unintended.png"
            alt="Unintended Behaviour - Featured Project"
            class="w-full transition-transform duration-500 group-hover:scale-105"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-emerald-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-8">
            <span class="font-display text-xl text-white font-semibold px-6 py-3 bg-emerald-500/30 backdrop-blur-sm rounded-full border border-emerald-400/50">
              View on Devpost
            </span>
          </div>
        </div>
      </a>
      <p class="text-gray-400 text-center mt-6 text-lg font-mono">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
      </p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
      {#each [1, 2, 3] as i}
        <div class="glass-card-hover p-6 opacity-0 {visible ? 'animate-slide-up' : ''}" style="animation-delay: {0.3 + i * 0.1}s">
          <div class="h-48 bg-gradient-to-br from-emerald-900/50 to-gray-900/50 rounded-xl mb-4 flex items-center justify-center">
            <span class="text-emerald-400/50 font-display text-6xl font-bold">{i}</span>
          </div>
          <h4 class="font-display text-xl font-bold text-emerald-300 mb-2">Project {i}</h4>
          <p class="text-gray-400 font-mono text-sm">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum euismod.
          </p>
        </div>
      {/each}
    </div>
  </div>
</section>
