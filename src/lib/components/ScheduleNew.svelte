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
    
    const section = document.querySelector('#schedule');
    if (section) {
      observer.observe(section);
    }
    
    return () => observer.disconnect();
  });
  
  const saturday = [
    { time: "09:30", event: "Breakfast", isFood: true },
    { time: "10:00", event: "Opening Ceremony", isFood: false },
    { time: "10:30", event: "Hacking begins!", isFood: false },
    { time: "13:00", event: "Lunch", isFood: true },
    { time: "18:00", event: "Dinner", isFood: true }
  ];
  
  const sunday = [
    { time: "09:30", event: "Breakfast", isFood: true },
    { time: "13:00", event: "Lunch", isFood: true },
    { time: "16:30", event: "Hacking ends!", isFood: false },
    { time: "17:00", event: "Dinner", isFood: true },
    { time: "18:00", event: "Judging ends", isFood: false },
    { time: "18:30", event: "Closing ceremony", isFood: false }
  ];
</script>

<div id="schedule" class="relative py-20">
  <div class="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-800/50 to-slate-900"></div>
  
  <div class="relative z-10 mx-auto max-w-7xl px-4 sm:px-8">
    <h2 class="mb-12 text-center text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400 drop-shadow-lg">
      Schedule
    </h2>
    
    <div class="grid gap-8 md:grid-cols-2">
      <div
        style="animation-delay: 0.2s; opacity: {visible ? 1 : 0};"
        class:animate-slide-in={visible}
      >
        <h4 class="mb-6 text-2xl font-bold text-emerald-300">
          Saturday 1st November
        </h4>
        <div class="space-y-3">
          {#each saturday as item}
            <div class="group flex items-center gap-4 rounded-xl border border-emerald-500/20 bg-slate-900/50 p-4 backdrop-blur-sm transition-all hover:border-emerald-400/50 hover:bg-slate-800/50">
              <span class="text-2xl font-bold text-emerald-400">
                {item.time}
              </span>
              <span class="h-8 w-px bg-emerald-500/30"></span>
              <span class="text-lg {item.isFood ? 'italic text-cyan-300' : 'text-slate-200'}">
                {item.event}
              </span>
            </div>
          {/each}
        </div>
      </div>
      
      <div
        style="animation-delay: 0.4s; opacity: {visible ? 1 : 0};"
        class:animate-slide-in={visible}
      >
        <h4 class="mb-6 text-2xl font-bold text-emerald-300">
          Sunday 2nd November
        </h4>
        <div class="space-y-3">
          {#each sunday as item}
            <div class="group flex items-center gap-4 rounded-xl border border-emerald-500/20 bg-slate-900/50 p-4 backdrop-blur-sm transition-all hover:border-emerald-400/50 hover:bg-slate-800/50">
              <span class="text-2xl font-bold text-emerald-400">
                {item.time}
              </span>
              <span class="h-8 w-px bg-emerald-500/30"></span>
              <span class="text-lg {item.isFood ? 'italic text-cyan-300' : 'text-slate-200'}">
                {item.event}
              </span>
            </div>
          {/each}
        </div>
      </div>
    </div>
  </div>
</div>
