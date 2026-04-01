<script>
  import { onMount } from "svelte";

  let sectionRef;
  let isVisible = $state(false);

  const saturday = [
    { time: "09:30", event: "Breakfast", isFood: true },
    { time: "10:00", event: "Opening Ceremony", isFood: false },
    {
      time: "10:30",
      event: "Hacking begins!",
      isFood: false,
      isHighlight: true,
    },
    { time: "13:00", event: "Lunch", isFood: true },
    { time: "18:00", event: "Dinner", isFood: true },
  ];

  const sunday = [
    { time: "09:30", event: "Breakfast", isFood: true },
    { time: "13:00", event: "Lunch", isFood: true },
    { time: "16:30", event: "Hacking ends!", isFood: false, isHighlight: true },
    { time: "17:00", event: "Dinner", isFood: true },
    { time: "18:00", event: "Judging ends", isFood: false },
    {
      time: "18:30",
      event: "Closing ceremony",
      isFood: false,
      isHighlight: true,
    },
  ];

  onMount(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            isVisible = true;
          }
        });
      },
      { threshold: 0.1 },
    );

    observer.observe(sectionRef);

    return () => observer.disconnect();
  });
</script>

<div bind:this={sectionRef} class="relative mx-auto max-w-6xl">
  <div
    class="{isVisible
      ? 'translate-y-0 opacity-100'
      : 'translate-y-10 opacity-0'} transition-all duration-700"
  >
    <h2 class="text-center">
      <span class="gradient-text">&#123;</span>
      <span class="text-white">Schedule</span>
      <span class="gradient-text">&#125;</span>
    </h2>
  </div>

  <div class="relative grid gap-8 md:grid-cols-2">
    <div
      class="from-cyber-green/50 via-cyber-cyan/50 to-cyber-green/50 absolute top-0 bottom-0 left-1/2 hidden w-px bg-gradient-to-b md:block"
    ></div>

    <div
      class="cyber-card rounded-2xl p-8 {isVisible
        ? 'translate-x-0 opacity-100'
        : '-translate-x-10 opacity-0'} transition-all delay-200 duration-700"
    >
      <h3 class="text-cyber-green flex items-center gap-3">
        <span class="bg-cyber-green h-3 w-3 animate-pulse rounded-full"></span>
        Saturday 1st November
      </h3>

      <div class="mt-6 space-y-4">
        {#each saturday as item, i}
          <div
            class="hover:bg-cyber-green/5 hover:border-cyber-green/20 flex items-center gap-4 rounded-xl border border-transparent p-4 transition-all duration-500 {isVisible
              ? 'translate-x-0 opacity-100'
              : '-translate-x-5 opacity-0'}"
            style="transition-delay: {300 + i * 100}ms"
          >
            <div class="text-cyber-cyan w-16 font-mono text-lg font-bold">
              {item.time}
            </div>
            <div
              class="via-cyber-green/50 h-8 w-px bg-gradient-to-b from-transparent to-transparent"
            ></div>
            <div class="flex-1">
              <span
                class="{item.isHighlight
                  ? 'text-cyber-green font-semibold'
                  : ''} {item.isFood ? 'text-gray-400 italic' : 'text-white'}"
              >
                {item.event}
              </span>
            </div>
            {#if item.isFood}
              <span class="text-xl">🍕</span>
            {/if}
            {#if item.isHighlight}
              <span class="text-xl">🚀</span>
            {/if}
          </div>
        {/each}
      </div>
    </div>

    <div
      class="cyber-card rounded-2xl p-8 {isVisible
        ? 'translate-x-0 opacity-100'
        : 'translate-x-10 opacity-0'} transition-all delay-400 duration-700"
    >
      <h3 class="text-cyber-cyan flex items-center gap-3">
        <span class="bg-cyber-cyan h-3 w-3 animate-pulse rounded-full"></span>
        Sunday 2nd November
      </h3>

      <div class="mt-6 space-y-4">
        {#each sunday as item, i}
          <div
            class="hover:bg-cyber-cyan/5 hover:border-cyber-cyan/20 flex items-center gap-4 rounded-xl border border-transparent p-4 transition-all duration-500 {isVisible
              ? 'translate-x-0 opacity-100'
              : 'translate-x-5 opacity-0'}"
            style="transition-delay: {500 + i * 100}ms"
          >
            <div class="text-cyber-green w-16 font-mono text-lg font-bold">
              {item.time}
            </div>
            <div
              class="via-cyber-cyan/50 h-8 w-px bg-gradient-to-b from-transparent to-transparent"
            ></div>
            <div class="flex-1">
              <span
                class="{item.isHighlight
                  ? 'text-cyber-cyan font-semibold'
                  : ''} {item.isFood ? 'text-gray-400 italic' : 'text-white'}"
              >
                {item.event}
              </span>
            </div>
            {#if item.isFood}
              <span class="text-xl">🍕</span>
            {/if}
            {#if item.isHighlight}
              <span class="text-xl">🏆</span>
            {/if}
          </div>
        {/each}
      </div>
    </div>
  </div>
</div>
