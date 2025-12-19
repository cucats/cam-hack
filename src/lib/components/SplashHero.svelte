<script>
  import { onMount } from "svelte";
  import ThreeBackground from "./ThreeBackground.svelte";
  import Countdown from "./Countdown.svelte";

  let heroContent = $state(false);

  onMount(() => {
    setTimeout(() => {
      heroContent = true;
    }, 300);
  });
</script>

<div class="splash-hero">
  <ThreeBackground />
  <div class="hero-content">
    <div class="hero-inner" class:visible={heroContent}>
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
          Sign up now
        </a>
      </div>
    </div>
  </div>
</div>

<style>
  .splash-hero {
    position: relative;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }

  .hero-content {
    position: relative;
    z-index: 10;
    text-align: center;
    padding-left: 1rem;
    padding-right: 1rem;
  }

  .hero-inner {
    opacity: 0;
    transform: translateY(2.5rem);
    transition: opacity 1s ease, transform 1s ease;
  }

  .hero-inner.visible {
    opacity: 1;
    transform: translateY(0);
  }

  .logo-container {
    margin-bottom: 2rem;
    display: flex;
    justify-content: center;
    animation: float 3s ease-in-out infinite;
  }

  @keyframes float {
    0%,
    100% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(-20px);
    }
  }

  .hero-logo {
    height: 12rem;
    width: auto;
    filter: drop-shadow(0 0 20px rgba(16, 185, 129, 0.5));
  }

  @media (min-width: 768px) {
    .hero-logo {
      height: 16rem;
    }
  }

  @media (min-width: 1024px) {
    .hero-logo {
      height: 20rem;
    }
  }

  .hero-title {
    font-size: 3.75rem;
    font-weight: 700;
    margin-bottom: 1rem;
    font-family: "Ubuntu Mono", monospace;
    background: linear-gradient(135deg, #10b981 0%, #34d399 50%, #6ee7b7 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-shadow: 0 0 40px rgba(16, 185, 129, 0.3);
    animation: shimmer 3s ease-in-out infinite;
  }

  @media (min-width: 768px) {
    .hero-title {
      font-size: 6rem;
    }
  }

  @media (min-width: 1024px) {
    .hero-title {
      font-size: 8rem;
    }
  }

  @keyframes shimmer {
    0%,
    100% {
      filter: brightness(1);
    }
    50% {
      filter: brightness(1.2);
    }
  }

  .hero-subtitle {
    font-size: 1.5rem;
    color: #047857;
    margin-bottom: 2rem;
    font-family: "Ubuntu Mono", monospace;
  }

  @media (min-width: 768px) {
    .hero-subtitle {
      font-size: 1.875rem;
    }
  }

  @media (min-width: 1024px) {
    .hero-subtitle {
      font-size: 2.25rem;
    }
  }

  .hero-countdown {
    margin-bottom: 2rem;
  }

  .hero-tagline {
    font-size: 1.25rem;
    color: #065f46;
    margin-bottom: 2rem;
    font-family: "Ubuntu Mono", monospace;
  }

  @media (min-width: 768px) {
    .hero-tagline {
      font-size: 1.5rem;
    }
  }

  .hero-buttons {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    justify-content: center;
  }

  .hero-button {
    padding: 1rem 2rem;
    border-radius: 1rem;
    font-weight: 600;
    font-size: 1.125rem;
    transition: all 0.3s ease;
    font-family: "Ubuntu Mono", monospace;
  }

  .hero-button.primary {
    background-color: #10b981;
    color: white;
    box-shadow: 0 4px 15px rgba(16, 185, 129, 0.4);
  }

  .hero-button.primary:hover {
    background-color: #059669;
    transform: scale(1.1);
    box-shadow: 0 6px 20px rgba(16, 185, 129, 0.6);
  }

  .hero-button.secondary {
    background-color: rgba(255, 255, 255, 0.9);
    color: #047857;
    border: 2px solid #10b981;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  .hero-button.secondary:hover {
    background-color: #ecfdf5;
    transform: scale(1.1);
    border-color: #059669;
  }
</style>
