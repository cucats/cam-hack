<script>
  import { onMount } from "svelte";

  let daysSince = $state(0);

  onMount(() => {
    const eventDate = new Date("2025-11-02T18:30:00");
    const now = new Date();
    const diffTime = now - eventDate;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    daysSince = diffDays > 0 ? diffDays : 0;
  });
</script>

<div class="countdown-container">
  <div class="countdown-number" data-days={daysSince}>
    {daysSince}
  </div>
  <div class="countdown-label">days since</div>
</div>

<style>
  .countdown-container {
    @apply flex flex-col items-center justify-center;
    perspective: 1000px;
  }

  .countdown-number {
    @apply text-8xl sm:text-9xl md:text-[12rem] font-bold;
    background: linear-gradient(135deg, #86e293 0%, #86e6c6 50%, #86e293 100%);
    background-size: 200% 200%;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: gradient-shift 3s ease infinite, pulse 2s ease-in-out infinite;
    text-shadow: 0 0 40px rgba(134, 226, 147, 0.5);
    transform-style: preserve-3d;
  }

  .countdown-label {
    @apply text-2xl sm:text-3xl md:text-4xl mt-4;
    color: #86e6c6;
    font-weight: 600;
    letter-spacing: 0.2em;
    animation: fade-in-up 1s ease-out;
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

  @keyframes pulse {
    0%,
    100% {
      transform: scale(1) rotateY(0deg);
    }
    50% {
      transform: scale(1.05) rotateY(5deg);
    }
  }

  @keyframes fade-in-up {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
</style>
