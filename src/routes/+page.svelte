<script>
  import ThreeBackground from "$lib/components/ThreeBackground.svelte";
  import SplashHero from "$lib/components/SplashHero.svelte";
  import FeaturedProject from "$lib/components/FeaturedProject.svelte";
  import SplashSponsors from "$lib/components/SplashSponsors.svelte";
</script>

<svelte:head>
  <title>Cam Hack 2025</title>
</svelte:head>

<ThreeBackground />

<div class="splash-container">
  <SplashHero />
  <FeaturedProject />
  <SplashSponsors />
</div>

<style>
  .splash-container {
    position: relative;
    z-index: 1;
  }
</style>
