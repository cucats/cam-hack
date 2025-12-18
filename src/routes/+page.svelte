<script>
  import { onDestroy } from "svelte";
  import Hero from "$lib/components/Hero.svelte";
  import Sponsors from "$lib/components/Sponsors.svelte";
  import About from "$lib/components/About.svelte";
  import Schedule from "$lib/components/Schedule.svelte";
  import Rules from "$lib/components/Rules.svelte";
  import FAQ from "$lib/components/FAQ.svelte";
  import Organisers from "$lib/components/Organisers.svelte";

  let io;
  const reveal = (node) => {
    io ||= new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) e.target.classList.add("cam-in");
        }
      },
      { threshold: 0.15, rootMargin: "120px 0px -120px 0px" }
    );
    io.observe(node);
    return {
      destroy() {
        io?.unobserve(node);
      },
    };
  };

  onDestroy(() => io?.disconnect());
</script>

<svelte:head>
  <title>Cam Hack 2025</title>
</svelte:head>

<div class="cam-splash">
  <section class="cam-hero-wrap sm:p-8">
    <Hero />
  </section>

  <section class="unintended-section m-0 cam-reveal" use:reveal>
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

  <section class="sponsors-section cam-reveal" use:reveal>
    <Sponsors />
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

  <section id="about" class="cam-reveal" use:reveal>
    <About />
  </section>

  <section id="schedule" class="cam-reveal" use:reveal>
    <Schedule />
  </section>

  <section id="rules" class="cam-reveal" use:reveal>
    <Rules />
  </section>

  <section id="faq" class="cam-reveal" use:reveal>
    <FAQ />
  </section>

  <section class="cam-reveal" use:reveal>
    <Organisers />
  </section>
</div>

<style>
  .cam-splash {
    background: radial-gradient(
        1200px 720px at 22% 8%,
        rgba(53, 242, 142, 0.18),
        transparent 62%
      ),
      radial-gradient(
        1000px 640px at 78% 30%,
        rgba(134, 230, 198, 0.14),
        transparent 60%
      ),
      radial-gradient(
        900px 520px at 50% 95%,
        rgba(56, 255, 154, 0.12),
        transparent 64%
      ),
      linear-gradient(180deg, #07110b, #0a1610 40%, #0b1510 100%);
    color: #e8f2ec;
  }

  .cam-hero-wrap {
    background: transparent;
  }

  .cam-splash section:not(.cam-hero-wrap):not(.unintended-section) {
    background: linear-gradient(
      180deg,
      rgba(255, 255, 255, 0.06),
      rgba(255, 255, 255, 0.03)
    );
    border-top: 1px solid rgba(134, 230, 198, 0.12);
    border-bottom: 1px solid rgba(7, 17, 11, 0.6);
  }

  .cam-splash :global(h1),
  .cam-splash :global(h2),
  .cam-splash :global(h3),
  .cam-splash :global(h4),
  .cam-splash :global(h5),
  .cam-splash :global(h6) {
    color: #f3fbf6;
    text-shadow: 0 10px 30px rgba(0, 0, 0, 0.28);
  }

  .cam-splash :global(p),
  .cam-splash :global(li) {
    color: rgba(232, 242, 236, 0.9);
  }

  .cam-splash :global(a.theme-hyperlink) {
    color: rgba(53, 242, 142, 0.92);
  }

  .cam-splash :global(a.theme-hyperlink:hover) {
    color: rgba(134, 230, 198, 0.98);
  }

  .cam-reveal {
    opacity: 0;
    transform: translate3d(0, 28px, 0) scale(0.985);
    filter: blur(10px);
    transition:
      opacity 900ms cubic-bezier(0.16, 1, 0.3, 1),
      transform 900ms cubic-bezier(0.16, 1, 0.3, 1),
      filter 900ms cubic-bezier(0.16, 1, 0.3, 1);
    will-change: opacity, transform, filter;
  }

  :global(.cam-reveal.cam-in) {
    opacity: 1;
    transform: translate3d(0, 0, 0) scale(1);
    filter: blur(0);
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
    background-color: transparent !important;
  }
</style>
