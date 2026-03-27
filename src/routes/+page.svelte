<script>
  import ThreeBackground from "$lib/components/ThreeBackground.svelte";
  import SplashNav from "$lib/components/splash/SplashNav.svelte";
  import SplashHero from "$lib/components/splash/SplashHero.svelte";
  import SplashFeatured from "$lib/components/splash/SplashFeatured.svelte";
  import SplashSponsors from "$lib/components/splash/SplashSponsors.svelte";
  import SplashAbout from "$lib/components/splash/SplashAbout.svelte";
  import SplashSchedule from "$lib/components/splash/SplashSchedule.svelte";
  import SplashRules from "$lib/components/splash/SplashRules.svelte";
  import SplashFAQ from "$lib/components/splash/SplashFAQ.svelte";
  import SplashOrganisers from "$lib/components/splash/SplashOrganisers.svelte";
</script>

<svelte:head>
  <title>Cam Hack 2025</title>
  <meta name="description" content="Cam Hack 2025 - A 2 day hackathon for the innovative minds at the University of Cambridge. 1st - 2nd November." />
</svelte:head>

<ThreeBackground />
<SplashNav />

<main class="relative z-10">
  <SplashHero />

  <div class="relative">
    <div class="absolute inset-0 bg-gradient-to-b from-transparent via-slate-900/50 to-slate-900/80 pointer-events-none"></div>
    <SplashFeatured />
  </div>

  <SplashSponsors />
  <SplashAbout />
  <SplashSchedule />
  <SplashRules />
  <SplashFAQ />
  <SplashOrganisers />

  <div class="py-16 px-4 sm:px-8 text-center border-t border-emerald-500/10">
    <div class="max-w-7xl mx-auto">
      <p class="text-gray-400 mb-4">
        <a href="mailto:camhack@cucats.org" class="text-emerald-400 hover:text-emerald-300 transition-colors">Contact</a>
        <span class="mx-3 text-emerald-500/30">&bull;</span>
        <a href="/code-of-conduct" class="text-emerald-400 hover:text-emerald-300 transition-colors">Code of Conduct</a>
      </p>
      <p class="text-gray-500 text-sm">
        Copyright &copy; Cam Hack 2025.<br />
        Art by Gwen Sellers
      </p>
    </div>
  </div>
</main>
