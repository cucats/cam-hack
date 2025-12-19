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
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            visible = true;
          }
        });
      },
      { threshold: 0.1 }
    );
    
    const element = document.querySelector('.organisers-container');
    if (element) observer.observe(element);
    
    return () => observer.disconnect();
  });
</script>

<div class="organisers-container" class:visible>
  <h2 class="organisers-title">Organising Committee</h2>
  
  <div class="organisers-grid">
    {#each organisers as organiser, i}
      <div 
        class="organiser-card"
        style="animation-delay: {i * 0.1}s"
      >
        <div class="organiser-image-wrapper">
          <img
            src={organiser.image}
            alt={organiser.name}
            class="organiser-image"
          />
          <div class="organiser-glow"></div>
        </div>
        <div class="organiser-name">{organiser.name}</div>
      </div>
    {/each}
  </div>
</div>

<style>
  .organisers-container {
    padding: 6rem 2rem;
    max-width: 1400px;
    margin: 0 auto;
    position: relative;
    z-index: 1;
    opacity: 0;
    transform: translateY(50px);
    transition: all 1s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .organisers-container.visible {
    opacity: 1;
    transform: translateY(0);
  }

  .organisers-title {
    font-size: 3.5rem;
    font-weight: 900;
    text-align: center;
    background: linear-gradient(135deg, #00ff88, #0dff00);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin-bottom: 4rem;
    text-transform: uppercase;
  }

  .organisers-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 3rem;
    justify-items: center;
  }

  .organiser-card {
    text-align: center;
    opacity: 0;
    animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }

  .organiser-image-wrapper {
    position: relative;
    width: 200px;
    height: 200px;
    margin: 0 auto 1.5rem;
  }

  .organiser-image {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
    border: 4px solid rgba(0, 255, 136, 0.5);
    box-shadow: 0 10px 40px rgba(0, 255, 136, 0.3);
    transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
    position: relative;
    z-index: 2;
  }

  .organiser-glow {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(0, 255, 136, 0.4), transparent);
    opacity: 0;
    transition: opacity 0.4s ease;
    z-index: 1;
  }

  .organiser-card:hover .organiser-image {
    transform: scale(1.1);
    border-color: rgba(0, 255, 136, 0.9);
    box-shadow: 0 15px 60px rgba(0, 255, 136, 0.5);
  }

  .organiser-card:hover .organiser-glow {
    opacity: 1;
  }

  .organiser-name {
    font-size: 1.3rem;
    font-weight: 600;
    color: #00ff88;
    text-shadow: 0 2px 10px rgba(0, 255, 136, 0.3);
  }

  @keyframes fadeInUp {
    to {
      opacity: 1;
      transform: translateY(0);
    }
    from {
      opacity: 0;
      transform: translateY(30px);
    }
  }

  @media (max-width: 768px) {
    .organisers-container {
      padding: 4rem 1rem;
    }

    .organisers-title {
      font-size: 2.5rem;
    }

    .organisers-grid {
      grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
      gap: 2rem;
    }

    .organiser-image-wrapper {
      width: 150px;
      height: 150px;
    }

    .organiser-name {
      font-size: 1.1rem;
    }
  }
</style>
