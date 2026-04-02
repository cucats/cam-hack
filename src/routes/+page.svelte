<script>
  import ThreeBackground from "$lib/components/ThreeBackground.svelte";
  import { sponsors } from "$lib/components/sponsors-data.js";
  import { onMount } from "svelte";

  let daysSince = 0;

  onMount(() => {
    const eventDate = new Date("2025-11-02T18:30:00");
    const now = new Date();
    const diff = now - eventDate;
    daysSince = Math.floor(diff / (1000 * 60 * 60 * 24));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in");
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll(".animate-on-scroll").forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  });
</script>

<svelte:head>
  <title>Cam Hack 2025</title>
</svelte:head>

<ThreeBackground />

<div class="page-wrapper">
  <section class="hero-section">
    <div class="hero-content">
      <div class="logo-container">
        <img
          src="/cam-hack-logo-text.png"
          alt="Cam Hack"
          class="hero-logo animate-float"
        />
      </div>
      <h1 class="hero-title">
        <span class="glitch" data-text="Cam Hack 2025">Cam Hack 2025</span>
      </h1>
      <div class="hero-date">1st - 2nd November</div>
      <div class="countdown-badge">
        <span class="countdown-number">{daysSince}</span>
        <span class="countdown-label">days since event</span>
      </div>
      <div class="cta-buttons">
        <a href="/discord" target="_blank" class="btn btn-primary">
          Join Discord
        </a>
        <a href="/signup" class="btn btn-secondary disabled">
          Signups Closed
        </a>
      </div>
      <p class="hero-tagline">What can you make in 2 days?</p>
    </div>
  </section>

  <section class="featured-section animate-on-scroll">
    <div class="container">
      <h2 class="section-title">
        <span class="title-line"></span>
        <span>Unintended Behaviour</span>
        <span class="title-line"></span>
      </h2>
      <a
        target="_blank"
        href="https://cam-hack-2025.devpost.com"
        class="featured-card"
      >
        <img
          src="/unintended.png"
          alt="Unintended"
          class="featured-image"
        />
      </a>
    </div>
  </section>

  <section class="sponsors-section animate-on-scroll">
    <div class="container">
      <h2 class="section-title">
        <span class="title-line"></span>
        <span>Sponsors</span>
        <span class="title-line"></span>
      </h2>
      <div class="sponsors-grid">
        {#each sponsors as sponsor}
          <a
            href={sponsor.url}
            target="_blank"
            rel="noopener noreferrer"
            class="sponsor-card"
          >
            <img src={sponsor.logo} alt={sponsor.name} class="sponsor-logo" />
          </a>
        {/each}
      </div>
    </div>
  </section>

  <section id="about" class="about-section animate-on-scroll">
    <div class="container">
      <h2 class="section-title">
        <span class="title-line"></span>
        <span>About</span>
        <span class="title-line"></span>
      </h2>
      <div class="content-card">
        <p>
          Cam Hack is a 2 day hackathon for the innovative minds at the
          University of Cambridge. Over an action-packed weekend, students come
          together to design and build technology projects from the ground up.
          We welcome participants ranging from curious beginners to seasoned
          coders. Expect plenty of free stash, food, and mini-events throughout
          this hackathon.
        </p>
        <p>
          For the winning team, each person will receive £200 and can choose
          from a range of prizes including: smartwatches, Steam vouchers, Amazon
          vouchers, or Sony XM4 headphones.
        </p>
      </div>
    </div>
  </section>

  <section id="schedule" class="schedule-section animate-on-scroll">
    <div class="container">
      <h2 class="section-title">
        <span class="title-line"></span>
        <span>Schedule</span>
        <span class="title-line"></span>
      </h2>
      <div class="schedule-grid">
        <div class="schedule-card">
          <h3 class="schedule-day">Saturday 1st November</h3>
          <ul class="schedule-list">
            <li>
              <span class="time">09:30</span>
              <span class="bullet">•</span>
              <span class="event-name emphasis">Breakfast</span>
            </li>
            <li>
              <span class="time">10:00</span>
              <span class="bullet">•</span>
              <span class="event-name">Opening Ceremony</span>
            </li>
            <li>
              <span class="time">10:30</span>
              <span class="bullet">•</span>
              <span class="event-name">Hacking begins!</span>
            </li>
            <li>
              <span class="time">13:00</span>
              <span class="bullet">•</span>
              <span class="event-name emphasis">Lunch</span>
            </li>
            <li>
              <span class="time">18:00</span>
              <span class="bullet">•</span>
              <span class="event-name emphasis">Dinner</span>
            </li>
          </ul>
        </div>
        <div class="schedule-card">
          <h3 class="schedule-day">Sunday 2nd November</h3>
          <ul class="schedule-list">
            <li>
              <span class="time">09:30</span>
              <span class="bullet">•</span>
              <span class="event-name emphasis">Breakfast</span>
            </li>
            <li>
              <span class="time">13:00</span>
              <span class="bullet">•</span>
              <span class="event-name emphasis">Lunch</span>
            </li>
            <li>
              <span class="time">16:30</span>
              <span class="bullet">•</span>
              <span class="event-name">Hacking ends!</span>
            </li>
            <li>
              <span class="time">17:00</span>
              <span class="bullet">•</span>
              <span class="event-name emphasis">Dinner</span>
            </li>
            <li>
              <span class="time">18:00</span>
              <span class="bullet">•</span>
              <span class="event-name">Judging ends</span>
            </li>
            <li>
              <span class="time">18:30</span>
              <span class="bullet">•</span>
              <span class="event-name">Closing ceremony</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>

  <section id="faq" class="faq-section animate-on-scroll">
    <div class="container">
      <h2 class="section-title">
        <span class="title-line"></span>
        <span>FAQ</span>
        <span class="title-line"></span>
      </h2>
      <div class="faq-grid">
        <div class="faq-card">
          <h4 class="faq-question">What is a hackathon?</h4>
          <p class="faq-answer">
            A hackathon is an event where people collaborate to create new
            projects! It usually runs over a weekend and is a great way to learn
            new skills, meet new people, and have fun!
          </p>
        </div>
        <div class="faq-card">
          <h4 class="faq-question">What are the hackathon tracks?</h4>
          <p class="faq-answer">
            All projects submit to a main track, which aligns with the overall
            theme of the event. Participants can optionally submit the same
            project to one or more secondary tracks, whose themes extend the
            main theme in some way.
          </p>
        </div>
        <div class="faq-card">
          <h4 class="faq-question">Can I participate remotely?</h4>
          <p class="faq-answer">
            While online participation is not allowed, it's okay to leave the
            venue for some time to hack elsewhere. We hope to see you at the
            Computer Lab!
          </p>
        </div>
        <div class="faq-card">
          <h4 class="faq-question">How much does it cost?</h4>
          <p class="faq-answer">
            Entry is free and includes food, drinks, and of course, stash!
          </p>
        </div>
        <div class="faq-card">
          <h4 class="faq-question">Where is it?</h4>
          <p class="faq-answer">
            Cam Hack 2025 will be in the Computer Laboratory, also known as the
            William Gates Building.
          </p>
        </div>
        <div class="faq-card">
          <h4 class="faq-question">I don't have a team!</h4>
          <p class="faq-answer">
            If you don't have a team yet, don't hesitate to look around in our
            Discord server. It's also common to form teams at the event itself!
          </p>
        </div>
        <div class="faq-card">
          <h4 class="faq-question">How do I sign up?</h4>
          <p class="faq-answer">
            Signups are now closed. We look forward to seeing you at the event!
          </p>
        </div>
        <div class="faq-card">
          <h4 class="faq-question">I've never hacked before!</h4>
          <p class="faq-answer">
            That's completely fine! Teams often have hackers with a mix of
            experience, including beginners.
          </p>
        </div>
        <div class="faq-card">
          <h4 class="faq-question">Will there be food?</h4>
          <p class="faq-answer">
            Yes! We will provide meals, as well as lots of snacks throughout the
            event! Please let us know if you have any dietary requirements in
            the sign up form.
          </p>
        </div>
        <div class="faq-card">
          <h4 class="faq-question">Can I submit to multiple tracks?</h4>
          <p class="faq-answer">
            Yes, projects can be submitted to multiple tracks.
          </p>
        </div>
        <div class="faq-card">
          <h4 class="faq-question">What can I win?</h4>
          <p class="faq-answer">
            For the winning team, each person will receive £200 and can choose
            from a range of prizes including: smartwatches, Steam vouchers,
            Amazon vouchers, or Sony XM4 headphones.
          </p>
        </div>
        <div class="faq-card">
          <h4 class="faq-question">You didn't answer my questions!</h4>
          <p class="faq-answer">
            You can ask us anything in our Discord server! You can also email us
            at camhack@cucats.org, or speak to us in person at the event.
          </p>
        </div>
      </div>
    </div>
  </section>

  <section class="organizers-section animate-on-scroll">
    <div class="container">
      <h2 class="section-title">
        <span class="title-line"></span>
        <span>Organising Committee</span>
        <span class="title-line"></span>
      </h2>
      <div class="organizers-grid">
        <div class="organizer-card">
          <div class="organizer-image-wrapper">
            <img src="/james.png" alt="James Leung" class="organizer-image" />
          </div>
          <p class="organizer-name">James Leung</p>
        </div>
        <div class="organizer-card">
          <div class="organizer-image-wrapper">
            <img src="/uliana.jpg" alt="Uliana Ronska" class="organizer-image" />
          </div>
          <p class="organizer-name">Uliana Ronska</p>
        </div>
        <div class="organizer-card">
          <div class="organizer-image-wrapper">
            <img src="/athena.jpg" alt="Athena Eng" class="organizer-image" />
          </div>
          <p class="organizer-name">Athena Eng</p>
        </div>
        <div class="organizer-card">
          <div class="organizer-image-wrapper">
            <img
              src="/oliver.png"
              alt="Oliver Greenwood"
              class="organizer-image"
            />
          </div>
          <p class="organizer-name">Oliver Greenwood</p>
        </div>
        <div class="organizer-card">
          <div class="organizer-image-wrapper">
            <img src="/jadon.png" alt="Jadon Mensah" class="organizer-image" />
          </div>
          <p class="organizer-name">Jadon Mensah</p>
        </div>
      </div>
    </div>
  </section>
</div>

<style>
  :global(body) {
    background: #000;
    color: #fff;
    overflow-x: hidden;
  }

  .page-wrapper {
    position: relative;
    z-index: 1;
  }

  .page-wrapper::before {
    content: "";
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: repeating-linear-gradient(
      0deg,
      rgba(16, 185, 129, 0.03) 0px,
      transparent 1px,
      transparent 2px,
      rgba(16, 185, 129, 0.03) 3px
    );
    pointer-events: none;
    z-index: 1000;
    animation: scanlines 8s linear infinite;
  }

  @keyframes scanlines {
    0% {
      transform: translateY(0);
    }
    100% {
      transform: translateY(10px);
    }
  }

  section {
    padding: 6rem 2rem;
    position: relative;
  }

  .container {
    max-width: 1200px;
    margin: 0 auto;
  }

  .hero-section {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 2rem;
    position: relative;
    overflow: hidden;
  }

  .hero-section::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: 
      linear-gradient(rgba(16, 185, 129, 0.05) 1px, transparent 1px),
      linear-gradient(90deg, rgba(16, 185, 129, 0.05) 1px, transparent 1px);
    background-size: 50px 50px;
    animation: grid-move 20s linear infinite;
    pointer-events: none;
  }

  @keyframes grid-move {
    0% {
      transform: translate(0, 0);
    }
    100% {
      transform: translate(50px, 50px);
    }
  }

  .hero-section::after {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    width: 600px;
    height: 600px;
    background: radial-gradient(
      circle,
      rgba(16, 185, 129, 0.15) 0%,
      transparent 70%
    );
    transform: translate(-50%, -50%);
    pointer-events: none;
    animation: pulse-circle 4s ease-in-out infinite;
  }

  @keyframes pulse-circle {
    0%, 100% {
      transform: translate(-50%, -50%) scale(1);
      opacity: 0.5;
    }
    50% {
      transform: translate(-50%, -50%) scale(1.2);
      opacity: 0.8;
    }
  }

  .hero-content {
    max-width: 900px;
  }

  .logo-container {
    margin-bottom: 2rem;
  }

  .hero-logo {
    width: 200px;
    height: 200px;
    filter: drop-shadow(0 0 30px rgba(16, 185, 129, 0.5));
  }

  @keyframes float {
    0%,
    100% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(-20px);
    }
  }

  .animate-float {
    animation: float 3s ease-in-out infinite;
  }

  .hero-title {
    font-size: clamp(3rem, 8vw, 6rem);
    font-weight: 900;
    margin: 2rem 0;
    letter-spacing: -0.02em;
  }

  .glitch {
    position: relative;
    color: #10b981;
    text-shadow: 0 0 20px rgba(16, 185, 129, 0.5),
                 0 0 40px rgba(16, 185, 129, 0.3);
  }

  @keyframes glitch {
    0% {
      text-shadow: 0.05em 0 0 rgba(255, 0, 0, 0.75),
        -0.05em -0.025em 0 rgba(0, 255, 0, 0.75),
        -0.025em 0.05em 0 rgba(0, 0, 255, 0.75);
    }
    14% {
      text-shadow: 0.05em 0 0 rgba(255, 0, 0, 0.75),
        -0.05em -0.025em 0 rgba(0, 255, 0, 0.75),
        -0.025em 0.05em 0 rgba(0, 0, 255, 0.75);
    }
    15% {
      text-shadow: -0.05em -0.025em 0 rgba(255, 0, 0, 0.75),
        0.025em 0.025em 0 rgba(0, 255, 0, 0.75),
        -0.05em -0.05em 0 rgba(0, 0, 255, 0.75);
    }
    49% {
      text-shadow: -0.05em -0.025em 0 rgba(255, 0, 0, 0.75),
        0.025em 0.025em 0 rgba(0, 255, 0, 0.75),
        -0.05em -0.05em 0 rgba(0, 0, 255, 0.75);
    }
    50% {
      text-shadow: 0.025em 0.05em 0 rgba(255, 0, 0, 0.75),
        0.05em 0 0 rgba(0, 255, 0, 0.75), 0 -0.05em 0 rgba(0, 0, 255, 0.75);
    }
    99% {
      text-shadow: 0.025em 0.05em 0 rgba(255, 0, 0, 0.75),
        0.05em 0 0 rgba(0, 255, 0, 0.75), 0 -0.05em 0 rgba(0, 0, 255, 0.75);
    }
    100% {
      text-shadow: -0.025em 0 0 rgba(255, 0, 0, 0.75),
        -0.025em -0.025em 0 rgba(0, 255, 0, 0.75),
        -0.025em -0.05em 0 rgba(0, 0, 255, 0.75);
    }
  }

  .glitch:hover {
    animation: glitch 0.5s infinite;
  }

  .hero-date {
    font-size: clamp(1.5rem, 3vw, 2.5rem);
    color: #34d399;
    margin-bottom: 2rem;
    font-weight: 600;
    text-shadow: 0 0 10px rgba(52, 211, 153, 0.5);
  }

  .countdown-badge {
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    background: rgba(16, 185, 129, 0.1);
    border: 2px solid #10b981;
    border-radius: 20px;
    padding: 2rem 3rem;
    margin: 2rem 0;
    box-shadow: 0 0 40px rgba(16, 185, 129, 0.3);
    backdrop-filter: blur(10px);
  }

  .countdown-number {
    font-size: 4rem;
    font-weight: 900;
    color: #10b981;
    line-height: 1;
    text-shadow: 0 0 20px rgba(16, 185, 129, 0.8);
  }

  .countdown-label {
    font-size: 1.2rem;
    color: #6ee7b7;
    margin-top: 0.5rem;
    text-transform: uppercase;
    letter-spacing: 0.1em;
  }

  .cta-buttons {
    display: flex;
    gap: 1.5rem;
    justify-content: center;
    margin: 3rem 0 2rem;
    flex-wrap: wrap;
  }

  .btn {
    padding: 1.2rem 2.5rem;
    font-size: 1.1rem;
    font-weight: 700;
    border-radius: 15px;
    text-decoration: none;
    transition: all 0.3s ease;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    position: relative;
    overflow: hidden;
  }

  .btn::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 50%;
    transform: translate(-50%, -50%);
    transition: width 0.6s, height 0.6s;
  }

  .btn:hover::before {
    width: 300px;
    height: 300px;
  }

  .btn-primary {
    background: linear-gradient(135deg, #10b981, #059669);
    color: #fff;
    border: 2px solid #10b981;
    box-shadow: 0 0 30px rgba(16, 185, 129, 0.4);
  }

  .btn-primary:hover {
    transform: translateY(-3px);
    box-shadow: 0 0 50px rgba(16, 185, 129, 0.6);
  }

  .btn-secondary {
    background: rgba(100, 116, 139, 0.3);
    color: #94a3b8;
    border: 2px solid #475569;
  }

  .btn-secondary.disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }

  .hero-tagline {
    font-size: 1.5rem;
    color: #6ee7b7;
    margin-top: 2rem;
    text-shadow: 0 0 10px rgba(110, 231, 183, 0.5);
    animation: text-flicker 5s ease-in-out infinite;
  }

  @keyframes text-flicker {
    0%, 19%, 21%, 23%, 25%, 54%, 56%, 100% {
      text-shadow: 
        0 0 10px rgba(110, 231, 183, 0.5),
        0 0 20px rgba(110, 231, 183, 0.3);
      opacity: 1;
    }
    20%, 24%, 55% {
      text-shadow: none;
      opacity: 0.8;
    }
  }

  .section-title {
    font-size: clamp(2.5rem, 5vw, 4rem);
    font-weight: 900;
    text-align: center;
    margin-bottom: 4rem;
    color: #10b981;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 2rem;
    text-shadow: 0 0 20px rgba(16, 185, 129, 0.5);
  }

  .title-line {
    flex: 1;
    height: 2px;
    background: linear-gradient(
      to right,
      transparent,
      #10b981,
      transparent
    );
    max-width: 200px;
  }

  .featured-section {
    background: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(10px);
  }

  .featured-card {
    display: block;
    border-radius: 30px;
    overflow: hidden;
    transition: all 0.5s ease;
    border: 3px solid #10b981;
    box-shadow: 
      0 0 50px rgba(16, 185, 129, 0.3),
      inset 0 0 50px rgba(16, 185, 129, 0.1);
    position: relative;
  }

  .featured-card::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      135deg,
      rgba(16, 185, 129, 0.2) 0%,
      transparent 50%,
      rgba(52, 211, 153, 0.2) 100%
    );
    opacity: 0;
    transition: opacity 0.5s ease;
    pointer-events: none;
  }

  .featured-card:hover::before {
    opacity: 1;
  }

  .featured-card::after {
    content: "";
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: linear-gradient(
      45deg,
      transparent,
      rgba(16, 185, 129, 0.3),
      transparent
    );
    transform: rotate(45deg);
    transition: all 0.6s ease;
  }

  .featured-card:hover::after {
    left: 100%;
  }

  .featured-card:hover {
    transform: scale(1.02) translateY(-10px);
    box-shadow: 
      0 0 80px rgba(16, 185, 129, 0.5),
      0 0 120px rgba(16, 185, 129, 0.3),
      inset 0 0 50px rgba(16, 185, 129, 0.2);
  }

  .featured-image {
    width: 100%;
    display: block;
  }

  .sponsors-section {
    background: rgba(10, 15, 10, 0.8);
    backdrop-filter: blur(10px);
  }

  .sponsors-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 3rem;
    align-items: center;
  }

  .sponsor-card {
    background: rgba(16, 185, 129, 0.05);
    border: 2px solid rgba(16, 185, 129, 0.2);
    border-radius: 20px;
    padding: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.4s ease;
    min-height: 150px;
    position: relative;
    overflow: hidden;
  }

  .sponsor-card::before {
    content: "";
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(16, 185, 129, 0.2),
      transparent
    );
    transition: left 0.5s ease;
  }

  .sponsor-card:hover::before {
    left: 100%;
  }

  .sponsor-card:hover {
    background: rgba(16, 185, 129, 0.1);
    border-color: #10b981;
    transform: translateY(-10px) scale(1.05);
    box-shadow: 0 20px 60px rgba(16, 185, 129, 0.3);
  }

  .sponsor-logo {
    max-width: 100%;
    max-height: 100px;
    object-fit: contain;
    filter: brightness(1.2);
  }

  .about-section {
    background: rgba(0, 0, 0, 0.6);
    backdrop-filter: blur(10px);
  }

  .content-card {
    background: rgba(16, 185, 129, 0.05);
    border: 2px solid rgba(16, 185, 129, 0.3);
    border-radius: 25px;
    padding: 3rem;
    box-shadow: 0 0 40px rgba(16, 185, 129, 0.2);
    position: relative;
    overflow: hidden;
  }

  .content-card::before {
    content: "";
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    background: linear-gradient(
      45deg,
      #10b981,
      #34d399,
      #6ee7b7,
      #10b981
    );
    border-radius: 25px;
    opacity: 0;
    z-index: -1;
    transition: opacity 0.4s ease;
    background-size: 400% 400%;
    animation: gradient-border 3s ease infinite;
  }

  .content-card:hover::before {
    opacity: 0.3;
  }

  @keyframes gradient-border {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }

  .content-card p {
    font-size: 1.2rem;
    line-height: 1.8;
    color: #d1fae5;
    margin-bottom: 1.5rem;
  }

  .content-card p:last-child {
    margin-bottom: 0;
  }

  .schedule-section {
    background: rgba(10, 15, 10, 0.8);
    backdrop-filter: blur(10px);
  }

  .schedule-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 3rem;
  }

  .schedule-card {
    background: rgba(16, 185, 129, 0.05);
    border: 2px solid rgba(16, 185, 129, 0.3);
    border-radius: 25px;
    padding: 2.5rem;
    transition: all 0.4s ease;
    position: relative;
    overflow: hidden;
  }

  .schedule-card::after {
    content: "";
    position: absolute;
    top: -50%;
    right: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(
      circle,
      rgba(16, 185, 129, 0.1) 0%,
      transparent 60%
    );
    opacity: 0;
    transition: opacity 0.4s ease, transform 0.4s ease;
  }

  .schedule-card:hover::after {
    opacity: 1;
    transform: translate(-25%, -25%);
  }

  .schedule-card:hover {
    transform: translateY(-10px);
    border-color: #10b981;
    box-shadow: 0 20px 60px rgba(16, 185, 129, 0.3);
  }

  .schedule-day {
    font-size: 1.8rem;
    color: #10b981;
    margin-bottom: 2rem;
    text-shadow: 0 0 10px rgba(16, 185, 129, 0.5);
  }

  .schedule-list {
    list-style: none;
    padding: 0;
  }

  .schedule-list li {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1rem 0;
    border-bottom: 1px solid rgba(16, 185, 129, 0.1);
    transition: all 0.3s ease;
  }

  .schedule-list li:last-child {
    border-bottom: none;
  }

  .schedule-list li:hover {
    padding-left: 1rem;
    background: rgba(16, 185, 129, 0.05);
  }

  .time {
    font-weight: 700;
    color: #34d399;
    min-width: 60px;
  }

  .bullet {
    color: #10b981;
  }

  .event-name {
    color: #d1fae5;
  }

  .event-name.emphasis {
    font-style: italic;
    color: #6ee7b7;
  }

  .faq-section {
    background: rgba(0, 0, 0, 0.6);
    backdrop-filter: blur(10px);
  }

  .faq-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
  }

  .faq-card {
    background: rgba(16, 185, 129, 0.05);
    border: 2px solid rgba(16, 185, 129, 0.2);
    border-radius: 20px;
    padding: 2rem;
    transition: all 0.4s ease;
    position: relative;
  }

  .faq-card::before,
  .faq-card::after {
    content: "";
    position: absolute;
    width: 20px;
    height: 20px;
    border: 2px solid #10b981;
    opacity: 0;
    transition: opacity 0.4s ease;
  }

  .faq-card::before {
    top: -2px;
    left: -2px;
    border-right: none;
    border-bottom: none;
  }

  .faq-card::after {
    bottom: -2px;
    right: -2px;
    border-left: none;
    border-top: none;
  }

  .faq-card:hover::before,
  .faq-card:hover::after {
    opacity: 1;
  }

  .faq-card:hover {
    transform: translateY(-5px);
    border-color: #10b981;
    box-shadow: 0 15px 40px rgba(16, 185, 129, 0.3);
  }

  .faq-question {
    font-size: 1.3rem;
    color: #10b981;
    margin-bottom: 1rem;
    font-weight: 700;
  }

  .faq-answer {
    color: #d1fae5;
    line-height: 1.6;
    font-size: 1rem;
  }

  .organizers-section {
    background: rgba(10, 15, 10, 0.8);
    backdrop-filter: blur(10px);
    padding-bottom: 8rem;
  }

  .organizers-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 3rem;
    justify-items: center;
  }

  .organizer-card {
    text-align: center;
    transition: all 0.4s ease;
    position: relative;
  }

  .organizer-card::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    border-radius: 50%;
    background: radial-gradient(
      circle,
      rgba(16, 185, 129, 0.3) 0%,
      transparent 70%
    );
    transform: translate(-50%, -50%);
    transition: all 0.4s ease;
    pointer-events: none;
  }

  .organizer-card:hover::before {
    width: 300px;
    height: 300px;
  }

  .organizer-card:hover {
    transform: translateY(-15px);
  }

  .organizer-image-wrapper {
    width: 180px;
    height: 180px;
    margin: 0 auto 1.5rem;
    border-radius: 50%;
    overflow: hidden;
    border: 4px solid #10b981;
    box-shadow: 0 0 30px rgba(16, 185, 129, 0.4);
    transition: all 0.4s ease;
    position: relative;
  }

  .organizer-image-wrapper::before {
    content: "";
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: linear-gradient(
      45deg,
      transparent 30%,
      rgba(255, 255, 255, 0.3) 50%,
      transparent 70%
    );
    transform: rotate(45deg);
    opacity: 0;
    transition: opacity 0.4s ease;
  }

  .organizer-card:hover .organizer-image-wrapper::before {
    opacity: 1;
    animation: shine 1.5s ease-in-out;
  }

  @keyframes shine {
    0% {
      left: -100%;
    }
    100% {
      left: 100%;
    }
  }

  .organizer-card:hover .organizer-image-wrapper {
    box-shadow: 
      0 0 50px rgba(16, 185, 129, 0.6),
      0 0 80px rgba(16, 185, 129, 0.4);
    transform: scale(1.1) rotate(5deg);
  }

  .organizer-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .organizer-name {
    font-size: 1.2rem;
    color: #d1fae5;
    font-weight: 600;
  }

  .animate-on-scroll {
    opacity: 0;
    transform: translateY(50px);
    transition: opacity 0.8s ease-out, transform 0.8s ease-out;
  }

  .animate-on-scroll.animate-in {
    opacity: 1;
    transform: translateY(0);
  }

  @keyframes pulse-glow {
    0%, 100% {
      box-shadow: 0 0 40px rgba(16, 185, 129, 0.3);
    }
    50% {
      box-shadow: 0 0 80px rgba(16, 185, 129, 0.6);
    }
  }

  .countdown-badge {
    animation: pulse-glow 3s ease-in-out infinite;
  }

  @keyframes matrix-rain {
    0% {
      opacity: 0;
      transform: translateY(-20px);
    }
    50% {
      opacity: 1;
    }
    100% {
      opacity: 0;
      transform: translateY(20px);
    }
  }

  .sponsor-card:nth-child(odd) {
    animation-delay: 0.1s;
  }

  .sponsor-card:nth-child(even) {
    animation-delay: 0.2s;
  }

  @keyframes shimmer {
    0% {
      background-position: -1000px 0;
    }
    100% {
      background-position: 1000px 0;
    }
  }

  .section-title span:not(.title-line) {
    background: linear-gradient(
      90deg,
      #10b981 0%,
      #6ee7b7 25%,
      #10b981 50%,
      #6ee7b7 75%,
      #10b981 100%
    );
    background-size: 200% 100%;
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: shimmer 3s linear infinite;
  }

  .faq-card:hover {
    animation: pulse-glow 1.5s ease-in-out infinite;
  }

  @keyframes rotate-border {
    0% {
      filter: hue-rotate(0deg);
    }
    100% {
      filter: hue-rotate(360deg);
    }
  }

  .organizer-image-wrapper:hover {
    animation: rotate-border 2s linear infinite;
  }

  @media (max-width: 768px) {
    section {
      padding: 4rem 1rem;
    }

    .section-title {
      font-size: 2rem;
      gap: 1rem;
    }

    .title-line {
      max-width: 50px;
    }

    .hero-title {
      font-size: 2.5rem;
    }

    .countdown-badge {
      padding: 1.5rem 2rem;
    }

    .countdown-number {
      font-size: 3rem;
    }

    .cta-buttons {
      flex-direction: column;
      align-items: stretch;
    }

    .btn {
      width: 100%;
    }
  }
</style>
