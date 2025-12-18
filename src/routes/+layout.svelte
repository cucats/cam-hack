<script>
  import "../app.css";

  import Footer from "$lib/components/Footer.svelte";
  import Header from "$lib/components/header/Header.svelte";
  import { page } from "$app/stores";

  let { children } = $props();
</script>

<header
  class="relative {$page.url.pathname === '/' ? 'splash-header' : 'bg-white shadow-md'}"
>
  <Header />
</header>

<main class="flex-1">
  {@render children()}
</main>

{#if $page.url.pathname !== "/"}
  <footer class="theme-bg-gradient p-8">
    <Footer />
  </footer>
{/if}

<style>
  header.splash-header {
    background: rgba(5, 8, 10, 0.35);
    backdrop-filter: blur(14px);
    -webkit-backdrop-filter: blur(14px);
    border-bottom: 1px solid rgba(134, 230, 198, 0.18);
    color: rgba(234, 255, 246, 0.92);
  }

  header.splash-header :global(a),
  header.splash-header :global(span) {
    color: rgba(234, 255, 246, 0.92);
  }

  header.splash-header :global(nav a:hover) {
    color: #46f48a;
  }

  header.splash-header :global(nav a.rounded-lg) {
    background: rgba(70, 244, 138, 0.14);
    border: 1px solid rgba(134, 230, 198, 0.18);
  }
</style>
