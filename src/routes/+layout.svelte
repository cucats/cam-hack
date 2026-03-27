<script>
  import "../app.css";
  import { page } from "$app/stores";

  let { children } = $props();
</script>

<main class="flex-1">
  {@render children()}
</main>
