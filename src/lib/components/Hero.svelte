<script>
  import { onDestroy, onMount } from "svelte";
  import ThreeHeroBackdrop from "$lib/components/ThreeHeroBackdrop.svelte";

  let daysSince = 0;
  let timer = 0;

  const eventEndUtcMs = Date.UTC(2025, 10, 3, 0, 0, 0);

  const update = () => {
    const diff = Date.now() - eventEndUtcMs;
    daysSince = Math.max(0, Math.floor(diff / 86400000));
  };

  onMount(() => {
    update();
    timer = setInterval(update, 5 * 60 * 1000);
  });

  onDestroy(() => clearInterval(timer));
</script>

<div class="cam-hero mx-auto max-w-7xl max-sm:text-center">
  <div class="cam-hero-stage">
    <ThreeHeroBackdrop />
    <div class="cam-hero-glow" aria-hidden="true"></div>
  </div>

  <div class="cam-hero-content">
    <div class="cam-hero-days" aria-hidden="true">{daysSince}</div>
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
</div>

<style>
  .cam-hero {
    position: relative;
    isolation: isolate;
    min-height: min(88vh, 860px);
    display: grid;
    align-items: center;
  }

  .cam-hero-stage {
    position: absolute;
    inset: -10% -6% -10% -6%;
    z-index: 0;
    border-radius: 3rem;
    overflow: hidden;
    background: radial-gradient(
        1200px 600px at 25% 15%,
        rgba(53, 242, 142, 0.24),
        transparent 60%
      ),
      radial-gradient(
        900px 520px at 70% 55%,
        rgba(134, 230, 198, 0.22),
        transparent 58%
      ),
      radial-gradient(
        800px 440px at 30% 90%,
        rgba(56, 255, 154, 0.14),
        transparent 62%
      ),
      linear-gradient(120deg, rgba(9, 16, 12, 0.86), rgba(7, 18, 12, 0.86));
    filter: saturate(1.1);
  }

  .cam-hero-glow {
    position: absolute;
    inset: 0;
    background: radial-gradient(
        600px 260px at 55% 28%,
        rgba(53, 242, 142, 0.22),
        transparent 65%
      ),
      conic-gradient(
        from 210deg at 52% 38%,
        rgba(56, 255, 154, 0),
        rgba(56, 255, 154, 0.16),
        rgba(134, 230, 198, 0)
      );
    mix-blend-mode: screen;
    opacity: 0.9;
    animation: camGlow 6.5s ease-in-out infinite;
  }

  .cam-hero-content {
    position: relative;
    z-index: 1;
    padding: clamp(1.25rem, 2.5vw, 2.25rem);
    border-radius: 2.5rem;
    background: linear-gradient(
      180deg,
      rgba(255, 255, 255, 0.92),
      rgba(255, 255, 255, 0.84)
    );
    backdrop-filter: blur(10px);
    box-shadow: 0 28px 80px rgba(0, 0, 0, 0.22);
    color: #0f172a;
  }

  .cam-hero-days {
    position: absolute;
    top: clamp(0.8rem, 1.8vw, 1.35rem);
    right: clamp(1rem, 2.2vw, 1.6rem);
    font-size: clamp(2.6rem, 6.8vw, 6.2rem);
    line-height: 0.9;
    letter-spacing: -0.08em;
    font-weight: 800;
    color: rgba(8, 25, 15, 0.22);
    filter: drop-shadow(0 16px 40px rgba(53, 242, 142, 0.28));
    transform: translateZ(0);
    user-select: none;
  }

  .cam-hero-content :global(h1),
  .cam-hero-content :global(h2),
  .cam-hero-content :global(h3),
  .cam-hero-content :global(h4),
  .cam-hero-content :global(h5),
  .cam-hero-content :global(h6),
  .cam-hero-content :global(p),
  .cam-hero-content :global(li) {
    color: #0f172a;
    text-shadow: none;
  }

  @keyframes camGlow {
    0% {
      transform: translate3d(-1.5%, -0.8%, 0) scale(1);
      opacity: 0.82;
    }
    50% {
      transform: translate3d(1.3%, 0.9%, 0) scale(1.03);
      opacity: 0.98;
    }
    100% {
      transform: translate3d(-1.5%, -0.8%, 0) scale(1);
      opacity: 0.82;
    }
  }
</style>
