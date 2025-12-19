<script>
  import { onMount } from 'svelte';

  let visible = $state(false);
  let sectionEl;

  const entryRules = [
    'The maximum team size is 5. Any bigger, and we might have to split you up. Solo participation is allowed, but hacking is better with other people!',
    'Due to departmental rules, participants must be students at the University of Cambridge.',
  ];

  const houseRules = [
    'Please do not bring food into the Intel lab! All food must stay downstairs in the street. 🍕',
    'You must not bring or consume alcohol at the hackathon.',
    "We don't recommend it, but you can stay overnight in the lab if you want. 😴",
    'All participants must follow our Code of Conduct.',
  ];

  const submissionRules = [
    'All work on projects must be done at the hackathon. Using existing open source code is allowed if credited, but the project should be substantially new.',
    'Working on a project and open sourcing it for the sole purpose of using the code in the hackathon is against the spirit of the rules and is not allowed.',
    "AI assistants (Copilot, ChatGPT, etc.) are allowed when writing code, but don't go overboard. For example, using AI assistants as a tool to help you code is fine, but asking one to generate a whole website or the core logic of your application is not allowed.",
    'After hacking finishes, representatives for each track will go around to look at each demo.',
    'If you discover a breaking bug during your demo with a trivial fix, that\'s okay to rectify. 🐛',
    'Submissions will be made to Devpost.',
  ];

  onMount(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) visible = true;
        });
      },
      { threshold: 0.1 }
    );
    if (sectionEl) observer.observe(sectionEl);
    return () => observer.disconnect();
  });
</script>

<section id="rules" bind:this={sectionEl} class="relative py-24 px-4 sm:px-8">
  <div class="max-w-5xl mx-auto">
    <div class="text-center mb-16 opacity-0 {visible ? 'animate-slide-up' : ''}">
      <h2 class="font-display text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
        <span class="bg-gradient-to-r from-emerald-400 to-green-300 bg-clip-text text-transparent glow-text">
          Rules
        </span>
      </h2>
      <div class="w-24 h-1 bg-gradient-to-r from-emerald-400 to-green-300 mx-auto rounded-full"></div>
    </div>

    <div class="space-y-8">
      <div class="glass-card p-8 opacity-0 {visible ? 'animate-slide-in-left delay-200' : ''}">
        <h3 class="font-display text-2xl font-bold text-emerald-300 mb-6 flex items-center gap-3">
          <span class="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center">
            <svg class="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"></path>
            </svg>
          </span>
          Entry
        </h3>
        <ul class="space-y-4">
          {#each entryRules as rule}
            <li class="flex items-start gap-3 text-gray-300">
              <span class="w-2 h-2 mt-2 rounded-full bg-emerald-400 shrink-0"></span>
              <span>{rule}</span>
            </li>
          {/each}
        </ul>
      </div>

      <div class="glass-card p-8 opacity-0 {visible ? 'animate-slide-in-right delay-300' : ''}">
        <h3 class="font-display text-2xl font-bold text-emerald-300 mb-6 flex items-center gap-3">
          <span class="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center">
            <svg class="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
            </svg>
          </span>
          House rules
        </h3>
        <ul class="space-y-4">
          {#each houseRules as rule}
            <li class="flex items-start gap-3 text-gray-300">
              <span class="w-2 h-2 mt-2 rounded-full bg-emerald-400 shrink-0"></span>
              <span>{rule}</span>
            </li>
          {/each}
        </ul>
      </div>

      <div class="glass-card p-8 opacity-0 {visible ? 'animate-slide-in-left delay-400' : ''}">
        <h3 class="font-display text-2xl font-bold text-emerald-300 mb-6 flex items-center gap-3">
          <span class="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center">
            <svg class="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </span>
          Submission
        </h3>
        <ul class="space-y-4">
          {#each submissionRules as rule}
            <li class="flex items-start gap-3 text-gray-300">
              <span class="w-2 h-2 mt-2 rounded-full bg-emerald-400 shrink-0"></span>
              <span>{rule}</span>
            </li>
          {/each}
        </ul>
      </div>
    </div>
  </div>
</section>
