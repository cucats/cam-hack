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
    
    const section = document.querySelector('#organisers');
    if (section) {
      observer.observe(section);
    }
    
    return () => observer.disconnect();
  });
  
  const organisers = [
    { name: "James Leung", image: "/james.png" },
    { name: "Uliana Ronska", image: "/uliana.jpg" },
    { name: "Athena Eng", image: "/athena.jpg" },
    { name: "Oliver Greenwood", image: "/oliver.png" },
    { name: "Jadon Mensah", image: "/jadon.png" }
  ];
</script>

<div id="organisers" class="relative py-20">
  <div class="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900"></div>
  
  <div class="relative z-10 mx-auto max-w-7xl px-4 sm:px-8">
    <h2 class="mb-12 text-center text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400 drop-shadow-lg">
      Organising Committee
    </h2>
    
    <div class="grid grid-cols-2 gap-8 sm:grid-cols-3 md:grid-cols-5">
      {#each organisers as organiser, i}
        <div
          class="group flex flex-col items-center transition-transform duration-300 hover:scale-110"
          style="animation-delay: {i * 0.1}s; opacity: {visible ? 1 : 0};"
          class:animate-slide-in={visible}
        >
          <div class="relative mb-4">
            <div class="absolute -inset-2 rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500 opacity-0 blur-xl transition-opacity group-hover:opacity-75"></div>
            <div class="relative overflow-hidden rounded-full border-4 border-emerald-500/30 transition-all group-hover:border-emerald-400">
              <img
                class="h-32 w-32 object-cover transition-transform duration-500 group-hover:scale-110"
                src={organiser.image}
                alt={organiser.name}
              />
            </div>
          </div>
          <p class="text-center text-lg font-semibold text-slate-200 transition-colors group-hover:text-emerald-300">
            {organiser.name}
          </p>
        </div>
      {/each}
    </div>
  </div>
</div>
