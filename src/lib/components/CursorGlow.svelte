<script>
  import { onMount } from 'svelte';
  
  let x = 0;
  let y = 0;
  let trail = [];
  let glowVisible = false;
  
  onMount(() => {
    const handleMouseMove = (e) => {
      x = e.clientX;
      y = e.clientY;
      glowVisible = true;
      
      trail = [...trail, { x, y, id: Date.now() }];
      if (trail.length > 10) {
        trail = trail.slice(-10);
      }
    };
    
    const handleMouseLeave = () => {
      glowVisible = false;
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  });
</script>

{#if glowVisible}
  <div 
    class="cursor-glow"
    style="left: {x}px; top: {y}px;"
  ></div>
  
  {#each trail as point, i}
    <div 
      class="cursor-trail"
      style="
        left: {point.x}px; 
        top: {point.y}px;
        opacity: {(i + 1) / trail.length * 0.3};
        transform: scale({(i + 1) / trail.length});
      "
    ></div>
  {/each}
{/if}

<style>
  .cursor-glow {
    position: fixed;
    width: 300px;
    height: 300px;
    background: radial-gradient(circle, rgba(16, 185, 129, 0.15) 0%, transparent 70%);
    pointer-events: none;
    transform: translate(-50%, -50%);
    z-index: 9999;
    transition: opacity 0.3s ease;
  }
  
  .cursor-trail {
    position: fixed;
    width: 200px;
    height: 200px;
    background: radial-gradient(circle, rgba(16, 185, 129, 0.1) 0%, transparent 70%);
    pointer-events: none;
    transform: translate(-50%, -50%);
    z-index: 9998;
    transition: all 0.2s ease-out;
  }
</style>
