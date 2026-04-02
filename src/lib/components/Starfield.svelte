<script>
  import { onMount } from 'svelte';
  
  let stars = [];
  
  onMount(() => {
    for (let i = 0; i < 200; i++) {
      stars.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2 + 1,
        duration: Math.random() * 3 + 2,
        delay: Math.random() * 3
      });
    }
    stars = stars;
  });
</script>

<div class="starfield">
  {#each stars as star}
    <div 
      class="star"
      style="
        left: {star.x}%;
        top: {star.y}%;
        width: {star.size}px;
        height: {star.size}px;
        animation-duration: {star.duration}s;
        animation-delay: {star.delay}s;
      "
    ></div>
  {/each}
</div>

<style>
  .starfield {
    position: fixed;
    inset: 0;
    pointer-events: none;
    z-index: -8;
    overflow: hidden;
  }
  
  .star {
    position: absolute;
    background: radial-gradient(circle, rgba(16, 185, 129, 0.8), transparent);
    border-radius: 50%;
    animation: twinkle ease-in-out infinite;
  }
  
  @keyframes twinkle {
    0%, 100% {
      opacity: 0.2;
      transform: scale(1);
    }
    50% {
      opacity: 1;
      transform: scale(1.2);
    }
  }
</style>
