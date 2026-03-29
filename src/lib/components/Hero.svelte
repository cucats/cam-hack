<script>
  import { onMount } from "svelte";
  import gsap from "gsap";

  let daysSince = $state(0);
  let heroContainer;
  let logoElement;
  let titleElement;
  let dateElement;
  let countdownElement;
  let ctaElements;

  const eventDate = new Date("2025-11-01T00:00:00");

  function calculateDaysSince() {
    const now = new Date();
    const diffTime = now - eventDate;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    return Math.max(0, diffDays);
  }

  onMount(() => {
    daysSince = calculateDaysSince();

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.fromTo(
      logoElement,
      { scale: 0, rotation: -180, opacity: 0 },
      { scale: 1, rotation: 0, opacity: 1, duration: 1.2 },
    )
      .fromTo(
        titleElement,
        { y: 50, opacity: 0, filter: "blur(10px)" },
        { y: 0, opacity: 1, filter: "blur(0px)", duration: 0.8 },
        "-=0.6",
      )
      .fromTo(
        dateElement,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 },
        "-=0.4",
      )
      .fromTo(
        countdownElement,
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.8, ease: "elastic.out(1, 0.5)" },
        "-=0.2",
      )
      .fromTo(
        ".cta-button",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.1 },
        "-=0.4",
      );

    gsap.to(logoElement, {
      y: -10,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });
  });
</script>

<div
  bind:this={heroContainer}
  class="relative flex min-h-screen items-center justify-center px-4 py-20"
>
  <div class="relative z-10 text-center">
    <div bind:this={logoElement} class="mx-auto mb-8 w-48 sm:w-64 md:w-80">
      <img
        src="/cam-hack-logo-text.png"
        alt="Cam Hack Logo"
        class="mx-auto w-full drop-shadow-[0_0_30px_rgba(16,185,129,0.5)]"
      />
    </div>

    <h1
      bind:this={titleElement}
      class="glow-text from-primary-400 via-accent-400 to-primary-300 mb-4 bg-gradient-to-r bg-clip-text text-transparent"
    >
      Cam Hack 2025
    </h1>

    <p
      bind:this={dateElement}
      class="text-dark-300 mb-8 text-2xl font-light sm:text-3xl"
    >
      1st — 2nd November
    </p>

    <div
      bind:this={countdownElement}
      class="glass-card glow-border mx-auto mb-10 inline-block"
    >
      <p class="text-primary-400 mb-2 text-sm tracking-widest uppercase">
        Days Since Event
      </p>
      <div class="flex items-center justify-center gap-2">
        <span
          class="from-primary-400 to-accent-400 bg-gradient-to-br bg-clip-text text-6xl font-bold text-transparent sm:text-7xl md:text-8xl"
        >
          {daysSince}
        </span>
        <span class="text-dark-400 text-2xl">days</span>
      </div>
    </div>

    <div class="flex flex-wrap justify-center gap-4">
      <a
        href="/discord"
        target="_blank"
        class="cta-button group from-primary-600 to-primary-500 relative overflow-hidden rounded-xl bg-gradient-to-r px-8 py-4 font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(16,185,129,0.5)]"
      >
        <span class="relative z-10">Join the Discord!</span>
        <div
          class="from-accent-500 to-primary-400 absolute inset-0 -translate-x-full bg-gradient-to-r transition-transform duration-300 group-hover:translate-x-0"
        ></div>
      </a>
      <a
        href="/signup"
        class="cta-button glass-card text-dark-400 cursor-not-allowed px-8 py-4 font-semibold transition-all duration-300"
      >
        Signups closed
      </a>
    </div>

    <p class="text-dark-400 mt-8 text-xl">What can you make in 2 days?</p>
  </div>

  <div class="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
    <svg
      class="text-primary-400 h-8 w-8"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M19 14l-7 7m0 0l-7-7m7 7V3"
      ></path>
    </svg>
  </div>
</div>
