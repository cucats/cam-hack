<script>
  import { onMount } from 'svelte';

  let visible = $state(false);
  let openIndex = $state(null);

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
      answer: 'Cam Hack 2025 will be in the Computer Laboratory, also known as the William Gates Building.'
    },
    {
      question: "I don't have a team!",
      answer: "If you don't have a team yet, don't hesitate to look around in our Discord server. It's also common to form teams at the event itself!"
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
      answer: 'You can ask us anything in our Discord server! You can also email us at camhack@cucats.org, or speak to us in person at the event, where we will be happy to answer.'
    }
  ];

  function toggleFAQ(index) {
    openIndex = openIndex === index ? null : index;
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
      { threshold: 0.2 }
    );

    const element = document.querySelector('#faq');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  });
</script>

<section id="faq" class="faq-section" class:visible>
  <div class="faq-container">
    <h2 class="section-title">
      <span class="title-line"></span>
      <span class="title-text">FAQ</span>
      <span class="title-line"></span>
    </h2>
    
    <div class="faq-grid">
      {#each faqs as faq, index}
        <div class="faq-item" class:open={openIndex === index} style="animation-delay: {index * 0.05}s">
          <button class="faq-question" onclick={() => toggleFAQ(index)}>
            <span class="question-text">{faq.question}</span>
            <span class="toggle-icon" class:open={openIndex === index}>+</span>
          </button>
          {#if openIndex === index}
            <div class="faq-answer">
              <p>{faq.answer}</p>
            </div>
          {/if}
        </div>
      {/each}
    </div>
  </div>
</section>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Space+Mono:wght@400;700&display=swap');

  .faq-section {
    position: relative;
    padding: 8rem 2rem;
    background: linear-gradient(180deg, #1a1e3f 0%, #0a0e27 100%);
    overflow: hidden;
    opacity: 0;
    transform: translateY(50px);
    transition: all 1s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .faq-section.visible {
    opacity: 1;
    transform: translateY(0);
  }

  .faq-section::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, #ff00aa, transparent);
  }

  .faq-container {
    max-width: 1200px;
    margin: 0 auto;
  }

  .section-title {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 2rem;
    margin-bottom: 4rem;
  }

  .title-line {
    flex: 1;
    height: 2px;
    background: linear-gradient(90deg, transparent, #ff00aa, transparent);
    max-width: 200px;
  }

  .title-text {
    font-family: 'Orbitron', monospace;
    font-size: clamp(2rem, 5vw, 3.5rem);
    font-weight: 900;
    color: #ff00aa;
    text-shadow: 0 0 20px rgba(255, 0, 170, 0.5);
    text-transform: uppercase;
    letter-spacing: 0.1em;
    white-space: nowrap;
  }

  .faq-grid {
    display: grid;
    gap: 1.5rem;
  }

  .faq-item {
    position: relative;
    background: linear-gradient(135deg, rgba(255, 0, 170, 0.05), rgba(0, 204, 255, 0.05));
    border: 2px solid rgba(255, 0, 170, 0.2);
    border-radius: 20px;
    overflow: hidden;
    backdrop-filter: blur(10px);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    opacity: 0;
    transform: translateX(-30px);
    animation: slideIn 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards;
  }

  .faq-section.visible .faq-item {
    opacity: 1;
    transform: translateX(0);
  }

  @keyframes slideIn {
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  .faq-item.open {
    border-color: rgba(255, 0, 170, 0.5);
    box-shadow: 0 10px 40px rgba(255, 0, 170, 0.3);
  }

  .faq-item:hover {
    border-color: rgba(255, 0, 170, 0.4);
    transform: translateX(5px);
  }

  .faq-question {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.5rem 2rem;
    background: transparent;
    border: none;
    cursor: pointer;
    text-align: left;
    transition: all 0.3s ease;
  }

  .question-text {
    font-family: 'Orbitron', monospace;
    font-size: 1.2rem;
    font-weight: 700;
    color: #00ff88;
    transition: color 0.3s ease;
  }

  .faq-item:hover .question-text {
    color: #00ccff;
  }

  .toggle-icon {
    font-family: 'Orbitron', monospace;
    font-size: 2rem;
    color: #ff00aa;
    transition: all 0.3s ease;
    line-height: 1;
  }

  .toggle-icon.open {
    transform: rotate(45deg);
  }

  .faq-answer {
    padding: 0 2rem 1.5rem 2rem;
    animation: expandAnswer 0.3s ease-out;
  }

  @keyframes expandAnswer {
    from {
      opacity: 0;
      max-height: 0;
    }
    to {
      opacity: 1;
      max-height: 500px;
    }
  }

  .faq-answer p {
    font-family: 'Space Mono', monospace;
    font-size: 1rem;
    line-height: 1.7;
    color: rgba(255, 255, 255, 0.8);
    margin: 0;
  }

  @media (max-width: 768px) {
    .faq-section {
      padding: 4rem 1rem;
    }

    .faq-question {
      padding: 1.2rem 1.5rem;
    }

    .question-text {
      font-size: 1rem;
      padding-right: 1rem;
    }

    .toggle-icon {
      font-size: 1.5rem;
    }

    .faq-answer {
      padding: 0 1.5rem 1.2rem 1.5rem;
    }

    .section-title {
      gap: 1rem;
    }

    .title-line {
      max-width: 50px;
    }
  }
</style>
