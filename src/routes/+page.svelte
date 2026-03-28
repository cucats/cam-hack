<script>
  import { onMount } from "svelte";
  import { tweened } from "svelte/motion";
  import { cubicOut } from "svelte/easing";

  import Hero from "$lib/components/Hero.svelte";
  import Sponsors from "$lib/components/Sponsors.svelte";
  import About from "$lib/components/About.svelte";
  import Schedule from "$lib/components/Schedule.svelte";
  import Rules from "$lib/components/Rules.svelte";
  import FAQ from "$lib/components/FAQ.svelte";
  import Organisers from "$lib/components/Organisers.svelte";
  import ThreeBackdrop from "$lib/components/ThreeBackdrop.svelte";

  let revealTargets = [];
  let revealIO;

  const reveal = (node) => {
    revealTargets.push(node);
    if (revealIO) revealIO.observe(node);
    return {
      destroy() {
        revealTargets = revealTargets.filter((n) => n !== node);
        if (revealIO) revealIO.unobserve(node);
      },
    };
  };

  const daysSince = tweened(0, { duration: 1300, easing: cubicOut });

  const calcDaysSince = () => {
    const eventEnd = Date.UTC(2025, 10, 2, 0, 0, 0, 0);
    const now = Date.now();
    const diff = now - eventEnd;
    return Math.max(0, Math.floor(diff / 86400000));
  };

  onMount(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    revealIO = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            revealIO.unobserve(e.target);
          }
        }
      },
      { threshold: 0.12 },
    );

    for (const n of revealTargets) revealIO.observe(n);

    daysSince.set(calcDaysSince());
    const timer = setInterval(() => {
      daysSince.set(calcDaysSince(), { duration: reduced ? 0 : 700 });
    }, 3600000);

    return () => {
      clearInterval(timer);
      if (revealIO) revealIO.disconnect();
    };
  });
</script>

<svelte:head>
  <title>Cam Hack 2025</title>
</svelte:head>

<section class="splash">
  <div class="splash-frame">
    <ThreeBackdrop />
    <div class="splash-vignette"></div>
    <div class="splash-grid">
      <div class="hero-shell reveal" use:reveal>
        <Hero />
      </div>
      <div class="days-shell reveal" use:reveal>
        <div class="days-card">
          <div class="days-number">{Math.floor($daysSince)}</div>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="featured">
  <div class="mx-auto max-w-7xl px-4 sm:px-8">
    <div class="featured-grid">
      <div class="featured-card reveal" use:reveal>
        <h1 class="py-8 text-center">Unintended Behaviour</h1>
        <a target="_blank" href="https://cam-hack-2025.devpost.com" class="block">
          <img
            src="/unintended.png"
            alt="Unintended"
            class="m-0 block w-full rounded-3xl"
          />
        </a>
      </div>
      <div class="featured-card reveal" use:reveal>
        <a target="_blank" href="https://cam-hack-2025.devpost.com/project-gallery" class="block">
          <img
            class="m-0 block w-full rounded-3xl"
            src="/cam-hack-theme.png"
            alt="Turning Sci-fi into reality"
          />
        </a>
      </div>
    </div>
  </div>
</section>

<section class="stack" id="sponsors">
  <div class="stack-card reveal" use:reveal>
    <Sponsors />
  </div>
</section>

<section class="stack" id="about">
  <div class="stack-card reveal" use:reveal>
    <About />
  </div>
</section>

<section class="stack" id="schedule">
  <div class="stack-card reveal" use:reveal>
    <Schedule />
  </div>
</section>

<section class="stack" id="rules">
  <div class="stack-card reveal" use:reveal>
    <Rules />
  </div>
</section>

<section class="stack" id="faq">
  <div class="stack-card reveal" use:reveal>
    <FAQ />
  </div>
</section>

<section class="stack">
  <div class="stack-card reveal" use:reveal>
    <Organisers />
  </div>
</section>

<style>
  .splash {
    padding: 0;
  }

  .splash-frame {
    position: relative;
    min-height: min(92vh, 980px);
    border-radius: 28px;
    overflow: hidden;
    margin: 16px;
    background: radial-gradient(
        900px 600px at 80% 10%,
        rgba(0, 255, 136, 0.28),
        transparent 60%
      ),
      radial-gradient(900px 700px at 5% 30%, rgba(106, 92, 255, 0.18), transparent 55%),
      linear-gradient(180deg, rgba(7, 17, 12, 0.92), rgba(7, 17, 12, 0.82));
    box-shadow:
      0 22px 80px rgba(7, 17, 12, 0.35),
      inset 0 1px 0 rgba(255, 255, 255, 0.12);
  }

  .splash-vignette {
    position: absolute;
    inset: 0;
    pointer-events: none;
    background:
      radial-gradient(900px 700px at 60% 40%, transparent 40%, rgba(7, 17, 12, 0.75) 100%),
      linear-gradient(180deg, rgba(7, 17, 12, 0.55), rgba(7, 17, 12, 0.85));
    mix-blend-mode: multiply;
  }

  .splash-grid {
    position: relative;
    z-index: 2;
    height: 100%;
    width: 100%;
    display: grid;
    align-items: center;
    grid-template-columns: 1fr;
    gap: 18px;
    padding: 28px;
  }

  @media (min-width: 960px) {
    .splash-grid {
      grid-template-columns: 1.35fr 0.65fr;
      gap: 26px;
      padding: 44px;
    }
  }

  .hero-shell {
    position: relative;
    border-radius: 28px;
    background: linear-gradient(180deg, rgba(255, 255, 255, 0.94), rgba(255, 255, 255, 0.78));
    box-shadow:
      0 16px 60px rgba(0, 0, 0, 0.25),
      inset 0 1px 0 rgba(255, 255, 255, 0.75);
    backdrop-filter: blur(18px);
    border: 1px solid rgba(134, 230, 198, 0.35);
    padding: 18px;
    transform-style: preserve-3d;
  }

  @media (min-width: 640px) {
    .hero-shell {
      padding: 26px;
    }
  }

  .days-shell {
    display: flex;
    justify-content: flex-start;
  }

  @media (min-width: 960px) {
    .days-shell {
      justify-content: flex-end;
    }
  }

  .days-card {
    width: min(240px, 100%);
    border-radius: 24px;
    background: linear-gradient(135deg, rgba(0, 255, 136, 0.22), rgba(106, 92, 255, 0.16));
    border: 1px solid rgba(0, 255, 136, 0.35);
    box-shadow:
      0 16px 60px rgba(0, 0, 0, 0.28),
      inset 0 1px 0 rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(18px);
    padding: 22px 20px;
  }

  .days-number {
    font-family: var(--font-display);
    font-weight: 700;
    font-size: 56px;
    line-height: 1;
    letter-spacing: -0.04em;
    color: rgba(234, 255, 242, 0.96);
    text-shadow:
      0 10px 40px rgba(0, 255, 136, 0.28),
      0 18px 70px rgba(106, 92, 255, 0.22);
  }

  .featured {
    padding: 0;
    margin-top: 12px;
    margin-bottom: 24px;
  }

  .featured-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 18px;
  }

  @media (min-width: 960px) {
    .featured-grid {
      grid-template-columns: 1fr 1fr;
      gap: 22px;
    }
  }

  .featured-card {
    border-radius: 28px;
    padding: 18px;
    background:
      radial-gradient(800px 600px at 70% 10%, rgba(0, 255, 136, 0.16), transparent 55%),
      radial-gradient(900px 700px at 10% 70%, rgba(106, 92, 255, 0.12), transparent 55%),
      linear-gradient(180deg, rgba(255, 255, 255, 0.92), rgba(255, 255, 255, 0.78));
    border: 1px solid rgba(134, 230, 198, 0.35);
    box-shadow:
      0 18px 70px rgba(7, 17, 12, 0.14),
      inset 0 1px 0 rgba(255, 255, 255, 0.7);
    transition: transform 700ms cubic-bezier(0.16, 1, 0.3, 1), box-shadow 700ms cubic-bezier(0.16, 1, 0.3, 1);
  }

  .featured-card:hover {
    transform: translateY(-6px) scale(1.01);
    box-shadow:
      0 22px 90px rgba(7, 17, 12, 0.18),
      0 18px 70px rgba(0, 255, 136, 0.12),
      inset 0 1px 0 rgba(255, 255, 255, 0.72);
  }

  .stack {
    padding: 0;
    margin: 18px 0;
  }

  .stack-card {
    max-width: 80rem;
    margin: 0 auto;
    border-radius: 28px;
    background: rgba(255, 255, 255, 0.86);
    border: 1px solid rgba(0, 255, 136, 0.14);
    box-shadow:
      0 22px 80px rgba(7, 17, 12, 0.09),
      inset 0 1px 0 rgba(255, 255, 255, 0.7);
    backdrop-filter: blur(14px);
    padding: 18px;
  }

  @media (min-width: 640px) {
    .stack-card {
      padding: 26px;
    }
  }

  .stack-card :global(h2),
  .stack-card :global(h3),
  .stack-card :global(h4) {
    text-shadow: 0 10px 60px rgba(0, 255, 136, 0.08);
  }

  .stack-card :global(a.theme-hyperlink) {
    text-decoration: none;
    background-image: linear-gradient(90deg, rgba(0, 255, 136, 0.35), rgba(34, 211, 238, 0.22));
    background-size: 100% 2px;
    background-repeat: no-repeat;
    background-position: 0 100%;
  }

  .stack-card :global(a.theme-hyperlink:hover) {
    background-image: linear-gradient(90deg, rgba(0, 255, 136, 0.55), rgba(34, 211, 238, 0.35));
  }

  .reveal {
    opacity: 0;
    transform: translateY(18px) scale(0.985);
    filter: blur(10px);
  }

  :global(.reveal.is-visible) {
    opacity: 1;
    transform: translateY(0) scale(1);
    filter: blur(0);
    transition:
      opacity 900ms cubic-bezier(0.16, 1, 0.3, 1),
      transform 900ms cubic-bezier(0.16, 1, 0.3, 1),
      filter 900ms cubic-bezier(0.16, 1, 0.3, 1);
  }

  @media (prefers-reduced-motion: reduce) {
    .featured-card,
    :global(.reveal.is-visible) {
      transition: none !important;
    }

    .featured-card:hover {
      transform: none;
    }
  }
</style>
