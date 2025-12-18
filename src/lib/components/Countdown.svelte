<script>
  import { onMount } from 'svelte';

  let days = $state(0);

  onMount(() => {
    const eventDate = new Date('2025-11-01T10:00:00');
    const now = new Date();
    const diffTime = now - eventDate;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    days = diffDays;
  });
</script>

<div class="countdown-container">
  <div class="countdown-label">Time since Cam Hack 2025</div>
  <div class="countdown-value">
    <span class="digit">{days}</span>
    <span class="unit">days</span>
  </div>
</div>

<style>
  .countdown-container {
    text-align: center;
    padding: 2rem 0;
  }

  .countdown-label {
    font-size: 1.2rem;
    color: #00ffcc;
    text-transform: uppercase;
    letter-spacing: 3px;
    margin-bottom: 1rem;
    font-weight: 600;
  }

  .countdown-value {
    display: flex;
    align-items: baseline;
    justify-content: center;
    gap: 1rem;
  }

  .digit {
    font-size: 6rem;
    font-weight: 700;
    color: #00ff88;
    text-shadow: 0 0 20px rgba(0, 255, 136, 0.5),
                 0 0 40px rgba(0, 255, 136, 0.3);
    animation: glow 2s ease-in-out infinite alternate;
  }

  .unit {
    font-size: 2.5rem;
    color: #0d7f4a;
    font-weight: 600;
  }

  @keyframes glow {
    from {
      text-shadow: 0 0 20px rgba(0, 255, 136, 0.5),
                   0 0 40px rgba(0, 255, 136, 0.3);
    }
    to {
      text-shadow: 0 0 30px rgba(0, 255, 136, 0.8),
                   0 0 60px rgba(0, 255, 136, 0.5),
                   0 0 80px rgba(0, 255, 136, 0.3);
    }
  }

  @media (max-width: 768px) {
    .digit {
      font-size: 4rem;
    }
    .unit {
      font-size: 1.8rem;
    }
    .countdown-label {
      font-size: 1rem;
    }
  }
</style>
