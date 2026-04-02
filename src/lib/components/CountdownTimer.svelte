<script>
  import { onMount } from "svelte";

  let days = 0;

  onMount(() => {
    const eventDate = new Date("2025-11-02T00:00:00");
    const now = new Date();
    const diffTime = now - eventDate;
    days = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  });
</script>

<div class="countdown-container">
  <div class="countdown-box">
    <div class="hologram-border"></div>
    <div class="countdown-number">{days}</div>
    <div class="countdown-label">DAYS SINCE</div>
    <div class="corner tl"></div>
    <div class="corner tr"></div>
    <div class="corner bl"></div>
    <div class="corner br"></div>
  </div>
</div>

<style>
  .countdown-container {
    display: flex;
    justify-content: center;
    margin: 2rem 0;
  }

  .countdown-box {
    background: rgba(10, 15, 26, 0.8);
    border: 2px solid #86e293;
    border-radius: 1rem;
    padding: 2rem 3rem;
    box-shadow:
      0 0 30px rgba(134, 226, 147, 0.3),
      inset 0 0 20px rgba(134, 226, 147, 0.1);
    animation: pulse 3s ease-in-out infinite;
    position: relative;
    overflow: hidden;
  }

  .hologram-border {
    position: absolute;
    inset: -2px;
    background: linear-gradient(
      45deg,
      transparent,
      #86e293,
      transparent,
      #86e6c6,
      transparent
    );
    background-size: 200% 200%;
    animation: hologram-rotate 4s linear infinite;
    border-radius: 1rem;
    z-index: -1;
  }

  .corner {
    position: absolute;
    width: 20px;
    height: 20px;
    border: 2px solid #86e293;
  }

  .corner.tl {
    top: -2px;
    left: -2px;
    border-right: none;
    border-bottom: none;
    animation: corner-glow 2s ease-in-out infinite;
  }

  .corner.tr {
    top: -2px;
    right: -2px;
    border-left: none;
    border-bottom: none;
    animation: corner-glow 2s ease-in-out infinite 0.5s;
  }

  .corner.bl {
    bottom: -2px;
    left: -2px;
    border-right: none;
    border-top: none;
    animation: corner-glow 2s ease-in-out infinite 1s;
  }

  .corner.br {
    bottom: -2px;
    right: -2px;
    border-left: none;
    border-top: none;
    animation: corner-glow 2s ease-in-out infinite 1.5s;
  }

  .countdown-number {
    font-size: 5rem;
    font-weight: 900;
    color: #86e293;
    text-align: center;
    line-height: 1;
    text-shadow:
      0 0 20px rgba(134, 226, 147, 0.8),
      0 0 40px rgba(134, 226, 147, 0.4);
    font-family: "Orbitron", monospace;
    position: relative;
    z-index: 1;
    animation: number-glow 2s ease-in-out infinite;
  }

  @keyframes number-glow {
    0%,
    100% {
      text-shadow:
        0 0 20px rgba(134, 226, 147, 0.8),
        0 0 40px rgba(134, 226, 147, 0.4);
    }
    50% {
      text-shadow:
        0 0 30px rgba(134, 226, 147, 1),
        0 0 60px rgba(134, 226, 147, 0.6),
        0 0 80px rgba(134, 226, 147, 0.3);
    }
  }

  .countdown-label {
    font-size: 0.875rem;
    font-weight: 700;
    color: #86e6c6;
    text-align: center;
    margin-top: 0.5rem;
    letter-spacing: 0.2em;
    font-family: "Orbitron", monospace;
  }

  @keyframes pulse {
    0%,
    100% {
      box-shadow:
        0 0 30px rgba(134, 226, 147, 0.3),
        inset 0 0 20px rgba(134, 226, 147, 0.1);
    }
    50% {
      box-shadow:
        0 0 50px rgba(134, 226, 147, 0.6),
        inset 0 0 30px rgba(134, 226, 147, 0.2);
    }
  }

  @keyframes hologram-rotate {
    0% {
      background-position: 0% 50%;
    }
    100% {
      background-position: 200% 50%;
    }
  }

  @keyframes corner-glow {
    0%,
    100% {
      box-shadow: 0 0 5px rgba(134, 226, 147, 0.5);
    }
    50% {
      box-shadow: 0 0 15px rgba(134, 226, 147, 1);
    }
  }

  @media (max-width: 640px) {
    .countdown-number {
      font-size: 3.5rem;
    }
    .countdown-box {
      padding: 1.5rem 2rem;
    }
  }
</style>
