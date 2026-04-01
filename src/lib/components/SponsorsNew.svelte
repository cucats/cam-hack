<script>
  import { onMount } from 'svelte';
  import { sponsors } from './sponsors-data.js';

  let isVisible = false;

  onMount(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            isVisible = true;
          }
        });
      },
      { threshold: 0.2 }
    );

    const section = document.querySelector('.sponsors-section');
    if (section) {
      observer.observe(section);
    }

    return () => {
      observer.disconnect();
    };
  });
</script>

<div class="sponsors-section" class:visible={isVisible}>
  <div class="sponsors-container">
    <div class="title-wrapper">
      <div class="title-decoration-top"></div>
      <h2 class="section-title">SPONSORS</h2>
      <div class="title-decoration-bottom"></div>
    </div>

    <div class="sponsors-grid">
      {#each sponsors as sponsor, index}
        <div 
          class="sponsor-card" 
          style="animation-delay: {index * 0.1}s"
        >
          <a 
            href={sponsor.url} 
            target="_blank" 
            rel="noopener noreferrer"
            class="sponsor-link"
          >
            <div class="sponsor-glow"></div>
            <img 
              src={sponsor.logo} 
              alt={sponsor.name}
              class="sponsor-logo {sponsor.className}"
            />
            <div class="sponsor-overlay">
              <span class="sponsor-name">{sponsor.name}</span>
            </div>
          </a>
        </div>
      {/each}
    </div>

    <div class="organizer-section">
      <div class="organizer-label">RUN BY</div>
      <div class="organizer-card">
        <a href="https://cucats.org" target="_blank" rel="noopener noreferrer">
          <img 
            src="/cucats-logo-gradient-full.png" 
            alt="Cambridge University Computing and Technology Society"
            class="organizer-logo"
          />
        </a>
      </div>
    </div>
  </div>
</div>

<style>
  .sponsors-section {
    position: relative;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 6rem 2rem;
  }

  .sponsors-container {
    max-width: 1400px;
    width: 100%;
  }

  .title-wrapper {
    text-align: center;
    margin-bottom: 5rem;
    opacity: 0;
    transform: scale(0.9);
    transition: all 1s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .visible .title-wrapper {
    opacity: 1;
    transform: scale(1);
  }

  .title-decoration-top,
  .title-decoration-bottom {
    height: 2px;
    width: 100px;
    margin: 1rem auto;
    background: linear-gradient(90deg, transparent, #00ff87, transparent);
  }

  .title-decoration-top {
    animation: expandWidth 1.5s ease-out infinite alternate;
  }

  .title-decoration-bottom {
    animation: expandWidth 1.5s ease-out infinite alternate-reverse;
  }

  @keyframes expandWidth {
    from {
      width: 100px;
    }
    to {
      width: 200px;
    }
  }

  .section-title {
    font-size: clamp(2.5rem, 6vw, 5rem);
    color: #00ff87;
    font-weight: 900;
    letter-spacing: 0.2em;
    text-shadow: 0 0 30px rgba(0, 255, 135, 0.6);
  }

  .sponsors-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 3rem;
    margin-bottom: 5rem;
  }

  .sponsor-card {
    position: relative;
    opacity: 0;
    transform: translateY(50px) scale(0.9);
  }

  .visible .sponsor-card {
    animation: popIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }

  @keyframes popIn {
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }

  .sponsor-link {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 200px;
    padding: 2rem;
    background: linear-gradient(135deg, rgba(0, 255, 135, 0.05), rgba(100, 255, 218, 0.05));
    border: 2px solid rgba(0, 255, 135, 0.3);
    border-radius: 20px;
    text-decoration: none;
    overflow: hidden;
    transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .sponsor-link:hover {
    transform: translateY(-10px) scale(1.02);
    border-color: #00ff87;
    box-shadow: 
      0 20px 60px rgba(0, 255, 135, 0.4),
      inset 0 0 60px rgba(0, 255, 135, 0.1);
  }

  .sponsor-glow {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 150%;
    height: 150%;
    background: radial-gradient(circle, rgba(0, 255, 135, 0.3), transparent 70%);
    transform: translate(-50%, -50%) scale(0);
    transition: transform 0.5s ease;
    pointer-events: none;
  }

  .sponsor-link:hover .sponsor-glow {
    transform: translate(-50%, -50%) scale(1);
  }

  .sponsor-logo {
    position: relative;
    z-index: 2;
    max-width: 100%;
    height: auto;
    filter: brightness(1.2) contrast(1.1);
    transition: all 0.4s ease;
  }

  .sponsor-link:hover .sponsor-logo {
    filter: brightness(1.5) contrast(1.2);
    transform: scale(1.05);
  }

  .sponsor-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 255, 135, 0.95);
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: opacity 0.4s ease;
    z-index: 3;
  }

  .sponsor-link:hover .sponsor-overlay {
    opacity: 1;
  }

  .sponsor-name {
    color: #000a08;
    font-size: 1.3rem;
    font-weight: 900;
    letter-spacing: 0.05em;
    padding: 1rem 2rem;
    border: 3px solid #000a08;
    border-radius: 12px;
    text-align: center;
    transform: translateY(20px);
    transition: transform 0.4s ease 0.1s;
  }

  .sponsor-link:hover .sponsor-name {
    transform: translateY(0);
  }

  .organizer-section {
    text-align: center;
    margin-top: 6rem;
    opacity: 0;
    transform: translateY(30px);
    transition: all 1s ease-out 0.5s;
  }

  .visible .organizer-section {
    opacity: 1;
    transform: translateY(0);
  }

  .organizer-label {
    font-size: 1.5rem;
    color: #64ffda;
    font-weight: 800;
    letter-spacing: 0.15em;
    margin-bottom: 2rem;
  }

  .organizer-card {
    display: inline-block;
    padding: 2rem 4rem;
    background: linear-gradient(135deg, rgba(0, 255, 135, 0.1), rgba(100, 255, 218, 0.1));
    border: 3px solid #00ff87;
    border-radius: 24px;
    transition: all 0.4s ease;
  }

  .organizer-card:hover {
    transform: scale(1.05);
    box-shadow: 
      0 20px 60px rgba(0, 255, 135, 0.4),
      inset 0 0 40px rgba(0, 255, 135, 0.2);
  }

  .organizer-logo {
    max-width: 300px;
    height: auto;
    filter: brightness(1.2);
    transition: filter 0.4s ease;
  }

  .organizer-card:hover .organizer-logo {
    filter: brightness(1.5);
  }

  @media (max-width: 768px) {
    .sponsors-section {
      padding: 4rem 1rem;
    }

    .sponsors-grid {
      grid-template-columns: 1fr;
      gap: 2rem;
    }

    .sponsor-link {
      min-height: 150px;
      padding: 1.5rem;
    }

    .organizer-card {
      padding: 1.5rem 2rem;
    }

    .organizer-logo {
      max-width: 200px;
    }
  }
</style>
