<script>
  import "../app.css";

  let { children } = $props();
</script>

<main class="flex-1">
  {@render children()}
</main>
