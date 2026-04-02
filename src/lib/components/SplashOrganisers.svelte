<script>
  import { onMount } from 'svelte';

  let visible = $state(false);

  const organisers = [
    { name: 'James Leung', image: '/james.png' },
    { name: 'Uliana Ronska', image: '/uliana.jpg' },
    { name: 'Athena Eng', image: '/athena.jpg' },
    { name: 'Oliver Greenwood', image: '/oliver.png' },
    { name: 'Jadon Mensah', image: '/jadon.png' }
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
      { threshold: 0.2 }
    );

    const element = document.querySelector('.organisers-section');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  });
</script>

<section class="organisers-section" class:visible>
  <div class="organisers-container">
    <h2 class="section-title">
      <span class="title-line"></span>
      <span class="title-text">Organising Committee</span>
      <span class="title-line"></span>
    </h2>
    
    <div class="organisers-grid">
      {#each organisers as organiser, index}
        <div class="organiser-card" style="animation-delay: {index * 0.1}s">
          <div class="image-container">
            <img src={organiser.image} alt={organiser.name} class="organiser-image" />
            <div class="image-glow"></div>
          </div>
          <p class="organiser-name">{organiser.name}</p>
        </div>
      {/each}
    </div>
  </div>
</section>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Space+Mono:wght@400;700&display=swap');

  .organisers-section {
    position: relative;
    padding: 8rem 2rem 10rem 2rem;
    background: linear-gradient(180deg, #0a0e27 0%, #1a1e3f 100%);
    overflow: hidden;
    opacity: 0;
    transform: translateY(50px);
    transition: all 1s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .organisers-section.visible {
    opacity: 1;
    transform: translateY(0);
  }

  .organisers-section::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, #00ff88, transparent);
  }

  .organisers-container {
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
    background: linear-gradient(90deg, transparent, #00ff88, transparent);
    max-width: 200px;
  }

  .title-text {
    font-family: 'Orbitron', monospace;
    font-size: clamp(2rem, 5vw, 3.5rem);
    font-weight: 900;
    color: #00ff88;
    text-shadow: 0 0 20px rgba(0, 255, 136, 0.5);
    text-transform: uppercase;
    letter-spacing: 0.1em;
    text-align: center;
  }

  .organisers-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 3rem;
    justify-items: center;
  }

  .organiser-card {
    position: relative;
    text-align: center;
    transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
    opacity: 0;
    transform: translateY(30px) scale(0.9);
    animation: popIn 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
  }

  .organisers-section.visible .organiser-card {
    opacity: 1;
    transform: translateY(0) scale(1);
  }

  @keyframes popIn {
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }

  .organiser-card:hover {
    transform: translateY(-10px) scale(1.05);
  }

  .image-container {
    position: relative;
    width: 180px;
    height: 180px;
    margin: 0 auto 1.5rem;
  }

  .organiser-image {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
    border: 3px solid rgba(0, 255, 136, 0.3);
    transition: all 0.3s ease;
    position: relative;
    z-index: 2;
  }

  .organiser-card:hover .organiser-image {
    border-color: rgba(0, 255, 136, 0.8);
    box-shadow: 0 0 40px rgba(0, 255, 136, 0.6);
  }

  .image-glow {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(0, 255, 136, 0.4), transparent 70%);
    opacity: 0;
    transition: opacity 0.3s ease;
    z-index: 1;
  }

  .organiser-card:hover .image-glow {
    opacity: 1;
    animation: pulse 2s infinite;
  }

  @keyframes pulse {
    0%, 100% {
      transform: translate(-50%, -50%) scale(1);
      opacity: 0.6;
    }
    50% {
      transform: translate(-50%, -50%) scale(1.2);
      opacity: 0.3;
    }
  }

  .organiser-name {
    font-family: 'Space Mono', monospace;
    font-size: 1.1rem;
    color: rgba(255, 255, 255, 0.9);
    transition: all 0.3s ease;
    margin: 0;
  }

  .organiser-card:hover .organiser-name {
    color: #00ff88;
    text-shadow: 0 0 10px rgba(0, 255, 136, 0.5);
  }

  @media (max-width: 768px) {
    .organisers-section {
      padding: 4rem 1rem 6rem 1rem;
    }

    .organisers-grid {
      grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
      gap: 2rem;
    }

    .image-container {
      width: 140px;
      height: 140px;
    }

    .section-title {
      gap: 1rem;
    }

    .title-line {
      max-width: 30px;
    }

    .organiser-name {
      font-size: 0.9rem;
    }
  }
</style>
