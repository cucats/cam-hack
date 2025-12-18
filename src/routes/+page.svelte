<script>
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

<section class="hero-section">
  <Hero />
</section>

<section class="featured-section">
  <FeaturedProjects />
</section>

<section id="about" class="section-dark">
  <About />
</section>

<section class="sponsors-section">
  <Sponsors />
</section>

<section id="schedule" class="section-dark">
  <Schedule />
</section>

<section id="rules" class="section-alt">
  <Rules />
</section>

<section id="faq" class="section-dark">
  <FAQ />
</section>

<section class="section-alt">
  <Organisers />
</section>

<section class="footer-section">
  <div class="footer-content">
    <div class="footer-links">
      <a href="mailto:camhack@cucats.org" class="footer-link">Contact</a>
      <span class="footer-divider">•</span>
      <a href="/code-of-conduct" class="footer-link">Code of Conduct</a>
    </div>
    <div class="footer-credits">
      <p>Copyright © Cam Hack 2025</p>
      <p class="credit-art">Art by Gwen Sellers</p>
    </div>
  </div>
</section>

<style>
  section {
    position: relative;
  }

  .hero-section {
    background: transparent;
    padding: 0;
    min-height: 100vh;
    margin-top: -70px;
    padding-top: 70px;
  }

  .featured-section {
    background: linear-gradient(
      180deg,
      rgba(10, 15, 13, 0.95) 0%,
      rgba(13, 20, 16, 0.98) 100%
    );
    border-top: 1px solid rgba(0, 255, 136, 0.1);
  }

  .section-dark {
    background: rgba(10, 15, 13, 0.95);
  }

  .section-alt {
    background: rgba(13, 20, 16, 0.95);
  }

  .sponsors-section {
    background: linear-gradient(
      180deg,
      rgba(13, 20, 16, 0.95) 0%,
      rgba(10, 15, 13, 0.95) 100%
    );
    border-top: 1px solid rgba(0, 255, 136, 0.05);
    border-bottom: 1px solid rgba(0, 255, 136, 0.05);
  }

  .footer-section {
    background: linear-gradient(
      180deg,
      rgba(10, 15, 13, 0.95) 0%,
      rgba(5, 8, 6, 0.98) 100%
    );
    border-top: 1px solid rgba(0, 255, 136, 0.1);
    padding: 4rem 2rem;
  }

  .footer-content {
    max-width: 1280px;
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
    color: #00ffcc;
    text-decoration: none;
    font-weight: 600;
    transition: all 0.3s ease;
    padding: 0.5rem 1rem;
    border-radius: 8px;
  }

  .footer-link:hover {
    color: #00ff88;
    background: rgba(0, 255, 136, 0.1);
    text-shadow: 0 0 10px rgba(0, 255, 136, 0.5);
  }

  .footer-divider {
    color: rgba(0, 255, 136, 0.3);
  }

  .footer-credits {
    color: rgba(255, 255, 255, 0.5);
    font-size: 0.9rem;
  }

  .footer-credits p {
    margin: 0.5rem 0;
  }

  .credit-art {
    font-style: italic;
    color: rgba(255, 255, 255, 0.4);
  }
</style>
