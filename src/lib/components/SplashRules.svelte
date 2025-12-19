<script>
  import { onMount } from 'svelte';

  let visible = $state(false);

  onMount(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            visible = true;
          }
        });
      },
      { threshold: 0.2 }
    );

    const element = document.querySelector('#rules');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  });
</script>

<section id="rules" class="rules-section" class:visible>
  <div class="rules-container">
    <h2 class="section-title">
      <span class="title-line"></span>
      <span class="title-text">Rules</span>
      <span class="title-line"></span>
    </h2>
    
    <div class="rules-grid">
      <div class="rule-category">
        <h3 class="category-title">Entry</h3>
        <div class="rule-list">
          <div class="rule-item">
            <div class="rule-bullet"></div>
            <p>The maximum team size is 5. Any bigger, and we might have to split you up. Solo participation is allowed, but hacking is better with other people!</p>
          </div>
          <div class="rule-item">
            <div class="rule-bullet"></div>
            <p>Due to departmental rules, participants must be students at the University of Cambridge.</p>
          </div>
        </div>
      </div>

      <div class="rule-category">
        <h3 class="category-title">House Rules</h3>
        <div class="rule-list">
          <div class="rule-item">
            <div class="rule-bullet"></div>
            <p>Please do not bring food into the Intel lab! All food must stay downstairs in the street.</p>
          </div>
          <div class="rule-item">
            <div class="rule-bullet"></div>
            <p>You must not bring or consume alcohol at the hackathon.</p>
          </div>
          <div class="rule-item">
            <div class="rule-bullet"></div>
            <p>We don't recommend it, but you can stay overnight in the lab if you want.</p>
          </div>
          <div class="rule-item">
            <div class="rule-bullet"></div>
            <p>All participants must follow our <a href="/code-of-conduct" class="link">Code of Conduct</a>.</p>
          </div>
        </div>
      </div>

      <div class="rule-category">
        <h3 class="category-title">Submission</h3>
        <div class="rule-list">
          <div class="rule-item">
            <div class="rule-bullet"></div>
            <p>All work on projects must be done at the hackathon. Using existing open source code is allowed if credited, but the project should be substantially new.</p>
          </div>
          <div class="rule-item">
            <div class="rule-bullet"></div>
            <p>Working on a project and open sourcing it for the sole purpose of using the code in the hackathon is against the spirit of the rules and is not allowed.</p>
          </div>
          <div class="rule-item">
            <div class="rule-bullet"></div>
            <p>AI assistants (Copilot, ChatGPT, etc.) are allowed when writing code, but don't go overboard. For example, using AI assistants as a tool to help you code is fine, but asking one to generate a whole website or the core logic of your application is not allowed.</p>
          </div>
          <div class="rule-item">
            <div class="rule-bullet"></div>
            <p>After hacking finishes, representatives for each track will go around to look at each demo. You are free to look at other projects, as long as one team member is available to present a demo of their project.</p>
          </div>
          <div class="rule-item">
            <div class="rule-bullet"></div>
            <p>If you discover a breaking bug during your demo with a trivial fix, that's okay to rectify.</p>
          </div>
          <div class="rule-item">
            <div class="rule-bullet"></div>
            <p>Submissions will be made to <a href="https://cam-hack-2025.devpost.com" class="link">Devpost</a>.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Space+Mono:wght@400;700&display=swap');

  .rules-section {
    position: relative;
    padding: 8rem 2rem;
    background: linear-gradient(180deg, #0a0e27 0%, #1a1e3f 100%);
    overflow: hidden;
    opacity: 0;
    transform: translateY(50px);
    transition: all 1s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .rules-section.visible {
    opacity: 1;
    transform: translateY(0);
  }

  .rules-section::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, #00ccff, transparent);
  }

  .rules-container {
    max-width: 1400px;
    margin: 0 auto;
  }

  .section-title {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 2rem;
    margin-bottom: 4rem;
  }

  .title-line {
    flex: 1;
    height: 2px;
    background: linear-gradient(90deg, transparent, #00ccff, transparent);
    max-width: 200px;
  }

  .title-text {
    font-family: 'Orbitron', monospace;
    font-size: clamp(2rem, 5vw, 3.5rem);
    font-weight: 900;
    color: #00ccff;
    text-shadow: 0 0 20px rgba(0, 204, 255, 0.5);
    text-transform: uppercase;
    letter-spacing: 0.1em;
    white-space: nowrap;
  }

  .rules-grid {
    display: grid;
    gap: 3rem;
  }

  .rule-category {
    position: relative;
    background: linear-gradient(135deg, rgba(0, 204, 255, 0.05), rgba(255, 0, 170, 0.05));
    border: 2px solid rgba(0, 204, 255, 0.2);
    border-radius: 25px;
    padding: 3rem;
    backdrop-filter: blur(10px);
    transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
    opacity: 0;
    transform: translateY(30px);
    animation: fadeInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
  }

  .rule-category:nth-child(2) {
    animation-delay: 0.2s;
  }

  .rule-category:nth-child(3) {
    animation-delay: 0.4s;
  }

  .rules-section.visible .rule-category {
    opacity: 1;
    transform: translateY(0);
  }

  @keyframes fadeInUp {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .rule-category:hover {
    border-color: rgba(0, 204, 255, 0.5);
    box-shadow: 0 20px 60px rgba(0, 204, 255, 0.3);
    transform: translateY(-5px);
  }

  .category-title {
    font-family: 'Orbitron', monospace;
    font-size: 2rem;
    font-weight: 700;
    color: #00ff88;
    margin-bottom: 2rem;
    text-shadow: 0 0 15px rgba(0, 255, 136, 0.5);
  }

  .rule-list {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .rule-item {
    display: flex;
    gap: 1rem;
    align-items: flex-start;
    padding: 1rem;
    border-radius: 15px;
    background: rgba(0, 0, 0, 0.2);
    transition: all 0.3s ease;
  }

  .rule-item:hover {
    background: rgba(0, 204, 255, 0.1);
    transform: translateX(10px);
  }

  .rule-bullet {
    width: 12px;
    height: 12px;
    min-width: 12px;
    background: linear-gradient(135deg, #00ff88, #00ccff);
    border-radius: 50%;
    margin-top: 8px;
    box-shadow: 0 0 10px rgba(0, 255, 136, 0.5);
  }

  .rule-item p {
    font-family: 'Space Mono', monospace;
    font-size: 1rem;
    line-height: 1.7;
    color: rgba(255, 255, 255, 0.9);
    margin: 0;
  }

  .link {
    color: #00ff88;
    text-decoration: none;
    transition: all 0.3s ease;
    border-bottom: 1px solid transparent;
  }

  .link:hover {
    color: #00ccff;
    border-bottom-color: #00ccff;
  }

  @media (max-width: 768px) {
    .rules-section {
      padding: 4rem 1rem;
    }

    .rule-category {
      padding: 2rem 1.5rem;
    }

    .section-title {
      gap: 1rem;
    }

    .title-line {
      max-width: 50px;
    }

    .category-title {
      font-size: 1.5rem;
    }

    .rule-item p {
      font-size: 0.9rem;
    }
  }
</style>
