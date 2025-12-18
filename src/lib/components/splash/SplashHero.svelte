<script>
  import { onMount } from "svelte";

  let daysSinceEvent = $state(0);
  let visible = $state(false);
  let glitchActive = $state(false);

  const eventDate = new Date("2025-11-02T00:00:00");

  onMount(() => {
    const now = new Date();
    const diffTime = Math.abs(now - eventDate);
    daysSinceEvent = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    visible = true;

    const glitchInterval = setInterval(() => {
      glitchActive = true;
      setTimeout(() => (glitchActive = false), 200);
    }, 4000);

    return () => clearInterval(glitchInterval);
  });
</script>

<div class="hero-container" class:visible>
  <div class="hero-content">
    <div class="logo-container">
      <img
        src="/cam-hack-logo-text.png"
        alt="Cam Hack Logo"
        class="hero-logo"
      />
      <div class="logo-glow"></div>
    </div>

    <h1
      class="hero-title"
      class:glitch={glitchActive}
      data-text="Cam Hack 2025"
    >
      Cam&nbsp;Hack&nbsp;2025
    </h1>

    <h2 class="hero-date">1st&nbsp;&ndash;&nbsp;2nd&nbsp;November</h2>

    <div class="countdown-container">
      <div class="countdown-label">Days Since Event</div>
      <div class="countdown-number">
        {#each String(daysSinceEvent).padStart(3, "0").split("") as digit, i}
          <span class="digit" style="animation-delay: {i * 0.1}s">{digit}</span>
        {/each}
      </div>
    </div>

    <p class="hero-tagline">What can you make in 2 days?</p>

    <div class="cta-buttons">
      <a href="/discord" target="_blank" class="btn btn-primary">
        <span class="btn-text">Join the Discord!</span>
        <span class="btn-glow"></span>
      </a>
      <a href="/signup" class="btn btn-secondary">
        <span class="btn-text">Signups closed</span>
      </a>
    </div>

    <div class="scroll-indicator">
      <div class="scroll-arrow"></div>
      <div class="scroll-arrow"></div>
      <div class="scroll-arrow"></div>
    </div>
  </div>
</div>

<style>
  .hero-container {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 2rem;
    opacity: 0;
    transform: translateY(30px);
    transition:
      opacity 1s ease,
      transform 1s ease;
  }

  .hero-container.visible {
    opacity: 1;
    transform: translateY(0);
  }

  .hero-content {
    max-width: 800px;
  }

  .logo-container {
    position: relative;
    display: inline-block;
    margin-bottom: 2rem;
  }

  .hero-logo {
    width: 200px;
    height: 200px;
    animation: float 6s ease-in-out infinite;
    filter: drop-shadow(0 0 30px rgba(0, 255, 136, 0.5));
  }

  .logo-glow {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 250px;
    height: 250px;
    background: radial-gradient(
      circle,
      rgba(0, 255, 136, 0.3) 0%,
      transparent 70%
    );
    transform: translate(-50%, -50%);
    animation: pulse 4s ease-in-out infinite;
    pointer-events: none;
  }

  @keyframes float {
    0%,
    100% {
      transform: translateY(0) rotate(0deg);
    }
    50% {
      transform: translateY(-20px) rotate(5deg);
    }
  }

  @keyframes pulse {
    0%,
    100% {
      transform: translate(-50%, -50%) scale(1);
      opacity: 0.5;
    }
    50% {
      transform: translate(-50%, -50%) scale(1.2);
      opacity: 0.8;
    }
  }

  .hero-title {
    font-size: clamp(3rem, 10vw, 6rem);
    font-weight: 700;
    color: #00ff88;
    text-shadow:
      0 0 10px rgba(0, 255, 136, 0.8),
      0 0 20px rgba(0, 255, 136, 0.6),
      0 0 30px rgba(0, 255, 136, 0.4),
      0 0 40px rgba(0, 255, 136, 0.2);
    margin-bottom: 1rem;
    position: relative;
    letter-spacing: 2px;
  }

  .hero-title.glitch {
    animation: glitch 0.2s linear;
  }

  .hero-title.glitch::before,
  .hero-title.glitch::after {
    content: attr(data-text);
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .hero-title.glitch::before {
    color: #ff00ff;
    animation: glitch-1 0.2s linear;
    clip-path: polygon(0 0, 100% 0, 100% 35%, 0 35%);
  }

  .hero-title.glitch::after {
    color: #00ffff;
    animation: glitch-2 0.2s linear;
    clip-path: polygon(0 65%, 100% 65%, 100% 100%, 0 100%);
  }

  @keyframes glitch {
    0% {
      transform: translate(0);
    }
    20% {
      transform: translate(-3px, 3px);
    }
    40% {
      transform: translate(-3px, -3px);
    }
    60% {
      transform: translate(3px, 3px);
    }
    80% {
      transform: translate(3px, -3px);
    }
    100% {
      transform: translate(0);
    }
  }

  @keyframes glitch-1 {
    0% {
      transform: translate(0);
    }
    20% {
      transform: translate(2px, -2px);
    }
    40% {
      transform: translate(-2px, 2px);
    }
    60% {
      transform: translate(2px, 1px);
    }
    80% {
      transform: translate(-1px, -2px);
    }
    100% {
      transform: translate(0);
    }
  }

  @keyframes glitch-2 {
    0% {
      transform: translate(0);
    }
    20% {
      transform: translate(-2px, 2px);
    }
    40% {
      transform: translate(2px, -2px);
    }
    60% {
      transform: translate(-2px, -1px);
    }
    80% {
      transform: translate(1px, 2px);
    }
    100% {
      transform: translate(0);
    }
  }

  .hero-date {
    font-size: clamp(1.5rem, 4vw, 2.5rem);
    color: #e6edf3;
    margin-bottom: 2rem;
    opacity: 0.9;
  }

  .countdown-container {
    margin: 3rem 0;
    padding: 2rem;
    background: rgba(0, 255, 136, 0.05);
    border: 1px solid rgba(0, 255, 136, 0.3);
    border-radius: 20px;
    backdrop-filter: blur(10px);
  }

  .countdown-label {
    font-size: 1rem;
    color: #9945ff;
    text-transform: uppercase;
    letter-spacing: 4px;
    margin-bottom: 1rem;
  }

  .countdown-number {
    display: flex;
    justify-content: center;
    gap: 0.5rem;
  }

  .digit {
    font-size: clamp(3rem, 8vw, 5rem);
    font-weight: 700;
    color: #00ff88;
    background: linear-gradient(180deg, #00ff88 0%, #0a9254 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: digitPop 0.5s ease-out forwards;
    opacity: 0;
    transform: translateY(20px);
  }

  @keyframes digitPop {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .hero-tagline {
    font-size: 1.5rem;
    color: #e6edf3;
    opacity: 0.8;
    margin-bottom: 2rem;
  }

  .cta-buttons {
    display: flex;
    gap: 1rem;
    justify-content: center;
    flex-wrap: wrap;
    margin-bottom: 3rem;
  }

  .btn {
    position: relative;
    padding: 1rem 2rem;
    font-size: 1.1rem;
    font-weight: 600;
    border-radius: 50px;
    text-decoration: none;
    overflow: hidden;
    transition: all 0.3s ease;
  }

  .btn-primary {
    background: linear-gradient(135deg, #00ff88 0%, #0a9254 100%);
    color: #0d1117;
  }

  .btn-primary:hover {
    transform: scale(1.05);
    box-shadow:
      0 0 20px rgba(0, 255, 136, 0.5),
      0 0 40px rgba(0, 255, 136, 0.3);
  }

  .btn-primary .btn-glow {
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.4),
      transparent
    );
    animation: shine 3s infinite;
  }

  @keyframes shine {
    0% {
      left: -100%;
    }
    50%,
    100% {
      left: 100%;
    }
  }

  .btn-secondary {
    background: rgba(255, 255, 255, 0.1);
    color: #888;
    border: 1px solid rgba(255, 255, 255, 0.2);
    cursor: not-allowed;
  }

  .btn-text {
    position: relative;
    z-index: 1;
  }

  .scroll-indicator {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.3rem;
    opacity: 0.5;
    animation: bounce 2s infinite;
  }

  .scroll-arrow {
    width: 15px;
    height: 15px;
    border-right: 2px solid #00ff88;
    border-bottom: 2px solid #00ff88;
    transform: rotate(45deg);
  }

  .scroll-arrow:nth-child(2) {
    animation-delay: 0.1s;
    opacity: 0.7;
  }

  .scroll-arrow:nth-child(3) {
    animation-delay: 0.2s;
    opacity: 0.4;
  }

  @keyframes bounce {
    0%,
    20%,
    50%,
    80%,
    100% {
      transform: translateY(0);
    }
    40% {
      transform: translateY(10px);
    }
    60% {
      transform: translateY(5px);
    }
  }

  @media (max-width: 640px) {
    .hero-logo {
      width: 150px;
      height: 150px;
    }

    .countdown-container {
      padding: 1.5rem 1rem;
    }

    .btn {
      padding: 0.8rem 1.5rem;
      font-size: 1rem;
    }
  }
</style>
