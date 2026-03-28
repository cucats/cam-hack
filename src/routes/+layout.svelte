<script>
  import "../app.css";

  import Footer from "$lib/components/Footer.svelte";
  import Header from "$lib/components/header/Header.svelte";
  import { page } from "$app/stores";

  let { children } = $props();

  let isHomePage = $derived($page.url.pathname === "/");
</script>

<header class="relative z-50 bg-white shadow-md">
  <Header />
</header>

<main class="flex-1">
  {@render children()}
</main>

{#if !isHomePage}
  <footer class="theme-bg-gradient p-8">
    <Footer />
  </footer>
{/if}
