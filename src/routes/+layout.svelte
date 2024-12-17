<script>
    import "../app.css";

    import Footer from "$lib/components/Footer.svelte";
    import Header from "$lib/components/header/Header.svelte";

    let { children } = $props();
</script>

<header class="relative bg-white shadow-md">
    <Header />
</header>

<main class="flex-1">
    {@render children()}
</main>

<footer class="p-8 theme-bg-gradient">
    <Footer />
</footer>
