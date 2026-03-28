<div class="about-container">
  <div class="content-wrapper">
    <h2 class="section-title">
      <span class="title-accent">[</span>
      About
      <span class="title-accent">]</span>
    </h2>
    
    <div class="content-grid">
      <div class="info-card">
        <div class="card-icon">⚡</div>
        <p class="info-text">
          Cam Hack is a 2 day hackathon for the innovative minds at the University of
          Cambridge. Over an action-packed weekend, students come together to design
          and build technology projects from the ground up.
        </p>
      </div>

      <div class="info-card">
        <div class="card-icon">🚀</div>
        <p class="info-text">
          We welcome participants ranging from curious beginners to seasoned coders. 
          Expect plenty of free stash, food, and mini-events throughout this hackathon.
        </p>
      </div>

      <div class="info-card highlight-card">
        <div class="card-icon">🏆</div>
        <p class="info-text">
          For the winning team, each person will receive £200 and can choose from a
          range of prizes including: smartwatches, Steam vouchers, Amazon vouchers, or
          Sony XM4 headphones.
        </p>
      </div>
    </div>
  </div>
</div>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Space+Mono:wght@400;700&display=swap');

  .about-container {
    padding: 6rem 2rem;
    background: linear-gradient(180deg, rgba(0, 0, 0, 0.9) 0%, rgba(10, 77, 46, 0.2) 100%);
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

  .content-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
  }

  .info-card {
    background: rgba(0, 0, 0, 0.6);
    border: 2px solid rgba(0, 255, 136, 0.3);
    border-radius: 20px;
    padding: 2.5rem;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
    overflow: hidden;
  }

  .info-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(0, 255, 136, 0.1), transparent);
    transition: left 0.6s ease;
  }

  .info-card:hover::before {
    left: 100%;
  }

  .info-card:hover {
    transform: translateY(-10px);
    border-color: #00ff88;
    box-shadow: 
      0 15px 40px rgba(0, 255, 136, 0.3),
      inset 0 0 20px rgba(0, 255, 136, 0.1);
  }

  .highlight-card {
    border-color: rgba(0, 255, 136, 0.6);
    background: linear-gradient(135deg, rgba(0, 255, 136, 0.1) 0%, rgba(10, 77, 46, 0.3) 100%);
  }

  .highlight-card:hover {
    border-color: #00ff88;
    box-shadow: 
      0 15px 40px rgba(0, 255, 136, 0.5),
      inset 0 0 30px rgba(0, 255, 136, 0.2);
  }

  .card-icon {
    font-size: 3rem;
    margin-bottom: 1.5rem;
    text-align: center;
    filter: drop-shadow(0 0 10px rgba(0, 255, 136, 0.5));
  }

  .info-text {
    font-family: 'Space Mono', monospace;
    font-size: clamp(0.95rem, 1.5vw, 1.1rem);
    line-height: 1.8;
    color: #e0e0e0;
    margin: 0;
  }

  @media (max-width: 768px) {
    .about-container {
      padding: 4rem 1rem;
    }

    .content-grid {
      grid-template-columns: 1fr;
    }

    .info-card {
      padding: 2rem;
    }
  }
</style>
