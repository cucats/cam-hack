<script>
  import { onMount } from "svelte";

  let mounted = false;

  onMount(() => {
    mounted = true;
  });
</script>

<div class="hero-container">
  <div class="hero-content">
    {#if mounted}
      <div class="logo-container" style="--delay: 0s">
        <img
          src="/cam-hack-logo-text.png"
          alt="Cam Hack Logo"
          class="hero-logo"
        />
      </div>
      <h1 class="hero-title" style="--delay: 0.2s">Cam Hack 2025</h1>
      <h2 class="hero-date" style="--delay: 0.4s">1st – 2nd November</h2>
      <p class="hero-subtitle" style="--delay: 0.6s">
        What can you make in 2 days?
      </p>
      <div class="hero-buttons" style="--delay: 0.8s">
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
          Signups closed
        </a>
      </div>
    {/if}
  </div>
</div>

<style>
  .hero-container {
    @apply min-h-screen flex items-center justify-center relative;
    padding: 2rem;
  }

  .hero-content {
    @apply text-center z-10 relative;
    max-width: 900px;
  }

  .logo-container {
    animation: fadeInScale 1s ease-out var(--delay, 0s) both;
  }

  .hero-logo {
    @apply mx-auto mb-8;
    width: 200px;
    height: auto;
    filter: drop-shadow(0 10px 30px rgba(134, 226, 147, 0.3));
    animation: float 6s ease-in-out infinite;
  }

  .hero-title {
    @apply text-6xl sm:text-7xl md:text-8xl font-bold mb-4;
    background: linear-gradient(135deg, #86e293 0%, #86e6c6 50%, #10b981 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: fadeInUp 1s ease-out var(--delay, 0s) both;
    text-shadow: 0 0 60px rgba(134, 226, 147, 0.4);
    line-height: 1.1;
  }

  .hero-date {
    @apply text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-slate-700;
    animation: fadeInUp 1s ease-out var(--delay, 0s) both;
    letter-spacing: 0.05em;
  }

  .hero-subtitle {
    @apply text-xl sm:text-2xl md:text-3xl mb-8 text-slate-600;
    animation: fadeInUp 1s ease-out var(--delay, 0s) both;
  }

  .hero-buttons {
    @apply flex flex-wrap gap-4 justify-center;
    animation: fadeInUp 1s ease-out var(--delay, 0s) both;
  }

  .hero-button {
    @apply px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300;
    transform: translateY(0);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  }

  .hero-button.primary {
    @apply bg-emerald-100 text-green-900;
    background: linear-gradient(135deg, #86e293 0%, #86e6c6 100%);
    color: white;
  }

  .hero-button.primary:hover {
    transform: translateY(-5px) scale(1.05);
    box-shadow: 0 10px 30px rgba(134, 226, 147, 0.4);
  }

  .hero-button.secondary {
    @apply bg-gray-300 text-gray-600 cursor-not-allowed;
  }

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes fadeInScale {
    from {
      opacity: 0;
      transform: scale(0.8);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
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
</style>
