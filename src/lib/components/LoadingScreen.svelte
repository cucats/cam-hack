<script>
  import { onMount } from 'svelte';
  
  let loaded = $state(false);
  
  onMount(() => {
    setTimeout(() => {
      loaded = true;
    }, 1500);
  });
</script>

<div class="loading-screen" class:loaded>
  <div class="loading-content">
    <div class="loading-logo">
      <img src="/cam-hack-logo-text.png" alt="Cam Hack" />
    </div>
    <div class="loading-bar">
      <div class="loading-progress"></div>
    </div>
    <div class="loading-text">Loading Experience...</div>
  </div>
</div>

<style>
  .loading-screen {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: #0a0f0a;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
    transition: opacity 0.8s ease, visibility 0.8s ease;
  }
  
  .loading-screen.loaded {
    opacity: 0;
    visibility: hidden;
    pointer-events: none;
  }
  
  .loading-content {
    text-align: center;
  }
  
  .loading-logo {
    margin-bottom: 3rem;
    animation: pulse 2s ease-in-out infinite;
  }
  
  .loading-logo img {
    width: 200px;
    height: 200px;
    filter: drop-shadow(0 0 40px rgba(0, 255, 136, 0.8));
  }
  
  .loading-bar {
    width: 300px;
    height: 4px;
    background: rgba(0, 255, 136, 0.2);
    border-radius: 2px;
    overflow: hidden;
    margin-bottom: 1rem;
  }
  
  .loading-progress {
    height: 100%;
    background: linear-gradient(90deg, #00ff88, #0dff00);
    animation: loading 1.5s ease-in-out infinite;
    box-shadow: 0 0 20px rgba(0, 255, 136, 0.8);
  }
  
  .loading-text {
    color: #00ff88;
    font-size: 1.2rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 2px;
    animation: fade 1.5s ease-in-out infinite;
  }
  
  @keyframes pulse {
    0%, 100% {
      transform: scale(1);
      filter: drop-shadow(0 0 40px rgba(0, 255, 136, 0.8));
    }
    50% {
      transform: scale(1.05);
      filter: drop-shadow(0 0 60px rgba(0, 255, 136, 1));
    }
  }
  
  @keyframes loading {
    0% {
      width: 0%;
      margin-left: 0%;
    }
    50% {
      width: 70%;
      margin-left: 15%;
    }
    100% {
      width: 0%;
      margin-left: 100%;
    }
  }
  
  @keyframes fade {
    0%, 100% {
      opacity: 0.5;
    }
    50% {
      opacity: 1;
    }
  }
</style>
