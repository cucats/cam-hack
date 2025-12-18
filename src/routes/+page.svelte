<script>
  import LoadingScreen from "$lib/components/LoadingScreen.svelte";
  import ThreeBackground from "$lib/components/ThreeBackground.svelte";
  import MatrixRain from "$lib/components/MatrixRain.svelte";
  import Starfield from "$lib/components/Starfield.svelte";
  import AnimatedGrid from "$lib/components/AnimatedGrid.svelte";
  import CursorGlow from "$lib/components/CursorGlow.svelte";
  import ScrollProgress from "$lib/components/ScrollProgress.svelte";
  import ScrollToTop from "$lib/components/ScrollToTop.svelte";
  import NewHero from "$lib/components/NewHero.svelte";
  import FeaturedProject from "$lib/components/FeaturedProject.svelte";
  import StatsSection from "$lib/components/StatsSection.svelte";
  import NewSponsors from "$lib/components/NewSponsors.svelte";
  import NewAbout from "$lib/components/NewAbout.svelte";
  import NewOrganisers from "$lib/components/NewOrganisers.svelte";
  import FooterSection from "$lib/components/FooterSection.svelte";
</script>

<svelte:head>
  <title>Cam Hack 2025</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Space+Grotesk:wght@400;500;600;700&display=swap" rel="stylesheet">
</svelte:head>

<LoadingScreen />
<ScrollProgress />
<ThreeBackground />
<MatrixRain />
<Starfield />
<AnimatedGrid />
<CursorGlow />
<ScrollToTop />

<div class="splash-container">
  <NewHero />
  <FeaturedProject />
  <StatsSection />
  <NewAbout />
  <NewSponsors />
  <NewOrganisers />
  <FooterSection />
</div>

<style>
  .splash-container {
    position: relative;
    background: linear-gradient(180deg, #0a0f0d 0%, #0f1713 25%, #0a4d2e 50%, #0f1713 75%, #0a0f0d 100%);
    min-height: 100vh;
  }
</style>
