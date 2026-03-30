<script>
  import { onMount } from "svelte";
  import ThreeBackground from "$lib/components/ThreeBackground.svelte";
  import FeaturedProjects from "$lib/components/FeaturedProjects.svelte";
  import Sponsors from "$lib/components/Sponsors.svelte";
  import About from "$lib/components/About.svelte";
  import Schedule from "$lib/components/Schedule.svelte";
  import Rules from "$lib/components/Rules.svelte";
  import FAQ from "$lib/components/FAQ.svelte";
  import Organisers from "$lib/components/Organisers.svelte";

  let daysSince = $state(0);
  let heroVisible = $state(false);
  let sectionsVisible = $state(new Set());

  onMount(() => {
    const eventDate = new Date("2025-11-02T00:00:00");
    const now = new Date();
    const diffTime = now - eventDate;
    daysSince = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    setTimeout(() => {
      heroVisible = true;
    }, 100);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            sectionsVisible.add(entry.target.id);
          }
        });
      },
      { threshold: 0.1 }
    );

    const sections = document.querySelectorAll(".animate-section");
    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  });
</script>

<svelte:head>
  <title>Cam Hack 2025</title>
</svelte:head>

<ThreeBackground />

<section class="hero-section relative min-h-screen flex items-center justify-center overflow-hidden">
  <div class="absolute inset-0 bg-gradient-to-b from-emerald-50/50 via-transparent to-cyan-50/50"></div>
  <div class="mx-auto max-w-7xl px-4 sm:px-8 text-center relative z-10">
    <div
      class="hero-content transition-all duration-1000 ease-out {heroVisible
        ? 'translate-y-0 opacity-100'
        : 'translate-y-20 opacity-0'}"
    >
      <img
        src="/cam-hack-logo-text.png"
        alt="Cam Hack Logo"
        class="mx-auto mb-8 size-48 sm:size-64 md:size-80 animate-pulse"
      />
      <h1 class="mb-4 text-5xl font-bold sm:text-6xl md:text-7xl lg:text-8xl text-emerald-600 drop-shadow-lg relative inline-block">
        <span class="relative z-10">Cam&nbsp;Hack&nbsp;2025</span>
        <span class="absolute inset-0 text-emerald-400 blur-xl opacity-50 -z-10">Cam&nbsp;Hack&nbsp;2025</span>
      </h1>
      <h3 class="mb-8 text-2xl sm:text-3xl md:text-4xl text-emerald-700">
        1st&nbsp;&ndash;&nbsp;2nd&nbsp;November
      </h3>
      <div class="mb-8 flex flex-wrap justify-center gap-4">
        <a
          target="_blank"
          href="/discord"
          class="group relative overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-500 to-emerald-600 px-8 py-4 text-lg font-semibold text-white shadow-xl transition-all duration-300 hover:scale-110 hover:shadow-2xl"
        >
          <span class="relative z-10">Join the Discord!</span>
          <div class="absolute inset-0 bg-gradient-to-r from-emerald-600 to-emerald-700 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
        </a>
        <a
          target="_blank"
          href="/signup"
          class="rounded-2xl bg-gray-300/80 px-8 py-4 text-lg font-semibold text-gray-600 transition-all select-none cursor-not-allowed"
        >
          Signups closed
        </a>
      </div>
      <div class="countdown-container mb-8">
        <div class="relative inline-block overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-400/30 via-emerald-500/20 to-cyan-400/30 px-10 py-8 backdrop-blur-md shadow-2xl border-2 border-emerald-300/50">
          <div class="absolute inset-0 bg-gradient-to-r from-emerald-400/0 via-white/20 to-emerald-400/0 animate-shimmer"></div>
          <p class="relative mb-3 text-sm font-semibold uppercase tracking-wider text-emerald-800">
            Days Since Event
          </p>
          <p class="relative text-6xl font-bold text-emerald-900 sm:text-7xl md:text-8xl drop-shadow-lg">
            {daysSince}
          </p>
          <div class="absolute -inset-1 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-2xl blur opacity-30 animate-pulse"></div>
        </div>
      </div>
      <p class="text-xl sm:text-2xl text-emerald-800">What can you make in 2 days?</p>
    </div>
  </div>
  <div class="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
    <svg
      class="h-8 w-8 text-emerald-600"
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
</section>

<section class="unintended-section m-0 animate-section py-16" id="unintended">
  <div class="mx-auto max-w-7xl px-4 sm:px-8 transition-all duration-1000 ease-out {sectionsVisible.has('unintended')
    ? 'translate-y-0 opacity-100 scale-100'
    : 'translate-y-20 opacity-0 scale-95'}">
    <h1 class="py-8 text-center text-4xl font-bold text-emerald-700">Unintended Behaviour</h1>
    <a target="_blank" href="https://cam-hack-2025.devpost.com" class="block group">
      <img
        src="/unintended.png"
        alt="Unintended"
        class="m-0 block w-full rounded-3xl transition-transform duration-500 group-hover:scale-[1.02] shadow-2xl"
      />
    </a>
  </div>
</section>

<section class="sponsors-section animate-section py-16" id="sponsors">
  <div class="transition-all duration-1000 ease-out {sectionsVisible.has('sponsors')
    ? 'translate-y-0 opacity-100'
    : 'translate-y-20 opacity-0'}">
    <Sponsors />
  </div>
</section>

<section id="featured-projects" class="animate-section bg-gradient-to-b from-white to-emerald-50/30">
  <div class="py-16 transition-all duration-1000 {sectionsVisible.has('featured-projects')
    ? 'translate-y-0 opacity-100'
    : 'translate-y-20 opacity-0'}">
    <FeaturedProjects />
  </div>
</section>

<section id="about" class="animate-section py-16">
  <div class="transition-all duration-1000 ease-out {sectionsVisible.has('about')
    ? 'translate-y-0 opacity-100'
    : 'translate-y-20 opacity-0'}">
    <About />
  </div>
</section>

<section id="schedule" class="animate-section bg-gradient-to-b from-emerald-50/30 to-white py-16">
  <div class="transition-all duration-1000 ease-out {sectionsVisible.has('schedule')
    ? 'translate-y-0 opacity-100'
    : 'translate-y-20 opacity-0'}">
    <Schedule />
  </div>
</section>

<section id="rules" class="animate-section py-16">
  <div class="transition-all duration-1000 ease-out {sectionsVisible.has('rules')
    ? 'translate-y-0 opacity-100'
    : 'translate-y-20 opacity-0'}">
    <Rules />
  </div>
</section>

<section id="faq" class="animate-section bg-gradient-to-b from-white to-emerald-50/30 py-16">
  <div class="transition-all duration-1000 ease-out {sectionsVisible.has('faq')
    ? 'translate-y-0 opacity-100'
    : 'translate-y-20 opacity-0'}">
    <FAQ />
  </div>
</section>

<section class="animate-section py-16" id="organisers">
  <div class="transition-all duration-1000 ease-out {sectionsVisible.has('organisers')
    ? 'translate-y-0 opacity-100'
    : 'translate-y-20 opacity-0'}">
    <Organisers />
  </div>
</section>

<style>
  .hero-section {
    background: linear-gradient(135deg, rgba(16, 185, 129, 0.05) 0%, rgba(6, 182, 212, 0.05) 100%);
    position: relative;
  }

  .hero-section::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at 50% 50%, rgba(16, 185, 129, 0.1) 0%, transparent 70%);
    animation: pulse-glow 4s ease-in-out infinite;
  }

  @keyframes pulse-glow {
    0%, 100% {
      opacity: 0.5;
    }
    50% {
      opacity: 0.8;
    }
  }

  section:nth-child(even):not(.hero-section):not(.unintended-section):not(.sponsors-section) {
    background-color: #fafafa;
  }

  section:nth-child(odd):not(.hero-section):not(.unintended-section):not(.sponsors-section) {
    background-color: #ffffff;
  }

  section.unintended-section {
    background-color: transparent !important;
    margin: 0 !important;
  }

  section.unintended-section img {
    margin: 0 !important;
    display: block;
  }

  section.sponsors-section {
    background-color: #ffffff !important;
  }

  .countdown-container {
    perspective: 1000px;
  }

  .countdown-container > div {
    transform-style: preserve-3d;
    animation: float 3s ease-in-out infinite;
  }

  @keyframes float {
    0%, 100% {
      transform: translateY(0px) rotateX(0deg);
    }
    50% {
      transform: translateY(-10px) rotateX(2deg);
    }
  }

  @keyframes shimmer {
    0% {
      transform: translateX(-100%);
    }
    100% {
      transform: translateX(100%);
    }
  }

  .animate-shimmer {
    animation: shimmer 3s infinite;
  }

  .hero-content img {
    filter: drop-shadow(0 10px 30px rgba(16, 185, 129, 0.3));
    animation: logo-glow 2s ease-in-out infinite alternate;
  }

  @keyframes logo-glow {
    0% {
      filter: drop-shadow(0 10px 30px rgba(16, 185, 129, 0.3));
    }
    100% {
      filter: drop-shadow(0 15px 40px rgba(16, 185, 129, 0.5));
    }
  }
</style>