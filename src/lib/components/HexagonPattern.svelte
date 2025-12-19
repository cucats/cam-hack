<script>
  import { onMount } from "svelte";

  let canvas;

  onMount(() => {
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const hexSize = 40;
    const hexHeight = hexSize * Math.sqrt(3);

    function drawHexagon(x, y, size) {
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const angle = (Math.PI / 3) * i;
        const hx = x + size * Math.cos(angle);
        const hy = y + size * Math.sin(angle);
        if (i === 0) {
          ctx.moveTo(hx, hy);
        } else {
          ctx.lineTo(hx, hy);
        }
      }
      ctx.closePath();

      const opacity = Math.random() * 0.1 + 0.02;
      ctx.strokeStyle = `rgba(134, 226, 147, ${opacity})`;
      ctx.lineWidth = 1;
      ctx.stroke();

      if (Math.random() < 0.05) {
        ctx.fillStyle = `rgba(134, 226, 147, ${opacity * 0.5})`;
        ctx.fill();
      }
    }

    function drawPattern() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let row = 0; row < canvas.height / hexHeight + 2; row++) {
        for (let col = 0; col < canvas.width / (hexSize * 1.5) + 2; col++) {
          const x = col * hexSize * 1.5;
          const y = row * hexHeight + (col % 2) * (hexHeight / 2);
          drawHexagon(x, y, hexSize / 2);
        }
      }
    }

    drawPattern();

    function handleResize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      drawPattern();
    }

    window.addEventListener("resize", handleResize);

    const interval = setInterval(() => {
      drawPattern();
    }, 5000);

    return () => {
      window.removeEventListener("resize", handleResize);
      clearInterval(interval);
    };
  });
</script>

<canvas bind:this={canvas} class="hexagon-pattern"></canvas>

<style>
  .hexagon-pattern {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 1;
    opacity: 0.4;
  }
</style>
