<script>
  import Splash from "$lib/components/Splash.svelte";
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

<div class="splash-wrap">
  <Splash />
</div>

<section class="unintended-section m-0">
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

<section class="sponsors-section">
  <Sponsors />
</section>

<section class="mb-8 px-0 md:p-4">
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
  .splash-wrap {
    background: #030605;
  }

  .splash-wrap + section {
    margin-top: 0;
  }

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
</style>
