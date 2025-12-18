<script>
  import Hamburger from "$lib/components/header/Hamburger.svelte";
  import MobileMenu from "$lib/components/header/MobileMenu.svelte";

  let expanded = $state(false);
</script>

<div class="mx-auto max-w-7xl">
  <div class="flex h-[70px] items-center justify-between">
    <a href="/" class="group select-none transition-transform hover:scale-105">
      <div class="flex items-center">
        <img
          class="ml-4 h-[60px] drop-shadow-lg"
          src="/cam-hack-logo-text.png"
          alt="Cam Hack Logo"
        />
        <span class="ml-4 text-xl font-bold text-emerald-300 drop-shadow-lg transition-colors group-hover:text-emerald-200">
          Cam Hack 2025
        </span>
      </div>
    </a>
    <div class="px-4">
      <nav
        class="flex items-center gap-6 text-lg font-semibold transition-colors max-md:hidden"
      >
        <a class="text-emerald-200 transition-colors hover:text-emerald-400" href="/#about">About</a>
        <a class="text-emerald-200 transition-colors hover:text-emerald-400" href="/#schedule">Schedule</a>
        <a class="text-emerald-200 transition-colors hover:text-emerald-400" href="/#rules">Rules</a>
        <a class="text-emerald-200 transition-colors hover:text-emerald-400" href="/#faq">FAQ</a>
        <a
          class="rounded-lg border border-emerald-500 bg-gradient-to-r from-emerald-500 to-green-600 px-4 py-2 text-white shadow-lg shadow-emerald-500/30 transition-all hover:scale-105 hover:shadow-emerald-500/50"
          href="/signup">Sign up!</a
        >
      </nav>
      <Hamburger bind:expanded />
    </div>
  </div>
  {#if expanded}
    <MobileMenu bind:expanded />
  {/if}
</div>
