<script>
  import { onMount } from 'svelte';
  import { sponsors, organizers } from "./sponsors-data.js";
  
  let visible = false;
  
  onMount(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          visible = true;
        }
      });
    }, { threshold: 0.1 });
    
    const section = document.querySelector('#sponsors');
    if (section) {
      observer.observe(section);
    }
    
    return () => observer.disconnect();
  });
</script>

<div id="sponsors" class="relative py-20">
  <div class="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-800/50 to-slate-900"></div>
  
  <div class="relative z-10 mx-auto max-w-7xl px-4 sm:px-8">
    <h3 class="mb-16 text-center text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400 drop-shadow-lg">
      Sponsored by
    </h3>
    
    <div class="mb-16 grid grid-cols-2 gap-8 place-items-center sm:grid-cols-3 lg:grid-cols-4">
      {#each sponsors as sponsor, i}
        <a
          class="group relative inline-block transition-all duration-300 hover:scale-110"
          target="_blank"
          href={sponsor.url}
          style="animation-delay: {i * 0.1}s; opacity: {visible ? 1 : 0};"
          class:animate-slide-in={visible}
        >
          <div class="absolute -inset-4 rounded-2xl bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 opacity-0 blur-xl transition-opacity group-hover:opacity-100"></div>
          <div class="relative rounded-2xl border border-emerald-500/20 bg-slate-900/50 p-6 backdrop-blur-sm transition-all group-hover:border-emerald-400/50">
            <img
              class="inline-block h-auto align-middle brightness-0 invert transition-all group-hover:brightness-100 group-hover:invert-0 {sponsor.className}"
              src={sponsor.logo}
              alt={sponsor.name}
            />
          </div>
        </a>
      {/each}
    </div>
    
    <div class="text-center">
      <div class="inline-block">
        <h3 class="mb-6 text-3xl font-bold text-emerald-300">
          {organizers.runBy.title}
        </h3>
        <a
          target="_blank"
          href={organizers.runBy.url}
          class="group relative inline-block transition-all duration-300 hover:scale-110"
        >
          <div class="absolute -inset-4 rounded-2xl bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 opacity-0 blur-xl transition-opacity group-hover:opacity-100"></div>
          <div class="relative rounded-2xl border border-emerald-500/20 bg-slate-900/50 p-8 backdrop-blur-sm transition-all group-hover:border-emerald-400/50">
            <img
              class="inline-block h-auto align-middle {organizers.runBy.className}"
              src={organizers.runBy.logo}
              alt={organizers.runBy.name}
            />
          </div>
        </a>
      </div>
    </div>
  </div>
</div>
