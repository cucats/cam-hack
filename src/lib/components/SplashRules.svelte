<script>
  import { onMount } from "svelte";

  let visible = $state(false);
  let sectionRef;

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

    if (sectionRef) observer.observe(sectionRef);

    return () => observer.disconnect();
  });

  const sections = [
    {
      title: "Entry",
      icon: "🎟️",
      rules: [
        "The maximum team size is 5. Any bigger, and we might have to split you up. Solo participation is allowed, but hacking is better with other people!",
        "Due to departmental rules, participants must be students at the University of Cambridge.",
      ],
    },
    {
      title: "House Rules",
      icon: "🏠",
      rules: [
        "Please do not bring food into the Intel lab! All food must stay downstairs in the street.",
        "You must not bring or consume alcohol at the hackathon.",
        "We don't recommend it, but you can stay overnight in the lab if you want.",
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
        "If you discover a breaking bug during your demo with a trivial fix, that's okay to rectify.",
        "Submissions will be made to Devpost.",
      ],
    },
  ];
</script>

<div bind:this={sectionRef} class="mx-auto max-w-7xl py-20">
  <h2 class="text-4xl sm:text-5xl md:text-6xl font-bold text-center mb-16">
    <span class="gradient-text">Rules</span>
  </h2>

  <div class="grid md:grid-cols-3 gap-8">
    {#each sections as section, i}
      <div
        class="card rules-card"
        style="animation-delay: {i * 0.15}s"
        class:visible
      >
        <div class="text-4xl mb-4">{section.icon}</div>
        <h3 class="text-2xl font-bold mb-6 neon-text-subtle">{section.title}</h3>
        <ul class="space-y-4">
          {#each section.rules as rule}
            <li class="flex items-start gap-3 text-gray-400 text-sm leading-relaxed">
              <span class="text-neon-green mt-1">▹</span>
              <span>{rule}</span>
            </li>
          {/each}
        </ul>
      </div>
    {/each}
  </div>

  <div class="text-center mt-12">
    <a
      href="/code-of-conduct"
      class="inline-flex items-center gap-2 text-neon-green hover:text-neon-cyan transition-colors duration-300 font-bold"
    >
      <span>View Code of Conduct</span>
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
      </svg>
    </a>
  </div>
</div>

<style>
  .rules-card {
    opacity: 0;
    transform: translateY(30px);
  }

  .rules-card.visible {
    animation: fade-up 0.6s ease-out forwards;
  }

  @keyframes fade-up {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
</style>
