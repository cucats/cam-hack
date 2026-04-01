<script>
  import ParticleNetwork from "$lib/components/ParticleNetwork.svelte";
  import HeroNew from "$lib/components/HeroNew.svelte";
  import FeaturedProject from "$lib/components/FeaturedProject.svelte";
  import AboutNew from "$lib/components/AboutNew.svelte";
  import ScheduleNew from "$lib/components/ScheduleNew.svelte";
  import SponsorsNew from "$lib/components/SponsorsNew.svelte";
</script>

<svelte:head>
  <title>Cam Hack 2025</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400..900&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet" />
</svelte:head>

<ParticleNetwork />

<HeroNew />

<FeaturedProject />

<AboutNew />

<ScheduleNew />

<SponsorsNew />
