<script>
  let cardRef;
  let isHovering = false;
  
  function handleMouseMove(e) {
    if (!cardRef || !isHovering) return;
    
    const rect = cardRef.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;
    
    cardRef.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
  }
  
  function handleMouseEnter() {
    isHovering = true;
  }
  
  function handleMouseLeave() {
    isHovering = false;
    if (cardRef) {
      cardRef.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
    }
  }
</script>

<div class="relative py-20">
  <div class="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900"></div>
  
  <div class="relative z-10 mx-auto max-w-7xl px-4 sm:px-8">
    <h2 class="mb-12 text-center text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400 drop-shadow-lg">
      Featured Project
    </h2>
    
    <div
      bind:this={cardRef}
      on:mousemove={handleMouseMove}
      on:mouseenter={handleMouseEnter}
      on:mouseleave={handleMouseLeave}
      role="presentation"
      class="relative mx-auto max-w-5xl transition-all duration-300 ease-out"
      style="transform-style: preserve-3d;"
    >
      <div class="absolute -inset-1 rounded-3xl bg-gradient-to-r from-emerald-500 via-green-500 to-cyan-500 opacity-75 blur-2xl"></div>
      
      <a
        target="_blank"
        href="https://cam-hack-2025.devpost.com"
        class="relative block overflow-hidden rounded-3xl border-2 border-emerald-500/50 bg-slate-900/90 backdrop-blur-xl transition-all duration-300 hover:border-emerald-400"
      >
        <div class="p-8">
          <h3 class="mb-6 text-4xl font-bold text-emerald-300 drop-shadow-lg">
            Unintended Behaviour
          </h3>
          
          <div class="relative overflow-hidden rounded-2xl border border-emerald-500/30">
            <div class="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent"></div>
            <img
              src="/unintended.png"
              alt="Unintended Behaviour"
              class="w-full transition-transform duration-500 hover:scale-105"
            />
          </div>
          
          <div class="mt-6 flex items-center justify-between">
            <span class="text-lg font-semibold text-emerald-400">
              View on Devpost
            </span>
            <svg class="h-6 w-6 text-emerald-400 transition-transform group-hover:translate-x-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
            </svg>
          </div>
        </div>
      </a>
    </div>
  </div>
</div>
