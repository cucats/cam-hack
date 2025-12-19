<script>
  import ThreeBackground from "$lib/components/ThreeBackground.svelte";
  import ScrollAnimations from "$lib/components/ScrollAnimations.svelte";
  import CursorGlow from "$lib/components/CursorGlow.svelte";
  import ScanlineEffect from "$lib/components/ScanlineEffect.svelte";
  import HeroNew from "$lib/components/HeroNew.svelte";
  import FeaturedProjects from "$lib/components/FeaturedProjects.svelte";
  import SponsorsNew from "$lib/components/SponsorsNew.svelte";
  import AboutNew from "$lib/components/AboutNew.svelte";
  import ScheduleNew from "$lib/components/ScheduleNew.svelte";
  import RulesNew from "$lib/components/RulesNew.svelte";
  import FAQNew from "$lib/components/FAQNew.svelte";
  import OrganisersNew from "$lib/components/OrganisersNew.svelte";
</script>

<svelte:head>
  <title>Cam Hack 2025</title>
  <meta name="description" content="Cam Hack 2025 - A 2 day hackathon at the University of Cambridge" />
</svelte:head>

<ThreeBackground />
<ScrollAnimations />
<CursorGlow />
<ScanlineEffect />

<div class="page-wrapper">
  <section>
    <HeroNew />
  </section>

  <section>
    <FeaturedProjects />
  </section>

  <section>
    <SponsorsNew />
  </section>

  <section id="about">
    <AboutNew />
  </section>

  <section id="schedule">
    <ScheduleNew />
  </section>

  <section id="rules">
    <RulesNew />
  </section>

  <section id="faq">
    <FAQNew />
  </section>

  <section>
    <OrganisersNew />
  </section>
</div>

<style>
  .page-wrapper {
    position: relative;
    z-index: 1;
  }

  section {
    padding: 0;
    margin: 0;
  }
</style>
