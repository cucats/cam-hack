<script>
  import Hamburger from "$lib/components/header/Hamburger.svelte";
  import MobileMenu from "$lib/components/header/MobileMenu.svelte";

  let expanded = $state(false);
</script>

<div class="mx-auto max-w-7xl">
  <div class="flex h-[60px] items-center justify-between">
    <a href="/" class="group select-none">
      <div class="flex items-center">
        <img
          class="ml-4 h-[50px] transition-transform duration-300 group-hover:scale-110"
          src="/cam-hack-logo-text.png"
          alt="Cam Hack Logo"
        />
        <span
          class="ml-4 text-xl font-bold text-white transition-colors group-hover:text-emerald-400"
          >Cam Hack 2025</span
        >
      </div>
    </a>
    <div class="px-4">
      <nav class="flex items-center gap-6 text-lg font-semibold max-md:hidden">
        <a
          class="text-zinc-300 transition-colors hover:text-emerald-400"
          href="/#about">About</a
        >
        <a
          class="text-zinc-300 transition-colors hover:text-emerald-400"
          href="/#schedule">Schedule</a
        >
        <a
          class="text-zinc-300 transition-colors hover:text-emerald-400"
          href="/#rules">Rules</a
        >
        <a
          class="text-zinc-300 transition-colors hover:text-emerald-400"
          href="/#faq">FAQ</a
        >
        <a
          class="rounded-xl border border-emerald-500/50 bg-emerald-500/20 px-4 py-2 text-emerald-300 transition-all duration-300 hover:scale-105 hover:border-emerald-400 hover:bg-emerald-500/30"
          href="/signup"
        >
          Sign up!
        </a>
      </nav>
      <Hamburger bind:expanded />
    </div>
  </div>
  {#if expanded}
    <MobileMenu bind:expanded />
  {/if}
</div>
