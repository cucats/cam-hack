<script>
  import { onMount } from 'svelte';

  let scrolled = $state(false);
  let mobileMenuOpen = $state(false);

  const navLinks = [
    { href: '#about', label: 'About' },
    { href: '#schedule', label: 'Schedule' },
    { href: '#rules', label: 'Rules' },
    { href: '#faq', label: 'FAQ' },
  ];

  function handleScroll() {
    scrolled = window.scrollY > 50;
  }

  function closeMobileMenu() {
    mobileMenuOpen = false;
  }

  onMount(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  });
</script>

<nav
  class="fixed top-0 left-0 right-0 z-50 transition-all duration-300 {scrolled ? 'bg-slate-900/90 backdrop-blur-lg shadow-lg shadow-emerald-500/5' : 'bg-transparent'}"
>
  <div class="max-w-7xl mx-auto px-4 sm:px-8">
    <div class="flex items-center justify-between h-16 sm:h-20">
      <a href="/" class="flex items-center gap-3 group">
        <img
          src="/cam-hack-logo-text.png"
          alt="Cam Hack Logo"
          class="w-12 h-12 sm:w-14 sm:h-14 transition-transform duration-300 group-hover:scale-110"
        />
        <span class="font-display text-lg sm:text-xl font-bold text-emerald-300 hidden sm:block">
          Cam Hack 2025
        </span>
      </a>

      <div class="hidden md:flex items-center gap-8">
        {#each navLinks as link}
          <a
            href={link.href}
            class="font-display text-gray-300 hover:text-emerald-400 transition-colors relative group"
          >
            {link.label}
            <span class="absolute -bottom-1 left-0 w-0 h-0.5 bg-emerald-400 transition-all duration-300 group-hover:w-full"></span>
          </a>
        {/each}
        <a
          href="/signup"
          class="px-6 py-2 bg-emerald-500/20 border border-emerald-500/50 rounded-lg text-emerald-300 font-display font-semibold transition-all duration-300 hover:bg-emerald-500/30 hover:border-emerald-400"
        >
          Sign up
        </a>
      </div>

      <button
        class="md:hidden w-10 h-10 flex items-center justify-center"
        onclick={() => mobileMenuOpen = !mobileMenuOpen}
        aria-label="Toggle menu"
      >
        <div class="relative w-6 h-5">
          <span
            class="absolute left-0 w-full h-0.5 bg-emerald-400 transition-all duration-300 {mobileMenuOpen ? 'top-2 rotate-45' : 'top-0'}"
          ></span>
          <span
            class="absolute left-0 top-2 w-full h-0.5 bg-emerald-400 transition-all duration-300 {mobileMenuOpen ? 'opacity-0' : 'opacity-100'}"
          ></span>
          <span
            class="absolute left-0 w-full h-0.5 bg-emerald-400 transition-all duration-300 {mobileMenuOpen ? 'top-2 -rotate-45' : 'top-4'}"
          ></span>
        </div>
      </button>
    </div>
  </div>

  {#if mobileMenuOpen}
    <div class="md:hidden bg-slate-900/95 backdrop-blur-lg border-t border-emerald-500/20">
      <div class="px-4 py-6 space-y-4">
        {#each navLinks as link}
          <a
            href={link.href}
            class="block font-display text-lg text-gray-300 hover:text-emerald-400 transition-colors py-2"
            onclick={closeMobileMenu}
          >
            {link.label}
          </a>
        {/each}
        <a
          href="/signup"
          class="block text-center px-6 py-3 bg-emerald-500/20 border border-emerald-500/50 rounded-lg text-emerald-300 font-display font-semibold"
          onclick={closeMobileMenu}
        >
          Sign up
        </a>
      </div>
    </div>
  {/if}
</nav>
