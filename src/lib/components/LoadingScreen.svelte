<script>
  import { onMount } from "svelte";

  let loaded = false;

  onMount(() => {
    setTimeout(() => {
      loaded = true;
    }, 2000);
  });
</script>

{#if !loaded}
  <div class="loading-screen">
    <div class="loading-content">
      <div class="loading-logo">
        <div class="hex-loader">
          <div class="hex"></div>
          <div class="hex"></div>
          <div class="hex"></div>
          <div class="hex"></div>
          <div class="hex"></div>
          <div class="hex"></div>
          <div class="hex"></div>
        </div>
      </div>
      <div class="loading-text">INITIALIZING</div>
      <div class="loading-bar">
        <div class="loading-progress"></div>
      </div>
    </div>
  </div>
{/if}

<style>
  .loading-screen {
    position: fixed;
    inset: 0;
    background: #0a0f1a;
    z-index: 9999;
    display: flex;
    align-items: center;
    justify-content: center;
    animation: fade-out 0.5s ease-out 1.5s forwards;
  }

  .loading-content {
    text-align: center;
  }

  .loading-logo {
    margin-bottom: 2rem;
  }

  .hex-loader {
    position: relative;
    width: 100px;
    height: 100px;
    margin: 0 auto;
  }

  .hex {
    position: absolute;
    width: 30px;
    height: 30px;
    background: #86e293;
    clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
    animation: hex-pulse 1.5s ease-in-out infinite;
  }

  .hex:nth-child(1) {
    top: 0;
    left: 35px;
    animation-delay: 0s;
  }
  .hex:nth-child(2) {
    top: 20px;
    left: 10px;
    animation-delay: 0.2s;
  }
  .hex:nth-child(3) {
    top: 20px;
    right: 10px;
    animation-delay: 0.4s;
  }
  .hex:nth-child(4) {
    top: 50px;
    left: 35px;
    animation-delay: 0.6s;
  }
  .hex:nth-child(5) {
    bottom: 20px;
    left: 10px;
    animation-delay: 0.8s;
  }
  .hex:nth-child(6) {
    bottom: 20px;
    right: 10px;
    animation-delay: 1s;
  }
  .hex:nth-child(7) {
    bottom: 0;
    left: 35px;
    animation-delay: 1.2s;
  }

  .loading-text {
    font-size: 1.5rem;
    font-weight: 700;
    color: #86e293;
    font-family: "Orbitron", monospace;
    letter-spacing: 0.3em;
    margin-bottom: 2rem;
    animation: text-glow 1.5s ease-in-out infinite;
  }

  .loading-bar {
    width: 300px;
    height: 4px;
    background: rgba(134, 226, 147, 0.2);
    border-radius: 2px;
    overflow: hidden;
    margin: 0 auto;
  }

  .loading-progress {
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, #86e293, #86e6c6);
    animation: progress 1.5s ease-out forwards;
    box-shadow: 0 0 10px #86e293;
  }

  @keyframes hex-pulse {
    0%,
    100% {
      opacity: 0.3;
      transform: scale(0.8);
    }
    50% {
      opacity: 1;
      transform: scale(1.2);
    }
  }

  @keyframes text-glow {
    0%,
    100% {
      text-shadow: 0 0 10px rgba(134, 226, 147, 0.5);
    }
    50% {
      text-shadow: 0 0 20px rgba(134, 226, 147, 1);
    }
  }

  @keyframes progress {
    0% {
      transform: translateX(-100%);
    }
    100% {
      transform: translateX(0);
    }
  }

  @keyframes fade-out {
    to {
      opacity: 0;
      pointer-events: none;
    }
  }
</style>
