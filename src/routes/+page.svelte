<script>
  import { onMount } from "svelte";

  import Hero from "$lib/components/Hero.svelte";
  import Sponsors from "$lib/components/Sponsors.svelte";
  import About from "$lib/components/About.svelte";
  import Schedule from "$lib/components/Schedule.svelte";
  import Rules from "$lib/components/Rules.svelte";
  import FAQ from "$lib/components/FAQ.svelte";
  import Organisers from "$lib/components/Organisers.svelte";

  onMount(() => {
    const els = Array.from(document.querySelectorAll(".reveal"));

    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.setAttribute("data-in", "true");
            obs.unobserve(e.target);
          }
        }
      },
      { threshold: 0.18, rootMargin: "-8% 0px -10% 0px" }
    );

    for (const el of els) obs.observe(el);

    return () => obs.disconnect();
  });
</script>

<svelte:head>
  <title>Cam Hack 2025</title>
</svelte:head>

<div class="home">
  <section class="hero-section">
    <Hero />
  </section>

  <section class="feature-section reveal" data-in="false">
    <div class="mx-auto max-w-7xl px-4 sm:px-8">
      <h1 class="py-8 text-center">Unintended Behaviour</h1>
      <a target="_blank" href="https://cam-hack-2025.devpost.com" class="feature-card block">
        <img src="/unintended.png" alt="Unintended" class="feature-img m-0 block w-full" />
      </a>
    </div>
  </section>

  <section class="panel panel-plain reveal" data-in="false">
    <Sponsors />
  </section>

  <section id="about" class="panel reveal" data-in="false">
    <About />
  </section>

  <section id="schedule" class="panel reveal" data-in="false">
    <Schedule />
  </section>

  <section id="rules" class="panel reveal" data-in="false">
    <Rules />
  </section>

  <section id="faq" class="panel reveal" data-in="false">
    <FAQ />
  </section>

  <section class="panel reveal" data-in="false">
    <Organisers />
  </section>
</div>

<style>
  .home {
    position: relative;
    background:
      radial-gradient(1200px 700px at 10% -10%, rgba(45, 252, 122, 0.18), rgba(0, 0, 0, 0)),
      radial-gradient(900px 650px at 90% 10%, rgba(134, 230, 198, 0.12), rgba(0, 0, 0, 0)),
      radial-gradient(1200px 900px at 40% 90%, rgba(22, 163, 74, 0.12), rgba(0, 0, 0, 0)),
      linear-gradient(180deg, #05070a, #070a0e 45%, #05070a);
    color: rgba(248, 250, 252, 0.88);
  }

  .home :global(h1),
  .home :global(h2),
  .home :global(h3),
  .home :global(h4),
  .home :global(h5),
  .home :global(h6) {
    font-family: var(--font-display);
    letter-spacing: -0.02em;
    color: rgba(248, 250, 252, 0.94);
  }

  .home :global(p),
  .home :global(ul),
  .home :global(li) {
    color: rgba(226, 232, 240, 0.9);
  }

  .hero-section {
    padding: clamp(0.5rem, 2vw, 2rem);
  }

  .panel {
    margin: clamp(0.75rem, 2vw, 1.5rem);
    padding: clamp(1.25rem, 3vw, 2.25rem);
    border-radius: 2rem;
    background: linear-gradient(180deg, rgba(255, 255, 255, 0.06), rgba(255, 255, 255, 0.02));
    box-shadow:
      0 40px 120px rgba(0, 0, 0, 0.35),
      0 0 0 1px rgba(134, 230, 198, 0.16) inset;
    backdrop-filter: blur(10px);
    transform: translateZ(0);
  }

  .panel-plain {
    background: transparent;
    box-shadow: none;
    backdrop-filter: none;
  }

  .feature-section {
    margin: clamp(0.75rem, 2vw, 1.5rem);
  }

  .feature-card {
    border-radius: 2rem;
    overflow: hidden;
    box-shadow:
      0 60px 160px rgba(0, 0, 0, 0.55),
      0 0 0 1px rgba(45, 252, 122, 0.18) inset;
    transform-style: preserve-3d;
    transition: transform 800ms cubic-bezier(0.16, 1, 0.3, 1);
  }

  .feature-card:hover {
    transform: perspective(1200px) rotateX(2deg) rotateY(-6deg) translateY(-6px);
  }

  .feature-img {
    border-radius: 2rem;
    transform: scale(1.01);
    transition: transform 900ms cubic-bezier(0.16, 1, 0.3, 1);
  }

  .feature-card:hover .feature-img {
    transform: scale(1.06);
  }

  :global(.reveal) {
    opacity: 0;
    transform: translate3d(0, 30px, 0) scale(0.985);
    filter: blur(10px);
    transition:
      opacity 900ms cubic-bezier(0.16, 1, 0.3, 1),
      transform 900ms cubic-bezier(0.16, 1, 0.3, 1),
      filter 900ms cubic-bezier(0.16, 1, 0.3, 1);
  }

  :global(.reveal[data-in="true"]) {
    opacity: 1;
    transform: translate3d(0, 0, 0) scale(1);
    filter: blur(0);
  }

  @media (prefers-reduced-motion: reduce) {
    :global(.reveal) {
      opacity: 1;
      transform: none;
      filter: none;
      transition: none;
    }

    .feature-card,
    .feature-img {
      transition: none;
    }

    .feature-card:hover,
    .feature-card:hover .feature-img {
      transform: none;
    }
  }
</style>
