<script>
  import { onMount } from "svelte";
  import Hero from "$lib/components/Hero.svelte";
  import Sponsors from "$lib/components/Sponsors.svelte";
  import About from "$lib/components/About.svelte";
  import Schedule from "$lib/components/Schedule.svelte";
  import Rules from "$lib/components/Rules.svelte";
  import FAQ from "$lib/components/FAQ.svelte";
  import Organisers from "$lib/components/Organisers.svelte";
  import ThreeBackdrop from "$lib/components/ThreeBackdrop.svelte";

  let daysSince = $state(0);

  const computeDaysSince = () => {
    const end = Date.UTC(2025, 10, 2, 18, 30, 0);
    const now = Date.now();
    const d = Math.floor((now - end) / 86400000);
    return Math.max(0, d);
  };

  onMount(() => {
    daysSince = computeDaysSince();
    const id = setInterval(() => {
      daysSince = computeDaysSince();
    }, 15 * 60 * 1000);
    return () => clearInterval(id);
  });

  const reveal = (node) => {
    node.dataset.reveal = "0";
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) node.dataset.reveal = "1";
      },
      { threshold: 0.12, rootMargin: "0px 0px -10% 0px" },
    );
    io.observe(node);
    return {
      destroy() {
        io.disconnect();
      },
    };
  };
</script>

<svelte:head>
  <title>Cam Hack 2025</title>
</svelte:head>

<div class="splash">
  <section class="hero-shell">
    <div class="hero-stage">
      <ThreeBackdrop />
      <div class="hero-scrim"></div>
      <div class="hero-content">
        <div class="hero-card" use:reveal>
          <Hero />
          <div class="since-wrap">
            <div class="since-card">
              <div class="since-number">{daysSince}</div>
              <div class="since-line">2nd&nbsp;November</div>
              <div class="since-line">Cam&nbsp;Hack&nbsp;2025</div>
            </div>
          </div>
        </div>
      </div>
      <div class="hero-glow"></div>
    </div>
  </section>

  <section class="section-shell" use:reveal>
    <div class="mx-auto max-w-7xl px-4 sm:px-8">
      <h1 class="py-8 text-center">Unintended Behaviour</h1>
      <div class="grid gap-6 lg:grid-cols-12">
        <a
          target="_blank"
          href="https://cam-hack-2025.devpost.com"
          class="card-surface lg:col-span-8"
        >
          <img
            src="/unintended.png"
            alt="Unintended Behaviour"
            class="m-0 block w-full rounded-[28px]"
          />
        </a>
        <div class="grid gap-6 lg:col-span-4">
          <a
            target="_blank"
            href="https://cam-hack-2025.devpost.com/project-gallery"
            class="card-surface p-6"
          >
            <img
              src="/cam-hack-theme.png"
              alt="Cam Hack 2025"
              class="m-0 block w-full rounded-2xl"
            />
          </a>
          <div class="card-surface deco-panel" aria-hidden="true"></div>
        </div>
      </div>
    </div>
  </section>

  <section class="section-shell section-white" use:reveal>
    <div class="card-frame">
      <Sponsors />
    </div>
  </section>

  <section id="about" class="section-shell" use:reveal>
    <div class="card-frame">
      <About />
    </div>
  </section>

  <section id="schedule" class="section-shell section-white" use:reveal>
    <div class="card-frame">
      <Schedule />
    </div>
  </section>

  <section id="rules" class="section-shell" use:reveal>
    <div class="card-frame">
      <Rules />
    </div>
  </section>

  <section id="faq" class="section-shell section-white" use:reveal>
    <div class="card-frame">
      <FAQ />
    </div>
  </section>

  <section class="section-shell" use:reveal>
    <div class="card-frame">
      <Organisers />
    </div>
  </section>
</div>

<style>
  .splash {
    background:
      radial-gradient(1200px 700px at 20% 10%, rgba(34, 197, 94, 0.25), transparent 55%),
      radial-gradient(900px 560px at 85% 20%, rgba(124, 58, 237, 0.22), transparent 58%),
      radial-gradient(900px 700px at 55% 85%, rgba(134, 230, 198, 0.18), transparent 56%),
      linear-gradient(180deg, #06110d 0%, #081713 35%, #060e0b 100%);
  }

  .hero-shell {
    position: relative;
    padding: 0;
    background: transparent;
  }

  .hero-stage {
    position: relative;
    min-height: calc(100svh - 60px);
    overflow: hidden;
  }

  .hero-scrim {
    position: absolute;
    inset: 0;
    background:
      radial-gradient(800px 480px at 30% 25%, rgba(0, 0, 0, 0.12), transparent 60%),
      radial-gradient(980px 680px at 70% 30%, rgba(0, 0, 0, 0.22), transparent 62%),
      linear-gradient(180deg, rgba(6, 15, 11, 0.42), rgba(6, 15, 11, 0.92));
    pointer-events: none;
  }

  .hero-content {
    position: relative;
    z-index: 2;
    padding: 28px 16px 44px;
    display: grid;
    place-items: center;
  }

  .hero-card {
    width: min(1100px, calc(100vw - 32px));
    border-radius: 30px;
    border: 1px solid rgba(255, 255, 255, 0.13);
    background: linear-gradient(
      180deg,
      rgba(255, 255, 255, 0.12),
      rgba(255, 255, 255, 0.06)
    );
    box-shadow:
      0 32px 80px rgba(0, 0, 0, 0.45),
      inset 0 1px 0 rgba(255, 255, 255, 0.15);
    backdrop-filter: blur(18px);
    -webkit-backdrop-filter: blur(18px);
    transform-style: preserve-3d;
    padding: 18px;
    color: rgba(255, 255, 255, 0.92);
  }

  .since-wrap {
    display: flex;
    justify-content: center;
    padding: 10px 0 2px;
  }

  .since-card {
    display: grid;
    justify-items: center;
    gap: 6px;
    padding: 12px 14px;
    border-radius: 22px;
    border: 1px solid rgba(134, 230, 198, 0.22);
    background: linear-gradient(
      180deg,
      rgba(6, 15, 11, 0.6),
      rgba(6, 15, 11, 0.25)
    );
    box-shadow:
      0 18px 50px rgba(0, 0, 0, 0.35),
      inset 0 1px 0 rgba(255, 255, 255, 0.1);
  }

  .since-number {
    font-size: clamp(44px, 8vw, 88px);
    line-height: 1;
    font-weight: 800;
    letter-spacing: -0.04em;
    background: linear-gradient(180deg, #d7ffe5, #22c55e 55%, #86e6c6);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    text-shadow: 0 0 22px rgba(34, 197, 94, 0.22);
  }

  .since-line {
    color: rgba(255, 255, 255, 0.85);
    font-weight: 600;
    letter-spacing: 0.01em;
  }

  .hero-glow {
    position: absolute;
    inset: -20%;
    background:
      conic-gradient(
        from 210deg,
        rgba(34, 197, 94, 0.0),
        rgba(34, 197, 94, 0.18),
        rgba(134, 230, 198, 0.14),
        rgba(124, 58, 237, 0.14),
        rgba(34, 197, 94, 0.0)
      );
    filter: blur(60px);
    opacity: 0.7;
    animation: glowSpin 14s linear infinite;
    pointer-events: none;
  }

  .section-shell {
    padding: 44px 0;
    background: transparent;
    color: rgba(255, 255, 255, 0.92);
  }

  .section-white {
    background: rgba(255, 255, 255, 0.04);
    border-top: 1px solid rgba(255, 255, 255, 0.08);
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  }

  .card-frame {
    width: min(1100px, calc(100vw - 32px));
    margin: 0 auto;
    border-radius: 30px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(255, 255, 255, 0.92);
    box-shadow: 0 24px 70px rgba(0, 0, 0, 0.28);
    padding: 18px;
  }

  :global(.card-frame h1),
  :global(.card-frame h2),
  :global(.card-frame h3),
  :global(.card-frame p),
  :global(.card-frame ul),
  :global(.card-frame li) {
    color: rgb(15 23 42);
  }

  .card-surface {
    border-radius: 30px;
    border: 1px solid rgba(255, 255, 255, 0.12);
    background: linear-gradient(
      180deg,
      rgba(255, 255, 255, 0.12),
      rgba(255, 255, 255, 0.06)
    );
    box-shadow:
      0 22px 70px rgba(0, 0, 0, 0.4),
      inset 0 1px 0 rgba(255, 255, 255, 0.12);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    transform-style: preserve-3d;
    transition:
      transform 600ms cubic-bezier(0.2, 0.9, 0.2, 1),
      box-shadow 600ms cubic-bezier(0.2, 0.9, 0.2, 1);
  }

  .card-surface:hover {
    transform: translateY(-6px) rotateX(1.2deg) rotateY(-1.2deg);
    box-shadow:
      0 34px 90px rgba(0, 0, 0, 0.48),
      0 0 0 1px rgba(34, 197, 94, 0.18) inset,
      0 0 60px rgba(34, 197, 94, 0.16);
  }

  .deco-panel {
    min-height: 220px;
    position: relative;
    overflow: hidden;
    padding: 0;
  }

  .deco-panel::before {
    content: "";
    position: absolute;
    inset: -40%;
    background:
      radial-gradient(closest-side at 30% 35%, rgba(34, 197, 94, 0.35), transparent 60%),
      radial-gradient(closest-side at 70% 30%, rgba(124, 58, 237, 0.3), transparent 62%),
      radial-gradient(closest-side at 55% 75%, rgba(134, 230, 198, 0.26), transparent 60%),
      conic-gradient(
        from 0deg,
        rgba(34, 197, 94, 0.0),
        rgba(34, 197, 94, 0.28),
        rgba(134, 230, 198, 0.22),
        rgba(124, 58, 237, 0.2),
        rgba(34, 197, 94, 0.0)
      );
    filter: blur(22px);
    opacity: 0.85;
    animation: decoSpin 10s linear infinite;
  }

  .deco-panel::after {
    content: "";
    position: absolute;
    inset: 0;
    background:
      radial-gradient(800px 220px at 50% 20%, rgba(255, 255, 255, 0.13), transparent 60%),
      linear-gradient(180deg, rgba(6, 15, 11, 0.1), rgba(6, 15, 11, 0.35));
    border-radius: 30px;
  }

  :global([data-reveal="0"]) {
    opacity: 0;
    transform: translateY(26px) scale(0.985);
    filter: blur(8px);
  }

  :global([data-reveal="1"]) {
    opacity: 1;
    transform: translateY(0) scale(1);
    filter: blur(0);
    transition:
      opacity 900ms cubic-bezier(0.2, 0.9, 0.2, 1),
      transform 900ms cubic-bezier(0.2, 0.9, 0.2, 1),
      filter 900ms cubic-bezier(0.2, 0.9, 0.2, 1);
  }

  @keyframes glowSpin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  @keyframes decoSpin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .hero-glow {
      animation: none;
    }
    .card-surface,
    .deco-panel::before {
      transition: none;
    }
    .deco-panel::before {
      animation: none;
    }
    :global([data-reveal="0"]),
    :global([data-reveal="1"]) {
      transition: none;
      transform: none;
      filter: none;
      opacity: 1;
    }
  }
</style>
