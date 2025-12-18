<script>
  import { onMount } from 'svelte';

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

    const element = document.querySelector('#about');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  });
</script>

<section id="about" class="about-section" class:visible>
  <div class="about-container">
    <h2 class="section-title">
      <span class="title-line"></span>
      <span class="title-text">About</span>
      <span class="title-line"></span>
    </h2>
    
    <div class="content-grid">
      <div class="info-card">
        <div class="card-number">01</div>
        <div class="card-content">
          <p>
            Cam Hack is a 2 day hackathon for the innovative minds at the University of
            Cambridge. Over an action-packed weekend, students come together to design
            and build technology projects from the ground up. We welcome participants
            ranging from curious beginners to seasoned coders. Expect plenty of free
            stash, food, and mini-events throughout this hackathon.
          </p>
        </div>
      </div>

      <div class="info-card">
        <div class="card-number">02</div>
        <div class="card-content">
          <p>
            For the winning team, each person will receive £200 and can choose from a
            range of prizes including: smartwatches, Steam vouchers, Amazon vouchers, or
            Sony XM4 headphones.
          </p>
        </div>
      </div>
    </div>
  </div>
</section>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Space+Mono:wght@400;700&display=swap');

  .about-section {
    position: relative;
    padding: 8rem 2rem;
    background: linear-gradient(180deg, #0a0e27 0%, #1a1e3f 100%);
    overflow: hidden;
    opacity: 0;
    transform: translateY(50px);
    transition: all 1s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .about-section.visible {
    opacity: 1;
    transform: translateY(0);
  }

  .about-section::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, #ff00aa, transparent);
  }

  .about-container {
    max-width: 1200px;
    margin: 0 auto;
  }

  .section-title {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 2rem;
    margin-bottom: 4rem;
  }

  .title-line {
    flex: 1;
    height: 2px;
    background: linear-gradient(90deg, transparent, #ff00aa, transparent);
    max-width: 200px;
  }

  .title-text {
    font-family: 'Orbitron', monospace;
    font-size: clamp(2rem, 5vw, 3.5rem);
    font-weight: 900;
    color: #ff00aa;
    text-shadow: 0 0 20px rgba(255, 0, 170, 0.5);
    text-transform: uppercase;
    letter-spacing: 0.1em;
    white-space: nowrap;
  }

  .content-grid {
    display: grid;
    gap: 3rem;
  }

  .info-card {
    position: relative;
    background: linear-gradient(135deg, rgba(255, 0, 170, 0.05), rgba(0, 204, 255, 0.05));
    border: 2px solid rgba(255, 0, 170, 0.2);
    border-radius: 25px;
    padding: 3rem;
    backdrop-filter: blur(10px);
    transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
    opacity: 0;
    transform: translateX(-50px);
    animation: slideInLeft 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
  }

  .info-card:nth-child(2) {
    animation-delay: 0.2s;
    transform: translateX(50px);
    animation-name: slideInRight;
  }

  .about-section.visible .info-card {
    opacity: 1;
    transform: translateX(0);
  }

  @keyframes slideInLeft {
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @keyframes slideInRight {
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  .info-card:hover {
    border-color: rgba(255, 0, 170, 0.5);
    box-shadow: 0 20px 60px rgba(255, 0, 170, 0.3);
    transform: translateY(-5px);
  }

  .card-number {
    position: absolute;
    top: -20px;
    left: 30px;
    font-family: 'Orbitron', monospace;
    font-size: 6rem;
    font-weight: 900;
    color: rgba(255, 0, 170, 0.1);
    line-height: 1;
    pointer-events: none;
  }

  .card-content {
    position: relative;
    z-index: 2;
  }

  .card-content p {
    font-family: 'Space Mono', monospace;
    font-size: 1.1rem;
    line-height: 1.8;
    color: rgba(255, 255, 255, 0.9);
    margin: 0;
  }

  @media (max-width: 768px) {
    .about-section {
      padding: 4rem 1rem;
    }

    .info-card {
      padding: 2rem 1.5rem;
    }

    .section-title {
      gap: 1rem;
    }

    .title-line {
      max-width: 50px;
    }

    .card-number {
      font-size: 4rem;
      top: -15px;
      left: 15px;
    }

    .card-content p {
      font-size: 1rem;
    }
  }
</style>
