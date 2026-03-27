<script>
  import { onMount } from 'svelte';
  import { slide } from 'svelte/transition';

  let visible = $state(false);
  let sectionEl;
  let expandedIndex = $state(-1);

  const faqs = [
    {
      question: 'What is a hackathon?',
      answer: "A hackathon is an event where people collaborate to create new projects! It usually runs over a weekend and is a great way to learn new skills, meet new people, and have fun!"
    },
    {
      question: 'What are the hackathon tracks?',
      answer: "All projects submit to a main track, which aligns with the overall theme of the event (to be revealed on the day). Participants can optionally submit the same project to one or more secondary tracks, whose themes extend the main theme in some way. Participants who opt into secondary tracks are eligible for both the main track and secondary track prizes."
    },
    {
      question: 'Can I participate remotely?',
      answer: "While online participation is not allowed, it's okay to leave the venue for some time to hack elsewhere. We hope to see you at the Computer Lab!"
    },
    {
      question: 'How much does it cost?',
      answer: "Entry is free and includes food, drinks, and of course, stash!"
    },
    {
      question: 'Where is it?',
      answer: "Cam Hack 2025 will be in the Computer Laboratory, also known as the William Gates Building."
    },
    {
      question: "I don't have a team!",
      answer: "If you don't have a team yet, don't hesitate to look around in our Discord server. It's also common to form teams at the event itself!"
    },
    {
      question: 'How do I sign up?',
      answer: "Signups are now closed. We look forward to seeing you at the event!"
    },
    {
      question: "I've never hacked before!",
      answer: "That's completely fine! Teams often have hackers with a mix of experience, including beginners."
    },
    {
      question: 'Will there be food?',
      answer: "Yes! We will provide meals, as well as lots of snacks throughout the event! Please let us know if you have any dietary requirements in the sign up form."
    },
    {
      question: 'Can I submit to multiple tracks?',
      answer: "Yes, projects can be submitted to multiple tracks."
    },
    {
      question: 'What can I win?',
      answer: "For the winning team, each person will receive £200 and can choose from a range of prizes including: smartwatches, Steam vouchers, Amazon vouchers, or Sony XM4 headphones."
    },
    {
      question: "You didn't answer my questions!",
      answer: "You can ask us anything in our Discord server! You can also email us at camhack@cucats.org, or speak to us in person at the event, where we will be happy to answer."
    }
  ];

  function toggle(index) {
    expandedIndex = expandedIndex === index ? -1 : index;
  }

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

<section id="faq" bind:this={sectionEl} class="relative py-24 px-4 sm:px-8">
  <div class="max-w-4xl mx-auto">
    <div class="text-center mb-16 opacity-0 {visible ? 'animate-slide-up' : ''}">
      <h2 class="font-display text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
        <span class="bg-gradient-to-r from-emerald-400 to-green-300 bg-clip-text text-transparent glow-text">
          FAQ
        </span>
      </h2>
      <div class="w-24 h-1 bg-gradient-to-r from-emerald-400 to-green-300 mx-auto rounded-full"></div>
    </div>

    <div class="space-y-4">
      {#each faqs as faq, i}
        <div
          class="glass-card overflow-hidden opacity-0 {visible ? 'animate-slide-up' : ''}"
          style="animation-delay: {0.1 + i * 0.05}s"
        >
          <button
            class="w-full p-6 text-left flex items-center justify-between gap-4 transition-all duration-300 hover:bg-emerald-900/20"
            onclick={() => toggle(i)}
          >
            <span class="font-display text-lg sm:text-xl font-semibold text-gray-200">{faq.question}</span>
            <span
              class="w-8 h-8 shrink-0 rounded-full bg-emerald-500/20 flex items-center justify-center transition-transform duration-300 {expandedIndex === i ? 'rotate-180' : ''}"
            >
              <svg class="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </span>
          </button>
          {#if expandedIndex === i}
            <div transition:slide={{ duration: 300 }} class="px-6 pb-6">
              <p class="text-gray-400 leading-relaxed">{faq.answer}</p>
            </div>
          {/if}
        </div>
      {/each}
    </div>
  </div>
</section>
