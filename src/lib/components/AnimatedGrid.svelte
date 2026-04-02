<script>
  import { onMount } from 'svelte';
  
  let gridLines = [];
  
  onMount(() => {
    const verticalCount = 20;
    const horizontalCount = 15;
    
    for (let i = 0; i < verticalCount; i++) {
      gridLines.push({
        type: 'vertical',
        position: (i / verticalCount) * 100,
        delay: Math.random() * 5
      });
    }
    
    for (let i = 0; i < horizontalCount; i++) {
      gridLines.push({
        type: 'horizontal',
        position: (i / horizontalCount) * 100,
        delay: Math.random() * 5
      });
    }
    
    gridLines = gridLines;
  });
</script>

<div class="grid-container">
  <div class="grid-lines">
    {#each gridLines as line}
      {#if line.type === 'vertical'}
        <div 
          class="grid-line vertical"
          style="left: {line.position}%; animation-delay: {line.delay}s;"
        ></div>
      {:else}
        <div 
          class="grid-line horizontal"
          style="top: {line.position}%; animation-delay: {line.delay}s;"
        ></div>
      {/if}
    {/each}
  </div>
</div>

<style>
  .grid-container {
    position: fixed;
    inset: 0;
    pointer-events: none;
    z-index: -5;
    overflow: hidden;
  }
  
  .grid-lines {
    position: absolute;
    inset: 0;
  }
  
  .grid-line {
    position: absolute;
    background: linear-gradient(to bottom, transparent, rgba(16, 185, 129, 0.1), transparent);
    animation: pulse-line 8s ease-in-out infinite;
  }
  
  .grid-line.vertical {
    width: 1px;
    height: 100%;
    background: linear-gradient(to bottom, transparent, rgba(16, 185, 129, 0.1), transparent);
  }
  
  .grid-line.horizontal {
    width: 100%;
    height: 1px;
    background: linear-gradient(to right, transparent, rgba(16, 185, 129, 0.1), transparent);
  }
  
  @keyframes pulse-line {
    0%, 100% {
      opacity: 0.1;
    }
    50% {
      opacity: 0.3;
    }
  }
</style>
