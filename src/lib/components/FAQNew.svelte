<script>
  let openIndex = -1;

  const faqs = [
    {
      question: "What is a hackathon?",
      answer: "A hackathon is an event where people collaborate to create new projects! It usually runs over a weekend and is a great way to learn new skills, meet new people, and have fun!"
    },
    {
      question: "What are the hackathon tracks?",
      answer: "All projects submit to a main track, which aligns with the overall theme of the event (to be revealed on the day). Participants can optionally submit the same project to one or more secondary tracks, whose themes extend the main theme in some way. Participants who opt into secondary tracks are eligible for both the main track and secondary track prizes."
    },
    {
      question: "Can I participate remotely?",
      answer: "While online participation is not allowed, it's okay to leave the venue for some time to hack elsewhere. We hope to see you at the Computer Lab!"
    },
    {
      question: "How much does it cost?",
      answer: "Entry is free and includes food, drinks, and of course, stash!"
    },
    {
      question: "Where is it?",
      answer: "Cam Hack 2025 will be in the Computer Laboratory, also known as the William Gates Building.",
      link: { text: "William Gates Building", url: "https://maps.app.goo.gl/185n4bsvv7AXw3FM7" }
    },
    {
      question: "I don't have a team!",
      answer: "If you don't have a team yet, don't hesitate to look around in our Discord server. It's also common to form teams at the event itself!",
      link: { text: "Discord server", url: "/discord" }
    },
    {
      question: "How do I sign up?",
      answer: "Signups are now closed. We look forward to seeing you at the event!"
    },
    {
      question: "I've never hacked before!",
      answer: "That's completely fine! Teams often have hackers with a mix of experience, including beginners."
    },
    {
      question: "Will there be food?",
      answer: "Yes! We will provide meals, as well as lots of snacks throughout the event! Please let us know if you have any dietary requirements in the sign up form."
    },
    {
      question: "Can I submit to multiple tracks?",
      answer: "Yes, projects can be submitted to multiple tracks."
    },
    {
      question: "What can I win?",
      answer: "For the winning team, each person will receive £200 and can choose from a range of prizes including: smartwatches, Steam vouchers, Amazon vouchers, or Sony XM4 headphones."
    },
    {
      question: "You didn't answer my questions!",
      answer: "You can ask us anything in our Discord server! You can also email us at camhack@cucats.org, or speak to us in person at the event, where we will be happy to answer.",
      links: [
        { text: "Discord server", url: "/discord" },
        { text: "camhack@cucats.org", url: "mailto:camhack@cucats.org" }
      ]
    }
  ];

  function toggleFAQ(index) {
    openIndex = openIndex === index ? -1 : index;
  }
</script>

<div class="faq-container">
  <div class="content-wrapper">
    <h2 class="section-title">
      <span class="title-accent">{"{"}</span>
      FAQ
      <span class="title-accent">{"}"}</span>
    </h2>
    
    <div class="faq-list">
      {#each faqs as faq, index}
        <div 
          class="faq-item"
          class:open={openIndex === index}
        >
          <button
            class="faq-question"
            onclick={() => toggleFAQ(index)}
          >
            <span class="question-text">{faq.question}</span>
            <span class="question-icon">{openIndex === index ? '−' : '+'}</span>
          </button>
          
          {#if openIndex === index}
            <div class="faq-answer">
              <p class="answer-text">
                {#if faq.link}
                  {faq.answer.split(faq.link.text)[0]}<a href={faq.link.url} class="answer-link" target="_blank">{faq.link.text}</a>{faq.answer.split(faq.link.text)[1] || ''}
                {:else if faq.links}
                  {#each faq.answer.split(/Discord server|camhack@cucats.org/) as part, i}
                    {part}
                    {#if i < faq.links.length}
                      <a href={faq.links[i].url} class="answer-link" target={faq.links[i].url.startsWith('mailto:') ? '_self' : '_blank'}>{faq.links[i].text}</a>
                    {/if}
                  {/each}
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
</div>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Space+Mono:wght@400;700&display=swap');

  .faq-container {
    padding: 6rem 2rem;
    background: linear-gradient(180deg, rgba(0, 0, 0, 0.9) 0%, rgba(10, 77, 46, 0.2) 100%);
    position: relative;
  }

  .content-wrapper {
    max-width: 1200px;
    margin: 0 auto;
  }

  .section-title {
    font-family: 'Orbitron', sans-serif;
    font-size: clamp(2rem, 5vw, 3.5rem);
    font-weight: 900;
    text-align: center;
    color: #00ff88;
    margin-bottom: 4rem;
    letter-spacing: 0.3rem;
    text-transform: uppercase;
    text-shadow: 0 0 20px rgba(0, 255, 136, 0.5);
  }

  .title-accent {
    color: #88ffb8;
    font-weight: 400;
  }

  .faq-list {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .faq-item {
    background: rgba(0, 0, 0, 0.6);
    border: 2px solid rgba(0, 255, 136, 0.3);
    border-radius: 15px;
    overflow: hidden;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .faq-item:hover {
    border-color: #00ff88;
    box-shadow: 0 10px 30px rgba(0, 255, 136, 0.2);
  }

  .faq-item.open {
    border-color: #00ff88;
    box-shadow: 
      0 10px 30px rgba(0, 255, 136, 0.3),
      inset 0 0 20px rgba(0, 255, 136, 0.1);
  }

  .faq-question {
    width: 100%;
    padding: 1.5rem 2rem;
    background: transparent;
    border: none;
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .faq-question:hover {
    background: rgba(0, 255, 136, 0.05);
  }

  .question-text {
    font-family: 'Orbitron', sans-serif;
    font-size: clamp(1rem, 2vw, 1.3rem);
    font-weight: 700;
    color: #00ff88;
    text-align: left;
    letter-spacing: 0.1rem;
    text-shadow: 0 0 10px rgba(0, 255, 136, 0.3);
  }

  .question-icon {
    font-family: 'Orbitron', sans-serif;
    font-size: 2rem;
    font-weight: 300;
    color: #00ff88;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px solid #00ff88;
    border-radius: 50%;
    transition: all 0.3s ease;
    flex-shrink: 0;
  }

  .faq-item.open .question-icon {
    transform: rotate(90deg);
    background: rgba(0, 255, 136, 0.1);
  }

  .faq-answer {
    padding: 0 2rem 2rem 2rem;
    animation: slideDown 0.3s ease-out;
  }

  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .answer-text {
    font-family: 'Space Mono', monospace;
    font-size: clamp(0.95rem, 1.5vw, 1.1rem);
    line-height: 1.8;
    color: #e0e0e0;
    margin: 0;
  }

  .answer-link {
    color: #00ff88;
    text-decoration: none;
    font-weight: 700;
    transition: all 0.3s ease;
    text-shadow: 0 0 10px rgba(0, 255, 136, 0.3);
    border-bottom: 2px solid transparent;
  }

  .answer-link:hover {
    color: #88ffb8;
    border-bottom-color: #88ffb8;
    text-shadow: 0 0 20px rgba(0, 255, 136, 0.6);
  }

  @media (max-width: 768px) {
    .faq-container {
      padding: 4rem 1rem;
    }

    .faq-question {
      padding: 1.2rem 1.5rem;
    }

    .question-icon {
      width: 35px;
      height: 35px;
      font-size: 1.8rem;
    }

    .faq-answer {
      padding: 0 1.5rem 1.5rem 1.5rem;
    }
  }
</style>
