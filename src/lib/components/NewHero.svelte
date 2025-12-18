<script>
  import CountdownTimer from './CountdownTimer.svelte';
  import { onMount } from 'svelte';
  
  let visible = $state(false);
  
  onMount(() => {
    setTimeout(() => visible = true, 100);
  });
</script>

<div class="hero-container" class:visible>
  <div class="hero-content">
    <div class="logo-wrapper">
      <img
        src="/cam-hack-logo-text.png"
        alt="Cam Hack Logo"
        class="hero-logo"
      />
    </div>
    
    <h1 class="hero-title">Cam Hack 2025</h1>
    <h2 class="hero-subtitle">1st – 2nd November</h2>
    
    <div class="hero-tagline">What can you make in 2 days?</div>
    
    <div class="hero-buttons">
      <a
        href="/discord"
        target="_blank"
        class="hero-button primary"
      >
        Join the Discord!
      </a>
      <a
        href="/signup"
        class="hero-button secondary disabled"
      >
        Signups closed
      </a>
    </div>
  </div>
  
  <div class="countdown-wrapper">
    <CountdownTimer />
  </div>
</div>

<style>
  .hero-container {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 2rem;
    position: relative;
    z-index: 1;
    opacity: 0;
    transform: translateY(30px);
    transition: all 1s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .hero-container.visible {
    opacity: 1;
    transform: translateY(0);
  }

  .hero-content {
    max-width: 1200px;
    text-align: center;
    margin-bottom: 4rem;
  }

  .logo-wrapper {
    margin-bottom: 2rem;
    animation: float 6s ease-in-out infinite;
  }

  .hero-logo {
    width: 300px;
    height: 300px;
    filter: drop-shadow(0 0 40px rgba(0, 255, 136, 0.6));
    transition: transform 0.3s ease;
  }

  .hero-logo:hover {
    transform: scale(1.05);
  }

  .hero-title {
    font-size: 6rem;
    font-weight: 900;
    background: linear-gradient(135deg, #00ff88, #0dff00, #00ffaa);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin-bottom: 1rem;
    text-transform: uppercase;
    letter-spacing: -2px;
    line-height: 1;
    animation: glitch 5s infinite;
  }

  .hero-subtitle {
    font-size: 2.5rem;
    color: #00ff88;
    margin-bottom: 2rem;
    font-weight: 600;
    text-shadow: 0 0 20px rgba(0, 255, 136, 0.5);
  }

  .hero-tagline {
    font-size: 1.8rem;
    color: #7fff7f;
    margin-bottom: 3rem;
    font-weight: 400;
  }

  .hero-buttons {
    display: flex;
    gap: 1.5rem;
    justify-content: center;
    flex-wrap: wrap;
  }

  .hero-button {
    padding: 1.2rem 3rem;
    font-size: 1.2rem;
    font-weight: 700;
    border-radius: 50px;
    text-decoration: none;
    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    text-transform: uppercase;
    letter-spacing: 1px;
    position: relative;
    overflow: hidden;
  }

  .hero-button::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
    transition: left 0.5s;
    z-index: 1;
  }

  .hero-button:hover::before {
    left: 100%;
  }

  .hero-button::after {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 50px;
    padding: 2px;
    background: linear-gradient(135deg, #00ff88, #0dff00, #00ffaa);
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    opacity: 0;
    transition: opacity 0.3s;
    z-index: 0;
  }

  .hero-button:hover::after {
    opacity: 0.8;
  }

  .hero-button.primary {
    background: linear-gradient(135deg, #00ff88, #0dff00);
    color: #0a0f0a;
    box-shadow: 0 10px 40px rgba(0, 255, 136, 0.4);
  }

  .hero-button.primary:hover {
    transform: translateY(-3px);
    box-shadow: 0 15px 50px rgba(0, 255, 136, 0.6);
  }

  .hero-button.secondary {
    background: rgba(100, 100, 100, 0.3);
    color: #888;
    border: 2px solid rgba(100, 100, 100, 0.5);
  }

  .hero-button.secondary.disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }

  .countdown-wrapper {
    max-width: 600px;
    width: 100%;
  }

  @keyframes float {
    0%, 100% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(-20px);
    }
  }

  @keyframes glitch {
    0%, 90%, 100% {
      text-shadow: 0 0 20px rgba(0, 255, 136, 0.5);
    }
    92% {
      text-shadow: 2px 0 rgba(255, 0, 0, 0.5), -2px 0 rgba(0, 255, 255, 0.5);
      transform: translate(2px, 0);
    }
    94% {
      text-shadow: -2px 0 rgba(255, 0, 0, 0.5), 2px 0 rgba(0, 255, 255, 0.5);
      transform: translate(-2px, 0);
    }
    96% {
      text-shadow: 0 0 20px rgba(0, 255, 136, 0.5);
      transform: translate(0, 0);
    }
  }

  @media (max-width: 768px) {
    .hero-logo {
      width: 200px;
      height: 200px;
    }

    .hero-title {
      font-size: 3rem;
    }

    .hero-subtitle {
      font-size: 1.5rem;
    }

    .hero-tagline {
      font-size: 1.2rem;
    }

    .hero-button {
      padding: 1rem 2rem;
      font-size: 1rem;
    }
  }
</style>
