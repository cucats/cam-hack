<script>
  import "../app.css";

  import HeaderNew from "$lib/components/header/HeaderNew.svelte";

  let { children } = $props();
</script>

<HeaderNew />

<main class="flex-1">
  {@render children()}
</main>
