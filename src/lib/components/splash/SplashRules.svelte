<script>
  import { onMount } from "svelte";

  let visible = $state(false);
  let sectionRef;
  let activeSection = $state(0);

  const ruleSections = [
    {
      title: "Entry",
      icon: "🎫",
      rules: [
        "The maximum team size is 5. Any bigger, and we might have to split you up. Solo participation is allowed, but hacking is better with other people!",
        "Due to departmental rules, participants must be students at the University of Cambridge.",
      ],
    },
    {
      title: "House Rules",
      icon: "🏠",
      rules: [
        "Please do not bring food into the Intel lab! All food must stay downstairs in the street. 🍕",
        "You must not bring or consume alcohol at the hackathon.",
        "We don't recommend it, but you can stay overnight in the lab if you want. 😴",
        "All participants must follow our Code of Conduct.",
      ],
    },
    {
      title: "Submission",
      icon: "📤",
      rules: [
        "All work on projects must be done at the hackathon. Using existing open source code is allowed if credited, but the project should be substantially new.",
        "Working on a project and open sourcing it for the sole purpose of using the code in the hackathon is against the spirit of the rules and is not allowed.",
        "AI assistants (Copilot, ChatGPT, etc.) are allowed when writing code, but don't go overboard.",
        "After hacking finishes, representatives for each track will go around to look at each demo.",
        "If you discover a breaking bug during your demo with a trivial fix, that's okay to rectify. 🐛",
        "Submissions will be made to Devpost.",
      ],
    },
  ];

  onMount(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) visible = true;
        });
      },
      { threshold: 0.2 },
    );

    if (sectionRef) observer.observe(sectionRef);
    return () => observer.disconnect();
  });
</script>

<section bind:this={sectionRef} id="rules" class="rules-section" class:visible>
  <div class="content-wrapper">
    <div class="section-header">
      <h2 class="section-title">Rules</h2>
      <div class="title-underline"></div>
    </div>

    <div class="rules-tabs">
      {#each ruleSections as section, i}
        <button
          class="rule-tab"
          class:active={activeSection === i}
          onclick={() => (activeSection = i)}
        >
          <span class="tab-icon">{section.icon}</span>
          <span class="tab-title">{section.title}</span>
        </button>
      {/each}
    </div>

    <div class="rules-content">
      <div class="rules-card">
        <div class="card-header">
          <span class="header-icon">{ruleSections[activeSection].icon}</span>
          <h3 class="header-title">{ruleSections[activeSection].title}</h3>
        </div>
        <ul class="rules-list">
          {#each ruleSections[activeSection].rules as rule, i}
            <li class="rule-item" style="animation-delay: {i * 0.1}s">
              <div class="rule-bullet"></div>
              <span class="rule-text">{rule}</span>
            </li>
          {/each}
        </ul>
      </div>
    </div>

    <div class="code-of-conduct">
      <a href="/code-of-conduct" class="coc-link">
        <span class="coc-icon">📋</span>
        <span class="coc-text">View Full Code of Conduct</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
        >
          <line x1="5" y1="12" x2="19" y2="12"></line>
          <polyline points="12 5 19 12 12 19"></polyline>
        </svg>
      </a>
    </div>
  </div>
</section>

<style>
  .rules-section {
    padding: 6rem 2rem;
    opacity: 0;
    transform: translateY(50px);
    transition:
      opacity 0.8s ease,
      transform 0.8s ease;
  }

  .rules-section.visible {
    opacity: 1;
    transform: translateY(0);
  }

  .content-wrapper {
    max-width: 900px;
    margin: 0 auto;
  }

  .section-header {
    text-align: center;
    margin-bottom: 4rem;
  }

  .section-title {
    font-size: clamp(2rem, 5vw, 3.5rem);
    color: #e6edf3;
    margin-bottom: 1rem;
  }

  .title-underline {
    width: 100px;
    height: 4px;
    background: linear-gradient(90deg, #ff9f43, #00ff88);
    margin: 0 auto;
    border-radius: 2px;
  }

  .rules-tabs {
    display: flex;
    justify-content: center;
    gap: 1rem;
    margin-bottom: 2rem;
    flex-wrap: wrap;
  }

  .rule-tab {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 1rem 1.5rem;
    background: rgba(22, 27, 34, 0.6);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 50px;
    cursor: pointer;
    transition: all 0.3s ease;
    color: #8b949e;
  }

  .rule-tab:hover {
    border-color: rgba(0, 255, 136, 0.3);
    color: #e6edf3;
  }

  .rule-tab.active {
    border-color: #00ff88;
    background: rgba(0, 255, 136, 0.1);
    color: #00ff88;
    box-shadow: 0 0 20px rgba(0, 255, 136, 0.2);
  }

  .tab-icon {
    font-size: 1.2rem;
  }

  .tab-title {
    font-weight: 600;
  }

  .rules-content {
    margin-bottom: 2rem;
  }

  .rules-card {
    background: rgba(22, 27, 34, 0.6);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 20px;
    padding: 2rem;
    transition: all 0.3s ease;
  }

  .rules-card:hover {
    border-color: rgba(0, 255, 136, 0.2);
  }

  .card-header {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1.5rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }

  .header-icon {
    font-size: 2rem;
  }

  .header-title {
    font-size: 1.5rem;
    color: #e6edf3;
    margin: 0;
  }

  .rules-list {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .rule-item {
    display: flex;
    align-items: flex-start;
    gap: 1rem;
    padding: 1rem 0;
    animation: ruleSlide 0.4s ease-out forwards;
    opacity: 0;
    transform: translateX(-20px);
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  }

  .rule-item:last-child {
    border-bottom: none;
  }

  @keyframes ruleSlide {
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  .rule-bullet {
    width: 8px;
    height: 8px;
    background: linear-gradient(135deg, #00ff88, #0a9254);
    border-radius: 50%;
    margin-top: 0.5rem;
    flex-shrink: 0;
  }

  .rule-text {
    color: #8b949e;
    line-height: 1.6;
  }

  .code-of-conduct {
    text-align: center;
  }

  .coc-link {
    display: inline-flex;
    align-items: center;
    gap: 0.75rem;
    padding: 1rem 2rem;
    background: rgba(153, 69, 255, 0.1);
    border: 1px solid rgba(153, 69, 255, 0.3);
    border-radius: 50px;
    color: #9945ff;
    text-decoration: none;
    transition: all 0.3s ease;
  }

  .coc-link:hover {
    background: rgba(153, 69, 255, 0.2);
    border-color: #9945ff;
    transform: scale(1.05);
    box-shadow: 0 0 20px rgba(153, 69, 255, 0.3);
  }

  .coc-link svg {
    transition: transform 0.3s ease;
  }

  .coc-link:hover svg {
    transform: translateX(5px);
  }

  .coc-icon {
    font-size: 1.2rem;
  }

  .coc-text {
    font-weight: 600;
  }

  @media (max-width: 640px) {
    .rules-tabs {
      flex-direction: column;
      align-items: stretch;
    }

    .rule-tab {
      justify-content: center;
    }

    .rules-card {
      padding: 1.5rem;
    }
  }
</style>
