<script>
  import ThreeBackground from "$lib/components/ThreeBackground.svelte";
  import { sponsors } from "$lib/components/sponsors-data.js";
  import { onMount } from "svelte";

  let daysSince = 0;

  onMount(() => {
    const eventDate = new Date('2025-11-01T00:00:00');
    const now = new Date();
    const diffTime = Math.abs(now - eventDate);
    daysSince = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  });
</script>

<svelte:head>
  <title>Cam Hack 2025</title>
  <meta name="description" content="Cam Hack 2025 - What can you make in 2 days?" />
</svelte:head>

<ThreeBackground />

<div class="page-container">
  <section class="hero-section">
    <div class="hero-content">
      <div class="logo-container">
        <img src="/cam-hack-logo-text.png" alt="Cam Hack Logo" class="hero-logo" />
      </div>
      <h1 class="hero-title">Cam Hack 2025</h1>
      <div class="hero-date">1st - 2nd November</div>
      <div class="countdown-badge">
        <span class="countdown-number">{daysSince}</span>
        <span class="countdown-label">days since event</span>
      </div>
      <div class="hero-tagline">What can you make in 2 days?</div>
      <div class="hero-buttons">
        <a href="/discord" target="_blank" class="btn btn-primary">
          Join the Discord
        </a>
        <a href="/signup" class="btn btn-disabled">
          Signups closed
        </a>
      </div>
    </div>
  </section>

  <section class="featured-section">
    <div class="section-content">
      <h2 class="section-title glitch" data-text="Unintended Behaviour">Unintended Behaviour</h2>
      <div class="featured-card">
        <a href="https://cam-hack-2025.devpost.com" target="_blank" class="featured-link">
          <img src="/unintended.png" alt="Unintended Behaviour" class="featured-image" />
          <div class="featured-overlay">
            <span class="featured-cta">View Project</span>
          </div>
        </a>
      </div>
    </div>
  </section>

  <section class="sponsors-section">
    <div class="section-content">
      <h2 class="section-title">Sponsored by</h2>
      <div class="sponsors-grid">
        {#each sponsors as sponsor}
          <a href={sponsor.url} target="_blank" class="sponsor-item">
            <img src={sponsor.logo} alt={sponsor.name} class="sponsor-logo" />
          </a>
        {/each}
      </div>
      <div class="organizer-info">
        <h3 class="organizer-title">Run by</h3>
        <a href="https://cucats.org" target="_blank" class="organizer-link">
          <img src="/cucats-logo-gradient-full.png" alt="CUCaTS" class="organizer-logo" />
        </a>
      </div>
    </div>
  </section>

  <section id="about" class="about-section">
    <div class="section-content">
      <h2 class="section-title">About</h2>
      <div class="content-grid">
        <div class="content-card">
          <p class="content-text">
            Cam Hack is a 2 day hackathon for the innovative minds at the University of Cambridge. Over an action-packed weekend, students come together to design and build technology projects from the ground up. We welcome participants ranging from curious beginners to seasoned coders.
          </p>
        </div>
        <div class="content-card">
          <p class="content-text">
            For the winning team, each person will receive £200 and can choose from a range of prizes including: smartwatches, Steam vouchers, Amazon vouchers, or Sony XM4 headphones.
          </p>
        </div>
      </div>
    </div>
  </section>

  <section id="schedule" class="schedule-section">
    <div class="section-content">
      <h2 class="section-title">Schedule</h2>
      <div class="schedule-grid">
        <div class="schedule-day">
          <h3 class="schedule-day-title">Saturday 1st November</h3>
          <div class="schedule-timeline">
            <div class="schedule-item">
              <span class="schedule-time">09:30</span>
              <span class="schedule-event">Breakfast</span>
            </div>
            <div class="schedule-item">
              <span class="schedule-time">10:00</span>
              <span class="schedule-event">Opening Ceremony</span>
            </div>
            <div class="schedule-item highlight">
              <span class="schedule-time">10:30</span>
              <span class="schedule-event">Hacking begins!</span>
            </div>
            <div class="schedule-item">
              <span class="schedule-time">13:00</span>
              <span class="schedule-event">Lunch</span>
            </div>
            <div class="schedule-item">
              <span class="schedule-time">18:00</span>
              <span class="schedule-event">Dinner</span>
            </div>
          </div>
        </div>
        <div class="schedule-day">
          <h3 class="schedule-day-title">Sunday 2nd November</h3>
          <div class="schedule-timeline">
            <div class="schedule-item">
              <span class="schedule-time">09:30</span>
              <span class="schedule-event">Breakfast</span>
            </div>
            <div class="schedule-item">
              <span class="schedule-time">13:00</span>
              <span class="schedule-event">Lunch</span>
            </div>
            <div class="schedule-item highlight">
              <span class="schedule-time">16:30</span>
              <span class="schedule-event">Hacking ends!</span>
            </div>
            <div class="schedule-item">
              <span class="schedule-time">17:00</span>
              <span class="schedule-event">Dinner</span>
            </div>
            <div class="schedule-item">
              <span class="schedule-time">18:00</span>
              <span class="schedule-event">Judging ends</span>
            </div>
            <div class="schedule-item">
              <span class="schedule-time">18:30</span>
              <span class="schedule-event">Closing ceremony</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section id="rules" class="rules-section">
    <div class="section-content">
      <h2 class="section-title">Rules</h2>
      <div class="rules-grid">
        <div class="rules-category">
          <h3 class="rules-category-title">Entry</h3>
          <ul class="rules-list">
            <li>Maximum team size is 5. Solo participation allowed.</li>
            <li>Participants must be students at the University of Cambridge.</li>
          </ul>
        </div>
        <div class="rules-category">
          <h3 class="rules-category-title">House Rules</h3>
          <ul class="rules-list">
            <li>No food in the Intel lab - all food must stay downstairs.</li>
            <li>No alcohol at the hackathon.</li>
            <li>Overnight stays in the lab are permitted.</li>
            <li>All participants must follow the <a href="/code-of-conduct" class="text-link">Code of Conduct</a>.</li>
          </ul>
        </div>
        <div class="rules-category">
          <h3 class="rules-category-title">Submission</h3>
          <ul class="rules-list">
            <li>All work must be done at the hackathon.</li>
            <li>AI assistants allowed as tools, not to generate entire projects.</li>
            <li>Each team presents demos to track representatives.</li>
            <li>Submissions made to <a href="https://cam-hack-2025.devpost.com" target="_blank" class="text-link">Devpost</a>.</li>
          </ul>
        </div>
      </div>
    </div>
  </section>

  <section id="faq" class="faq-section">
    <div class="section-content">
      <h2 class="section-title">FAQ</h2>
      <div class="faq-grid">
        <div class="faq-item">
          <h4 class="faq-question">What is a hackathon?</h4>
          <p class="faq-answer">An event where people collaborate to create new projects over a weekend.</p>
        </div>
        <div class="faq-item">
          <h4 class="faq-question">How much does it cost?</h4>
          <p class="faq-answer">Free! Includes food, drinks, and stash.</p>
        </div>
        <div class="faq-item">
          <h4 class="faq-question">Where is it?</h4>
          <p class="faq-answer">Computer Laboratory at the William Gates Building.</p>
        </div>
        <div class="faq-item">
          <h4 class="faq-question">Can I participate remotely?</h4>
          <p class="faq-answer">Online participation not allowed, but you can leave venue temporarily.</p>
        </div>
        <div class="faq-item">
          <h4 class="faq-question">I don't have a team!</h4>
          <p class="faq-answer">Form teams in our <a href="/discord" class="text-link">Discord server</a> or at the event.</p>
        </div>
        <div class="faq-item">
          <h4 class="faq-question">What can I win?</h4>
          <p class="faq-answer">£200 plus prizes: smartwatches, Steam vouchers, Amazon vouchers, or Sony XM4 headphones.</p>
        </div>
      </div>
    </div>
  </section>
</div>

<style>
  :global(body) {
    margin: 0;
    padding: 0;
    background: #0a0e1a;
    color: #e5e7eb;
    overflow-x: hidden;
    font-family: var(--font-playpen);
  }

  .page-container {
    position: relative;
    z-index: 1;
    min-height: 100vh;
  }

  section {
    padding: 6rem 2rem;
    position: relative;
  }

  .section-content {
    max-width: 1200px;
    margin: 0 auto;
  }

  .section-title {
    font-family: var(--font-orbitron);
    font-size: 3.5rem;
    font-weight: 900;
    text-align: center;
    margin-bottom: 3rem;
    background: linear-gradient(135deg, #10b981 0%, #84cc16 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    position: relative;
    animation: titleFloat 3s ease-in-out infinite;
  }

  @keyframes titleFloat {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
  }

  .hero-section {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 4rem 2rem;
  }

  .hero-content {
    text-align: center;
    animation: fadeInUp 1s ease-out;
  }

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(40px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .logo-container {
    margin-bottom: 2rem;
    animation: pulse 2s ease-in-out infinite;
  }

  @keyframes pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.05); }
  }

  .hero-logo {
    width: 300px;
    height: auto;
    filter: drop-shadow(0 0 30px rgba(16, 185, 129, 0.5));
  }

  .hero-title {
    font-family: var(--font-orbitron);
    font-size: 5rem;
    font-weight: 900;
    margin: 0 0 1rem 0;
    background: linear-gradient(135deg, #10b981 0%, #84cc16 50%, #10b981 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    background-size: 200% auto;
    animation: shimmer 3s linear infinite;
    text-transform: uppercase;
    letter-spacing: 0.1em;
  }

  @keyframes shimmer {
    to {
      background-position: 200% center;
    }
  }

  .hero-date {
    font-family: var(--font-orbitron);
    font-size: 2rem;
    color: #84cc16;
    margin-bottom: 2rem;
    font-weight: 600;
    letter-spacing: 0.05em;
  }

  .countdown-badge {
    display: inline-block;
    margin: 2rem 0;
    padding: 2rem 4rem;
    background: linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(132, 204, 22, 0.1));
    border: 2px solid #10b981;
    border-radius: 20px;
    box-shadow: 0 0 40px rgba(16, 185, 129, 0.3), inset 0 0 20px rgba(16, 185, 129, 0.1);
    animation: glowPulse 2s ease-in-out infinite;
  }

  @keyframes glowPulse {
    0%, 100% {
      box-shadow: 0 0 40px rgba(16, 185, 129, 0.3), inset 0 0 20px rgba(16, 185, 129, 0.1);
    }
    50% {
      box-shadow: 0 0 60px rgba(16, 185, 129, 0.5), inset 0 0 30px rgba(16, 185, 129, 0.2);
    }
  }

  .countdown-number {
    display: block;
    font-family: var(--font-orbitron);
    font-size: 5rem;
    font-weight: 900;
    color: #10b981;
    line-height: 1;
    text-shadow: 0 0 20px rgba(16, 185, 129, 0.5);
  }

  .countdown-label {
    display: block;
    font-size: 1.2rem;
    color: #84cc16;
    margin-top: 0.5rem;
    text-transform: uppercase;
    letter-spacing: 0.2em;
  }

  .hero-tagline {
    font-size: 1.8rem;
    color: #e5e7eb;
    margin: 2rem 0;
    font-weight: 500;
  }

  .hero-buttons {
    display: flex;
    gap: 1.5rem;
    justify-content: center;
    flex-wrap: wrap;
    margin-top: 3rem;
  }

  .btn {
    padding: 1.2rem 3rem;
    font-size: 1.2rem;
    font-weight: 700;
    text-decoration: none;
    border-radius: 12px;
    transition: all 0.3s ease;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    position: relative;
    overflow: hidden;
  }

  .btn::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.2);
    transform: translate(-50%, -50%);
    transition: width 0.6s, height 0.6s;
  }

  .btn:hover::before {
    width: 300px;
    height: 300px;
  }

  .btn-primary {
    background: linear-gradient(135deg, #10b981 0%, #059669 100%);
    color: #fff;
    border: 2px solid #10b981;
    box-shadow: 0 0 20px rgba(16, 185, 129, 0.4);
  }

  .btn-primary:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 40px rgba(16, 185, 129, 0.6);
  }

  .btn-disabled {
    background: rgba(75, 85, 99, 0.5);
    color: #9ca3af;
    border: 2px solid #4b5563;
    cursor: not-allowed;
  }

  .featured-section {
    background: linear-gradient(180deg, rgba(10, 14, 26, 0) 0%, rgba(16, 185, 129, 0.05) 100%);
  }

  .glitch {
    position: relative;
    animation: glitchText 5s infinite;
  }

  .glitch::before,
  .glitch::after {
    content: attr(data-text);
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, #10b981 0%, #84cc16 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .glitch::before {
    animation: glitchBefore 3s infinite;
    clip-path: polygon(0 0, 100% 0, 100% 45%, 0 45%);
  }

  .glitch::after {
    animation: glitchAfter 2s infinite;
    clip-path: polygon(0 55%, 100% 55%, 100% 100%, 0 100%);
  }

  @keyframes glitchBefore {
    0%, 100% { transform: translate(0); }
    33% { transform: translate(-2px, 2px); }
    66% { transform: translate(2px, -2px); }
  }

  @keyframes glitchAfter {
    0%, 100% { transform: translate(0); }
    33% { transform: translate(2px, -2px); }
    66% { transform: translate(-2px, 2px); }
  }

  @keyframes glitchText {
    0%, 90%, 100% { opacity: 1; }
    92%, 98% { opacity: 0.8; }
  }

  .featured-card {
    max-width: 900px;
    margin: 0 auto;
    border-radius: 20px;
    overflow: hidden;
    border: 2px solid #10b981;
    box-shadow: 0 0 40px rgba(16, 185, 129, 0.3);
    transition: all 0.5s ease;
    animation: cardFloat 4s ease-in-out infinite;
  }

  @keyframes cardFloat {
    0%, 100% { transform: translateY(0) scale(1); }
    50% { transform: translateY(-20px) scale(1.02); }
  }

  .featured-card:hover {
    box-shadow: 0 0 60px rgba(16, 185, 129, 0.6);
    transform: translateY(-10px) scale(1.05) !important;
  }

  .featured-link {
    display: block;
    position: relative;
    overflow: hidden;
  }

  .featured-image {
    display: block;
    width: 100%;
    height: auto;
    transition: transform 0.6s ease;
  }

  .featured-link:hover .featured-image {
    transform: scale(1.1);
  }

  .featured-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(16, 185, 129, 0.9), rgba(132, 204, 22, 0.9));
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: opacity 0.4s ease;
  }

  .featured-link:hover .featured-overlay {
    opacity: 1;
  }

  .featured-cta {
    font-family: var(--font-orbitron);
    font-size: 2.5rem;
    font-weight: 900;
    color: #fff;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    text-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
  }

  .sponsors-section {
    background: radial-gradient(circle at center, rgba(16, 185, 129, 0.05) 0%, transparent 70%);
  }

  .sponsors-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 3rem;
    margin: 4rem 0;
    align-items: center;
    justify-items: center;
  }

  .sponsor-item {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem;
    background: rgba(16, 185, 129, 0.05);
    border: 1px solid rgba(16, 185, 129, 0.2);
    border-radius: 15px;
    transition: all 0.4s ease;
    width: 100%;
    height: 100%;
    min-height: 120px;
  }

  .sponsor-item:hover {
    background: rgba(16, 185, 129, 0.1);
    border-color: #10b981;
    transform: translateY(-10px) scale(1.05);
    box-shadow: 0 10px 40px rgba(16, 185, 129, 0.3);
  }

  .sponsor-logo {
    max-width: 80%;
    height: auto;
    filter: brightness(0) invert(1);
    transition: filter 0.3s ease;
  }

  .sponsor-item:hover .sponsor-logo {
    filter: brightness(1) invert(0) drop-shadow(0 0 10px rgba(16, 185, 129, 0.5));
  }

  .organizer-info {
    text-align: center;
    margin-top: 5rem;
    padding-top: 3rem;
    border-top: 2px solid rgba(16, 185, 129, 0.2);
  }

  .organizer-title {
    font-family: var(--font-orbitron);
    font-size: 2rem;
    font-weight: 700;
    color: #84cc16;
    margin-bottom: 2rem;
    text-transform: uppercase;
    letter-spacing: 0.1em;
  }

  .organizer-link {
    display: inline-block;
    transition: transform 0.3s ease;
  }

  .organizer-link:hover {
    transform: scale(1.1);
  }

  .organizer-logo {
    max-width: 300px;
    height: auto;
    filter: drop-shadow(0 0 20px rgba(16, 185, 129, 0.3));
  }

  .about-section {
    background: linear-gradient(180deg, rgba(10, 14, 26, 0) 0%, rgba(132, 204, 22, 0.05) 100%);
  }

  .content-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
  }

  .content-card {
    padding: 3rem;
    background: rgba(16, 185, 129, 0.05);
    border: 1px solid rgba(16, 185, 129, 0.2);
    border-radius: 20px;
    transition: all 0.4s ease;
    animation: cardSlideIn 0.8s ease-out;
  }

  @keyframes cardSlideIn {
    from {
      opacity: 0;
      transform: translateX(-50px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  .content-card:hover {
    background: rgba(16, 185, 129, 0.08);
    border-color: #10b981;
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(16, 185, 129, 0.2);
  }

  .content-text {
    font-size: 1.2rem;
    line-height: 1.8;
    color: #d1d5db;
    margin: 0;
  }

  .schedule-section {
    background: radial-gradient(circle at center, rgba(132, 204, 22, 0.05) 0%, transparent 70%);
  }

  .schedule-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 3rem;
  }

  .schedule-day {
    background: rgba(16, 185, 129, 0.05);
    border: 2px solid rgba(16, 185, 129, 0.2);
    border-radius: 20px;
    padding: 2.5rem;
    transition: all 0.4s ease;
  }

  .schedule-day:hover {
    border-color: #10b981;
    box-shadow: 0 0 40px rgba(16, 185, 129, 0.2);
    transform: scale(1.02);
  }

  .schedule-day-title {
    font-family: var(--font-orbitron);
    font-size: 1.8rem;
    font-weight: 700;
    color: #84cc16;
    margin-bottom: 2rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .schedule-timeline {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .schedule-item {
    display: flex;
    align-items: center;
    gap: 1.5rem;
    padding: 1rem 1.5rem;
    background: rgba(16, 185, 129, 0.03);
    border-left: 3px solid rgba(16, 185, 129, 0.3);
    border-radius: 8px;
    transition: all 0.3s ease;
  }

  .schedule-item:hover {
    background: rgba(16, 185, 129, 0.08);
    border-left-color: #10b981;
    transform: translateX(10px);
  }

  .schedule-item.highlight {
    background: rgba(16, 185, 129, 0.1);
    border-left-color: #10b981;
    box-shadow: 0 0 20px rgba(16, 185, 129, 0.2);
  }

  .schedule-time {
    font-family: var(--font-orbitron);
    font-size: 1.3rem;
    font-weight: 700;
    color: #10b981;
    min-width: 80px;
  }

  .schedule-event {
    font-size: 1.2rem;
    color: #e5e7eb;
    flex: 1;
  }

  .rules-section {
    background: linear-gradient(180deg, rgba(10, 14, 26, 0) 0%, rgba(16, 185, 129, 0.05) 100%);
  }

  .rules-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2.5rem;
  }

  .rules-category {
    padding: 2.5rem;
    background: rgba(16, 185, 129, 0.05);
    border: 2px solid rgba(16, 185, 129, 0.2);
    border-radius: 20px;
    transition: all 0.4s ease;
  }

  .rules-category:hover {
    background: rgba(16, 185, 129, 0.08);
    border-color: #10b981;
    transform: translateY(-5px);
    box-shadow: 0 10px 40px rgba(16, 185, 129, 0.25);
  }

  .rules-category-title {
    font-family: var(--font-orbitron);
    font-size: 1.8rem;
    font-weight: 700;
    color: #84cc16;
    margin-bottom: 1.5rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .rules-list {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .rules-list li {
    padding: 1rem 0 1rem 2rem;
    color: #d1d5db;
    font-size: 1.1rem;
    line-height: 1.6;
    position: relative;
    border-left: 2px solid rgba(16, 185, 129, 0.3);
    margin-bottom: 1rem;
    transition: all 0.3s ease;
  }

  .rules-list li::before {
    content: '▸';
    position: absolute;
    left: 0.5rem;
    color: #10b981;
    font-size: 1.2rem;
  }

  .rules-list li:hover {
    border-left-color: #10b981;
    padding-left: 2.5rem;
  }

  .faq-section {
    background: radial-gradient(circle at center, rgba(132, 204, 22, 0.05) 0%, transparent 70%);
  }

  .faq-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
  }

  .faq-item {
    padding: 2rem;
    background: rgba(16, 185, 129, 0.05);
    border: 1px solid rgba(16, 185, 129, 0.2);
    border-radius: 15px;
    transition: all 0.4s ease;
    position: relative;
    overflow: hidden;
  }

  .faq-item::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(16, 185, 129, 0.1) 0%, transparent 70%);
    opacity: 0;
    transition: opacity 0.4s ease;
  }

  .faq-item:hover::before {
    opacity: 1;
  }

  .faq-item:hover {
    background: rgba(16, 185, 129, 0.08);
    border-color: #10b981;
    transform: translateY(-5px) scale(1.02);
    box-shadow: 0 10px 30px rgba(16, 185, 129, 0.2);
  }

  .faq-question {
    font-family: var(--font-orbitron);
    font-size: 1.4rem;
    font-weight: 700;
    color: #84cc16;
    margin-bottom: 1rem;
    position: relative;
    z-index: 1;
  }

  .faq-answer {
    font-size: 1.1rem;
    line-height: 1.7;
    color: #d1d5db;
    margin: 0;
    position: relative;
    z-index: 1;
  }

  .text-link {
    color: #10b981;
    text-decoration: none;
    font-weight: 600;
    transition: all 0.3s ease;
    position: relative;
  }

  .text-link::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 0;
    height: 2px;
    background: #84cc16;
    transition: width 0.3s ease;
  }

  .text-link:hover::after {
    width: 100%;
  }

  .text-link:hover {
    color: #84cc16;
  }

  @media (max-width: 768px) {
    .hero-title {
      font-size: 3rem;
    }

    .hero-date {
      font-size: 1.5rem;
    }

    .section-title {
      font-size: 2.5rem;
    }

    .countdown-number {
      font-size: 3.5rem;
    }

    .countdown-badge {
      padding: 1.5rem 3rem;
    }

    .sponsors-grid {
      grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
      gap: 2rem;
    }

    .schedule-grid {
      grid-template-columns: 1fr;
    }

    section {
      padding: 4rem 1.5rem;
    }
  }
</style>
