<script>
  import { onMount } from "svelte";

  let daysSinceEvent = $state(0);
  let heroVisible = $state(false);

  const eventDate = new Date("2025-11-02T18:30:00");

  onMount(() => {
    const now = new Date();
    const diff = now.getTime() - eventDate.getTime();
    daysSinceEvent = Math.max(0, Math.floor(diff / (1000 * 60 * 60 * 24)));

    setTimeout(() => {
      heroVisible = true;
    }, 100);
  });
</script>

<div class="hero-container">
  <div class="hero-content" class:visible={heroVisible}>
    <div class="logo-wrapper">
      <img
        src="/cam-hack-logo-text.png"
        alt="Cam Hack Logo"
        class="hero-logo"
      />
      <div class="logo-glow"></div>
    </div>

    <h1 class="hero-title">
      <span class="title-letter">C</span><span class="title-letter">a</span
      ><span class="title-letter">m</span>
      <span class="title-space"></span>
      <span class="title-letter">H</span><span class="title-letter">a</span
      ><span class="title-letter">c</span><span class="title-letter">k</span>
      <span class="title-space"></span>
      <span class="title-letter">2</span><span class="title-letter">0</span
      ><span class="title-letter">2</span><span class="title-letter">5</span>
    </h1>

    <h3 class="hero-date">1st&nbsp;&ndash;&nbsp;2nd&nbsp;November</h3>

    <div class="countdown-container">
      <div class="countdown-label">Days Since Event</div>
      <div class="countdown-number">
        <span class="digit">{daysSinceEvent}</span>
      </div>
      <div class="countdown-glow"></div>
    </div>

    <p class="hero-tagline">What can you make in 2 days?</p>

    <div class="hero-buttons">
      <a target="_blank" href="/discord" class="glow-button"> Join the Discord! </a>
      <a href="#about" class="outline-button"> Explore </a>
    </div>
  </div>

  <div class="scroll-indicator">
    <div class="scroll-arrow"></div>
    <div class="scroll-arrow"></div>
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
    overflow: hidden;
  }

  .hero-content {
    text-align: center;
    opacity: 0;
    transform: translateY(50px);
    transition:
      opacity 1s ease,
      transform 1s ease;
    z-index: 10;
  }

  .hero-content.visible {
    opacity: 1;
    transform: translateY(0);
  }

  .logo-wrapper {
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

  @media (min-width: 640px) {
    .hero-logo {
      width: 280px;
      height: 280px;
    }
  }

  .logo-glow {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 300px;
    height: 300px;
    background: radial-gradient(
      circle,
      rgba(0, 255, 136, 0.3) 0%,
      transparent 70%
    );
    pointer-events: none;
    animation: pulse-glow 4s ease-in-out infinite;
  }

  .hero-title {
    font-family: "Orbitron", "Space Mono", monospace;
    font-size: 3rem;
    font-weight: 900;
    letter-spacing: 0.1em;
    margin-bottom: 1rem;
    color: #00ff88;
  }

  @media (min-width: 640px) {
    .hero-title {
      font-size: 4.5rem;
    }
  }

  @media (min-width: 768px) {
    .hero-title {
      font-size: 6rem;
    }
  }

  .title-letter {
    display: inline-block;
    animation: glow-text 3s ease-in-out infinite;
    animation-delay: calc(var(--index, 0) * 0.1s);
  }

  .title-letter:nth-child(1) {
    --index: 0;
  }
  .title-letter:nth-child(2) {
    --index: 1;
  }
  .title-letter:nth-child(3) {
    --index: 2;
  }
  .title-letter:nth-child(5) {
    --index: 3;
  }
  .title-letter:nth-child(6) {
    --index: 4;
  }
  .title-letter:nth-child(7) {
    --index: 5;
  }
  .title-letter:nth-child(8) {
    --index: 6;
  }
  .title-letter:nth-child(10) {
    --index: 7;
  }
  .title-letter:nth-child(11) {
    --index: 8;
  }
  .title-letter:nth-child(12) {
    --index: 9;
  }
  .title-letter:nth-child(13) {
    --index: 10;
  }

  .title-space {
    display: inline-block;
    width: 0.5em;
  }

  .hero-date {
    font-size: 1.5rem;
    color: #00ffcc;
    margin-bottom: 2rem;
    text-shadow: 0 0 10px rgba(0, 255, 204, 0.5);
  }

  @media (min-width: 640px) {
    .hero-date {
      font-size: 2rem;
    }
  }

  .countdown-container {
    position: relative;
    display: inline-block;
    padding: 2rem 4rem;
    margin-bottom: 2rem;
    background: rgba(0, 255, 136, 0.05);
    border: 2px solid rgba(0, 255, 136, 0.3);
    border-radius: 20px;
    backdrop-filter: blur(10px);
  }

  .countdown-label {
    font-size: 0.875rem;
    text-transform: uppercase;
    letter-spacing: 0.3em;
    color: #00ffcc;
    margin-bottom: 0.5rem;
  }

  .countdown-number {
    font-family: "Orbitron", monospace;
    font-size: 5rem;
    font-weight: 900;
    color: #00ff88;
    text-shadow:
      0 0 20px rgba(0, 255, 136, 0.8),
      0 0 40px rgba(0, 255, 136, 0.5),
      0 0 60px rgba(0, 255, 136, 0.3);
    line-height: 1;
  }

  @media (min-width: 640px) {
    .countdown-number {
      font-size: 7rem;
    }
  }

  .digit {
    display: inline-block;
    animation: float 3s ease-in-out infinite;
  }

  .countdown-glow {
    position: absolute;
    inset: -2px;
    border-radius: 22px;
    background: linear-gradient(
      135deg,
      rgba(0, 255, 136, 0.2),
      transparent,
      rgba(0, 255, 204, 0.2)
    );
    z-index: -1;
    animation: rotate-slow 10s linear infinite;
    filter: blur(15px);
  }

  .hero-tagline {
    font-size: 1.25rem;
    color: rgba(255, 255, 255, 0.8);
    margin-bottom: 2rem;
  }

  @media (min-width: 640px) {
    .hero-tagline {
      font-size: 1.5rem;
    }
  }

  .hero-buttons {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    justify-content: center;
  }

  .outline-button {
    padding: 1rem 2rem;
    border: 2px solid #00ff88;
    border-radius: 12px;
    color: #00ff88;
    font-weight: bold;
    text-decoration: none;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
  }

  .outline-button:hover {
    background: rgba(0, 255, 136, 0.1);
    box-shadow: 0 0 30px rgba(0, 255, 136, 0.3);
    transform: scale(1.05);
  }

  .scroll-indicator {
    position: absolute;
    bottom: 2rem;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.25rem;
    opacity: 0.6;
    animation: float 2s ease-in-out infinite;
  }

  .scroll-arrow {
    width: 12px;
    height: 12px;
    border-right: 2px solid #00ff88;
    border-bottom: 2px solid #00ff88;
    transform: rotate(45deg);
    animation: scroll-fade 2s ease-in-out infinite;
  }

  .scroll-arrow:nth-child(2) {
    animation-delay: 0.2s;
  }

  .scroll-arrow:nth-child(3) {
    animation-delay: 0.4s;
  }

  @keyframes scroll-fade {
    0%,
    100% {
      opacity: 0.3;
    }
    50% {
      opacity: 1;
    }
  }

  @keyframes float {
    0%,
    100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-10px);
    }
  }

  @keyframes pulse-glow {
    0%,
    100% {
      opacity: 0.5;
      transform: translate(-50%, -50%) scale(1);
    }
    50% {
      opacity: 0.8;
      transform: translate(-50%, -50%) scale(1.1);
    }
  }

  @keyframes glow-text {
    0%,
    100% {
      text-shadow:
        0 0 10px #00ff88,
        0 0 20px #00ff88;
    }
    50% {
      text-shadow:
        0 0 20px #00ff88,
        0 0 40px #00ff88,
        0 0 60px #00ff88;
    }
  }

  @keyframes rotate-slow {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
</style>
