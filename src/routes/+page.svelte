<script>
  import ThreeBackground from "$lib/components/ThreeBackground.svelte";
  import SplashHero from "$lib/components/SplashHero.svelte";
  import FeaturedProjects from "$lib/components/FeaturedProjects.svelte";
  import SplashAbout from "$lib/components/SplashAbout.svelte";
  import SplashSchedule from "$lib/components/SplashSchedule.svelte";
  import SplashSponsors from "$lib/components/SplashSponsors.svelte";
  import SplashFAQ from "$lib/components/SplashFAQ.svelte";
  import SplashRules from "$lib/components/SplashRules.svelte";
  import SplashOrganisers from "$lib/components/SplashOrganisers.svelte";
  import SplashContact from "$lib/components/SplashContact.svelte";
</script>

<svelte:head>
  <title>Cam Hack 2025</title>
</svelte:head>

<ThreeBackground />

<section class="hero-section">
  <SplashHero />
</section>

<section id="projects" class="section-dark">
  <FeaturedProjects />
</section>

<section id="about" class="section-glow">
  <SplashAbout />
</section>

<section id="schedule" class="section-dark">
  <SplashSchedule />
</section>

<section id="sponsors" class="section-glow">
  <SplashSponsors />
</section>

<section id="faq" class="section-dark">
  <SplashFAQ />
</section>

<section id="rules" class="section-glow">
  <SplashRules />
</section>

<section class="section-dark">
  <SplashOrganisers />
</section>

<section class="section-final">
  <SplashContact />
</section>

<style>
  section {
    position: relative;
    z-index: 10;
  }

  .hero-section {
    background: transparent;
    padding: 0;
  }

  .section-dark {
    background: rgba(10, 10, 10, 0.95);
    border-top: 1px solid rgba(0, 255, 136, 0.1);
  }

  .section-glow {
    background: linear-gradient(
      180deg,
      rgba(10, 10, 10, 0.95) 0%,
      rgba(0, 255, 136, 0.02) 50%,
      rgba(10, 10, 10, 0.95) 100%
    );
    border-top: 1px solid rgba(0, 255, 136, 0.1);
  }

  .section-final {
    background: linear-gradient(
      180deg,
      rgba(10, 10, 10, 0.95) 0%,
      rgba(0, 255, 136, 0.05) 100%
    );
    border-top: 1px solid rgba(0, 255, 136, 0.1);
    border-bottom: 2px solid rgba(0, 255, 136, 0.3);
  }
</style>
