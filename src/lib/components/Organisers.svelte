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

<section class="section-padding relative" bind:this={sectionRef}>
  <div
    class="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/40"
  ></div>

  <div class="relative z-10 mx-auto max-w-7xl">
    <div
      class="mb-16 text-center {visible
        ? 'animate-slide-up opacity-0-initial'
        : 'opacity-0'}"
    >
      <h2 class="text-gradient mb-4">Organising Committee</h2>
    </div>

    <div class="flex flex-wrap justify-center gap-8 md:gap-12">
      {#each organisers as organiser, i}
        <div
          class="group text-center {visible
            ? 'animate-slide-up opacity-0-initial'
            : 'opacity-0'}"
          style="animation-delay: {0.1 * i + 0.1}s;"
        >
          <div class="relative mb-4">
            <div
              class="absolute -inset-2 rounded-full bg-gradient-to-r from-emerald-500 via-cyan-500 to-purple-500 opacity-0 blur-lg transition-all duration-500 group-hover:opacity-70"
            ></div>
            <div
              class="relative h-32 w-32 overflow-hidden rounded-full border-2 border-zinc-700 transition-all duration-500 group-hover:scale-110 group-hover:border-emerald-400 md:h-40 md:w-40"
            >
              <img
                class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                src={organiser.image}
                alt={organiser.name}
              />
            </div>
          </div>
          <p
            class="font-semibold text-white transition-colors duration-300 group-hover:text-emerald-400"
          >
            {organiser.name}
          </p>
        </div>
      {/each}
    </div>
  </div>
</section>
