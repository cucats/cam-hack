<script>
    import { navigating } from "$app/stores";
    import { slide } from "svelte/transition";

    let { expanded = $bindable(false) } = $props();

    function closeMenu() {
        expanded = false;
    }

    $effect(() => {
        if ($navigating) closeMenu();
    });
</script>

<div class="md:hidden absolute w-full select-none drop-shadow-2xl" transition:slide>
    <menu>
        <a onclick={closeMenu} href="/#about">About</a>
        <a onclick={closeMenu} href="/#schedule">Schedule</a>
        <a onclick={closeMenu} href="/#rules">Rules</a>
        <a onclick={closeMenu} href="/#faq">FAQ</a>
        <a onclick={closeMenu} href="/signup" target="_blank">Sign up!</a>
    </menu>
</div>

<style lang="postcss">
    a {
        @apply block px-8 py-4 text-gray-800 transition-colors bg-white active:bg-emerald-200;
    }
</style>
