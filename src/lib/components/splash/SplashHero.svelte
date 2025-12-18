<script>
  import { onMount } from "svelte";
  import Countdown from "./Countdown.svelte";

  let mounted = $state(false);

  onMount(() => {
    mounted = true;
  });
</script>

<section class="hero-section">
  <div class="hero-content">
    <div class="logo-container" class:mounted>
      <img
        src="/cam-hack-logo-text.png"
        alt="Cam Hack Logo"
        class="hero-logo"
      />
    </div>
    <h1 class="hero-title" class:mounted>Cam Hack 2025</h1>
    <h2 class="hero-subtitle" class:mounted>1st &ndash; 2nd November</h2>
    <div class="countdown-wrapper" class:mounted>
      <Countdown />
    </div>
    <div class="hero-cta" class:mounted>
      <a
        target="_blank"
        href="/discord"
        class="cta-button primary"
      >
        Join the Discord!
      </a>
      <a
        target="_blank"
        href="/signup"
        class="cta-button secondary"
      >
        Signups closed
      </a>
    </div>
    <p class="hero-tagline" class:mounted>What can you make in 2 days?</p>
  </div>
  <div class="floating-shapes">
    <div class="shape shape-1"></div>
    <div class="shape shape-2"></div>
    <div class="shape shape-3"></div>
    <div class="shape shape-4"></div>
  </div>
</section>

<style>
  .hero-section {
    @apply relative min-h-screen flex items-center justify-center overflow-hidden;
    background: linear-gradient(
      135deg,
      rgba(134, 226, 147, 0.1) 0%,
      rgba(134, 230, 198, 0.05) 100%
    );
  }

  .hero-content {
    @apply relative z-10 text-center px-4 sm:px-8;
    max-width: 1200px;
  }

  .logo-container {
    @apply mb-8;
    opacity: 0;
    transform: scale(0.5) rotateY(180deg);
    transition: all 1s cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  .logo-container.mounted {
    opacity: 1;
    transform: scale(1) rotateY(0deg);
  }

  .hero-logo {
    @apply mx-auto;
    width: 200px;
    height: auto;
    filter: drop-shadow(0 10px 30px rgba(134, 226, 147, 0.3));
    animation: float 6s ease-in-out infinite;
  }

  .hero-title {
    @apply text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold mb-4;
    background: linear-gradient(135deg, #86e293 0%, #86e6c6 50%, #86e293 100%);
    background-size: 200% 200%;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: gradient-shift 4s ease infinite;
    opacity: 0;
    transform: translateY(30px);
    transition: all 0.8s ease-out 0.2s;
  }

  .hero-title.mounted {
    opacity: 1;
    transform: translateY(0);
  }

  .hero-subtitle {
    @apply text-2xl sm:text-3xl md:text-4xl mb-12;
    color: #86e6c6;
    font-weight: 600;
    opacity: 0;
    transform: translateY(20px);
    transition: all 0.8s ease-out 0.4s;
  }

  .hero-subtitle.mounted {
    opacity: 1;
    transform: translateY(0);
  }

  .countdown-wrapper {
    @apply mb-12;
    opacity: 0;
    transform: scale(0.8);
    transition: all 1s ease-out 0.6s;
  }

  .countdown-wrapper.mounted {
    opacity: 1;
    transform: scale(1);
  }

  .hero-cta {
    @apply flex flex-wrap gap-4 justify-center mb-8;
    opacity: 0;
    transform: translateY(20px);
    transition: all 0.8s ease-out 0.8s;
  }

  .hero-cta.mounted {
    opacity: 1;
    transform: translateY(0);
  }

  .cta-button {
    @apply px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300;
    transform-style: preserve-3d;
  }

  .cta-button.primary {
    @apply bg-emerald-100/80 text-green-900;
    box-shadow: 0 4px 15px rgba(134, 226, 147, 0.3);
  }

  .cta-button.primary:hover {
    @apply bg-emerald-100 scale-105;
    box-shadow: 0 8px 25px rgba(134, 226, 147, 0.5);
    transform: translateY(-2px);
  }

  .cta-button.secondary {
    @apply bg-gray-300/80 text-gray-600 cursor-not-allowed;
  }

  .hero-tagline {
    @apply text-xl sm:text-2xl;
    color: #86e6c6;
    opacity: 0;
    transform: translateY(20px);
    transition: all 0.8s ease-out 1s;
  }

  .hero-tagline.mounted {
    opacity: 1;
    transform: translateY(0);
  }

  .floating-shapes {
    @apply absolute inset-0 pointer-events-none;
    overflow: hidden;
  }

  .shape {
    @apply absolute rounded-full;
    background: linear-gradient(135deg, rgba(134, 226, 147, 0.2), rgba(134, 230, 198, 0.2));
    filter: blur(40px);
    animation: float-shape 20s ease-in-out infinite;
  }

  .shape-1 {
    width: 300px;
    height: 300px;
    top: 10%;
    left: 10%;
    animation-delay: 0s;
  }

  .shape-2 {
    width: 200px;
    height: 200px;
    top: 60%;
    right: 10%;
    animation-delay: 5s;
  }

  .shape-3 {
    width: 250px;
    height: 250px;
    bottom: 20%;
    left: 20%;
    animation-delay: 10s;
  }

  .shape-4 {
    width: 180px;
    height: 180px;
    top: 30%;
    right: 30%;
    animation-delay: 15s;
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

  @keyframes gradient-shift {
    0%,
    100% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
  }

  @keyframes float-shape {
    0%,
    100% {
      transform: translate(0, 0) scale(1);
    }
    25% {
      transform: translate(50px, -50px) scale(1.1);
    }
    50% {
      transform: translate(-30px, 30px) scale(0.9);
    }
    75% {
      transform: translate(30px, 50px) scale(1.05);
    }
  }
</style>
