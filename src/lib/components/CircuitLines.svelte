<script>
  import { onMount } from "svelte";

  let svg;

  onMount(() => {
    const width = window.innerWidth;
    const height = window.innerHeight;

    const lines = [];
    const numLines = 20;

    for (let i = 0; i < numLines; i++) {
      const startX = Math.random() * width;
      const startY = Math.random() * height;
      const endX = startX + (Math.random() - 0.5) * 200;
      const endY = startY + (Math.random() - 0.5) * 200;

      lines.push({
        x1: startX,
        y1: startY,
        x2: endX,
        y2: endY,
        delay: Math.random() * 5,
      });
    }

    if (svg) {
      lines.forEach((line, i) => {
        const lineEl = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "line",
        );
        lineEl.setAttribute("x1", line.x1);
        lineEl.setAttribute("y1", line.y1);
        lineEl.setAttribute("x2", line.x2);
        lineEl.setAttribute("y2", line.y2);
        lineEl.setAttribute("class", "circuit-line");
        lineEl.style.animationDelay = `${line.delay}s`;
        svg.appendChild(lineEl);

        const circle = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "circle",
        );
        circle.setAttribute("cx", line.x2);
        circle.setAttribute("cy", line.y2);
        circle.setAttribute("r", "3");
        circle.setAttribute("class", "circuit-node");
        circle.style.animationDelay = `${line.delay}s`;
        svg.appendChild(circle);
      });
    }
  });
</script>

<svg bind:this={svg} class="circuit-svg" xmlns="http://www.w3.org/2000/svg">
</svg>

<style>
  .circuit-svg {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 1;
    opacity: 0.2;
  }

  :global(.circuit-line) {
    stroke: #86e293;
    stroke-width: 1;
    opacity: 0;
    animation: line-pulse 4s ease-in-out infinite;
  }

  :global(.circuit-node) {
    fill: #86e293;
    opacity: 0;
    animation: node-pulse 4s ease-in-out infinite;
  }

  @keyframes line-pulse {
    0%,
    100% {
      opacity: 0;
    }
    50% {
      opacity: 0.5;
    }
  }

  @keyframes node-pulse {
    0%,
    100% {
      opacity: 0;
      transform: scale(1);
    }
    50% {
      opacity: 1;
      transform: scale(1.5);
    }
  }
</style>
