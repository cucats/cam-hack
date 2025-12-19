<script>
  import SplashScene from "$lib/components/SplashScene.svelte";
  import Hero from "$lib/components/Hero.svelte";
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

<div class="splash-root">
  <div class="splash-bg" aria-hidden="true">
    <SplashScene />
    <div class="splash-vignette"></div>
    <div class="splash-grain"></div>
  </div>

  <section class="splash-section splash-hero sm:p-8">
    <div class="splash-panel">
      <Hero />
    </div>
  </section>

  <section class="splash-section unintended-section m-0">
    <div class="mx-auto max-w-7xl px-4 sm:px-8">
      <div class="splash-panel splash-panel-wide">
        <h1 class="py-8 text-center">Unintended Behaviour</h1>
        <a target="_blank" href="https://cam-hack-2025.devpost.com" class="block">
          <img
            src="/unintended.png"
            alt="Unintended"
            class="m-0 block w-full rounded-3xl"
          />
        </a>
        <div class="featured-grid">
          <a
            target="_blank"
            href="https://cam-hack-2025.devpost.com"
            class="featured-card"
          >
            <h3>Unintended Behaviour</h3>
            <p>Lorem ipsum dolor sit amet.</p>
          </a>
          <a
            target="_blank"
            href="https://cam-hack-2025.devpost.com"
            class="featured-card"
          >
            <h3>Lorem ipsum</h3>
            <p>Lorem ipsum dolor sit amet.</p>
          </a>
          <a
            target="_blank"
            href="https://cam-hack-2025.devpost.com"
            class="featured-card"
          >
            <h3>Lorem ipsum</h3>
            <p>Lorem ipsum dolor sit amet.</p>
          </a>
        </div>
      </div>
    </div>
  </section>

  <section class="splash-section sponsors-section">
    <div class="splash-panel">
      <Sponsors />
    </div>
  </section>

<!-- <section class="mb-8 px-0 md:p-4">
  <div class="mx-auto max-w-7xl">
    <a
      target="_blank"
      href="https://cam-hack-2025.devpost.com/project-gallery"
      class="text-center text-violet-700 hover:text-violet-800"
    >
      <img
        class="w-full md:rounded-3xl md:shadow-2xl md:transition-all md:hover:scale-[1.01]"
        src="/cam-hack-theme.png"
        alt="Turning Sci-fi into reality"
      />
    </a>
  </div>
</section> -->

  <section id="about" class="splash-section">
    <div class="splash-panel">
      <About />
    </div>
  </section>

  <section id="schedule" class="splash-section">
    <div class="splash-panel">
      <Schedule />
    </div>
  </section>

  <section id="rules" class="splash-section">
    <div class="splash-panel">
      <Rules />
    </div>
  </section>

  <section id="faq" class="splash-section">
    <div class="splash-panel">
      <FAQ />
    </div>
  </section>

  <section class="splash-section">
    <div class="splash-panel">
      <Organisers />
    </div>
  </section>
</div>

<style>
  .splash-root {
    position: relative;
    background: radial-gradient(
        1200px 800px at 20% 10%,
        rgba(70, 244, 138, 0.22),
        rgba(5, 8, 10, 0) 60%
      ),
      radial-gradient(
        900px 700px at 85% 20%,
        rgba(134, 230, 198, 0.18),
        rgba(5, 8, 10, 0) 55%
      ),
      linear-gradient(180deg, var(--splash-bg0), var(--splash-bg1));
    color: var(--splash-ink);
  }

  .splash-bg {
    position: fixed;
    inset: 0;
    z-index: 0;
    pointer-events: none;
  }

  .splash-vignette {
    position: absolute;
    inset: -10%;
    background: radial-gradient(
        900px 520px at 50% 22%,
        rgba(5, 8, 10, 0.15),
        rgba(5, 8, 10, 0.85) 70%
      ),
      radial-gradient(
        900px 900px at 50% 110%,
        rgba(5, 8, 10, 0.25),
        rgba(5, 8, 10, 0.92) 72%
      );
    filter: saturate(1.05);
  }

  .splash-grain {
    position: absolute;
    inset: 0;
    opacity: 0.16;
    mix-blend-mode: overlay;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='160' height='160' filter='url(%23n)' opacity='.55'/%3E%3C/svg%3E");
    background-size: 160px 160px;
  }

  .splash-section {
    position: relative;
    z-index: 1;
    padding: 26px 16px;
  }

  .splash-hero {
    padding-top: 34px;
    padding-bottom: 18px;
  }

  .splash-panel {
    max-width: 80rem;
    margin: 0 auto;
    background: var(--splash-panel);
    border: 1px solid var(--splash-panel-border);
    border-radius: 28px;
    box-shadow: var(--splash-shadow);
    backdrop-filter: blur(18px);
    -webkit-backdrop-filter: blur(18px);
    transform: translateZ(0);
    overflow: hidden;
    animation: panelIn 900ms cubic-bezier(0.2, 0.8, 0.2, 1) both;
  }

  .splash-panel-wide {
    border-radius: 32px;
  }

  .featured-grid {
    display: grid;
    grid-template-columns: repeat(1, minmax(0, 1fr));
    gap: 14px;
    padding: 16px;
  }

  .featured-card {
    display: block;
    padding: 16px 16px;
    border-radius: 18px;
    background: rgba(5, 8, 10, 0.35);
    border: 1px solid rgba(134, 230, 198, 0.16);
    box-shadow: 0 16px 50px rgba(0, 0, 0, 0.38);
    transform: translateZ(0);
    transition: transform 650ms cubic-bezier(0.2, 0.8, 0.2, 1),
      border-color 650ms cubic-bezier(0.2, 0.8, 0.2, 1),
      background 650ms cubic-bezier(0.2, 0.8, 0.2, 1);
  }

  .featured-card:hover {
    transform: translateY(-3px) scale(1.01);
    border-color: rgba(70, 244, 138, 0.26);
    background: rgba(7, 18, 16, 0.55);
  }

  @media (min-width: 640px) {
    .featured-grid {
      grid-template-columns: repeat(3, minmax(0, 1fr));
      padding: 18px 18px 20px;
    }
  }

  @keyframes panelIn {
    0% {
      opacity: 0;
      transform: translateY(14px) scale(0.985);
      filter: blur(6px);
    }
    100% {
      opacity: 1;
      transform: translateY(0) scale(1);
      filter: blur(0);
    }
  }

  :global(.splash-root a) {
    color: var(--splash-ink);
  }

  :global(.splash-root h1),
  :global(.splash-root h2),
  :global(.splash-root h3),
  :global(.splash-root h4),
  :global(.splash-root h5),
  :global(.splash-root h6),
  :global(.splash-root p),
  :global(.splash-root li) {
    color: var(--splash-ink);
  }

  :global(.splash-root p),
  :global(.splash-root li) {
    color: var(--splash-ink-dim);
  }

  section.unintended-section {
    background-color: transparent !important;
    margin: 0 !important;
  }

  section.unintended-section img {
    margin: 0 !important;
    display: block;
    box-shadow: 0 22px 90px rgba(0, 0, 0, 0.55);
    transition: transform 700ms cubic-bezier(0.2, 0.8, 0.2, 1),
      filter 700ms cubic-bezier(0.2, 0.8, 0.2, 1);
    filter: saturate(1.05) contrast(1.05);
  }

  section.unintended-section a:hover img {
    transform: scale(1.015);
    filter: saturate(1.15) contrast(1.08);
  }

  :global(.splash-root a.theme-hyperlink) {
    color: var(--splash-green);
  }

  :global(.splash-root a.theme-hyperlink:hover) {
    color: var(--splash-mint);
  }

  :global(.splash-root nav a.hover\:text-emerald-600:hover) {
    color: var(--splash-green);
  }

  @media (prefers-reduced-motion: reduce) {
    .splash-panel {
      animation: none;
    }
    section.unintended-section img {
      transition: none;
    }
  }
</style>
