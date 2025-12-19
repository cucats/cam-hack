<script>
  import { onMount } from 'svelte';
  
  let visible = false;
  
  onMount(() => {
    const handleScroll = () => {
      visible = window.scrollY > 500;
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  });
  
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
</script>

{#if visible}
  <button
    class="scroll-to-top"
    onclick={scrollToTop}
    aria-label="Scroll to top"
  >
    <svg 
      class="icon"
      fill="none" 
      stroke="currentColor" 
      viewBox="0 0 24 24"
    >
      <path 
        stroke-linecap="round" 
        stroke-linejoin="round" 
        stroke-width="2" 
        d="M5 10l7-7m0 0l7 7m-7-7v18"
      />
    </svg>
  </button>
{/if}

<style>
  .scroll-to-top {
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    width: 3.5rem;
    height: 3.5rem;
    border-radius: 50%;
    background: linear-gradient(135deg, #10b981, #86e293);
    border: 2px solid rgba(16, 185, 129, 0.5);
    color: white;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    transition: all 0.3s ease;
    animation: fadeIn 0.3s ease, float-button 3s ease-in-out infinite;
    box-shadow: 0 4px 20px rgba(16, 185, 129, 0.4);
  }
  
  .scroll-to-top:hover {
    transform: translateY(-5px) scale(1.1);
    box-shadow: 0 8px 30px rgba(16, 185, 129, 0.6);
  }
  
  .icon {
    width: 1.5rem;
    height: 1.5rem;
  }
  
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @keyframes float-button {
    0%, 100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-10px);
    }
  }
</style>
