<script>
  import { onMount } from "svelte";

  let visible = $state(false);
  let sectionRef;

  onMount(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            visible = true;
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef) observer.observe(sectionRef);

    return () => observer.disconnect();
  });

  const day1 = [
    { time: "09:30", event: "Breakfast", highlight: false },
    { time: "10:00", event: "Opening Ceremony", highlight: true },
    { time: "10:30", event: "Hacking begins!", highlight: true },
    { time: "13:00", event: "Lunch", highlight: false },
    { time: "18:00", event: "Dinner", highlight: false },
  ];

  const day2 = [
    { time: "09:30", event: "Breakfast", highlight: false },
    { time: "13:00", event: "Lunch", highlight: false },
    { time: "16:30", event: "Hacking ends!", highlight: true },
    { time: "17:00", event: "Dinner", highlight: false },
    { time: "18:00", event: "Judging ends", highlight: true },
    { time: "18:30", event: "Closing ceremony", highlight: true },
  ];
</script>

<div bind:this={sectionRef} class="mx-auto max-w-7xl py-20">
  <h2 class="text-4xl sm:text-5xl md:text-6xl font-bold text-center mb-16">
    <span class="gradient-text">Schedule</span>
  </h2>

  <div class="grid md:grid-cols-2 gap-8">
    <div class="card" class:visible>
      <h3 class="text-2xl font-bold mb-6 neon-text-subtle">
        Saturday 1st November
      </h3>
      <div class="space-y-3">
        {#each day1 as item, i}
          <div
            class="flex items-center gap-4 p-3 rounded-lg transition-all duration-300 hover:bg-neon-green/5 schedule-item"
            style="animation-delay: {i * 0.1}s"
            class:visible
          >
            <span class="text-neon-green font-mono font-bold min-w-[60px]">
              {item.time}
            </span>
            <div class="w-2 h-2 rounded-full bg-neon-green" class:animate-pulse={item.highlight}></div>
            <span class="text-gray-300" class:text-white={item.highlight} class:font-bold={item.highlight}>
              {item.event}
            </span>
          </div>
        {/each}
      </div>
    </div>

    <div class="card" class:visible>
      <h3 class="text-2xl font-bold mb-6 neon-text-subtle">
        Sunday 2nd November
      </h3>
      <div class="space-y-3">
        {#each day2 as item, i}
          <div
            class="flex items-center gap-4 p-3 rounded-lg transition-all duration-300 hover:bg-neon-green/5 schedule-item"
            style="animation-delay: {(i + day1.length) * 0.1}s"
            class:visible
          >
            <span class="text-neon-green font-mono font-bold min-w-[60px]">
              {item.time}
            </span>
            <div class="w-2 h-2 rounded-full bg-neon-green" class:animate-pulse={item.highlight}></div>
            <span class="text-gray-300" class:text-white={item.highlight} class:font-bold={item.highlight}>
              {item.event}
            </span>
          </div>
        {/each}
      </div>
    </div>
  </div>
</div>

<style>
  .schedule-item {
    opacity: 0;
    transform: translateX(-20px);
  }

  .schedule-item.visible {
    animation: slide-in 0.5s ease-out forwards;
  }

  @keyframes slide-in {
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
</style>
