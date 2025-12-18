<script>
  import { onMount } from "svelte";

  let daysSince = $state(null);

  const calcDaysSince = () => {
    const start = new Date(2025, 10, 1, 0, 0, 0, 0);
    const now = new Date();
    return Math.floor((now.getTime() - start.getTime()) / 86400000);
  };

  onMount(() => {
    daysSince = calcDaysSince();
    const id = window.setInterval(() => {
      daysSince = calcDaysSince();
    }, 60 * 60 * 1000);
    return () => window.clearInterval(id);
  });
</script>

<div class="hero-shell mx-auto max-w-7xl max-sm:text-center">
  <img
    src="/cam-hack-logo-text.png"
    alt="Cam Hack Logo"
    class="mx-auto size-60 max-md:mb-4 sm:float-left sm:mr-8 sm:size-72 md:size-80"
  />
  <h1 class="sm:pt-12 sm:text-5xl">Cam&nbsp;Hack&nbsp;2025</h1>
  <h3 class="sm:text-3xl">1st&nbsp;&ndash;&nbsp;2nd&nbsp;November</h3>
  {#if daysSince !== null}
    <div class="days-since">
      <span class="days-since-number">{daysSince}d</span>
    </div>
  {/if}
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

<style>
  .hero-shell {
    position: relative;
  }

  .days-since {
    margin: 10px 0 18px;
    display: flex;
    justify-content: center;
    align-items: baseline;
  }

  .days-since-number {
    font-variant-numeric: tabular-nums;
    font-feature-settings: "tnum" 1, "ss01" 1;
    letter-spacing: -0.02em;
    line-height: 1;
    padding: 10px 14px;
    border-radius: 16px;
    background: rgba(70, 244, 138, 0.14);
    border: 1px solid rgba(134, 230, 198, 0.22);
    box-shadow: 0 18px 60px rgba(0, 0, 0, 0.35);
    color: rgba(234, 255, 246, 0.92);
    text-shadow: 0 0 24px rgba(70, 244, 138, 0.35);
    transform: translateZ(0);
    animation: shimmer 3.2s ease-in-out infinite;
  }

  @keyframes shimmer {
    0% {
      filter: saturate(1) brightness(1);
      transform: translateZ(0) scale(1);
    }
    50% {
      filter: saturate(1.2) brightness(1.08);
      transform: translateZ(0) scale(1.03);
    }
    100% {
      filter: saturate(1) brightness(1);
      transform: translateZ(0) scale(1);
    }
  }
</style>
