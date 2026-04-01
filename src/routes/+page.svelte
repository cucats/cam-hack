<script>
  import Hero from "$lib/components/Hero.svelte";
  import Sponsors from "$lib/components/Sponsors.svelte";
  import About from "$lib/components/About.svelte";
  import Schedule from "$lib/components/Schedule.svelte";
  import Rules from "$lib/components/Rules.svelte";
  import FAQ from "$lib/components/FAQ.svelte";
  import Organisers from "$lib/components/Organisers.svelte";
  import CamHackScene from "$lib/components/CamHackScene.svelte";
  import DaysSince from "$lib/components/DaysSince.svelte";
</script>

<svelte:head>
  <title>Cam Hack 2025</title>
</svelte:head>

<div class="splash-root">
  <div class="splash-bg" aria-hidden="true">
    <div class="splash-canvas">
      <CamHackScene />
    </div>
    <div class="splash-vignette"></div>
    <div class="splash-grid"></div>
  </div>

  <section class="splash-hero">
    <div class="hero-frame">
      <div class="hero-sheen"></div>
      <div class="hero-inner">
        <Hero />
        <div class="days-chip">
          <DaysSince endDateUtc="2025-11-02" />
        </div>
      </div>
    </div>
  </section>

  <section class="splash-feature">
    <div class="mx-auto max-w-7xl">
      <h1 class="py-8 text-center">Unintended Behaviour</h1>
      <div class="feature-grid">
        <a target="_blank" href="https://cam-hack-2025.devpost.com" class="feature-card">
          <img src="/unintended.png" alt="Unintended" class="feature-img" />
        </a>
        <a
          target="_blank"
          href="https://cam-hack-2025.devpost.com/project-gallery"
          class="feature-card"
        >
          <img
            class="feature-img"
            src="/cam-hack-theme.png"
            alt="Cam Hack 2025"
          />
        </a>
      </div>
    </div>
  </section>

  <section class="splash-card">
    <Sponsors />
  </section>

  <section id="about" class="splash-card">
    <About />
  </section>

  <section id="schedule" class="splash-card">
    <Schedule />
  </section>

  <section id="rules" class="splash-card">
    <Rules />
  </section>

  <section id="faq" class="splash-card">
    <FAQ />
  </section>

  <section class="splash-card">
    <Organisers />
  </section>
</div>

<style>
  .splash-root {
    position: relative;
    isolation: isolate;
    background: radial-gradient(1200px 900px at 15% 10%, rgba(134, 226, 147, 0.22), transparent 60%),
      radial-gradient(900px 700px at 85% 20%, rgba(134, 230, 198, 0.18), transparent 55%),
      linear-gradient(180deg, #03110b 0%, #050e0c 38%, #07120e 100%);
  }

  .splash-bg {
    position: fixed;
    inset: 0;
    z-index: -1;
    pointer-events: none;
  }

  .splash-canvas {
    position: absolute;
    inset: 0;
    filter: saturate(1.1) contrast(1.05);
    transform: translateZ(0);
  }

  .splash-vignette {
    position: absolute;
    inset: 0;
    background:
      radial-gradient(1200px 900px at 50% 20%, rgba(0, 0, 0, 0.10), rgba(0, 0, 0, 0.75) 70%),
      linear-gradient(180deg, rgba(3, 17, 11, 0.25), rgba(3, 17, 11, 0.92));
  }

  .splash-grid {
    position: absolute;
    inset: 0;
    opacity: 0.18;
    background-image: linear-gradient(rgba(134, 226, 147, 0.14) 1px, transparent 1px),
      linear-gradient(90deg, rgba(134, 226, 147, 0.14) 1px, transparent 1px);
    background-size: 110px 110px;
    mask-image: radial-gradient(900px 520px at 50% 10%, black 15%, transparent 70%);
  }

  .splash-hero {
    padding: 3.5rem 1rem 2rem;
  }

  .hero-frame {
    position: relative;
    margin: 0 auto;
    max-width: 80rem;
    border-radius: 2rem;
    background: radial-gradient(900px 520px at 30% 10%, rgba(134, 226, 147, 0.14), transparent 60%),
      radial-gradient(900px 520px at 70% 20%, rgba(134, 230, 198, 0.10), transparent 55%),
      rgba(255, 255, 255, 0.06);
    border: 1px solid rgba(134, 226, 147, 0.24);
    box-shadow:
      0 60px 140px rgba(0, 0, 0, 0.55),
      0 0 0 1px rgba(255, 255, 255, 0.04) inset,
      0 0 120px rgba(134, 226, 147, 0.22);
    backdrop-filter: blur(18px);
    overflow: hidden;
    animation: drift 9s ease-in-out infinite;
  }

  .hero-sheen {
    position: absolute;
    inset: -40%;
    background: conic-gradient(
      from 180deg,
      transparent 0deg,
      rgba(134, 226, 147, 0.12) 70deg,
      rgba(134, 230, 198, 0.12) 120deg,
      transparent 160deg,
      transparent 360deg
    );
    animation: sheen 6s linear infinite;
    filter: blur(14px);
    opacity: 0.85;
    transform: translateZ(0);
  }

  .hero-inner {
    position: relative;
    padding: 2rem 1.5rem;
    color: rgba(240, 253, 250, 0.92);
  }

  .hero-inner :global(h1),
  .hero-inner :global(h2),
  .hero-inner :global(h3) {
    font-family: var(--font-display);
    color: rgba(240, 253, 250, 0.96);
    text-shadow: 0 18px 70px rgba(0, 0, 0, 0.55);
  }

  .hero-inner :global(p),
  .hero-inner :global(li) {
    color: rgba(226, 255, 244, 0.86);
  }

  .days-chip {
    display: inline-flex;
    margin-top: 0.5rem;
    padding: 0.65rem 1rem;
    border-radius: 999px;
    background: rgba(3, 17, 11, 0.55);
    border: 1px solid rgba(134, 226, 147, 0.26);
    box-shadow:
      0 12px 40px rgba(0, 0, 0, 0.45),
      0 0 70px rgba(134, 226, 147, 0.18);
    font-family: var(--font-display);
    font-size: 1.25rem;
    letter-spacing: 0.02em;
  }

  .splash-feature {
    padding: 0 1rem 2.25rem;
  }

  .splash-feature :global(h1) {
    font-family: var(--font-display);
    color: rgba(240, 253, 250, 0.96);
    text-shadow: 0 18px 70px rgba(0, 0, 0, 0.55);
  }

  .feature-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .feature-card {
    position: relative;
    display: block;
    border-radius: 1.75rem;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(134, 226, 147, 0.18);
    box-shadow:
      0 40px 90px rgba(0, 0, 0, 0.55),
      0 0 90px rgba(134, 230, 198, 0.10);
    overflow: hidden;
    transform: translateZ(0);
    transition: transform 380ms cubic-bezier(0.2, 0.9, 0.2, 1), box-shadow 380ms;
  }

  .feature-card:hover {
    transform: translateY(-6px) scale(1.01);
    box-shadow:
      0 60px 130px rgba(0, 0, 0, 0.62),
      0 0 120px rgba(134, 226, 147, 0.18);
  }

  .feature-card::after {
    content: "";
    position: absolute;
    inset: -40%;
    background: radial-gradient(circle at 30% 20%, rgba(134, 226, 147, 0.24), transparent 55%),
      radial-gradient(circle at 70% 70%, rgba(134, 230, 198, 0.18), transparent 60%);
    opacity: 0;
    transition: opacity 380ms;
  }

  .feature-card:hover::after {
    opacity: 1;
  }

  .feature-img {
    display: block;
    width: 100%;
    border-radius: 1.75rem;
  }

  .splash-card {
    margin: 0 auto 1.5rem;
    max-width: 80rem;
    border-radius: 2rem;
    background: rgba(255, 255, 255, 0.06);
    border: 1px solid rgba(134, 226, 147, 0.14);
    box-shadow:
      0 40px 120px rgba(0, 0, 0, 0.52),
      0 0 90px rgba(134, 226, 147, 0.08);
    backdrop-filter: blur(16px);
  }

  .splash-card :global(h2),
  .splash-card :global(h3),
  .splash-card :global(h4) {
    font-family: var(--font-display);
    color: rgba(240, 253, 250, 0.96);
  }

  .splash-card :global(p),
  .splash-card :global(li) {
    color: rgba(226, 255, 244, 0.86);
  }

  .splash-card :global(a) {
    color: rgba(134, 226, 147, 0.92);
  }

  @media (min-width: 640px) {
    .splash-hero {
      padding: 5rem 2rem 2.5rem;
    }
    .hero-inner {
      padding: 2.75rem 2.5rem;
    }
    .feature-grid {
      grid-template-columns: 1fr 1fr;
    }
    .splash-feature {
      padding: 0 2rem 2.75rem;
    }
    .splash-card {
      margin: 0 auto 2rem;
    }
  }

  @keyframes sheen {
    0% {
      transform: rotate(0deg) translateZ(0);
    }
    100% {
      transform: rotate(360deg) translateZ(0);
    }
  }

  @keyframes drift {
    0% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(-8px);
    }
    100% {
      transform: translateY(0px);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .hero-frame,
    .hero-sheen,
    .feature-card {
      animation: none !important;
      transition: none !important;
    }
  }
</style>
