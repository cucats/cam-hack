<script>
  import { onMount } from 'svelte';
  import ScrollIndicator from './ScrollIndicator.svelte';
  
  let days = 0;
  let showContent = false;
  
  onMount(() => {
    const eventDate = new Date('2025-11-01T00:00:00');
    const today = new Date();
    const diffTime = Math.abs(today - eventDate);
    days = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    setTimeout(() => {
      showContent = true;
    }, 100);
  });
</script>

<div class="relative min-h-screen flex items-center justify-center px-4 py-20">
  <div class="absolute inset-0 overflow-hidden">
    <div class="glow-orb glow-orb-1"></div>
    <div class="glow-orb glow-orb-2"></div>
    <div class="glow-orb glow-orb-3"></div>
  </div>
  
  <div class="max-w-6xl w-full text-center space-y-12 relative z-10">
    <div 
      class="hero-title"
      class:fade-in={showContent}
    >
      <img
        src="/cam-hack-logo-text.png"
        alt="Cam Hack Logo"
        class="mx-auto w-64 h-64 md:w-80 md:h-80 drop-shadow-2xl floating logo-glow"
      />
    </div>
    
    <div 
      class="space-y-6"
      class:fade-in-delay-1={showContent}
    >
      <h1 class="text-6xl md:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-green-500 to-emerald-600 tracking-tight animate-gradient-text">
        Cam Hack 2025
      </h1>
      
      <h2 class="text-3xl md:text-5xl font-semibold text-emerald-300 pulse-glow">
        1st - 2nd November
      </h2>
    </div>
    
    <div 
      class="space-y-4"
      class:fade-in-delay-2={showContent}
    >
      <div class="inline-block px-8 py-6 rounded-3xl bg-emerald-950/80 backdrop-blur-md border-2 border-emerald-500/30 shadow-2xl shadow-emerald-500/20 counter-box">
        <div class="text-5xl md:text-7xl font-bold text-emerald-400 tabular-nums number-glow">
          {days}
        </div>
        <div class="text-xl md:text-2xl text-emerald-300 mt-2">
          Days Since Event
        </div>
      </div>
    </div>
    
    <div 
      class="flex flex-wrap gap-6 justify-center"
      class:fade-in-delay-3={showContent}
    >
      <a
        href="/discord"
        class="group relative px-8 py-5 text-xl font-semibold text-white rounded-2xl overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-emerald-500/50"
      >
        <div class="absolute inset-0 bg-gradient-to-r from-emerald-500 to-green-600"></div>
        <div class="absolute inset-0 bg-gradient-to-r from-emerald-400 to-green-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div class="absolute inset-0 shimmer"></div>
        <span class="relative z-10">Join Discord</span>
      </a>
      
      <a
        href="https://cam-hack-2025.devpost.com"
        target="_blank"
        class="group relative px-8 py-5 text-xl font-semibold rounded-2xl overflow-hidden transition-all duration-300 hover:scale-105"
      >
        <div class="absolute inset-0 bg-gradient-to-r from-emerald-950/80 to-green-950/80 backdrop-blur-md border-2 border-emerald-500/50"></div>
        <span class="relative z-10 text-emerald-300 group-hover:text-emerald-200">View Projects</span>
      </a>
    </div>
    
    <div 
      class="text-2xl md:text-3xl text-emerald-200 font-light"
      class:fade-in-delay-4={showContent}
    >
      What can you make in 2 days?
    </div>
  </div>
  
  <ScrollIndicator />
</div>

<style>
  .glow-orb {
    position: absolute;
    border-radius: 50%;
    filter: blur(100px);
    opacity: 0.3;
    animation: float-orb 10s ease-in-out infinite;
  }
  
  .glow-orb-1 {
    width: 400px;
    height: 400px;
    background: radial-gradient(circle, #10b981, transparent);
    top: -200px;
    left: -200px;
    animation-delay: 0s;
  }
  
  .glow-orb-2 {
    width: 500px;
    height: 500px;
    background: radial-gradient(circle, #0a4d2e, transparent);
    bottom: -250px;
    right: -250px;
    animation-delay: 3s;
  }
  
  .glow-orb-3 {
    width: 350px;
    height: 350px;
    background: radial-gradient(circle, #86e293, transparent);
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    animation-delay: 6s;
  }
  
  @keyframes float-orb {
    0%, 100% {
      transform: translate(0, 0);
    }
    25% {
      transform: translate(50px, 50px);
    }
    50% {
      transform: translate(-30px, 80px);
    }
    75% {
      transform: translate(30px, -50px);
    }
  }
  
  .floating {
    animation: float 6s ease-in-out infinite;
  }
  
  .logo-glow {
    filter: drop-shadow(0 0 30px rgba(16, 185, 129, 0.5));
  }
  
  @keyframes float {
    0%, 100% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(-20px);
    }
  }
  
  .animate-gradient-text {
    background-size: 200% 200%;
    animation: gradient 4s ease infinite;
  }
  
  @keyframes gradient {
    0%, 100% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
  }
  
  .pulse-glow {
    animation: pulse-glow 3s ease-in-out infinite;
  }
  
  @keyframes pulse-glow {
    0%, 100% {
      text-shadow: 0 0 10px rgba(16, 185, 129, 0.5);
    }
    50% {
      text-shadow: 0 0 30px rgba(16, 185, 129, 0.8);
    }
  }
  
  .counter-box {
    animation: pulse-border 3s ease-in-out infinite;
  }
  
  @keyframes pulse-border {
    0%, 100% {
      border-color: rgba(16, 185, 129, 0.3);
      box-shadow: 0 0 30px rgba(16, 185, 129, 0.2);
    }
    50% {
      border-color: rgba(16, 185, 129, 0.6);
      box-shadow: 0 0 50px rgba(16, 185, 129, 0.4);
    }
  }
  
  .number-glow {
    animation: number-glow 2s ease-in-out infinite;
  }
  
  @keyframes number-glow {
    0%, 100% {
      text-shadow: 0 0 20px rgba(16, 185, 129, 0.6);
    }
    50% {
      text-shadow: 0 0 40px rgba(16, 185, 129, 0.9);
    }
  }
  
  .shimmer {
    background: linear-gradient(
      90deg,
      transparent 0%,
      rgba(255, 255, 255, 0.3) 50%,
      transparent 100%
    );
    animation: shimmer 3s infinite;
  }
  
  @keyframes shimmer {
    0% {
      transform: translateX(-100%);
    }
    100% {
      transform: translateX(100%);
    }
  }
  
  .fade-in {
    animation: fadeIn 1s ease-out forwards;
  }
  
  .fade-in-delay-1 {
    opacity: 0;
    animation: fadeIn 1s ease-out 0.3s forwards;
  }
  
  .fade-in-delay-2 {
    opacity: 0;
    animation: fadeIn 1s ease-out 0.6s forwards;
  }
  
  .fade-in-delay-3 {
    opacity: 0;
    animation: fadeIn 1s ease-out 0.9s forwards;
  }
  
  .fade-in-delay-4 {
    opacity: 0;
    animation: fadeIn 1s ease-out 1.2s forwards;
  }
  
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
</style>
