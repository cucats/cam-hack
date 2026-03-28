<script>
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

  function toggleMenu() {
    expanded = !expanded;
  }

  function closeMenu() {
    expanded = false;
  }
</script>

<header class="header" class:scrolled>
  <div class="header-container">
    <a href="/" class="logo-link" onclick={closeMenu}>
      <img
        class="logo-image"
        src="/cam-hack-logo-text.png"
        alt="Cam Hack Logo"
      />
      <span class="logo-text">Cam Hack 2025</span>
    </a>
    
    <nav class="desktop-nav">
      <a class="nav-link" href="/#about">
        <span class="nav-bracket">{"{"}</span>About<span class="nav-bracket">{"}"}</span>
      </a>
      <a class="nav-link" href="/#schedule">
        <span class="nav-bracket">{"{"}</span>Schedule<span class="nav-bracket">{"}"}</span>
      </a>
      <a class="nav-link" href="/#rules">
        <span class="nav-bracket">{"{"}</span>Rules<span class="nav-bracket">{"}"}</span>
      </a>
      <a class="nav-link" href="/#faq">
        <span class="nav-bracket">{"{"}</span>FAQ<span class="nav-bracket">{"}"}</span>
      </a>
      <a class="signup-button disabled" href="/signup">
        Signups closed
      </a>
    </nav>

    <button 
      class="mobile-menu-button"
      class:active={expanded}
      onclick={toggleMenu}
      aria-label="Toggle menu"
    >
      <span class="hamburger-line"></span>
      <span class="hamburger-line"></span>
      <span class="hamburger-line"></span>
    </button>
  </div>

  {#if expanded}
    <nav class="mobile-nav">
      <a class="mobile-nav-link" href="/#about" onclick={closeMenu}>
        <span class="nav-bracket">{">"}</span> About
      </a>
      <a class="mobile-nav-link" href="/#schedule" onclick={closeMenu}>
        <span class="nav-bracket">{">"}</span> Schedule
      </a>
      <a class="mobile-nav-link" href="/#rules" onclick={closeMenu}>
        <span class="nav-bracket">{">"}</span> Rules
      </a>
      <a class="mobile-nav-link" href="/#faq" onclick={closeMenu}>
        <span class="nav-bracket">{">"}</span> FAQ
      </a>
      <a class="mobile-signup-button disabled" href="/signup" onclick={closeMenu}>
        Signups closed
      </a>
    </nav>
  {/if}
</header>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Space+Mono:wght@400;700&display=swap');

  .header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;
    background: rgba(10, 10, 10, 0.8);
    backdrop-filter: blur(10px);
    border-bottom: 2px solid rgba(0, 255, 136, 0.3);
    transition: all 0.3s ease;
  }

  .header.scrolled {
    background: rgba(10, 10, 10, 0.95);
    border-bottom-color: #00ff88;
    box-shadow: 0 5px 30px rgba(0, 255, 136, 0.2);
  }

  .header-container {
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 2rem;
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .logo-link {
    display: flex;
    align-items: center;
    gap: 1rem;
    text-decoration: none;
    transition: all 0.3s ease;
  }

  .logo-link:hover {
    transform: scale(1.05);
  }

  .logo-image {
    height: 50px;
    width: 50px;
    filter: drop-shadow(0 0 10px rgba(0, 255, 136, 0.5));
  }

  .logo-text {
    font-family: 'Orbitron', sans-serif;
    font-size: 1.3rem;
    font-weight: 700;
    color: #00ff88;
    letter-spacing: 0.1rem;
    text-shadow: 0 0 10px rgba(0, 255, 136, 0.5);
  }

  .desktop-nav {
    display: flex;
    align-items: center;
    gap: 2rem;
  }

  .nav-link {
    font-family: 'Space Mono', monospace;
    font-size: 1rem;
    font-weight: 700;
    color: #e0e0e0;
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
    background: #00ff88;
    transition: width 0.3s ease;
  }

  .nav-link:hover {
    color: #00ff88;
    text-shadow: 0 0 10px rgba(0, 255, 136, 0.5);
  }

  .nav-link:hover::after {
    width: 100%;
  }

  .nav-bracket {
    color: #00ff88;
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  .nav-link:hover .nav-bracket {
    opacity: 1;
  }

  .signup-button {
    font-family: 'Orbitron', sans-serif;
    font-size: 0.9rem;
    font-weight: 700;
    padding: 0.7rem 1.5rem;
    border-radius: 10px;
    text-decoration: none;
    text-transform: uppercase;
    letter-spacing: 0.1rem;
    transition: all 0.3s ease;
    border: 2px solid #00ff88;
    background: linear-gradient(135deg, #00ff88 0%, #00cc6a 100%);
    color: #0a0a0a;
  }

  .signup-button:not(.disabled):hover {
    transform: translateY(-3px);
    box-shadow: 
      0 5px 20px rgba(0, 255, 136, 0.4),
      0 0 30px rgba(0, 255, 136, 0.3);
  }

  .signup-button.disabled {
    background: rgba(100, 100, 100, 0.3);
    color: #666;
    border-color: #444;
    cursor: not-allowed;
    pointer-events: none;
  }

  .mobile-menu-button {
    display: none;
    flex-direction: column;
    justify-content: space-between;
    width: 30px;
    height: 24px;
    background: transparent;
    border: none;
    cursor: pointer;
    padding: 0;
  }

  .hamburger-line {
    width: 100%;
    height: 3px;
    background: #00ff88;
    border-radius: 2px;
    transition: all 0.3s ease;
    box-shadow: 0 0 5px rgba(0, 255, 136, 0.5);
  }

  .mobile-menu-button.active .hamburger-line:nth-child(1) {
    transform: translateY(10.5px) rotate(45deg);
  }

  .mobile-menu-button.active .hamburger-line:nth-child(2) {
    opacity: 0;
  }

  .mobile-menu-button.active .hamburger-line:nth-child(3) {
    transform: translateY(-10.5px) rotate(-45deg);
  }

  .mobile-nav {
    display: none;
    flex-direction: column;
    gap: 1rem;
    padding: 2rem;
    background: rgba(10, 10, 10, 0.98);
    border-top: 1px solid rgba(0, 255, 136, 0.3);
    animation: slideDown 0.3s ease-out;
  }

  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .mobile-nav-link {
    font-family: 'Space Mono', monospace;
    font-size: 1.2rem;
    font-weight: 700;
    color: #e0e0e0;
    text-decoration: none;
    padding: 1rem;
    border: 2px solid rgba(0, 255, 136, 0.3);
    border-radius: 10px;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .mobile-nav-link:hover {
    color: #00ff88;
    background: rgba(0, 255, 136, 0.1);
    border-color: #00ff88;
  }

  .mobile-signup-button {
    font-family: 'Orbitron', sans-serif;
    font-size: 1rem;
    font-weight: 700;
    padding: 1rem 2rem;
    border-radius: 10px;
    text-decoration: none;
    text-transform: uppercase;
    letter-spacing: 0.1rem;
    text-align: center;
    border: 2px solid #00ff88;
    background: linear-gradient(135deg, #00ff88 0%, #00cc6a 100%);
    color: #0a0a0a;
    margin-top: 1rem;
  }

  .mobile-signup-button.disabled {
    background: rgba(100, 100, 100, 0.3);
    color: #666;
    border-color: #444;
    cursor: not-allowed;
    pointer-events: none;
  }

  @media (max-width: 1024px) {
    .desktop-nav {
      display: none;
    }

    .mobile-menu-button {
      display: flex;
    }

    .mobile-nav {
      display: flex;
    }
  }

  @media (max-width: 768px) {
    .header-container {
      padding: 0 1rem;
      height: 70px;
    }

    .logo-image {
      height: 40px;
      width: 40px;
    }

    .logo-text {
      font-size: 1rem;
    }

    .mobile-nav {
      padding: 1.5rem;
    }

    .mobile-nav-link {
      font-size: 1rem;
      padding: 0.8rem;
    }
  }
</style>
