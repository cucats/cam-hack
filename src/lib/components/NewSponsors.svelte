<script>
  import { sponsors, organizers } from './sponsors-data.js';
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
    
    const element = document.querySelector('.sponsors-container');
    if (element) observer.observe(element);
    
    return () => observer.disconnect();
  });
</script>

<div class="sponsors-container" class:visible>
  <h2 class="sponsors-title">Sponsored by</h2>
  
  <div class="sponsors-grid">
    {#each sponsors as sponsor, i}
      <a 
        href={sponsor.url}
        target="_blank"
        class="sponsor-card"
        style="animation-delay: {i * 0.1}s"
      >
        <div class="sponsor-inner">
          <img
            src={sponsor.logo}
            alt={sponsor.name}
            class="sponsor-logo"
          />
        </div>
      </a>
    {/each}
  </div>
  
  <div class="organizer-section">
    <h3 class="organizer-title">{organizers.runBy.title}</h3>
    <a 
      href={organizers.runBy.url}
      target="_blank"
      class="organizer-link"
    >
      <img
        src={organizers.runBy.logo}
        alt={organizers.runBy.name}
        class="organizer-logo"
      />
    </a>
  </div>
</div>

<style>
  .sponsors-container {
    padding: 6rem 2rem;
    max-width: 1400px;
    margin: 0 auto;
    position: relative;
    z-index: 1;
    opacity: 0;
    transform: translateY(50px);
    transition: all 1s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .sponsors-container.visible {
    opacity: 1;
    transform: translateY(0);
  }

  .sponsors-title {
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

  .sponsors-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2rem;
    margin-bottom: 6rem;
  }

  .sponsor-card {
    opacity: 0;
    animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    text-decoration: none;
  }

  .sponsor-inner {
    background: linear-gradient(135deg, rgba(0, 255, 136, 0.05), rgba(13, 255, 0, 0.05));
    border: 2px solid rgba(0, 255, 136, 0.2);
    border-radius: 20px;
    padding: 2rem;
    height: 180px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
    backdrop-filter: blur(10px);
  }

  .sponsor-card:hover .sponsor-inner {
    transform: translateY(-10px);
    border-color: rgba(0, 255, 136, 0.6);
    box-shadow: 0 20px 60px rgba(0, 255, 136, 0.3);
    background: linear-gradient(135deg, rgba(0, 255, 136, 0.1), rgba(13, 255, 0, 0.1));
  }

  .sponsor-logo {
    max-width: 80%;
    max-height: 100px;
    width: auto;
    height: auto;
    object-fit: contain;
    filter: brightness(1.2) contrast(1.1);
    transition: transform 0.3s ease;
  }

  .sponsor-card:hover .sponsor-logo {
    transform: scale(1.1);
  }

  .organizer-section {
    text-align: center;
    padding: 3rem;
    background: linear-gradient(135deg, rgba(0, 255, 136, 0.08), rgba(13, 255, 0, 0.08));
    border: 2px solid rgba(0, 255, 136, 0.3);
    border-radius: 30px;
    backdrop-filter: blur(10px);
  }

  .organizer-title {
    font-size: 2rem;
    font-weight: 700;
    color: #00ff88;
    margin-bottom: 2rem;
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  .organizer-link {
    display: inline-block;
    transition: transform 0.3s ease;
  }

  .organizer-link:hover {
    transform: scale(1.1);
  }

  .organizer-logo {
    max-width: 300px;
    width: 100%;
    height: auto;
    filter: drop-shadow(0 5px 20px rgba(0, 255, 136, 0.3));
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
    .sponsors-container {
      padding: 4rem 1rem;
    }

    .sponsors-title {
      font-size: 2.5rem;
    }

    .sponsors-grid {
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1.5rem;
    }

    .sponsor-inner {
      height: 150px;
      padding: 1.5rem;
    }

    .organizer-title {
      font-size: 1.5rem;
    }

    .organizer-logo {
      max-width: 200px;
    }
  }
</style>
