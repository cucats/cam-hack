<script>
  import "../app.css";

  import Header from "$lib/components/header/Header.svelte";

  let { children } = $props();
</script>

<header class="relative bg-white/75 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-white/55">
  <Header />
</header>

<main class="flex-1">
  {@render children()}
</main>
