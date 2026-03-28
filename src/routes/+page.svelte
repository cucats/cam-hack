<script>
  import ThreeBackground from "$lib/components/ThreeBackground.svelte";
  import HeroNew from "$lib/components/HeroNew.svelte";
  import FeaturedProject from "$lib/components/FeaturedProject.svelte";
  import SponsorsNew from "$lib/components/SponsorsNew.svelte";
  import AboutNew from "$lib/components/AboutNew.svelte";
  import ScheduleNew from "$lib/components/ScheduleNew.svelte";
  import RulesNew from "$lib/components/RulesNew.svelte";
  import FAQNew from "$lib/components/FAQNew.svelte";
  import OrganisersNew from "$lib/components/OrganisersNew.svelte";
</script>

<svelte:head>
  <title>Cam Hack 2025</title>
  <meta name="description" content="Cam Hack 2025 - University of Cambridge Hackathon" />
</svelte:head>

<ThreeBackground />

<div class="relative">
  <HeroNew />
  
  <FeaturedProject />
  
  <SponsorsNew />
  
  <AboutNew />
  
  <ScheduleNew />
  
  <RulesNew />
  
  <FAQNew />
  
  <OrganisersNew />
</div>
