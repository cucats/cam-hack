<script>
  import { onMount } from "svelte";

  let visible = $state(false);
  let sectionRef;
  let activeDay = $state(0);

  const schedule = [
    {
      day: "Saturday 1st November",
      events: [
        { time: "09:30", title: "Breakfast", type: "meal", icon: "🍳" },
        {
          time: "10:00",
          title: "Opening Ceremony",
          type: "ceremony",
          icon: "🎤",
        },
        {
          time: "10:30",
          title: "Hacking begins!",
          type: "hacking",
          icon: "💻",
        },
        { time: "13:00", title: "Lunch", type: "meal", icon: "🍕" },
        { time: "18:00", title: "Dinner", type: "meal", icon: "🍝" },
      ],
    },
    {
      day: "Sunday 2nd November",
      events: [
        { time: "09:30", title: "Breakfast", type: "meal", icon: "☕" },
        { time: "13:00", title: "Lunch", type: "meal", icon: "🍜" },
        { time: "16:30", title: "Hacking ends!", type: "hacking", icon: "🛑" },
        { time: "17:00", title: "Dinner", type: "meal", icon: "🍱" },
        { time: "18:00", title: "Judging ends", type: "judging", icon: "⚖️" },
        {
          time: "18:30",
          title: "Closing ceremony",
          type: "ceremony",
          icon: "🏆",
        },
      ],
    },
  ];

  const typeColors = {
    meal: "border-orange-500/50 bg-orange-500/10",
    ceremony: "border-purple-500/50 bg-purple-500/10",
    hacking: "border-emerald-500/50 bg-emerald-500/10",
    judging: "border-cyan-500/50 bg-cyan-500/10",
  };

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

<section id="schedule" class="section-padding relative" bind:this={sectionRef}>
  <div
    class="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/40"
  ></div>

  <div class="relative z-10 mx-auto max-w-5xl">
    <div
      class="mb-12 text-center {visible
        ? 'animate-slide-up opacity-0-initial'
        : 'opacity-0'}"
    >
      <h2 class="text-gradient mb-4">Schedule</h2>
    </div>

    <div
      class="mb-12 flex justify-center gap-4 {visible
        ? 'animate-slide-up stagger-1 opacity-0-initial'
        : 'opacity-0'}"
    >
      {#each schedule as day, i}
        <button
          class="rounded-xl px-6 py-3 font-semibold transition-all duration-300 {activeDay ===
          i
            ? 'glow-green bg-emerald-500 text-white'
            : 'border border-zinc-700 bg-zinc-800/50 text-zinc-400 hover:border-emerald-500/50 hover:text-white'}"
          onclick={() => (activeDay = i)}
        >
          {day.day.split(" ")[0]}
          {day.day.split(" ")[1]}
        </button>
      {/each}
    </div>

    <div class="relative">
      <div
        class="absolute top-0 bottom-0 left-4 w-px bg-gradient-to-b from-emerald-500 via-cyan-500 to-purple-500 sm:left-1/2"
      ></div>

      <div class="space-y-6">
        {#each schedule[activeDay].events as event, i}
          <div
            class="relative flex items-center gap-4 sm:gap-8 {i % 2 === 0
              ? 'sm:flex-row'
              : 'sm:flex-row-reverse'} {visible
              ? 'animate-fade-in opacity-0-initial'
              : 'opacity-0'}"
            style="animation-delay: {0.1 * i + 0.2}s;"
          >
            <div
              class="glow-green absolute left-4 z-10 h-4 w-4 -translate-x-1/2 rounded-full bg-emerald-500 sm:left-1/2"
            ></div>

            <div
              class="flex-1 {i % 2 === 0
                ? 'sm:pr-12 sm:text-right'
                : 'sm:pl-12 sm:text-left'} pl-12 sm:pl-0"
            >
              <div
                class="glass-card inline-block rounded-xl border p-4 {typeColors[
                  event.type
                ]} transition-all duration-300 hover:scale-105"
              >
                <div
                  class="flex items-center gap-3 {i % 2 === 0
                    ? 'sm:flex-row-reverse'
                    : ''}"
                >
                  <span class="text-2xl">{event.icon}</span>
                  <div class={i % 2 === 0 ? "sm:text-right" : ""}>
                    <div class="font-mono text-sm text-emerald-400">
                      {event.time}
                    </div>
                    <div class="font-semibold text-white">{event.title}</div>
                  </div>
                </div>
              </div>
            </div>

            <div class="hidden flex-1 sm:block"></div>
          </div>
        {/each}
      </div>
    </div>
  </div>
</section>
