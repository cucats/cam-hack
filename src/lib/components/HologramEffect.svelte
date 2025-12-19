<div class="hologram-effect">
  <div class="hologram-line" style="top: 0%; animation-delay: 0s;"></div>
  <div class="hologram-line" style="top: 20%; animation-delay: 0.5s;"></div>
  <div class="hologram-line" style="top: 40%; animation-delay: 1s;"></div>
  <div class="hologram-line" style="top: 60%; animation-delay: 1.5s;"></div>
  <div class="hologram-line" style="top: 80%; animation-delay: 2s;"></div>
</div>

<style>
  .hologram-effect {
    position: fixed;
    inset: 0;
    pointer-events: none;
    z-index: 2;
    overflow: hidden;
  }

  .hologram-line {
    position: absolute;
    width: 100%;
    height: 2px;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(134, 226, 147, 0.5),
      transparent
    );
    animation: scan-line 5s linear infinite;
  }

  @keyframes scan-line {
    0% {
      transform: translateY(0);
      opacity: 0;
    }
    10% {
      opacity: 1;
    }
    90% {
      opacity: 1;
    }
    100% {
      transform: translateY(100vh);
      opacity: 0;
    }
  }
</style>
