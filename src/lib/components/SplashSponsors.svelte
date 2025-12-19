<script>
  import { onMount } from 'svelte';
  import { sponsors } from './sponsors-data.js';

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
      { threshold: 0.2 }
    );

    const element = document.querySelector('.sponsors-section');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  });
</script>

<section class="sponsors-section" class:visible>
  <div class="sponsors-container">
    <h2 class="section-title">
      <span class="title-line"></span>
      <span class="title-text">Sponsors</span>
      <span class="title-line"></span>
    </h2>
    
    <div class="sponsors-grid">
      {#each sponsors as sponsor, index}
        <div class="sponsor-card" style="animation-delay: {index * 0.1}s">
          <div class="card-border"></div>
          <a href={sponsor.url} target="_blank" class="sponsor-link">
            <div class="sponsor-logo-container">
              <img src={sponsor.logo} alt={sponsor.name} class="sponsor-logo {sponsor.className}" />
            </div>
            <div class="sponsor-overlay">
              <span class="sponsor-name">{sponsor.name}</span>
            </div>
          </a>
        </div>
      {/each}
    </div>

    <div class="organized-by">
      <p class="organized-text">Run by</p>
      <div class="organizer-card">
        <a href="https://cucats.org" target="_blank" class="organizer-link">
          <img src="/cucats-logo-gradient-full.png" alt="CUCaTS" class="organizer-logo" />
        </a>
      </div>
    </div>
  </div>
</section>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Space+Mono:wght@400;700&display=swap');

  .sponsors-section {
    position: relative;
    padding: 8rem 2rem;
    background: linear-gradient(180deg, #1a1e3f 0%, #0a0e27 100%);
    overflow: hidden;
    opacity: 0;
    transform: translateY(50px);
    transition: all 1s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .sponsors-section.visible {
    opacity: 1;
    transform: translateY(0);
  }

  .sponsors-section::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, #00ccff, transparent);
  }

  .sponsors-container {
    max-width: 1400px;
    margin: 0 auto;
  }

  .section-title {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 2rem;
    margin-bottom: 4rem;
  }

  .title-line {
    flex: 1;
    height: 2px;
    background: linear-gradient(90deg, transparent, #00ccff, transparent);
    max-width: 200px;
  }

  .title-text {
    font-family: 'Orbitron', monospace;
    font-size: clamp(2rem, 5vw, 3.5rem);
    font-weight: 900;
    color: #00ccff;
    text-shadow: 0 0 20px rgba(0, 204, 255, 0.5);
    text-transform: uppercase;
    letter-spacing: 0.1em;
    white-space: nowrap;
  }

  .sponsors-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 2rem;
    margin-bottom: 6rem;
  }

  .sponsor-card {
    position: relative;
    background: linear-gradient(135deg, rgba(0, 204, 255, 0.05), rgba(255, 0, 170, 0.05));
    border-radius: 20px;
    padding: 3rem 2rem;
    transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
    opacity: 0;
    transform: translateY(30px);
    animation: fadeInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
  }

  .sponsors-section.visible .sponsor-card {
    opacity: 1;
    transform: translateY(0);
  }

  @keyframes fadeInUp {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .sponsor-card:hover {
    transform: translateY(-10px) scale(1.02);
    box-shadow: 0 20px 60px rgba(0, 204, 255, 0.3);
  }

  .card-border {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border: 2px solid transparent;
    border-radius: 20px;
    background: linear-gradient(135deg, #00ccff, #ff00aa) border-box;
    -webkit-mask: linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    opacity: 0.3;
    transition: opacity 0.3s ease;
    pointer-events: none;
  }

  .sponsor-card:hover .card-border {
    opacity: 1;
  }

  .sponsor-link {
    position: relative;
    display: block;
    text-decoration: none;
  }

  .sponsor-logo-container {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100px;
    transition: all 0.3s ease;
  }

  .sponsor-logo {
    max-width: 100%;
    height: auto;
    filter: brightness(0.9) contrast(1.1);
    transition: all 0.3s ease;
  }

  .sponsor-card:hover .sponsor-logo {
    filter: brightness(1.1) contrast(1.2);
    transform: scale(1.05);
  }

  .sponsor-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(0, 204, 255, 0.9), rgba(255, 0, 170, 0.9));
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  .sponsor-card:hover .sponsor-overlay {
    opacity: 1;
  }

  .sponsor-name {
    font-family: 'Orbitron', monospace;
    font-size: 1.2rem;
    font-weight: 700;
    color: #0a0e27;
    text-align: center;
    padding: 1rem;
  }

  .organized-by {
    text-align: center;
    margin-top: 4rem;
  }

  .organized-text {
    font-family: 'Space Mono', monospace;
    font-size: 1.5rem;
    color: rgba(255, 255, 255, 0.7);
    margin-bottom: 2rem;
    text-transform: uppercase;
    letter-spacing: 0.2em;
  }

  .organizer-card {
    display: inline-block;
    padding: 2rem 4rem;
    background: linear-gradient(135deg, rgba(0, 255, 136, 0.1), rgba(0, 204, 255, 0.1));
    border: 2px solid rgba(0, 255, 136, 0.3);
    border-radius: 25px;
    backdrop-filter: blur(10px);
    transition: all 0.3s ease;
  }

  .organizer-card:hover {
    border-color: rgba(0, 255, 136, 0.6);
    box-shadow: 0 10px 40px rgba(0, 255, 136, 0.3);
    transform: translateY(-5px);
  }

  .organizer-link {
    display: block;
  }

  .organizer-logo {
    max-width: 300px;
    height: auto;
    filter: brightness(1.1);
    transition: all 0.3s ease;
  }

  .organizer-card:hover .organizer-logo {
    filter: brightness(1.3);
    transform: scale(1.05);
  }

  @media (max-width: 768px) {
    .sponsors-section {
      padding: 4rem 1rem;
    }

    .sponsors-grid {
      grid-template-columns: 1fr;
      gap: 1.5rem;
    }

    .sponsor-card {
      padding: 2rem 1.5rem;
    }

    .section-title {
      gap: 1rem;
    }

    .title-line {
      max-width: 50px;
    }

    .organizer-card {
      padding: 1.5rem 2rem;
    }

    .organizer-logo {
      max-width: 200px;
    }
  }
</style>
