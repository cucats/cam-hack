<script>
  import SplashHero from "$lib/components/SplashHero.svelte";
  import FeaturedProjects from "$lib/components/FeaturedProjects.svelte";
  import Sponsors from "$lib/components/Sponsors.svelte";
  import About from "$lib/components/About.svelte";
  import Schedule from "$lib/components/Schedule.svelte";
  import Rules from "$lib/components/Rules.svelte";
  import FAQ from "$lib/components/FAQ.svelte";
  import Organisers from "$lib/components/Organisers.svelte";
  import { onMount } from "svelte";

  let sections = $state([]);

  onMount(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1 }
    );

    const sectionElements = document.querySelectorAll(".animate-section");
    sectionElements.forEach((el) => observer.observe(el));

    return () => {
      sectionElements.forEach((el) => observer.unobserve(el));
    };
  });
</script>

<svelte:head>
  <title>Cam Hack 2025</title>
</svelte:head>

<SplashHero />

<section class="featured-projects-section">
  <FeaturedProjects />
</section>

<section class="sponsors-section animate-section">
  <Sponsors />
</section>

<section id="about" class="animate-section">
  <About />
</section>

<section id="schedule" class="animate-section">
  <Schedule />
</section>

<section id="rules" class="animate-section">
  <Rules />
</section>

<section id="faq" class="animate-section">
  <FAQ />
</section>

<section class="animate-section">
  <Organisers />
</section>

<style>
  section {
    padding: 1rem;
    font-size: 1.125rem;
  }

  @media (min-width: 640px) {
    section {
      padding-left: 2rem;
      padding-right: 2rem;
    }
  }

  section:nth-child(odd) {
    background: linear-gradient(135deg, #f0fdf4 0%, #ffffff 100%);
  }

  section:nth-child(even) {
    background: linear-gradient(135deg, #ffffff 0%, #ecfdf5 100%);
  }

  section.featured-projects-section {
    background: linear-gradient(180deg, #ffffff 0%, #f0fdf4 100%);
  }

  section.sponsors-section {
    background: linear-gradient(135deg, #ecfdf5 0%, #ffffff 100%);
  }

  :global(.animate-section) {
    opacity: 0;
    transform: translateY(2.5rem);
    transition: opacity 1s ease, transform 1s ease;
  }

  :global(.animate-section.visible) {
    opacity: 1;
    transform: translateY(0);
  }
</style>
