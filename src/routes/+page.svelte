<script>
  import HeroNew from "$lib/components/HeroNew.svelte";
  import AboutNew from "$lib/components/AboutNew.svelte";
  import FeaturedProjects from "$lib/components/FeaturedProjects.svelte";
  import SponsorsNew from "$lib/components/SponsorsNew.svelte";
  import ScheduleNew from "$lib/components/ScheduleNew.svelte";
  import RulesNew from "$lib/components/RulesNew.svelte";
  import FAQNew from "$lib/components/FAQNew.svelte";
  import OrganisersNew from "$lib/components/OrganisersNew.svelte";
</script>

<svelte:head>
  <title>Cam Hack 2025</title>
  <meta
    name="description"
    content="Cam Hack is a 2 day hackathon for the innovative minds at the University of Cambridge."
  />
</svelte:head>

<section class="hero-section">
  <HeroNew />
</section>

<section id="about" class="section-dark">
  <AboutNew />
</section>

<section id="projects" class="section-alt">
  <FeaturedProjects />
</section>

<section id="sponsors" class="section-dark">
  <SponsorsNew />
</section>

<section id="schedule" class="section-alt">
  <ScheduleNew />
</section>

<section id="rules" class="section-dark">
  <RulesNew />
</section>

<section id="faq" class="section-alt">
  <FAQNew />
</section>

<section id="organisers" class="section-dark">
  <OrganisersNew />
</section>

<style>
  section {
    position: relative;
  }

  .hero-section {
    min-height: 100vh;
    background: transparent;
  }

  .section-dark {
    background: linear-gradient(
      180deg,
      rgba(10, 10, 15, 0.95) 0%,
      rgba(10, 10, 15, 0.98) 100%
    );
  }

  .section-alt {
    background: linear-gradient(
      180deg,
      rgba(5, 5, 10, 0.98) 0%,
      rgba(10, 10, 15, 0.95) 100%
    );
  }
</style>
