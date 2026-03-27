<script>
  import { onMount } from "svelte";

  let visible = $state(false);
  let sectionRef;

  const organisers = [
    { name: "James Leung", image: "/james.png" },
    { name: "Uliana Ronska", image: "/uliana.jpg" },
    { name: "Athena Eng", image: "/athena.jpg" },
    { name: "Oliver Greenwood", image: "/oliver.png" },
    { name: "Jadon Mensah", image: "/jadon.png" },
  ];

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

<div bind:this={sectionRef} class="section-darker grid-bg relative py-24">
  <div class="relative z-10 mx-auto max-w-7xl px-4 sm:px-8">
    <div class="mb-12 text-center">
      <h2
        class="font-display mb-4 text-4xl font-bold sm:text-5xl {visible
          ? 'animate-slide-up'
          : 'opacity-0'}"
      >
        <span class="gradient-text text-glow">Organising Committee</span>
      </h2>
      <div
        class="neon-line mx-auto w-24 {visible
          ? 'animate-scale-in delay-200'
          : 'opacity-0'}"
      ></div>
    </div>

    <div class="flex flex-wrap justify-center gap-8">
      {#each organisers as organiser, index}
        <div
          class="group text-center {visible ? 'animate-scale-in' : 'opacity-0'}"
          style="animation-delay: {0.3 + index * 0.1}s;"
        >
          <div class="relative mb-4">
            <div
              class="absolute -inset-1 rounded-full bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 opacity-0 blur transition-opacity duration-500 group-hover:opacity-75"
            ></div>
            <div class="relative overflow-hidden rounded-full">
              <img
                class="h-32 w-32 rounded-full object-cover transition-transform duration-500 group-hover:scale-110 sm:h-40 sm:w-40"
                src={organiser.image}
                alt={organiser.name}
              />
              <div
                class="absolute inset-0 rounded-full ring-2 ring-emerald-500/50 transition-all duration-300 group-hover:ring-4 group-hover:ring-emerald-400"
              ></div>
            </div>
          </div>
          <p
            class="font-display text-lg font-semibold text-white transition-colors group-hover:text-emerald-400"
          >
            {organiser.name}
          </p>
        </div>
      {/each}
    </div>
  </div>
</div>
