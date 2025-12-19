<script>
  import Hamburger from "$lib/components/header/Hamburger.svelte";
  import MobileMenu from "$lib/components/header/MobileMenu.svelte";

  let expanded = $state(false);
</script>

<div class="header-container">
  <div class="header-inner">
    <a href="/" class="logo-link">
      <div class="logo-wrapper">
        <img
          class="logo-image"
          src="/cam-hack-logo-text.png"
          alt="Cam Hack Logo"
        />
        <span class="logo-text">Cam Hack 2025</span>
      </div>
    </a>
    <div class="nav-container">
      <nav class="desktop-nav">
        <a class="nav-link" href="/#about">About</a>
        <a class="nav-link" href="/#schedule">Schedule</a>
        <a class="nav-link" href="/#rules">Rules</a>
        <a class="nav-link" href="/#faq">FAQ</a>
        <a class="nav-button" href="/signup">Sign up!</a>
      </nav>
      <Hamburger bind:expanded />
    </div>
  </div>
  {#if expanded}
    <MobileMenu bind:expanded />
  {/if}
</div>

<style>
  .header-container {
    max-width: 1400px;
    margin: 0 auto;
  }

  .header-inner {
    display: flex;
    height: 60px;
    align-items: center;
    justify-content: space-between;
  }

  .logo-link {
    text-decoration: none;
    user-select: none;
  }

  .logo-wrapper {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  .logo-image {
    height: 50px;
    margin-left: 1rem;
    filter: drop-shadow(0 0 10px rgba(0, 255, 136, 0.3));
    transition: filter 0.3s ease;
  }

  .logo-link:hover .logo-image {
    filter: drop-shadow(0 0 20px rgba(0, 255, 136, 0.5));
  }

  .logo-text {
    font-family: var(--font-display);
    font-size: 1.25rem;
    font-weight: 700;
    color: var(--color-text-light);
    transition: color 0.3s ease;
  }

  .logo-link:hover .logo-text {
    color: var(--color-primary);
  }

  .nav-container {
    padding: 0 1rem;
  }

  .desktop-nav {
    display: none;
    align-items: center;
    gap: 2rem;
  }

  @media (min-width: 768px) {
    .desktop-nav {
      display: flex;
    }
  }

  .nav-link {
    position: relative;
    font-size: 1rem;
    font-weight: 600;
    color: var(--color-text-light);
    text-decoration: none;
    transition: color 0.3s ease;
  }

  .nav-link::after {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 0;
    width: 0;
    height: 2px;
    background: var(--color-primary);
    transition: width 0.3s ease;
  }

  .nav-link:hover {
    color: var(--color-primary);
  }

  .nav-link:hover::after {
    width: 100%;
  }

  .nav-button {
    padding: 0.5rem 1.25rem;
    font-size: 1rem;
    font-weight: 600;
    color: var(--color-dark);
    background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-dark) 100%);
    border-radius: 0.5rem;
    text-decoration: none;
    transition: all 0.3s ease;
  }

  .nav-button:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 20px rgba(0, 255, 136, 0.4);
  }
</style>
