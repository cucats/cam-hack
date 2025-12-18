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
      { threshold: 0.1 },
    );

    if (sectionRef) {
      observer.observe(sectionRef);
    }

    return () => observer.disconnect();
  });
</script>

<div bind:this={sectionRef} class="section-dark grid-bg relative py-24">
  <div class="relative z-10 mx-auto max-w-7xl px-4 sm:px-8">
    <div class="mb-12 text-center">
      <h2
        class="font-display mb-4 text-4xl font-bold sm:text-5xl {visible
          ? 'animate-slide-up'
          : 'opacity-0'}"
      >
        <span class="gradient-text text-glow">About</span>
      </h2>
      <div
        class="neon-line mx-auto w-24 {visible
          ? 'animate-scale-in delay-200'
          : 'opacity-0'}"
      ></div>
    </div>

    <div class="grid gap-8 lg:grid-cols-2">
      <div
        class="glass neon-border card-hover rounded-2xl p-8 {visible
          ? 'animate-slide-left delay-300'
          : 'opacity-0'}"
      >
        <div
          class="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/20"
        >
          <svg
            class="h-6 w-6 text-emerald-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M13 10V3L4 14h7v7l9-11h-7z"
            />
          </svg>
        </div>
        <h3 class="font-display mb-4 text-2xl font-bold text-white">
          The Hackathon
        </h3>
        <p class="text-gray-300">
          Cam Hack is a 2 day hackathon for the innovative minds at the
          University of Cambridge. Over an action-packed weekend, students come
          together to design and build technology projects from the ground up.
          We welcome participants ranging from curious beginners to seasoned
          coders. Expect plenty of free stash, food, and mini-events throughout
          this hackathon.
        </p>
      </div>

      <div
        class="glass neon-border card-hover rounded-2xl p-8 {visible
          ? 'animate-slide-right delay-400'
          : 'opacity-0'}"
      >
        <div
          class="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/20"
        >
          <svg
            class="h-6 w-6 text-emerald-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <h3 class="font-display mb-4 text-2xl font-bold text-white">
          The Prizes
        </h3>
        <p class="text-gray-300">
          For the winning team, each person will receive £200 and can choose
          from a range of prizes including: smartwatches, Steam vouchers, Amazon
          vouchers, or Sony XM4 headphones.
        </p>
      </div>
    </div>

    <div class="mt-8 grid gap-6 sm:grid-cols-3">
      <div
        class="glass-dark rounded-xl p-6 text-center {visible
          ? 'animate-slide-up delay-500'
          : 'opacity-0'}"
      >
        <div class="font-display mb-2 text-4xl font-bold text-emerald-400">
          2
        </div>
        <div class="text-gray-400">Days</div>
      </div>
      <div
        class="glass-dark rounded-xl p-6 text-center {visible
          ? 'animate-slide-up delay-600'
          : 'opacity-0'}"
      >
        <div class="font-display mb-2 text-4xl font-bold text-emerald-400">
          £200
        </div>
        <div class="text-gray-400">Per Winner</div>
      </div>
      <div
        class="glass-dark rounded-xl p-6 text-center {visible
          ? 'animate-slide-up delay-700'
          : 'opacity-0'}"
      >
        <div class="font-display mb-2 text-4xl font-bold text-emerald-400">
          ∞
        </div>
        <div class="text-gray-400">Possibilities</div>
      </div>
    </div>
  </div>
</div>
