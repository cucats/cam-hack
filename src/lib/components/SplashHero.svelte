<script>
  import { onMount } from "svelte";

  let daysSince = 0;
  let mounted = false;

  onMount(() => {
    mounted = true;
    const eventDate = new Date("2025-11-01");
    const today = new Date();
    const diffTime = Math.abs(today - eventDate);
    daysSince = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    const elements = document.querySelectorAll(".fade-in-up");
    elements.forEach((el, index) => {
      setTimeout(() => {
        el.classList.add("visible");
      }, index * 200);
    });
  });
</script>

<div class="hero-container">
  <div class="content-wrapper">
    <div class="logo-container fade-in-up">
      <img
        src="/cam-hack-logo-text.png"
        alt="Cam Hack Logo"
        class="logo pulsing-logo"
      />
    </div>

    <div class="title-container">
      <h1 class="main-title fade-in-up glitch-text">Cam Hack 2025</h1>
      <h2 class="subtitle fade-in-up">1st - 2nd November</h2>

      <div class="countdown-container fade-in-up">
        <div class="countdown-box">
          <span class="countdown-number">{daysSince}</span>
          <span class="countdown-label">Days Since</span>
        </div>
      </div>

      <div class="tagline fade-in-up">
        <p class="tagline-text">What can you make in 2 days?</p>
      </div>

      <div class="cta-buttons fade-in-up">
        <a href="/discord" target="_blank" class="cta-button primary">
          <span class="button-text">Join Discord</span>
          <span class="button-glow"></span>
        </a>
        <a
          href="https://cam-hack-2025.devpost.com"
          target="_blank"
          class="cta-button secondary"
        >
          <span class="button-text">View Projects</span>
          <span class="button-glow"></span>
        </a>
      </div>
    </div>
  </div>

  <div class="scroll-indicator">
    <div class="scroll-arrow"></div>
  </div>
</div>

<style>
  .hero-container {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
    padding: 2rem;
    color: white;
  }

  .content-wrapper {
    max-width: 1200px;
    width: 100%;
    text-align: center;
    z-index: 1;
  }

  .logo-container {
    margin-bottom: 2rem;
    display: flex;
    justify-content: center;
  }

  .logo {
    width: 300px;
    height: 300px;
    filter: drop-shadow(0 0 30px rgba(16, 185, 129, 0.5));
    animation: float 6s ease-in-out infinite;
  }

  .pulsing-logo {
    animation:
      float 6s ease-in-out infinite,
      pulse 3s ease-in-out infinite;
  }

  @keyframes float {
    0%,
    100% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(-20px);
    }
  }

  @keyframes pulse {
    0%,
    100% {
      filter: drop-shadow(0 0 30px rgba(16, 185, 129, 0.5));
    }
    50% {
      filter: drop-shadow(0 0 50px rgba(16, 185, 129, 0.8));
    }
  }

  .title-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
  }

  .main-title {
    font-size: clamp(3rem, 8vw, 6rem);
    font-weight: bold;
    margin: 0;
    background: linear-gradient(135deg, #10b981, #34d399, #06b6d4);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    letter-spacing: 0.05em;
    text-shadow: 0 0 40px rgba(16, 185, 129, 0.5);
    position: relative;
  }

  .glitch-text::before,
  .glitch-text::after {
    content: attr(data-text);
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .subtitle {
    font-size: clamp(1.5rem, 3vw, 2.5rem);
    font-weight: 600;
    color: #86e293;
    margin: 0;
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }

  .countdown-container {
    display: flex;
    justify-content: center;
    gap: 2rem;
    margin: 2rem 0;
  }

  .countdown-box {
    background: rgba(16, 185, 129, 0.1);
    border: 2px solid #10b981;
    border-radius: 1rem;
    padding: 2rem 3rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    position: relative;
    overflow: hidden;
    box-shadow:
      0 0 30px rgba(16, 185, 129, 0.3),
      inset 0 0 30px rgba(16, 185, 129, 0.1);
    animation: glow-border 2s ease-in-out infinite;
  }

  @keyframes glow-border {
    0%,
    100% {
      box-shadow:
        0 0 30px rgba(16, 185, 129, 0.3),
        inset 0 0 30px rgba(16, 185, 129, 0.1);
    }
    50% {
      box-shadow:
        0 0 50px rgba(16, 185, 129, 0.5),
        inset 0 0 50px rgba(16, 185, 129, 0.2);
    }
  }

  .countdown-number {
    font-size: clamp(3rem, 6vw, 5rem);
    font-weight: bold;
    color: #10b981;
    text-shadow: 0 0 20px rgba(16, 185, 129, 0.8);
    animation: number-glow 1.5s ease-in-out infinite;
  }

  @keyframes number-glow {
    0%,
    100% {
      text-shadow: 0 0 20px rgba(16, 185, 129, 0.8);
    }
    50% {
      text-shadow: 0 0 40px rgba(16, 185, 129, 1);
    }
  }

  .countdown-label {
    font-size: 1rem;
    color: #86e293;
    letter-spacing: 0.15em;
    text-transform: uppercase;
  }

  .tagline {
    margin: 2rem 0;
  }

  .tagline-text {
    font-size: clamp(1.25rem, 2vw, 1.75rem);
    color: #e5e7eb;
    font-weight: 300;
    letter-spacing: 0.05em;
  }

  .cta-buttons {
    display: flex;
    gap: 1.5rem;
    justify-content: center;
    flex-wrap: wrap;
    margin-top: 2rem;
  }

  .cta-button {
    position: relative;
    padding: 1.25rem 3rem;
    font-size: 1.125rem;
    font-weight: 600;
    text-decoration: none;
    border-radius: 0.75rem;
    overflow: hidden;
    transition: all 0.3s ease;
    border: 2px solid transparent;
    letter-spacing: 0.05em;
    text-transform: uppercase;
  }

  .cta-button.primary {
    background: linear-gradient(135deg, #10b981, #059669);
    color: white;
    border-color: #10b981;
    box-shadow: 0 0 20px rgba(16, 185, 129, 0.4);
  }

  .cta-button.secondary {
    background: rgba(6, 182, 212, 0.1);
    color: #22d3ee;
    border-color: #06b6d4;
    box-shadow: 0 0 20px rgba(6, 182, 212, 0.3);
  }

  .cta-button:hover {
    transform: translateY(-3px) scale(1.05);
  }

  .cta-button.primary:hover {
    box-shadow: 0 0 40px rgba(16, 185, 129, 0.6);
  }

  .cta-button.secondary:hover {
    box-shadow: 0 0 40px rgba(6, 182, 212, 0.5);
  }

  .button-text {
    position: relative;
    z-index: 2;
  }

  .button-glow {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 0;
    height: 0;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.3);
    transition:
      width 0.6s,
      height 0.6s;
  }

  .cta-button:hover .button-glow {
    width: 300px;
    height: 300px;
  }

  .scroll-indicator {
    position: absolute;
    bottom: 2rem;
    left: 50%;
    transform: translateX(-50%);
    animation: bounce 2s infinite;
  }

  .scroll-arrow {
    width: 30px;
    height: 30px;
    border-left: 3px solid #10b981;
    border-bottom: 3px solid #10b981;
    transform: rotate(-45deg);
  }

  @keyframes bounce {
    0%,
    20%,
    50%,
    80%,
    100% {
      transform: translateX(-50%) translateY(0);
    }
    40% {
      transform: translateX(-50%) translateY(-10px);
    }
    60% {
      transform: translateX(-50%) translateY(-5px);
    }
  }

  .fade-in-up {
    opacity: 0;
    transform: translateY(30px);
    transition:
      opacity 0.8s ease,
      transform 0.8s ease;
  }

  .fade-in-up:global(.visible) {
    opacity: 1;
    transform: translateY(0);
  }

  @media (max-width: 768px) {
    .logo {
      width: 200px;
      height: 200px;
    }

    .countdown-box {
      padding: 1.5rem 2rem;
    }

    .cta-buttons {
      flex-direction: column;
      align-items: stretch;
    }

    .cta-button {
      width: 100%;
    }
  }
</style>
