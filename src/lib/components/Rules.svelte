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
        <span class="gradient-text text-glow">Rules</span>
      </h2>
      <div
        class="neon-line mx-auto w-24 {visible
          ? 'animate-scale-in delay-200'
          : 'opacity-0'}"
      ></div>
    </div>

    <div class="grid gap-8 lg:grid-cols-3">
      <div
        class="glass neon-border card-hover rounded-2xl p-8 {visible
          ? 'animate-slide-up delay-300'
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
              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
        </div>
        <h3 class="font-display mb-4 text-xl font-bold text-white">Entry</h3>
        <ul class="space-y-3 text-gray-300">
          <li class="flex items-start gap-2">
            <span
              class="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-emerald-400"
            ></span>
            <span
              >The maximum team size is 5. Any bigger, and we might have to
              split you up. Solo participation is allowed, but hacking is better
              with other people!</span
            >
          </li>
          <li class="flex items-start gap-2">
            <span
              class="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-emerald-400"
            ></span>
            <span
              >Due to departmental rules, participants must be students at the
              University of Cambridge.</span
            >
          </li>
        </ul>
      </div>

      <div
        class="glass neon-border card-hover rounded-2xl p-8 {visible
          ? 'animate-slide-up delay-400'
          : 'opacity-0'}"
      >
        <div
          class="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-teal-500/20"
        >
          <svg
            class="h-6 w-6 text-teal-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            />
          </svg>
        </div>
        <h3 class="font-display mb-4 text-xl font-bold text-white">
          House Rules
        </h3>
        <ul class="space-y-3 text-gray-300">
          <li class="flex items-start gap-2">
            <span
              class="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-teal-400"
            ></span>
            <span
              >Please do not bring food into the Intel lab! All food must stay
              downstairs in the street. 🍕</span
            >
          </li>
          <li class="flex items-start gap-2">
            <span
              class="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-teal-400"
            ></span>
            <span>You must not bring or consume alcohol at the hackathon.</span>
          </li>
          <li class="flex items-start gap-2">
            <span
              class="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-teal-400"
            ></span>
            <span
              >We don't recommend it, but you can stay overnight in the lab if
              you want. 😴</span
            >
          </li>
          <li class="flex items-start gap-2">
            <span
              class="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-teal-400"
            ></span>
            <span
              >All participants must follow our <a
                href="/code-of-conduct"
                class="text-teal-400 underline transition-colors hover:text-teal-300"
                >Code of Conduct</a
              >.</span
            >
          </li>
        </ul>
      </div>

      <div
        class="glass neon-border card-hover rounded-2xl p-8 {visible
          ? 'animate-slide-up delay-500'
          : 'opacity-0'}"
      >
        <div
          class="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-500/20"
        >
          <svg
            class="h-6 w-6 text-cyan-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <h3 class="font-display mb-4 text-xl font-bold text-white">
          Submission
        </h3>
        <ul class="space-y-3 text-gray-300">
          <li class="flex items-start gap-2">
            <span
              class="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-cyan-400"
            ></span>
            <span
              >All work on projects must be done at the hackathon. Using
              existing open source code is allowed if credited, but the project
              should be substantially new.</span
            >
          </li>
          <li class="flex items-start gap-2">
            <span
              class="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-cyan-400"
            ></span>
            <span
              >AI assistants (Copilot, ChatGPT, etc.) are allowed when writing
              code, but don't go overboard.</span
            >
          </li>
          <li class="flex items-start gap-2">
            <span
              class="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-cyan-400"
            ></span>
            <span
              >Submissions will be made to <a
                href="https://cam-hack-2025.devpost.com"
                class="text-cyan-400 underline transition-colors hover:text-cyan-300"
                target="_blank">Devpost</a
              >.</span
            >
          </li>
        </ul>
      </div>
    </div>
  </div>
</div>
