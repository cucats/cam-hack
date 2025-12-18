<div class="organisers-container">
  <div class="content-wrapper">
    <h2 class="section-title">
      <span class="title-accent">{"<"}</span>
      Organising Committee
      <span class="title-accent">{"/>"}</span>
    </h2>
    
    <div class="organisers-grid">
      <div class="organiser-card">
        <div class="image-wrapper">
          <img
            class="organiser-image"
            src="/james.png"
            alt="James Leung"
          />
          <div class="image-overlay"></div>
        </div>
        <div class="organiser-name">James Leung</div>
      </div>

      <div class="organiser-card">
        <div class="image-wrapper">
          <img
            class="organiser-image"
            src="/uliana.jpg"
            alt="Uliana Ronska"
          />
          <div class="image-overlay"></div>
        </div>
        <div class="organiser-name">Uliana Ronska</div>
      </div>

      <div class="organiser-card">
        <div class="image-wrapper">
          <img
            class="organiser-image"
            src="/athena.jpg"
            alt="Athena Eng"
          />
          <div class="image-overlay"></div>
        </div>
        <div class="organiser-name">Athena Eng</div>
      </div>

      <div class="organiser-card">
        <div class="image-wrapper">
          <img
            class="organiser-image"
            src="/oliver.png"
            alt="Oliver Greenwood"
          />
          <div class="image-overlay"></div>
        </div>
        <div class="organiser-name">Oliver Greenwood</div>
      </div>

      <div class="organiser-card">
        <div class="image-wrapper">
          <img
            class="organiser-image"
            src="/jadon.png"
            alt="Jadon Mensah"
          />
          <div class="image-overlay"></div>
        </div>
        <div class="organiser-name">Jadon Mensah</div>
      </div>
    </div>
  </div>
</div>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Space+Mono:wght@400;700&display=swap');

  .organisers-container {
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

  .organisers-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 3rem;
    justify-items: center;
  }

  .organiser-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .organiser-card:hover {
    transform: translateY(-10px);
  }

  .image-wrapper {
    position: relative;
    width: 180px;
    height: 180px;
    margin-bottom: 1.5rem;
    border-radius: 50%;
    overflow: hidden;
    border: 3px solid rgba(0, 255, 136, 0.3);
    box-shadow: 0 0 20px rgba(0, 255, 136, 0.2);
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .organiser-card:hover .image-wrapper {
    border-color: #00ff88;
    box-shadow: 
      0 0 40px rgba(0, 255, 136, 0.5),
      inset 0 0 30px rgba(0, 255, 136, 0.1);
  }

  .organiser-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: all 0.4s ease;
  }

  .organiser-card:hover .organiser-image {
    transform: scale(1.1);
    filter: brightness(1.2);
  }

  .image-overlay {
    position: absolute;
    inset: 0;
    background: radial-gradient(circle at center, transparent 40%, rgba(0, 255, 136, 0.2) 100%);
    opacity: 0;
    transition: opacity 0.4s ease;
    pointer-events: none;
  }

  .organiser-card:hover .image-overlay {
    opacity: 1;
  }

  .organiser-name {
    font-family: 'Space Mono', monospace;
    font-size: clamp(1rem, 1.5vw, 1.2rem);
    font-weight: 700;
    color: #e0e0e0;
    text-align: center;
    transition: all 0.3s ease;
  }

  .organiser-card:hover .organiser-name {
    color: #00ff88;
    text-shadow: 0 0 15px rgba(0, 255, 136, 0.5);
  }

  @media (max-width: 768px) {
    .organisers-container {
      padding: 4rem 1rem;
    }

    .organisers-grid {
      grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
      gap: 2rem;
    }

    .image-wrapper {
      width: 150px;
      height: 150px;
    }
  }
</style>
