<script>
  import { onMount } from "svelte";

  let sectionRef;
  let isVisible = $state(false);

  onMount(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            isVisible = true;
          }
        });
      },
      { threshold: 0.2 },
    );

    observer.observe(sectionRef);

    return () => observer.disconnect();
  });
</script>

<div bind:this={sectionRef} class="relative mx-auto max-w-6xl">
  <div class="grid-overlay opacity-50"></div>

  <div class="relative z-10">
    <div
      class="{isVisible
        ? 'translate-y-0 opacity-100'
        : 'translate-y-10 opacity-0'} transition-all duration-700"
    >
      <h2 class="text-center">
        <span class="gradient-text">&#60;</span>
        <span class="text-white">About</span>
        <span class="gradient-text">/&#62;</span>
      </h2>
    </div>

    <div class="grid gap-8 md:grid-cols-2">
      <div
        class="cyber-card rounded-2xl p-8 {isVisible
          ? 'translate-x-0 opacity-100'
          : '-translate-x-10 opacity-0'} transition-all delay-200 duration-700"
      >
        <div class="mb-6 flex items-center gap-4">
          <div
            class="from-cyber-green/20 to-cyber-cyan/20 flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br"
          >
            <svg
              class="text-cyber-green h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
              ></path>
            </svg>
          </div>
          <h4 class="text-cyber-green mb-0">The Hackathon</h4>
        </div>
        <p class="text-lg">
          Cam Hack is a 2 day hackathon for the innovative minds at the
          University of Cambridge. Over an action-packed weekend, students come
          together to design and build technology projects from the ground up.
          We welcome participants ranging from curious beginners to seasoned
          coders. Expect plenty of free stash, food, and mini-events throughout
          this hackathon.
        </p>
      </div>

      <div
        class="cyber-card rounded-2xl p-8 {isVisible
          ? 'translate-x-0 opacity-100'
          : 'translate-x-10 opacity-0'} transition-all delay-400 duration-700"
      >
        <div class="mb-6 flex items-center gap-4">
          <div
            class="from-cyber-green/20 to-cyber-cyan/20 flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br"
          >
            <svg
              class="text-cyber-cyan h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
          </div>
          <h4 class="text-cyber-cyan mb-0">The Prizes</h4>
        </div>
        <p class="text-lg">
          For the winning team, each person will receive £200 and can choose
          from a range of prizes including: smartwatches, Steam vouchers, Amazon
          vouchers, or Sony XM4 headphones.
        </p>
        <div class="mt-6 flex flex-wrap gap-3">
          <span
            class="bg-cyber-green/10 border-cyber-green/30 text-cyber-green rounded-full border px-4 py-2 font-mono text-sm"
            >£200</span
          >
          <span
            class="bg-cyber-cyan/10 border-cyber-cyan/30 text-cyber-cyan rounded-full border px-4 py-2 font-mono text-sm"
            >Smartwatches</span
          >
          <span
            class="bg-cyber-green/10 border-cyber-green/30 text-cyber-green rounded-full border px-4 py-2 font-mono text-sm"
            >XM4</span
          >
        </div>
      </div>
    </div>

    <div
      class="mt-12 grid grid-cols-2 gap-6 md:grid-cols-4 {isVisible
        ? 'translate-y-0 opacity-100'
        : 'translate-y-10 opacity-0'} transition-all delay-600 duration-700"
    >
      <div class="cyber-card rounded-xl p-6 text-center">
        <div class="font-display gradient-text mb-2 text-4xl font-bold">2</div>
        <div class="text-sm tracking-wider text-gray-400 uppercase">Days</div>
      </div>
      <div class="cyber-card rounded-xl p-6 text-center">
        <div class="font-display gradient-text mb-2 text-4xl font-bold">5</div>
        <div class="text-sm tracking-wider text-gray-400 uppercase">
          Max Team
        </div>
      </div>
      <div class="cyber-card rounded-xl p-6 text-center">
        <div class="font-display gradient-text mb-2 text-4xl font-bold">∞</div>
        <div class="text-sm tracking-wider text-gray-400 uppercase">
          Possibilities
        </div>
      </div>
      <div class="cyber-card rounded-xl p-6 text-center">
        <div class="font-display gradient-text mb-2 text-4xl font-bold">0</div>
        <div class="text-sm tracking-wider text-gray-400 uppercase">Cost</div>
      </div>
    </div>
  </div>
</div>
