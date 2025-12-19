<script>
  import { onMount } from 'svelte';

  let isVisible = false;
  let scrollY = 0;

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

    const section = document.querySelector('.featured-project');
    if (section) {
      observer.observe(section);
    }

    const handleScroll = () => {
      scrollY = window.scrollY;
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  });
</script>

<div class="featured-project" class:visible={isVisible}>
  <div class="featured-container">
    <div class="section-header">
      <div class="header-line"></div>
      <h2 class="section-title">FEATURED PROJECT</h2>
      <div class="header-line"></div>
    </div>

    <div class="project-card">
      <div class="card-glow"></div>
      <div class="card-content">
        <div class="project-badge">
          <span class="badge-text">WINNER</span>
          <span class="badge-glow"></span>
        </div>

        <h3 class="project-title">UNINTENDED BEHAVIOUR</h3>

        <div class="project-image-wrapper">
          <div class="image-overlay"></div>
          <a href="https://cam-hack-2025.devpost.com" target="_blank" class="project-link">
            <img 
              src="/unintended.png" 
              alt="Unintended Behaviour" 
              class="project-image"
            />
            <div class="hover-overlay">
              <span class="view-project">VIEW PROJECT</span>
            </div>
          </a>
        </div>

        <div class="project-meta">
          <div class="meta-item">
            <span class="meta-label">HACKATHON</span>
            <span class="meta-value">CAM HACK 2025</span>
          </div>
          <div class="meta-item">
            <span class="meta-label">DATE</span>
            <span class="meta-value">NOV 1-2</span>
          </div>
        </div>
      </div>
    </div>

    <div class="decorative-grid">
      <div class="grid-line grid-line-1"></div>
      <div class="grid-line grid-line-2"></div>
      <div class="grid-line grid-line-3"></div>
    </div>
  </div>
</div>

<style>
  .featured-project {
    position: relative;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 4rem 2rem;
    overflow: hidden;
  }

  .featured-container {
    position: relative;
    max-width: 1200px;
    width: 100%;
    opacity: 0;
    transform: translateY(50px);
    transition: all 1s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .visible .featured-container {
    opacity: 1;
    transform: translateY(0);
  }

  .section-header {
    display: flex;
    align-items: center;
    gap: 2rem;
    margin-bottom: 4rem;
  }

  .header-line {
    flex: 1;
    height: 2px;
    background: linear-gradient(90deg, transparent, #00ff87, transparent);
    animation: lineGlow 2s ease-in-out infinite alternate;
  }

  @keyframes lineGlow {
    from {
      opacity: 0.3;
    }
    to {
      opacity: 1;
    }
  }

  .section-title {
    font-size: clamp(1.8rem, 5vw, 3.5rem);
    color: #00ff87;
    letter-spacing: 0.15em;
    font-weight: 900;
    white-space: nowrap;
    text-shadow: 0 0 20px rgba(0, 255, 135, 0.6);
  }

  .project-card {
    position: relative;
    background: linear-gradient(135deg, rgba(0, 255, 135, 0.05), rgba(100, 255, 218, 0.05));
    border: 2px solid #00ff87;
    border-radius: 24px;
    padding: 3rem;
    overflow: hidden;
    transition: all 0.4s ease;
  }

  .visible .project-card {
    animation: cardEntrance 1s ease-out 0.3s backwards;
  }

  @keyframes cardEntrance {
    from {
      opacity: 0;
      transform: scale(0.9) rotateX(10deg);
    }
    to {
      opacity: 1;
      transform: scale(1) rotateX(0);
    }
  }

  .project-card:hover {
    transform: translateY(-10px);
    box-shadow: 
      0 20px 60px rgba(0, 255, 135, 0.3),
      inset 0 0 60px rgba(0, 255, 135, 0.1);
  }

  .card-glow {
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(0, 255, 135, 0.2), transparent 70%);
    opacity: 0;
    transition: opacity 0.4s ease;
    pointer-events: none;
  }

  .project-card:hover .card-glow {
    opacity: 1;
    animation: rotateGlow 4s linear infinite;
  }

  @keyframes rotateGlow {
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

  .project-badge {
    position: relative;
    display: inline-block;
    padding: 0.8rem 2rem;
    background: linear-gradient(135deg, #00ff87, #64ffda);
    border-radius: 8px;
    margin-bottom: 2rem;
    overflow: hidden;
  }

  .badge-text {
    position: relative;
    z-index: 2;
    color: #000a08;
    font-weight: 900;
    font-size: 1.1rem;
    letter-spacing: 0.15em;
  }

  .badge-glow {
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.5), transparent);
    animation: badgeShimmer 2s infinite;
  }

  @keyframes badgeShimmer {
    0% {
      left: -100%;
    }
    100% {
      left: 200%;
    }
  }

  .project-title {
    font-size: clamp(2rem, 6vw, 4rem);
    color: #64ffda;
    font-weight: 900;
    letter-spacing: 0.05em;
    margin-bottom: 2rem;
    text-shadow: 0 0 30px rgba(100, 255, 218, 0.5);
    animation: titleFloat 3s ease-in-out infinite;
  }

  @keyframes titleFloat {
    0%, 100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-5px);
    }
  }

  .project-image-wrapper {
    position: relative;
    margin: 2rem 0;
    border-radius: 16px;
    overflow: hidden;
  }

  .image-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(0, 255, 135, 0.1), rgba(100, 255, 218, 0.1));
    pointer-events: none;
    z-index: 1;
  }

  .project-link {
    position: relative;
    display: block;
    overflow: hidden;
    border-radius: 16px;
  }

  .project-image {
    width: 100%;
    height: auto;
    display: block;
    transition: transform 0.6s ease;
  }

  .project-link:hover .project-image {
    transform: scale(1.05);
  }

  .hover-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 255, 135, 0.9);
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: opacity 0.4s ease;
  }

  .project-link:hover .hover-overlay {
    opacity: 1;
  }

  .view-project {
    color: #000a08;
    font-size: 1.5rem;
    font-weight: 900;
    letter-spacing: 0.1em;
    padding: 1rem 2rem;
    border: 3px solid #000a08;
    border-radius: 12px;
    transform: translateY(20px);
    transition: transform 0.4s ease;
  }

  .project-link:hover .view-project {
    transform: translateY(0);
  }

  .project-meta {
    display: flex;
    gap: 3rem;
    margin-top: 2rem;
    flex-wrap: wrap;
  }

  .meta-item {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .meta-label {
    color: #64ffda;
    font-size: 0.9rem;
    font-weight: 600;
    letter-spacing: 0.15em;
    opacity: 0.8;
  }

  .meta-value {
    color: #e0ffe8;
    font-size: 1.3rem;
    font-weight: 700;
    letter-spacing: 0.05em;
  }

  .decorative-grid {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    overflow: hidden;
  }

  .grid-line {
    position: absolute;
    background: linear-gradient(90deg, transparent, rgba(0, 255, 135, 0.2), transparent);
    height: 2px;
    width: 100%;
    animation: gridSlide 8s ease-in-out infinite;
  }

  .grid-line-1 {
    top: 20%;
    animation-delay: 0s;
  }

  .grid-line-2 {
    top: 50%;
    animation-delay: 2s;
  }

  .grid-line-3 {
    top: 80%;
    animation-delay: 4s;
  }

  @keyframes gridSlide {
    0%, 100% {
      transform: translateX(-100%);
      opacity: 0;
    }
    50% {
      transform: translateX(100%);
      opacity: 1;
    }
  }

  @media (max-width: 768px) {
    .featured-project {
      padding: 2rem 1rem;
    }

    .project-card {
      padding: 2rem 1.5rem;
    }

    .section-header {
      gap: 1rem;
    }

    .header-line {
      display: none;
    }
  }
</style>
