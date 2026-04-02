<script>
  import { onMount } from 'svelte';
  
  let offsetY = 0;
  
  export let speed = 0.5;
  
  onMount(() => {
    const handleScroll = () => {
      offsetY = window.scrollY * speed;
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  });
</script>

<div 
  class="parallax-layer"
  style="transform: translateY({offsetY}px)"
>
  <slot />
</div>

<style>
  .parallax-layer {
    will-change: transform;
  }
</style>
