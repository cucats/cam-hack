<script>
  import "../app.css";

  import Header from "$lib/components/header/Header.svelte";

  let { children } = $props();
</script>

<header class="relative bg-black/90 shadow-lg backdrop-blur-md" style="border-bottom: 1px solid rgba(16, 185, 129, 0.3);">
  <Header />
</header>

<main class="flex-1">
  {@render children()}
</main>
