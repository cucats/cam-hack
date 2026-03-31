<script>
  import { onMount } from "svelte";
  import ThreeHero from "$lib/components/ThreeHero.svelte";

  let daysSince = $state(0);

  onMount(() => {
    const eventEnd = Date.UTC(2025, 10, 2);
    const now = Date.now();
    daysSince = Math.max(0, Math.floor((now - eventEnd) / 86400000));
  });
</script>

<div class="hero">
  <div class="hero-card">
    <ThreeHero />
    <div class="hero-grid">
      <div class="hero-copy mx-auto max-w-7xl max-sm:text-center">
        <img
          src="/cam-hack-logo-text.png"
          alt="Cam Hack Logo"
          class="mx-auto size-60 max-md:mb-4 sm:float-left sm:mr-8 sm:size-72 md:size-80"
        />
        <h1 class="sm:pt-12 sm:text-5xl">Cam&nbsp;Hack&nbsp;2025</h1>
        <h3 class="sm:text-3xl">1st&nbsp;&ndash;&nbsp;2nd&nbsp;November</h3>
        <div class="mb-4 flex flex-wrap gap-4 max-sm:justify-center">
          <a
            target="_blank"
            href="/discord"
            class="rounded-2xl bg-emerald-100/80 px-6 py-4 text-green-900 transition-all select-none hover:scale-105 hover:bg-emerald-100"
          >
            Join the Discord!
          </a>
          <a
            target="_blank"
            href="/signup"
            class="cursor-not-allowed rounded-2xl bg-gray-300/80 px-6 py-4 text-gray-600 transition-all select-none"
          >
            Signups closed
          </a>
        </div>
        <p class="text-xl">What can you make in 2 days?</p>
        <p class="clear-left"></p>
      </div>
      <div class="days-badge" aria-hidden="true">{daysSince}</div>
    </div>
  </div>
</div>

<style>
  .hero {
    padding: 1rem;
  }

  .hero-card {
    position: relative;
    border-radius: 2rem;
    overflow: hidden;
    background:
      radial-gradient(1200px 800px at 10% 0%, rgba(45, 252, 122, 0.1), rgba(0, 0, 0, 0)),
      linear-gradient(180deg, rgba(7, 10, 14, 0.92), rgba(7, 10, 14, 0.6));
    box-shadow:
      0 40px 120px rgba(0, 0, 0, 0.45),
      0 0 0 1px rgba(134, 230, 198, 0.18) inset;
  }

  .hero-grid {
    position: relative;
    z-index: 2;
    min-height: min(72vh, 820px);
    padding: clamp(1.25rem, 3vw, 2.5rem);
    display: grid;
    align-items: center;
  }

  .hero-copy {
    color: rgba(248, 250, 252, 0.92);
    text-shadow: 0 2px 24px rgba(0, 0, 0, 0.4);
  }

  .days-badge {
    position: absolute;
    top: 1.25rem;
    right: 1.25rem;
    padding: 0.75rem 1rem;
    border-radius: 999px;
    font-family: var(--font-playpen);
    font-weight: 700;
    letter-spacing: 0.06em;
    color: rgba(4, 6, 10, 0.9);
    background: linear-gradient(135deg, rgba(45, 252, 122, 0.95), rgba(134, 230, 198, 0.95));
    box-shadow:
      0 18px 60px rgba(45, 252, 122, 0.2),
      0 0 0 1px rgba(255, 255, 255, 0.35) inset;
    transform: translateZ(0);
    animation: floaty 6.5s ease-in-out infinite;
  }

  @keyframes floaty {
    0%,
    100% {
      transform: translate3d(0, 0, 0);
    }
    50% {
      transform: translate3d(0, -10px, 0);
    }
  }
</style>
