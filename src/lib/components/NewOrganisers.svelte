<script>
  import { onMount } from 'svelte';
  
  const organisers = [
    { name: 'James Leung', image: '/james.png' },
    { name: 'Uliana Ronska', image: '/uliana.jpg' },
    { name: 'Athena Eng', image: '/athena.jpg' },
    { name: 'Oliver Greenwood', image: '/oliver.png' },
    { name: 'Jadon Mensah', image: '/jadon.png' }
  ];
  
  let visible = false;
  
  onMount(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          visible = true;
        }
      });
    }, { threshold: 0.1 });
    
    const element = document.getElementById('organisers-section');
    if (element) observer.observe(element);
    
    return () => observer.disconnect();
  });
</script>

<div id="organisers-section" class="relative py-32 px-4">
  <div class="max-w-7xl mx-auto">
    <div class="text-center mb-20">
      <h2 class="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-green-500 mb-4">
        Organising Committee
      </h2>
      <div class="w-32 h-1 bg-gradient-to-r from-transparent via-emerald-500 to-transparent mx-auto"></div>
    </div>
    
    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 md:gap-12">
      {#each organisers as organiser, i}
        <div 
          class="organiser-card"
          class:visible={visible}
          style="animation-delay: {i * 0.15}s"
        >
          <div class="relative group">
            <div class="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-green-500 rounded-full blur-lg opacity-0 group-hover:opacity-75 transition duration-500"></div>
            
            <div class="relative">
              <div class="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-emerald-500/50 group-hover:border-emerald-400 transition-all duration-500 group-hover:scale-110 shadow-2xl shadow-emerald-500/30">
                <img
                  src={organiser.image}
                  alt={organiser.name}
                  class="w-full h-full object-cover"
                />
              </div>
              
              <div class="mt-4 text-center">
                <p class="text-lg md:text-xl font-semibold text-emerald-200 group-hover:text-emerald-100 transition-colors duration-300">
                  {organiser.name}
                </p>
              </div>
            </div>
          </div>
        </div>
      {/each}
    </div>
    
    <div class="mt-20 text-center">
      <div class="inline-block relative group">
        <div class="absolute -inset-2 bg-gradient-to-r from-emerald-500 to-green-500 rounded-2xl blur-lg opacity-20 group-hover:opacity-40 transition duration-500"></div>
        <div class="relative bg-gradient-to-br from-emerald-950/80 to-green-950/80 backdrop-blur-xl rounded-2xl border border-emerald-500/30 px-8 py-6">
          <p class="text-xl text-emerald-300 mb-4">Run by</p>
          <a href="https://cucats.org" target="_blank" class="block">
            <img
              src="/cucats-logo-gradient-full.png"
              alt="Cambridge University Computing and Technology Society"
              class="h-16 md:h-20 w-auto mx-auto filter brightness-100 group-hover:brightness-110 transition-all duration-300"
            />
          </a>
        </div>
      </div>
    </div>
  </div>
</div>

<style>
  .organiser-card {
    opacity: 0;
    transform: translateY(30px) scale(0.9) rotateY(20deg);
    perspective: 1000px;
  }
  
  .organiser-card.visible {
    animation: fadeInScale 0.8s ease-out forwards;
  }
  
  @keyframes fadeInScale {
    to {
      opacity: 1;
      transform: translateY(0) scale(1) rotateY(0deg);
    }
  }
  
  .organiser-card:hover {
    animation: tilt 2s ease-in-out infinite;
  }
  
  @keyframes tilt {
    0%, 100% {
      transform: rotateZ(0deg);
    }
    25% {
      transform: rotateZ(-2deg);
    }
    75% {
      transform: rotateZ(2deg);
    }
  }
</style>
