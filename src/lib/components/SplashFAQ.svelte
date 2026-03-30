<script>
  import { onMount } from "svelte";

  let visible = $state(false);
  let sectionRef;
  let openIndex = $state(-1);

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

    if (sectionRef) observer.observe(sectionRef);

    return () => observer.disconnect();
  });

  const faqs = [
    {
      question: "What is a hackathon?",
      answer:
        "A hackathon is an event where people collaborate to create new projects! It usually runs over a weekend and is a great way to learn new skills, meet new people, and have fun!",
    },
    {
      question: "What are the hackathon tracks?",
      answer:
        "All projects submit to a main track, which aligns with the overall theme of the event (to be revealed on the day). Participants can optionally submit the same project to one or more secondary tracks.",
    },
    {
      question: "Can I participate remotely?",
      answer:
        "While online participation is not allowed, it's okay to leave the venue for some time to hack elsewhere. We hope to see you at the Computer Lab!",
    },
    {
      question: "How much does it cost?",
      answer: "Entry is free and includes food, drinks, and of course, stash!",
    },
    {
      question: "Where is it?",
      answer:
        "Cam Hack 2025 will be in the Computer Laboratory, also known as the William Gates Building.",
    },
    {
      question: "I don't have a team!",
      answer:
        "If you don't have a team yet, don't hesitate to look around in our Discord server. It's also common to form teams at the event itself!",
    },
    {
      question: "How do I sign up?",
      answer:
        "Signups are now closed. We look forward to seeing you at the event!",
    },
    {
      question: "I've never hacked before!",
      answer:
        "That's completely fine! Teams often have hackers with a mix of experience, including beginners.",
    },
    {
      question: "Will there be food?",
      answer:
        "Yes! We will provide meals, as well as lots of snacks throughout the event! Please let us know if you have any dietary requirements in the sign up form.",
    },
    {
      question: "Can I submit to multiple tracks?",
      answer: "Yes, projects can be submitted to multiple tracks.",
    },
    {
      question: "What can I win?",
      answer:
        "For the winning team, each person will receive £200 and can choose from a range of prizes including: smartwatches, Steam vouchers, Amazon vouchers, or Sony XM4 headphones.",
    },
    {
      question: "You didn't answer my questions!",
      answer:
        "You can ask us anything in our Discord server! You can also email us at camhack@cucats.org, or speak to us in person at the event, where we will be happy to answer.",
    },
  ];

  function toggle(index) {
    openIndex = openIndex === index ? -1 : index;
  }
</script>

<div bind:this={sectionRef} class="mx-auto max-w-4xl py-20">
  <h2 class="mb-16 text-center text-4xl font-bold sm:text-5xl md:text-6xl">
    <span class="gradient-text">FAQ</span>
  </h2>

  <div class="space-y-4">
    {#each faqs as faq, i}
      <div
        class="card faq-item overflow-hidden"
        style="animation-delay: {i * 0.05}s"
        class:visible
      >
        <button
          onclick={() => toggle(i)}
          class="hover:bg-neon-green/5 flex w-full items-center justify-between p-6 text-left transition-colors duration-300"
        >
          <span
            class="pr-4 text-lg font-bold"
            class:text-neon-green={openIndex === i}
          >
            {faq.question}
          </span>
          <svg
            class="text-neon-green h-6 w-6 flex-shrink-0 transition-transform duration-300"
            class:rotate-180={openIndex === i}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 9l-7 7-7-7"
            ></path>
          </svg>
        </button>

        <div
          class="overflow-hidden transition-all duration-500"
          style="max-height: {openIndex === i
            ? '500px'
            : '0px'}; opacity: {openIndex === i ? 1 : 0}"
        >
          <div class="px-6 pb-6 leading-relaxed text-gray-400">
            {faq.answer}
          </div>
        </div>
      </div>
    {/each}
  </div>
</div>

<style>
  .faq-item {
    opacity: 0;
    transform: translateY(20px);
  }

  .faq-item.visible {
    animation: fade-up 0.5s ease-out forwards;
  }

  @keyframes fade-up {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
</style>
