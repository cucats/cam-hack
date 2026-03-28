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

<section class="top sm:p-8">
  <div class="mx-auto max-w-7xl px-0">
    <Hero />
  </div>
  <div class="mx-auto mt-8 max-w-7xl px-4 sm:mt-10 sm:px-0">
    <FeaturedProjects />
  </div>
</section>

<section class="unintended-section m-0">
  <div class="mx-auto max-w-7xl px-4 sm:px-8">
    <h1 class="py-8 text-center">Unintended Behaviour</h1>
    <a target="_blank" href="https://cam-hack-2025.devpost.com" class="block">
      <img
        src="/unintended.png"
        alt="Unintended"
        class="m-0 block w-full rounded-3xl shadow-[0_40px_120px_rgba(1,20,10,0.35)] transition-transform duration-700 hover:scale-[1.01]"
      />
    </a>
  </div>
</section>

<section class="sponsors-section">
  <Sponsors />
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

<style>
  section {
    position: relative;
  }

  section:not(.top):not(.unintended-section):not(.sponsors-section) {
    background:
      radial-gradient(1000px 340px at 20% 0%, rgba(34, 197, 94, 0.08), transparent 60%),
      radial-gradient(1000px 420px at 100% 30%, rgba(134, 230, 198, 0.1), transparent 60%),
      linear-gradient(180deg, #ffffff, #fbfbfb);
  }

  section.top {
    background:
      radial-gradient(1200px 520px at 15% 10%, rgba(34, 197, 94, 0.14), transparent 60%),
      radial-gradient(1200px 520px at 90% 40%, rgba(134, 230, 198, 0.14), transparent 60%),
      linear-gradient(180deg, #ffffff, #fbfbfb);
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
</style>
