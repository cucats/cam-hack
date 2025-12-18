<script>
  import "../app.css";
  import { page } from "$app/stores";
  import Footer from "$lib/components/Footer.svelte";
  import Header from "$lib/components/header/Header.svelte";

  let { children } = $props();
</script>

{#if $page.url.pathname !== '/'}
<header class="relative bg-white shadow-md">
  <Header />
</header>
{/if}

<main class="flex-1">
  {@render children()}
</main>

{#if $page.url.pathname !== '/'}
<footer class="theme-bg-gradient p-8">
  <Footer />
</footer>
{/if}
