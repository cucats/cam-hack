<script>
  import { onDestroy, onMount } from "svelte";

  let days = 0;
  let timer;
  let ThreeBackdrop;

  onMount(() => {
    const end = Date.UTC(2025, 10, 2, 0, 0, 0);
    const update = () => {
      const d = Math.floor((Date.now() - end) / 86400000);
      days = Math.max(0, d);
    };
    update();
    timer = setInterval(update, 60 * 60 * 1000);

    import("$lib/components/ThreeBackdrop.svelte").then((m) => {
      ThreeBackdrop = m.default;
    });
  });

  onDestroy(() => {
    if (timer) clearInterval(timer);
  });
</script>

<div class="hero-shell">
  {#if ThreeBackdrop}
    <svelte:component this={ThreeBackdrop} />
  {/if}
  <div class="hero-inner">
    <div class="hero-panel mx-auto max-w-7xl max-sm:text-center">
      <div class="hero-top">
        <img
          src="/cam-hack-logo-text.png"
          alt="Cam Hack Logo"
          class="mx-auto size-60 max-md:mb-4 sm:float-left sm:mr-8 sm:size-72 md:size-80"
        />
        <div class="hero-meta">
          <h1 class="sm:pt-12 sm:text-5xl">Cam&nbsp;Hack&nbsp;2025</h1>
          <h3 class="sm:text-3xl">1st&nbsp;&ndash;&nbsp;2nd&nbsp;November</h3>
          <div class="hero-days">{days}</div>
        </div>
      </div>
      <div class="mb-4 flex flex-wrap gap-4 max-sm:justify-center">
        <a
          target="_blank"
          href="/discord"
          class="hero-cta rounded-2xl px-6 py-4 transition-all select-none"
        >
          Join the Discord!
        </a>
        <a
          target="_blank"
          href="/signup"
          class="hero-cta-disabled cursor-not-allowed rounded-2xl px-6 py-4 transition-all select-none"
        >
          Signups closed
        </a>
      </div>
      <p class="text-xl">What can you make in 2 days?</p>
      <p class="clear-left"></p>
    </div>
  </div>
</div>

<style>
  .hero-shell {
    position: relative;
    overflow: hidden;
    border-radius: 2rem;
    background:
      radial-gradient(1200px 600px at 30% 20%, rgba(34, 197, 94, 0.22), rgba(0, 0, 0, 0) 55%),
      radial-gradient(900px 500px at 70% 30%, rgba(94, 234, 212, 0.16), rgba(0, 0, 0, 0) 60%),
      radial-gradient(1100px 700px at 50% 70%, rgba(16, 185, 129, 0.18), rgba(0, 0, 0, 0) 62%),
      linear-gradient(180deg, rgba(2, 6, 10, 0.92), rgba(2, 6, 10, 0.65));
    box-shadow:
      0 40px 120px rgba(0, 0, 0, 0.45),
      0 0 0 1px rgba(255, 255, 255, 0.08) inset;
  }

  .hero-inner {
    position: relative;
    z-index: 1;
    padding: clamp(1.25rem, 3vw, 2.25rem);
  }

  .hero-panel {
    position: relative;
    border-radius: 1.75rem;
    background: rgba(255, 255, 255, 0.06);
    box-shadow:
      0 20px 80px rgba(0, 0, 0, 0.35),
      0 0 0 1px rgba(255, 255, 255, 0.09) inset;
    backdrop-filter: blur(16px) saturate(1.15);
    padding: clamp(1.25rem, 3vw, 2.25rem);
    color: rgba(248, 250, 252, 0.95);
  }

  .hero-panel h1,
  .hero-panel h3,
  .hero-panel p {
    color: rgba(248, 250, 252, 0.95);
    text-shadow: 0 14px 60px rgba(0, 0, 0, 0.55);
  }

  .hero-top {
    display: grid;
    grid-template-columns: 1fr;
    align-items: center;
    gap: 0.25rem;
  }

  .hero-meta {
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
  }

  .hero-days {
    width: fit-content;
    padding: 0.55rem 0.9rem;
    border-radius: 9999px;
    background: rgba(34, 197, 94, 0.14);
    color: rgba(236, 253, 245, 0.98);
    box-shadow:
      0 12px 40px rgba(34, 197, 94, 0.12),
      0 0 0 1px rgba(34, 197, 94, 0.22) inset;
    font-variant-numeric: tabular-nums;
    letter-spacing: 0.06em;
    font-weight: 700;
  }

  .hero-cta {
    background: rgba(16, 185, 129, 0.15);
    color: rgba(236, 253, 245, 0.98);
    box-shadow:
      0 18px 70px rgba(16, 185, 129, 0.16),
      0 0 0 1px rgba(52, 211, 153, 0.2) inset;
    backdrop-filter: blur(10px);
  }

  .hero-cta:hover {
    transform: translate3d(0, -1px, 0) scale(1.03);
    background: rgba(16, 185, 129, 0.2);
    box-shadow:
      0 22px 90px rgba(16, 185, 129, 0.18),
      0 0 0 1px rgba(94, 234, 212, 0.22) inset;
  }

  .hero-cta-disabled {
    background: rgba(148, 163, 184, 0.1);
    color: rgba(226, 232, 240, 0.65);
    box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.08) inset;
    backdrop-filter: blur(10px);
  }

  @media (min-width: 640px) {
    .hero-top {
      grid-template-columns: auto 1fr;
      gap: 1.25rem;
    }
  }
</style>
