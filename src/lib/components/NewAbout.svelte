<script>
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
    
    const element = document.querySelector('.about-container');
    if (element) observer.observe(element);
    
    return () => observer.disconnect();
  });
</script>

<div class="about-container" class:visible>
  <h2 class="about-title">About</h2>
  
  <div class="about-content">
    <div class="about-card">
      <p class="about-text">
        Cam Hack is a 2 day hackathon for the innovative minds at the University of
        Cambridge. Over an action-packed weekend, students come together to design
        and build technology projects from the ground up. We welcome participants
        ranging from curious beginners to seasoned coders. Expect plenty of free
        stash, food, and mini-events throughout this hackathon.
      </p>
    </div>
    
    <div class="about-card highlight">
      <p class="about-text">
        For the winning team, each person will receive £200 and can choose from a
        range of prizes including: smartwatches, Steam vouchers, Amazon vouchers, or
        Sony XM4 headphones.
      </p>
    </div>
  </div>
</div>

<style>
  .about-container {
    padding: 6rem 2rem;
    max-width: 1200px;
    margin: 0 auto;
    position: relative;
    z-index: 1;
    opacity: 0;
    transform: translateY(50px);
    transition: all 1s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .about-container.visible {
    opacity: 1;
    transform: translateY(0);
  }

  .about-title {
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

  .about-content {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }

  .about-card {
    background: linear-gradient(135deg, rgba(0, 255, 136, 0.05), rgba(13, 255, 0, 0.05));
    border: 2px solid rgba(0, 255, 136, 0.2);
    border-radius: 25px;
    padding: 2.5rem;
    backdrop-filter: blur(10px);
    transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .about-card:hover {
    transform: translateX(10px);
    border-color: rgba(0, 255, 136, 0.5);
    box-shadow: 0 10px 40px rgba(0, 255, 136, 0.2);
  }

  .about-card.highlight {
    background: linear-gradient(135deg, rgba(0, 255, 136, 0.1), rgba(13, 255, 0, 0.1));
    border-color: rgba(0, 255, 136, 0.4);
  }

  .about-text {
    font-size: 1.3rem;
    line-height: 1.8;
    color: #7fff7f;
    margin: 0;
  }

  @media (max-width: 768px) {
    .about-container {
      padding: 4rem 1rem;
    }

    .about-title {
      font-size: 2.5rem;
    }

    .about-card {
      padding: 1.5rem;
    }

    .about-text {
      font-size: 1.1rem;
    }

    .about-card:hover {
      transform: translateX(5px);
    }
  }
</style>
