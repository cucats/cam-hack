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
        <div class="logo-glow"></div>
      </div>
    </a>
    <div class="nav-wrapper">
      <nav class="desktop-nav">
        <a class="nav-link" href="/#about">About</a>
        <a class="nav-link" href="/#schedule">Schedule</a>
        <a class="nav-link" href="/#rules">Rules</a>
        <a class="nav-link" href="/#faq">FAQ</a>
        <a class="nav-cta" href="/signup">Sign up!</a>
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
    max-width: 1280px;
    margin: 0 auto;
    position: relative;
  }

  .header-inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 70px;
    padding: 0 1rem;
  }

  .logo-link {
    text-decoration: none;
    user-select: none;
  }

  .logo-wrapper {
    position: relative;
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .logo-image {
    height: 50px;
    transition: all 0.3s ease;
  }

  .logo-link:hover .logo-image {
    filter: drop-shadow(0 0 10px rgba(0, 255, 136, 0.5));
  }

  .logo-text {
    font-family: "Orbitron", monospace;
    font-size: 1.25rem;
    font-weight: 700;
    color: #00ff88;
    transition: all 0.3s ease;
  }

  .logo-link:hover .logo-text {
    text-shadow: 0 0 15px rgba(0, 255, 136, 0.5);
  }

  .logo-glow {
    position: absolute;
    inset: -10px;
    background: radial-gradient(
      circle at center,
      rgba(0, 255, 136, 0.1) 0%,
      transparent 70%
    );
    opacity: 0;
    transition: opacity 0.3s ease;
    pointer-events: none;
  }

  .logo-link:hover .logo-glow {
    opacity: 1;
  }

  .nav-wrapper {
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
    color: rgba(255, 255, 255, 0.8);
    text-decoration: none;
    padding: 0.5rem 0;
    transition: all 0.3s ease;
  }

  .nav-link::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 2px;
    background: linear-gradient(90deg, #00ff88, #00ffcc);
    transition: width 0.3s ease;
  }

  .nav-link:hover {
    color: #00ff88;
  }

  .nav-link:hover::after {
    width: 100%;
  }

  .nav-cta {
    padding: 0.75rem 1.5rem;
    font-weight: 700;
    color: #0a0f0d;
    text-decoration: none;
    background: linear-gradient(135deg, #00ff88 0%, #00ffcc 100%);
    border-radius: 12px;
    transition: all 0.3s ease;
    box-shadow: 0 0 20px rgba(0, 255, 136, 0.3);
  }

  .nav-cta:hover {
    transform: scale(1.05);
    box-shadow:
      0 0 30px rgba(0, 255, 136, 0.5),
      0 0 60px rgba(0, 255, 136, 0.3);
  }
</style>
