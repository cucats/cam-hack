<script>
  import ThreeScene from "$lib/components/splash/ThreeScene.svelte";
  import SplashHero from "$lib/components/splash/SplashHero.svelte";
  import Countdown from "$lib/components/splash/Countdown.svelte";
  import FeaturedProjects from "$lib/components/splash/FeaturedProjects.svelte";
  import SplashAbout from "$lib/components/splash/SplashAbout.svelte";
  import Sponsors from "$lib/components/Sponsors.svelte";
</script>

<svelte:head>
  <title>Cam Hack 2025</title>
</svelte:head>

<ThreeScene />

<section class="hero-section">
  <SplashHero />
</section>

<section class="countdown-section">
  <Countdown />
</section>

<section class="about-splash-section">
  <SplashAbout />
</section>

<section class="projects-splash-section">
  <FeaturedProjects />
</section>

<section class="sponsors-splash-section">
  <div class="sponsors-wrapper">
    <Sponsors />
  </div>
</section>

<style>
  .hero-section {
    @apply relative;
    min-height: 100vh;
  }

  .countdown-section {
    @apply relative;
    background: linear-gradient(
      180deg,
      rgba(255, 255, 255, 0.95) 0%,
      rgba(209, 250, 229, 0.4) 100%
    );
    min-height: 50vh;
  }

  .about-splash-section {
    @apply relative;
    background: rgba(255, 255, 255, 0.98);
  }

  .projects-splash-section {
    @apply relative;
  }

  .sponsors-splash-section {
    @apply relative py-20;
    background: linear-gradient(
      180deg,
      rgba(209, 250, 229, 0.2) 0%,
      rgba(255, 255, 255, 0.95) 100%
    );
  }

  .sponsors-wrapper {
    @apply mx-auto max-w-7xl;
  }
</style>
