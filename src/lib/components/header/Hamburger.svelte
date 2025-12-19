<script>
  let { expanded = $bindable(false) } = $props();

  function toggle() {
    expanded = !expanded;
  }
</script>

<button onclick={toggle} class="hamburger-button" aria-label="Toggle menu">
  <div class="bar" class:expanded-bar-1={expanded}></div>
  <div class="bar" class:expanded-bar-2={expanded}></div>
  <div class="bar" class:expanded-bar-3={expanded}></div>
</button>

<style>
  .hamburger-button {
    display: block;
    cursor: pointer;
    padding: 0.5rem;
    background: transparent;
    border: none;
  }

  @media (min-width: 768px) {
    .hamburger-button {
      display: none;
    }
  }

  .bar {
    width: 28px;
    height: 3px;
    margin: 5px 0;
    border-radius: 2px;
    background: var(--color-primary);
    transition: all 0.3s ease;
  }

  .hamburger-button:hover .bar {
    box-shadow: 0 0 10px rgba(0, 255, 136, 0.5);
  }

  .expanded-bar-1 {
    transform: translateY(8px) rotate(-45deg);
  }

  .expanded-bar-2 {
    opacity: 0;
  }

  .expanded-bar-3 {
    transform: translateY(-8px) rotate(45deg);
  }
</style>
