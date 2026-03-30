<script>
  import { onMount } from "svelte";

  let visible = false;

  onMount(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            visible = true;
          }
        });
      },
      { threshold: 0.2 },
    );

    const element = document.querySelector(".featured-section");
    if (element) observer.observe(element);

    return () => observer.disconnect();
  });
</script>

<div class="featured-section" class:visible>
  <div class="container">
    <div class="header-container">
      <h2 class="section-title">
        <span class="title-line"></span>
        <span class="title-text">Unintended Behaviour</span>
        <span class="title-line"></span>
      </h2>
      <p class="section-subtitle">Featured Project</p>
    </div>

    <div class="project-showcase">
      <div class="project-card">
        <div class="card-glow"></div>
        <a
          href="https://cam-hack-2025.devpost.com"
          target="_blank"
          class="project-link"
        >
          <div class="image-container">
            <img
              src="/unintended.png"
              alt="Unintended Behaviour"
              class="project-image"
            />
            <div class="image-overlay">
              <span class="overlay-text">View Project</span>
            </div>
          </div>
        </a>
      </div>
    </div>
  </div>
</div>

<style>
  .featured-section {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 4rem 2rem;
    position: relative;
    overflow: hidden;
  }

  .featured-section::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 200px;
    background: linear-gradient(180deg, #0a0e1a 0%, transparent 100%);
    z-index: 0;
  }

  .container {
    max-width: 1400px;
    width: 100%;
    z-index: 1;
  }

  .header-container {
    text-align: center;
    margin-bottom: 4rem;
    opacity: 0;
    transform: translateY(30px);
    transition:
      opacity 1s ease,
      transform 1s ease;
  }

  .visible .header-container {
    opacity: 1;
    transform: translateY(0);
  }

  .section-title {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 2rem;
    margin-bottom: 1rem;
  }

  .title-line {
    width: 100px;
    height: 2px;
    background: linear-gradient(90deg, transparent, #10b981, transparent);
    animation: pulse-line 2s ease-in-out infinite;
  }

  @keyframes pulse-line {
    0%,
    100% {
      opacity: 0.5;
    }
    50% {
      opacity: 1;
    }
  }

  .title-text {
    font-size: clamp(2rem, 5vw, 3.5rem);
    font-weight: bold;
    color: white;
    letter-spacing: 0.05em;
    text-shadow: 0 0 20px rgba(16, 185, 129, 0.5);
  }

  .section-subtitle {
    font-size: 1.25rem;
    color: #86e293;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    margin: 0;
  }

  .project-showcase {
    display: flex;
    justify-content: center;
    opacity: 0;
    transform: scale(0.9);
    transition:
      opacity 1.2s ease 0.3s,
      transform 1.2s ease 0.3s;
  }

  .visible .project-showcase {
    opacity: 1;
    transform: scale(1);
  }

  .project-card {
    position: relative;
    max-width: 1200px;
    width: 100%;
    border-radius: 2rem;
    overflow: hidden;
    background: rgba(16, 185, 129, 0.05);
    border: 2px solid rgba(16, 185, 129, 0.3);
    transition: all 0.5s ease;
    box-shadow: 0 10px 50px rgba(16, 185, 129, 0.2);
  }

  .project-card::before {
    content: "";
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: linear-gradient(
      45deg,
      transparent,
      rgba(16, 185, 129, 0.1),
      transparent
    );
    transform: rotate(45deg);
    animation: shine 3s infinite;
  }

  @keyframes shine {
    0% {
      transform: translateX(-100%) translateY(-100%) rotate(45deg);
    }
    100% {
      transform: translateX(100%) translateY(100%) rotate(45deg);
    }
  }

  .project-card:hover {
    transform: translateY(-10px) scale(1.02);
    border-color: #10b981;
    box-shadow: 0 20px 80px rgba(16, 185, 129, 0.4);
  }

  .card-glow {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(
      circle at center,
      rgba(16, 185, 129, 0.2),
      transparent 70%
    );
    opacity: 0;
    transition: opacity 0.5s ease;
    pointer-events: none;
  }

  .project-card:hover .card-glow {
    opacity: 1;
  }

  .project-link {
    display: block;
    text-decoration: none;
    position: relative;
  }

  .image-container {
    position: relative;
    overflow: hidden;
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
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(10, 14, 26, 0.8);
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  .project-card:hover .image-overlay {
    opacity: 1;
  }

  .overlay-text {
    font-size: 2rem;
    font-weight: bold;
    color: #10b981;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    text-shadow: 0 0 20px rgba(16, 185, 129, 0.8);
    animation: glow-text 1.5s ease-in-out infinite;
  }

  @keyframes glow-text {
    0%,
    100% {
      text-shadow: 0 0 20px rgba(16, 185, 129, 0.8);
    }
    50% {
      text-shadow: 0 0 40px rgba(16, 185, 129, 1);
    }
  }

  @media (max-width: 768px) {
    .title-line {
      width: 50px;
    }

    .section-title {
      gap: 1rem;
    }
  }
</style>
