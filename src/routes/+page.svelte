<script>
  import { onMount } from "svelte";
  import ThreeScene from "$lib/components/ThreeScene.svelte";

  let daysSince = 0;
  let scrollY = 0;
  let heroVisible = true;
  let aboutSection, featuredSection, scheduleSection, sponsorsSection;

  onMount(() => {
    const eventDate = new Date("2025-11-01T00:00:00");
    const now = new Date();
    const diffTime = now - eventDate;
    daysSince = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    const handleScroll = () => {
      scrollY = window.scrollY;
      heroVisible = window.scrollY < window.innerHeight * 0.5;

      const sections = [aboutSection, featuredSection, scheduleSection, sponsorsSection];
      sections.forEach((section) => {
        if (section) {
          const rect = section.getBoundingClientRect();
          const isVisible = rect.top < window.innerHeight * 0.8 && rect.bottom > 0;
          if (isVisible) {
            section.style.opacity = "1";
            section.style.transform = "translateY(0)";
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  });
</script>

<svelte:head>
  <title>Cam Hack 2025</title>
</svelte:head>

<ThreeScene />

<div class="splash-container">
  <section class="hero-section">
    <div class="hero-content" class:fade-out={!heroVisible}>
      <div class="logo-container">
        <img
          src="/cam-hack-logo-text.png"
          alt="Cam Hack Logo"
          class="logo"
        />
      </div>
      <h1 class="hero-title">Cam Hack 2025</h1>
      <h2 class="hero-subtitle">1st – 2nd November</h2>
      <div class="countdown-container">
        <div class="countdown-label">Days since the event</div>
        <div class="countdown-number">{daysSince}</div>
      </div>
      <p class="hero-tagline">What can you make in 2 days?</p>
      <div class="hero-buttons">
        <a
          target="_blank"
          href="/discord"
          class="btn btn-primary"
        >
          Join the Discord!
        </a>
        <a
          target="_blank"
          href="/signup"
          class="btn btn-secondary"
        >
          Signups closed
        </a>
      </div>
    </div>
  </section>

  <section bind:this={aboutSection} class="about-section scroll-section">
    <div class="content-wrapper">
      <h2 class="section-title">About</h2>
      <p class="section-text">
        Cam Hack is a 2 day hackathon for the innovative minds at the University of
        Cambridge. Over an action-packed weekend, students come together to design
        and build technology projects from the ground up. We welcome participants
        ranging from curious beginners to seasoned coders. Expect plenty of free
        stash, food, and mini-events throughout this hackathon.
      </p>
      <p class="section-text">
        For the winning team, each person will receive £200 and can choose from a
        range of prizes including: smartwatches, Steam vouchers, Amazon vouchers, or
        Sony XM4 headphones.
      </p>
    </div>
  </section>

  <section bind:this={featuredSection} class="featured-section scroll-section">
    <div class="content-wrapper">
      <h2 class="section-title">Featured Projects</h2>
      <div class="projects-grid">
        <div class="project-card">
          <div class="project-icon">🚀</div>
          <h3 class="project-title">Lorem Ipsum Generator</h3>
          <p class="project-description">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>
        <div class="project-card">
          <div class="project-icon">🎨</div>
          <h3 class="project-title">Dolor Sit Amet</h3>
          <p class="project-description">
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
        </div>
        <div class="project-card">
          <div class="project-icon">⚡</div>
          <h3 class="project-title">Consectetur Adipiscing</h3>
          <p class="project-description">
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
          </p>
        </div>
        <div class="project-card">
          <div class="project-icon">🌟</div>
          <h3 class="project-title">Sed Do Eiusmod</h3>
          <p class="project-description">
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </div>
        <div class="project-card">
          <div class="project-icon">💡</div>
          <h3 class="project-title">Tempor Incididunt</h3>
          <p class="project-description">
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.
          </p>
        </div>
        <div class="project-card">
          <div class="project-icon">🎯</div>
          <h3 class="project-title">Ut Labore Et</h3>
          <p class="project-description">
            Totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt.
          </p>
        </div>
      </div>
    </div>
  </section>

  <section bind:this={scheduleSection} class="schedule-section scroll-section">
    <div class="content-wrapper">
      <h2 class="section-title">Schedule</h2>
      <div class="schedule-grid">
        <div class="schedule-day">
          <h3 class="day-title">Saturday 1st November</h3>
          <ul class="schedule-list">
            <li><strong>09:30</strong> &bull; <em>Breakfast</em></li>
            <li><strong>10:00</strong> &bull; Opening Ceremony</li>
            <li><strong>10:30</strong> &bull; Hacking begins!</li>
            <li><strong>13:00</strong> &bull; <em>Lunch</em></li>
            <li><strong>18:00</strong> &bull; <em>Dinner</em></li>
          </ul>
        </div>
        <div class="schedule-day">
          <h3 class="day-title">Sunday 2nd November</h3>
          <ul class="schedule-list">
            <li><strong>09:30</strong> &bull; <em>Breakfast</em></li>
            <li><strong>13:00</strong> &bull; <em>Lunch</em></li>
            <li><strong>16:30</strong> &bull; Hacking ends!</li>
            <li><strong>17:00</strong> &bull; <em>Dinner</em></li>
            <li><strong>18:00</strong> &bull; Judging ends</li>
            <li><strong>18:30</strong> &bull; Closing ceremony</li>
          </ul>
        </div>
      </div>
    </div>
  </section>

  <section bind:this={sponsorsSection} class="sponsors-section scroll-section">
    <div class="content-wrapper">
      <h2 class="section-title">Sponsored by</h2>
      <div class="sponsors-grid">
        <a target="_blank" href="https://www.anthropic.com" class="sponsor-logo">
          <img src="/anthropic-logo.png" alt="Anthropic" />
        </a>
        <a target="_blank" href="https://www.joinef.com" class="sponsor-logo">
          <img src="/entrepreneur-first-logo.png" alt="Entrepreneur First" />
        </a>
        <a target="_blank" href="https://janestreet.com" class="sponsor-logo">
          <img src="/jane-street-logo.png" alt="Jane Street" />
        </a>
        <a target="_blank" href="https://founders.cam.ac.uk" class="sponsor-logo">
          <img src="/founders-logo.png" alt="Founders" />
        </a>
        <a target="_blank" href="https://www.qube-rt.com" class="sponsor-logo">
          <img src="/qube-rt-logo.png" alt="Qube RT" />
        </a>
        <a target="_blank" href="https://sierra.ai" class="sponsor-logo">
          <img src="/sierra-logo.png" alt="Sierra" />
        </a>
        <a target="_blank" href="https://tpp-uk.com" class="sponsor-logo">
          <img src="/tpp-logo.png" alt="TPP UK" />
        </a>
      </div>
      <div class="organizer-section">
        <h3 class="organizer-title">Run by</h3>
        <a target="_blank" href="https://cucats.org" class="organizer-logo">
          <img src="/cucats-logo-gradient-full.png" alt="CUCATS" />
        </a>
      </div>
    </div>
  </section>
</div>

<style>
  .splash-container {
    position: relative;
    z-index: 1;
  }

  .hero-section::before {
    content: "";
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(134, 226, 147, 0.1) 0%, transparent 70%);
    animation: rotate-gradient 20s linear infinite;
    pointer-events: none;
  }

  @keyframes rotate-gradient {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  .hero-section {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    padding: 2rem;
    overflow: hidden;
  }

  .hero-content {
    text-align: center;
    z-index: 10;
    transition: opacity 0.3s ease;
  }

  .hero-content.fade-out {
    opacity: 0.3;
  }

  .logo-container {
    margin-bottom: 2rem;
    animation: float 6s ease-in-out infinite;
  }

  @keyframes float {
    0%, 100% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(-20px);
    }
  }

  .logo {
    height: 200px;
    width: auto;
    filter: drop-shadow(0 10px 30px rgba(134, 226, 147, 0.3));
    animation: pulse 3s ease-in-out infinite;
  }

  @keyframes pulse {
    0%, 100% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.05);
    }
  }

  .hero-title {
    font-size: 5rem;
    font-weight: bold;
    background: linear-gradient(120deg, #86e293 0%, #86e6c6 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin-bottom: 1rem;
    animation: gradient-shift 5s ease infinite;
    text-shadow: 0 0 30px rgba(134, 226, 147, 0.5);
  }

  @keyframes gradient-shift {
    0%, 100% {
      filter: hue-rotate(0deg);
    }
    50% {
      filter: hue-rotate(10deg);
    }
  }

  .hero-subtitle {
    font-size: 2rem;
    color: #2d8659;
    margin-bottom: 3rem;
    font-weight: 600;
  }

  .countdown-container {
    margin: 3rem 0;
    padding: 2rem;
    background: rgba(134, 226, 147, 0.1);
    backdrop-filter: blur(10px);
    border-radius: 20px;
    border: 2px solid rgba(134, 226, 147, 0.3);
    animation: glow 2s ease-in-out infinite alternate;
  }

  @keyframes glow {
    from {
      box-shadow: 0 0 20px rgba(134, 226, 147, 0.3);
    }
    to {
      box-shadow: 0 0 40px rgba(134, 226, 147, 0.6);
    }
  }

  .countdown-label {
    font-size: 1rem;
    color: #2d8659;
    margin-bottom: 0.5rem;
    text-transform: uppercase;
    letter-spacing: 2px;
  }

  .countdown-number {
    font-size: 4rem;
    font-weight: bold;
    background: linear-gradient(120deg, #86e293 0%, #86e6c6 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: number-pulse 2s ease-in-out infinite;
  }

  @keyframes number-pulse {
    0%, 100% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.1);
    }
  }

  .hero-tagline {
    font-size: 1.5rem;
    color: #1a5d3a;
    margin: 2rem 0;
  }

  .hero-buttons {
    display: flex;
    gap: 1rem;
    justify-content: center;
    flex-wrap: wrap;
    margin-top: 2rem;
  }

  .btn {
    padding: 1rem 2rem;
    border-radius: 12px;
    font-size: 1.1rem;
    font-weight: 600;
    text-decoration: none;
    transition: all 0.3s ease;
    cursor: pointer;
    border: none;
  }

  .btn-primary {
    background: linear-gradient(120deg, #86e293 0%, #86e6c6 100%);
    color: #1a5d3a;
    box-shadow: 0 4px 15px rgba(134, 226, 147, 0.4);
  }

  .btn-primary:hover {
    transform: translateY(-3px) scale(1.05);
    box-shadow: 0 6px 25px rgba(134, 226, 147, 0.6);
  }

  .btn-secondary {
    background: rgba(107, 114, 128, 0.3);
    color: #4b5563;
    cursor: not-allowed;
  }

  section {
    padding: 6rem 2rem;
    position: relative;
  }

  .content-wrapper {
    max-width: 1200px;
    margin: 0 auto;
  }

  .section-title {
    font-size: 3.5rem;
    font-weight: bold;
    text-align: center;
    margin-bottom: 3rem;
    background: linear-gradient(120deg, #86e293 0%, #86e6c6 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .section-text {
    font-size: 1.2rem;
    line-height: 1.8;
    color: #1f2937;
    margin-bottom: 1.5rem;
    text-align: center;
  }

  .scroll-section {
    opacity: 0;
    transform: translateY(50px);
    transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }

  .about-section {
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
  }

  .featured-section {
    background: linear-gradient(180deg, rgba(134, 226, 147, 0.05) 0%, rgba(134, 230, 198, 0.05) 100%);
  }

  .projects-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
    margin-top: 3rem;
  }

  .project-card {
    background: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(10px);
    padding: 2rem;
    border-radius: 20px;
    border: 2px solid rgba(134, 226, 147, 0.2);
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    cursor: pointer;
    position: relative;
    overflow: hidden;
    animation: card-entrance 0.6s ease-out backwards;
  }

  .project-card:nth-child(1) {
    animation-delay: 0.1s;
  }

  .project-card:nth-child(2) {
    animation-delay: 0.2s;
  }

  .project-card:nth-child(3) {
    animation-delay: 0.3s;
  }

  .project-card:nth-child(4) {
    animation-delay: 0.4s;
  }

  .project-card:nth-child(5) {
    animation-delay: 0.5s;
  }

  .project-card:nth-child(6) {
    animation-delay: 0.6s;
  }

  @keyframes card-entrance {
    from {
      opacity: 0;
      transform: translateY(30px) scale(0.9);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }

  .project-card::before {
    content: "";
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(134, 226, 147, 0.1), transparent);
    transition: left 0.5s;
  }

  .project-card:hover::before {
    left: 100%;
  }

  .project-card:hover {
    transform: translateY(-10px) scale(1.02);
    box-shadow: 0 20px 40px rgba(134, 226, 147, 0.3);
    border-color: rgba(134, 226, 147, 0.5);
  }

  .project-icon {
    font-size: 3rem;
    margin-bottom: 1rem;
    animation: bounce 2s ease-in-out infinite;
  }

  @keyframes bounce {
    0%, 100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-10px);
    }
  }

  .project-title {
    font-size: 1.5rem;
    font-weight: bold;
    color: #1a5d3a;
    margin-bottom: 1rem;
  }

  .project-description {
    color: #4b5563;
    line-height: 1.6;
  }

  .schedule-section {
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
  }

  .schedule-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 3rem;
    margin-top: 3rem;
  }

  .schedule-day {
    background: rgba(134, 226, 147, 0.1);
    padding: 2rem;
    border-radius: 20px;
    border: 2px solid rgba(134, 226, 147, 0.2);
  }

  .day-title {
    font-size: 1.8rem;
    font-weight: bold;
    color: #1a5d3a;
    margin-bottom: 1.5rem;
  }

  .schedule-list {
    list-style: none;
    padding: 0;
  }

  .schedule-list li {
    padding: 0.75rem 0;
    border-bottom: 1px solid rgba(134, 226, 147, 0.2);
    color: #1f2937;
    font-size: 1.1rem;
  }

  .schedule-list li:last-child {
    border-bottom: none;
  }

  .sponsors-section {
    background: linear-gradient(180deg, rgba(134, 230, 198, 0.05) 0%, rgba(134, 226, 147, 0.05) 100%);
  }

  .sponsors-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 2rem;
    margin: 3rem 0;
    align-items: center;
  }

  .sponsor-logo {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1.5rem;
    background: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(10px);
    border-radius: 15px;
    transition: all 0.3s ease;
    border: 2px solid rgba(134, 226, 147, 0.2);
  }

  .sponsor-logo:hover {
    transform: translateY(-5px) scale(1.05);
    box-shadow: 0 10px 30px rgba(134, 226, 147, 0.3);
    border-color: rgba(134, 226, 147, 0.5);
  }

  .sponsor-logo img {
    max-width: 100%;
    max-height: 80px;
    object-fit: contain;
  }

  .organizer-section {
    text-align: center;
    margin-top: 4rem;
    padding-top: 3rem;
    border-top: 2px solid rgba(134, 226, 147, 0.2);
  }

  .organizer-title {
    font-size: 1.5rem;
    color: #1a5d3a;
    margin-bottom: 1.5rem;
  }

  .organizer-logo {
    display: inline-block;
    padding: 1rem;
    background: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(10px);
    border-radius: 15px;
    transition: all 0.3s ease;
    border: 2px solid rgba(134, 226, 147, 0.2);
  }

  .organizer-logo:hover {
    transform: scale(1.1);
    box-shadow: 0 10px 30px rgba(134, 226, 147, 0.3);
  }

  .organizer-logo img {
    max-width: 200px;
    height: auto;
  }

  @media (max-width: 768px) {
    .hero-title {
      font-size: 3rem;
    }

    .hero-subtitle {
      font-size: 1.5rem;
    }

    .countdown-number {
      font-size: 3rem;
    }

    .section-title {
      font-size: 2.5rem;
    }

    .projects-grid {
      grid-template-columns: 1fr;
    }
  }
</style>