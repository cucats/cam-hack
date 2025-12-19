<script>
  export let text = '';
  export let className = '';
</script>

<div class="glitch {className}" data-text={text}>
  {text}
</div>

<style>
  .glitch {
    position: relative;
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
    animation: glitch-anim-1 2.5s infinite linear alternate-reverse;
    color: #10b981;
    z-index: -1;
  }
  
  .glitch::after {
    animation: glitch-anim-2 3s infinite linear alternate-reverse;
    color: #86e293;
    z-index: -2;
  }
  
  @keyframes glitch-anim-1 {
    0% {
      clip-path: inset(40% 0 61% 0);
      transform: translate(-2px, 2px);
    }
    20% {
      clip-path: inset(92% 0 1% 0);
      transform: translate(2px, -2px);
    }
    40% {
      clip-path: inset(43% 0 1% 0);
      transform: translate(-2px, 2px);
    }
    60% {
      clip-path: inset(25% 0 58% 0);
      transform: translate(2px, -2px);
    }
    80% {
      clip-path: inset(54% 0 7% 0);
      transform: translate(-2px, 2px);
    }
    100% {
      clip-path: inset(58% 0 43% 0);
      transform: translate(2px, -2px);
    }
  }
  
  @keyframes glitch-anim-2 {
    0% {
      clip-path: inset(65% 0 15% 0);
      transform: translate(2px, -2px);
    }
    20% {
      clip-path: inset(30% 0 70% 0);
      transform: translate(-2px, 2px);
    }
    40% {
      clip-path: inset(80% 0 5% 0);
      transform: translate(2px, -2px);
    }
    60% {
      clip-path: inset(10% 0 85% 0);
      transform: translate(-2px, 2px);
    }
    80% {
      clip-path: inset(50% 0 30% 0);
      transform: translate(2px, -2px);
    }
    100% {
      clip-path: inset(20% 0 60% 0);
      transform: translate(-2px, 2px);
    }
  }
</style>
