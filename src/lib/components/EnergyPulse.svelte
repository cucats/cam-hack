<script>
  import { onMount } from "svelte";

  let canvas;

  onMount(() => {
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const pulses = [];

    class Pulse {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.radius = 0;
        this.maxRadius = 100 + Math.random() * 100;
        this.speed = 1 + Math.random() * 2;
        this.opacity = 1;
        this.colors = ["#86e293", "#86e6c6", "#10b981"];
        this.color = this.colors[Math.floor(Math.random() * this.colors.length)];
      }

      update() {
        this.radius += this.speed;
        this.opacity = 1 - this.radius / this.maxRadius;
      }

      draw() {
        ctx.save();
        ctx.globalAlpha = this.opacity * 0.3;
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 2;
        ctx.shadowBlur = 10;
        ctx.shadowColor = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
      }

      isFinished() {
        return this.radius >= this.maxRadius;
      }
    }

    function animate() {
      ctx.fillStyle = "rgba(10, 15, 26, 0.1)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      if (Math.random() < 0.02 && pulses.length < 10) {
        pulses.push(new Pulse());
      }

      for (let i = pulses.length - 1; i >= 0; i--) {
        pulses[i].update();
        pulses[i].draw();

        if (pulses[i].isFinished()) {
          pulses.splice(i, 1);
        }
      }

      requestAnimationFrame(animate);
    }

    function handleResize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    window.addEventListener("resize", handleResize);
    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });
</script>

<canvas bind:this={canvas} class="energy-pulse-canvas"></canvas>

<style>
  .energy-pulse-canvas {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 3;
  }
</style>
