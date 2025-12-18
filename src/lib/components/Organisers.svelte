<script>
  import { onMount } from 'svelte';
  
  let sectionRef;
  let isVisible = $state(false);

  const organisers = [
    { name: 'James Leung', image: '/james.png' },
    { name: 'Uliana Ronska', image: '/uliana.jpg' },
    { name: 'Athena Eng', image: '/athena.jpg' },
    { name: 'Oliver Greenwood', image: '/oliver.png' },
    { name: 'Jadon Mensah', image: '/jadon.png' },
  ];

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

<div class="organisers-section" bind:this={sectionRef}>
  <div class="content-wrapper" class:visible={isVisible}>
    <div class="section-header">
      <h2 class="section-title">
        <span class="title-icon">👥</span>
        Organising Committee
      </h2>
      <div class="title-underline"></div>
    </div>

    <div class="organisers-grid">
      {#each organisers as organiser, index}
        <div 
          class="organiser-card"
          style="animation-delay: {index * 0.15}s"
        >
          <div class="card-inner">
            <div class="image-container">
              <img
                src={organiser.image}
                alt={organiser.name}
                class="organiser-image"
              />
              <div class="image-glow"></div>
              <div class="image-ring"></div>
            </div>
            <h3 class="organiser-name">{organiser.name}</h3>
            <div class="organiser-decoration">
              <span class="dot"></span>
              <span class="line"></span>
              <span class="dot"></span>
            </div>
          </div>
        </div>
      {/each}
    </div>
  </div>

  <div class="background-grid"></div>
</div>

<style>
  .organisers-section {
    position: relative;
    padding: 6rem 2rem;
    overflow: hidden;
  }

  .content-wrapper {
    max-width: 1100px;
    margin: 0 auto;
    opacity: 0;
    transform: translateY(50px);
    transition: all 0.8s ease-out;
  }

  .content-wrapper.visible {
    opacity: 1;
    transform: translateY(0);
  }

  .section-header {
    text-align: center;
    margin-bottom: 4rem;
  }

  .section-title {
    display: inline-flex;
    align-items: center;
    gap: 0.75rem;
    font-size: clamp(2rem, 5vw, 3rem);
    margin-bottom: 1rem;
  }

  .title-icon {
    font-size: 0.8em;
  }

  .title-underline {
    width: 100px;
    height: 3px;
    background: linear-gradient(90deg, transparent, var(--color-primary), transparent);
    margin: 0 auto;
    border-radius: 2px;
  }

  .organisers-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 2rem;
    justify-items: center;
  }

  @media (min-width: 640px) {
    .organisers-grid {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  @media (min-width: 1024px) {
    .organisers-grid {
      grid-template-columns: repeat(5, 1fr);
    }
  }

  .organiser-card {
    opacity: 0;
    animation: pop-in 0.6s ease-out forwards;
  }

  @keyframes pop-in {
    0% {
      opacity: 0;
      transform: scale(0.8) translateY(20px);
    }
    70% {
      transform: scale(1.05) translateY(-5px);
    }
    100% {
      opacity: 1;
      transform: scale(1) translateY(0);
    }
  }

  .card-inner {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 1.5rem;
  }

  .image-container {
    position: relative;
    margin-bottom: 1.5rem;
  }

  .organiser-image {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    object-fit: cover;
    position: relative;
    z-index: 2;
    transition: all 0.4s ease;
    filter: grayscale(30%);
  }

  .organiser-card:hover .organiser-image {
    transform: scale(1.1);
    filter: grayscale(0%);
  }

  .image-glow {
    position: absolute;
    inset: -10px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(0, 255, 136, 0.3), transparent 70%);
    opacity: 0;
    transition: opacity 0.4s ease;
    z-index: 1;
  }

  .organiser-card:hover .image-glow {
    opacity: 1;
  }

  .image-ring {
    position: absolute;
    inset: -5px;
    border-radius: 50%;
    border: 2px solid transparent;
    background: linear-gradient(135deg, var(--color-primary), var(--color-accent)) border-box;
    -webkit-mask: linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0);
    mask: linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    opacity: 0;
    transition: opacity 0.4s ease;
    z-index: 3;
  }

  .organiser-card:hover .image-ring {
    opacity: 1;
    animation: spin 3s linear infinite;
  }

  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }

  .organiser-name {
    font-size: 1.1rem;
    font-weight: 600;
    color: var(--color-text-light);
    margin-bottom: 0.75rem;
    transition: color 0.3s ease;
  }

  .organiser-card:hover .organiser-name {
    color: var(--color-primary);
  }

  .organiser-decoration {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    opacity: 0;
    transform: scaleX(0);
    transition: all 0.4s ease;
  }

  .organiser-card:hover .organiser-decoration {
    opacity: 1;
    transform: scaleX(1);
  }

  .dot {
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background: var(--color-primary);
  }

  .line {
    width: 30px;
    height: 1px;
    background: linear-gradient(90deg, var(--color-primary), var(--color-accent));
  }

  .background-grid {
    position: absolute;
    inset: 0;
    background-image: 
      radial-gradient(circle at center, rgba(0, 255, 136, 0.03) 1px, transparent 1px);
    background-size: 30px 30px;
    pointer-events: none;
  }
</style>
