<script>
  import { onMount } from "svelte";

  let glowX = 0;
  let glowY = 0;

  onMount(() => {
    function handleMouseMove(e) {
      glowX = e.clientX;
      glowY = e.clientY;
    }

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  });
</script>

<div
  class="cursor-glow"
  style="transform: translate({glowX}px, {glowY}px)"
></div>

<style>
  .cursor-glow {
    position: fixed;
    width: 400px;
    height: 400px;
    margin-left: -200px;
    margin-top: -200px;
    background: radial-gradient(
      circle,
      rgba(134, 226, 147, 0.15) 0%,
      rgba(134, 226, 147, 0.08) 30%,
      transparent 70%
    );
    pointer-events: none;
    z-index: 4;
    transition: transform 0.15s ease-out;
    mix-blend-mode: screen;
  }
</style>
