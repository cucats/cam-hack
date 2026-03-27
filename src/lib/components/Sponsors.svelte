<script>
  import { sponsors, organizers } from "./sponsors-data.js";
  import { onMount } from "svelte";

  let visible = $state(false);

  onMount(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            visible = true;
          }
        });
      },
      { threshold: 0.1 }
    );

    const container = document.querySelector(".sponsors-container");
    if (container) {
      observer.observe(container);
    }

    return () => {
      if (container) {
        observer.unobserve(container);
      }
    };
  });
</script>

<div class="mx-auto max-w-7xl sponsors-container">
  <h3 class="text-center sm:text-3xl sponsor-title">Sponsored by</h3>
  <grid
    class="mb-10 grid grid-cols-2 place-items-center text-center sm:mb-12 sm:grid-cols-3 lg:grid-cols-4 sponsor-grid"
    class:visible
  >
    {#each sponsors as sponsor, i}
      <a
        class="inline-block sponsor-logo"
        target="_blank"
        href={sponsor.url}
        style="animation-delay: {i * 0.1}s"
      >
        <span class="inline-block h-full align-middle"></span>
        <img
          class="inline-block h-auto align-middle {sponsor.className}"
          src={sponsor.logo}
          alt={sponsor.name}
        />
      </a>
    {/each}
  </grid>
  <div class="mb-4 text-center organizer-section" class:visible>
    <div class="mb-8 inline-block organizer-card">
      <h3 class="mb-2 sm:text-3xl">{organizers.runBy.title}</h3>
      <a target="_blank" href={organizers.runBy.url}>
        <span class="inline-block h-full align-middle"></span>
        <img
          class="inline-block h-auto align-middle {organizers.runBy.className}"
          src={organizers.runBy.logo}
          alt={organizers.runBy.name}
        />
      </a>
    </div>
  </div>
</div>

<style>
  .sponsors-container {
    position: relative;
    padding-top: 2rem;
    padding-bottom: 2rem;
  }

  .sponsor-title {
    margin-bottom: 2rem;
    background: linear-gradient(to right, #059669, #10b981, #059669);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    font-family: "Ubuntu Mono", monospace;
  }

  .sponsor-grid {
    opacity: 0;
    transition: opacity 1s ease;
  }

  .sponsor-grid.visible {
    opacity: 1;
  }

  .sponsor-logo {
    padding: 1rem;
    border-radius: 0.75rem;
    background: rgba(255, 255, 255, 0.6);
    backdrop-filter: blur(4px);
    border: 2px solid transparent;
    transition: all 0.5s ease;
    opacity: 0;
    transform: translateY(20px) scale(0.9);
    animation: sponsorFadeIn 0.6s ease forwards;
  }

  .sponsor-grid.visible .sponsor-logo {
    animation: sponsorFadeIn 0.6s ease forwards;
  }

  @keyframes sponsorFadeIn {
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }

  .sponsor-logo:hover {
    border-color: #34d399;
    box-shadow: 0 20px 25px -5px rgba(16, 185, 129, 0.1), 0 10px 10px -5px rgba(16, 185, 129, 0.04);
    transform: translateY(-10px) scale(1.05);
  }

  .organizer-section {
    opacity: 0;
    transition: opacity 1s ease;
  }

  .organizer-section.visible {
    opacity: 1;
  }

  .organizer-card {
    padding: 1.5rem;
    border-radius: 1rem;
    background: linear-gradient(to right, rgba(209, 250, 229, 0.5), rgba(220, 252, 231, 0.5));
    backdrop-filter: blur(4px);
    border: 2px solid rgba(16, 185, 129, 0.3);
    transition: all 0.5s ease;
  }

  .organizer-card:hover {
    border-color: #10b981;
    box-shadow: 0 25px 50px -12px rgba(16, 185, 129, 0.25);
    transform: scale(1.05);
  }
</style>
