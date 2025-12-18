<script>
  import { onMount } from "svelte";

  let sectionRef;
  let visible = $state(false);

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

<div bind:this={sectionRef} class="about-container">
  <div class="content-wrapper" class:visible>
    <h2 class="section-title">
      <span class="title-icon">&#128187;</span>
      About
    </h2>

    <div class="about-grid">
      <div class="about-card main-card">
        <div class="card-glow"></div>
        <p>
          Cam Hack is a 2 day hackathon for the innovative minds at the
          University of Cambridge. Over an action-packed weekend, students come
          together to design and build technology projects from the ground up.
          We welcome participants ranging from curious beginners to seasoned
          coders. Expect plenty of free stash, food, and mini-events throughout
          this hackathon.
        </p>
      </div>

      <div class="about-card prize-card">
        <div class="card-glow"></div>
        <div class="prize-icon">&#127942;</div>
        <h3>Prizes</h3>
        <p>
          For the winning team, each person will receive £200 and can choose
          from a range of prizes including: smartwatches, Steam vouchers, Amazon
          vouchers, or Sony XM4 headphones.
        </p>
      </div>
    </div>

    <div class="stats-row">
      <div class="stat-item">
        <span class="stat-number">2</span>
        <span class="stat-label">Days</span>
      </div>
      <div class="stat-divider"></div>
      <div class="stat-item">
        <span class="stat-number">£200</span>
        <span class="stat-label">Per Winner</span>
      </div>
      <div class="stat-divider"></div>
      <div class="stat-item">
        <span class="stat-number">&#8734;</span>
        <span class="stat-label">Possibilities</span>
      </div>
    </div>
  </div>
</div>

<style>
  .about-container {
    max-width: 1280px;
    margin: 0 auto;
    padding: 2rem 1rem;
  }

  .content-wrapper {
    opacity: 0;
    transform: translateY(50px);
    transition:
      opacity 1s ease,
      transform 1s ease;
  }

  .content-wrapper.visible {
    opacity: 1;
    transform: translateY(0);
  }

  .section-title {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 3rem;
  }

  .title-icon {
    font-size: 2.5rem;
  }

  .about-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 2rem;
    margin-bottom: 3rem;
  }

  @media (min-width: 768px) {
    .about-grid {
      grid-template-columns: 2fr 1fr;
    }
  }

  .about-card {
    position: relative;
    padding: 2rem;
    background: rgba(0, 255, 136, 0.03);
    border: 1px solid rgba(0, 255, 136, 0.1);
    border-radius: 20px;
    backdrop-filter: blur(10px);
    transition: all 0.4s ease;
    overflow: hidden;
  }

  .about-card:hover {
    border-color: rgba(0, 255, 136, 0.3);
    transform: translateY(-5px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  }

  .about-card:hover .card-glow {
    opacity: 1;
  }

  .card-glow {
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(
      circle at center,
      rgba(0, 255, 136, 0.1) 0%,
      transparent 50%
    );
    opacity: 0;
    transition: opacity 0.4s ease;
    pointer-events: none;
  }

  .about-card p {
    color: rgba(255, 255, 255, 0.85);
    line-height: 1.8;
    font-size: 1.1rem;
    margin: 0;
    position: relative;
    z-index: 1;
  }

  .prize-card {
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .prize-icon {
    font-size: 4rem;
    margin-bottom: 1rem;
    animation: float 3s ease-in-out infinite;
  }

  .prize-card h3 {
    margin-bottom: 1rem;
  }

  .prize-card p {
    font-size: 0.95rem;
  }

  .stats-row {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    flex-wrap: wrap;
    padding: 2rem;
    background: rgba(0, 255, 136, 0.02);
    border-radius: 20px;
    border: 1px solid rgba(0, 255, 136, 0.1);
  }

  .stat-item {
    text-align: center;
  }

  .stat-number {
    display: block;
    font-family: "Orbitron", monospace;
    font-size: 2.5rem;
    font-weight: 900;
    color: #00ff88;
    text-shadow: 0 0 20px rgba(0, 255, 136, 0.5);
    margin-bottom: 0.5rem;
  }

  .stat-label {
    font-size: 0.875rem;
    text-transform: uppercase;
    letter-spacing: 0.2em;
    color: rgba(255, 255, 255, 0.6);
  }

  .stat-divider {
    width: 1px;
    height: 60px;
    background: linear-gradient(
      to bottom,
      transparent,
      rgba(0, 255, 136, 0.3),
      transparent
    );
  }

  @keyframes float {
    0%,
    100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-10px);
    }
  }
</style>
