<script>
  import "../app.css";

  let { children } = $props();
</script>

<main class="min-h-screen">
  {@render children()}
</main>
