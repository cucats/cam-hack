<script>
  import Hamburger from "$lib/components/header/Hamburger.svelte";
  import MobileMenu from "$lib/components/header/MobileMenu.svelte";

  let expanded = $state(false);
</script>

<div class="mx-auto max-w-7xl">
  <div class="flex h-[60px] items-center justify-between">
    <a href="/" class="select-none">
      <div class="flex items-center">
        <img
          class="ml-4 h-[60px]"
          src="/cam-hack-logo-text.png"
          alt="Cam Hack Logo"
        />
        <span class="ml-4 text-xl font-bold text-slate-50">Cam Hack 2025</span>
      </div>
    </a>
    <div class="px-4">
      <nav
        class="flex items-center gap-6 text-xl font-semibold text-slate-100 transition-colors max-md:hidden"
      >
        <a class="hover:text-emerald-300" href="/#about">About</a>
        <a class="hover:text-emerald-300" href="/#schedule">Schedule</a>
        <a class="hover:text-emerald-300" href="/#rules">Rules</a>
        <a class="hover:text-emerald-300" href="/#faq">FAQ</a>
        <a
          class="rounded-lg bg-emerald-300 px-4 py-2 text-slate-900 transition-transform hover:scale-105"
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
