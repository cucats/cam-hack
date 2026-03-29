<script>
  import { onMount } from "svelte";

  let scrolled = $state(false);
  let mobileMenuOpen = $state(false);

  const navItems = [
    { label: "About", href: "/#about" },
    { label: "Projects", href: "/#projects" },
    { label: "Schedule", href: "/#schedule" },
    { label: "Rules", href: "/#rules" },
    { label: "FAQ", href: "/#faq" },
  ];

  onMount(() => {
    const handleScroll = () => {
      scrolled = window.scrollY > 50;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  });

  function closeMobileMenu() {
    mobileMenuOpen = false;
  }
</script>

<header
  class="fixed top-0 right-0 left-0 z-50 transition-all duration-300"
  class:scrolled
>
  <div class="mx-auto max-w-7xl px-4 sm:px-8">
    <div class="flex h-20 items-center justify-between">
      <a href="/" class="group flex items-center gap-3">
        <img
          src="/cam-hack-logo-text.png"
          alt="Cam Hack Logo"
          class="h-12 w-12 transition-transform duration-300 group-hover:scale-110"
        />
        <span class="font-display text-xl font-bold text-white"
          >Cam Hack 2025</span
        >
      </a>

      <nav class="hidden items-center gap-8 md:flex">
        {#each navItems as item}
          <a
            href={item.href}
            class="nav-link relative font-medium text-gray-300 transition-colors hover:text-white"
          >
            {item.label}
          </a>
        {/each}
        <a
          href="/signup"
          class="btn-glow rounded-xl px-6 py-2.5 font-semibold text-white transition-all duration-300"
        >
          Sign up!
        </a>
      </nav>

      <button
        class="hamburger relative z-50 flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
        onclick={() => (mobileMenuOpen = !mobileMenuOpen)}
        aria-label="Toggle menu"
      >
        <span class="hamburger-line" class:open={mobileMenuOpen}></span>
        <span class="hamburger-line" class:open={mobileMenuOpen}></span>
        <span class="hamburger-line" class:open={mobileMenuOpen}></span>
      </button>
    </div>
  </div>
</header>

{#if mobileMenuOpen}
  <div
    class="mobile-menu fixed inset-0 z-40 flex items-center justify-center backdrop-blur-lg md:hidden"
  >
    <nav class="flex flex-col items-center gap-8">
      {#each navItems as item, index}
        <a
          href={item.href}
          class="mobile-nav-link text-2xl font-semibold text-gray-300 transition-colors"
          style="animation-delay: {index * 0.05}s"
          onclick={closeMobileMenu}
        >
          {item.label}
        </a>
      {/each}
      <a
        href="/signup"
        class="mobile-signup-btn mt-4 rounded-xl px-8 py-3 text-xl font-semibold text-white transition-all"
        style="animation-delay: 0.3s"
        onclick={closeMobileMenu}
      >
        Sign up!
      </a>
    </nav>
  </div>
{/if}

<style>
  header {
    background: transparent;
  }

  header.scrolled {
    background: rgba(10, 10, 15, 0.85);
    backdrop-filter: blur(20px);
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  }

  .nav-link::after {
    content: "";
    position: absolute;
    bottom: -4px;
    left: 0;
    width: 0;
    height: 2px;
    background: linear-gradient(90deg, #10b981, #06b6d4);
    transition: width 0.3s ease;
  }

  .nav-link:hover::after {
    width: 100%;
  }

  .btn-glow {
    background-color: #10b981;
    box-shadow: 0 0 20px rgba(16, 185, 129, 0.3);
  }

  .btn-glow:hover {
    background-color: #34d399;
    box-shadow: 0 0 30px rgba(16, 185, 129, 0.5);
  }

  .hamburger-line {
    width: 24px;
    height: 2px;
    background: white;
    transition: all 0.3s ease;
  }

  .hamburger-line.open:nth-child(1) {
    transform: rotate(45deg) translate(4px, 4px);
  }

  .hamburger-line.open:nth-child(2) {
    opacity: 0;
  }

  .hamburger-line.open:nth-child(3) {
    transform: rotate(-45deg) translate(4px, -4px);
  }

  .mobile-menu {
    background-color: rgba(10, 10, 15, 0.95);
    animation: fadeIn 0.3s ease-out;
  }

  .mobile-nav-link {
    animation: slideIn 0.4s ease-out forwards;
    opacity: 0;
  }

  .mobile-nav-link:hover {
    color: #10b981;
  }

  .mobile-signup-btn {
    background-color: #10b981;
    animation: slideIn 0.4s ease-out forwards;
    opacity: 0;
  }

  .mobile-signup-btn:hover {
    background-color: #34d399;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
</style>
