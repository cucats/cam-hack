<script>
  import { onMount } from "svelte";
  import Hamburger from "$lib/components/header/Hamburger.svelte";
  import MobileMenu from "$lib/components/header/MobileMenu.svelte";

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
    ? 'bg-cyber-dark/90 border-cyber-border shadow-cyber-green/5 border-b shadow-lg backdrop-blur-lg'
    : 'bg-transparent'}"
>
  <div class="mx-auto max-w-7xl">
    <div class="flex h-[70px] items-center justify-between px-4">
      <a href="/" class="group select-none">
        <div class="flex items-center gap-4">
          <img
            class="h-[50px] transition-transform duration-300 group-hover:scale-110"
            src="/cam-hack-logo-text.png"
            alt="Cam Hack Logo"
          />
          <span class="font-display text-xl font-bold tracking-wider">
            <span class="gradient-text">CAM</span>
            <span class="text-white">HACK</span>
            <span class="text-cyber-cyan">2025</span>
          </span>
        </div>
      </a>

      <div class="px-4">
        <nav
          class="flex items-center gap-8 text-lg font-semibold max-md:hidden"
        >
          <a
            class="hover:text-cyber-green group relative text-gray-300 transition-colors"
            href="/#about"
          >
            About
            <span
              class="bg-cyber-green absolute -bottom-1 left-0 h-0.5 w-0 transition-all duration-300 group-hover:w-full"
            ></span>
          </a>
          <a
            class="hover:text-cyber-green group relative text-gray-300 transition-colors"
            href="/#schedule"
          >
            Schedule
            <span
              class="bg-cyber-green absolute -bottom-1 left-0 h-0.5 w-0 transition-all duration-300 group-hover:w-full"
            ></span>
          </a>
          <a
            class="hover:text-cyber-green group relative text-gray-300 transition-colors"
            href="/#rules"
          >
            Rules
            <span
              class="bg-cyber-green absolute -bottom-1 left-0 h-0.5 w-0 transition-all duration-300 group-hover:w-full"
            ></span>
          </a>
          <a
            class="hover:text-cyber-green group relative text-gray-300 transition-colors"
            href="/#faq"
          >
            FAQ
            <span
              class="bg-cyber-green absolute -bottom-1 left-0 h-0.5 w-0 transition-all duration-300 group-hover:w-full"
            ></span>
          </a>
          <a
            class="cyber-button font-display rounded-lg px-6 py-2.5 tracking-wider"
            href="/signup"
          >
            <span>SIGN UP</span>
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

<div class="h-[70px]"></div>
