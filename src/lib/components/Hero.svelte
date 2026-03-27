<script>
  import { onMount } from 'svelte';
  
  let daysSinceEvent = $state(0);
  let glitchText = $state('Cam Hack 2025');
  let isGlitching = $state(false);

  const eventDate = new Date('2025-11-01T10:00:00');
  const glitchChars = '!@#$%^&*()_+-=[]{}|;:,.<>?~`';

  onMount(() => {
    const now = new Date();
    const diffTime = now.getTime() - eventDate.getTime();
    daysSinceEvent = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    if (daysSinceEvent < 0) daysSinceEvent = 0;

    const glitchInterval = setInterval(() => {
      triggerGlitch();
    }, 5000);

    return () => clearInterval(glitchInterval);
  });

  function triggerGlitch() {
    isGlitching = true;
    const originalText = 'Cam Hack 2025';
    let iterations = 0;
    const maxIterations = 10;

    const interval = setInterval(() => {
      glitchText = originalText
        .split('')
        .map((char, index) => {
          if (index < iterations) return originalText[index];
          if (char === ' ') return ' ';
          return glitchChars[Math.floor(Math.random() * glitchChars.length)];
        })
        .join('');

      iterations += 1;
      if (iterations > originalText.length) {
        clearInterval(interval);
        glitchText = originalText;
        isGlitching = false;
      }
    }, 40);
  }
</script>

<div class="hero-container">
  <div class="hero-content">
    <div class="logo-container animate-slide-up">
      <img
        src="/cam-hack-logo-text.png"
        alt="Cam Hack Logo"
        class="logo animate-float"
      />
    </div>
    
    <h1 class="main-title animate-slide-up stagger-1" class:glitching={isGlitching}>
      <span class="title-text glow-text">{glitchText}</span>
    </h1>
    
    <h2 class="date-text animate-slide-up stagger-2">
      <span class="date-highlight">1st</span> – <span class="date-highlight">2nd</span> November
    </h2>

    <div class="countdown-container animate-slide-up stagger-3">
      <div class="countdown-box glass-card">
        <span class="countdown-number">{daysSinceEvent}</span>
        <span class="countdown-label">days since the event</span>
      </div>
    </div>

    <div class="cta-buttons animate-slide-up stagger-4">
      <a
        target="_blank"
        href="/discord"
        class="cta-button primary"
      >
        <span class="button-text">Join the Discord!</span>
        <span class="button-glow"></span>
      </a>
      <a
        href="/signup"
        class="cta-button secondary"
      >
        <span class="button-text">Signups closed</span>
      </a>
    </div>

    <p class="tagline animate-slide-up stagger-5">
      <span class="tagline-accent">What can you make in</span>
      <span class="tagline-highlight">2 days</span>
      <span class="tagline-accent">?</span>
    </p>
  </div>

  <div class="scroll-indicator animate-fade-in stagger-6">
    <div class="scroll-arrow"></div>
  </div>
</div>

<style>
  .hero-container {
    position: relative;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 2rem;
    z-index: 1;
  }

  .hero-content {
    text-align: center;
    max-width: 1200px;
    margin: 0 auto;
  }

  .logo-container {
    margin-bottom: 2rem;
  }

  .logo {
    width: 200px;
    height: 200px;
    filter: drop-shadow(0 0 30px rgba(0, 255, 136, 0.5));
    transition: transform 0.3s ease;
  }

  .logo:hover {
    transform: scale(1.05);
  }

  @media (min-width: 640px) {
    .logo {
      width: 280px;
      height: 280px;
    }
  }

  .main-title {
    font-size: clamp(2.5rem, 8vw, 6rem);
    font-weight: 700;
    margin-bottom: 1rem;
    position: relative;
  }

  .title-text {
    position: relative;
    display: inline-block;
    color: var(--color-primary);
  }

  .glitching .title-text {
    animation: glitch 0.1s infinite;
  }

  @keyframes glitch {
    0% { transform: translate(0); }
    20% { transform: translate(-2px, 2px); }
    40% { transform: translate(2px, -2px); }
    60% { transform: translate(-2px, -2px); }
    80% { transform: translate(2px, 2px); }
    100% { transform: translate(0); }
  }

  .glitching .title-text::before,
  .glitching .title-text::after {
    content: attr(data-text);
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .glitching .title-text::before {
    color: var(--color-accent-pink);
    animation: glitch-1 0.1s infinite;
    clip-path: polygon(0 0, 100% 0, 100% 35%, 0 35%);
  }

  .glitching .title-text::after {
    color: var(--color-accent);
    animation: glitch-2 0.1s infinite;
    clip-path: polygon(0 65%, 100% 65%, 100% 100%, 0 100%);
  }

  @keyframes glitch-1 {
    0% { transform: translate(-2px, 0); }
    100% { transform: translate(2px, 0); }
  }

  @keyframes glitch-2 {
    0% { transform: translate(2px, 0); }
    100% { transform: translate(-2px, 0); }
  }

  .date-text {
    font-size: clamp(1.5rem, 4vw, 2.5rem);
    color: var(--color-text-muted);
    margin-bottom: 2rem;
    font-weight: 400;
  }

  .date-highlight {
    color: var(--color-text-light);
    font-weight: 600;
  }

  .countdown-container {
    margin-bottom: 2.5rem;
  }

  .countdown-box {
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    padding: 1.5rem 3rem;
    animation: pulse-glow 3s ease-in-out infinite;
  }

  .countdown-number {
    font-family: var(--font-mono);
    font-size: clamp(3rem, 10vw, 5rem);
    font-weight: 600;
    color: var(--color-primary);
    line-height: 1;
    text-shadow: 0 0 30px var(--color-primary);
  }

  .countdown-label {
    font-size: 1rem;
    color: var(--color-text-muted);
    text-transform: uppercase;
    letter-spacing: 0.2em;
    margin-top: 0.5rem;
  }

  .cta-buttons {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    justify-content: center;
    margin-bottom: 2rem;
  }

  .cta-button {
    position: relative;
    padding: 1rem 2rem;
    font-size: 1.1rem;
    font-weight: 600;
    border-radius: 0.75rem;
    text-decoration: none;
    transition: all 0.3s ease;
    overflow: hidden;
  }

  .cta-button.primary {
    background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-dark) 100%);
    color: var(--color-dark);
  }

  .cta-button.primary:hover {
    transform: translateY(-4px);
    box-shadow: 0 10px 40px rgba(0, 255, 136, 0.4);
  }

  .cta-button.primary .button-glow {
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 60%);
    opacity: 0;
    transition: opacity 0.3s ease;
    pointer-events: none;
  }

  .cta-button.primary:hover .button-glow {
    opacity: 1;
    animation: rotate 4s linear infinite;
  }

  @keyframes rotate {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }

  .cta-button.secondary {
    background: rgba(255, 255, 255, 0.1);
    color: var(--color-text-muted);
    border: 1px solid rgba(255, 255, 255, 0.2);
    cursor: not-allowed;
  }

  .tagline {
    font-size: clamp(1.25rem, 3vw, 1.75rem);
    margin-bottom: 0;
  }

  .tagline-accent {
    color: var(--color-text-muted);
  }

  .tagline-highlight {
    color: var(--color-primary);
    font-weight: 600;
    text-shadow: 0 0 20px rgba(0, 255, 136, 0.5);
  }

  .scroll-indicator {
    position: absolute;
    bottom: 2rem;
    left: 50%;
    transform: translateX(-50%);
  }

  .scroll-arrow {
    width: 30px;
    height: 30px;
    border-right: 2px solid var(--color-primary);
    border-bottom: 2px solid var(--color-primary);
    transform: rotate(45deg);
    animation: scroll-bounce 2s ease-in-out infinite;
    opacity: 0.6;
  }

  @keyframes scroll-bounce {
    0%, 100% { transform: rotate(45deg) translate(0, 0); opacity: 0.6; }
    50% { transform: rotate(45deg) translate(5px, 5px); opacity: 1; }
  }

  @keyframes pulse-glow {
    0%, 100% { 
      box-shadow: 0 0 20px rgba(0, 255, 136, 0.2), inset 0 0 20px rgba(0, 255, 136, 0.05);
    }
    50% { 
      box-shadow: 0 0 40px rgba(0, 255, 136, 0.4), inset 0 0 30px rgba(0, 255, 136, 0.1);
    }
  }
</style>
