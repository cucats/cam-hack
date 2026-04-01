<script>
  import "../app.css";

  import Header from "$lib/components/header/Header.svelte";
  import ThreeBackground from "$lib/components/ThreeBackground.svelte";

  let { children } = $props();
</script>

<svelte:head>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
  <link
    href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;800;900&family=Space+Mono:wght@400;700&display=swap"
    rel="stylesheet"
  />
</svelte:head>

<ThreeBackground />

<header class="header-wrapper">
  <Header />
</header>

<main class="main-content">
  {@render children()}
</main>

<style>
  .header-wrapper {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;
    background: rgba(10, 15, 13, 0.9);
    backdrop-filter: blur(20px);
    border-bottom: 1px solid rgba(0, 255, 136, 0.1);
  }

  .main-content {
    flex: 1;
    position: relative;
    z-index: 1;
    padding-top: 70px;
  }
</style>
