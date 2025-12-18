<script>
  import ThreeBackground from "$lib/components/ThreeBackground.svelte";
  import Countdown from "$lib/components/Countdown.svelte";
  import FeaturedProjects from "$lib/components/FeaturedProjects.svelte";
  import About from "$lib/components/About.svelte";
  import Schedule from "$lib/components/Schedule.svelte";
  import Rules from "$lib/components/Rules.svelte";
  import FAQ from "$lib/components/FAQ.svelte";
  import Organisers from "$lib/components/Organisers.svelte";
  import Sponsors from "$lib/components/Sponsors.svelte";
  import { onMount } from "svelte";

  let heroVisible = $state(false);
  let scrollY = $state(0);
  let unintendedSection, featuredSection, sponsorsSection, aboutSection, scheduleSection, rulesSection, faqSection, organisersSection;

  onMount(() => {
    setTimeout(() => {
      heroVisible = true;
    }, 300);

    const sections = [
      unintendedSection,
      featuredSection,
      sponsorsSection,
      aboutSection,
      scheduleSection,
      rulesSection,
      faqSection,
      organisersSection,
    ].filter(Boolean);

    const handleScroll = () => {
      scrollY = window.scrollY;
      sections.forEach((section) => {
        if (section) {
          const rect = section.getBoundingClientRect();
          const isVisible =
            rect.top < window.innerHeight * 0.8 && rect.bottom > 0;
          if (isVisible) {
            section.classList.add("animate-in");
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    setTimeout(handleScroll, 500);

    return () => window.removeEventListener("scroll", handleScroll);
  });
</script>

<svelte:head>
  <title>Cam Hack 2025</title>
</svelte:head>

<ThreeBackground />

<div class="splash-page">
  <section class="hero-section">
    <div class="hero-content" class:visible={heroVisible}>
      <div class="logo-container">
        <img
          src="/cam-hack-logo-text.png"
          alt="Cam Hack Logo"
          class="hero-logo"
        />
      </div>
      <h1 class="hero-title">Cam Hack 2025</h1>
      <h2 class="hero-subtitle">1st &ndash; 2nd November</h2>
      <div class="hero-countdown">
        <Countdown />
      </div>
      <p class="hero-tagline">What can you make in 2 days?</p>
      <div class="hero-buttons">
        <a
          target="_blank"
          href="/discord"
          class="hero-button primary"
        >
          Join the Discord!
        </a>
        <a
          target="_blank"
          href="/signup"
          class="hero-button secondary"
        >
          Sign up!
        </a>
      </div>
    </div>
  </section>

  <section
    bind:this={unintendedSection}
    class="unintended-section scroll-section"
  >
    <div class="mx-auto max-w-7xl px-4 sm:px-8">
      <h1 class="section-heading">Unintended Behaviour</h1>
      <a target="_blank" href="https://cam-hack-2025.devpost.com" class="block">
        <img
          src="/unintended.png"
          alt="Unintended"
          class="unintended-image"
        />
      </a>
    </div>
  </section>

  <section
    bind:this={featuredSection}
    class="featured-section scroll-section"
  >
    <FeaturedProjects />
  </section>

  <section
    bind:this={sponsorsSection}
    class="sponsors-section scroll-section"
  >
    <Sponsors />
  </section>

  <section
    bind:this={aboutSection}
    id="about"
    class="content-section scroll-section"
  >
    <About />
  </section>

  <section
    bind:this={scheduleSection}
    id="schedule"
    class="content-section scroll-section"
  >
    <Schedule />
  </section>

  <section
    bind:this={rulesSection}
    id="rules"
    class="content-section scroll-section"
  >
    <Rules />
  </section>

  <section
    bind:this={faqSection}
    id="faq"
    class="content-section scroll-section"
  >
    <FAQ />
  </section>

  <section
    bind:this={organisersSection}
    class="content-section scroll-section"
  >
    <Organisers />
  </section>
</div>

<style>
  .splash-page {
    @apply relative;
  }

  .hero-section {
    @apply min-h-screen flex items-center justify-center relative;
    padding: 2rem;
    transform: translateZ(0);
  }

  .hero-content {
    @apply text-center z-10;
    opacity: 0;
    transform: translateY(30px);
    transition: all 1s cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  .hero-content.visible {
    opacity: 1;
    transform: translateY(0);
  }

  .logo-container {
    @apply mb-8;
    animation: logo-entrance 1.2s ease-out;
  }

  .hero-logo {
    @apply mx-auto;
    height: 200px;
    width: auto;
    filter: drop-shadow(0 0 30px rgba(134, 226, 147, 0.5));
    animation: logo-float 3s ease-in-out infinite;
  }

  .hero-title {
    @apply text-7xl md:text-9xl font-bold mb-4;
    font-family: "Ubuntu Mono", monospace;
    background: linear-gradient(135deg, #86e293 0%, #86e6c6 50%, #059669 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-shadow: 0 0 40px rgba(134, 226, 147, 0.3);
    animation: title-glow 3s ease-in-out infinite;
  }

  .hero-subtitle {
    @apply text-3xl md:text-5xl mb-12;
    font-family: "Ubuntu Mono", monospace;
    color: #047857;
    animation: subtitle-entrance 1s ease-out 0.3s both;
  }

  .hero-countdown {
    @apply mb-12;
    animation: countdown-entrance 1s ease-out 0.6s both;
  }

  .hero-tagline {
    @apply text-2xl md:text-3xl mb-12;
    font-family: "Ubuntu Mono", monospace;
    color: #1e293b;
    animation: tagline-entrance 1s ease-out 0.9s both;
  }

  .hero-buttons {
    @apply flex flex-wrap gap-6 justify-center;
    animation: buttons-entrance 1s ease-out 1.2s both;
  }

  .hero-button {
    @apply px-8 py-4 rounded-2xl text-xl font-bold transition-all duration-300;
    font-family: "Ubuntu Mono", monospace;
    transform: translateY(0);
  }

  .hero-button.primary {
    @apply bg-emerald-500 text-white;
    box-shadow: 0 10px 30px rgba(134, 226, 147, 0.4);
  }

  .hero-button.primary:hover {
    @apply bg-emerald-600;
    transform: translateY(-5px) scale(1.05);
    box-shadow: 0 15px 40px rgba(134, 226, 147, 0.6);
  }

  .hero-button.secondary {
    @apply bg-white/90 text-emerald-700 border-2 border-emerald-500;
    backdrop-filter: blur(10px);
    position: relative;
    overflow: hidden;
  }

  .hero-button.secondary::before {
    content: "";
    @apply absolute inset-0;
    background: linear-gradient(
      135deg,
      rgba(134, 226, 147, 0.1) 0%,
      rgba(134, 230, 198, 0.1) 100%
    );
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  .hero-button.secondary:hover::before {
    opacity: 1;
  }

  .hero-button.secondary:hover {
    @apply bg-emerald-50 border-emerald-600;
    transform: translateY(-5px) scale(1.05);
    box-shadow: 0 15px 40px rgba(134, 226, 147, 0.3);
  }

  .unintended-section {
    @apply py-16 px-4 relative;
    background: linear-gradient(
      180deg,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 0.95) 50%,
      rgba(255, 255, 255, 1) 100%
    );
  }

  .unintended-section::before {
    content: "";
    @apply absolute inset-0 pointer-events-none;
    background: radial-gradient(
      circle at 50% 0%,
      rgba(134, 226, 147, 0.1) 0%,
      transparent 50%
    );
  }

  .section-heading {
    @apply text-5xl font-bold text-center mb-12;
    font-family: "Ubuntu Mono", monospace;
    color: #059669;
    animation: section-entrance 1s ease-out;
  }

  .unintended-image {
    @apply w-full rounded-3xl shadow-2xl;
    transition: transform 0.5s ease, box-shadow 0.5s ease;
    animation: image-entrance 1s ease-out 0.3s both;
  }

  .unintended-image:hover {
    transform: scale(1.02);
    box-shadow: 0 25px 50px rgba(134, 226, 147, 0.3);
  }

  .featured-section {
    @apply py-16 relative;
    background: linear-gradient(
      180deg,
      rgba(255, 255, 255, 1) 0%,
      rgba(250, 250, 250, 1) 100%
    );
  }

  .featured-section::after {
    content: "";
    @apply absolute inset-0 pointer-events-none;
    background: radial-gradient(
      ellipse at center,
      rgba(134, 230, 198, 0.08) 0%,
      transparent 70%
    );
  }

  .sponsors-section {
    @apply py-16;
    background-color: #ffffff;
  }

  .content-section {
    @apply py-16 px-4;
  }

  .content-section:nth-child(odd) {
    background-color: #fafafa;
  }

  .content-section:nth-child(even) {
    background-color: #ffffff;
  }

  .scroll-section {
    opacity: 0;
    transform: translateY(50px);
    transition: all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  .scroll-section.animate-in {
    opacity: 1;
    transform: translateY(0);
  }

  @keyframes logo-entrance {
    from {
      opacity: 0;
      transform: scale(0.8) rotate(-10deg);
    }
    to {
      opacity: 1;
      transform: scale(1) rotate(0deg);
    }
  }

  @keyframes logo-float {
    0%,
    100% {
      transform: translateY(0) rotate(0deg);
    }
    50% {
      transform: translateY(-15px) rotate(2deg);
    }
  }

  @keyframes title-glow {
    0%,
    100% {
      filter: drop-shadow(0 0 20px rgba(134, 226, 147, 0.3));
    }
    50% {
      filter: drop-shadow(0 0 40px rgba(134, 226, 147, 0.6));
    }
  }

  @keyframes subtitle-entrance {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes countdown-entrance {
    from {
      opacity: 0;
      transform: scale(0.8);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }

  @keyframes tagline-entrance {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes buttons-entrance {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes section-entrance {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes image-entrance {
    from {
      opacity: 0;
      transform: scale(0.95);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
</style>