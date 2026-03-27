<script>
  import { onMount } from 'svelte';

  let visible = $state(false);
  let sectionEl;

  const saturdayEvents = [
    { time: '09:30', event: 'Breakfast', isFood: true },
    { time: '10:00', event: 'Opening Ceremony', isFood: false },
    { time: '10:30', event: 'Hacking begins!', isFood: false },
    { time: '13:00', event: 'Lunch', isFood: true },
    { time: '18:00', event: 'Dinner', isFood: true },
  ];

  const sundayEvents = [
    { time: '09:30', event: 'Breakfast', isFood: true },
    { time: '13:00', event: 'Lunch', isFood: true },
    { time: '16:30', event: 'Hacking ends!', isFood: false },
    { time: '17:00', event: 'Dinner', isFood: true },
    { time: '18:00', event: 'Judging ends', isFood: false },
    { time: '18:30', event: 'Closing ceremony', isFood: false },
  ];

  onMount(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) visible = true;
        });
      },
      { threshold: 0.2 }
    );
    if (sectionEl) observer.observe(sectionEl);
    return () => observer.disconnect();
  });
</script>

<section id="schedule" bind:this={sectionEl} class="relative py-24 px-4 sm:px-8">
  <div class="max-w-6xl mx-auto">
    <div class="text-center mb-16 opacity-0 {visible ? 'animate-slide-up' : ''}">
      <h2 class="font-display text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
        <span class="bg-gradient-to-r from-emerald-400 to-green-300 bg-clip-text text-transparent glow-text">
          Schedule
        </span>
      </h2>
      <div class="w-24 h-1 bg-gradient-to-r from-emerald-400 to-green-300 mx-auto rounded-full"></div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div class="glass-card p-8 opacity-0 {visible ? 'animate-slide-in-left delay-200' : ''}">
        <h3 class="font-display text-2xl sm:text-3xl font-bold text-emerald-300 mb-8 text-center">
          Saturday 1st November
        </h3>
        <div class="space-y-4">
          {#each saturdayEvents as event, i}
            <div
              class="flex items-center gap-4 p-4 rounded-xl bg-emerald-900/20 border border-emerald-500/20 transition-all duration-300 hover:border-emerald-500/40 hover:bg-emerald-900/30"
              style="animation-delay: {0.3 + i * 0.1}s"
            >
              <div class="w-20 shrink-0">
                <span class="font-mono text-lg text-emerald-400 font-bold">{event.time}</span>
              </div>
              <div class="w-px h-8 bg-emerald-500/30"></div>
              <span class="text-lg {event.isFood ? 'text-gray-400 italic' : 'text-gray-200'}">
                {event.event}
              </span>
            </div>
          {/each}
        </div>
      </div>

      <div class="glass-card p-8 opacity-0 {visible ? 'animate-slide-in-right delay-200' : ''}">
        <h3 class="font-display text-2xl sm:text-3xl font-bold text-emerald-300 mb-8 text-center">
          Sunday 2nd November
        </h3>
        <div class="space-y-4">
          {#each sundayEvents as event, i}
            <div
              class="flex items-center gap-4 p-4 rounded-xl bg-emerald-900/20 border border-emerald-500/20 transition-all duration-300 hover:border-emerald-500/40 hover:bg-emerald-900/30"
              style="animation-delay: {0.3 + i * 0.1}s"
            >
              <div class="w-20 shrink-0">
                <span class="font-mono text-lg text-emerald-400 font-bold">{event.time}</span>
              </div>
              <div class="w-px h-8 bg-emerald-500/30"></div>
              <span class="text-lg {event.isFood ? 'text-gray-400 italic' : 'text-gray-200'}">
                {event.event}
              </span>
            </div>
          {/each}
        </div>
      </div>
    </div>
  </div>
</section>
