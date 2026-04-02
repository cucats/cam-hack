<div class="scanlines"></div>
<div class="grid-overlay"></div>
<div class="vignette"></div>

<style>
  .scanlines {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: repeating-linear-gradient(
      0deg,
      rgba(0, 0, 0, 0.15),
      rgba(0, 0, 0, 0.15) 1px,
      transparent 1px,
      transparent 2px
    );
    pointer-events: none;
    z-index: 1;
    animation: scanline-move 8s linear infinite;
  }

  .grid-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: linear-gradient(
        rgba(134, 226, 147, 0.03) 1px,
        transparent 1px
      ),
      linear-gradient(90deg, rgba(134, 226, 147, 0.03) 1px, transparent 1px);
    background-size: 50px 50px;
    pointer-events: none;
    z-index: 1;
    animation: grid-drift 20s linear infinite;
  }

  .vignette {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(
      ellipse at center,
      transparent 0%,
      rgba(10, 15, 26, 0.3) 100%
    );
    pointer-events: none;
    z-index: 2;
  }

  @keyframes scanline-move {
    0% {
      transform: translateY(0);
    }
    100% {
      transform: translateY(10px);
    }
  }

  @keyframes grid-drift {
    0% {
      transform: translate(0, 0);
    }
    100% {
      transform: translate(50px, 50px);
    }
  }
</style>
