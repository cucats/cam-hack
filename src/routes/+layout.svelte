<script>
  import "../app.css";
  let { children } = $props();
</script>

<div class="splash-layout">
  {@render children()}
</div>

<style>
  .splash-layout {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }
</style>
