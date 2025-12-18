<script>
  import { onMount } from 'svelte';
  
  let isHovered = false;
  let particles = [];
  
  onMount(() => {
    for (let i = 0; i < 20; i++) {
      particles.push({
        id: i,
        size: Math.random() * 4 + 2,
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: Math.random() * 5,
        duration: Math.random() * 10 + 10
      });
    }
    particles = particles;
  });
</script>

<div class="relative py-32 px-4 overflow-hidden">
  <div class="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-950/50 to-transparent"></div>
  
  <div class="floating-particles">
    {#each particles as particle}
      <div 
        class="particle"
        style="
          width: {particle.size}px;
          height: {particle.size}px;
          left: {particle.x}%;
          top: {particle.y}%;
          animation-delay: {particle.delay}s;
          animation-duration: {particle.duration}s;
        "
      ></div>
    {/each}
  </div>
  
  <div class="max-w-7xl mx-auto relative z-10">
    <div class="text-center mb-16">
      <h2 class="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-green-500 mb-4 title-glow">
        Featured Project
      </h2>
      <div class="w-32 h-1 bg-gradient-to-r from-transparent via-emerald-500 to-transparent mx-auto line-expand"></div>
    </div>
    
    <a 
      href="https://cam-hack-2025.devpost.com"
      target="_blank"
      class="block"
      on:mouseenter={() => isHovered = true}
      on:mouseleave={() => isHovered = false}
    >
      <div class="relative group">
        <div class="absolute -inset-1 bg-gradient-to-r from-emerald-500 via-green-500 to-emerald-500 rounded-3xl blur-xl opacity-50 group-hover:opacity-100 transition duration-1000 group-hover:duration-300 animate-gradient"></div>
        
        <div class="relative">
          <div class="absolute inset-0 bg-gradient-to-br from-emerald-950/90 to-green-950/90 rounded-3xl backdrop-blur-xl border border-emerald-500/30 group-hover:border-emerald-500/60 transition-colors duration-500"></div>
          
          <div class="absolute inset-0 rounded-3xl overflow-hidden">
            <div class="scan-line"></div>
          </div>
          
          <div class="relative p-8 md:p-12">
            <div class="flex flex-col md:flex-row gap-8 items-center">
              <div class="flex-1 space-y-6">
                <h3 class="text-4xl md:text-5xl font-bold text-emerald-300 group-hover:text-emerald-200 transition-colors duration-300">
                  Unintended Behaviour
                </h3>
                
                <div class="space-y-4 text-emerald-200 text-lg">
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                  <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                </div>
                
                <div class="flex flex-wrap gap-3">
                  <span class="tag-badge">
                    Winner
                  </span>
                  <span class="tag-badge">
                    AI/ML
                  </span>
                  <span class="tag-badge">
                    Innovation
                  </span>
                </div>
              </div>
              
              <div class="flex-1">
                <div class="relative overflow-hidden rounded-2xl shadow-2xl shadow-emerald-500/20 transform transition-transform duration-500 group-hover:scale-105 group-hover:rotate-1 image-container">
                  <div class="absolute inset-0 border-2 border-emerald-500/50 rounded-2xl animate-border-rotation"></div>
                  <img
                    src="/unintended.png"
                    alt="Unintended Behaviour"
                    class="w-full h-auto transition-transform duration-700 group-hover:scale-110"
                  />
                  <div class="absolute inset-0 bg-gradient-to-t from-emerald-950/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </a>
  </div>
</div>

<style>
  .floating-particles {
    position: absolute;
    inset: 0;
    pointer-events: none;
  }
  
  .particle {
    position: absolute;
    background: radial-gradient(circle, #10b981, transparent);
    border-radius: 50%;
    opacity: 0;
    animation: float-particle linear infinite;
  }
  
  @keyframes float-particle {
    0% {
      transform: translateY(0) translateX(0);
      opacity: 0;
    }
    10% {
      opacity: 0.5;
    }
    90% {
      opacity: 0.5;
    }
    100% {
      transform: translateY(-100vh) translateX(20px);
      opacity: 0;
    }
  }
  
  .title-glow {
    animation: title-glow 3s ease-in-out infinite;
  }
  
  @keyframes title-glow {
    0%, 100% {
      filter: drop-shadow(0 0 10px rgba(16, 185, 129, 0.5));
    }
    50% {
      filter: drop-shadow(0 0 30px rgba(16, 185, 129, 0.8));
    }
  }
  
  .line-expand {
    animation: line-expand 2s ease-out infinite;
  }
  
  @keyframes line-expand {
    0%, 100% {
      transform: scaleX(1);
    }
    50% {
      transform: scaleX(1.5);
    }
  }
  
  .scan-line {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      to bottom,
      transparent 0%,
      rgba(16, 185, 129, 0.1) 50%,
      transparent 100%
    );
    height: 100px;
    animation: scan 4s linear infinite;
    opacity: 0;
  }
  
  .group:hover .scan-line {
    opacity: 1;
  }
  
  @keyframes scan {
    0% {
      transform: translateY(-100%);
    }
    100% {
      transform: translateY(calc(100vh + 100%));
    }
  }
  
  .tag-badge {
    position: relative;
    display: inline-block;
    padding: 0.5rem 1rem;
    border-radius: 9999px;
    background: rgba(16, 185, 129, 0.2);
    color: rgb(110, 231, 183);
    font-size: 0.875rem;
    font-weight: 600;
    border: 1px solid rgba(16, 185, 129, 0.3);
    transition: all 0.3s ease;
  }
  
  .tag-badge:hover {
    background: rgba(16, 185, 129, 0.3);
    border-color: rgba(16, 185, 129, 0.5);
    transform: translateY(-2px);
    box-shadow: 0 4px 10px rgba(16, 185, 129, 0.3);
  }
  
  .image-container {
    position: relative;
  }
  
  .animate-border-rotation {
    animation: border-rotation 4s linear infinite;
    pointer-events: none;
  }
  
  @keyframes border-rotation {
    0% {
      filter: hue-rotate(0deg);
    }
    100% {
      filter: hue-rotate(360deg);
    }
  }
  
  @keyframes gradient {
    0%, 100% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
  }
  
  .animate-gradient {
    background-size: 200% 200%;
    animation: gradient 3s ease infinite;
  }
</style>
