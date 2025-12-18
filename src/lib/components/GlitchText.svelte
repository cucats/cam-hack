<script>
  export let text;
  export let tag = "h1";
</script>

<svelte:element this={tag} class="glitch" data-text={text}>
  {text}
</svelte:element>

<style>
  .glitch {
    position: relative;
    animation: glitch-main 5s infinite;
  }

  .glitch::before,
  .glitch::after {
    content: attr(data-text);
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .glitch::before {
    animation: glitch-1 2.5s infinite;
    clip-path: polygon(0 0, 100% 0, 100% 45%, 0 45%);
    transform: translate(-0.025em, -0.0125em);
    opacity: 0.8;
  }

  .glitch::after {
    animation: glitch-2 2.5s infinite;
    clip-path: polygon(0 55%, 100% 55%, 100% 100%, 0 100%);
    transform: translate(0.025em, 0.0125em);
    opacity: 0.8;
  }

  @keyframes glitch-main {
    0%,
    99% {
      text-shadow:
        0 0 20px rgba(134, 226, 147, 0.8),
        0 0 40px rgba(134, 226, 147, 0.4);
    }
    1%,
    3% {
      text-shadow:
        -2px 0 #ff00de,
        2px 2px #00ffff;
    }
  }

  @keyframes glitch-1 {
    0%,
    100% {
      transform: translate(0);
    }
    33% {
      transform: translate(-4px, 2px);
    }
    66% {
      transform: translate(4px, -2px);
    }
  }

  @keyframes glitch-2 {
    0%,
    100% {
      transform: translate(0);
    }
    33% {
      transform: translate(4px, -2px);
    }
    66% {
      transform: translate(-4px, 2px);
    }
  }
</style>
