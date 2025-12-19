<script>
  import ThreeBackground from "$lib/components/ThreeBackground.svelte";
  import SplashHero from "$lib/components/splash/SplashHero.svelte";
  import SplashFeaturedProjects from "$lib/components/splash/SplashFeaturedProjects.svelte";
  import SplashSponsors from "$lib/components/splash/SplashSponsors.svelte";
  import SplashAbout from "$lib/components/splash/SplashAbout.svelte";
  import SplashSchedule from "$lib/components/splash/SplashSchedule.svelte";
  import SplashRules from "$lib/components/splash/SplashRules.svelte";
  import SplashFAQ from "$lib/components/splash/SplashFAQ.svelte";
  import SplashOrganisers from "$lib/components/splash/SplashOrganisers.svelte";
</script>

<svelte:head>
  <title>Cam Hack 2025</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link
    rel="preconnect"
    href="https://fonts.gstatic.com"
    crossorigin="anonymous"
  />
  <link
    href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&display=swap"
    rel="stylesheet"
  />
</svelte:head>

<div class="splash-page">
  <ThreeBackground />

  <SplashHero />

  <SplashFeaturedProjects />

  <SplashSponsors />

  <SplashAbout />

  <SplashSchedule />

  <SplashRules />

  <SplashFAQ />

  <SplashOrganisers />
</div>

<style>
  .splash-page {
    position: relative;
    z-index: 1;
    min-height: 100vh;
  }
</style>
