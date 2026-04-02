<script>
  import { onMount } from 'svelte';
  
  let progress = 0;
  
  onMount(() => {
    const updateProgress = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = window.scrollY;
      progress = (scrolled / scrollHeight) * 100;
    };
    
    window.addEventListener('scroll', updateProgress);
    return () => window.removeEventListener('scroll', updateProgress);
  });
</script>

<div class="fixed top-0 left-0 right-0 z-50 h-1 bg-emerald-950/30">
  <div 
    class="h-full bg-gradient-to-r from-emerald-400 via-green-500 to-emerald-600 transition-all duration-150 shadow-lg shadow-emerald-500/50"
    style="width: {progress}%"
  ></div>
</div>
