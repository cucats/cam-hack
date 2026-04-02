<script>
  import { onMount } from 'svelte';

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

    const element = document.querySelector('.featured-section');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  });
</script>

<section class="featured-section" class:visible>
  <div class="featured-container">
    <h2 class="section-title">
      <span class="title-line"></span>
      <span class="title-text">Featured Project</span>
      <span class="title-line"></span>
    </h2>
    
    <div class="project-card">
      <div class="card-glow"></div>
      <div class="card-content">
        <h3 class="project-title">Unintended Behaviour</h3>
        <div class="project-image-container">
          <a href="https://cam-hack-2025.devpost.com" target="_blank" class="project-link">
            <img src="/unintended.png" alt="Unintended Behaviour" class="project-image" />
            <div class="image-overlay">
              <span class="view-text">View on Devpost</span>
            </div>
          </a>
        </div>
      </div>
    </div>
  </div>
</section>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Space+Mono:wght@400;700&display=swap');

  .featured-section {
    position: relative;
    padding: 8rem 2rem;
    background: linear-gradient(180deg, #0a0e27 0%, #1a1e3f 100%);
    overflow: hidden;
    opacity: 0;
    transform: translateY(50px);
    transition: all 1s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .featured-section.visible {
    opacity: 1;
    transform: translateY(0);
  }

  .featured-section::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, #00ff88, transparent);
  }

  .featured-container {
    max-width: 1200px;
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
    white-space: nowrap;
  }

  .project-card {
    position: relative;
    background: linear-gradient(135deg, rgba(0, 255, 136, 0.05), rgba(0, 204, 255, 0.05));
    border: 2px solid rgba(0, 255, 136, 0.2);
    border-radius: 30px;
    padding: 3rem;
    backdrop-filter: blur(10px);
    overflow: hidden;
    transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .project-card:hover {
    border-color: rgba(0, 255, 136, 0.5);
    box-shadow: 0 20px 60px rgba(0, 255, 136, 0.3);
    transform: translateY(-10px);
  }

  .card-glow {
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(0, 255, 136, 0.1), transparent 50%);
    animation: rotate 20s linear infinite;
    pointer-events: none;
  }

  @keyframes rotate {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  .card-content {
    position: relative;
    z-index: 2;
  }

  .project-title {
    font-family: 'Orbitron', monospace;
    font-size: clamp(1.5rem, 4vw, 2.5rem);
    font-weight: 700;
    color: #00ccff;
    text-align: center;
    margin-bottom: 2rem;
    text-shadow: 0 0 15px rgba(0, 204, 255, 0.5);
  }

  .project-image-container {
    position: relative;
    overflow: hidden;
    border-radius: 20px;
  }

  .project-link {
    position: relative;
    display: block;
    overflow: hidden;
    border-radius: 20px;
  }

  .project-image {
    width: 100%;
    height: auto;
    display: block;
    transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
    filter: brightness(0.9);
  }

  .project-link:hover .project-image {
    transform: scale(1.05);
    filter: brightness(1.1);
  }

  .image-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(0, 255, 136, 0.8), rgba(0, 204, 255, 0.8));
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  .project-link:hover .image-overlay {
    opacity: 1;
  }

  .view-text {
    font-family: 'Orbitron', monospace;
    font-size: 1.5rem;
    font-weight: 700;
    color: #0a0e27;
    text-transform: uppercase;
    letter-spacing: 0.1em;
  }

  @media (max-width: 768px) {
    .featured-section {
      padding: 4rem 1rem;
    }

    .project-card {
      padding: 2rem 1.5rem;
    }

    .section-title {
      gap: 1rem;
    }

    .title-line {
      max-width: 50px;
    }
  }
</style>
