<div class="floating-elements">
  <div class="float-element" style="top: 10%; left: 5%; animation-delay: 0s;"></div>
  <div class="float-element" style="top: 20%; right: 10%; animation-delay: 1s;"></div>
  <div class="float-element" style="top: 40%; left: 15%; animation-delay: 2s;"></div>
  <div class="float-element" style="top: 60%; right: 20%; animation-delay: 3s;"></div>
  <div class="float-element" style="top: 80%; left: 10%; animation-delay: 4s;"></div>
  <div class="float-element" style="top: 90%; right: 15%; animation-delay: 5s;"></div>
</div>

<style>
  .floating-elements {
    position: fixed;
    inset: 0;
    pointer-events: none;
    z-index: 2;
    overflow: hidden;
  }

  .float-element {
    position: absolute;
    width: 4px;
    height: 4px;
    background: #86e293;
    border-radius: 50%;
    box-shadow:
      0 0 10px #86e293,
      0 0 20px #86e293;
    animation: float-drift 15s ease-in-out infinite;
  }

  @keyframes float-drift {
    0%,
    100% {
      transform: translate(0, 0) scale(1);
      opacity: 0.3;
    }
    25% {
      transform: translate(100px, -50px) scale(1.5);
      opacity: 0.8;
    }
    50% {
      transform: translate(50px, -100px) scale(1);
      opacity: 0.5;
    }
    75% {
      transform: translate(-50px, -50px) scale(1.2);
      opacity: 0.7;
    }
  }
</style>
