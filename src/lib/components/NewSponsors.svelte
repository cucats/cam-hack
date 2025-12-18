<script>
  import { sponsors } from './sponsors-data.js';
  import { onMount } from 'svelte';
  
  let visible = false;
  
  onMount(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          visible = true;
        }
      });
    }, { threshold: 0.1 });
    
    const element = document.getElementById('sponsors-section');
    if (element) observer.observe(element);
    
    return () => observer.disconnect();
  });
</script>

<div id="sponsors-section" class="relative py-32 px-4">
  <div class="max-w-7xl mx-auto">
    <div class="text-center mb-20">
      <h2 class="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-green-500 mb-4">
        Sponsors
      </h2>
      <div class="w-32 h-1 bg-gradient-to-r from-transparent via-emerald-500 to-transparent mx-auto mb-8"></div>
      <p class="text-2xl text-emerald-300 font-light">
        Lorem ipsum dolor sit amet consectetur
      </p>
    </div>
    
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {#each sponsors as sponsor, i}
        <a
          href={sponsor.url}
          target="_blank"
          class="sponsor-card"
          class:visible={visible}
          style="animation-delay: {i * 0.1}s"
        >
          <div class="relative group h-full">
            <div class="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-green-500 rounded-2xl blur opacity-0 group-hover:opacity-75 transition duration-500"></div>
            
            <div class="relative h-full bg-gradient-to-br from-emerald-950/80 to-green-950/80 backdrop-blur-xl rounded-2xl border border-emerald-500/30 p-8 flex items-center justify-center transition-all duration-500 group-hover:scale-105 group-hover:border-emerald-500/60">
              <img
                src={sponsor.logo}
                alt={sponsor.name}
                class="max-w-full h-auto max-h-24 object-contain filter brightness-100 group-hover:brightness-110 transition-all duration-300"
              />
            </div>
          </div>
        </a>
      {/each}
    </div>
  </div>
</div>

<style>
  .sponsor-card {
    opacity: 0;
    transform: translateY(30px) rotateX(20deg);
    perspective: 1000px;
  }
  
  .sponsor-card.visible {
    animation: fadeInUp 0.8s ease-out forwards;
  }
  
  @keyframes fadeInUp {
    to {
      opacity: 1;
      transform: translateY(0) rotateX(0deg);
    }
  }
  
  .sponsor-card:hover {
    animation: float-subtle 3s ease-in-out infinite;
  }
  
  @keyframes float-subtle {
    0%, 100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-10px);
    }
  }
</style>
