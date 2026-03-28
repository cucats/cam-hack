<script>
  import "../app.css";

  import Footer from "$lib/components/Footer.svelte";
  import Header from "$lib/components/header/Header.svelte";

  let { children, data } = $props();
</script>

{#if !data?.hideLayout}
  <header class="relative bg-white shadow-md">
    <Header />
  </header>
{/if}

<main class="flex-1">
  {@render children()}
</main>

{#if !data?.hideLayout}
  <footer class="theme-bg-gradient p-8">
    <Footer />
  </footer>
{/if}
