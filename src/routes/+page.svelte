<script>
  import { onMount } from 'svelte';
  import ThreeBackground from "$lib/components/ThreeBackground.svelte";
  import Countdown from "$lib/components/Countdown.svelte";

  let scrollY = $state(0);
  let visible = $state(false);

  onMount(() => {
    visible = true;
    const handleScroll = () => {
      scrollY = window.scrollY;
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  });

  const sponsors = [
    { name: "Anthropic", logo: "/anthropic-logo.png", url: "https://www.anthropic.com" },
    { name: "Entrepreneur First", logo: "/entrepreneur-first-logo.png", url: "https://www.joinef.com" },
    { name: "Jane Street", logo: "/jane-street-logo.png", url: "https://janestreet.com" },
    { name: "Founders", logo: "/founders-logo.png", url: "https://founders.cam.ac.uk" },
    { name: "Qube RT", logo: "/qube-rt-logo.png", url: "https://www.qube-rt.com" },
    { name: "Sierra", logo: "/sierra-logo.png", url: "https://sierra.ai" },
    { name: "TPP UK", logo: "/tpp-logo.png", url: "https://tpp-uk.com" }
  ];
</script>

<svelte:head>
  <title>Cam Hack 2025</title>
</svelte:head>

<ThreeBackground />

<div class="main-container">
  <section class="hero-section" style="transform: translateY({scrollY * 0.3}px)">
    <div class="hero-content" class:fade-in={visible}>
      <img src="/cam-hack-logo-text.png" alt="Cam Hack Logo" class="hero-logo" />
      <h1 class="hero-title">Cam Hack 2025</h1>
      <div class="hero-date">1st &ndash; 2nd November</div>
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

  <Countdown />

  <section class="featured-section" style="transform: translateY({scrollY * 0.15}px)">
    <div class="section-container">
      <h2 class="section-title">Featured Project</h2>
      <div class="featured-card">
        <div class="card-glow"></div>
        <h3 class="featured-title">Unintended Behaviour</h3>
        <a href="https://cam-hack-2025.devpost.com" target="_blank" class="featured-link">
          <img src="/unintended.png" alt="Unintended" class="featured-image" />
          <div class="featured-overlay">
            <span class="overlay-text">View Project</span>
          </div>
        </a>
      </div>
    </div>
  </section>

  <section id="about" class="about-section" style="transform: translateY({scrollY * 0.1}px)">
    <div class="section-container">
      <h2 class="section-title">About</h2>
      <div class="about-content">
        <p>
          Cam Hack is a 2 day hackathon for the innovative minds at the University of
          Cambridge. Over an action-packed weekend, students come together to design
          and build technology projects from the ground up. We welcome participants
          ranging from curious beginners to seasoned coders. Expect plenty of free
          stash, food, and mini-events throughout this hackathon.
        </p>
        <p>
          For the winning team, each person will receive £200 and can choose from a
          range of prizes including: smartwatches, Steam vouchers, Amazon vouchers, or
          Sony XM4 headphones.
        </p>
      </div>
    </div>
  </section>

  <section id="schedule" class="schedule-section" style="transform: translateY({scrollY * 0.08}px)">
    <div class="section-container">
      <h2 class="section-title">Schedule</h2>
      <div class="schedule-grid">
        <div class="schedule-day">
          <h3 class="day-title">Saturday 1st November</h3>
          <div class="schedule-items">
            <div class="schedule-item">
              <span class="time">09:30</span>
              <span class="event">Breakfast</span>
            </div>
            <div class="schedule-item highlight">
              <span class="time">10:00</span>
              <span class="event">Opening Ceremony</span>
            </div>
            <div class="schedule-item highlight">
              <span class="time">10:30</span>
              <span class="event">Hacking begins!</span>
            </div>
            <div class="schedule-item">
              <span class="time">13:00</span>
              <span class="event">Lunch</span>
            </div>
            <div class="schedule-item">
              <span class="time">18:00</span>
              <span class="event">Dinner</span>
            </div>
          </div>
        </div>
        <div class="schedule-day">
          <h3 class="day-title">Sunday 2nd November</h3>
          <div class="schedule-items">
            <div class="schedule-item">
              <span class="time">09:30</span>
              <span class="event">Breakfast</span>
            </div>
            <div class="schedule-item">
              <span class="time">13:00</span>
              <span class="event">Lunch</span>
            </div>
            <div class="schedule-item highlight">
              <span class="time">16:30</span>
              <span class="event">Hacking ends!</span>
            </div>
            <div class="schedule-item">
              <span class="time">17:00</span>
              <span class="event">Dinner</span>
            </div>
            <div class="schedule-item highlight">
              <span class="time">18:00</span>
              <span class="event">Judging ends</span>
            </div>
            <div class="schedule-item highlight">
              <span class="time">18:30</span>
              <span class="event">Closing ceremony</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section id="rules" class="rules-section" style="transform: translateY({scrollY * 0.04}px)">
    <div class="section-container">
      <h2 class="section-title">Rules</h2>
      <div class="rules-content">
        <h3 class="rules-subtitle">Entry</h3>
        <ul class="rules-list">
          <li>The maximum team size is 5. Any bigger, and we might have to split you up. Solo participation is allowed, but hacking is better with other people!</li>
          <li>Due to departmental rules, participants must be students at the University of Cambridge.</li>
        </ul>
        <h3 class="rules-subtitle">House rules</h3>
        <ul class="rules-list">
          <li>Please do not bring food into the Intel lab! All food must stay downstairs in the street.</li>
          <li>You must not bring or consume alcohol at the hackathon.</li>
          <li>We don't recommend it, but you can stay overnight in the lab if you want.</li>
          <li>All participants must follow our <a href="/code-of-conduct" class="inline-link">Code of Conduct</a>.</li>
        </ul>
        <h3 class="rules-subtitle">Submission</h3>
        <ul class="rules-list">
          <li>All work on projects must be done at the hackathon. Using existing open source code is allowed if credited, but the project should be substantially new.</li>
          <li>Working on a project and open sourcing it for the sole purpose of using the code in the hackathon is against the spirit of the rules and is not allowed.</li>
          <li>AI assistants are allowed when writing code, but don't go overboard. For example, using AI assistants as a tool to help you code is fine, but asking one to generate a whole website or the core logic of your application is not allowed.</li>
          <li>After hacking finishes, representatives for each track will go around to look at each demo. You are free to look at other projects, as long as one team member is available to present a demo of their project.</li>
          <li>If you discover a breaking bug during your demo with a trivial fix, that's okay to rectify.</li>
          <li>Submissions will be made to <a href="https://cam-hack-2025.devpost.com" class="inline-link">Devpost</a>.</li>
        </ul>
      </div>
    </div>
  </section>

  <section id="faq" class="faq-section" style="transform: translateY({scrollY * 0.03}px)">
    <div class="section-container">
      <h2 class="section-title">FAQ</h2>
      <div class="faq-grid">
        <div class="faq-item">
          <h4 class="faq-question">What is a hackathon?</h4>
          <p class="faq-answer">A hackathon is an event where people collaborate to create new projects! It usually runs over a weekend and is a great way to learn new skills, meet new people, and have fun!</p>
        </div>
        <div class="faq-item">
          <h4 class="faq-question">What are the hackathon tracks?</h4>
          <p class="faq-answer">All projects submit to a main track, which aligns with the overall theme of the event. Participants can optionally submit the same project to one or more secondary tracks, whose themes extend the main theme in some way.</p>
        </div>
        <div class="faq-item">
          <h4 class="faq-question">Can I participate remotely?</h4>
          <p class="faq-answer">While online participation is not allowed, it's okay to leave the venue for some time to hack elsewhere. We hope to see you at the Computer Lab!</p>
        </div>
        <div class="faq-item">
          <h4 class="faq-question">How much does it cost?</h4>
          <p class="faq-answer">Entry is free and includes food, drinks, and of course, stash!</p>
        </div>
        <div class="faq-item">
          <h4 class="faq-question">Where is it?</h4>
          <p class="faq-answer">Cam Hack 2025 will be in the Computer Laboratory, also known as the William Gates Building.</p>
        </div>
        <div class="faq-item">
          <h4 class="faq-question">I don't have a team!</h4>
          <p class="faq-answer">If you don't have a team yet, don't hesitate to look around in our <a href="/discord" target="_blank" class="inline-link">Discord server</a>. It's also common to form teams at the event itself!</p>
        </div>
        <div class="faq-item">
          <h4 class="faq-question">How do I sign up?</h4>
          <p class="faq-answer">Signups are now closed. We look forward to seeing you at the event!</p>
        </div>
        <div class="faq-item">
          <h4 class="faq-question">I've never hacked before!</h4>
          <p class="faq-answer">That's completely fine! Teams often have hackers with a mix of experience, including beginners.</p>
        </div>
        <div class="faq-item">
          <h4 class="faq-question">Will there be food?</h4>
          <p class="faq-answer">Yes! We will provide meals, as well as lots of snacks throughout the event! Please let us know if you have any dietary requirements in the sign up form.</p>
        </div>
        <div class="faq-item">
          <h4 class="faq-question">What can I win?</h4>
          <p class="faq-answer">For the winning team, each person will receive £200 and can choose from a range of prizes including: smartwatches, Steam vouchers, Amazon vouchers, or Sony XM4 headphones.</p>
        </div>
      </div>
    </div>
  </section>

  <section class="sponsors-section" style="transform: translateY({scrollY * 0.02}px)">
    <div class="section-container">
      <h2 class="section-title">Sponsors</h2>
      <div class="sponsors-grid">
        {#each sponsors as sponsor}
          <a href={sponsor.url} target="_blank" class="sponsor-card">
            <div class="sponsor-glow"></div>
            <img src={sponsor.logo} alt={sponsor.name} class="sponsor-logo" />
          </a>
        {/each}
      </div>
      <div class="run-by">
        <div class="run-by-label">Run by</div>
        <a href="https://cucats.org" target="_blank" class="run-by-logo">
          <img src="/cucats-logo-gradient-full.png" alt="Cambridge University Computing and Technology Society" />
        </a>
      </div>
    </div>
  </section>
</div>

<style>
  .main-container {
    position: relative;
    z-index: 1;
    min-height: 100vh;
  }

  .hero-section {
    min-height: calc(100vh - 80px);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem;
    position: relative;
  }

  .hero-content {
    text-align: center;
    max-width: 800px;
    opacity: 0;
    transform: translateY(30px);
    transition: opacity 1s ease, transform 1s ease;
  }

  .hero-content.fade-in {
    opacity: 1;
    transform: translateY(0);
  }

  .hero-logo {
    width: 200px;
    height: 200px;
    margin: 0 auto 2rem;
    animation: float 3s ease-in-out infinite;
    filter: drop-shadow(0 0 30px rgba(0, 255, 136, 0.5));
  }

  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-20px); }
  }

  .hero-title {
    font-size: 5rem;
    font-weight: 700;
    color: #00ff88;
    text-shadow: 0 0 30px rgba(0, 255, 136, 0.5);
    margin-bottom: 1rem;
    letter-spacing: 2px;
  }

  .hero-date {
    font-size: 2rem;
    color: #00ffcc;
    margin-bottom: 1.5rem;
    font-weight: 600;
    font-family: 'Orbitron', sans-serif;
  }

  .hero-tagline {
    font-size: 1.5rem;
    color: #0d7f4a;
    margin-bottom: 2rem;
    font-weight: 500;
  }

  .hero-buttons {
    display: flex;
    gap: 1rem;
    justify-content: center;
    flex-wrap: wrap;
  }

  .btn {
    padding: 1rem 2rem;
    font-size: 1.1rem;
    font-weight: 600;
    border-radius: 12px;
    text-decoration: none;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
    font-family: 'Space Grotesk', sans-serif;
  }

  .btn-primary {
    background: linear-gradient(135deg, #00ff88, #00ffcc);
    color: #0a0e0d;
    box-shadow: 0 0 30px rgba(0, 255, 136, 0.4);
  }

  .btn-primary:hover {
    transform: scale(1.05);
    box-shadow: 0 0 50px rgba(0, 255, 136, 0.6);
  }

  .btn-disabled {
    background: rgba(100, 100, 100, 0.3);
    color: #666;
    cursor: not-allowed;
  }

  .section-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 4rem 2rem;
  }

  .section-title {
    font-size: 3rem;
    color: #00ff88;
    text-align: center;
    margin-bottom: 3rem;
    text-transform: uppercase;
    letter-spacing: 4px;
    position: relative;
  }

  .section-title::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 100px;
    height: 3px;
    background: linear-gradient(90deg, transparent, #00ff88, transparent);
  }

  .featured-section {
    padding: 4rem 0;
  }

  .featured-card {
    position: relative;
    max-width: 900px;
    margin: 0 auto;
    background: rgba(13, 127, 74, 0.1);
    border: 2px solid rgba(0, 255, 136, 0.3);
    border-radius: 20px;
    padding: 2rem;
    transition: all 0.3s ease;
  }

  .featured-card:hover {
    border-color: rgba(0, 255, 136, 0.6);
    transform: translateY(-5px);
  }

  .card-glow {
    position: absolute;
    inset: -2px;
    background: linear-gradient(45deg, #00ff88, #00ffcc, #0d7f4a, #00ff88);
    border-radius: 20px;
    opacity: 0;
    z-index: -1;
    filter: blur(20px);
    transition: opacity 0.3s ease;
    background-size: 300% 300%;
    animation: gradient-rotate 3s ease infinite;
  }

  @keyframes gradient-rotate {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }

  .featured-card:hover .card-glow {
    opacity: 0.5;
  }

  .featured-title {
    font-size: 2rem;
    color: #00ffcc;
    text-align: center;
    margin-bottom: 1.5rem;
    font-family: 'Space Grotesk', sans-serif;
  }

  .featured-link {
    display: block;
    position: relative;
    overflow: hidden;
    border-radius: 12px;
  }

  .featured-image {
    width: 100%;
    display: block;
    border-radius: 12px;
    transition: transform 0.5s ease;
  }

  .featured-overlay {
    position: absolute;
    inset: 0;
    background: rgba(0, 255, 136, 0.9);
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  .featured-link:hover .featured-overlay {
    opacity: 1;
  }

  .featured-link:hover .featured-image {
    transform: scale(1.05);
  }

  .overlay-text {
    font-size: 2rem;
    font-weight: 700;
    color: #0a0e0d;
    font-family: 'Space Grotesk', sans-serif;
  }

  .about-section {
    padding: 4rem 0;
  }

  .about-content {
    background: rgba(13, 127, 74, 0.1);
    border: 1px solid rgba(0, 255, 136, 0.2);
    border-radius: 20px;
    padding: 3rem;
    font-size: 1.2rem;
    line-height: 1.8;
  }

  .about-content p {
    margin-bottom: 1.5rem;
  }

  .schedule-section {
    padding: 4rem 0;
  }

  .schedule-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 3rem;
  }

  .schedule-day {
    background: rgba(13, 127, 74, 0.1);
    border: 1px solid rgba(0, 255, 136, 0.2);
    border-radius: 20px;
    padding: 2rem;
    transition: all 0.3s ease;
  }

  .schedule-day:hover {
    border-color: rgba(0, 255, 136, 0.5);
    transform: translateY(-5px);
  }

  .day-title {
    font-size: 1.5rem;
    color: #00ffcc;
    margin-bottom: 1.5rem;
    font-family: 'Space Grotesk', sans-serif;
  }

  .schedule-items {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .schedule-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    background: rgba(0, 255, 136, 0.05);
    border-radius: 10px;
    transition: all 0.2s ease;
  }

  .schedule-item:hover {
    background: rgba(0, 255, 136, 0.1);
    transform: translateX(5px);
  }

  .schedule-item.highlight {
    border-left: 3px solid #00ff88;
    background: rgba(0, 255, 136, 0.1);
  }

  .time {
    font-family: 'Orbitron', sans-serif;
    font-weight: 700;
    color: #00ff88;
    font-size: 1.1rem;
  }

  .event {
    color: #e8fff5;
    font-weight: 500;
  }

  .sponsors-section {
    padding: 4rem 0 6rem;
  }

  .sponsors-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2rem;
    margin-bottom: 4rem;
  }

  .sponsor-card {
    position: relative;
    background: rgba(13, 127, 74, 0.1);
    border: 2px solid rgba(0, 255, 136, 0.2);
    border-radius: 16px;
    padding: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 150px;
    transition: all 0.3s ease;
    text-decoration: none;
  }

  .sponsor-card:hover {
    border-color: rgba(0, 255, 136, 0.6);
    transform: translateY(-10px) scale(1.05);
    box-shadow: 0 10px 40px rgba(0, 255, 136, 0.3);
  }

  .sponsor-glow {
    position: absolute;
    inset: -2px;
    background: linear-gradient(45deg, #00ff88, #00ffcc);
    border-radius: 16px;
    opacity: 0;
    z-index: -1;
    filter: blur(15px);
    transition: opacity 0.3s ease;
  }

  .sponsor-card:hover .sponsor-glow {
    opacity: 0.4;
  }

  .sponsor-logo {
    max-width: 80%;
    max-height: 100px;
    object-fit: contain;
    filter: brightness(0) invert(1);
    transition: filter 0.3s ease;
  }

  .sponsor-card:hover .sponsor-logo {
    filter: brightness(0) invert(1) drop-shadow(0 0 10px rgba(0, 255, 136, 0.5));
  }

  .run-by {
    text-align: center;
    padding-top: 3rem;
    border-top: 1px solid rgba(0, 255, 136, 0.2);
  }

  .run-by-label {
    font-size: 1.2rem;
    color: #00ffcc;
    margin-bottom: 1.5rem;
    text-transform: uppercase;
    letter-spacing: 2px;
  }

  .run-by-logo {
    display: inline-block;
    transition: transform 0.3s ease;
  }

  .run-by-logo:hover {
    transform: scale(1.1);
  }

  .run-by-logo img {
    max-width: 300px;
    height: auto;
  }

  .rules-section,
  .faq-section {
    padding: 4rem 0;
  }

  .rules-content {
    background: rgba(13, 127, 74, 0.1);
    border: 1px solid rgba(0, 255, 136, 0.2);
    border-radius: 20px;
    padding: 3rem;
  }

  .rules-subtitle {
    font-size: 1.8rem;
    color: #00ffcc;
    margin-bottom: 1rem;
    margin-top: 2rem;
    font-family: 'Space Grotesk', sans-serif;
  }

  .rules-subtitle:first-child {
    margin-top: 0;
  }

  .rules-list {
    list-style: none;
    padding: 0;
  }

  .rules-list li {
    position: relative;
    padding-left: 2rem;
    margin-bottom: 1rem;
    line-height: 1.8;
  }

  .rules-list li::before {
    content: '▸';
    position: absolute;
    left: 0;
    color: #00ff88;
    font-size: 1.5rem;
    line-height: 1.8;
  }

  .inline-link {
    color: #00ffcc;
    text-decoration: underline;
    transition: color 0.3s ease;
  }

  .inline-link:hover {
    color: #00ff88;
  }

  .faq-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 2rem;
  }

  .faq-item {
    background: rgba(13, 127, 74, 0.1);
    border: 1px solid rgba(0, 255, 136, 0.2);
    border-radius: 16px;
    padding: 2rem;
    transition: all 0.3s ease;
  }

  .faq-item:hover {
    border-color: rgba(0, 255, 136, 0.5);
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(0, 255, 136, 0.2);
  }

  .faq-question {
    color: #00ffcc;
    font-size: 1.3rem;
    margin-bottom: 1rem;
    font-family: 'Space Grotesk', sans-serif;
  }

  .faq-answer {
    color: #e8fff5;
    line-height: 1.8;
    font-size: 1.1rem;
    margin-bottom: 0;
  }

  @media (max-width: 768px) {
    .hero-title {
      font-size: 3rem;
    }

    .hero-date {
      font-size: 1.5rem;
    }

    .hero-tagline {
      font-size: 1.2rem;
    }

    .section-title {
      font-size: 2rem;
    }

    .schedule-grid {
      grid-template-columns: 1fr;
    }

    .about-content {
      padding: 2rem;
      font-size: 1rem;
    }

    .rules-content {
      padding: 2rem;
    }

    .faq-grid {
      grid-template-columns: 1fr;
    }
  }
</style>
