<script>
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
    
    const element = document.getElementById('about-section');
    if (element) observer.observe(element);
    
    return () => observer.disconnect();
  });
</script>

<div id="about-section" class="relative py-32 px-4">
  <div class="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-950/30 to-transparent"></div>
  
  <div class="max-w-5xl mx-auto relative z-10">
    <div 
      class="content-block"
      class:visible={visible}
    >
      <h2 class="text-5xl md:text-7xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-green-500 mb-12">
        About
      </h2>
      
      <div class="space-y-8">
        <div class="relative group">
          <div class="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-green-500 rounded-3xl blur-xl opacity-20 group-hover:opacity-40 transition duration-500"></div>
          <div class="relative bg-gradient-to-br from-emerald-950/70 to-green-950/70 backdrop-blur-xl rounded-3xl border border-emerald-500/30 p-8 md:p-12">
            <p class="text-xl md:text-2xl text-emerald-100 leading-relaxed">
              Cam Hack is a 2 day hackathon for the innovative minds at the University of Cambridge. Over an action-packed weekend, students come together to design and build technology projects from the ground up. We welcome participants ranging from curious beginners to seasoned coders. Expect plenty of free stash, food, and mini-events throughout this hackathon.
            </p>
          </div>
        </div>
        
        <div class="relative group">
          <div class="absolute -inset-1 bg-gradient-to-r from-green-500 to-emerald-500 rounded-3xl blur-xl opacity-20 group-hover:opacity-40 transition duration-500"></div>
          <div class="relative bg-gradient-to-br from-green-950/70 to-emerald-950/70 backdrop-blur-xl rounded-3xl border border-emerald-500/30 p-8 md:p-12">
            <p class="text-xl md:text-2xl text-emerald-100 leading-relaxed">
              For the winning team, each person will receive £200 and can choose from a range of prizes including: smartwatches, Steam vouchers, Amazon vouchers, or Sony XM4 headphones.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<style>
  .content-block {
    opacity: 0;
    transform: translateY(50px) scale(0.95);
  }
  
  .content-block.visible {
    animation: fadeInUp 1s ease-out forwards;
  }
  
  @keyframes fadeInUp {
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }
  
  .content-block > div {
    position: relative;
    overflow: hidden;
  }
  
  .content-block > div::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
      135deg,
      transparent 0%,
      rgba(16, 185, 129, 0.1) 50%,
      transparent 100%
    );
    transform: translateX(-100%) rotate(45deg);
    transition: transform 0.6s ease;
  }
  
  .content-block > div:hover::before {
    transform: translateX(100%) rotate(45deg);
  }
</style>
