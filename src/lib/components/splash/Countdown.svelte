<script>
  import { onMount } from "svelte";

  let daysSince = 0;
  let mounted = false;

  onMount(() => {
    mounted = true;
    const eventDate = new Date("2025-11-01T00:00:00");
    const now = new Date();
    const diffTime = now - eventDate;
    daysSince = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  });
</script>

{#if mounted}
  <div class="countdown-container">
    <div class="countdown-number" style="--delay: 0s">
      {daysSince}
    </div>
    <div class="countdown-label" style="--delay: 0.1s">
      Days Since
    </div>
    <div class="countdown-subtitle" style="--delay: 0.2s">
      Cam Hack 2025
    </div>
  </div>
{/if}

<style>
  .countdown-container {
    @apply flex flex-col items-center justify-center text-center;
    min-height: 40vh;
  }

  .countdown-number {
    @apply text-8xl sm:text-9xl md:text-[12rem] font-bold;
    background: linear-gradient(135deg, #86e293 0%, #86e6c6 50%, #10b981 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    line-height: 1;
    margin-bottom: 1rem;
    animation: fadeInUp 1s ease-out var(--delay, 0s) both;
    text-shadow: 0 0 40px rgba(134, 226, 147, 0.3);
    filter: drop-shadow(0 0 20px rgba(134, 226, 147, 0.2));
  }

  .countdown-label {
    @apply text-2xl sm:text-3xl md:text-4xl font-bold text-slate-700;
    animation: fadeInUp 1s ease-out var(--delay, 0s) both;
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }

  .countdown-subtitle {
    @apply text-xl sm:text-2xl md:text-3xl font-bold;
    background: linear-gradient(135deg, #86e293 0%, #86e6c6 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: fadeInUp 1s ease-out var(--delay, 0s) both;
    margin-top: 0.5rem;
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
</style>
