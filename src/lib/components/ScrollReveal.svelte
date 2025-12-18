<script>
  import { onMount } from 'svelte';
  
  let { children, delay = 0 } = $props();
  let visible = $state(false);
  let element;
  
  onMount(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              visible = true;
            }, delay);
          }
        });
      },
      { threshold: 0.1 }
    );
    
    if (element) observer.observe(element);
    
    return () => observer.disconnect();
  });
</script>

<div bind:this={element} class="scroll-reveal" class:visible>
  {@render children()}
</div>

<style>
  .scroll-reveal {
    opacity: 0;
    transform: translateY(30px);
    transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
  }
  
  .scroll-reveal.visible {
    opacity: 1;
    transform: translateY(0);
  }
</style>
