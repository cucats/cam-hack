<script>
  import { sponsors, organizers } from "./sponsors-data.js";
</script>

<div class="sponsors-container">
  <div class="content-wrapper">
    <h2 class="section-title">
      <span class="title-accent">{"{"}</span>
      Sponsored by
      <span class="title-accent">{"}"}</span>
    </h2>
    
    <div class="sponsors-grid">
      {#each sponsors as sponsor}
        <a 
          class="sponsor-card" 
          target="_blank" 
          href={sponsor.url}
        >
          <div class="sponsor-image-wrapper">
            <img
              class="sponsor-image {sponsor.className}"
              src={sponsor.logo}
              alt={sponsor.name}
            />
          </div>
          <div class="sponsor-overlay"></div>
        </a>
      {/each}
    </div>

    <div class="organizer-section">
      <h3 class="organizer-title">
        <span class="title-accent">{">"}</span>
        {organizers.runBy.title}
        <span class="title-accent">{"<"}</span>
      </h3>
      <a 
        class="organizer-card" 
        target="_blank" 
        href={organizers.runBy.url}
      >
        <div class="organizer-image-wrapper">
          <img
            class="organizer-image {organizers.runBy.className}"
            src={organizers.runBy.logo}
            alt={organizers.runBy.name}
          />
        </div>
      </a>
    </div>
  </div>
</div>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Space+Mono:wght@400;700&display=swap');

  .sponsors-container {
    padding: 6rem 2rem;
    background: linear-gradient(180deg, rgba(10, 77, 46, 0.2) 0%, rgba(0, 0, 0, 0.9) 100%);
    position: relative;
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

  .sponsors-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2rem;
    margin-bottom: 5rem;
  }

  .sponsor-card {
    position: relative;
    aspect-ratio: 16 / 10;
    background: rgba(0, 0, 0, 0.6);
    border: 2px solid rgba(0, 255, 136, 0.3);
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    overflow: hidden;
    text-decoration: none;
  }

  .sponsor-card:hover {
    transform: translateY(-10px) scale(1.02);
    border-color: #00ff88;
    box-shadow: 
      0 15px 40px rgba(0, 255, 136, 0.4),
      inset 0 0 30px rgba(0, 255, 136, 0.1);
  }

  .sponsor-image-wrapper {
    position: relative;
    z-index: 1;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .sponsor-image {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
    transition: all 0.4s ease;
    filter: brightness(1) saturate(1);
  }

  .sponsor-card:hover .sponsor-image {
    filter: brightness(1.2) saturate(1.3) drop-shadow(0 0 20px rgba(0, 255, 136, 0.5));
    transform: scale(1.05);
  }

  .sponsor-overlay {
    position: absolute;
    inset: 0;
    background: radial-gradient(circle at center, rgba(0, 255, 136, 0.05) 0%, transparent 70%);
    opacity: 0;
    transition: opacity 0.4s ease;
    pointer-events: none;
  }

  .sponsor-card:hover .sponsor-overlay {
    opacity: 1;
  }

  .organizer-section {
    text-align: center;
    margin-top: 4rem;
  }

  .organizer-title {
    font-family: 'Orbitron', sans-serif;
    font-size: clamp(1.5rem, 3vw, 2.5rem);
    font-weight: 700;
    color: #00ff88;
    margin-bottom: 2rem;
    letter-spacing: 0.2rem;
    text-transform: uppercase;
    text-shadow: 0 0 15px rgba(0, 255, 136, 0.4);
  }

  .organizer-card {
    display: inline-block;
    position: relative;
    background: rgba(0, 0, 0, 0.6);
    border: 2px solid rgba(0, 255, 136, 0.5);
    border-radius: 20px;
    padding: 3rem 5rem;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    text-decoration: none;
  }

  .organizer-card:hover {
    transform: translateY(-10px);
    border-color: #00ff88;
    box-shadow: 
      0 20px 50px rgba(0, 255, 136, 0.5),
      inset 0 0 40px rgba(0, 255, 136, 0.15);
  }

  .organizer-image-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .organizer-image {
    max-width: 100%;
    height: auto;
    transition: all 0.4s ease;
    filter: brightness(1.1);
  }

  .organizer-card:hover .organizer-image {
    filter: brightness(1.3) drop-shadow(0 0 30px rgba(0, 255, 136, 0.6));
    transform: scale(1.05);
  }

  @media (max-width: 768px) {
    .sponsors-container {
      padding: 4rem 1rem;
    }

    .sponsors-grid {
      grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
      gap: 1.5rem;
    }

    .sponsor-card {
      padding: 1.5rem;
    }

    .organizer-card {
      padding: 2rem 3rem;
    }
  }
</style>
