<script>
  import { onMount } from 'svelte';
  
  let daysSince = $state(0);
  
  onMount(() => {
    const eventDate = new Date('2025-11-01T00:00:00');
    const now = new Date();
    const timeDiff = now - eventDate;
    daysSince = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
  });
</script>

<div class="countdown-container">
  <div class="countdown-value">{daysSince}</div>
  <div class="countdown-label">Days Since Cam Hack 2025</div>
</div>

<style>
  .countdown-container {
    text-align: center;
    padding: 2rem;
    background: linear-gradient(135deg, rgba(0, 255, 136, 0.1), rgba(13, 255, 0, 0.1));
    border: 2px solid rgba(0, 255, 136, 0.3);
    border-radius: 20px;
    backdrop-filter: blur(10px);
    box-shadow: 0 8px 32px rgba(0, 255, 136, 0.2);
  }

  .countdown-value {
    font-size: 5rem;
    font-weight: 900;
    background: linear-gradient(135deg, #00ff88, #0dff00);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-shadow: 0 0 30px rgba(0, 255, 136, 0.5);
    line-height: 1;
    margin-bottom: 0.5rem;
  }

  .countdown-label {
    font-size: 1.2rem;
    color: #00ff88;
    text-transform: uppercase;
    letter-spacing: 2px;
    font-weight: 600;
  }

  @media (max-width: 768px) {
    .countdown-value {
      font-size: 3rem;
    }

    .countdown-label {
      font-size: 0.9rem;
    }
  }
</style>
