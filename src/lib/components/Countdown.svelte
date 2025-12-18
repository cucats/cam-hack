<script>
  import { onMount, onDestroy } from "svelte";

  let daysSince = $state(0);
  let intervalId;

  onMount(() => {
    const eventDate = new Date("2025-11-01T00:00:00");
    const updateCountdown = () => {
      const now = new Date();
      const diffTime = now - eventDate;
      daysSince = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    };
    updateCountdown();
    intervalId = setInterval(updateCountdown, 86400000);
  });

  onDestroy(() => {
    if (intervalId) {
      clearInterval(intervalId);
    }
  });
</script>

<div class="countdown-container">
  <div class="countdown-number" style="--delay: 0s">
    {daysSince}
  </div>
  <div class="countdown-label" style="--delay: 0.1s">Days Since</div>
</div>

<style>
  .countdown-container {
    @apply flex flex-col items-center justify-center;
    perspective: 1000px;
  }

  .countdown-number {
    @apply text-8xl md:text-9xl font-bold;
    font-family: "Ubuntu Mono", monospace;
    background: linear-gradient(135deg, #86e293 0%, #86e6c6 50%, #059669 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-shadow: 0 0 30px rgba(134, 226, 147, 0.5),
      0 0 60px rgba(134, 226, 147, 0.3);
    animation: pulse-glow 2s ease-in-out infinite,
      float 3s ease-in-out infinite;
    transform-style: preserve-3d;
    transition: transform 0.3s ease;
    filter: drop-shadow(0 0 20px rgba(134, 226, 147, 0.4));
  }

  .countdown-number:hover {
    transform: scale(1.15) rotateY(10deg) rotateX(5deg);
    filter: drop-shadow(0 0 40px rgba(134, 226, 147, 0.8));
  }

  .countdown-label {
    @apply text-2xl md:text-3xl mt-4;
    font-family: "Ubuntu Mono", monospace;
    background: linear-gradient(135deg, #059669 0%, #047857 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    opacity: 0;
    animation: fade-in-up 1s ease-out forwards;
    animation-delay: var(--delay);
    font-weight: 600;
    letter-spacing: 2px;
  }

  @keyframes pulse-glow {
    0%,
    100% {
      text-shadow: 0 0 30px rgba(134, 226, 147, 0.5),
        0 0 60px rgba(134, 226, 147, 0.3);
    }
    50% {
      text-shadow: 0 0 50px rgba(134, 226, 147, 0.8),
        0 0 100px rgba(134, 226, 147, 0.5);
    }
  }

  @keyframes float {
    0%,
    100% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(-10px);
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