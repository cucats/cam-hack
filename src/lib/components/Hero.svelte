<script>
  import { onMount } from "svelte";
  import ThreeBackdrop from "$lib/components/ThreeBackdrop.svelte";

  let days = $state(0);

  onMount(() => {
    const end = Date.UTC(2025, 10, 2, 16, 30, 0);
    days = Math.max(0, Math.floor((Date.now() - end) / 86400000));
  });
</script>

<div class="hero">
  <ThreeBackdrop />
  <div class="hero-inner mx-auto max-w-7xl">
    <div class="grid gap-8 md:grid-cols-[1.2fr_0.8fr] md:items-center">
      <div class="max-sm:text-center">
        <img
          src="/cam-hack-logo-text.png"
          alt="Cam Hack Logo"
          class="mx-auto size-48 drop-shadow-[0_20px_50px_rgba(6,20,12,0.25)] sm:float-left sm:mr-8 sm:size-60 md:size-72"
        />
        <h1 class="sm:pt-10 sm:text-6xl">Cam&nbsp;Hack&nbsp;2025</h1>
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

      <div class="mx-auto w-full max-w-md md:mx-0 md:justify-self-end">
        <div class="days-card">
          <div class="days-num">{days}</div>
          <div class="days-unit">days</div>
          <div class="shine"></div>
        </div>
      </div>
    </div>
  </div>
</div>

<style>
  .hero {
    position: relative;
    overflow: hidden;
    border-radius: 28px;
    background:
      radial-gradient(1200px 520px at 10% 20%, rgba(34, 197, 94, 0.18), transparent 60%),
      radial-gradient(900px 520px at 92% 70%, rgba(134, 230, 198, 0.22), transparent 60%),
      linear-gradient(180deg, rgba(255, 255, 255, 0.85), rgba(255, 255, 255, 0.7));
    border: 1px solid rgba(255, 255, 255, 0.65);
    box-shadow:
      0 50px 120px rgba(1, 20, 10, 0.22),
      0 18px 40px rgba(1, 20, 10, 0.12);
  }

  .hero-inner {
    position: relative;
    z-index: 2;
    padding: 22px;
  }

  @media (min-width: 640px) {
    .hero-inner {
      padding: 34px;
    }
  }

  .days-card {
    position: relative;
    overflow: hidden;
    border-radius: 28px;
    padding: 28px 22px;
    background: linear-gradient(160deg, rgba(6, 22, 14, 0.78), rgba(6, 22, 14, 0.55));
    border: 1px solid rgba(134, 230, 198, 0.35);
    box-shadow:
      inset 0 1px 0 rgba(255, 255, 255, 0.16),
      0 28px 80px rgba(1, 20, 10, 0.38);
    backdrop-filter: blur(16px);
    transform: translateZ(0);
    animation: float 6.8s ease-in-out infinite;
  }

  .days-num {
    font-size: clamp(54px, 9vw, 92px);
    font-weight: 900;
    letter-spacing: -0.04em;
    line-height: 1;
    color: rgb(134 230 198);
    text-shadow:
      0 18px 60px rgba(34, 197, 94, 0.35),
      0 2px 0 rgba(255, 255, 255, 0.08);
  }

  .days-unit {
    margin-top: 6px;
    font-size: 20px;
    font-weight: 800;
    color: rgba(255, 255, 255, 0.82);
    letter-spacing: 0.04em;
  }

  .shine {
    position: absolute;
    inset: -60px;
    background:
      radial-gradient(520px 280px at 15% 25%, rgba(34, 197, 94, 0.75), transparent 60%),
      radial-gradient(520px 300px at 85% 70%, rgba(134, 230, 198, 0.75), transparent 60%),
      conic-gradient(
        from 210deg at 50% 50%,
        rgba(255, 255, 255, 0.08),
        rgba(255, 255, 255, 0),
        rgba(255, 255, 255, 0.08)
      );
    filter: blur(14px);
    opacity: 0.65;
    mix-blend-mode: screen;
    animation: sweep 3.8s ease-in-out infinite;
    pointer-events: none;
  }

  @keyframes float {
    0% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(-8px);
    }
    100% {
      transform: translateY(0px);
    }
  }

  @keyframes sweep {
    0% {
      transform: translateX(-12px) rotate(-2deg);
    }
    50% {
      transform: translateX(12px) rotate(2deg);
    }
    100% {
      transform: translateX(-12px) rotate(-2deg);
    }
  }
</style>
