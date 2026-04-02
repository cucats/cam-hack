<script>
  import CountdownTimer from "./CountdownTimer.svelte";
  import GlitchText from "./GlitchText.svelte";
</script>

<div class="hero-container">
  <div class="hero-content">
    <div class="logo-wrapper">
      <img
        src="/cam-hack-logo-text.png"
        alt="Cam Hack Logo"
        class="hero-logo"
      />
    </div>

    <GlitchText text="Cam Hack 2025" tag="h1" />
    <h2 class="hero-subtitle">1st — 2nd November</h2>

    <CountdownTimer />

    <p class="hero-tagline">Lorem ipsum dolor sit amet consectetur</p>

    <div class="hero-buttons">
      <a href="/discord" class="btn btn-primary"> Join Discord </a>
      <a href="/signup" class="btn btn-secondary"> Lorem Ipsum </a>
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
  }

  .hero-content {
    text-align: center;
    z-index: 10;
    animation: fadeIn 1.5s ease-out;
  }

  .logo-wrapper {
    animation: float 6s ease-in-out infinite;
    margin-bottom: 2rem;
    perspective: 1000px;
    position: relative;
  }

  .logo-wrapper::before {
    content: "";
    position: absolute;
    inset: -20px;
    background: radial-gradient(
      circle,
      rgba(134, 226, 147, 0.3) 0%,
      transparent 70%
    );
    animation: pulse-ring 3s ease-in-out infinite;
    pointer-events: none;
  }

  .hero-logo {
    width: 20rem;
    height: 20rem;
    filter: drop-shadow(0 0 40px rgba(134, 226, 147, 0.5));
    animation:
      glow 3s ease-in-out infinite,
      rotate3d 20s linear infinite;
    transform-style: preserve-3d;
  }

  :global(.glitch) {
    font-size: 5rem;
    font-weight: 900;
    margin-bottom: 1rem;
    background: linear-gradient(135deg, #86e293 0%, #86e6c6 100%);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    font-family: "Orbitron", monospace;
  }

  .hero-subtitle {
    font-size: 2rem;
    font-weight: 700;
    color: #86e6c6;
    margin-bottom: 2rem;
    font-family: "Orbitron", monospace;
    text-shadow: 0 0 20px rgba(134, 230, 198, 0.4);
  }

  .hero-tagline {
    font-size: 1.5rem;
    color: rgba(134, 226, 147, 0.9);
    margin-bottom: 2rem;
    font-weight: 300;
    position: relative;
    overflow: hidden;
  }

  .hero-tagline::after {
    content: "";
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 0;
    height: 2px;
    background: linear-gradient(90deg, #86e293, #86e6c6);
    animation: underline-expand 3s ease-in-out infinite;
  }

  @keyframes underline-expand {
    0%,
    100% {
      width: 0;
      left: 0;
    }
    50% {
      width: 100%;
      left: 0;
    }
    51% {
      width: 100%;
      left: 0;
    }
    100% {
      width: 0;
      left: 100%;
    }
  }

  .hero-buttons {
    display: flex;
    gap: 1.5rem;
    justify-content: center;
    flex-wrap: wrap;
  }

  .btn {
    padding: 1rem 2.5rem;
    border-radius: 9999px;
    font-size: 1.125rem;
    font-weight: 700;
    text-decoration: none;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
    font-family: "Orbitron", monospace;
  }

  .btn::before {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(
      45deg,
      transparent,
      rgba(255, 255, 255, 0.1),
      transparent
    );
    transform: translateX(-100%) rotate(45deg);
    transition: transform 0.6s;
  }

  .btn:hover::before {
    transform: translateX(100%) rotate(45deg);
  }

  .btn::after {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: 9999px;
    background: radial-gradient(
      circle at center,
      rgba(255, 255, 255, 0.2) 0%,
      transparent 70%
    );
    opacity: 0;
    transition: opacity 0.3s;
  }

  .btn:active::after {
    opacity: 1;
  }

  .btn-primary {
    background: linear-gradient(135deg, #86e293 0%, #10b981 100%);
    color: #0a0f1a;
    box-shadow: 0 0 30px rgba(134, 226, 147, 0.4);
  }

  .btn-primary:hover {
    transform: translateY(-3px) scale(1.05);
    box-shadow: 0 0 50px rgba(134, 226, 147, 0.8);
  }

  .btn-secondary {
    background: rgba(134, 226, 147, 0.1);
    color: #86e293;
    border: 2px solid #86e293;
    box-shadow: 0 0 20px rgba(134, 226, 147, 0.2);
  }

  .btn-secondary:hover {
    transform: translateY(-3px) scale(1.05);
    background: rgba(134, 226, 147, 0.2);
    box-shadow: 0 0 40px rgba(134, 226, 147, 0.5);
  }

  .scroll-indicator {
    position: absolute;
    bottom: 2rem;
    animation: bounce 2s infinite;
    cursor: pointer;
  }

  .scroll-indicator:hover .scroll-arrow {
    border-color: #86e6c6;
    box-shadow:
      0 0 20px rgba(134, 226, 147, 0.8),
      0 0 40px rgba(134, 226, 147, 0.5);
  }

  .scroll-arrow {
    width: 2rem;
    height: 2rem;
    border-left: 3px solid #86e293;
    border-bottom: 3px solid #86e293;
    transform: rotate(-45deg);
    box-shadow:
      0 0 10px rgba(134, 226, 147, 0.5),
      0 0 20px rgba(134, 226, 147, 0.3);
    filter: drop-shadow(0 0 5px rgba(134, 226, 147, 0.8));
    transition: all 0.3s ease;
    position: relative;
  }

  .scroll-arrow::before {
    content: "";
    position: absolute;
    width: 2rem;
    height: 2rem;
    border-left: 3px solid #86e293;
    border-bottom: 3px solid #86e293;
    transform: translate(-50%, -50%);
    opacity: 0.3;
    animation: arrow-trail 2s infinite;
  }

  @keyframes arrow-trail {
    0% {
      transform: translate(-50%, -50%);
      opacity: 0.3;
    }
    50% {
      transform: translate(-50%, calc(-50% + 10px));
      opacity: 0;
    }
    100% {
      transform: translate(-50%, -50%);
      opacity: 0;
    }
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes float {
    0%,
    100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-20px);
    }
  }

  @keyframes glow {
    0%,
    100% {
      filter: drop-shadow(0 0 40px rgba(134, 226, 147, 0.5));
    }
    50% {
      filter: drop-shadow(0 0 60px rgba(134, 226, 147, 0.8));
    }
  }

  @keyframes rotate3d {
    0% {
      transform: rotateY(0deg) rotateX(0deg);
    }
    25% {
      transform: rotateY(5deg) rotateX(5deg);
    }
    50% {
      transform: rotateY(0deg) rotateX(0deg);
    }
    75% {
      transform: rotateY(-5deg) rotateX(-5deg);
    }
    100% {
      transform: rotateY(0deg) rotateX(0deg);
    }
  }

  @keyframes pulse-ring {
    0%,
    100% {
      transform: scale(1);
      opacity: 0.5;
    }
    50% {
      transform: scale(1.2);
      opacity: 0;
    }
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
      transform: translateY(-10px);
    }
    60% {
      transform: translateY(-5px);
    }
  }

  @media (max-width: 768px) {
    .hero-logo {
      width: 12rem;
      height: 12rem;
    }

    :global(.glitch) {
      font-size: 3rem;
    }

    .hero-subtitle {
      font-size: 1.5rem;
    }

    .hero-tagline {
      font-size: 1.125rem;
    }

    .btn {
      padding: 0.875rem 2rem;
      font-size: 1rem;
    }
  }
</style>
