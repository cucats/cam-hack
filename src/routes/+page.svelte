<script>
  import LoadingScreen from "$lib/components/LoadingScreen.svelte";
  import ThreeBackground from "$lib/components/ThreeBackground.svelte";
  import DataStream from "$lib/components/DataStream.svelte";
  import HexagonPattern from "$lib/components/HexagonPattern.svelte";
  import CircuitLines from "$lib/components/CircuitLines.svelte";
  import HologramEffect from "$lib/components/HologramEffect.svelte";
  import FloatingElements from "$lib/components/FloatingElements.svelte";
  import EnergyPulse from "$lib/components/EnergyPulse.svelte";
  import CursorGlow from "$lib/components/CursorGlow.svelte";
  import ParticleTrail from "$lib/components/ParticleTrail.svelte";
  import CyberpunkOverlay from "$lib/components/CyberpunkOverlay.svelte";
  import ScrollReveal from "$lib/components/ScrollReveal.svelte";
  import SplashHero from "$lib/components/SplashHero.svelte";
  import FeaturedProject from "$lib/components/FeaturedProject.svelte";
  import SponsorsSection from "$lib/components/SponsorsSection.svelte";
  import ContentSection from "$lib/components/ContentSection.svelte";
  import About from "$lib/components/About.svelte";
  import Schedule from "$lib/components/Schedule.svelte";
</script>

<svelte:head>
  <title>Cam Hack 2025</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link
    href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400..900&display=swap"
    rel="stylesheet"
  />
</svelte:head>

<LoadingScreen />
<DataStream />
<ThreeBackground />
<HexagonPattern />
<CircuitLines />
<HologramEffect />
<FloatingElements />
<EnergyPulse />
<CyberpunkOverlay />
<CursorGlow />
<ParticleTrail />

<div class="splash-page">
  <SplashHero />

  <ScrollReveal>
    <FeaturedProject />
  </ScrollReveal>

  <ScrollReveal>
    <SponsorsSection />
  </ScrollReveal>

  <ScrollReveal>
    <ContentSection title="About">
      <About />
    </ContentSection>
  </ScrollReveal>

  <ScrollReveal>
    <ContentSection title="Schedule">
      <Schedule />
    </ContentSection>
  </ScrollReveal>
</div>

<style>
  .splash-page {
    background: linear-gradient(
      180deg,
      #0a0f1a 0%,
      #0d1420 50%,
      #0a0f1a 100%
    );
    min-height: 100vh;
  }
</style>
