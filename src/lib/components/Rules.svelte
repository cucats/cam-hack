<script>
  import { onMount } from "svelte";

  let sectionRef;
  let isVisible = $state(false);

  const entryRules = [
    "The maximum team size is 5. Any bigger, and we might have to split you up. Solo participation is allowed, but hacking is better with other people!",
    "Due to departmental rules, participants must be students at the University of Cambridge.",
  ];

  const houseRules = [
    {
      text: "Please do not bring food into the Intel lab! All food must stay downstairs in the street.",
      emoji: "🍕",
    },
    {
      text: "You must not bring or consume alcohol at the hackathon.",
      emoji: "🚫",
    },
    {
      text: "We don't recommend it, but you can stay overnight in the lab if you want.",
      emoji: "😴",
    },
    {
      text: "All participants must follow our Code of Conduct.",
      emoji: "📜",
      link: "/code-of-conduct",
    },
  ];

  const submissionRules = [
    "All work on projects must be done at the hackathon. Using existing open source code is allowed if credited, but the project should be substantially new.",
    "Working on a project and open sourcing it for the sole purpose of using the code in the hackathon is against the spirit of the rules and is not allowed.",
    "AI assistants (Copilot, ChatGPT, etc.) are allowed when writing code, but don't go overboard. For example, using AI assistants as a tool to help you code is fine, but asking one to generate a whole website or the core logic of your application is not allowed.",
    "After hacking finishes, representatives for each track will go around to look at each demo. You are free to look at other projects, as long as one team member is available to present a demo of their project.",
    "If you discover a breaking bug during your demo with a trivial fix, that's okay to rectify. 🐛",
    "Submissions will be made to Devpost.",
  ];

  onMount(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            isVisible = true;
          }
        });
      },
      { threshold: 0.1 },
    );

    observer.observe(sectionRef);

    return () => observer.disconnect();
  });
</script>

<div bind:this={sectionRef} class="relative mx-auto max-w-6xl">
  <div
    class="{isVisible
      ? 'translate-y-0 opacity-100'
      : 'translate-y-10 opacity-0'} transition-all duration-700"
  >
    <h2 class="text-center">
      <span class="gradient-text">&#47;&#42;</span>
      <span class="text-white">Rules</span>
      <span class="gradient-text">&#42;&#47;</span>
    </h2>
  </div>

  <div class="space-y-8">
    <div
      class="cyber-card rounded-2xl p-8 {isVisible
        ? 'translate-y-0 opacity-100'
        : 'translate-y-10 opacity-0'} transition-all delay-200 duration-700"
    >
      <h3 class="text-cyber-green mb-6 flex items-center gap-3">
        <span
          class="bg-cyber-green/20 flex h-10 w-10 items-center justify-center rounded-lg text-xl"
          >📋</span
        >
        Entry
      </h3>
      <ul class="space-y-4">
        {#each entryRules as rule, i}
          <li
            class="flex items-start gap-4 {isVisible
              ? 'translate-x-0 opacity-100'
              : '-translate-x-5 opacity-0'} transition-all duration-500"
            style="transition-delay: {300 + i * 100}ms"
          >
            <span class="text-cyber-green mt-1">▹</span>
            <span class="text-gray-300">{rule}</span>
          </li>
        {/each}
      </ul>
    </div>

    <div
      class="cyber-card rounded-2xl p-8 {isVisible
        ? 'translate-y-0 opacity-100'
        : 'translate-y-10 opacity-0'} transition-all delay-400 duration-700"
    >
      <h3 class="text-cyber-cyan mb-6 flex items-center gap-3">
        <span
          class="bg-cyber-cyan/20 flex h-10 w-10 items-center justify-center rounded-lg text-xl"
          >🏠</span
        >
        House Rules
      </h3>
      <ul class="space-y-4">
        {#each houseRules as rule, i}
          <li
            class="flex items-start gap-4 {isVisible
              ? 'translate-x-0 opacity-100'
              : '-translate-x-5 opacity-0'} transition-all duration-500"
            style="transition-delay: {500 + i * 100}ms"
          >
            <span class="text-xl">{rule.emoji}</span>
            <span class="text-gray-300">
              {#if rule.link}
                {rule.text.replace("Code of Conduct", "")}
                <a
                  href={rule.link}
                  class="text-cyber-cyan hover:text-cyber-green transition-colors"
                  >Code of Conduct</a
                >.
              {:else}
                {rule.text}
              {/if}
            </span>
          </li>
        {/each}
      </ul>
    </div>

    <div
      class="cyber-card rounded-2xl p-8 {isVisible
        ? 'translate-y-0 opacity-100'
        : 'translate-y-10 opacity-0'} transition-all delay-600 duration-700"
    >
      <h3 class="text-cyber-green mb-6 flex items-center gap-3">
        <span
          class="bg-cyber-green/20 flex h-10 w-10 items-center justify-center rounded-lg text-xl"
          >📤</span
        >
        Submission
      </h3>
      <ul class="space-y-4">
        {#each submissionRules as rule, i}
          <li
            class="flex items-start gap-4 {isVisible
              ? 'translate-x-0 opacity-100'
              : '-translate-x-5 opacity-0'} transition-all duration-500"
            style="transition-delay: {700 + i * 100}ms"
          >
            <span class="text-cyber-cyan mt-1">▹</span>
            <span class="text-gray-300">
              {#if rule.includes("Devpost")}
                {rule.replace("Devpost", "")}
                <a
                  href="https://cam-hack-2025.devpost.com"
                  target="_blank"
                  class="text-cyber-green hover:text-cyber-cyan transition-colors"
                  >Devpost</a
                >.
              {:else}
                {rule}
              {/if}
            </span>
          </li>
        {/each}
      </ul>
    </div>
  </div>
</div>
