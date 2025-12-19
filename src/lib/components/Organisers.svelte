<script>
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

    const container = document.querySelector(".organisers-container");
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

<div class="mx-auto max-w-7xl organisers-container">
  <h2>Organising Committee</h2>
  <div
    class="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 organisers-grid"
    class:visible
  >
    <div class="flex flex-col items-center organiser-card" style="animation-delay: 0s">
      <div class="organiser-image-wrapper">
        <img
          class="organiser-image"
          src="/james.png"
          alt="James Leung"
        />
      </div>
      <p class="text-center organiser-name">James Leung</p>
    </div>
    <div class="flex flex-col items-center organiser-card" style="animation-delay: 0.1s">
      <div class="organiser-image-wrapper">
        <img
          class="organiser-image"
          src="/uliana.jpg"
          alt="Uliana Ronska"
        />
      </div>
      <p class="text-center organiser-name">Uliana Ronska</p>
    </div>
    <div class="flex flex-col items-center organiser-card" style="animation-delay: 0.2s">
      <div class="organiser-image-wrapper">
        <img
          class="organiser-image"
          src="/athena.jpg"
          alt="Athena Eng"
        />
      </div>
      <p class="text-center organiser-name">Athena Eng</p>
    </div>
    <div class="flex flex-col items-center organiser-card" style="animation-delay: 0.3s">
      <div class="organiser-image-wrapper">
        <img
          class="organiser-image"
          src="/oliver.png"
          alt="Oliver Greenwood"
        />
      </div>
      <p class="text-center organiser-name">Oliver Greenwood</p>
    </div>
    <div class="flex flex-col items-center organiser-card" style="animation-delay: 0.4s">
      <div class="organiser-image-wrapper">
        <img
          class="organiser-image"
          src="/jadon.png"
          alt="Jadon Mensah"
        />
      </div>
      <p class="text-center organiser-name">Jadon Mensah</p>
    </div>
  </div>
</div>

<style>
  .organisers-container {
    position: relative;
    padding-top: 2rem;
    padding-bottom: 2rem;
  }

  .organisers-grid {
    opacity: 0;
  }

  .organisers-grid.visible {
    opacity: 1;
  }

  .organiser-card {
    opacity: 0;
    transform: translateY(2.5rem) scale(0.9);
    animation: organiserFadeIn 0.6s ease forwards;
  }

  .organisers-grid.visible .organiser-card {
    animation: organiserFadeIn 0.6s ease forwards;
  }

  @keyframes organiserFadeIn {
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }

  .organiser-image-wrapper {
    margin-bottom: 0.5rem;
    position: relative;
    border-radius: 9999px;
    overflow: hidden;
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
    border: 4px solid rgba(16, 185, 129, 0.2);
    transition: all 0.5s ease;
  }

  .organiser-card:hover .organiser-image-wrapper {
    border-color: #34d399;
    box-shadow: 0 25px 50px -12px rgba(16, 185, 129, 0.25);
    transform: scale(1.1) rotate(5deg);
  }

  .organiser-image {
    height: 8rem;
    width: 8rem;
    object-fit: cover;
    transition: transform 0.5s ease;
  }

  .organiser-card:hover .organiser-image {
    transform: scale(1.1);
  }

  .organiser-name {
    font-weight: 600;
    color: #047857;
    transition: color 0.3s ease;
  }

  .organiser-card:hover .organiser-name {
    color: #059669;
  }
</style>
