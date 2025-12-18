<script>
  import { onMount } from "svelte";
  import Hero from "$lib/components/Hero.svelte";
  import Sponsors from "$lib/components/Sponsors.svelte";
  import About from "$lib/components/About.svelte";
  import Schedule from "$lib/components/Schedule.svelte";
  import Rules from "$lib/components/Rules.svelte";
  import FAQ from "$lib/components/FAQ.svelte";
  import Organisers from "$lib/components/Organisers.svelte";
  import Footer from "$lib/components/Footer.svelte";
  import ThreeBackdrop from "$lib/components/ThreeBackdrop.svelte";

  let daysSince = 0;

  onMount(() => {
    const eventEndUtc = Date.UTC(2025, 10, 2, 0, 0, 0, 0);
    daysSince = Math.max(0, Math.floor((Date.now() - eventEndUtc) / 86400000));

    const targets = Array.from(document.querySelectorAll("[data-reveal]"));
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          e.target.classList.add("is-revealed");
          io.unobserve(e.target);
        }
      },
      { rootMargin: "-10% 0px -10% 0px", threshold: 0.12 }
    );

    for (const el of targets) io.observe(el);

    return () => io.disconnect();
  });
</script>

<svelte:head>
  <title>Cam Hack 2025</title>
</svelte:head>

<div class="page-bg">
  <section class="hero-shell">
    <div class="hero-backdrop" aria-hidden="true">
      <ThreeBackdrop quality={1} />
    </div>
    <div class="hero-vignette" aria-hidden="true"></div>
    <div class="hero-content" data-reveal>
      <div class="days-badge" aria-hidden="true">{daysSince}</div>
      <Hero />
    </div>
  </section>

  <section class="section-pad" data-reveal>
    <div class="unintended-panel">
      <div class="mx-auto max-w-7xl px-4 sm:px-8">
        <h1 class="py-8 text-center">Unintended Behaviour</h1>
        <a target="_blank" href="https://cam-hack-2025.devpost.com" class="block">
          <img
            src="/unintended.png"
            alt="Unintended"
            class="m-0 block w-full rounded-3xl"
          />
        </a>
      </div>
    </div>
  </section>

  <section class="section-pad" data-reveal>
    <div class="panel">
      <Sponsors />
    </div>
  </section>

  <section id="about" class="section-pad" data-reveal>
    <div class="panel">
      <About />
    </div>
  </section>

  <section id="schedule" class="section-pad" data-reveal>
    <div class="panel">
      <Schedule />
    </div>
  </section>

  <section id="rules" class="section-pad" data-reveal>
    <div class="panel">
      <Rules />
    </div>
  </section>

  <section id="faq" class="section-pad" data-reveal>
    <div class="panel">
      <FAQ />
    </div>
  </section>

  <section class="section-pad" data-reveal>
    <div class="panel">
      <Organisers />
    </div>
  </section>

  <section class="section-pad" data-reveal>
    <div class="panel footer-panel">
      <Footer />
    </div>
  </section>
</div>

<style>
  .page-bg {
    background:
      radial-gradient(
        900px 620px at 20% 10%,
        rgba(43, 255, 121, 0.18),
        transparent 60%
      ),
      radial-gradient(
        900px 680px at 85% 20%,
        rgba(125, 247, 255, 0.13),
        transparent 55%
      ),
      radial-gradient(
        900px 700px at 50% 90%,
        rgba(134, 230, 198, 0.1),
        transparent 55%
      ),
      linear-gradient(180deg, #05070a 0%, #070b10 45%, #070a0f 100%);
    color: #e8f2ee;
  }

  .hero-shell {
    position: relative;
    min-height: calc(100svh - 72px);
    padding: clamp(16px, 4vw, 36px);
    display: grid;
    place-items: center;
    overflow: hidden;
  }

  .hero-backdrop {
    position: absolute;
    inset: -1px;
  }

  .hero-vignette {
    position: absolute;
    inset: 0;
    background:
      radial-gradient(
        900px 600px at 30% 30%,
        rgba(0, 0, 0, 0.12),
        rgba(0, 0, 0, 0.86)
      ),
      linear-gradient(180deg, rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.85));
    pointer-events: none;
  }

  .hero-content {
    position: relative;
    width: min(1100px, 100%);
    border-radius: 32px;
    padding: clamp(18px, 3vw, 34px);
    isolation: isolate;
    background: linear-gradient(
      180deg,
      rgba(7, 10, 14, 0.62),
      rgba(7, 10, 14, 0.35)
    );
    border: 1px solid rgba(43, 255, 121, 0.16);
    box-shadow:
      0 30px 100px rgba(0, 0, 0, 0.65),
      0 0 0 1px rgba(125, 247, 255, 0.06) inset;
    backdrop-filter: blur(14px);
    transform: translateY(14px) scale(0.985);
    opacity: 0;
    transition:
      opacity 900ms cubic-bezier(0.22, 1, 0.36, 1),
      transform 1000ms cubic-bezier(0.22, 1, 0.36, 1);
  }

  .hero-content::before {
    content: "";
    position: absolute;
    inset: -1px;
    border-radius: 32px;
    background: conic-gradient(
      from 180deg,
      rgba(43, 255, 121, 0.0),
      rgba(43, 255, 121, 0.32),
      rgba(125, 247, 255, 0.24),
      rgba(43, 255, 121, 0.0)
    );
    opacity: 0.75;
    filter: blur(0.2px);
    mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
    -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
    mask-composite: exclude;
    -webkit-mask-composite: xor;
    padding: 1px;
    pointer-events: none;
    animation: orbit 8.5s linear infinite;
  }

  :global(.hero-content.is-revealed) {
    opacity: 1;
    transform: translateY(0) scale(1);
  }

  @keyframes orbit {
    to {
      transform: rotate(360deg);
    }
  }

  .days-badge {
    position: absolute;
    top: 14px;
    right: 14px;
    width: 62px;
    height: 62px;
    border-radius: 18px;
    display: grid;
    place-items: center;
    font-weight: 700;
    letter-spacing: -0.04em;
    color: rgba(6, 32, 22, 0.95);
    background: linear-gradient(
      120deg,
      rgba(43, 255, 121, 0.92),
      rgba(125, 247, 255, 0.72)
    );
    box-shadow:
      0 18px 60px rgba(0, 0, 0, 0.55),
      0 0 0 1px rgba(255, 255, 255, 0.22) inset;
    user-select: none;
  }

  :global(.hero-content h1),
  :global(.hero-content h3),
  :global(.hero-content p) {
    color: #f2fbf7;
    text-shadow: 0 12px 40px rgba(0, 0, 0, 0.65);
  }

  :global(.hero-content a) {
    box-shadow:
      0 18px 55px rgba(0, 0, 0, 0.5),
      0 0 0 1px rgba(255, 255, 255, 0.12) inset;
  }

  .section-pad {
    padding: clamp(18px, 3.4vw, 36px);
  }

  .panel {
    border-radius: 32px;
    padding: clamp(18px, 3.2vw, 34px);
    background: linear-gradient(
      180deg,
      rgba(13, 17, 23, 0.84),
      rgba(13, 17, 23, 0.6)
    );
    border: 1px solid rgba(125, 247, 255, 0.09);
    box-shadow:
      0 22px 90px rgba(0, 0, 0, 0.5),
      0 0 0 1px rgba(43, 255, 121, 0.06) inset;
    backdrop-filter: blur(10px);
    transform: translateY(18px);
    opacity: 0;
    transition:
      opacity 750ms cubic-bezier(0.22, 1, 0.36, 1),
      transform 900ms cubic-bezier(0.22, 1, 0.36, 1);
  }

  :global([data-reveal].is-revealed .panel) {
    opacity: 1;
    transform: translateY(0);
  }

  .unintended-panel {
    border-radius: 40px;
    padding: 1px;
    background: linear-gradient(
      120deg,
      rgba(43, 255, 121, 0.3),
      rgba(125, 247, 255, 0.12),
      rgba(43, 255, 121, 0.08)
    );
    box-shadow:
      0 30px 110px rgba(0, 0, 0, 0.55),
      0 0 0 1px rgba(43, 255, 121, 0.08) inset;
    transform: translateY(18px);
    opacity: 0;
    transition:
      opacity 750ms cubic-bezier(0.22, 1, 0.36, 1),
      transform 900ms cubic-bezier(0.22, 1, 0.36, 1);
  }

  :global([data-reveal].is-revealed .unintended-panel) {
    opacity: 1;
    transform: translateY(0);
  }

  .unintended-panel > div {
    border-radius: 39px;
    background: linear-gradient(
      180deg,
      rgba(7, 10, 14, 0.72),
      rgba(7, 10, 14, 0.42)
    );
    border: 1px solid rgba(255, 255, 255, 0.06);
    overflow: hidden;
  }

  :global(.page-bg section) {
    margin: 0;
  }

  :global(.page-bg h1),
  :global(.page-bg h2),
  :global(.page-bg h3),
  :global(.page-bg h4),
  :global(.page-bg p),
  :global(.page-bg li) {
    color: rgba(232, 242, 238, 0.96);
  }

  :global(.page-bg a.theme-hyperlink) {
    color: rgba(43, 255, 121, 0.9);
  }

  :global(.page-bg a.theme-hyperlink:hover) {
    color: rgba(43, 255, 121, 1);
  }

  .footer-panel {
    background: linear-gradient(
      120deg,
      rgba(134, 226, 147, 0.12),
      rgba(134, 230, 198, 0.08),
      rgba(13, 17, 23, 0.74)
    );
    border: 1px solid rgba(43, 255, 121, 0.14);
  }
</style>
