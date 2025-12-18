<script>
  import { onMount } from 'svelte';
  
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
      { threshold: 0.2 }
    );

    if (sectionRef) observer.observe(sectionRef);

    return () => observer.disconnect();
  });
</script>

<div class="featured-section" bind:this={sectionRef}>
  <div class="section-header" class:visible={isVisible}>
    <h2 class="section-title">
      <span class="title-decoration"></span>
      Featured Project
      <span class="title-decoration right"></span>
    </h2>
    <p class="section-subtitle">Lorem ipsum dolor sit amet consectetur</p>
  </div>

  <div class="project-showcase" class:visible={isVisible}>
    <a 
      target="_blank" 
      href="https://cam-hack-2025.devpost.com" 
      class="project-card glass-card"
    >
      <div class="project-image-container">
        <img
          src="/unintended.png"
          alt="Unintended Behaviour"
          class="project-image"
        />
        <div class="image-overlay"></div>
        <div class="project-badge">
          <span class="badge-icon">🏆</span>
          <span class="badge-text">Winner</span>
        </div>
      </div>
      <div class="project-info">
        <h3 class="project-title">Unintended Behaviour</h3>
        <p class="project-description">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        <div class="project-tags">
          <span class="tag">Lorem</span>
          <span class="tag">Ipsum</span>
          <span class="tag">Dolor</span>
        </div>
        <div class="view-project">
          <span>View on Devpost</span>
          <svg class="arrow-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </div>
      </div>
      <div class="card-glow"></div>
    </a>
  </div>

  <div class="floating-elements">
    <div class="float-element elem-1"></div>
    <div class="float-element elem-2"></div>
    <div class="float-element elem-3"></div>
  </div>
</div>

<style>
  .featured-section {
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
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1.5rem;
    font-size: clamp(2rem, 5vw, 3rem);
    color: var(--color-text-light);
    margin-bottom: 1rem;
  }

  .title-decoration {
    display: inline-block;
    width: 60px;
    height: 2px;
    background: linear-gradient(90deg, transparent, var(--color-primary));
  }

  .title-decoration.right {
    background: linear-gradient(90deg, var(--color-primary), transparent);
  }

  .section-subtitle {
    color: var(--color-text-muted);
    font-size: 1.1rem;
    margin: 0;
  }

  .project-showcase {
    max-width: 1000px;
    margin: 0 auto;
    opacity: 0;
    transform: translateY(50px) scale(0.95);
    transition: all 1s ease-out 0.3s;
  }

  .project-showcase.visible {
    opacity: 1;
    transform: translateY(0) scale(1);
  }

  .project-card {
    display: block;
    text-decoration: none;
    color: var(--color-text-light);
    position: relative;
    overflow: hidden;
    transition: all 0.5s ease;
  }

  .project-card:hover {
    transform: translateY(-10px);
    box-shadow: 0 30px 60px rgba(0, 255, 136, 0.2);
  }

  .project-image-container {
    position: relative;
    overflow: hidden;
    border-radius: 1rem 1rem 0 0;
  }

  .project-image {
    width: 100%;
    height: auto;
    display: block;
    transition: transform 0.5s ease;
  }

  .project-card:hover .project-image {
    transform: scale(1.05);
  }

  .image-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(to bottom, transparent 50%, rgba(10, 10, 10, 0.9) 100%);
    pointer-events: none;
  }

  .project-badge {
    position: absolute;
    top: 1.5rem;
    right: 1.5rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    background: rgba(0, 255, 136, 0.9);
    color: var(--color-dark);
    border-radius: 2rem;
    font-weight: 600;
    font-size: 0.9rem;
    box-shadow: 0 4px 20px rgba(0, 255, 136, 0.4);
  }

  .badge-icon {
    font-size: 1.1rem;
  }

  .project-info {
    padding: 2rem;
  }

  .project-title {
    font-size: 1.75rem;
    margin-bottom: 1rem;
    color: var(--color-primary);
    text-shadow: 0 0 20px rgba(0, 255, 136, 0.3);
  }

  .project-description {
    color: var(--color-text-muted);
    line-height: 1.6;
    margin-bottom: 1.5rem;
  }

  .project-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-bottom: 1.5rem;
  }

  .tag {
    padding: 0.25rem 0.75rem;
    background: rgba(0, 255, 136, 0.1);
    border: 1px solid rgba(0, 255, 136, 0.3);
    border-radius: 1rem;
    font-size: 0.85rem;
    color: var(--color-primary);
  }

  .view-project {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    color: var(--color-primary);
    font-weight: 600;
    transition: gap 0.3s ease;
  }

  .project-card:hover .view-project {
    gap: 1rem;
  }

  .arrow-icon {
    width: 20px;
    height: 20px;
    transition: transform 0.3s ease;
  }

  .project-card:hover .arrow-icon {
    transform: translateX(5px);
  }

  .card-glow {
    position: absolute;
    inset: 0;
    border-radius: 1rem;
    opacity: 0;
    transition: opacity 0.5s ease;
    background: radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(0, 255, 136, 0.1), transparent 50%);
    pointer-events: none;
  }

  .project-card:hover .card-glow {
    opacity: 1;
  }

  .floating-elements {
    position: absolute;
    inset: 0;
    pointer-events: none;
    overflow: hidden;
  }

  .float-element {
    position: absolute;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(0, 255, 136, 0.1), transparent);
    animation: float-around 20s infinite ease-in-out;
  }

  .elem-1 {
    width: 300px;
    height: 300px;
    top: 10%;
    left: -10%;
    animation-delay: 0s;
  }

  .elem-2 {
    width: 200px;
    height: 200px;
    top: 60%;
    right: -5%;
    animation-delay: -7s;
  }

  .elem-3 {
    width: 150px;
    height: 150px;
    bottom: 10%;
    left: 20%;
    animation-delay: -14s;
  }

  @keyframes float-around {
    0%, 100% { transform: translate(0, 0) scale(1); }
    25% { transform: translate(30px, -30px) scale(1.1); }
    50% { transform: translate(0, -20px) scale(0.9); }
    75% { transform: translate(-30px, 10px) scale(1.05); }
  }
</style>
