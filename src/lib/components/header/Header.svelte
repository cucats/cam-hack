<script>
  import Hamburger from "$lib/components/header/Hamburger.svelte";
  import MobileMenu from "$lib/components/header/MobileMenu.svelte";

  let expanded = $state(false);
</script>

<div class="mx-auto max-w-7xl">
  <div class="flex h-[80px] items-center justify-between">
    <a href="/" class="select-none header-logo">
      <div class="flex items-center">
        <img
          class="ml-4 h-[60px]"
          src="/cam-hack-logo-text.png"
          alt="Cam Hack Logo"
        />
        <span class="ml-4 text-xl font-bold logo-text">Cam Hack 2025</span>
      </div>
    </a>
    <div class="px-4">
      <nav
        class="flex items-center gap-6 text-lg font-semibold transition-colors max-md:hidden nav-links"
      >
        <a class="nav-link" href="/#about">About</a>
        <a class="nav-link" href="/#schedule">Schedule</a>
        <a class="nav-link" href="/discord" target="_blank">Discord</a>
        <a
          class="nav-signup"
          href="/signup">Sign up</a
        >
      </nav>
      <Hamburger bind:expanded />
    </div>
  </div>
  {#if expanded}
    <MobileMenu bind:expanded />
  {/if}
</div>

<style>
  .header-logo {
    transition: transform 0.3s ease;
  }

  .header-logo:hover {
    transform: scale(1.05);
  }

  .logo-text {
    color: #00ff88;
    font-family: 'Space Grotesk', sans-serif;
    text-shadow: 0 0 10px rgba(0, 255, 136, 0.3);
  }

  .nav-links {
    font-family: 'Space Grotesk', sans-serif;
  }

  .nav-link {
    color: #e8fff5;
    position: relative;
    transition: color 0.3s ease;
  }

  .nav-link::after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 0;
    height: 2px;
    background: #00ff88;
    transition: width 0.3s ease;
  }

  .nav-link:hover {
    color: #00ff88;
  }

  .nav-link:hover::after {
    width: 100%;
  }

  .nav-signup {
    background: linear-gradient(135deg, #00ff88, #00ffcc);
    color: #0a0e0d;
    padding: 0.5rem 1.5rem;
    border-radius: 8px;
    transition: all 0.3s ease;
    font-weight: 600;
  }

  .nav-signup:hover {
    transform: scale(1.05);
    box-shadow: 0 0 20px rgba(0, 255, 136, 0.5);
  }
</style>
