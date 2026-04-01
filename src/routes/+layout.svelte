<script>
  import "../app.css";
  import ThreeBackground from "$lib/components/ThreeBackground.svelte";
  import Header from "$lib/components/header/Header.svelte";

  let { children } = $props();
</script>

<ThreeBackground />

<div class="scanline-overlay"></div>

<Header />

<main class="relative z-10">
  {@render children()}
</main>
