<script>
  let { expanded = $bindable(false) } = $props();

  function toggle() {
    expanded = !expanded;
  }
</script>

<button onclick={toggle} class="hamburger" aria-label="Toggle menu">
  <div class="bar" class:expanded-bar-1={expanded}></div>
  <div class="bar" class:expanded-bar-2={expanded}></div>
  <div class="bar" class:expanded-bar-3={expanded}></div>
</button>

<style>
  .hamburger {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 5px;
    padding: 10px;
    background: transparent;
    border: none;
    cursor: pointer;
    position: relative;
  }

  @media (min-width: 768px) {
    .hamburger {
      display: none;
    }
  }

  .bar {
    width: 28px;
    height: 3px;
    background: #00ff88;
    border-radius: 2px;
    transition: all 0.3s ease;
    box-shadow: 0 0 10px rgba(0, 255, 136, 0.5);
  }

  .hamburger:hover .bar {
    box-shadow: 0 0 15px rgba(0, 255, 136, 0.8);
  }

  .expanded-bar-1 {
    transform: translateY(8px) rotate(-45deg);
  }

  .expanded-bar-2 {
    opacity: 0;
    transform: scaleX(0);
  }

  .expanded-bar-3 {
    transform: translateY(-8px) rotate(45deg);
  }
</style>
