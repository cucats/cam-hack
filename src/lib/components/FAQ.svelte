<script>
  import { onMount } from "svelte";
  import { slide } from "svelte/transition";

  let sectionRef;
  let isVisible = $state(false);
  let expandedIndex = $state(-1);

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
      link: {
        text: "William Gates Building",
        url: "https://maps.app.goo.gl/185n4bsvv7AXw3FM7",
      },
    },
    {
      question: "I don't have a team!",
      answer:
        "If you don't have a team yet, don't hesitate to look around in our Discord server. It's also common to form teams at the event itself!",
      link: { text: "Discord server", url: "/discord" },
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
      links: [
        { text: "Discord server", url: "/discord" },
        { text: "camhack@cucats.org", url: "mailto:camhack@cucats.org" },
      ],
    },
  ];

  function toggleFaq(index) {
    expandedIndex = expandedIndex === index ? -1 : index;
  }

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

<div bind:this={sectionRef} class="relative mx-auto max-w-4xl">
  <div
    class="{isVisible
      ? 'translate-y-0 opacity-100'
      : 'translate-y-10 opacity-0'} transition-all duration-700"
  >
    <h2 class="text-center">
      <span class="gradient-text">?</span>
      <span class="text-white">FAQ</span>
      <span class="gradient-text">;</span>
    </h2>
  </div>

  <div class="space-y-4">
    {#each faqs as faq, i}
      <div
        class="cyber-card overflow-hidden rounded-xl {isVisible
          ? 'translate-y-0 opacity-100'
          : 'translate-y-5 opacity-0'} transition-all duration-500"
        style="transition-delay: {200 + i * 50}ms"
      >
        <button
          class="hover:bg-cyber-green/5 flex w-full cursor-pointer items-center justify-between gap-4 p-6 text-left transition-colors"
          onclick={() => toggleFaq(i)}
        >
          <span
            class="text-lg font-semibold {expandedIndex === i
              ? 'text-cyber-green'
              : 'text-white'} transition-colors"
          >
            {faq.question}
          </span>
          <span
            class="text-cyber-green text-2xl transition-transform duration-300 {expandedIndex ===
            i
              ? 'rotate-45'
              : ''}"
          >
            +
          </span>
        </button>

        {#if expandedIndex === i}
          <div transition:slide={{ duration: 300 }} class="px-6 pb-6">
            <div class="border-cyber-green/20 border-t pt-2">
              <p class="mt-4 text-gray-300">
                {#if faq.link}
                  {faq.answer.replace(faq.link.text, "")}
                  <a
                    href={faq.link.url}
                    target={faq.link.url.startsWith("/") ? "" : "_blank"}
                    class="text-cyber-cyan hover:text-cyber-green transition-colors"
                    >{faq.link.text}</a
                  >.
                {:else if faq.links}
                  {faq.answer
                    .replace("Discord server", "")
                    .replace("camhack@cucats.org", "")}
                  <a
                    href={faq.links[0].url}
                    target="_blank"
                    class="text-cyber-cyan hover:text-cyber-green transition-colors"
                    >{faq.links[0].text}</a
                  >! You can also email us at
                  <a
                    href={faq.links[1].url}
                    class="text-cyber-green hover:text-cyber-cyan transition-colors"
                    >{faq.links[1].text}</a
                  >.
                {:else}
                  {faq.answer}
                {/if}
              </p>
            </div>
          </div>
        {/if}
      </div>
    {/each}
  </div>
</div>
