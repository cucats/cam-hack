<script>
  import { onMount } from 'svelte';

  let isVisible = false;

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

    const section = document.querySelector('.about-section');
    if (section) {
      observer.observe(section);
    }

    return () => {
      observer.disconnect();
    };
  });
</script>

<div class="about-section" class:visible={isVisible}>
  <div class="about-container">
    <div class="title-wrapper">
      <h2 class="section-title">ABOUT</h2>
      <div class="title-underline"></div>
    </div>

    <div class="content-grid">
      <div class="content-card card-1">
        <div class="card-icon">⚡</div>
        <p class="card-text">
          Cam Hack is a 2 day hackathon for the innovative minds at the University of
          Cambridge. Over an action-packed weekend, students come together to design
          and build technology projects from the ground up. We welcome participants
          ranging from curious beginners to seasoned coders. Expect plenty of free
          stash, food, and mini-events throughout this hackathon.
        </p>
      </div>

      <div class="content-card card-2">
        <div class="card-icon">🏆</div>
        <p class="card-text">
          For the winning team, each person will receive £200 and can choose from a
          range of prizes including: smartwatches, Steam vouchers, Amazon vouchers, or
          Sony XM4 headphones.
        </p>
      </div>
    </div>
  </div>
</div>

<style>
  .about-section {
    position: relative;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 6rem 2rem;
  }

  .about-container {
    max-width: 1200px;
    width: 100%;
    opacity: 0;
    transform: translateY(50px);
    transition: all 1s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .visible .about-container {
    opacity: 1;
    transform: translateY(0);
  }

  .title-wrapper {
    margin-bottom: 4rem;
    text-align: center;
  }

  .section-title {
    font-size: clamp(2.5rem, 6vw, 5rem);
    color: #00ff87;
    font-weight: 900;
    letter-spacing: 0.2em;
    margin-bottom: 1rem;
    text-shadow: 0 0 30px rgba(0, 255, 135, 0.6);
  }

  .visible .section-title {
    animation: slideInFromLeft 1s ease-out;
  }

  @keyframes slideInFromLeft {
    from {
      opacity: 0;
      transform: translateX(-50px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  .title-underline {
    height: 4px;
    width: 0;
    margin: 0 auto;
    background: linear-gradient(90deg, transparent, #00ff87, transparent);
    transition: width 1s ease-out 0.3s;
  }

  .visible .title-underline {
    width: 200px;
  }

  .content-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 3rem;
  }

  .content-card {
    position: relative;
    background: linear-gradient(135deg, rgba(0, 255, 135, 0.05), rgba(100, 255, 218, 0.05));
    border: 2px solid rgba(0, 255, 135, 0.3);
    border-radius: 20px;
    padding: 3rem;
    opacity: 0;
    transform: translateY(30px);
    transition: all 0.4s ease;
  }

  .visible .card-1 {
    animation: fadeInUp 1s ease-out 0.5s forwards;
  }

  .visible .card-2 {
    animation: fadeInUp 1s ease-out 0.7s forwards;
  }

  @keyframes fadeInUp {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .content-card:hover {
    transform: translateY(-10px);
    border-color: #00ff87;
    box-shadow: 
      0 20px 50px rgba(0, 255, 135, 0.3),
      inset 0 0 30px rgba(0, 255, 135, 0.1);
  }

  .content-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #00ff87, #64ffda);
    border-radius: 20px 20px 0 0;
    transform: scaleX(0);
    transition: transform 0.4s ease;
  }

  .content-card:hover::before {
    transform: scaleX(1);
  }

  .card-icon {
    font-size: 3rem;
    margin-bottom: 1.5rem;
    filter: grayscale(100%) brightness(2);
    opacity: 0.8;
  }

  .card-text {
    color: #e0ffe8;
    font-size: 1.1rem;
    line-height: 1.8;
    letter-spacing: 0.02em;
  }

  @media (max-width: 768px) {
    .about-section {
      padding: 4rem 1rem;
    }

    .content-grid {
      gap: 2rem;
    }

    .content-card {
      padding: 2rem;
    }
  }
</style>
