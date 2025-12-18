<script>
  import { onMount } from "svelte";

  let scrolled = $state(false);
  let mobileMenuOpen = $state(false);

  onMount(() => {
    const handleScroll = () => {
      scrolled = window.scrollY > 50;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  });

  function toggleMobile() {
    mobileMenuOpen = !mobileMenuOpen;
  }

  function closeMobile() {
    mobileMenuOpen = false;
  }
</script>

<div class="header-container" class:scrolled>
  <div class="header-content">
    <a href="/" class="logo-link">
      <img
        src="/cam-hack-logo-text.png"
        alt="Cam Hack Logo"
        class="logo-image"
      />
      <span class="logo-text">Cam Hack 2025</span>
    </a>

    <nav class="desktop-nav">
      <a href="#about" class="nav-link">About</a>
      <a href="#schedule" class="nav-link">Schedule</a>
      <a href="#rules" class="nav-link">Rules</a>
      <a href="#faq" class="nav-link">FAQ</a>
      <a href="/signup" class="nav-cta">Sign up!</a>
    </nav>

    <button
      class="mobile-toggle"
      onclick={toggleMobile}
      aria-label="Toggle navigation menu"
    >
      <span class="hamburger-line" class:open={mobileMenuOpen}></span>
      <span class="hamburger-line" class:open={mobileMenuOpen}></span>
      <span class="hamburger-line" class:open={mobileMenuOpen}></span>
    </button>
  </div>

  {#if mobileMenuOpen}
    <nav class="mobile-nav">
      <a href="#about" class="mobile-link" onclick={closeMobile}>About</a>
      <a href="#schedule" class="mobile-link" onclick={closeMobile}>Schedule</a>
      <a href="#rules" class="mobile-link" onclick={closeMobile}>Rules</a>
      <a href="#faq" class="mobile-link" onclick={closeMobile}>FAQ</a>
      <a href="/signup" class="mobile-cta" onclick={closeMobile}>Sign up!</a>
    </nav>
  {/if}
</div>

<style>
  .header-container {
    transition: all 0.3s ease;
  }

  .header-container.scrolled {
    background: rgba(13, 17, 23, 0.95);
  }

  .header-content {
    max-width: 1400px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem 2rem;
  }

  .logo-link {
    display: flex;
    align-items: center;
    gap: 1rem;
    text-decoration: none;
    transition: all 0.3s ease;
  }

  .logo-link:hover {
    transform: scale(1.02);
  }

  .logo-image {
    height: 50px;
    width: auto;
    filter: drop-shadow(0 0 10px rgba(0, 255, 136, 0.3));
  }

  .logo-text {
    font-size: 1.3rem;
    font-weight: 700;
    color: #e6edf3;
    letter-spacing: 1px;
  }

  .desktop-nav {
    display: flex;
    align-items: center;
    gap: 2rem;
  }

  .nav-link {
    color: #8b949e;
    text-decoration: none;
    font-weight: 600;
    font-size: 1rem;
    position: relative;
    padding: 0.5rem 0;
    transition: color 0.3s ease;
  }

  .nav-link::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 2px;
    background: linear-gradient(90deg, #00ff88, #0a9254);
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
    background: linear-gradient(135deg, #00ff88, #0a9254);
    color: #0d1117;
    font-weight: 700;
    text-decoration: none;
    border-radius: 50px;
    transition: all 0.3s ease;
  }

  .nav-cta:hover {
    transform: scale(1.05);
    box-shadow:
      0 0 20px rgba(0, 255, 136, 0.5),
      0 0 40px rgba(0, 255, 136, 0.3);
  }

  .mobile-toggle {
    display: none;
    flex-direction: column;
    gap: 5px;
    background: transparent;
    border: none;
    cursor: pointer;
    padding: 0.5rem;
  }

  .hamburger-line {
    width: 25px;
    height: 2px;
    background: #00ff88;
    transition: all 0.3s ease;
    transform-origin: center;
  }

  .hamburger-line.open:nth-child(1) {
    transform: translateY(7px) rotate(45deg);
  }

  .hamburger-line.open:nth-child(2) {
    opacity: 0;
  }

  .hamburger-line.open:nth-child(3) {
    transform: translateY(-7px) rotate(-45deg);
  }

  .mobile-nav {
    display: none;
    flex-direction: column;
    padding: 1rem 2rem 2rem;
    gap: 1rem;
    animation: slideDown 0.3s ease;
  }

  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .mobile-link {
    color: #8b949e;
    text-decoration: none;
    font-weight: 600;
    font-size: 1.1rem;
    padding: 0.75rem;
    border-radius: 10px;
    transition: all 0.3s ease;
  }

  .mobile-link:hover {
    color: #00ff88;
    background: rgba(0, 255, 136, 0.1);
  }

  .mobile-cta {
    display: inline-block;
    padding: 1rem 2rem;
    background: linear-gradient(135deg, #00ff88, #0a9254);
    color: #0d1117;
    font-weight: 700;
    text-decoration: none;
    border-radius: 50px;
    text-align: center;
    margin-top: 0.5rem;
  }

  @media (max-width: 768px) {
    .desktop-nav {
      display: none;
    }

    .mobile-toggle {
      display: flex;
    }

    .mobile-nav {
      display: flex;
    }

    .logo-text {
      font-size: 1.1rem;
    }

    .logo-image {
      height: 40px;
    }

    .header-content {
      padding: 0.75rem 1rem;
    }
  }
</style>
