<script>
  import { onMount } from 'svelte';

  const eventDate = new Date('2025-11-01T00:00:00');
  let daysSince = 0;

  onMount(() => {
    const now = new Date();
    const diffTime = Math.abs(now - eventDate);
    daysSince = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  });
</script>

<div class="flex flex-col items-center justify-center p-8 backdrop-blur-sm bg-black/30 rounded-2xl border border-green-500/30 text-green-400">
  <h3 class="text-xl uppercase tracking-widest mb-2 font-mono">Time Since Inception</h3>
  <div class="text-6xl font-bold font-mono glitch-effect text-green-500">
    {daysSince}
    <span class="text-2xl">DAYS</span>
  </div>
</div>

<style>
  .glitch-effect {
    text-shadow: 2px 2px 0px rgba(0, 255, 0, 0.4), -2px -2px 0px rgba(255, 0, 255, 0.4);
    animation: glitch 1s infinite alternate-reverse;
  }
  
  @keyframes glitch {
    0% { text-shadow: 2px 2px 0px rgba(0, 255, 0, 0.4), -2px -2px 0px rgba(255, 0, 255, 0.4); }
    25% { text-shadow: -2px 2px 0px rgba(0, 255, 0, 0.4), 2px -2px 0px rgba(255, 0, 255, 0.4); }
    50% { text-shadow: 2px -2px 0px rgba(0, 255, 0, 0.4), -2px 2px 0px rgba(255, 0, 255, 0.4); }
    75% { text-shadow: -2px -2px 0px rgba(0, 255, 0, 0.4), 2px 2px 0px rgba(255, 0, 255, 0.4); }
    100% { text-shadow: 2px 2px 0px rgba(0, 255, 0, 0.4), -2px -2px 0px rgba(255, 0, 255, 0.4); }
  }
</style>
