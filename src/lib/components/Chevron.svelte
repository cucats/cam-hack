<script>
  let { expanded = false } = $props();
</script>

<span class="chevron" class:up={expanded}>
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="3"
  >
    <path d="M6 9l6 6 6-6" />
  </svg>
</span>

<style>
  .chevron {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    color: #00ff88;
    transition: transform 0.3s ease;
    margin-left: 0.5rem;
  }

  .chevron.up {
    transform: rotate(180deg);
  }
</style>
