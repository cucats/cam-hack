<script>
  import "../app.css";
  import HeaderNew from "$lib/components/header/HeaderNew.svelte";
  import ThreeBackground from "$lib/components/ThreeBackground.svelte";

  let { children } = $props();
</script>

<ThreeBackground />

<HeaderNew />

<main class="relative z-10">
  {@render children()}
</main>
