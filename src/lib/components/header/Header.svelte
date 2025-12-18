<script>
  import Hamburger from "$lib/components/header/Hamburger.svelte";
  import MobileMenu from "$lib/components/header/MobileMenu.svelte";
  import { onMount } from "svelte";

  let expanded = $state(false);
  let scrolled = $state(false);

  onMount(() => {
    const handleScroll = () => {
      scrolled = window.scrollY > 50;
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  });
</script>

<div
  class="fixed top-0 right-0 left-0 z-50 transition-all duration-300 {scrolled
    ? 'glass-dark'
    : 'bg-transparent'}"
>
  <div class="mx-auto max-w-7xl">
    <div class="flex h-[70px] items-center justify-between px-4">
      <a href="/" class="group flex items-center gap-3 select-none">
        <img
          class="h-12 w-12 transition-transform duration-300 group-hover:scale-110"
          src="/cam-hack-logo-text.png"
          alt="Cam Hack Logo"
        />
        <span
          class="font-display text-xl font-bold text-white transition-colors group-hover:text-emerald-400"
        >
          Cam Hack 2025
        </span>
      </a>
      <div>
        <nav
          class="flex items-center gap-8 text-lg font-semibold max-md:hidden"
        >
          <a
            class="relative text-gray-300 transition-colors hover:text-emerald-400"
            href="/#about"
          >
            About
            <span
              class="absolute -bottom-1 left-0 h-0.5 w-0 bg-emerald-400 transition-all group-hover:w-full"
            ></span>
          </a>
          <a
            class="relative text-gray-300 transition-colors hover:text-emerald-400"
            href="/#schedule"
          >
            Schedule
          </a>
          <a
            class="relative text-gray-300 transition-colors hover:text-emerald-400"
            href="/#rules"
          >
            Rules
          </a>
          <a
            class="relative text-gray-300 transition-colors hover:text-emerald-400"
            href="/#faq"
          >
            FAQ
          </a>
          <a
            class="rounded-lg bg-gradient-to-r from-emerald-500 to-teal-500 px-5 py-2 font-semibold text-black transition-all hover:scale-105 hover:shadow-lg hover:shadow-emerald-500/25"
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
</div>
