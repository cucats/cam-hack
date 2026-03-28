<script>
  let isHovered = false;
</script>

<div class="featured-container">
  <div class="content-wrapper">
    <h2 class="section-title">
      <span class="title-accent">&lt;</span>
      Featured Project
      <span class="title-accent">/&gt;</span>
    </h2>
    
    <div 
      class="project-card"
      onmouseenter={() => isHovered = true}
      onmouseleave={() => isHovered = false}
      role="presentation"
    >
      <a 
        target="_blank" 
        href="https://cam-hack-2025.devpost.com" 
        class="project-link"
      >
        <div class="project-image-wrapper">
          <img
            src="/unintended.png"
            alt="Unintended Behaviour"
            class="project-image"
            class:hovered={isHovered}
          />
          <div class="image-overlay"></div>
        </div>
        
        <div class="project-info">
          <h3 class="project-title">Unintended Behaviour</h3>
          <div class="project-meta">
            <span class="meta-tag">Winner</span>
            <span class="meta-separator">|</span>
            <span class="meta-text">View on Devpost</span>
          </div>
        </div>
      </a>
      
      <div class="card-border"></div>
    </div>
  </div>
</div>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Space+Mono:wght@400;700&display=swap');

  .featured-container {
    padding: 6rem 2rem;
    background: linear-gradient(180deg, rgba(10, 77, 46, 0.1) 0%, rgba(0, 0, 0, 0.8) 100%);
    position: relative;
    overflow: hidden;
  }

  .featured-container::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent 0%, #00ff88 50%, transparent 100%);
    animation: slideGlow 3s ease-in-out infinite;
  }

  @keyframes slideGlow {
    0%, 100% {
      opacity: 0.3;
    }
    50% {
      opacity: 1;
    }
  }

  .content-wrapper {
    max-width: 1200px;
    margin: 0 auto;
  }

  .section-title {
    font-family: 'Orbitron', sans-serif;
    font-size: clamp(2rem, 5vw, 3.5rem);
    font-weight: 900;
    text-align: center;
    color: #00ff88;
    margin-bottom: 4rem;
    letter-spacing: 0.3rem;
    text-transform: uppercase;
    text-shadow: 0 0 20px rgba(0, 255, 136, 0.5);
  }

  .title-accent {
    color: #88ffb8;
    font-weight: 400;
  }

  .project-card {
    position: relative;
    background: rgba(0, 0, 0, 0.6);
    border-radius: 30px;
    overflow: hidden;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    border: 2px solid rgba(0, 255, 136, 0.3);
  }

  .project-card:hover {
    transform: translateY(-10px);
    border-color: #00ff88;
    box-shadow: 
      0 20px 60px rgba(0, 255, 136, 0.3),
      0 0 40px rgba(0, 255, 136, 0.2);
  }

  .card-border {
    position: absolute;
    inset: 0;
    border-radius: 30px;
    padding: 2px;
    background: linear-gradient(135deg, #00ff88, #88ffb8, #00cc6a);
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    opacity: 0;
    transition: opacity 0.4s ease;
    pointer-events: none;
  }

  .project-card:hover .card-border {
    opacity: 0.5;
    animation: rotateBorder 4s linear infinite;
  }

  @keyframes rotateBorder {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  .project-link {
    display: block;
    text-decoration: none;
    color: inherit;
  }

  .project-image-wrapper {
    position: relative;
    aspect-ratio: 16 / 9;
    overflow: hidden;
  }

  .project-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .project-image.hovered {
    transform: scale(1.08);
  }

  .image-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      180deg,
      transparent 0%,
      rgba(0, 0, 0, 0.8) 100%
    );
    opacity: 0;
    transition: opacity 0.4s ease;
  }

  .project-card:hover .image-overlay {
    opacity: 1;
  }

  .project-info {
    padding: 2rem 2.5rem;
    background: linear-gradient(
      180deg,
      rgba(0, 0, 0, 0.8) 0%,
      rgba(10, 77, 46, 0.3) 100%
    );
  }

  .project-title {
    font-family: 'Orbitron', sans-serif;
    font-size: clamp(1.5rem, 3vw, 2.5rem);
    font-weight: 700;
    color: #00ff88;
    margin-bottom: 1rem;
    letter-spacing: 0.2rem;
    text-shadow: 0 0 15px rgba(0, 255, 136, 0.4);
  }

  .project-meta {
    font-family: 'Space Mono', monospace;
    font-size: clamp(0.9rem, 1.5vw, 1.1rem);
    color: #88ffb8;
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .meta-tag {
    background: linear-gradient(135deg, #00ff88 0%, #00cc6a 100%);
    color: #0a0a0a;
    padding: 0.3rem 1rem;
    border-radius: 20px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.1rem;
    box-shadow: 0 0 15px rgba(0, 255, 136, 0.4);
  }

  .meta-separator {
    color: #00ff88;
  }

  .meta-text {
    letter-spacing: 0.1rem;
  }

  @media (max-width: 768px) {
    .featured-container {
      padding: 4rem 1rem;
    }

    .section-title {
      margin-bottom: 2rem;
    }

    .project-info {
      padding: 1.5rem;
    }

    .project-meta {
      flex-direction: column;
      align-items: flex-start;
      gap: 0.5rem;
    }

    .meta-separator {
      display: none;
    }
  }
</style>
