<script>
  import LoadingScreen from "$lib/components/LoadingScreen.svelte";
  import CursorTrail from "$lib/components/CursorTrail.svelte";
  import MatrixRain from "$lib/components/MatrixRain.svelte";
  import ThreeBackground from "$lib/components/ThreeBackground.svelte";
  import NewHero from "$lib/components/NewHero.svelte";
  import FeaturedProjects from "$lib/components/FeaturedProjects.svelte";
  import NewSponsors from "$lib/components/NewSponsors.svelte";
  import NewAbout from "$lib/components/NewAbout.svelte";
  import NewOrganisers from "$lib/components/NewOrganisers.svelte";
</script>

<svelte:head>
  <title>Cam Hack 2025</title>
  <meta name="description" content="Cam Hack 2025 - What can you make in 2 days?" />
</svelte:head>

<LoadingScreen />
<CursorTrail />
<MatrixRain />
<ThreeBackground />

<div class="page-container">
  <NewHero />
  <FeaturedProjects />
  <NewAbout />
  <NewSponsors />
  <NewOrganisers />
</div>

<style>
  .page-container {
    position: relative;
    z-index: 1;
  }
</style>
