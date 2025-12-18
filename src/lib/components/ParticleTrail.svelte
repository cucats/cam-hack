<script>
  import { onMount } from "svelte";

  let canvas;

  onMount(() => {
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const maxParticles = 100;

    class Particle {
      constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 3 + 1;
        this.speedX = (Math.random() - 0.5) * 2;
        this.speedY = (Math.random() - 0.5) * 2;
        this.life = 100;
        this.colors = ["#86e293", "#86e6c6", "#10b981"];
        this.color = this.colors[Math.floor(Math.random() * this.colors.length)];
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.life -= 1;
        this.size *= 0.98;
      }

      draw() {
        ctx.save();
        ctx.globalAlpha = this.life / 100;
        ctx.fillStyle = this.color;
        ctx.shadowBlur = 10;
        ctx.shadowColor = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    function handleMouseMove(e) {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      for (let i = 0; i < 3; i++) {
        particles.push(new Particle(x, y));
      }

      if (particles.length > maxParticles) {
        particles.splice(0, particles.length - maxParticles);
      }
    }

    function animate() {
      ctx.fillStyle = "rgba(10, 15, 26, 0.1)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (let i = particles.length - 1; i >= 0; i--) {
        particles[i].update();
        particles[i].draw();

        if (particles[i].life <= 0) {
          particles.splice(i, 1);
        }
      }

      requestAnimationFrame(animate);
    }

    function handleResize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", handleResize);
    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
    };
  });
</script>

<canvas bind:this={canvas} class="particle-trail-canvas"></canvas>

<style>
  .particle-trail-canvas {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 5;
  }
</style>
