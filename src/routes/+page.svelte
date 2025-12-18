<script>
  import ThreeScene from "$lib/components/splash/ThreeScene.svelte";
  import SplashHero from "$lib/components/splash/SplashHero.svelte";
  import AboutPreview from "$lib/components/splash/AboutPreview.svelte";
  import SchedulePreview from "$lib/components/splash/SchedulePreview.svelte";
  import FeaturedProjects from "$lib/components/splash/FeaturedProjects.svelte";
</script>

<svelte:head>
  <title>Cam Hack 2025</title>
</svelte:head>

<ThreeScene />
<SplashHero />
<AboutPreview />
<SchedulePreview />
<FeaturedProjects />

<style>
  :global(body) {
    margin: 0;
    padding: 0;
    overflow-x: hidden;
  }
</style>
