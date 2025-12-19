<script>
  import { onMount } from 'svelte';

  let days = $state(0);
  let mounted = $state(false);

  onMount(() => {
    const eventDate = new Date('2025-11-01T00:00:00');
    const now = new Date();
    const diff = now - eventDate;
    days = Math.floor(diff / (1000 * 60 * 60 * 24));
    mounted = true;
  });
</script>

<div class="hero-container">
  <div class="hero-content" class:mounted>
    <div class="logo-container">
      <img src="/cam-hack-logo-text.png" alt="Cam Hack Logo" class="hero-logo" />
    </div>
    
    <h1 class="hero-title">
      <span class="glitch" data-text="CAM HACK 2025">CAM HACK 2025</span>
    </h1>
    
    <div class="date-container">
      <p class="hero-date">1st - 2nd November 2025</p>
    </div>

    <div class="countdown-container">
      <div class="countdown-box">
        <div class="countdown-number">{days}</div>
        <div class="countdown-label">Days Since Event</div>
      </div>
    </div>

    <div class="cta-container">
      <a href="/discord" target="_blank" class="cta-button primary">
        <span class="button-text">Join Discord</span>
        <span class="button-glow"></span>
      </a>
      <a href="/signup" class="cta-button secondary disabled">
        <span class="button-text">Signups Closed</span>
        <span class="button-glow"></span>
      </a>
    </div>

    <p class="hero-tagline">What can you make in 2 days?</p>
  </div>

  <div class="scroll-indicator">
    <div class="scroll-arrow"></div>
  </div>
</div>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Space+Mono:wght@400;700&display=swap');

  .hero-container {
    position: relative;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem;
    overflow: hidden;
  }

  .hero-content {
    position: relative;
    z-index: 10;
    text-align: center;
    max-width: 1200px;
    opacity: 0;
    transform: translateY(30px);
    transition: all 1s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .hero-content.mounted {
    opacity: 1;
    transform: translateY(0);
  }

  .logo-container {
    margin-bottom: 2rem;
    animation: float 3s ease-in-out infinite;
  }

  .hero-logo {
    width: 200px;
    height: 200px;
    filter: drop-shadow(0 0 30px rgba(0, 255, 136, 0.5));
    transition: all 0.3s ease;
  }

  .hero-logo:hover {
    filter: drop-shadow(0 0 50px rgba(0, 255, 136, 0.8));
    transform: scale(1.05);
  }

  .hero-title {
    font-family: 'Orbitron', monospace;
    font-size: clamp(3rem, 10vw, 7rem);
    font-weight: 900;
    margin-bottom: 1rem;
    letter-spacing: 0.1em;
    color: #00ff88;
    text-shadow: 0 0 10px rgba(0, 255, 136, 0.5),
                 0 0 20px rgba(0, 255, 136, 0.3),
                 0 0 30px rgba(0, 255, 136, 0.2);
  }

  .glitch {
    position: relative;
    display: inline-block;
  }

  .glitch::before,
  .glitch::after {
    content: attr(data-text);
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .glitch::before {
    animation: glitch-1 2s infinite;
    color: #00ccff;
    z-index: -1;
  }

  .glitch::after {
    animation: glitch-2 3s infinite;
    color: #ff00aa;
    z-index: -2;
  }

  @keyframes glitch-1 {
    0%, 100% {
      transform: translate(0);
      opacity: 0;
    }
    20% {
      transform: translate(-2px, 2px);
      opacity: 0.8;
    }
    40% {
      transform: translate(-2px, -2px);
      opacity: 0;
    }
    60% {
      transform: translate(2px, 2px);
      opacity: 0.8;
    }
    80% {
      transform: translate(2px, -2px);
      opacity: 0;
    }
  }

  @keyframes glitch-2 {
    0%, 100% {
      transform: translate(0);
      opacity: 0;
    }
    10% {
      transform: translate(3px, 3px);
      opacity: 0.6;
    }
    30% {
      transform: translate(-3px, -3px);
      opacity: 0;
    }
    50% {
      transform: translate(3px, -3px);
      opacity: 0.6;
    }
    70% {
      transform: translate(-3px, 3px);
      opacity: 0;
    }
  }

  .date-container {
    margin-bottom: 3rem;
  }

  .hero-date {
    font-family: 'Space Mono', monospace;
    font-size: clamp(1.2rem, 3vw, 2rem);
    color: #00ccff;
    text-shadow: 0 0 10px rgba(0, 204, 255, 0.5);
    letter-spacing: 0.05em;
  }

  .countdown-container {
    margin: 3rem 0;
    display: flex;
    justify-content: center;
    gap: 2rem;
  }

  .countdown-box {
    position: relative;
    padding: 2rem 3rem;
    background: linear-gradient(135deg, rgba(0, 255, 136, 0.1), rgba(0, 204, 255, 0.1));
    border: 2px solid rgba(0, 255, 136, 0.3);
    border-radius: 20px;
    backdrop-filter: blur(10px);
    box-shadow: 0 0 30px rgba(0, 255, 136, 0.2),
                inset 0 0 20px rgba(0, 255, 136, 0.05);
    transition: all 0.3s ease;
  }

  .countdown-box:hover {
    border-color: rgba(0, 255, 136, 0.6);
    box-shadow: 0 0 50px rgba(0, 255, 136, 0.4),
                inset 0 0 30px rgba(0, 255, 136, 0.1);
    transform: translateY(-5px);
  }

  .countdown-number {
    font-family: 'Orbitron', monospace;
    font-size: clamp(3rem, 8vw, 5rem);
    font-weight: 900;
    color: #00ff88;
    text-shadow: 0 0 20px rgba(0, 255, 136, 0.8);
    line-height: 1;
  }

  .countdown-label {
    font-family: 'Space Mono', monospace;
    font-size: clamp(0.8rem, 2vw, 1rem);
    color: #00ccff;
    margin-top: 0.5rem;
    text-transform: uppercase;
    letter-spacing: 0.1em;
  }

  .cta-container {
    display: flex;
    gap: 1.5rem;
    justify-content: center;
    flex-wrap: wrap;
    margin: 3rem 0;
  }

  .cta-button {
    position: relative;
    padding: 1.2rem 2.5rem;
    font-family: 'Orbitron', monospace;
    font-size: 1.1rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    border: none;
    border-radius: 50px;
    cursor: pointer;
    overflow: hidden;
    transition: all 0.3s ease;
    text-decoration: none;
    display: inline-block;
  }

  .cta-button.primary {
    background: linear-gradient(135deg, #00ff88, #00ccff);
    color: #0a0e27;
    box-shadow: 0 0 30px rgba(0, 255, 136, 0.5);
  }

  .cta-button.primary:hover {
    box-shadow: 0 0 50px rgba(0, 255, 136, 0.8);
    transform: translateY(-3px) scale(1.05);
  }

  .cta-button.secondary {
    background: linear-gradient(135deg, rgba(100, 100, 100, 0.3), rgba(80, 80, 80, 0.3));
    color: rgba(255, 255, 255, 0.5);
    box-shadow: 0 0 20px rgba(100, 100, 100, 0.3);
  }

  .cta-button.disabled {
    cursor: not-allowed;
    opacity: 0.6;
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
    background: radial-gradient(circle, rgba(255, 255, 255, 0.3), transparent);
    transition: all 0.5s ease;
  }

  .cta-button:hover .button-glow {
    width: 300%;
    height: 300%;
  }

  .hero-tagline {
    font-family: 'Space Mono', monospace;
    font-size: clamp(1rem, 2.5vw, 1.5rem);
    color: rgba(255, 255, 255, 0.7);
    margin-top: 2rem;
    letter-spacing: 0.05em;
  }

  .scroll-indicator {
    position: absolute;
    bottom: 2rem;
    left: 50%;
    transform: translateX(-50%);
    z-index: 10;
  }

  .scroll-arrow {
    width: 30px;
    height: 50px;
    border: 2px solid rgba(0, 255, 136, 0.5);
    border-radius: 25px;
    position: relative;
    animation: scroll 2s infinite;
  }

  .scroll-arrow::before {
    content: '';
    position: absolute;
    top: 10px;
    left: 50%;
    transform: translateX(-50%);
    width: 6px;
    height: 6px;
    background: #00ff88;
    border-radius: 50%;
    animation: scroll-dot 2s infinite;
  }

  @keyframes float {
    0%, 100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-20px);
    }
  }

  @keyframes scroll {
    0%, 100% {
      opacity: 0.5;
    }
    50% {
      opacity: 1;
    }
  }

  @keyframes scroll-dot {
    0% {
      top: 10px;
      opacity: 1;
    }
    100% {
      top: 30px;
      opacity: 0;
    }
  }

  @media (max-width: 768px) {
    .hero-logo {
      width: 150px;
      height: 150px;
    }

    .countdown-box {
      padding: 1.5rem 2rem;
    }

    .cta-container {
      flex-direction: column;
      align-items: center;
    }

    .cta-button {
      width: 100%;
      max-width: 300px;
    }
  }
</style>
