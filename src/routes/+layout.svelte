<script>
  import "../app.css";

  import Header from "$lib/components/header/Header.svelte";

  let { children } = $props();
</script>

<header class="splash-header">
  <Header />
</header>

<main class="flex-1">
  {@render children()}
</main>

<style>
  .splash-header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 100;
    background: rgba(10, 14, 39, 0.8);
    backdrop-filter: blur(10px);
    border-bottom: 1px solid rgba(16, 185, 129, 0.2);
  }

  .splash-header :global(a) {
    color: #d1fae5;
  }

  .splash-header :global(a:hover) {
    color: #34d399;
  }

  .splash-header :global(span) {
    color: #d1fae5;
  }

  .splash-header :global(.bg-emerald-300) {
    background: linear-gradient(135deg, #10b981 0%, #34d399 100%);
    color: #0a0e27;
  }
</style>
