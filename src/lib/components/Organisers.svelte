<script>
  import { onMount } from "svelte";

  let sectionRef;
  let isVisible = $state(false);

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
      <span class="gradient-text">&#64;</span>
      <span class="text-white">Organising Committee</span>
    </h2>
  </div>

  <div class="flex flex-wrap justify-center gap-8 md:gap-12">
    {#each organisers as organiser, i}
      <div
        class="group text-center {isVisible
          ? 'translate-y-0 opacity-100'
          : 'translate-y-10 opacity-0'} transition-all duration-700"
        style="transition-delay: {200 + i * 150}ms"
      >
        <div class="relative mb-4">
          <div
            class="from-cyber-green via-cyber-cyan to-cyber-green absolute -inset-2 rounded-full bg-gradient-to-br opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-50"
          ></div>

          <div
            class="cyber-card relative h-32 w-32 overflow-hidden rounded-full p-1 transition-transform duration-500 group-hover:scale-105 sm:h-40 sm:w-40"
          >
            <img
              src={organiser.image}
              alt={organiser.name}
              class="h-full w-full rounded-full object-cover grayscale transition-all duration-500 group-hover:grayscale-0"
            />
          </div>

          <div
            class="bg-cyber-dark border-cyber-green text-cyber-green absolute -right-2 -bottom-2 flex h-8 w-8 items-center justify-center rounded-full border-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          >
            <svg class="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
              ></path>
            </svg>
          </div>
        </div>

        <p
          class="group-hover:text-cyber-green mb-0 font-semibold text-white transition-colors"
        >
          {organiser.name}
        </p>
        <p class="font-mono text-sm text-gray-500">Lorem ipsum</p>
      </div>
    {/each}
  </div>
</div>
