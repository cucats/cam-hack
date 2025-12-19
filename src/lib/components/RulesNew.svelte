<script>
  import { onMount } from "svelte";

  let visible = $state(false);
  let sectionRef;
  let activeTab = $state(0);

  const ruleSections = [
    {
      title: "Entry",
      icon: "🎟️",
      rules: [
        "The maximum team size is 5. Any bigger, and we might have to split you up. Solo participation is allowed, but hacking is better with other people!",
        "Due to departmental rules, participants must be students at the University of Cambridge.",
      ],
    },
    {
      title: "House rules",
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
        "AI assistants (Copilot, ChatGPT, etc.) are allowed when writing code, but don't go overboard. For example, using AI assistants as a tool to help you code is fine, but asking one to generate a whole website or the core logic of your application is not allowed.",
        "After hacking finishes, representatives for each track will go around to look at each demo. You are free to look at other projects, as long as one team member is available to present a demo of their project.",
        "If you discover a breaking bug during your demo with a trivial fix, that's okay to rectify. 🐛",
        "Submissions will be made to Devpost.",
      ],
    },
  ];

  onMount(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            visible = true;
          }
        });
      },
      { threshold: 0.2 },
    );

    if (sectionRef) {
      observer.observe(sectionRef);
    }

    return () => observer.disconnect();
  });
</script>

<div bind:this={sectionRef} class="relative overflow-hidden py-24 sm:py-32">
  <div class="grid-pattern absolute inset-0 opacity-30"></div>

  <div class="relative z-10 mx-auto max-w-7xl px-4 sm:px-8">
    <div class="mb-16 text-center" class:visible>
      <h2 class="section-title text-gradient mx-auto">Rules</h2>
    </div>

    <div class="rules-container" class:visible>
      <div class="tabs mb-8 flex flex-wrap justify-center gap-4">
        {#each ruleSections as section, index}
          <button
            class="tab-btn flex items-center gap-2 rounded-xl px-6 py-3 font-semibold transition-all duration-300"
            class:active={activeTab === index}
            onclick={() => (activeTab = index)}
          >
            <span class="text-xl">{section.icon}</span>
            <span>{section.title}</span>
          </button>
        {/each}
      </div>

      <div class="rules-content mx-auto max-w-3xl">
        <div class="card p-8">
          <h3
            class="mb-6 flex items-center gap-3 text-2xl font-bold text-gray-100"
          >
            <span class="text-3xl">{ruleSections[activeTab].icon}</span>
            {ruleSections[activeTab].title}
          </h3>

          <ul class="space-y-4">
            {#each ruleSections[activeTab].rules as rule, index}
              <li
                class="rule-item flex items-start gap-4 rounded-lg bg-white/5 p-4 transition-all duration-300 hover:bg-white/10"
                style="animation-delay: {index * 0.1}s"
              >
                <span
                  class="bg-hack-green/20 text-hack-green flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full text-sm font-bold"
                >
                  {index + 1}
                </span>
                <span class="text-gray-300">{rule}</span>
              </li>
            {/each}
          </ul>
        </div>
      </div>
    </div>
  </div>
</div>

<style>
  .section-title::after {
    left: 50%;
    transform: translateX(-50%);
  }

  div:has(.section-title),
  .rules-container {
    opacity: 0;
    transform: translateY(30px);
    transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
  }

  div.visible:has(.section-title),
  .visible.rules-container {
    opacity: 1;
    transform: translateY(0);
  }

  .tab-btn {
    background: rgba(255, 255, 255, 0.05);
    color: #9ca3af;
    border: 1px solid rgba(255, 255, 255, 0.1);
  }

  .tab-btn:hover {
    background: rgba(255, 255, 255, 0.1);
    color: #e5e7eb;
  }

  .tab-btn.active {
    background: linear-gradient(
      135deg,
      rgba(16, 185, 129, 0.2),
      rgba(6, 182, 212, 0.2)
    );
    color: #10b981;
    border-color: rgba(16, 185, 129, 0.5);
    box-shadow: 0 0 20px rgba(16, 185, 129, 0.2);
  }

  .rule-item {
    animation: fadeIn 0.4s ease-out forwards;
    opacity: 0;
  }

  .visible .rule-item {
    animation: fadeIn 0.4s ease-out forwards;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .bg-hack-green\/20 {
    background-color: rgba(16, 185, 129, 0.2);
  }

  .text-hack-green {
    color: #10b981;
  }
</style>
