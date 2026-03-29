<script>
  import { onMount } from "svelte";
  import gsap from "gsap";
  import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

  let sectionElement;

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
    gsap.registerPlugin(ScrollTrigger);

    gsap.fromTo(
      sectionElement.querySelector("h2"),
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        scrollTrigger: {
          trigger: sectionElement,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      },
    );

    const timelineItems = sectionElement.querySelectorAll(".timeline-item");
    timelineItems.forEach((item, index) => {
      gsap.fromTo(
        item,
        { x: index % 2 === 0 ? -50 : 50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.6,
          delay: index * 0.1,
          scrollTrigger: {
            trigger: sectionElement.querySelector(".timeline-container"),
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        },
      );
    });
  });
</script>

<section bind:this={sectionElement} class="relative py-24">
  <div class="mx-auto max-w-7xl px-4">
    <h2
      class="glow-text from-primary-400 to-accent-400 mb-12 bg-gradient-to-r bg-clip-text text-center text-transparent"
    >
      Schedule
    </h2>

    <div class="timeline-container grid gap-8 lg:grid-cols-2">
      <div class="glass-card">
        <h3 class="text-primary-400 mb-6 flex items-center gap-3">
          <div
            class="bg-primary-500/20 flex h-10 w-10 items-center justify-center rounded-full"
          >
            <span class="text-lg font-bold">1</span>
          </div>
          Saturday 1st November
        </h3>

        <div class="space-y-4">
          {#each saturday as item, index}
            <div
              class="timeline-item group flex items-center gap-4 rounded-xl p-3 transition-all duration-300 hover:bg-white/5"
            >
              <div class="relative">
                <div
                  class="flex h-12 w-12 items-center justify-center rounded-full {item.isFood
                    ? 'bg-accent-500/20 text-accent-400'
                    : 'bg-primary-500/20 text-primary-400'} font-mono text-sm font-bold"
                >
                  {item.time}
                </div>
                {#if index < saturday.length - 1}
                  <div
                    class="from-primary-500/50 absolute top-full left-1/2 h-4 w-px -translate-x-1/2 bg-gradient-to-b to-transparent"
                  ></div>
                {/if}
              </div>
              <div class="flex-1">
                <span
                  class="text-lg {item.isFood
                    ? 'text-dark-400 italic'
                    : 'text-dark-200'}">{item.event}</span
                >
              </div>
              {#if item.isFood}
                <span class="text-xl">🍕</span>
              {/if}
            </div>
          {/each}
        </div>
      </div>

      <div class="glass-card">
        <h3 class="text-accent-400 mb-6 flex items-center gap-3">
          <div
            class="bg-accent-500/20 flex h-10 w-10 items-center justify-center rounded-full"
          >
            <span class="text-lg font-bold">2</span>
          </div>
          Sunday 2nd November
        </h3>

        <div class="space-y-4">
          {#each sunday as item, index}
            <div
              class="timeline-item group flex items-center gap-4 rounded-xl p-3 transition-all duration-300 hover:bg-white/5"
            >
              <div class="relative">
                <div
                  class="flex h-12 w-12 items-center justify-center rounded-full {item.isFood
                    ? 'bg-accent-500/20 text-accent-400'
                    : 'bg-primary-500/20 text-primary-400'} font-mono text-sm font-bold"
                >
                  {item.time}
                </div>
                {#if index < sunday.length - 1}
                  <div
                    class="from-accent-500/50 absolute top-full left-1/2 h-4 w-px -translate-x-1/2 bg-gradient-to-b to-transparent"
                  ></div>
                {/if}
              </div>
              <div class="flex-1">
                <span
                  class="text-lg {item.isFood
                    ? 'text-dark-400 italic'
                    : 'text-dark-200'}">{item.event}</span
                >
              </div>
              {#if item.isFood}
                <span class="text-xl">🍕</span>
              {/if}
            </div>
          {/each}
        </div>
      </div>
    </div>
  </div>

  <div class="section-divider"></div>
</section>
