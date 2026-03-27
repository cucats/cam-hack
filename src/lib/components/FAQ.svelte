<script>
  import { onMount } from "svelte";
  import { slide } from "svelte/transition";

  let visible = $state(false);
  let sectionRef;

  const faqs = [
    {
      question: "What is a hackathon?",
      answer:
        "A hackathon is an event where people collaborate to create new projects! It usually runs over a weekend and is a great way to learn new skills, meet new people, and have fun!",
      open: false,
    },
    {
      question: "What are the hackathon tracks?",
      answer:
        "All projects submit to a main track, which aligns with the overall theme of the event (to be revealed on the day). Participants can optionally submit the same project to one or more secondary tracks, whose themes extend the main theme in some way. Participants who opt into secondary tracks are eligible for both the main track and secondary track prizes.",
      open: false,
    },
    {
      question: "Can I participate remotely?",
      answer:
        "While online participation is not allowed, it's okay to leave the venue for some time to hack elsewhere. We hope to see you at the Computer Lab!",
      open: false,
    },
    {
      question: "How much does it cost?",
      answer: "Entry is free and includes food, drinks, and of course, stash!",
      open: false,
    },
    {
      question: "Where is it?",
      answer:
        "Cam Hack 2025 will be in the Computer Laboratory, also known as the William Gates Building.",
      link: {
        url: "https://maps.app.goo.gl/185n4bsvv7AXw3FM7",
        text: "View on Maps",
      },
      open: false,
    },
    {
      question: "I don't have a team!",
      answer:
        "If you don't have a team yet, don't hesitate to look around in our Discord server. It's also common to form teams at the event itself!",
      open: false,
    },
    {
      question: "How do I sign up?",
      answer:
        "Signups are now closed. We look forward to seeing you at the event!",
      open: false,
    },
    {
      question: "I've never hacked before!",
      answer:
        "That's completely fine! Teams often have hackers with a mix of experience, including beginners.",
      open: false,
    },
    {
      question: "Will there be food?",
      answer:
        "Yes! We will provide meals, as well as lots of snacks throughout the event! Please let us know if you have any dietary requirements in the sign up form.",
      open: false,
    },
    {
      question: "Can I submit to multiple tracks?",
      answer: "Yes, projects can be submitted to multiple tracks.",
      open: false,
    },
    {
      question: "What can I win?",
      answer:
        "For the winning team, each person will receive £200 and can choose from a range of prizes including: smartwatches, Steam vouchers, Amazon vouchers, or Sony XM4 headphones.",
      open: false,
    },
    {
      question: "You didn't answer my questions!",
      answer:
        "You can ask us anything in our Discord server! You can also email us at camhack@cucats.org, or speak to us in person at the event, where we will be happy to answer.",
      open: false,
    },
  ];

  let faqState = $state(faqs.map((f) => ({ ...f })));

  function toggleFaq(index) {
    faqState[index].open = !faqState[index].open;
  }

  onMount(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            visible = true;
          }
        });
      },
      { threshold: 0.1 },
    );

    if (sectionRef) {
      observer.observe(sectionRef);
    }

    return () => observer.disconnect();
  });
</script>

<div bind:this={sectionRef} class="section-darker relative py-24">
  <div class="relative z-10 mx-auto max-w-4xl px-4 sm:px-8">
    <div class="mb-12 text-center">
      <h2
        class="font-display mb-4 text-4xl font-bold sm:text-5xl {visible
          ? 'animate-slide-up'
          : 'opacity-0'}"
      >
        <span class="gradient-text text-glow">FAQ</span>
      </h2>
      <div
        class="neon-line mx-auto w-24 {visible
          ? 'animate-scale-in delay-200'
          : 'opacity-0'}"
      ></div>
    </div>

    <div class="space-y-4">
      {#each faqState as faq, index}
        <div
          class="glass neon-border overflow-hidden rounded-xl transition-all {visible
            ? 'animate-slide-up'
            : 'opacity-0'}"
          style="animation-delay: {0.3 + index * 0.05}s;"
        >
          <button
            class="flex w-full items-center justify-between p-6 text-left transition-colors hover:bg-white/5"
            onclick={() => toggleFaq(index)}
          >
            <span class="font-display pr-4 text-lg font-semibold text-white"
              >{faq.question}</span
            >
            <div class="flex-shrink-0">
              <svg
                class="h-5 w-5 text-emerald-400 transition-transform duration-300 {faq.open
                  ? 'rotate-180'
                  : ''}"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </button>
          {#if faq.open}
            <div class="border-t border-white/10 px-6 py-4" transition:slide>
              <p class="text-gray-300">{faq.answer}</p>
              {#if faq.link}
                <a
                  href={faq.link.url}
                  target="_blank"
                  class="mt-2 inline-flex items-center gap-1 text-emerald-400 transition-colors hover:text-emerald-300"
                >
                  {faq.link.text}
                  <svg
                    class="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </a>
              {/if}
            </div>
          {/if}
        </div>
      {/each}
    </div>
  </div>
</div>
