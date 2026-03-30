<script>
  import { onMount } from "svelte";

  let scrolled = $state(false);
  let menuOpen = $state(false);

  onMount(() => {
    const handleScroll = () => {
      scrolled = window.scrollY > 50;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  });

  function toggleMenu() {
    menuOpen = !menuOpen;
  }

  function closeMenu() {
    menuOpen = false;
  }

  const navLinks = [
    { href: "#about", label: "About" },
    { href: "#schedule", label: "Schedule" },
    { href: "#sponsors", label: "Sponsors" },
    { href: "#faq", label: "FAQ" },
    { href: "#rules", label: "Rules" },
  ];
</script>

<header
  class="fixed top-0 right-0 left-0 z-50 transition-all duration-500"
  class:scrolled
>
  <div class="mx-auto max-w-7xl px-4 sm:px-8">
    <div class="flex h-16 items-center justify-between sm:h-20">
      <a href="/" class="group flex items-center gap-3 select-none">
        <img
          src="/cam-hack-logo-text.png"
          alt="Cam Hack Logo"
          class="h-10 transition-transform duration-300 group-hover:scale-110 sm:h-12"
        />
        <span class="hidden text-lg font-bold text-white sm:block sm:text-xl">
          Cam Hack <span class="neon-text">2025</span>
        </span>
      </a>

      <nav class="hidden items-center gap-6 md:flex">
        {#each navLinks as link}
          <a
            href={link.href}
            class="hover:text-neon-green font-medium text-gray-400 transition-colors duration-300"
          >
            {link.label}
          </a>
        {/each}
        <a
          href="/signup"
          class="neon-border text-neon-green hover:bg-neon-green hover:text-dark-void rounded-lg px-4 py-2 transition-all duration-300 hover:scale-105"
        >
          Sign up!
        </a>
      </nav>

      <button
        onclick={toggleMenu}
        class="text-neon-green p-2 md:hidden"
        aria-label="Toggle menu"
      >
        <svg
          class="h-6 w-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          {#if menuOpen}
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          {:else}
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          {/if}
        </svg>
      </button>
    </div>
  </div>

  {#if menuOpen}
    <div class="glass-panel border-neon-green/20 border-t md:hidden">
      <nav class="flex flex-col space-y-2 p-4">
        {#each navLinks as link}
          <a
            href={link.href}
            onclick={closeMenu}
            class="hover:text-neon-green hover:bg-neon-green/10 rounded-lg px-4 py-2 text-gray-400 transition-colors duration-300"
          >
            {link.label}
          </a>
        {/each}
        <a
          href="/signup"
          onclick={closeMenu}
          class="neon-border text-neon-green hover:bg-neon-green hover:text-dark-void mt-2 rounded-lg px-4 py-3 text-center transition-all duration-300"
        >
          Sign up!
        </a>
      </nav>
    </div>
  {/if}
</header>

<style>
  header {
    background: transparent;
  }

  header.scrolled {
    background: rgba(10, 10, 10, 0.9);
    backdrop-filter: blur(20px);
    border-bottom: 1px solid rgba(0, 255, 136, 0.1);
  }
</style>
