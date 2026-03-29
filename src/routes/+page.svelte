<script>
  import { onMount } from "svelte";
  import { browser } from "$app/environment";
  import gsap from "gsap";
  import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

  import Hero from "$lib/components/Hero.svelte";
  import FeaturedProjects from "$lib/components/FeaturedProjects.svelte";
  import Sponsors from "$lib/components/Sponsors.svelte";
  import About from "$lib/components/About.svelte";
  import Schedule from "$lib/components/Schedule.svelte";
  import Rules from "$lib/components/Rules.svelte";
  import FAQ from "$lib/components/FAQ.svelte";
  import Organisers from "$lib/components/Organisers.svelte";
  import PageFooter from "$lib/components/PageFooter.svelte";

  let ThreeBackground = $state(null);
  let navVisible = $state(false);
  let scrollProgress = $state(0);

  onMount(async () => {
    if (browser) {
      const module = await import("$lib/components/ThreeBackground.svelte");
      ThreeBackground = module.default;
    }

    gsap.registerPlugin(ScrollTrigger);

    ScrollTrigger.create({
      start: "top -100",
      end: "max",
      onUpdate: (self) => {
        navVisible = self.progress > 0.05;
        scrollProgress = self.progress;
      },
    });
  });
</script>

<svelte:head>
  <title>Cam Hack 2025</title>
  <meta
    name="description"
    content="Cam Hack 2025 - A 2 day hackathon for the innovative minds at the University of Cambridge"
  />
</svelte:head>

{#if browser && ThreeBackground}
  {@const Component = ThreeBackground}
  <Component />
{/if}

<nav
  class="fixed top-0 right-0 left-0 z-50 transition-all duration-500 {navVisible
    ? 'translate-y-0 opacity-100'
    : '-translate-y-full opacity-0'}"
>
  <div class="mx-auto max-w-7xl px-4">
    <div
      class="glass-card my-4 flex items-center justify-between !rounded-2xl !py-3"
    >
      <a href="/" class="flex items-center gap-3">
        <img src="/cam-hack-logo-text.png" alt="Cam Hack" class="h-10 w-10" />
        <span class="text-primary-400 font-bold">Cam Hack 2025</span>
      </a>

      <div class="hidden items-center gap-6 md:flex">
        <a
          href="#about"
          class="text-dark-300 hover:text-primary-400 transition-colors"
          >About</a
        >
        <a
          href="#schedule"
          class="text-dark-300 hover:text-primary-400 transition-colors"
          >Schedule</a
        >
        <a
          href="#rules"
          class="text-dark-300 hover:text-primary-400 transition-colors"
          >Rules</a
        >
        <a
          href="#faq"
          class="text-dark-300 hover:text-primary-400 transition-colors">FAQ</a
        >
        <a
          href="/signup"
          class="from-primary-600 to-primary-500 rounded-lg bg-gradient-to-r px-4 py-2 font-semibold text-white transition-all hover:shadow-[0_0_20px_rgba(16,185,129,0.4)]"
        >
          Sign up!
        </a>
      </div>

      <button
        aria-label="Open menu"
        class="flex h-10 w-10 items-center justify-center rounded-lg bg-white/5 md:hidden"
      >
        <svg
          class="text-primary-400 h-6 w-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h16M4 18h16"
          ></path>
        </svg>
      </button>
    </div>
  </div>
</nav>

<div class="fixed right-8 bottom-8 z-50">
  <div class="glass-card !rounded-full !p-2">
    <svg class="h-12 w-12" viewBox="0 0 100 100">
      <circle
        class="stroke-dark-700"
        cx="50"
        cy="50"
        r="45"
        fill="none"
        stroke-width="6"
      />
      <circle
        class="stroke-primary-500 transition-all duration-300"
        cx="50"
        cy="50"
        r="45"
        fill="none"
        stroke-width="6"
        stroke-linecap="round"
        stroke-dasharray={2 * Math.PI * 45}
        stroke-dashoffset={2 * Math.PI * 45 * (1 - scrollProgress)}
        transform="rotate(-90 50 50)"
      />
    </svg>
  </div>
</div>

<Hero />

<section id="projects">
  <FeaturedProjects />
</section>

<section id="sponsors">
  <Sponsors />
</section>

<section id="about">
  <About />
</section>

<section id="schedule">
  <Schedule />
</section>

<section id="rules">
  <Rules />
</section>

<section id="faq">
  <FAQ />
</section>

<section id="team">
  <Organisers />
</section>

<PageFooter />

<style>
  :global(section) {
    position: relative;
  }

  :global(section::before) {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 200px;
    background: linear-gradient(to bottom, transparent, rgba(2, 6, 23, 0.3));
    pointer-events: none;
    z-index: -1;
  }
</style>
