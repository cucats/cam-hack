<script>
  import "../app.css";

  import Header from "$lib/components/header/Header.svelte";

  let { children } = $props();
</script>

<header
  class="sticky top-0 z-50 border-b border-emerald-300/15 bg-black/25 backdrop-blur-xl"
>
  <Header />
</header>

<main class="flex-1">
  {@render children()}
</main>
