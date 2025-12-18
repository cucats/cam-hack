<script>
  import { onMount } from "svelte";
  import { gsap } from "gsap";
  import ThreeBackground from "./ThreeBackground.svelte";

  let heroContent;
  let logo;
  let title;
  let subtitle;
  let countdown;
  let ctaButtons;
  let daysSince = $state(0);

  onMount(() => {
    const eventDate = new Date("2025-11-01").getTime();
    const updateCountdown = () => {
      daysSince = Math.floor((Date.now() - eventDate) / (1000 * 60 * 60 * 24));
    };
    updateCountdown();
    const interval = setInterval(updateCountdown, 86400000);

    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      if (heroContent) {
        gsap.to(heroContent, {
          y: scrolled * 0.3,
          opacity: 1 - scrolled / 500,
          duration: 0.3,
        });
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      clearInterval(interval);
      window.removeEventListener("scroll", handleScroll);
    };
  });

  onMount(() => {
    const tl = gsap.timeline();
    tl.from(logo, {
      opacity: 0,
      scale: 0.5,
      rotation: -180,
      duration: 1.2,
      ease: "back.out(1.7)",
    })
      .from(
        title,
        {
          opacity: 0,
          y: 50,
          duration: 1,
          ease: "power3.out",
        },
        "-=0.5"
      )
      .from(
        subtitle,
        {
          opacity: 0,
          y: 30,
          duration: 0.8,
          ease: "power2.out",
        },
        "-=0.7"
      )
      .from(
        countdown,
        {
          opacity: 0,
          scale: 0.8,
          duration: 0.8,
          ease: "elastic.out(1, 0.5)",
        },
        "-=0.5"
      )
      .from(
        ctaButtons,
        {
          opacity: 0,
          y: 20,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
        },
        "-=0.4"
      );

    gsap.to(title, {
      y: -10,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    gsap.to(countdown, {
      scale: 1.05,
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });
  });
</script>

<div class="relative min-h-screen flex items-center justify-center overflow-hidden">
  <ThreeBackground />

  <div
    bind:this={heroContent}
    class="relative z-10 mx-auto max-w-7xl px-4 sm:px-8 text-center"
    style="will-change: transform, opacity;"
  >
    <img
      bind:this={logo}
      src="/cam-hack-logo-text.png"
      alt="Cam Hack Logo"
      class="mx-auto mb-8 size-48 sm:size-64 md:size-80"
    />

    <h1
      bind:this={title}
      class="mb-6 text-5xl font-bold text-slate-800 sm:text-7xl md:text-8xl"
    >
      Cam Hack 2025
    </h1>

    <h3
      bind:this={subtitle}
      class="mb-8 text-2xl text-slate-700 sm:text-3xl md:text-4xl"
    >
      1st &ndash; 2nd November
    </h3>

    <div
      bind:this={countdown}
      class="mb-12 inline-block rounded-2xl bg-emerald-100/90 px-8 py-6 backdrop-blur-sm shadow-xl border-2 border-emerald-300/50"
    >
      <div class="text-4xl font-bold text-emerald-900 sm:text-5xl md:text-6xl">
        {daysSince} Days Since
      </div>
      <div class="mt-2 text-lg text-emerald-800 sm:text-xl">
        The Event
      </div>
    </div>

    <div bind:this={ctaButtons} class="flex flex-wrap justify-center gap-4">
      <a
        target="_blank"
        href="/discord"
        class="group relative overflow-hidden rounded-2xl bg-emerald-500 px-8 py-4 text-lg font-semibold text-white transition-all hover:scale-105 hover:bg-emerald-600 hover:shadow-xl"
      >
        <span class="relative z-10">Join the Discord!</span>
        <div
          class="absolute inset-0 translate-y-full bg-emerald-600 transition-transform duration-300 group-hover:translate-y-0"
        ></div>
      </a>
      <a
        target="_blank"
        href="/signup"
        class="cursor-not-allowed rounded-2xl bg-gray-300/80 px-8 py-4 text-lg font-semibold text-gray-600 transition-all"
      >
        Signups closed
      </a>
    </div>

    <p class="mt-12 text-xl text-slate-700 sm:text-2xl">
      What can you make in 2 days?
    </p>
  </div>
</div>
