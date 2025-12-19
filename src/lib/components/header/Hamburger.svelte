<script>
  let { expanded = $bindable(false) } = $props();

  function toggle() {
    expanded = !expanded;
  }
</script>

<button onclick={toggle} class="group cursor-pointer md:hidden" aria-label="Toggle menu">
  <div class="bar" class:expanded-bar-1={expanded}></div>
  <div class="bar" class:expanded-bar-2={expanded}></div>
  <div class="bar" class:expanded-bar-3={expanded}></div>
</button>

<style lang="postcss">
  @reference "../../../app.css"

  .bar {
    @apply my-1 h-1 w-7 rounded-full transition-all;
    background: #00ff88;
    box-shadow: 0 0 5px rgba(0, 255, 136, 0.5);
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
