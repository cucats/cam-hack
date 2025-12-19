<script>
  import { onMount } from "svelte";

  let visible = $state(false);
  let sectionRef;
  let activeDay = $state(0);

  const schedule = [
    {
      day: "Saturday 1st November",
      events: [
        { time: "09:30", title: "Breakfast", type: "food" },
        { time: "10:00", title: "Opening Ceremony", type: "ceremony" },
        { time: "10:30", title: "Hacking begins!", type: "hack" },
        { time: "13:00", title: "Lunch", type: "food" },
        { time: "18:00", title: "Dinner", type: "food" },
      ],
    },
    {
      day: "Sunday 2nd November",
      events: [
        { time: "09:30", title: "Breakfast", type: "food" },
        { time: "13:00", title: "Lunch", type: "food" },
        { time: "16:30", title: "Hacking ends!", type: "hack" },
        { time: "17:00", title: "Dinner", type: "food" },
        { time: "18:00", title: "Judging ends", type: "ceremony" },
        { time: "18:30", title: "Closing ceremony", type: "ceremony" },
      ],
    },
  ];

  const typeColors = {
    food: "from-yellow-500/20 to-orange-500/20 border-yellow-500/30",
    ceremony: "from-purple-500/20 to-pink-500/20 border-purple-500/30",
    hack: "from-hack-green/20 to-cyan-500/20 border-hack-green/30",
  };

  const typeIcons = {
    food: "🍕",
    ceremony: "🎉",
    hack: "💻",
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
      { threshold: 0.2 },
    );

    if (sectionRef) {
      observer.observe(sectionRef);
    }

    return () => observer.disconnect();
  });
</script>

<div bind:this={sectionRef} class="relative overflow-hidden py-24 sm:py-32">
  <div class="absolute inset-0 opacity-30">
    <div
      class="bg-hack-green/10 absolute top-1/2 left-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
    ></div>
  </div>

  <div class="relative z-10 mx-auto max-w-7xl px-4 sm:px-8">
    <div class="mb-16 text-center" class:visible>
      <h2 class="section-title text-gradient mx-auto">Schedule</h2>
    </div>

    <div class="day-tabs mb-12 flex justify-center gap-4" class:visible>
      {#each schedule as daySchedule, index}
        <button
          class="tab-button rounded-xl px-6 py-3 font-semibold transition-all duration-300"
          class:active={activeDay === index}
          onclick={() => (activeDay = index)}
        >
          {index === 0 ? "Day 1" : "Day 2"}
        </button>
      {/each}
    </div>

    <div class="schedule-content" class:visible>
      <div class="mx-auto max-w-2xl">
        <h3 class="mb-8 text-center text-2xl font-semibold text-gray-200">
          {schedule[activeDay].day}
        </h3>

        <div class="timeline relative">
          <div
            class="from-hack-green absolute top-0 bottom-0 left-8 w-0.5 bg-gradient-to-b via-cyan-500 to-purple-500 sm:left-12"
          ></div>

          {#each schedule[activeDay].events as event, index}
            <div
              class="timeline-item relative mb-8 flex items-start gap-6 pl-20 sm:pl-28"
              style="animation-delay: {index * 0.1}s"
            >
              <div
                class="border-hack-green bg-hack-dark absolute left-6 flex h-5 w-5 items-center justify-center rounded-full border-2 sm:left-10"
              >
                <div class="bg-hack-green h-2 w-2 rounded-full"></div>
              </div>

              <div class="time-badge flex-shrink-0">
                <span class="text-hack-green font-mono text-lg font-bold"
                  >{event.time}</span
                >
              </div>

              <div
                class="event-card flex-1 rounded-xl border bg-gradient-to-r p-4 transition-all duration-300 hover:scale-[1.02] {typeColors[
                  event.type
                ]}"
              >
                <div class="flex items-center gap-3">
                  <span class="text-2xl">{typeIcons[event.type]}</span>
                  <span class="text-lg font-semibold text-gray-100"
                    >{event.title}</span
                  >
                </div>
              </div>
            </div>
          {/each}
        </div>
      </div>
    </div>
  </div>
</div>

<style>
  .section-title::after {
    left: 50%;
    transform: translateX(-50%);
  }

  div:has(.section-title),
  .day-tabs,
  .schedule-content {
    opacity: 0;
    transform: translateY(30px);
    transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
  }

  div.visible:has(.section-title),
  .visible.day-tabs,
  .visible.schedule-content {
    opacity: 1;
    transform: translateY(0);
  }

  .tab-button {
    background: rgba(255, 255, 255, 0.05);
    color: #9ca3af;
    border: 1px solid rgba(255, 255, 255, 0.1);
  }

  .tab-button:hover {
    background: rgba(255, 255, 255, 0.1);
    color: #e5e7eb;
  }

  .tab-button.active {
    background: linear-gradient(
      135deg,
      rgba(16, 185, 129, 0.2),
      rgba(6, 182, 212, 0.2)
    );
    color: #10b981;
    border-color: rgba(16, 185, 129, 0.5);
    box-shadow: 0 0 20px rgba(16, 185, 129, 0.2);
  }

  .timeline-item {
    animation: slideIn 0.5s ease-out forwards;
    opacity: 0;
  }

  .visible .timeline-item {
    animation: slideIn 0.5s ease-out forwards;
  }

  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateX(-20px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  .bg-hack-dark {
    background-color: #0a0a0f;
  }

  .text-hack-green {
    color: #10b981;
  }

  .border-hack-green {
    border-color: #10b981;
  }

  .bg-hack-green {
    background-color: #10b981;
  }

  .from-hack-green\/20 {
    --tw-gradient-from: rgba(16, 185, 129, 0.2);
  }

  .border-hack-green\/30 {
    border-color: rgba(16, 185, 129, 0.3);
  }
</style>
