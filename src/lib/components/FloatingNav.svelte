<script>
  import { onMount } from 'svelte';

  let scrolled = $state(false);
  let mobileMenuOpen = $state(false);

  onMount(() => {
    const handleScroll = () => {
      scrolled = window.scrollY > 100;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  });

  function toggleMobileMenu() {
    mobileMenuOpen = !mobileMenuOpen;
  }

  function closeMobileMenu() {
    mobileMenuOpen = false;
  }
</script>

<nav class="floating-nav" class:scrolled>
  <div class="nav-container">
    <div class="nav-logo">
      <a href="/">
        <img src="/cam-hack-logo-text.png" alt="Cam Hack" />
        <span>Cam Hack 2025</span>
      </a>
    </div>

    <div class="nav-links desktop-nav">
      <a href="#about" class="nav-link">About</a>
      <a href="#schedule" class="nav-link">Schedule</a>
      <a href="#rules" class="nav-link">Rules</a>
      <a href="#faq" class="nav-link">FAQ</a>
      <a href="/signup" class="nav-cta">Sign Up</a>
    </div>

    <button class="mobile-menu-btn" onclick={toggleMobileMenu} aria-label="Toggle menu">
      <span class="hamburger" class:open={mobileMenuOpen}></span>
    </button>
  </div>
</nav>

{#if mobileMenuOpen}
  <div class="mobile-menu" onclick={closeMobileMenu} role="dialog" aria-modal="true">
    <div class="mobile-links">
      <a href="#about" class="mobile-link" onclick={closeMobileMenu}>About</a>
      <a href="#schedule" class="mobile-link" onclick={closeMobileMenu}>Schedule</a>
      <a href="#rules" class="mobile-link" onclick={closeMobileMenu}>Rules</a>
      <a href="#faq" class="mobile-link" onclick={closeMobileMenu}>FAQ</a>
      <a href="/signup" class="mobile-cta" onclick={closeMobileMenu}>Sign Up</a>
    </div>
  </div>
{/if}

<style>
  @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Space+Mono:wght@400;700&display=swap');

  .floating-nav {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;
    padding: 1.5rem 2rem;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    pointer-events: none;
  }

  .floating-nav.scrolled {
    background: rgba(10, 14, 39, 0.95);
    backdrop-filter: blur(20px);
    box-shadow: 0 4px 30px rgba(0, 255, 136, 0.1);
    border-bottom: 1px solid rgba(0, 255, 136, 0.2);
    padding: 1rem 2rem;
  }

  .nav-container {
    max-width: 1600px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    pointer-events: auto;
  }

  .nav-logo a {
    display: flex;
    align-items: center;
    gap: 1rem;
    text-decoration: none;
    transition: all 0.3s ease;
  }

  .nav-logo img {
    width: 50px;
    height: 50px;
    filter: drop-shadow(0 0 10px rgba(0, 255, 136, 0.5));
    transition: all 0.3s ease;
  }

  .nav-logo a:hover img {
    filter: drop-shadow(0 0 20px rgba(0, 255, 136, 0.8));
    transform: scale(1.05);
  }

  .nav-logo span {
    font-family: 'Orbitron', monospace;
    font-size: 1.2rem;
    font-weight: 700;
    color: #00ff88;
    text-shadow: 0 0 10px rgba(0, 255, 136, 0.5);
  }

  .nav-links {
    display: flex;
    align-items: center;
    gap: 2rem;
  }

  .desktop-nav {
    display: flex;
  }

  @media (max-width: 768px) {
    .desktop-nav {
      display: none;
    }
  }

  .nav-link {
    font-family: 'Space Mono', monospace;
    font-size: 1rem;
    color: rgba(255, 255, 255, 0.8);
    text-decoration: none;
    transition: all 0.3s ease;
    position: relative;
  }

  .nav-link::after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 0;
    height: 2px;
    background: linear-gradient(90deg, #00ff88, #00ccff);
    transition: width 0.3s ease;
  }

  .nav-link:hover {
    color: #00ff88;
  }

  .nav-link:hover::after {
    width: 100%;
  }

  .nav-cta {
    font-family: 'Orbitron', monospace;
    font-size: 1rem;
    font-weight: 700;
    padding: 0.75rem 1.5rem;
    background: linear-gradient(135deg, #00ff88, #00ccff);
    color: #0a0e27;
    text-decoration: none;
    border-radius: 25px;
    transition: all 0.3s ease;
    box-shadow: 0 0 20px rgba(0, 255, 136, 0.3);
  }

  .nav-cta:hover {
    box-shadow: 0 0 30px rgba(0, 255, 136, 0.6);
    transform: translateY(-2px);
  }

  .mobile-menu-btn {
    display: none;
    background: none;
    border: none;
    cursor: pointer;
    padding: 0.5rem;
  }

  @media (max-width: 768px) {
    .mobile-menu-btn {
      display: block;
    }
  }

  .hamburger {
    position: relative;
    display: block;
    width: 30px;
    height: 2px;
    background: #00ff88;
    transition: all 0.3s ease;
  }

  .hamburger::before,
  .hamburger::after {
    content: '';
    position: absolute;
    width: 30px;
    height: 2px;
    background: #00ff88;
    transition: all 0.3s ease;
  }

  .hamburger::before {
    top: -8px;
  }

  .hamburger::after {
    top: 8px;
  }

  .hamburger.open {
    background: transparent;
  }

  .hamburger.open::before {
    top: 0;
    transform: rotate(45deg);
  }

  .hamburger.open::after {
    top: 0;
    transform: rotate(-45deg);
  }

  .mobile-menu {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(10, 14, 39, 0.98);
    backdrop-filter: blur(20px);
    z-index: 999;
    display: flex;
    align-items: center;
    justify-content: center;
    animation: fadeIn 0.3s ease;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  .mobile-links {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    text-align: center;
    animation: slideUp 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  }

  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .mobile-link {
    font-family: 'Orbitron', monospace;
    font-size: 2rem;
    font-weight: 700;
    color: #00ff88;
    text-decoration: none;
    text-shadow: 0 0 20px rgba(0, 255, 136, 0.5);
    transition: all 0.3s ease;
  }

  .mobile-link:hover {
    color: #00ccff;
    text-shadow: 0 0 30px rgba(0, 204, 255, 0.8);
    transform: scale(1.1);
  }

  .mobile-cta {
    font-family: 'Orbitron', monospace;
    font-size: 1.5rem;
    font-weight: 700;
    padding: 1rem 2rem;
    background: linear-gradient(135deg, #00ff88, #00ccff);
    color: #0a0e27;
    text-decoration: none;
    border-radius: 25px;
    display: inline-block;
    margin-top: 1rem;
    box-shadow: 0 0 30px rgba(0, 255, 136, 0.5);
    transition: all 0.3s ease;
  }

  .mobile-cta:hover {
    box-shadow: 0 0 50px rgba(0, 255, 136, 0.8);
    transform: scale(1.05);
  }

  @media (max-width: 768px) {
    .floating-nav {
      padding: 1rem;
    }

    .floating-nav.scrolled {
      padding: 0.75rem 1rem;
    }

    .nav-logo img {
      width: 40px;
      height: 40px;
    }

    .nav-logo span {
      font-size: 1rem;
    }
  }
</style>
