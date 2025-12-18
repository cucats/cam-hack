<script>
  import "../app.css";

  import Header from "$lib/components/header/Header.svelte";

  let { children } = $props();
</script>

<header class="relative bg-black/80 backdrop-blur-md shadow-md z-50">
  <Header />
</header>

<main class="flex-1">
  {@render children()}
</main>
