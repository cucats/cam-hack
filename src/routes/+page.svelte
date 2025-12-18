<script>
  import ThreeBackground from "$lib/components/ThreeBackground.svelte";
  import Hero from "$lib/components/Hero.svelte";
  import FeaturedProjects from "$lib/components/FeaturedProjects.svelte";
  import Sponsors from "$lib/components/Sponsors.svelte";
  import About from "$lib/components/About.svelte";
  import Schedule from "$lib/components/Schedule.svelte";
  import Rules from "$lib/components/Rules.svelte";
  import FAQ from "$lib/components/FAQ.svelte";
  import Organisers from "$lib/components/Organisers.svelte";
</script>

<svelte:head>
  <title>Cam Hack 2025</title>
</svelte:head>

<ThreeBackground />

<div class="page-content">
  <section class="hero-section">
    <Hero />
  </section>

  <section class="featured-section">
    <FeaturedProjects />
  </section>

  <section class="sponsors-section" id="sponsors">
    <Sponsors />
  </section>

  <section id="about">
    <About />
  </section>

  <section id="schedule">
    <Schedule />
  </section>

  <section id="rules">
    <Rules />
  </section>

  <section id="faq">
    <FAQ />
  </section>

  <section id="organisers">
    <Organisers />
  </section>

  <footer class="page-footer">
    <div class="footer-content">
      <div class="footer-links">
        <a href="mailto:camhack@cucats.org" class="footer-link">Contact</a>
        <span class="footer-divider">•</span>
        <a href="/code-of-conduct" class="footer-link">Code of Conduct</a>
      </div>
      <div class="footer-copyright">
        <p>Copyright © Cam Hack 2025.</p>
        <p class="footer-credit">Art by Gwen Sellers</p>
      </div>
      <div class="footer-decoration">
        <div class="decoration-line"></div>
      </div>
    </div>
  </footer>
</div>

<style>
  .page-content {
    position: relative;
    z-index: 1;
  }

  section {
    position: relative;
  }

  .hero-section {
    min-height: 100vh;
    background: transparent;
  }

  .featured-section {
    background: linear-gradient(to bottom, var(--color-dark), var(--color-dark-lighter));
  }

  .sponsors-section {
    background: var(--color-dark-lighter);
  }

  section:nth-child(odd):not(.hero-section):not(.featured-section):not(.sponsors-section) {
    background: var(--color-dark);
  }

  section:nth-child(even):not(.hero-section):not(.featured-section):not(.sponsors-section) {
    background: var(--color-dark-lighter);
  }

  .page-footer {
    position: relative;
    padding: 4rem 2rem;
    background: linear-gradient(to bottom, var(--color-dark), #050505);
    border-top: 1px solid rgba(0, 255, 136, 0.1);
  }

  .footer-content {
    max-width: 1200px;
    margin: 0 auto;
    text-align: center;
  }

  .footer-links {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    margin-bottom: 2rem;
  }

  .footer-link {
    color: var(--color-text-muted);
    text-decoration: none;
    font-size: 1rem;
    transition: all 0.3s ease;
  }

  .footer-link:hover {
    color: var(--color-primary);
    text-shadow: 0 0 10px rgba(0, 255, 136, 0.5);
  }

  .footer-divider {
    color: rgba(0, 255, 136, 0.3);
  }

  .footer-copyright {
    margin-bottom: 2rem;
  }

  .footer-copyright p {
    color: var(--color-text-muted);
    font-size: 0.9rem;
    margin: 0.25rem 0;
  }

  .footer-credit {
    font-size: 0.8rem !important;
    opacity: 0.7;
  }

  .footer-decoration {
    display: flex;
    justify-content: center;
  }

  .decoration-line {
    width: 100px;
    height: 2px;
    background: linear-gradient(90deg, transparent, var(--color-primary), transparent);
    opacity: 0.5;
  }
</style>
