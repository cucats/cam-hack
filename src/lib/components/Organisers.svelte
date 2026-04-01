<script>
  import { onMount } from "svelte";

  let sectionRef;
  let visible = $state(false);

  const organisers = [
    { name: "James Leung", image: "/james.png" },
    { name: "Uliana Ronska", image: "/uliana.jpg" },
    { name: "Athena Eng", image: "/athena.jpg" },
    { name: "Oliver Greenwood", image: "/oliver.png" },
    { name: "Jadon Mensah", image: "/jadon.png" },
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

    if (sectionRef) {
      observer.observe(sectionRef);
    }

    return () => observer.disconnect();
  });
</script>

<div bind:this={sectionRef} class="organisers-container">
  <h2 class="section-title" class:visible>
    <span class="title-icon">&#128101;</span>
    Organising Committee
  </h2>

  <div class="organisers-grid">
    {#each organisers as organiser, i}
      <div class="organiser-card" class:visible style="--delay: {i * 0.1}s">
        <div class="image-wrapper">
          <img src={organiser.image} alt={organiser.name} class="organiser-image" />
          <div class="image-overlay"></div>
          <div class="image-ring"></div>
        </div>
        <p class="organiser-name">{organiser.name}</p>
        <div class="card-glow"></div>
      </div>
    {/each}
  </div>
</div>

<style>
  .organisers-container {
    max-width: 1280px;
    margin: 0 auto;
    padding: 2rem 1rem;
  }

  .section-title {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 3rem;
    opacity: 0;
    transform: translateY(30px);
    transition:
      opacity 0.8s ease,
      transform 0.8s ease;
  }

  .section-title.visible {
    opacity: 1;
    transform: translateY(0);
  }

  .title-icon {
    font-size: 2.5rem;
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

  @media (min-width: 768px) {
    .organisers-grid {
      grid-template-columns: repeat(4, 1fr);
    }
  }

  @media (min-width: 1024px) {
    .organisers-grid {
      grid-template-columns: repeat(5, 1fr);
    }
  }

  .organiser-card {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2rem 1.5rem;
    background: rgba(0, 255, 136, 0.02);
    border: 1px solid rgba(0, 255, 136, 0.1);
    border-radius: 20px;
    opacity: 0;
    transform: translateY(30px) scale(0.9);
    transition:
      opacity 0.8s ease,
      transform 0.8s ease,
      border-color 0.3s ease,
      background 0.3s ease;
    transition-delay: var(--delay);
    overflow: hidden;
    width: 100%;
    max-width: 200px;
  }

  .organiser-card.visible {
    opacity: 1;
    transform: translateY(0) scale(1);
  }

  .organiser-card:hover {
    border-color: rgba(0, 255, 136, 0.3);
    background: rgba(0, 255, 136, 0.05);
    transform: translateY(-10px) scale(1.02);
  }

  .organiser-card:hover .card-glow {
    opacity: 1;
  }

  .organiser-card:hover .image-ring {
    opacity: 1;
    transform: scale(1.1);
  }

  .organiser-card:hover .organiser-image {
    transform: scale(1.05);
  }

  .image-wrapper {
    position: relative;
    width: 120px;
    height: 120px;
    margin-bottom: 1rem;
  }

  .organiser-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
    transition: transform 0.4s ease;
    position: relative;
    z-index: 2;
  }

  .image-overlay {
    position: absolute;
    inset: 0;
    border-radius: 50%;
    background: linear-gradient(
      135deg,
      transparent 50%,
      rgba(0, 255, 136, 0.2) 100%
    );
    z-index: 3;
    pointer-events: none;
  }

  .image-ring {
    position: absolute;
    inset: -4px;
    border-radius: 50%;
    border: 2px solid #00ff88;
    opacity: 0;
    transition:
      opacity 0.4s ease,
      transform 0.4s ease;
    box-shadow:
      0 0 20px rgba(0, 255, 136, 0.5),
      inset 0 0 20px rgba(0, 255, 136, 0.1);
  }

  .organiser-name {
    font-family: "Orbitron", monospace;
    font-size: 0.95rem;
    font-weight: 600;
    color: #00ffcc;
    text-align: center;
    margin: 0;
    transition: all 0.3s ease;
  }

  .organiser-card:hover .organiser-name {
    color: #00ff88;
    text-shadow: 0 0 10px rgba(0, 255, 136, 0.5);
  }

  .card-glow {
    position: absolute;
    inset: -20px;
    background: radial-gradient(
      circle at center,
      rgba(0, 255, 136, 0.1) 0%,
      transparent 60%
    );
    opacity: 0;
    transition: opacity 0.4s ease;
    pointer-events: none;
  }
</style>
