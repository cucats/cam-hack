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
    content="Cam Hack 2025 - A 2 day hackathon for the innovative minds at the University of Cambridge."
  />
</svelte:head>

<Hero />

<section id="featured" class="relative overflow-hidden">
  <div
    class="from-cyber-dark via-cyber-surface/50 to-cyber-dark absolute inset-0 bg-gradient-to-b"
  ></div>
  <div class="relative z-10">
    <FeaturedProjects />
  </div>
</section>

<section id="sponsors" class="relative">
  <div
    class="from-cyber-dark to-cyber-surface/30 absolute inset-0 bg-gradient-to-b"
  ></div>
  <div class="relative z-10">
    <Sponsors />
  </div>
</section>

<section id="about" class="relative overflow-hidden">
  <div
    class="from-cyber-surface/30 via-cyber-dark to-cyber-surface/30 absolute inset-0 bg-gradient-to-b"
  ></div>
  <div class="relative z-10">
    <About />
  </div>
</section>

<section id="schedule" class="relative">
  <div
    class="from-cyber-surface/30 to-cyber-dark absolute inset-0 bg-gradient-to-b"
  ></div>
  <div class="relative z-10">
    <Schedule />
  </div>
</section>

<section id="rules" class="relative overflow-hidden">
  <div
    class="from-cyber-dark via-cyber-surface/50 to-cyber-dark absolute inset-0 bg-gradient-to-b"
  ></div>
  <div class="relative z-10">
    <Rules />
  </div>
</section>

<section id="faq" class="relative">
  <div
    class="from-cyber-dark to-cyber-surface/30 absolute inset-0 bg-gradient-to-b"
  ></div>
  <div class="relative z-10">
    <FAQ />
  </div>
</section>

<section id="organisers" class="relative overflow-hidden">
  <div
    class="from-cyber-surface/30 to-cyber-dark absolute inset-0 bg-gradient-to-b"
  ></div>
  <div class="relative z-10">
    <Organisers />
  </div>
</section>

<footer class="relative px-4 py-16">
  <div
    class="from-cyber-surface/50 to-cyber-dark absolute inset-0 bg-gradient-to-t"
  ></div>
  <div class="relative z-10 mx-auto max-w-6xl text-center">
    <div class="mb-8">
      <img
        src="/cam-hack-logo-text.png"
        alt="Cam Hack Logo"
        class="mx-auto mb-4 h-20 w-20 opacity-50"
      />
    </div>

    <div class="mb-8 flex flex-wrap justify-center gap-6">
      <a
        href="mailto:camhack@cucats.org"
        class="hover:text-cyber-green font-mono text-gray-400 transition-colors"
      >
        Contact
      </a>
      <span class="text-gray-600">•</span>
      <a
        href="/code-of-conduct"
        class="hover:text-cyber-green font-mono text-gray-400 transition-colors"
      >
        Code of Conduct
      </a>
      <span class="text-gray-600">•</span>
      <a
        href="/discord"
        target="_blank"
        class="hover:text-cyber-green font-mono text-gray-400 transition-colors"
      >
        Discord
      </a>
    </div>

    <div class="border-cyber-border border-t pt-8">
      <p class="mb-2 text-sm text-gray-500">Copyright © Cam Hack 2025</p>
      <p class="text-xs text-gray-600">Art by Gwen Sellers</p>
    </div>

    <div class="mt-8 flex justify-center gap-4">
      <div class="bg-cyber-green h-2 w-2 animate-pulse rounded-full"></div>
      <div
        class="bg-cyber-cyan h-2 w-2 animate-pulse rounded-full"
        style="animation-delay: 0.2s"
      ></div>
      <div
        class="bg-cyber-green h-2 w-2 animate-pulse rounded-full"
        style="animation-delay: 0.4s"
      ></div>
    </div>
  </div>
</footer>
