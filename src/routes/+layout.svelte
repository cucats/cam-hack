<script>
  import "../app.css";
  import Header from "$lib/components/header/Header.svelte";
  import ThreeBackground from "$lib/components/ThreeBackground.svelte";

  let { children } = $props();
</script>

<ThreeBackground />

<header
  class="fixed top-0 right-0 left-0 z-50 border-b border-zinc-800/50 bg-black/50 backdrop-blur-xl"
>
  <Header />
</header>

<main class="pt-[60px]">
  {@render children()}
</main>
