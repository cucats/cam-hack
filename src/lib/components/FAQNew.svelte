<script>
  import { onMount } from "svelte";
  import { slide } from "svelte/transition";

  let visible = $state(false);
  let sectionRef;
  let openIndex = $state(-1);

  const faqs = [
    {
      question: "What is a hackathon?",
      answer:
        "A hackathon is an event where people collaborate to create new projects! It usually runs over a weekend and is a great way to learn new skills, meet new people, and have fun!",
    },
    {
      question: "What are the hackathon tracks?",
      answer:
        "All projects submit to a main track, which aligns with the overall theme of the event (to be revealed on the day). Participants can optionally submit the same project to one or more secondary tracks, whose themes extend the main theme in some way. Participants who opt into secondary tracks are eligible for both the main track and secondary track prizes.",
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

<div bind:this={sectionRef} class="relative overflow-hidden py-24 sm:py-32">
  <div class="absolute inset-0 opacity-30">
    <div
      class="absolute top-1/4 right-0 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl"
    ></div>
    <div
      class="absolute bottom-1/4 left-0 h-72 w-72 rounded-full bg-purple-500/10 blur-3xl"
    ></div>
  </div>

  <div class="relative z-10 mx-auto max-w-7xl px-4 sm:px-8">
    <div class="mb-16 text-center" class:visible>
      <h2 class="section-title text-gradient mx-auto">FAQ</h2>
    </div>

    <div class="faq-container mx-auto max-w-3xl" class:visible>
      <div class="space-y-4">
        {#each faqs as faq, index}
          <div
            class="faq-item overflow-hidden rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm transition-all duration-300"
            class:open={openIndex === index}
            style="animation-delay: {index * 0.05}s"
          >
            <button
              class="flex w-full items-center justify-between p-6 text-left transition-colors hover:bg-white/5"
              onclick={() => toggle(index)}
            >
              <span class="pr-4 text-lg font-semibold text-gray-100"
                >{faq.question}</span
              >
              <span
                class="chevron text-hack-green flex-shrink-0 transition-transform duration-300"
                class:rotated={openIndex === index}
              >
                <svg
                  class="h-6 w-6"
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
              </span>
            </button>

            {#if openIndex === index}
              <div class="answer" transition:slide={{ duration: 300 }}>
                <div class="border-t border-white/10 px-6 pt-4 pb-6">
                  <p class="text-gray-400">{faq.answer}</p>
                </div>
              </div>
            {/if}
          </div>
        {/each}
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
  .faq-container {
    opacity: 0;
    transform: translateY(30px);
    transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
  }

  div.visible:has(.section-title),
  .visible.faq-container {
    opacity: 1;
    transform: translateY(0);
  }

  .faq-item {
    animation: fadeInUp 0.5s ease-out forwards;
    opacity: 0;
  }

  .visible .faq-item {
    animation: fadeInUp 0.5s ease-out forwards;
  }

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(15px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .faq-item.open {
    border-color: rgba(16, 185, 129, 0.3);
    box-shadow: 0 0 20px rgba(16, 185, 129, 0.1);
  }

  .chevron.rotated {
    transform: rotate(180deg);
  }

  .text-hack-green {
    color: #10b981;
  }
</style>
