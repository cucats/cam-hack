<script>
  import { onMount } from 'svelte';
  import { sponsors, organizers } from "./sponsors-data.js";
  
  let sectionRef;
  let isVisible = $state(false);

  onMount(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            isVisible = true;
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef) observer.observe(sectionRef);

    return () => observer.disconnect();
  });
</script>

<div class="sponsors-section" bind:this={sectionRef}>
  <div class="section-header" class:visible={isVisible}>
    <h2 class="section-title">
      <span class="title-accent">Sponsored by</span>
    </h2>
  </div>

  <div class="sponsors-grid" class:visible={isVisible}>
    {#each sponsors as sponsor, index}
      <a 
        class="sponsor-card glass-card" 
        target="_blank" 
        href={sponsor.url}
        style="animation-delay: {index * 0.1}s"
      >
        <div class="sponsor-logo-container">
          <img
            class="sponsor-logo"
            src={sponsor.logo}
            alt={sponsor.name}
          />
        </div>
        <div class="sponsor-glow"></div>
      </a>
    {/each}
  </div>

  <div class="organizer-section" class:visible={isVisible}>
    <div class="divider">
      <span class="divider-line"></span>
      <span class="divider-text">{organizers.runBy.title}</span>
      <span class="divider-line"></span>
    </div>
    
    <a 
      class="organizer-card glass-card" 
      target="_blank" 
      href={organizers.runBy.url}
    >
      <img
        class="organizer-logo"
        src={organizers.runBy.logo}
        alt={organizers.runBy.name}
      />
    </a>
  </div>

  <div class="background-particles">
    {#each Array(20) as _, i}
      <div 
        class="particle" 
        style="
          left: {Math.random() * 100}%;
          top: {Math.random() * 100}%;
          animation-delay: {Math.random() * 5}s;
          animation-duration: {3 + Math.random() * 4}s;
        "
      ></div>
    {/each}
  </div>
</div>

<style>
  .sponsors-section {
    position: relative;
    padding: 6rem 2rem;
    overflow: hidden;
  }

  .section-header {
    text-align: center;
    margin-bottom: 4rem;
    opacity: 0;
    transform: translateY(30px);
    transition: all 0.8s ease-out;
  }

  .section-header.visible {
    opacity: 1;
    transform: translateY(0);
  }

  .section-title {
    font-size: clamp(2rem, 5vw, 3rem);
    margin-bottom: 0;
  }

  .title-accent {
    background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-accent) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .sponsors-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
    max-width: 1000px;
    margin: 0 auto 4rem;
    opacity: 0;
    transform: translateY(50px);
    transition: all 0.8s ease-out 0.2s;
  }

  .sponsors-grid.visible {
    opacity: 1;
    transform: translateY(0);
  }

  @media (min-width: 640px) {
    .sponsors-grid {
      grid-template-columns: repeat(3, 1fr);
      gap: 2rem;
    }
  }

  @media (min-width: 1024px) {
    .sponsors-grid {
      grid-template-columns: repeat(4, 1fr);
    }
  }

  .sponsor-card {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem 1.5rem;
    position: relative;
    overflow: hidden;
    transition: all 0.4s ease;
    opacity: 0;
    animation: fade-in-up 0.6s ease-out forwards;
  }

  @keyframes fade-in-up {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .sponsors-grid.visible .sponsor-card {
    animation-play-state: running;
  }

  .sponsor-card:hover {
    transform: translateY(-8px) scale(1.02);
    box-shadow: 0 20px 40px rgba(0, 255, 136, 0.2);
  }

  .sponsor-logo-container {
    position: relative;
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
  }

  .sponsor-logo {
    max-width: 80%;
    max-height: 60px;
    object-fit: contain;
    filter: grayscale(100%) brightness(1.5);
    transition: all 0.4s ease;
  }

  .sponsor-card:hover .sponsor-logo {
    filter: grayscale(0%) brightness(1);
  }

  .sponsor-glow {
    position: absolute;
    inset: 0;
    opacity: 0;
    background: radial-gradient(circle at center, rgba(0, 255, 136, 0.15), transparent 70%);
    transition: opacity 0.4s ease;
    pointer-events: none;
  }

  .sponsor-card:hover .sponsor-glow {
    opacity: 1;
  }

  .organizer-section {
    text-align: center;
    opacity: 0;
    transform: translateY(30px);
    transition: all 0.8s ease-out 0.5s;
  }

  .organizer-section.visible {
    opacity: 1;
    transform: translateY(0);
  }

  .divider {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1.5rem;
    margin-bottom: 2rem;
  }

  .divider-line {
    display: block;
    width: 60px;
    height: 1px;
    background: linear-gradient(90deg, transparent, var(--color-primary), transparent);
  }

  .divider-text {
    color: var(--color-text-muted);
    font-size: 1.25rem;
    text-transform: uppercase;
    letter-spacing: 0.2em;
  }

  .organizer-card {
    display: inline-block;
    padding: 2rem 3rem;
    transition: all 0.4s ease;
  }

  .organizer-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 30px rgba(0, 255, 136, 0.15);
  }

  .organizer-logo {
    max-width: 200px;
    height: auto;
    filter: brightness(1.1);
    transition: all 0.4s ease;
  }

  .organizer-card:hover .organizer-logo {
    filter: brightness(1.2) drop-shadow(0 0 10px rgba(0, 255, 136, 0.3));
  }

  .background-particles {
    position: absolute;
    inset: 0;
    pointer-events: none;
    overflow: hidden;
  }

  .particle {
    position: absolute;
    width: 4px;
    height: 4px;
    background: var(--color-primary);
    border-radius: 50%;
    opacity: 0.3;
    animation: float-particle 5s infinite ease-in-out;
  }

  @keyframes float-particle {
    0%, 100% {
      transform: translateY(0) scale(1);
      opacity: 0.3;
    }
    50% {
      transform: translateY(-30px) scale(1.5);
      opacity: 0.6;
    }
  }
</style>
