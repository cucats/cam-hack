<script>
  import Hero from "$lib/components/Hero.svelte";
  import Sponsors from "$lib/components/Sponsors.svelte";
  import About from "$lib/components/About.svelte";
  import Schedule from "$lib/components/Schedule.svelte";
  import Rules from "$lib/components/Rules.svelte";
  import FAQ from "$lib/components/FAQ.svelte";
  import Organisers from "$lib/components/Organisers.svelte";
  import Footer from "$lib/components/Footer.svelte";
</script>

<svelte:head>
  <title>Cam Hack 2025</title>
</svelte:head>

<section class="sm:p-8">
  <Hero />
</section>

<section class="unintended-section m-0">
  <div class="mx-auto max-w-7xl px-4 sm:px-8">
    <h1 class="py-8 text-center">Unintended Behaviour</h1>
    <a
      target="_blank"
      href="https://cam-hack-2025.devpost.com"
      class="featured-link block"
    >
      <img
        src="/unintended.png"
        alt="Unintended"
        class="featured-img m-0 block w-full rounded-3xl"
      />
    </a>
  </div>
</section>

<section class="sponsors-section">
  <Sponsors />
</section>

<section class="mb-8 px-0 md:p-4">
  <div class="mx-auto max-w-7xl">
    <a
      target="_blank"
      href="https://cam-hack-2025.devpost.com/project-gallery"
      class="featured-link block text-center"
    >
      <img
        class="featured-img w-full md:rounded-3xl md:shadow-2xl md:transition-all"
        src="/cam-hack-theme.png"
        alt="Turning Sci-fi into reality"
      />
    </a>
  </div>
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

<section>
  <Organisers />
</section>

<section class="theme-bg-gradient p-8">
  <Footer />
</section>

<style>
  section:nth-child(odd) {
    background-color: #fafafa;
  }

  section:nth-child(even) {
    background-color: #ffffff;
  }

  section.unintended-section {
    background-color: transparent !important;
    margin: 0 !important;
  }

  section.unintended-section img {
    margin: 0 !important;
    display: block;
  }

  section.sponsors-section {
    background-color: #ffffff !important;
  }

  .featured-link {
    position: relative;
    border-radius: 24px;
    transform-style: preserve-3d;
    perspective: 1200px;
    box-shadow:
      0 26px 70px rgba(6, 16, 12, 0.18),
      0 14px 36px rgba(6, 16, 12, 0.12);
    transition:
      transform 500ms cubic-bezier(0.2, 0.8, 0.2, 1),
      box-shadow 500ms cubic-bezier(0.2, 0.8, 0.2, 1),
      filter 500ms cubic-bezier(0.2, 0.8, 0.2, 1);
    filter: saturate(1.06) contrast(1.02);
  }

  .featured-link:before {
    content: "";
    position: absolute;
    inset: -2px;
    border-radius: 26px;
    background: conic-gradient(
      from 120deg,
      rgba(56, 242, 142, 0.7),
      rgba(134, 230, 198, 0.35),
      rgba(134, 226, 147, 0.6),
      rgba(56, 242, 142, 0.7)
    );
    filter: blur(18px);
    opacity: 0.35;
    z-index: -1;
    transition: opacity 500ms cubic-bezier(0.2, 0.8, 0.2, 1);
  }

  .featured-link:hover {
    transform: rotateX(4deg) rotateY(-6deg) translateY(-6px);
    box-shadow:
      0 36px 90px rgba(6, 16, 12, 0.22),
      0 18px 44px rgba(6, 16, 12, 0.16);
    filter: saturate(1.12) contrast(1.05);
  }

  .featured-link:hover:before {
    opacity: 0.55;
  }

  .featured-img {
    transform: translateZ(0);
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.12);
  }

  @media (prefers-reduced-motion: reduce) {
    .featured-link {
      transition: none;
    }
    .featured-link:hover {
      transform: none;
    }
  }
</style>
