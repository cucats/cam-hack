<script>
  import { onMount } from 'svelte';

  let daysSince = 0;
  let isVisible = false;

  onMount(() => {
    const eventDate = new Date('2025-11-01T10:00:00');
    const now = new Date();
    const diffTime = Math.abs(now - eventDate);
    daysSince = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    setTimeout(() => {
      isVisible = true;
    }, 100);
  });
</script>

<div class="hero-container">
  <div class="hero-content" class:visible={isVisible}>
    <div class="glitch-wrapper">
      <h1 class="title glitch" data-text="CAM HACK 2025">CAM HACK 2025</h1>
    </div>
    
    <div class="date-wrapper">
      <h2 class="date">1ST - 2ND NOVEMBER</h2>
    </div>

    <div class="countdown-wrapper">
      <div class="countdown-label">DAYS SINCE EVENT</div>
      <div class="countdown-value">{daysSince}</div>
    </div>

    <div class="tagline">
      <p class="tagline-text">WHAT CAN YOU MAKE IN 2 DAYS?</p>
    </div>

    <div class="cta-buttons">
      <a href="/discord" target="_blank" class="btn btn-primary">
        <span class="btn-text">JOIN DISCORD</span>
        <span class="btn-glow"></span>
      </a>
      <a href="/signup" class="btn btn-disabled">
        <span class="btn-text">SIGNUPS CLOSED</span>
      </a>
    </div>
  </div>

  <div class="floating-shapes">
    <div class="shape shape-1"></div>
    <div class="shape shape-2"></div>
    <div class="shape shape-3"></div>
    <div class="shape shape-4"></div>
  </div>
</div>

<style>
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
    opacity: 0;
    transform: translateY(30px);
    transition: all 1.5s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .hero-content.visible {
    opacity: 1;
    transform: translateY(0);
  }

  .glitch-wrapper {
    margin-bottom: 2rem;
  }

  .title {
    font-size: clamp(2.5rem, 10vw, 7rem);
    font-weight: 900;
    color: #00ff87;
    letter-spacing: 0.1em;
    text-shadow: 
      0 0 10px rgba(0, 255, 135, 0.7),
      0 0 20px rgba(0, 255, 135, 0.5),
      0 0 30px rgba(0, 255, 135, 0.3);
    animation: textGlow 2s ease-in-out infinite alternate;
  }

  @keyframes textGlow {
    from {
      text-shadow: 
        0 0 10px rgba(0, 255, 135, 0.7),
        0 0 20px rgba(0, 255, 135, 0.5),
        0 0 30px rgba(0, 255, 135, 0.3);
    }
    to {
      text-shadow: 
        0 0 20px rgba(0, 255, 135, 0.9),
        0 0 40px rgba(0, 255, 135, 0.7),
        0 0 60px rgba(0, 255, 135, 0.5);
    }
  }

  .glitch {
    position: relative;
    animation: glitch 3s infinite;
  }

  @keyframes glitch {
    0%, 90%, 100% {
      transform: translate(0);
    }
    91% {
      transform: translate(-2px, 2px);
    }
    92% {
      transform: translate(2px, -2px);
    }
    93% {
      transform: translate(-2px, 2px);
    }
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
    animation: glitchTop 2s infinite;
    clip-path: polygon(0 0, 100% 0, 100% 33%, 0 33%);
    color: #64ffda;
  }

  .glitch::after {
    animation: glitchBottom 2.5s infinite;
    clip-path: polygon(0 67%, 100% 67%, 100% 100%, 0 100%);
    color: #0a4d3c;
  }

  @keyframes glitchTop {
    0%, 96%, 100% {
      transform: translate(0);
    }
    97% {
      transform: translate(-2px, -2px);
    }
  }

  @keyframes glitchBottom {
    0%, 94%, 100% {
      transform: translate(0);
    }
    95% {
      transform: translate(2px, 2px);
    }
  }

  .date-wrapper {
    margin-bottom: 3rem;
    animation: fadeInUp 1s ease-out 0.3s backwards;
  }

  .date {
    font-size: clamp(1.2rem, 4vw, 2.5rem);
    color: #64ffda;
    letter-spacing: 0.15em;
    font-weight: 700;
  }

  .countdown-wrapper {
    margin: 4rem auto;
    max-width: 400px;
    padding: 2rem;
    background: linear-gradient(135deg, rgba(0, 255, 135, 0.1), rgba(100, 255, 218, 0.1));
    border: 2px solid #00ff87;
    border-radius: 20px;
    position: relative;
    animation: fadeInUp 1s ease-out 0.5s backwards, borderPulse 2s ease-in-out infinite;
  }

  @keyframes borderPulse {
    0%, 100% {
      box-shadow: 
        0 0 20px rgba(0, 255, 135, 0.5),
        inset 0 0 20px rgba(0, 255, 135, 0.1);
    }
    50% {
      box-shadow: 
        0 0 40px rgba(0, 255, 135, 0.8),
        inset 0 0 40px rgba(0, 255, 135, 0.2);
    }
  }

  .countdown-label {
    font-size: 1rem;
    color: #64ffda;
    letter-spacing: 0.2em;
    margin-bottom: 1rem;
    font-weight: 600;
  }

  .countdown-value {
    font-size: clamp(3rem, 8vw, 6rem);
    color: #00ff87;
    font-weight: 900;
    line-height: 1;
    text-shadow: 0 0 20px rgba(0, 255, 135, 0.8);
  }

  .tagline {
    margin: 3rem 0;
    animation: fadeInUp 1s ease-out 0.7s backwards;
  }

  .tagline-text {
    font-size: clamp(1rem, 3vw, 1.8rem);
    color: #e0ffe8;
    letter-spacing: 0.1em;
    font-weight: 500;
  }

  .cta-buttons {
    display: flex;
    gap: 1.5rem;
    justify-content: center;
    flex-wrap: wrap;
    animation: fadeInUp 1s ease-out 0.9s backwards;
  }

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .btn {
    position: relative;
    padding: 1.2rem 2.5rem;
    font-size: 1.1rem;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-decoration: none;
    border-radius: 12px;
    transition: all 0.3s ease;
    overflow: hidden;
    cursor: pointer;
  }

  .btn-primary {
    background: linear-gradient(135deg, #00ff87, #64ffda);
    color: #000a08;
    border: 2px solid transparent;
    box-shadow: 0 10px 30px rgba(0, 255, 135, 0.3);
  }

  .btn-primary:hover {
    transform: translateY(-3px);
    box-shadow: 0 15px 40px rgba(0, 255, 135, 0.5);
  }

  .btn-primary::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.3), transparent);
    transform: rotate(45deg);
    animation: shimmer 3s infinite;
  }

  @keyframes shimmer {
    0% {
      transform: translateX(-100%) translateY(-100%) rotate(45deg);
    }
    100% {
      transform: translateX(100%) translateY(100%) rotate(45deg);
    }
  }

  .btn-disabled {
    background: rgba(100, 255, 218, 0.1);
    color: #64ffda;
    border: 2px solid rgba(100, 255, 218, 0.3);
    cursor: not-allowed;
    opacity: 0.6;
  }

  .btn-text {
    position: relative;
    z-index: 2;
  }

  .floating-shapes {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
  }

  .shape {
    position: absolute;
    border: 2px solid rgba(0, 255, 135, 0.3);
    animation: float 6s ease-in-out infinite;
  }

  .shape-1 {
    width: 100px;
    height: 100px;
    top: 10%;
    left: 10%;
    border-radius: 20px;
    animation-delay: 0s;
  }

  .shape-2 {
    width: 150px;
    height: 150px;
    top: 60%;
    right: 10%;
    border-radius: 50%;
    animation-delay: 1s;
  }

  .shape-3 {
    width: 80px;
    height: 80px;
    bottom: 15%;
    left: 15%;
    transform: rotate(45deg);
    animation-delay: 2s;
  }

  .shape-4 {
    width: 120px;
    height: 120px;
    top: 20%;
    right: 20%;
    clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
    background: linear-gradient(135deg, rgba(0, 255, 135, 0.1), transparent);
    animation-delay: 1.5s;
  }

  @keyframes float {
    0%, 100% {
      transform: translateY(0) rotate(0deg);
    }
    25% {
      transform: translateY(-20px) rotate(5deg);
    }
    50% {
      transform: translateY(0) rotate(0deg);
    }
    75% {
      transform: translateY(20px) rotate(-5deg);
    }
  }

  @media (max-width: 768px) {
    .hero-container {
      padding: 1rem;
    }

    .cta-buttons {
      flex-direction: column;
      align-items: stretch;
    }

    .btn {
      width: 100%;
    }
  }
</style>
