<script>
  import { onMount } from "svelte";

  let visible = $state(false);
  let sectionRef;

  const saturday = [
    { time: "09:30", event: "Breakfast", isFood: true },
    { time: "10:00", event: "Opening Ceremony", isFood: false },
    { time: "10:30", event: "Hacking begins!", isFood: false },
    { time: "13:00", event: "Lunch", isFood: true },
    { time: "18:00", event: "Dinner", isFood: true },
  ];

  const sunday = [
    { time: "09:30", event: "Breakfast", isFood: true },
    { time: "13:00", event: "Lunch", isFood: true },
    { time: "16:30", event: "Hacking ends!", isFood: false },
    { time: "17:00", event: "Dinner", isFood: true },
    { time: "18:00", event: "Judging ends", isFood: false },
    { time: "18:30", event: "Closing ceremony", isFood: false },
  ];

  onMount(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            visible = true;
          }
        });
      },
      { threshold: 0.1 },
    );

    if (sectionRef) {
      observer.observe(sectionRef);
    }

    return () => observer.disconnect();
  });
</script>

<div bind:this={sectionRef} class="section-darker relative py-24">
  <div class="relative z-10 mx-auto max-w-7xl px-4 sm:px-8">
    <div class="mb-12 text-center">
      <h2
        class="font-display mb-4 text-4xl font-bold sm:text-5xl {visible
          ? 'animate-slide-up'
          : 'opacity-0'}"
      >
        <span class="gradient-text text-glow">Schedule</span>
      </h2>
      <div
        class="neon-line mx-auto w-24 {visible
          ? 'animate-scale-in delay-200'
          : 'opacity-0'}"
      ></div>
    </div>

    <div class="grid gap-8 lg:grid-cols-2">
      <div
        class="glass neon-border rounded-2xl p-8 {visible
          ? 'animate-slide-left delay-300'
          : 'opacity-0'}"
      >
        <div class="mb-6 flex items-center gap-3">
          <div class="h-3 w-3 animate-pulse rounded-full bg-emerald-400"></div>
          <h3 class="font-display text-2xl font-bold text-white">
            Saturday 1st November
          </h3>
        </div>
        <div class="space-y-4">
          {#each saturday as item, i}
            <div
              class="group flex items-center gap-4 rounded-xl p-3 transition-all hover:bg-white/5"
            >
              <div class="font-display w-16 text-lg font-bold text-emerald-400">
                {item.time}
              </div>
              <div
                class="h-px flex-1 bg-gradient-to-r from-emerald-500/50 to-transparent"
              ></div>
              <div
                class="flex items-center gap-2 text-gray-300 transition-colors group-hover:text-white"
              >
                {#if item.isFood}
                  <span class="text-lg">🍽️</span>
                {/if}
                <span class={item.isFood ? "italic" : ""}>{item.event}</span>
              </div>
            </div>
          {/each}
        </div>
      </div>

      <div
        class="glass neon-border rounded-2xl p-8 {visible
          ? 'animate-slide-right delay-400'
          : 'opacity-0'}"
      >
        <div class="mb-6 flex items-center gap-3">
          <div class="h-3 w-3 animate-pulse rounded-full bg-teal-400"></div>
          <h3 class="font-display text-2xl font-bold text-white">
            Sunday 2nd November
          </h3>
        </div>
        <div class="space-y-4">
          {#each sunday as item, i}
            <div
              class="group flex items-center gap-4 rounded-xl p-3 transition-all hover:bg-white/5"
            >
              <div class="font-display w-16 text-lg font-bold text-teal-400">
                {item.time}
              </div>
              <div
                class="h-px flex-1 bg-gradient-to-r from-teal-500/50 to-transparent"
              ></div>
              <div
                class="flex items-center gap-2 text-gray-300 transition-colors group-hover:text-white"
              >
                {#if item.isFood}
                  <span class="text-lg">🍽️</span>
                {/if}
                <span class={item.isFood ? "italic" : ""}>{item.event}</span>
              </div>
            </div>
          {/each}
        </div>
      </div>
    </div>
  </div>
</div>
