<script>
  import ThreeBackground from "$lib/components/ThreeBackground.svelte";
  import Hero from "$lib/components/Hero.svelte";
  import FeaturedProjects from "$lib/components/FeaturedProjects.svelte";
  import Sponsors from "$lib/components/Sponsors.svelte";
  import About from "$lib/components/About.svelte";
  import Schedule from "$lib/components/Schedule.svelte";
  import Rules from "$lib/components/Rules.svelte";
  import FAQ from "$lib/components/FAQ.svelte";
  import Organisers from "$lib/components/Organisers.svelte";
</script>

<svelte:head>
  <title>Cam Hack 2025</title>
  <meta
    name="description"
    content="Cam Hack is a 2 day hackathon for the innovative minds at the University of Cambridge."
  />
</svelte:head>

<div class="splash-page">
  <ThreeBackground />

  <section class="hero-section relative">
    <Hero />
  </section>

  <section class="projects-section">
    <FeaturedProjects />
  </section>

  <section id="about">
    <About />
  </section>

  <section>
    <Sponsors />
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

  <section>
    <Organisers />
  </section>

  <footer class="section-dark border-t border-emerald-500/20 py-12">
    <div class="mx-auto max-w-7xl px-4 text-center sm:px-8">
      <div
        class="mb-6 flex flex-wrap items-center justify-center gap-6 text-gray-400"
      >
        <a
          href="mailto:camhack@cucats.org"
          class="transition-colors hover:text-emerald-400">Contact</a
        >
        <span class="text-emerald-500/50">•</span>
        <a
          href="/code-of-conduct"
          class="transition-colors hover:text-emerald-400">Code of Conduct</a
        >
        <span class="text-emerald-500/50">•</span>
        <a href="/discord" class="transition-colors hover:text-emerald-400"
          >Discord</a
        >
      </div>
      <p class="mb-2 text-gray-500">Copyright © Cam Hack 2025</p>
      <p class="text-sm text-gray-600">Art by Gwen Sellers</p>
    </div>
  </footer>
</div>

<style>
  .splash-page {
    position: relative;
  }

  .hero-section {
    min-height: 100vh;
  }

  section {
    position: relative;
    z-index: 1;
  }
</style>
