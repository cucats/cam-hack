<script>
  import { onMount } from "svelte";

  let daysSince = $state(0);

  onMount(() => {
    const eventDate = new Date("2025-11-01T00:00:00");
    const now = new Date();
    const diffTime = now - eventDate;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    daysSince = diffDays;
  });
</script>

<div class="countdown-container">
  <div class="countdown-number">{daysSince}</div>
  <div class="countdown-label">days since</div>
</div>

<style>
  .countdown-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .countdown-number {
    font-size: 6rem;
    font-weight: 700;
    background: linear-gradient(to right, #34d399, #10b981, #059669);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    font-family: "Ubuntu Mono", monospace;
    text-shadow: 0 0 30px rgba(16, 185, 129, 0.3);
    animation: pulse-glow 2s ease-in-out infinite;
  }

  .countdown-label {
    font-size: 1.25rem;
    color: #047857;
    margin-top: 0.5rem;
    font-family: "Ubuntu Mono", monospace;
  }

  @keyframes pulse-glow {
    0%,
    100% {
      filter: drop-shadow(0 0 10px rgba(16, 185, 129, 0.5));
    }
    50% {
      filter: drop-shadow(0 0 20px rgba(16, 185, 129, 0.8));
    }
  }
</style>
