<script>
  import { onMount } from 'svelte';

  let visible = $state(false);
  let sectionEl;

  const organisers = [
    { name: 'James Leung', image: '/james.png' },
    { name: 'Uliana Ronska', image: '/uliana.jpg' },
    { name: 'Athena Eng', image: '/athena.jpg' },
    { name: 'Oliver Greenwood', image: '/oliver.png' },
    { name: 'Jadon Mensah', image: '/jadon.png' },
  ];

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
  <div class="max-w-6xl mx-auto">
    <div class="text-center mb-16 opacity-0 {visible ? 'animate-slide-up' : ''}">
      <h2 class="font-display text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
        <span class="bg-gradient-to-r from-emerald-400 to-green-300 bg-clip-text text-transparent glow-text">
          Organising Committee
        </span>
      </h2>
      <div class="w-24 h-1 bg-gradient-to-r from-emerald-400 to-green-300 mx-auto rounded-full"></div>
    </div>

    <div class="flex flex-wrap justify-center gap-8 sm:gap-12">
      {#each organisers as organiser, i}
        <div
          class="group text-center opacity-0 {visible ? 'animate-scale-in' : ''}"
          style="animation-delay: {0.2 + i * 0.1}s"
        >
          <div class="relative mb-4">
            <div class="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-400 to-green-300 blur-md opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
            <img
              src={organiser.image}
              alt={organiser.name}
              class="relative w-28 h-28 sm:w-36 sm:h-36 rounded-full object-cover border-2 border-emerald-500/30 transition-all duration-300 group-hover:border-emerald-400 group-hover:scale-105"
            />
          </div>
          <p class="font-display text-lg font-semibold text-gray-200 group-hover:text-emerald-300 transition-colors">
            {organiser.name}
          </p>
        </div>
      {/each}
    </div>
  </div>
</section>
