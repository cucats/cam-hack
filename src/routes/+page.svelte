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
  <meta
    name="description"
    content="Cam Hack 2025 - A 2 day hackathon for the innovative minds at the University of Cambridge"
  />
</svelte:head>

<Hero />

<FeaturedProjects />

<About />

<Sponsors />

<Schedule />

<Rules />

<FAQ />

<Organisers />

<section class="section-padding relative">
  <div
    class="pointer-events-none absolute inset-0 bg-gradient-to-t from-emerald-900/20 via-transparent to-transparent"
  ></div>
  <div class="relative z-10 mx-auto max-w-4xl text-center">
    <div class="glass-card rounded-2xl border border-zinc-800 p-8">
      <p class="mb-4 text-zinc-400">
        <a href="mailto:camhack@cucats.org" class="theme-hyperlink">Contact</a>
        •
        <a href="/code-of-conduct" class="theme-hyperlink">Code of Conduct</a>
      </p>
      <p class="text-sm text-zinc-500">
        Copyright © Cam Hack 2025.<br />
        Art by Gwen Sellers
      </p>
    </div>
  </div>
</section>
