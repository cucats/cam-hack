<script>
  import { onMount } from "svelte";
  import { sponsors, organizers } from "./sponsors-data.js";

  let sectionRef;
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

    if (sectionRef) {
      observer.observe(sectionRef);
    }

    return () => observer.disconnect();
  });
</script>

<div bind:this={sectionRef} class="sponsors-container">
  <h2 class="section-title" class:visible>
    <span class="title-decorator"></span>
    Sponsored By
    <span class="title-decorator"></span>
  </h2>

  <div class="sponsors-grid">
    {#each sponsors as sponsor, i}
      <a
        href={sponsor.url}
        target="_blank"
        class="sponsor-card"
        class:visible
        style="--delay: {i * 0.1}s"
      >
        <div class="sponsor-logo-wrapper">
          <img
            src={sponsor.logo}
            alt={sponsor.name}
            class="sponsor-logo {sponsor.className}"
          />
        </div>
        <div class="sponsor-glow"></div>
      </a>
    {/each}
  </div>

  <div class="organizer-section" class:visible>
    <h3 class="organizer-title">{organizers.runBy.title}</h3>
    <a
      href={organizers.runBy.url}
      target="_blank"
      class="organizer-card"
    >
      <img
        src={organizers.runBy.logo}
        alt={organizers.runBy.name}
        class="organizer-logo"
      />
      <div class="organizer-glow"></div>
    </a>
  </div>
</div>

<style>
  .sponsors-container {
    max-width: 1280px;
    margin: 0 auto;
    padding: 2rem 1rem;
  }

  .section-title {
    text-align: center;
    font-size: 2.5rem;
    margin-bottom: 4rem;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1.5rem;
    opacity: 0;
    transform: translateY(30px);
    transition:
      opacity 0.8s ease,
      transform 0.8s ease;
  }

  .section-title.visible {
    opacity: 1;
    transform: translateY(0);
  }

  .title-decorator {
    width: 60px;
    height: 2px;
    background: linear-gradient(90deg, transparent, #00ff88, transparent);
  }

  .sponsors-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 2rem;
    margin-bottom: 4rem;
  }

  @media (min-width: 640px) {
    .sponsors-grid {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  @media (min-width: 1024px) {
    .sponsors-grid {
      grid-template-columns: repeat(4, 1fr);
    }
  }

  .sponsor-card {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem;
    background: rgba(255, 255, 255, 0.02);
    border: 1px solid rgba(255, 255, 255, 0.05);
    border-radius: 20px;
    transition: all 0.4s ease;
    opacity: 0;
    transform: translateY(30px) scale(0.9);
    overflow: hidden;
  }

  .sponsor-card.visible {
    opacity: 1;
    transform: translateY(0) scale(1);
    transition-delay: var(--delay);
  }

  .sponsor-card:hover {
    background: rgba(0, 255, 136, 0.05);
    border-color: rgba(0, 255, 136, 0.2);
    transform: translateY(-5px) scale(1.02);
  }

  .sponsor-card:hover .sponsor-glow {
    opacity: 1;
  }

  .sponsor-card:hover .sponsor-logo {
    filter: brightness(1.2) drop-shadow(0 0 20px rgba(0, 255, 136, 0.3));
  }

  .sponsor-logo-wrapper {
    position: relative;
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 80px;
  }

  .sponsor-logo {
    max-height: 100%;
    object-fit: contain;
    transition: all 0.4s ease;
    filter: brightness(0.9);
  }

  .sponsor-glow {
    position: absolute;
    inset: 0;
    background: radial-gradient(
      circle at center,
      rgba(0, 255, 136, 0.15) 0%,
      transparent 70%
    );
    opacity: 0;
    transition: opacity 0.4s ease;
  }

  .organizer-section {
    text-align: center;
    padding-top: 2rem;
    border-top: 1px solid rgba(0, 255, 136, 0.1);
    opacity: 0;
    transform: translateY(30px);
    transition:
      opacity 0.8s ease,
      transform 0.8s ease;
    transition-delay: 0.5s;
  }

  .organizer-section.visible {
    opacity: 1;
    transform: translateY(0);
  }

  .organizer-title {
    margin-bottom: 2rem;
    font-size: 1.5rem;
  }

  .organizer-card {
    position: relative;
    display: inline-block;
    padding: 2rem 4rem;
    background: rgba(0, 255, 136, 0.03);
    border: 1px solid rgba(0, 255, 136, 0.1);
    border-radius: 20px;
    transition: all 0.4s ease;
  }

  .organizer-card:hover {
    background: rgba(0, 255, 136, 0.08);
    border-color: rgba(0, 255, 136, 0.3);
    transform: translateY(-5px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  }

  .organizer-card:hover .organizer-glow {
    opacity: 1;
  }

  .organizer-logo {
    height: 60px;
    transition: all 0.4s ease;
  }

  .organizer-card:hover .organizer-logo {
    filter: drop-shadow(0 0 20px rgba(0, 255, 136, 0.3));
  }

  .organizer-glow {
    position: absolute;
    inset: -20px;
    background: radial-gradient(
      circle at center,
      rgba(0, 255, 136, 0.1) 0%,
      transparent 70%
    );
    opacity: 0;
    transition: opacity 0.4s ease;
    pointer-events: none;
  }
</style>
