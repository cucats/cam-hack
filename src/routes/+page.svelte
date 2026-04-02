<script>
  import ThreeBackground from "$lib/components/ThreeBackground.svelte";
  import FloatingNav from "$lib/components/FloatingNav.svelte";
  import SplashHero from "$lib/components/SplashHero.svelte";
  import FeaturedProject from "$lib/components/FeaturedProject.svelte";
  import SplashSponsors from "$lib/components/SplashSponsors.svelte";
  import SplashAbout from "$lib/components/SplashAbout.svelte";
  import SplashSchedule from "$lib/components/SplashSchedule.svelte";
  import SplashRules from "$lib/components/SplashRules.svelte";
  import SplashFAQ from "$lib/components/SplashFAQ.svelte";
  import SplashOrganisers from "$lib/components/SplashOrganisers.svelte";
</script>

<svelte:head>
  <title>Cam Hack 2025</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
</svelte:head>

<div class="splash-page">
  <FloatingNav />
  <ThreeBackground />
  <SplashHero />
  <FeaturedProject />
  <SplashSponsors />
  <SplashAbout />
  <SplashSchedule />
  <SplashRules />
  <SplashFAQ />
  <SplashOrganisers />
</div>

<style>
  .splash-page {
    background: linear-gradient(180deg, #0a0e27 0%, #1a1e3f 50%, #0a0e27 100%);
    min-height: 100vh;
    position: relative;
    overflow-x: hidden;
  }

  .splash-page::before {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      radial-gradient(circle at 20% 50%, rgba(0, 255, 136, 0.03) 0%, transparent 50%),
      radial-gradient(circle at 80% 80%, rgba(0, 204, 255, 0.03) 0%, transparent 50%),
      radial-gradient(circle at 40% 20%, rgba(255, 0, 170, 0.02) 0%, transparent 50%);
    pointer-events: none;
    z-index: 1;
  }

  :global(body) {
    margin: 0;
    padding: 0;
    background: #0a0e27;
  }
</style>
