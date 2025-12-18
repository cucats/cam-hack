<script>
  import "../app.css";

  import Footer from "$lib/components/Footer.svelte";
  import Header from "$lib/components/header/Header.svelte";
  import { page } from "$app/stores";

  let { children } = $props();

  const isHomePage = $derived($page.url.pathname === '/');
</script>

<header class="site-header" class:transparent={isHomePage}>
  <Header />
</header>

<main class="flex-1">
  {@render children()}
</main>

{#if !isHomePage}
  <footer class="site-footer">
    <Footer />
  </footer>
{/if}

<style>
  .site-header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 100;
    background: rgba(10, 10, 10, 0.9);
    backdrop-filter: blur(20px);
    border-bottom: 1px solid rgba(0, 255, 136, 0.1);
    transition: all 0.3s ease;
  }

  .site-header.transparent {
    background: rgba(10, 10, 10, 0.7);
  }

  main {
    padding-top: 60px;
  }

  .site-footer {
    background: linear-gradient(135deg, var(--color-secondary) 0%, var(--color-dark) 100%);
    padding: 2rem;
    border-top: 1px solid rgba(0, 255, 136, 0.1);
  }
</style>
