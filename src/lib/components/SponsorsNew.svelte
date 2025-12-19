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
      { threshold: 0.2 },
    );

    if (sectionRef) {
      observer.observe(sectionRef);
    }

    return () => observer.disconnect();
  });
</script>

<div bind:this={sectionRef} class="relative overflow-hidden py-24 sm:py-32">
  <div class="grid-pattern absolute inset-0 opacity-30"></div>

  <div class="relative z-10 mx-auto max-w-7xl px-4 sm:px-8">
    <div class="mb-16 text-center" class:visible>
      <h2 class="section-title text-gradient mx-auto">Sponsored by</h2>
    </div>

    <div class="sponsors-grid mb-20" class:visible>
      <div class="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-4">
        {#each sponsors as sponsor, index}
          <a
            href={sponsor.url}
            target="_blank"
            class="sponsor-item group hover:shadow-hack-green/10 flex items-center justify-center rounded-2xl bg-white/5 p-6 backdrop-blur-sm transition-all duration-300 hover:bg-white/10 hover:shadow-lg"
            style="animation-delay: {index * 0.1}s"
          >
            <img
              src={sponsor.logo}
              alt={sponsor.name}
              class="max-h-16 w-auto max-w-full opacity-70 grayscale transition-all duration-300 group-hover:opacity-100 group-hover:grayscale-0 sm:max-h-20"
            />
          </a>
        {/each}
      </div>
    </div>

    <div class="organizer-section text-center" class:visible>
      <h3 class="mb-8 text-2xl font-semibold text-gray-300">
        {organizers.runBy.title}
      </h3>
      <a
        href={organizers.runBy.url}
        target="_blank"
        class="group inline-block rounded-2xl bg-white/5 p-8 backdrop-blur-sm transition-all duration-300 hover:bg-white/10"
      >
        <img
          src={organizers.runBy.logo}
          alt={organizers.runBy.name}
          class="h-20 w-auto opacity-70 grayscale transition-all duration-300 group-hover:opacity-100 group-hover:grayscale-0 sm:h-24"
        />
      </a>
    </div>
  </div>
</div>

<style>
  .section-title::after {
    left: 50%;
    transform: translateX(-50%);
  }

  div:has(.section-title),
  .sponsors-grid,
  .organizer-section {
    opacity: 0;
    transform: translateY(30px);
    transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
  }

  div.visible:has(.section-title),
  .visible.sponsors-grid,
  .visible.organizer-section {
    opacity: 1;
    transform: translateY(0);
  }

  .sponsors-grid .sponsor-item {
    opacity: 0;
    transform: scale(0.9);
  }

  .visible.sponsors-grid .sponsor-item {
    animation: scaleIn 0.5s ease-out forwards;
  }

  @keyframes scaleIn {
    from {
      opacity: 0;
      transform: scale(0.9);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
</style>
