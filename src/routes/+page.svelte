<script>
  import { onMount } from "svelte";
  import { browser } from "$app/environment";
  import ThreeBackground from "$lib/components/ThreeBackground.svelte";
  import { sponsors, organizers } from "$lib/components/sponsors-data.js";

  const eventDate = new Date("2025-11-01T00:00:00");
  let daysSince = $state(0);
  let scrollY = $state(0);
  let visibleSections = $state({});
  let mounted = $state(false);

  const faqItems = [
    {
      q: "What is a hackathon?",
      a: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      q: "What are the hackathon tracks?",
      a: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut enim ad minim veniam, quis nostrud exercitation ullamco.",
    },
    {
      q: "Can I participate remotely?",
      a: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis aute irure dolor in reprehenderit in voluptate velit.",
    },
    {
      q: "How much does it cost?",
      a: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Excepteur sint occaecat cupidatat non proident.",
    },
    {
      q: "Where is it?",
      a: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sunt in culpa qui officia deserunt mollit anim id est laborum.",
    },
    {
      q: "I don't have a team!",
      a: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nemo enim ipsam voluptatem quia voluptas sit aspernatur.",
    },
  ];

  let expandedFaq = $state(-1);

  function calculateDays() {
    const now = new Date();
    const diff = now.getTime() - eventDate.getTime();
    daysSince = Math.floor(diff / (1000 * 60 * 60 * 24));
  }

  function handleScroll() {
    scrollY = window.scrollY;
    observeSections();
  }

  function observeSections() {
    const sections = document.querySelectorAll("[data-section]");
    sections.forEach((section) => {
      const rect = section.getBoundingClientRect();
      const id = section.getAttribute("data-section");
      if (rect.top < window.innerHeight * 0.8) {
        visibleSections[id] = true;
      }
    });
  }

  onMount(() => {
    calculateDays();
    mounted = true;
    window.addEventListener("scroll", handleScroll);
    setTimeout(observeSections, 100);
    return () => window.removeEventListener("scroll", handleScroll);
  });
</script>

<svelte:head>
  <title>Cam Hack 2025</title>
  <link
    href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap"
    rel="stylesheet"
  />
</svelte:head>

{#if browser}
  <ThreeBackground />
{/if}

<div class="splash-page">
  <nav class="nav-bar" class:scrolled={scrollY > 50}>
    <div class="nav-content">
      <a href="/" class="nav-logo">
        <img src="/cam-hack-logo-text.png" alt="Cam Hack" />
        <span>Cam Hack 2025</span>
      </a>
      <div class="nav-links">
        <a href="#about">About</a>
        <a href="#schedule">Schedule</a>
        <a href="#rules">Rules</a>
        <a href="#faq">FAQ</a>
        <a href="/signup" class="nav-cta">Sign up!</a>
      </div>
    </div>
  </nav>

  <section class="hero" data-section="hero">
    <div class="hero-content" class:visible={mounted}>
      <div class="hero-badge">
        <span class="pulse"></span>
        <span>Cambridge University</span>
      </div>
      <h1 class="hero-title">
        <span class="title-line">Cam</span>
        <span class="title-line accent">Hack</span>
        <span class="title-line year">2025</span>
      </h1>
      <p class="hero-date">1st – 2nd November</p>
      <div class="countdown-container">
        <div class="countdown-label">Days Since Event</div>
        <div class="countdown-value">{daysSince}</div>
      </div>
      <p class="hero-tagline">What can you make in 2 days?</p>
      <div class="hero-actions">
        <a href="/discord" class="btn-primary">
          <span class="btn-glow"></span>
          Join Discord
        </a>
        <a href="#about" class="btn-secondary">Learn More</a>
      </div>
    </div>
    <div class="scroll-indicator">
      <div class="scroll-line"></div>
    </div>
  </section>

  <section class="featured" data-section="featured">
    <div class="section-container" class:visible={visibleSections.featured}>
      <div class="section-header">
        <span class="section-tag">Featured Project</span>
        <h2>Unintended Behaviour</h2>
      </div>
      <a
        href="https://cam-hack-2025.devpost.com"
        target="_blank"
        class="featured-card"
      >
        <div class="featured-image-wrapper">
          <img
            src="/unintended.png"
            alt="Unintended Behaviour"
            class="featured-image"
          />
          <div class="featured-overlay">
            <span class="view-project">View on Devpost →</span>
          </div>
        </div>
      </a>
    </div>
  </section>

  <section class="sponsors" data-section="sponsors">
    <div class="section-container" class:visible={visibleSections.sponsors}>
      <div class="section-header">
        <span class="section-tag">Our Partners</span>
        <h2>Sponsors</h2>
      </div>
      <div class="sponsors-grid">
        {#each sponsors as sponsor, i}
          <a
            href={sponsor.url}
            target="_blank"
            class="sponsor-card"
            style="animation-delay: {i * 100}ms"
          >
            <img src={sponsor.logo} alt={sponsor.name} />
          </a>
        {/each}
      </div>
      <div class="organizer-section">
        <h3>{organizers.runBy.title}</h3>
        <a href={organizers.runBy.url} target="_blank" class="organizer-logo">
          <img src={organizers.runBy.logo} alt={organizers.runBy.name} />
        </a>
      </div>
    </div>
  </section>

  <section class="about" id="about" data-section="about">
    <div class="section-container" class:visible={visibleSections.about}>
      <div class="section-header">
        <span class="section-tag">What is this?</span>
        <h2>About</h2>
      </div>
      <div class="about-grid">
        <div class="about-text">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis aute
            irure dolor in reprehenderit in voluptate velit esse cillum dolore
            eu fugiat nulla pariatur.
          </p>
        </div>
        <div class="about-stats">
          <div class="stat-card">
            <span class="stat-value">2</span>
            <span class="stat-label">Days</span>
          </div>
          <div class="stat-card">
            <span class="stat-value">£200</span>
            <span class="stat-label">Per Winner</span>
          </div>
          <div class="stat-card">
            <span class="stat-value">∞</span>
            <span class="stat-label">Possibilities</span>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="schedule" id="schedule" data-section="schedule">
    <div class="section-container" class:visible={visibleSections.schedule}>
      <div class="section-header">
        <span class="section-tag">Plan Your Weekend</span>
        <h2>Schedule</h2>
      </div>
      <div class="schedule-grid">
        <div class="schedule-day">
          <h3>Saturday 1st November</h3>
          <div class="timeline">
            <div class="timeline-item">
              <span class="time">09:30</span>
              <span class="event">Breakfast</span>
            </div>
            <div class="timeline-item">
              <span class="time">10:00</span>
              <span class="event">Opening Ceremony</span>
            </div>
            <div class="timeline-item highlight">
              <span class="time">10:30</span>
              <span class="event">Hacking begins!</span>
            </div>
            <div class="timeline-item">
              <span class="time">13:00</span>
              <span class="event">Lunch</span>
            </div>
            <div class="timeline-item">
              <span class="time">18:00</span>
              <span class="event">Dinner</span>
            </div>
          </div>
        </div>
        <div class="schedule-day">
          <h3>Sunday 2nd November</h3>
          <div class="timeline">
            <div class="timeline-item">
              <span class="time">09:30</span>
              <span class="event">Breakfast</span>
            </div>
            <div class="timeline-item">
              <span class="time">13:00</span>
              <span class="event">Lunch</span>
            </div>
            <div class="timeline-item highlight">
              <span class="time">16:30</span>
              <span class="event">Hacking ends!</span>
            </div>
            <div class="timeline-item">
              <span class="time">17:00</span>
              <span class="event">Dinner</span>
            </div>
            <div class="timeline-item">
              <span class="time">18:00</span>
              <span class="event">Judging ends</span>
            </div>
            <div class="timeline-item highlight">
              <span class="time">18:30</span>
              <span class="event">Closing ceremony</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="rules" id="rules" data-section="rules">
    <div class="section-container" class:visible={visibleSections.rules}>
      <div class="section-header">
        <span class="section-tag">Guidelines</span>
        <h2>Rules</h2>
      </div>
      <div class="rules-grid">
        <div class="rule-category">
          <h4>Entry</h4>
          <ul>
            <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
            <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
          </ul>
        </div>
        <div class="rule-category">
          <h4>House Rules</h4>
          <ul>
            <li>Lorem ipsum dolor sit amet. 🍕</li>
            <li>Lorem ipsum dolor sit amet.</li>
            <li>Lorem ipsum dolor sit amet. 😴</li>
            <li>Lorem ipsum dolor sit amet.</li>
          </ul>
        </div>
        <div class="rule-category">
          <h4>Submission</h4>
          <ul>
            <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
            <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
            <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
          </ul>
        </div>
      </div>
    </div>
  </section>

  <section class="faq" id="faq" data-section="faq">
    <div class="section-container" class:visible={visibleSections.faq}>
      <div class="section-header">
        <span class="section-tag">Questions?</span>
        <h2>FAQ</h2>
      </div>
      <div class="faq-list">
        {#each faqItems as item, i}
          <button
            class="faq-item"
            class:expanded={expandedFaq === i}
            onclick={() => (expandedFaq = expandedFaq === i ? -1 : i)}
          >
            <div class="faq-question">
              <span>{item.q}</span>
              <span class="faq-icon">{expandedFaq === i ? "−" : "+"}</span>
            </div>
            {#if expandedFaq === i}
              <div class="faq-answer">{item.a}</div>
            {/if}
          </button>
        {/each}
      </div>
    </div>
  </section>

  <section class="organisers" data-section="organisers">
    <div class="section-container" class:visible={visibleSections.organisers}>
      <div class="section-header">
        <span class="section-tag">The Team</span>
        <h2>Organising Committee</h2>
      </div>
      <div class="organisers-grid">
        <div class="organiser-card">
          <div class="organiser-image">
            <img src="/james.png" alt="James Leung" />
          </div>
          <p>James Leung</p>
        </div>
        <div class="organiser-card">
          <div class="organiser-image">
            <img src="/uliana.jpg" alt="Uliana Ronska" />
          </div>
          <p>Uliana Ronska</p>
        </div>
        <div class="organiser-card">
          <div class="organiser-image">
            <img src="/athena.jpg" alt="Athena Eng" />
          </div>
          <p>Athena Eng</p>
        </div>
        <div class="organiser-card">
          <div class="organiser-image">
            <img src="/oliver.png" alt="Oliver Greenwood" />
          </div>
          <p>Oliver Greenwood</p>
        </div>
        <div class="organiser-card">
          <div class="organiser-image">
            <img src="/jadon.png" alt="Jadon Mensah" />
          </div>
          <p>Jadon Mensah</p>
        </div>
      </div>
    </div>
  </section>

  <section class="page-footer">
    <div class="section-container">
      <div class="footer-content">
        <img src="/cam-hack-logo-text.png" alt="Cam Hack" class="footer-logo" />
        <p>Cam Hack 2025</p>
        <div class="footer-links">
          <a href="mailto:camhack@cucats.org">Contact</a>
          <span>•</span>
          <a href="/code-of-conduct">Code of Conduct</a>
        </div>
        <p class="footer-credit">Art by Gwen Sellers</p>
      </div>
    </div>
  </section>
</div>

<style>
  :global(body) {
    background: #0a0a0f;
    color: #e5e7eb;
    font-family: "Space Grotesk", "Ubuntu Mono", monospace;
    overflow-x: hidden;
  }

  .splash-page {
    position: relative;
    z-index: 1;
  }

  .nav-bar {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 100;
    padding: 1rem 2rem;
    transition: all 0.3s ease;
  }

  .nav-bar.scrolled {
    background: rgba(10, 10, 15, 0.9);
    backdrop-filter: blur(20px);
    border-bottom: 1px solid rgba(16, 185, 129, 0.2);
  }

  .nav-content {
    max-width: 1400px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .nav-logo {
    display: flex;
    align-items: center;
    gap: 1rem;
    text-decoration: none;
    color: #fff;
    font-weight: 600;
    font-size: 1.2rem;
  }

  .nav-logo img {
    height: 50px;
    filter: drop-shadow(0 0 10px rgba(16, 185, 129, 0.3));
  }

  .nav-links {
    display: flex;
    align-items: center;
    gap: 2rem;
  }

  .nav-links a {
    color: #9ca3af;
    text-decoration: none;
    font-weight: 500;
    transition: all 0.3s ease;
    position: relative;
  }

  .nav-links a:hover {
    color: #10b981;
  }

  .nav-links a::after {
    content: "";
    position: absolute;
    bottom: -4px;
    left: 0;
    width: 0;
    height: 2px;
    background: linear-gradient(90deg, #10b981, #14b8a6);
    transition: width 0.3s ease;
  }

  .nav-links a:hover::after {
    width: 100%;
  }

  .nav-cta {
    background: linear-gradient(135deg, #10b981, #14b8a6);
    padding: 0.75rem 1.5rem;
    border-radius: 50px;
    color: #0a0a0f !important;
    font-weight: 600;
  }

  .nav-cta:hover {
    transform: scale(1.05);
    box-shadow: 0 0 30px rgba(16, 185, 129, 0.4);
  }

  .nav-cta::after {
    display: none;
  }

  .hero {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    padding: 2rem;
    position: relative;
  }

  .hero-content {
    opacity: 0;
    transform: translateY(30px);
    transition: all 1s ease;
  }

  .hero-content.visible {
    opacity: 1;
    transform: translateY(0);
  }

  .hero-badge {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    background: rgba(16, 185, 129, 0.1);
    border: 1px solid rgba(16, 185, 129, 0.3);
    padding: 0.5rem 1rem;
    border-radius: 50px;
    font-size: 0.9rem;
    color: #10b981;
    margin-bottom: 2rem;
  }

  .pulse {
    width: 8px;
    height: 8px;
    background: #10b981;
    border-radius: 50%;
    animation: pulse 2s infinite;
  }

  @keyframes pulse {
    0%,
    100% {
      opacity: 1;
      transform: scale(1);
    }
    50% {
      opacity: 0.5;
      transform: scale(1.5);
    }
  }

  .hero-title {
    font-size: clamp(4rem, 15vw, 12rem);
    font-weight: 700;
    line-height: 0.9;
    margin-bottom: 1rem;
    text-transform: uppercase;
    letter-spacing: -0.02em;
  }

  .title-line {
    display: block;
    animation: slideIn 0.8s ease forwards;
    opacity: 0;
  }

  .title-line:nth-child(1) {
    animation-delay: 0.2s;
  }
  .title-line:nth-child(2) {
    animation-delay: 0.4s;
  }
  .title-line:nth-child(3) {
    animation-delay: 0.6s;
  }

  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateX(-50px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  .title-line.accent {
    background: linear-gradient(135deg, #10b981 0%, #14b8a6 50%, #a78bfa 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .title-line.year {
    font-size: 0.4em;
    color: #6b7280;
    letter-spacing: 0.2em;
  }

  .hero-date {
    font-size: 1.5rem;
    color: #9ca3af;
    margin-bottom: 2rem;
    animation: fadeIn 1s ease 0.8s forwards;
    opacity: 0;
  }

  @keyframes fadeIn {
    to {
      opacity: 1;
    }
  }

  .countdown-container {
    margin: 2rem 0;
    animation: fadeIn 1s ease 1s forwards;
    opacity: 0;
  }

  .countdown-label {
    font-size: 0.9rem;
    color: #6b7280;
    text-transform: uppercase;
    letter-spacing: 0.2em;
    margin-bottom: 0.5rem;
  }

  .countdown-value {
    font-size: 5rem;
    font-weight: 700;
    background: linear-gradient(135deg, #10b981, #a78bfa);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-shadow: 0 0 60px rgba(16, 185, 129, 0.3);
  }

  .hero-tagline {
    font-size: 1.25rem;
    color: #9ca3af;
    margin-bottom: 2rem;
    animation: fadeIn 1s ease 1.2s forwards;
    opacity: 0;
  }

  .hero-actions {
    display: flex;
    gap: 1rem;
    justify-content: center;
    flex-wrap: wrap;
    animation: fadeIn 1s ease 1.4s forwards;
    opacity: 0;
  }

  .btn-primary {
    position: relative;
    background: linear-gradient(135deg, #10b981, #14b8a6);
    color: #0a0a0f;
    padding: 1rem 2.5rem;
    border-radius: 50px;
    font-weight: 600;
    font-size: 1.1rem;
    text-decoration: none;
    overflow: hidden;
    transition: all 0.3s ease;
  }

  .btn-primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 40px rgba(16, 185, 129, 0.4);
  }

  .btn-glow {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.3),
      transparent
    );
    transform: translateX(-100%);
    animation: shimmer 3s infinite;
  }

  @keyframes shimmer {
    100% {
      transform: translateX(100%);
    }
  }

  .btn-secondary {
    background: transparent;
    color: #e5e7eb;
    padding: 1rem 2.5rem;
    border-radius: 50px;
    font-weight: 600;
    font-size: 1.1rem;
    text-decoration: none;
    border: 1px solid rgba(255, 255, 255, 0.2);
    transition: all 0.3s ease;
  }

  .btn-secondary:hover {
    border-color: #10b981;
    background: rgba(16, 185, 129, 0.1);
  }

  .scroll-indicator {
    position: absolute;
    bottom: 2rem;
    left: 50%;
    transform: translateX(-50%);
  }

  .scroll-line {
    width: 2px;
    height: 60px;
    background: linear-gradient(to bottom, #10b981, transparent);
    animation: scrollBounce 2s infinite;
  }

  @keyframes scrollBounce {
    0%,
    100% {
      transform: translateY(0);
      opacity: 1;
    }
    50% {
      transform: translateY(20px);
      opacity: 0.5;
    }
  }

  section {
    padding: 6rem 2rem;
    position: relative;
  }

  .section-container {
    max-width: 1200px;
    margin: 0 auto;
    opacity: 0;
    transform: translateY(50px);
    transition: all 0.8s ease;
  }

  .section-container.visible {
    opacity: 1;
    transform: translateY(0);
  }

  .section-header {
    text-align: center;
    margin-bottom: 4rem;
  }

  .section-tag {
    display: inline-block;
    background: rgba(16, 185, 129, 0.1);
    border: 1px solid rgba(16, 185, 129, 0.3);
    padding: 0.5rem 1rem;
    border-radius: 50px;
    font-size: 0.85rem;
    color: #10b981;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    margin-bottom: 1rem;
  }

  .section-header h2 {
    font-size: clamp(2.5rem, 5vw, 4rem);
    font-weight: 700;
    background: linear-gradient(135deg, #fff 0%, #9ca3af 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .featured {
    background: radial-gradient(
      ellipse at center,
      rgba(16, 185, 129, 0.05) 0%,
      transparent 70%
    );
  }

  .featured-card {
    display: block;
    border-radius: 24px;
    overflow: hidden;
    position: relative;
    transition: all 0.5s ease;
    border: 1px solid rgba(16, 185, 129, 0.2);
  }

  .featured-card:hover {
    transform: scale(1.02);
    border-color: #10b981;
    box-shadow: 0 20px 60px rgba(16, 185, 129, 0.2);
  }

  .featured-image-wrapper {
    position: relative;
    overflow: hidden;
  }

  .featured-image {
    width: 100%;
    display: block;
    transition: transform 0.5s ease;
  }

  .featured-card:hover .featured-image {
    transform: scale(1.05);
  }

  .featured-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      to top,
      rgba(10, 10, 15, 0.9) 0%,
      transparent 50%
    );
    display: flex;
    align-items: flex-end;
    justify-content: center;
    padding: 2rem;
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  .featured-card:hover .featured-overlay {
    opacity: 1;
  }

  .view-project {
    color: #10b981;
    font-weight: 600;
    font-size: 1.2rem;
  }

  .sponsors-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 2rem;
    margin-bottom: 4rem;
  }

  .sponsor-card {
    background: rgba(255, 255, 255, 0.02);
    border: 1px solid rgba(255, 255, 255, 0.05);
    border-radius: 16px;
    padding: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
    animation: fadeInUp 0.5s ease forwards;
    opacity: 0;
  }

  @keyframes fadeInUp {
    to {
      opacity: 1;
      transform: translateY(0);
    }
    from {
      opacity: 0;
      transform: translateY(20px);
    }
  }

  .sponsor-card:hover {
    background: rgba(16, 185, 129, 0.05);
    border-color: rgba(16, 185, 129, 0.3);
    transform: translateY(-5px);
  }

  .sponsor-card img {
    max-width: 150px;
    max-height: 60px;
    object-fit: contain;
    filter: grayscale(100%) brightness(2);
    transition: filter 0.3s ease;
  }

  .sponsor-card:hover img {
    filter: grayscale(0%) brightness(1);
  }

  .organizer-section {
    text-align: center;
    padding-top: 2rem;
    border-top: 1px solid rgba(255, 255, 255, 0.05);
  }

  .organizer-section h3 {
    color: #9ca3af;
    margin-bottom: 1.5rem;
    font-size: 1.2rem;
  }

  .organizer-logo img {
    max-width: 200px;
    filter: brightness(1.2);
    transition: transform 0.3s ease;
  }

  .organizer-logo:hover img {
    transform: scale(1.05);
  }

  .about-grid {
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 4rem;
    align-items: start;
  }

  .about-text p {
    color: #9ca3af;
    font-size: 1.1rem;
    line-height: 1.8;
    margin-bottom: 1.5rem;
  }

  .about-stats {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .stat-card {
    background: rgba(16, 185, 129, 0.05);
    border: 1px solid rgba(16, 185, 129, 0.2);
    border-radius: 16px;
    padding: 1.5rem;
    text-align: center;
    transition: all 0.3s ease;
  }

  .stat-card:hover {
    transform: translateX(10px);
    border-color: #10b981;
  }

  .stat-value {
    display: block;
    font-size: 2.5rem;
    font-weight: 700;
    color: #10b981;
  }

  .stat-label {
    color: #6b7280;
    font-size: 0.9rem;
    text-transform: uppercase;
    letter-spacing: 0.1em;
  }

  .schedule-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 3rem;
  }

  .schedule-day h3 {
    color: #10b981;
    font-size: 1.5rem;
    margin-bottom: 2rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid rgba(16, 185, 129, 0.2);
  }

  .timeline {
    position: relative;
    padding-left: 2rem;
  }

  .timeline::before {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 2px;
    background: linear-gradient(to bottom, #10b981, rgba(16, 185, 129, 0.1));
  }

  .timeline-item {
    position: relative;
    padding: 1rem 0;
    display: flex;
    gap: 1rem;
    align-items: center;
  }

  .timeline-item::before {
    content: "";
    position: absolute;
    left: -2rem;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 12px;
    height: 12px;
    background: #0a0a0f;
    border: 2px solid #10b981;
    border-radius: 50%;
    transition: all 0.3s ease;
  }

  .timeline-item:hover::before {
    background: #10b981;
    box-shadow: 0 0 20px rgba(16, 185, 129, 0.5);
  }

  .timeline-item.highlight::before {
    background: #10b981;
  }

  .time {
    font-weight: 600;
    color: #10b981;
    min-width: 60px;
  }

  .event {
    color: #e5e7eb;
  }

  .timeline-item.highlight .event {
    font-weight: 600;
  }

  .rules-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
  }

  .rule-category {
    background: rgba(255, 255, 255, 0.02);
    border: 1px solid rgba(255, 255, 255, 0.05);
    border-radius: 16px;
    padding: 2rem;
    transition: all 0.3s ease;
  }

  .rule-category:hover {
    border-color: rgba(16, 185, 129, 0.3);
    background: rgba(16, 185, 129, 0.02);
  }

  .rule-category h4 {
    color: #10b981;
    font-size: 1.3rem;
    margin-bottom: 1rem;
  }

  .rule-category ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .rule-category li {
    color: #9ca3af;
    padding: 0.75rem 0;
    padding-left: 1.5rem;
    position: relative;
    border-bottom: 1px solid rgba(255, 255, 255, 0.03);
  }

  .rule-category li:last-child {
    border-bottom: none;
  }

  .rule-category li::before {
    content: "→";
    position: absolute;
    left: 0;
    color: #10b981;
  }

  .faq-list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    max-width: 800px;
    margin: 0 auto;
  }

  .faq-item {
    background: rgba(255, 255, 255, 0.02);
    border: 1px solid rgba(255, 255, 255, 0.05);
    border-radius: 12px;
    padding: 1.5rem;
    text-align: left;
    cursor: pointer;
    transition: all 0.3s ease;
    width: 100%;
    color: inherit;
    font-family: inherit;
    font-size: inherit;
  }

  .faq-item:hover {
    border-color: rgba(16, 185, 129, 0.3);
    background: rgba(16, 185, 129, 0.02);
  }

  .faq-item.expanded {
    border-color: #10b981;
  }

  .faq-question {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-weight: 600;
    color: #e5e7eb;
    font-size: 1.1rem;
  }

  .faq-icon {
    color: #10b981;
    font-size: 1.5rem;
    font-weight: 300;
  }

  .faq-answer {
    margin-top: 1rem;
    padding-top: 1rem;
    border-top: 1px solid rgba(255, 255, 255, 0.05);
    color: #9ca3af;
    line-height: 1.7;
    animation: expandIn 0.3s ease;
  }

  @keyframes expandIn {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .organisers-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: 2rem;
    justify-items: center;
  }

  .organiser-card {
    text-align: center;
    transition: all 0.3s ease;
  }

  .organiser-card:hover {
    transform: translateY(-10px);
  }

  .organiser-image {
    width: 150px;
    height: 150px;
    border-radius: 50%;
    overflow: hidden;
    margin: 0 auto 1rem;
    border: 3px solid transparent;
    background:
      linear-gradient(#0a0a0f, #0a0a0f) padding-box,
      linear-gradient(135deg, #10b981, #a78bfa) border-box;
    transition: all 0.3s ease;
  }

  .organiser-card:hover .organiser-image {
    box-shadow: 0 10px 40px rgba(16, 185, 129, 0.3);
  }

  .organiser-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }

  .organiser-card:hover .organiser-image img {
    transform: scale(1.1);
  }

  .organiser-card p {
    color: #e5e7eb;
    font-weight: 500;
    margin: 0;
  }

  .page-footer {
    background: rgba(0, 0, 0, 0.3);
    border-top: 1px solid rgba(16, 185, 129, 0.1);
    padding: 4rem 2rem;
    text-align: center;
  }

  .footer-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }

  .footer-logo {
    height: 80px;
    filter: drop-shadow(0 0 20px rgba(16, 185, 129, 0.2));
  }

  .footer-content > p {
    color: #e5e7eb;
    font-size: 1.2rem;
    font-weight: 600;
    margin: 0;
  }

  .footer-links {
    display: flex;
    gap: 1rem;
    color: #6b7280;
  }

  .footer-links a {
    color: #9ca3af;
    text-decoration: none;
    transition: color 0.3s ease;
  }

  .footer-links a:hover {
    color: #10b981;
  }

  .footer-credit {
    color: #6b7280;
    font-size: 0.9rem;
    margin-top: 1rem;
  }

  @media (max-width: 768px) {
    .nav-links {
      display: none;
    }

    .hero-title {
      font-size: clamp(3rem, 12vw, 6rem);
    }

    .about-grid {
      grid-template-columns: 1fr;
    }

    .about-stats {
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: center;
    }

    .stat-card {
      flex: 1;
      min-width: 120px;
    }

    .schedule-grid {
      grid-template-columns: 1fr;
    }

    .rules-grid {
      grid-template-columns: 1fr;
    }

    .countdown-value {
      font-size: 4rem;
    }
  }
</style>
