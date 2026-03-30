<script>
  import { onMount } from 'svelte';
  
  let visible = $state(false);
  
  onMount(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            visible = true;
          }
        });
      },
      { threshold: 0.1 }
    );
    
    const element = document.querySelector('.featured-container');
    if (element) observer.observe(element);
    
    return () => observer.disconnect();
  });
</script>

<div class="featured-container" class:visible>
  <h2 class="featured-title">Unintended Behaviour</h2>
  <div class="featured-content">
    <a 
      href="https://cam-hack-2025.devpost.com" 
      target="_blank"
      class="featured-link"
    >
      <div class="featured-image-wrapper">
        <img
          src="/unintended.png"
          alt="Unintended"
          class="featured-image"
        />
        <div class="featured-overlay">
          <span class="featured-overlay-text">View Project</span>
        </div>
      </div>
    </a>
  </div>
</div>

<style>
  .featured-container {
    padding: 6rem 2rem;
    max-width: 1400px;
    margin: 0 auto;
    position: relative;
    z-index: 1;
    opacity: 0;
    transform: translateY(50px);
    transition: all 1s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .featured-container.visible {
    opacity: 1;
    transform: translateY(0);
  }

  .featured-title {
    font-size: 4rem;
    font-weight: 900;
    text-align: center;
    background: linear-gradient(135deg, #00ff88, #0dff00);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin-bottom: 3rem;
    text-transform: uppercase;
    letter-spacing: -1px;
  }

  .featured-content {
    position: relative;
  }

  .featured-link {
    display: block;
    text-decoration: none;
  }

  .featured-image-wrapper {
    position: relative;
    border-radius: 30px;
    overflow: hidden;
    box-shadow: 0 20px 60px rgba(0, 255, 136, 0.3);
    border: 3px solid rgba(0, 255, 136, 0.4);
    transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
    background: linear-gradient(135deg, rgba(0, 255, 136, 0.1), rgba(13, 255, 0, 0.1));
  }

  .featured-image-wrapper:hover {
    transform: translateY(-10px) rotateZ(1deg);
    box-shadow: 0 30px 80px rgba(0, 255, 136, 0.5), inset 0 0 60px rgba(0, 255, 136, 0.2);
    border-color: rgba(0, 255, 136, 0.8);
  }

  .featured-image-wrapper::before {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    background: linear-gradient(45deg, #00ff88, #0dff00, #00ffaa, #00ff88);
    border-radius: 30px;
    z-index: -1;
    opacity: 0;
    transition: opacity 0.5s;
    animation: rotate 3s linear infinite;
  }

  .featured-image-wrapper:hover::before {
    opacity: 0.6;
  }

  @keyframes rotate {
    100% {
      transform: rotate(360deg);
    }
  }

  .featured-image {
    width: 100%;
    height: auto;
    display: block;
    transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .featured-image-wrapper:hover .featured-image {
    transform: scale(1.05);
  }

  .featured-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(0, 255, 136, 0.9), rgba(13, 255, 0, 0.9));
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: opacity 0.4s ease;
  }

  .featured-image-wrapper:hover .featured-overlay {
    opacity: 1;
  }

  .featured-overlay-text {
    font-size: 2.5rem;
    font-weight: 900;
    color: #0a0f0a;
    text-transform: uppercase;
    letter-spacing: 2px;
  }

  @media (max-width: 768px) {
    .featured-container {
      padding: 4rem 1rem;
    }

    .featured-title {
      font-size: 2.5rem;
    }

    .featured-overlay-text {
      font-size: 1.5rem;
    }
  }
</style>
