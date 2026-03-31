<script>
  import "../app.css";

  import Header from "$lib/components/header/Header.svelte";

  let { children } = $props();
</script>

<header class="relative bg-transparent shadow-none">
  <Header />
</header>

<main class="flex-1">
  {@render children()}
</main>
