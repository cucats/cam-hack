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
    
    const section = document.querySelector('#about');
    if (section) {
      observer.observe(section);
    }
    
    return () => observer.disconnect();
  });
</script>

<div id="about" class="relative py-20">
  <div class="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900"></div>
  
  <div class="relative z-10 mx-auto max-w-7xl px-4 sm:px-8">
    <h2 class="mb-12 text-center text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400 drop-shadow-lg">
      About
    </h2>
    
    <div class="space-y-6">
      <div
        class="rounded-2xl border border-emerald-500/30 bg-slate-900/50 p-8 backdrop-blur-sm transition-all duration-500 hover:border-emerald-400/50 hover:shadow-2xl hover:shadow-emerald-500/20"
        style="animation-delay: 0.2s; opacity: {visible ? 1 : 0};"
        class:animate-slide-in={visible}
      >
        <p class="text-xl leading-relaxed text-slate-200">
          Cam Hack is a 2 day hackathon for the innovative minds at the University of
          Cambridge. Over an action-packed weekend, students come together to design
          and build technology projects from the ground up. We welcome participants
          ranging from curious beginners to seasoned coders. Expect plenty of free
          stash, food, and mini-events throughout this hackathon.
        </p>
      </div>
      
      <div
        class="rounded-2xl border border-emerald-500/30 bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 p-8 backdrop-blur-sm transition-all duration-500 hover:border-emerald-400/50 hover:shadow-2xl hover:shadow-emerald-500/20"
        style="animation-delay: 0.4s; opacity: {visible ? 1 : 0};"
        class:animate-slide-in={visible}
      >
        <p class="text-xl font-semibold leading-relaxed text-emerald-200">
          For the winning team, each person will receive £200 and can choose from a
          range of prizes including: smartwatches, Steam vouchers, Amazon vouchers, or
          Sony XM4 headphones.
        </p>
      </div>
    </div>
  </div>
</div>
