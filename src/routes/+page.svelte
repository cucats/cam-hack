<script>
  import Hero from "$lib/components/Hero.svelte";
  import Sponsors from "$lib/components/Sponsors.svelte";
  import About from "$lib/components/About.svelte";
  import Schedule from "$lib/components/Schedule.svelte";
  import Rules from "$lib/components/Rules.svelte";
  import FAQ from "$lib/components/FAQ.svelte";
  import Organisers from "$lib/components/Organisers.svelte";

  function reveal(node) {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) e.target.classList.add("is-visible");
        }
      },
      { threshold: 0.12, rootMargin: "40px 0px -20% 0px" },
    );
    io.observe(node);
    return {
      destroy() {
        io.disconnect();
      },
    };
  }
</script>

<svelte:head>
  <title>Cam Hack 2025</title>
</svelte:head>

<div class="page">
  <section class="hero-wrap sm:p-8">
    <Hero />
  </section>

  <section class="feature-wrap reveal m-0" use:reveal>
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
  </section>

  <section class="content-wrap reveal" use:reveal>
    <Sponsors />
  </section>

  <section id="about" class="content-wrap reveal" use:reveal>
    <About />
  </section>

  <section id="schedule" class="content-wrap reveal" use:reveal>
    <Schedule />
  </section>

  <section id="rules" class="content-wrap reveal" use:reveal>
    <Rules />
  </section>

  <section id="faq" class="content-wrap reveal" use:reveal>
    <FAQ />
  </section>

  <section class="content-wrap reveal" use:reveal>
    <Organisers />
  </section>
</div>

<style>
  .page {
    background:
      radial-gradient(1300px 900px at 20% 0%, rgba(34, 197, 94, 0.08), rgba(0, 0, 0, 0) 55%),
      radial-gradient(900px 700px at 85% 18%, rgba(94, 234, 212, 0.06), rgba(0, 0, 0, 0) 62%),
      radial-gradient(1100px 900px at 50% 100%, rgba(16, 185, 129, 0.06), rgba(0, 0, 0, 0) 60%),
      linear-gradient(180deg, rgba(2, 6, 10, 1), rgba(2, 6, 10, 0.92));
  }

  .hero-wrap {
    background: transparent;
  }

  .content-wrap {
    position: relative;
    background: transparent;
  }

  .content-wrap :global(.mx-auto.max-w-7xl) {
    border-radius: 2rem;
    background: rgba(255, 255, 255, 0.03);
    box-shadow:
      0 26px 90px rgba(0, 0, 0, 0.28),
      0 0 0 1px rgba(255, 255, 255, 0.08) inset;
    backdrop-filter: blur(14px) saturate(1.1);
    padding: clamp(1rem, 3vw, 2rem);
  }

  .content-wrap :global(h1),
  .content-wrap :global(h2),
  .content-wrap :global(h3),
  .content-wrap :global(h4),
  .content-wrap :global(h5),
  .content-wrap :global(h6),
  .content-wrap :global(p),
  .content-wrap :global(li),
  .content-wrap :global(span),
  .content-wrap :global(strong),
  .content-wrap :global(em) {
    color: rgba(241, 245, 249, 0.92);
  }

  .content-wrap :global(a.theme-hyperlink) {
    color: rgba(52, 211, 153, 0.95);
  }

  .content-wrap :global(a.theme-hyperlink:hover) {
    color: rgba(94, 234, 212, 0.95);
  }

  .feature-wrap {
    background: transparent;
  }

  .feature-wrap img {
    box-shadow:
      0 40px 140px rgba(0, 0, 0, 0.45),
      0 0 0 1px rgba(255, 255, 255, 0.08) inset;
  }

  .reveal {
    opacity: 0;
    transform: translate3d(0, 18px, 0) scale(0.99);
    filter: blur(10px);
    transition:
      opacity 900ms cubic-bezier(0.2, 1, 0.2, 1),
      transform 900ms cubic-bezier(0.2, 1, 0.2, 1),
      filter 900ms cubic-bezier(0.2, 1, 0.2, 1);
  }

  :global(.reveal.is-visible) {
    opacity: 1;
    transform: translate3d(0, 0, 0) scale(1);
    filter: blur(0px);
  }

  @media (prefers-reduced-motion: reduce) {
    .reveal,
    :global(.reveal.is-visible) {
      opacity: 1;
      transform: none;
      filter: none;
      transition: none;
    }
  }
</style>
