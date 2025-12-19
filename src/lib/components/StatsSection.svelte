<script>
  import { onMount } from 'svelte';
  
  let visible = false;
  let counts = {
    participants: 0,
    projects: 0,
    sponsors: 0,
    hours: 0
  };
  
  const targets = {
    participants: 150,
    projects: 42,
    sponsors: 7,
    hours: 48
  };
  
  onMount(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !visible) {
          visible = true;
          animateNumbers();
        }
      });
    }, { threshold: 0.3 });
    
    const element = document.getElementById('stats-section');
    if (element) observer.observe(element);
    
    return () => observer.disconnect();
  });
  
  function animateNumbers() {
    const duration = 2000;
    const steps = 60;
    const stepDuration = duration / steps;
    
    let currentStep = 0;
    
    const interval = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      
      counts.participants = Math.floor(targets.participants * progress);
      counts.projects = Math.floor(targets.projects * progress);
      counts.sponsors = Math.floor(targets.sponsors * progress);
      counts.hours = Math.floor(targets.hours * progress);
      
      if (currentStep >= steps) {
        counts = { ...targets };
        clearInterval(interval);
      }
    }, stepDuration);
  }
</script>

<div id="stats-section" class="relative py-32 px-4">
  <div class="absolute inset-0 bg-gradient-to-b from-emerald-950/30 via-transparent to-emerald-950/30"></div>
  
  <div class="max-w-7xl mx-auto relative z-10">
    <div class="text-center mb-16">
      <h2 class="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-green-500 mb-4">
        By The Numbers
      </h2>
    </div>
    
    <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
      <div class="stat-card" class:visible={visible} style="animation-delay: 0s">
        <div class="stat-number">{counts.participants}+</div>
        <div class="stat-label">Participants</div>
      </div>
      
      <div class="stat-card" class:visible={visible} style="animation-delay: 0.1s">
        <div class="stat-number">{counts.projects}+</div>
        <div class="stat-label">Projects</div>
      </div>
      
      <div class="stat-card" class:visible={visible} style="animation-delay: 0.2s">
        <div class="stat-number">{counts.sponsors}+</div>
        <div class="stat-label">Sponsors</div>
      </div>
      
      <div class="stat-card" class:visible={visible} style="animation-delay: 0.3s">
        <div class="stat-number">{counts.hours}</div>
        <div class="stat-label">Hours</div>
      </div>
    </div>
  </div>
</div>

<style>
  .stat-card {
    text-align: center;
    padding: 2rem;
    background: linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(134, 226, 147, 0.05));
    border: 2px solid rgba(16, 185, 129, 0.3);
    border-radius: 1.5rem;
    backdrop-filter: blur(10px);
    opacity: 0;
    transform: translateY(30px) scale(0.9);
    transition: all 0.3s ease;
  }
  
  .stat-card.visible {
    animation: fadeInScale 0.8s ease-out forwards;
  }
  
  .stat-card:hover {
    transform: translateY(-10px) scale(1.05);
    border-color: rgba(16, 185, 129, 0.6);
    box-shadow: 0 20px 40px rgba(16, 185, 129, 0.3);
  }
  
  @keyframes fadeInScale {
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }
  
  .stat-number {
    font-size: 3.5rem;
    font-weight: bold;
    background: linear-gradient(135deg, #10b981, #86e293);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    font-family: 'Space Grotesk', sans-serif;
    margin-bottom: 0.5rem;
    animation: glow-pulse 3s ease-in-out infinite;
  }
  
  @keyframes glow-pulse {
    0%, 100% {
      filter: drop-shadow(0 0 10px rgba(16, 185, 129, 0.5));
    }
    50% {
      filter: drop-shadow(0 0 20px rgba(16, 185, 129, 0.8));
    }
  }
  
  .stat-label {
    font-size: 1.25rem;
    color: #86e293;
    font-family: 'Inter', sans-serif;
    text-transform: uppercase;
    letter-spacing: 0.1em;
  }
</style>
