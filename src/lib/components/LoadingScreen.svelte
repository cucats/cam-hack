<script>
  import { onMount } from 'svelte';
  
  let loading = true;
  let progress = 0;
  
  onMount(() => {
    const interval = setInterval(() => {
      progress += Math.random() * 20;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        setTimeout(() => {
          loading = false;
        }, 500);
      }
    }, 100);
    
    return () => clearInterval(interval);
  });
</script>

{#if loading}
  <div class="loading-screen">
    <div class="loading-content">
      <div class="logo-container">
        <img 
          src="/cam-hack-logo-text.png" 
          alt="Cam Hack Logo"
          class="loading-logo"
        />
      </div>
      
      <div class="progress-container">
        <div class="progress-bar">
          <div 
            class="progress-fill"
            style="width: {progress}%"
          ></div>
        </div>
        <div class="progress-text">{Math.floor(progress)}%</div>
      </div>
      
      <div class="loading-text">Loading Experience...</div>
    </div>
  </div>
{/if}

<style>
  .loading-screen {
    position: fixed;
    inset: 0;
    background: linear-gradient(135deg, #0a0f0d 0%, #0a4d2e 50%, #0f1713 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10000;
    animation: fadeOut 0.5s ease-out 0.5s forwards;
  }
  
  @keyframes fadeOut {
    to {
      opacity: 0;
      pointer-events: none;
    }
  }
  
  .loading-content {
    text-align: center;
    max-width: 400px;
    width: 90%;
  }
  
  .logo-container {
    margin-bottom: 3rem;
    animation: float 3s ease-in-out infinite;
  }
  
  @keyframes float {
    0%, 100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-20px);
    }
  }
  
  .loading-logo {
    width: 150px;
    height: 150px;
    filter: drop-shadow(0 0 30px rgba(16, 185, 129, 0.6));
  }
  
  .progress-container {
    margin-bottom: 2rem;
  }
  
  .progress-bar {
    width: 100%;
    height: 4px;
    background: rgba(16, 185, 129, 0.2);
    border-radius: 2px;
    overflow: hidden;
    margin-bottom: 1rem;
  }
  
  .progress-fill {
    height: 100%;
    background: linear-gradient(90deg, #10b981, #86e293);
    border-radius: 2px;
    transition: width 0.3s ease;
    box-shadow: 0 0 10px rgba(16, 185, 129, 0.6);
  }
  
  .progress-text {
    color: #10b981;
    font-size: 1.5rem;
    font-weight: bold;
    font-family: 'Space Grotesk', sans-serif;
    text-shadow: 0 0 10px rgba(16, 185, 129, 0.5);
  }
  
  .loading-text {
    color: #86e293;
    font-size: 1.25rem;
    font-family: 'Inter', sans-serif;
    animation: pulse 2s ease-in-out infinite;
  }
  
  @keyframes pulse {
    0%, 100% {
      opacity: 0.5;
    }
    50% {
      opacity: 1;
    }
  }
</style>
