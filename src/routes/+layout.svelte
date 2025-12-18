<script>
  import "../app.css";
  import { page } from "$app/stores";

  import Footer from "$lib/components/Footer.svelte";
  import Header from "$lib/components/header/Header.svelte";
  import SplashHeader from "$lib/components/splash/SplashHeader.svelte";

  let { children } = $props();

  let isSplash = $derived($page.url.pathname === "/");
</script>

{#if isSplash}
  <header class="splash-header">
    <SplashHeader />
  </header>

  <main class="splash-main">
    {@render children()}
  </main>
{:else}
  <header class="relative bg-white shadow-md">
    <Header />
  </header>

  <main class="flex-1">
    {@render children()}
  </main>

  <footer class="theme-bg-gradient p-8">
    <Footer />
  </footer>
{/if}

<style>
  .splash-header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 100;
    background: rgba(13, 17, 23, 0.8);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }

  .splash-main {
    flex: 1;
    background: transparent;
  }
</style>
