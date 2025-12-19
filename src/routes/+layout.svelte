<script>
  import "../app.css";

  import Header from "$lib/components/header/Header.svelte";

  let { children } = $props();
</script>

<header class="fixed top-0 z-50 w-full border-b border-emerald-500/20 bg-slate-900/80 backdrop-blur-lg">
  <Header />
</header>

<main class="flex-1 pt-20">
  {@render children()}
</main>
