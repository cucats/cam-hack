<script>
  import { onMount } from 'svelte';
  
  let sectionRef;
  let isVisible = $state(false);

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

<div class="about-section" bind:this={sectionRef}>
  <div class="content-wrapper" class:visible={isVisible}>
    <div class="section-header">
      <h2 class="section-title">
        <span class="title-icon">⚡</span>
        About
      </h2>
      <div class="title-underline"></div>
    </div>

    <div class="about-content">
      <div class="about-card glass-card">
        <div class="card-icon">🚀</div>
        <p>
          Cam Hack is a 2 day hackathon for the innovative minds at the University of
          Cambridge. Over an action-packed weekend, students come together to design
          and build technology projects from the ground up. We welcome participants
          ranging from curious beginners to seasoned coders. Expect plenty of free
          stash, food, and mini-events throughout this hackathon.
        </p>
      </div>

      <div class="about-card glass-card prize-card">
        <div class="card-icon">🏆</div>
        <p>
          For the winning team, each person will receive £200 and can choose from a
          range of prizes including: smartwatches, Steam vouchers, Amazon vouchers, or
          Sony XM4 headphones.
        </p>
        <div class="prize-glow"></div>
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
        <span class="stat-label">Prize</span>
      </div>
      <div class="stat-divider"></div>
      <div class="stat-item">
        <span class="stat-number">∞</span>
        <span class="stat-label">Possibilities</span>
      </div>
    </div>
  </div>

  <div class="decorative-lines">
    <div class="line line-1"></div>
    <div class="line line-2"></div>
    <div class="line line-3"></div>
  </div>
</div>

<style>
  .about-section {
    position: relative;
    padding: 6rem 2rem;
    overflow: hidden;
  }

  .content-wrapper {
    max-width: 900px;
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
    margin-bottom: 3rem;
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
    animation: pulse 2s infinite;
  }

  @keyframes pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.1); }
  }

  .title-underline {
    width: 100px;
    height: 3px;
    background: linear-gradient(90deg, transparent, var(--color-primary), transparent);
    margin: 0 auto;
    border-radius: 2px;
  }

  .about-content {
    display: grid;
    gap: 2rem;
    margin-bottom: 3rem;
  }

  .about-card {
    padding: 2rem;
    position: relative;
    transition: all 0.4s ease;
  }

  .about-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 20px 40px rgba(0, 255, 136, 0.15);
  }

  .card-icon {
    font-size: 2.5rem;
    margin-bottom: 1rem;
  }

  .about-card p {
    color: var(--color-text-light);
    line-height: 1.8;
    margin: 0;
    font-size: 1.1rem;
  }

  .prize-card {
    border: 1px solid rgba(0, 255, 136, 0.3);
  }

  .prize-glow {
    position: absolute;
    inset: 0;
    border-radius: 1rem;
    background: radial-gradient(circle at center, rgba(0, 255, 136, 0.05), transparent 70%);
    pointer-events: none;
  }

  .stats-row {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    flex-wrap: wrap;
  }

  .stat-item {
    text-align: center;
    padding: 1rem 2rem;
  }

  .stat-number {
    display: block;
    font-family: var(--font-mono);
    font-size: clamp(2rem, 6vw, 3rem);
    font-weight: 700;
    color: var(--color-primary);
    text-shadow: 0 0 30px rgba(0, 255, 136, 0.5);
    line-height: 1;
    margin-bottom: 0.5rem;
  }

  .stat-label {
    display: block;
    font-size: 0.9rem;
    color: var(--color-text-muted);
    text-transform: uppercase;
    letter-spacing: 0.15em;
  }

  .stat-divider {
    width: 1px;
    height: 60px;
    background: linear-gradient(to bottom, transparent, var(--color-primary), transparent);
  }

  @media (max-width: 640px) {
    .stat-divider {
      display: none;
    }
  }

  .decorative-lines {
    position: absolute;
    inset: 0;
    pointer-events: none;
    overflow: hidden;
  }

  .line {
    position: absolute;
    background: linear-gradient(90deg, transparent, rgba(0, 255, 136, 0.1), transparent);
    height: 1px;
  }

  .line-1 {
    top: 20%;
    left: 0;
    right: 0;
    animation: slide-line 8s infinite linear;
  }

  .line-2 {
    top: 50%;
    left: 0;
    right: 0;
    animation: slide-line 12s infinite linear reverse;
  }

  .line-3 {
    top: 80%;
    left: 0;
    right: 0;
    animation: slide-line 10s infinite linear;
  }

  @keyframes slide-line {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(100%); }
  }
</style>
