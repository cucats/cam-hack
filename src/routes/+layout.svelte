<script>
  import "../app.css";

  import Header from "$lib/components/header/Header.svelte";

  let { children } = $props();
</script>

<header class="header-container">
  <Header />
</header>

<main class="flex-1 main-content">
  {@render children()}
</main>

<style>
  .header-container {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 100;
    background: rgba(10, 14, 13, 0.8);
    backdrop-filter: blur(10px);
    border-bottom: 1px solid rgba(0, 255, 136, 0.2);
  }

  .main-content {
    padding-top: 80px;
  }
</style>
