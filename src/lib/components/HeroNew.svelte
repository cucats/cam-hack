<script>
  import { onMount } from "svelte";

  let daysSince = 0;

  onMount(() => {
    const eventDate = new Date("2025-11-01");
    const now = new Date();
    const diffTime = Math.abs(now - eventDate);
    daysSince = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  });
</script>

<div class="hero-container">
  <div class="hero-bg-glow"></div>
  <div class="hero-content">
    <div class="logo-wrapper">
      <img
        src="/cam-hack-logo-text.png"
        alt="Cam Hack Logo"
        class="logo-float"
      />
    </div>
    
    <div class="title-wrapper">
      <h1 class="main-title">
        <span class="glitch" data-text="CAM HACK">CAM HACK</span>
      </h1>
      <h2 class="year-title">2025</h2>
    </div>

    <div class="date-section">
      <p class="event-date">1st - 2nd November</p>
    </div>

    <div class="countdown-section">
      <div class="countdown-box">
        <div class="countdown-number">{daysSince}</div>
        <div class="countdown-label">days since event</div>
      </div>
    </div>

    <div class="tagline">
      <p class="tagline-text">What can you make in 2 days?</p>
    </div>

    <div class="cta-buttons">
      <a
        target="_blank"
        href="/discord"
        class="cta-button cta-primary"
      >
        <span class="button-text">Join the Discord</span>
        <span class="button-glow"></span>
      </a>
      <a
        target="_blank"
        href="/signup"
        class="cta-button cta-disabled"
      >
        <span class="button-text">Signups closed</span>
      </a>
    </div>
  </div>
</div>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Space+Mono:wght@400;700&display=swap');

  .hero-container {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem;
    position: relative;
    overflow: hidden;
  }

  .hero-bg-glow {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 800px;
    height: 800px;
    background: radial-gradient(circle, rgba(0, 255, 136, 0.15) 0%, transparent 70%);
    animation: pulseGlowBg 4s ease-in-out infinite;
    pointer-events: none;
  }

  @keyframes pulseGlowBg {
    0%, 100% {
      transform: translate(-50%, -50%) scale(1);
      opacity: 0.5;
    }
    50% {
      transform: translate(-50%, -50%) scale(1.2);
      opacity: 0.8;
    }
  }

  .hero-content {
    max-width: 1200px;
    width: 100%;
    text-align: center;
    z-index: 1;
  }

  .logo-wrapper {
    margin-bottom: 3rem;
    animation: floatAnimation 6s ease-in-out infinite;
  }

  .logo-float {
    width: 280px;
    height: 280px;
    filter: drop-shadow(0 0 30px rgba(0, 255, 136, 0.5));
    transition: transform 0.3s ease;
  }

  .logo-float:hover {
    transform: scale(1.05);
  }

  .title-wrapper {
    margin-bottom: 2rem;
  }

  .main-title {
    font-family: 'Orbitron', sans-serif;
    font-size: clamp(3rem, 10vw, 8rem);
    font-weight: 900;
    letter-spacing: 0.5rem;
    margin-bottom: 1rem;
    color: #00ff88;
    text-shadow: 
      0 0 10px rgba(0, 255, 136, 0.5),
      0 0 20px rgba(0, 255, 136, 0.3),
      0 0 30px rgba(0, 255, 136, 0.2);
  }

  .glitch {
    position: relative;
    display: inline-block;
    animation: glitchAnimation 3s infinite;
  }

  .glitch::before,
  .glitch::after {
    content: attr(data-text);
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0.8;
  }

  .glitch::before {
    color: #ff0088;
    animation: glitchBefore 1.5s infinite;
    clip-path: polygon(0 0, 100% 0, 100% 45%, 0 45%);
  }

  .glitch::after {
    color: #0088ff;
    animation: glitchAfter 2s infinite;
    clip-path: polygon(0 55%, 100% 55%, 100% 100%, 0 100%);
  }

  @keyframes glitchAnimation {
    0%, 90%, 100% {
      transform: translate(0);
    }
    92% {
      transform: translate(-2px, 2px);
    }
    94% {
      transform: translate(2px, -2px);
    }
    96% {
      transform: translate(-1px, 1px);
    }
  }

  @keyframes glitchBefore {
    0%, 90%, 100% {
      transform: translate(0);
    }
    91% {
      transform: translate(-2px, 0);
    }
    93% {
      transform: translate(2px, 0);
    }
  }

  @keyframes glitchAfter {
    0%, 90%, 100% {
      transform: translate(0);
    }
    91% {
      transform: translate(2px, 0);
    }
    93% {
      transform: translate(-2px, 0);
    }
  }

  .year-title {
    font-family: 'Orbitron', sans-serif;
    font-size: clamp(2rem, 6vw, 4rem);
    font-weight: 700;
    color: #88ffb8;
    letter-spacing: 1rem;
    text-shadow: 0 0 20px rgba(136, 255, 184, 0.5);
  }

  .date-section {
    margin-bottom: 3rem;
  }

  .event-date {
    font-family: 'Space Mono', monospace;
    font-size: clamp(1.2rem, 3vw, 2rem);
    color: #88ffb8;
    letter-spacing: 0.3rem;
    text-transform: uppercase;
  }

  .countdown-section {
    margin-bottom: 3rem;
    display: flex;
    justify-content: center;
  }

  .countdown-box {
    background: linear-gradient(135deg, rgba(0, 255, 136, 0.1) 0%, rgba(10, 77, 46, 0.3) 100%);
    border: 2px solid #00ff88;
    border-radius: 20px;
    padding: 2rem 4rem;
    box-shadow: 
      0 0 30px rgba(0, 255, 136, 0.3),
      inset 0 0 20px rgba(0, 255, 136, 0.1);
    animation: pulseGlow 2s ease-in-out infinite;
  }

  .countdown-number {
    font-family: 'Orbitron', sans-serif;
    font-size: clamp(3rem, 8vw, 6rem);
    font-weight: 900;
    color: #00ff88;
    line-height: 1;
    margin-bottom: 0.5rem;
    text-shadow: 0 0 20px rgba(0, 255, 136, 0.8);
  }

  .countdown-label {
    font-family: 'Space Mono', monospace;
    font-size: clamp(0.9rem, 2vw, 1.2rem);
    color: #88ffb8;
    text-transform: uppercase;
    letter-spacing: 0.2rem;
  }

  @keyframes pulseGlow {
    0%, 100% {
      box-shadow: 
        0 0 30px rgba(0, 255, 136, 0.3),
        inset 0 0 20px rgba(0, 255, 136, 0.1);
    }
    50% {
      box-shadow: 
        0 0 50px rgba(0, 255, 136, 0.5),
        inset 0 0 30px rgba(0, 255, 136, 0.2);
    }
  }

  .tagline {
    margin-bottom: 3rem;
  }

  .tagline-text {
    font-family: 'Space Mono', monospace;
    font-size: clamp(1rem, 2.5vw, 1.8rem);
    color: #ffffff;
    font-weight: 700;
    letter-spacing: 0.1rem;
  }

  .cta-buttons {
    display: flex;
    gap: 2rem;
    justify-content: center;
    flex-wrap: wrap;
  }

  .cta-button {
    position: relative;
    font-family: 'Orbitron', sans-serif;
    font-size: clamp(0.9rem, 2vw, 1.2rem);
    font-weight: 700;
    padding: 1.2rem 2.5rem;
    border-radius: 15px;
    text-decoration: none;
    text-transform: uppercase;
    letter-spacing: 0.2rem;
    transition: all 0.3s ease;
    overflow: hidden;
    border: 2px solid transparent;
  }

  .cta-primary {
    background: linear-gradient(135deg, #00ff88 0%, #00cc6a 100%);
    color: #0a0a0a;
    border-color: #00ff88;
  }

  .cta-primary:hover {
    transform: translateY(-5px);
    box-shadow: 
      0 10px 30px rgba(0, 255, 136, 0.4),
      0 0 50px rgba(0, 255, 136, 0.3);
  }

  .cta-primary .button-glow {
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: linear-gradient(
      45deg,
      transparent,
      rgba(255, 255, 255, 0.3),
      transparent
    );
    transform: rotate(45deg);
    animation: buttonShine 3s infinite;
  }

  @keyframes buttonShine {
    0% {
      transform: translateX(-100%) rotate(45deg);
    }
    50%, 100% {
      transform: translateX(100%) rotate(45deg);
    }
  }

  .cta-disabled {
    background: rgba(100, 100, 100, 0.3);
    color: #666;
    border-color: #444;
    cursor: not-allowed;
    pointer-events: none;
  }

  .button-text {
    position: relative;
    z-index: 1;
  }

  @keyframes floatAnimation {
    0%, 100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-20px);
    }
  }

  @media (max-width: 768px) {
    .hero-container {
      padding: 1rem;
    }

    .logo-float {
      width: 200px;
      height: 200px;
    }

    .countdown-box {
      padding: 1.5rem 2.5rem;
    }

    .cta-buttons {
      gap: 1rem;
      flex-direction: column;
      align-items: stretch;
    }

    .cta-button {
      padding: 1rem 2rem;
    }
  }
</style>
