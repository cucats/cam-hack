<div class="scanlines"></div>

<style>
  .scanlines {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 10000;
    background: linear-gradient(
      to bottom,
      transparent 0%,
      rgba(0, 255, 136, 0.02) 50%,
      transparent 100%
    );
    background-size: 100% 4px;
    animation: scanline 8s linear infinite;
    opacity: 0.3;
  }

  @keyframes scanline {
    0% {
      background-position: 0 0;
    }
    100% {
      background-position: 0 100%;
    }
  }

  @media (max-width: 768px) {
    .scanlines {
      opacity: 0.15;
    }
  }
</style>
