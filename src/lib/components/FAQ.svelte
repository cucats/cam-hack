<script>
  import { onMount } from 'svelte';
  import { slide } from 'svelte/transition';
  
  let sectionRef;
  let isVisible = $state(false);
  let expandedIndex = $state(-1);

  const faqs = [
    {
      question: 'What is a hackathon?',
      answer: 'A hackathon is an event where people collaborate to create new projects! It usually runs over a weekend and is a great way to learn new skills, meet new people, and have fun!'
    },
    {
      question: 'What are the hackathon tracks?',
      answer: 'All projects submit to a main track, which aligns with the overall theme of the event (to be revealed on the day). Participants can optionally submit the same project to one or more secondary tracks, whose themes extend the main theme in some way. Participants who opt into secondary tracks are eligible for both the main track and secondary track prizes.'
    },
    {
      question: 'Can I participate remotely?',
      answer: "While online participation is not allowed, it's okay to leave the venue for some time to hack elsewhere. We hope to see you at the Computer Lab!"
    },
    {
      question: 'How much does it cost?',
      answer: 'Entry is free and includes food, drinks, and of course, stash!'
    },
    {
      question: 'Where is it?',
      answer: 'Cam Hack 2025 will be in the Computer Laboratory, also known as the William Gates Building.',
      link: { url: 'https://maps.app.goo.gl/185n4bsvv7AXw3FM7', text: 'William Gates Building' }
    },
    {
      question: "I don't have a team!",
      answer: "If you don't have a team yet, don't hesitate to look around in our Discord server. It's also common to form teams at the event itself!",
      discordLink: true
    },
    {
      question: 'How do I sign up?',
      answer: 'Signups are now closed. We look forward to seeing you at the event!'
    },
    {
      question: "I've never hacked before!",
      answer: "That's completely fine! Teams often have hackers with a mix of experience, including beginners."
    },
    {
      question: 'Will there be food?',
      answer: 'Yes! We will provide meals, as well as lots of snacks throughout the event! Please let us know if you have any dietary requirements in the sign up form.'
    },
    {
      question: 'Can I submit to multiple tracks?',
      answer: 'Yes, projects can be submitted to multiple tracks.'
    },
    {
      question: 'What can I win?',
      answer: 'For the winning team, each person will receive £200 and can choose from a range of prizes including: smartwatches, Steam vouchers, Amazon vouchers, or Sony XM4 headphones.'
    },
    {
      question: "You didn't answer my questions!",
      answer: 'You can ask us anything in our Discord server! You can also email us at camhack@cucats.org, or speak to us in person at the event, where we will be happy to answer.',
      email: 'camhack@cucats.org',
      discordLink: true
    }
  ];

  function toggleFaq(index) {
    expandedIndex = expandedIndex === index ? -1 : index;
  }

  onMount(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            isVisible = true;
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef) observer.observe(sectionRef);

    return () => observer.disconnect();
  });
</script>

<div class="faq-section" bind:this={sectionRef}>
  <div class="content-wrapper" class:visible={isVisible}>
    <div class="section-header">
      <h2 class="section-title">
        <span class="title-icon">❓</span>
        FAQ
      </h2>
      <div class="title-underline"></div>
    </div>

    <div class="faq-list">
      {#each faqs as faq, index}
        <div 
          class="faq-item glass-card"
          class:expanded={expandedIndex === index}
          style="animation-delay: {index * 0.05}s"
        >
          <button 
            class="faq-question"
            onclick={() => toggleFaq(index)}
          >
            <span class="question-text">{faq.question}</span>
            <span class="question-icon" class:rotated={expandedIndex === index}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M19 9l-7 7-7-7"/>
              </svg>
            </span>
          </button>
          
          {#if expandedIndex === index}
            <div class="faq-answer" transition:slide={{ duration: 300 }}>
              <p>
                {#if faq.link}
                  {faq.answer.replace(faq.link.text, '')}
                  <a href={faq.link.url} target="_blank" class="theme-hyperlink">{faq.link.text}</a>.
                {:else if faq.discordLink && faq.email}
                  You can ask us anything in our <a href="/discord" target="_blank" class="theme-hyperlink">Discord server</a>! You can also email us at <a href="mailto:{faq.email}" class="theme-hyperlink">{faq.email}</a>, or speak to us in person at the event, where we will be happy to answer.
                {:else if faq.discordLink}
                  If you don't have a team yet, don't hesitate to look around in our <a href="/discord" target="_blank" class="theme-hyperlink">Discord server</a>. It's also common to form teams at the event itself!
                {:else}
                  {faq.answer}
                {/if}
              </p>
            </div>
          {/if}
        </div>
      {/each}
    </div>
  </div>

  <div class="decorative-circles">
    <div class="circle circle-1"></div>
    <div class="circle circle-2"></div>
  </div>
</div>

<style>
  .faq-section {
    position: relative;
    padding: 6rem 2rem;
    overflow: hidden;
  }

  .content-wrapper {
    max-width: 800px;
    margin: 0 auto;
    opacity: 0;
    transform: translateY(50px);
    transition: all 0.8s ease-out;
  }

  .content-wrapper.visible {
    opacity: 1;
    transform: translateY(0);
  }

  .section-header {
    text-align: center;
    margin-bottom: 3rem;
  }

  .section-title {
    display: inline-flex;
    align-items: center;
    gap: 0.75rem;
    font-size: clamp(2rem, 5vw, 3rem);
    margin-bottom: 1rem;
  }

  .title-icon {
    font-size: 0.8em;
  }

  .title-underline {
    width: 100px;
    height: 3px;
    background: linear-gradient(90deg, transparent, var(--color-primary), transparent);
    margin: 0 auto;
    border-radius: 2px;
  }

  .faq-list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .faq-item {
    overflow: hidden;
    opacity: 0;
    animation: fade-in 0.5s ease-out forwards;
    transition: all 0.3s ease;
  }

  @keyframes fade-in {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .faq-item:hover {
    box-shadow: 0 10px 30px rgba(0, 255, 136, 0.1);
  }

  .faq-item.expanded {
    border-color: rgba(0, 255, 136, 0.4);
  }

  .faq-question {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 1.25rem 1.5rem;
    background: transparent;
    border: none;
    color: var(--color-text-light);
    font-size: 1.1rem;
    font-weight: 600;
    text-align: left;
    cursor: pointer;
    transition: color 0.3s ease;
  }

  .faq-question:hover {
    color: var(--color-primary);
  }

  .question-text {
    flex: 1;
    padding-right: 1rem;
  }

  .question-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    color: var(--color-primary);
    transition: transform 0.3s ease;
  }

  .question-icon.rotated {
    transform: rotate(180deg);
  }

  .question-icon svg {
    width: 100%;
    height: 100%;
  }

  .faq-answer {
    padding: 0 1.5rem 1.5rem;
  }

  .faq-answer p {
    margin: 0;
    color: var(--color-text-muted);
    line-height: 1.7;
  }

  .decorative-circles {
    position: absolute;
    inset: 0;
    pointer-events: none;
    overflow: hidden;
  }

  .circle {
    position: absolute;
    border-radius: 50%;
    border: 1px solid rgba(0, 255, 136, 0.1);
  }

  .circle-1 {
    width: 400px;
    height: 400px;
    top: -100px;
    right: -100px;
    animation: pulse-circle 8s infinite ease-in-out;
  }

  .circle-2 {
    width: 300px;
    height: 300px;
    bottom: -50px;
    left: -50px;
    animation: pulse-circle 10s infinite ease-in-out reverse;
  }

  @keyframes pulse-circle {
    0%, 100% { transform: scale(1); opacity: 0.3; }
    50% { transform: scale(1.1); opacity: 0.1; }
  }
</style>
