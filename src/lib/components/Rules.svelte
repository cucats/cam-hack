<script>
  import { onMount } from "svelte";
  import gsap from "gsap";
  import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

  let sectionElement;

  const rulesSections = [
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
    gsap.registerPlugin(ScrollTrigger);

    gsap.fromTo(
      sectionElement.querySelector("h2"),
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        scrollTrigger: {
          trigger: sectionElement,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      },
    );

    const cards = sectionElement.querySelectorAll(".rules-card");
    cards.forEach((card, index) => {
      gsap.fromTo(
        card,
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          delay: index * 0.2,
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        },
      );
    });
  });
</script>

<section bind:this={sectionElement} class="relative py-24">
  <div class="mx-auto max-w-7xl px-4">
    <h2
      class="glow-text from-primary-400 to-accent-400 mb-12 bg-gradient-to-r bg-clip-text text-center text-transparent"
    >
      Rules
    </h2>

    <div class="grid gap-8 lg:grid-cols-3">
      {#each rulesSections as section, sectionIndex}
        <div
          class="rules-card glass-card group hover:border-primary-500/50 transition-all duration-300"
        >
          <div class="mb-4 flex items-center gap-3">
            <span class="text-3xl">{section.icon}</span>
            <h3 class="text-primary-400 text-xl">{section.title}</h3>
          </div>

          <ul class="space-y-3">
            {#each section.rules as rule, ruleIndex}
              <li class="text-dark-300 flex gap-3">
                <span
                  class="from-primary-400 to-accent-400 mt-1.5 flex h-2 w-2 shrink-0 rounded-full bg-gradient-to-r"
                ></span>
                <span>{rule}</span>
              </li>
            {/each}
          </ul>
        </div>
      {/each}
    </div>

    <div class="mt-8 text-center">
      <a
        href="/code-of-conduct"
        class="text-primary-400 hover:text-primary-300 inline-flex items-center gap-2 transition-colors"
      >
        <svg
          class="h-5 w-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          ></path>
        </svg>
        View Full Code of Conduct
      </a>
    </div>
  </div>

  <div class="section-divider"></div>
</section>
