<script>
  import { onMount } from "svelte";

  let cursorX = 0;
  let cursorY = 0;
  let glowX = 0;
  let glowY = 0;

  onMount(() => {
    const handleMouseMove = (e) => {
      cursorX = e.clientX;
      cursorY = e.clientY;
    };

    const animateGlow = () => {
      glowX += (cursorX - glowX) * 0.1;
      glowY += (cursorY - glowY) * 0.1;
      requestAnimationFrame(animateGlow);
    };

    window.addEventListener("mousemove", handleMouseMove);
    animateGlow();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  });

  $: glowStyle = `transform: translate(${glowX}px, ${glowY}px)`;
</script>

<div class="cursor-glow" style={glowStyle}></div>

<style>
  .cursor-glow {
    position: fixed;
    width: 400px;
    height: 400px;
    margin-left: -200px;
    margin-top: -200px;
    background: radial-gradient(circle, rgba(0, 255, 136, 0.08) 0%, transparent 70%);
    pointer-events: none;
    z-index: 9999;
    mix-blend-mode: screen;
  }

  @media (max-width: 768px) {
    .cursor-glow {
      display: none;
    }
  }
</style>
