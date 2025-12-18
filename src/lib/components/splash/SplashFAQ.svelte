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
        "All projects submit to a main track, which aligns with the overall theme of the event (to be revealed on the day). Participants can optionally submit the same project to one or more secondary tracks, whose themes extend the main theme in some way.",
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

  function toggleFaq(index) {
    openIndex = openIndex === index ? -1 : index;
  }

  onMount(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) visible = true;
        });
      },
      { threshold: 0.1 },
    );

    if (sectionRef) observer.observe(sectionRef);
    return () => observer.disconnect();
  });
</script>

<section bind:this={sectionRef} id="faq" class="faq-section" class:visible>
  <div class="content-wrapper">
    <div class="section-header">
      <h2 class="section-title">FAQ</h2>
      <div class="title-underline"></div>
    </div>

    <div class="faq-grid">
      {#each faqs as faq, i}
        <div
          class="faq-item"
          class:open={openIndex === i}
          style="animation-delay: {(i % 6) * 0.1}s"
        >
          <button class="faq-question" onclick={() => toggleFaq(i)}>
            <span class="question-text">{faq.question}</span>
            <div class="question-icon">
              <span class="icon-bar horizontal"></span>
              <span class="icon-bar vertical" class:hidden={openIndex === i}
              ></span>
            </div>
          </button>
          {#if openIndex === i}
            <div class="faq-answer" transition:slide={{ duration: 300 }}>
              <p>{faq.answer}</p>
            </div>
          {/if}
        </div>
      {/each}
    </div>

    <div class="contact-section">
      <p class="contact-text">Still have questions?</p>
      <div class="contact-links">
        <a href="/discord" target="_blank" class="contact-btn discord">
          <span>Join Discord</span>
        </a>
        <a href="mailto:camhack@cucats.org" class="contact-btn email">
          <span>Email Us</span>
        </a>
      </div>
    </div>
  </div>
</section>

<style>
  .faq-section {
    padding: 6rem 2rem;
    opacity: 0;
    transform: translateY(50px);
    transition:
      opacity 0.8s ease,
      transform 0.8s ease;
  }

  .faq-section.visible {
    opacity: 1;
    transform: translateY(0);
  }

  .content-wrapper {
    max-width: 1000px;
    margin: 0 auto;
  }

  .section-header {
    text-align: center;
    margin-bottom: 4rem;
  }

  .section-title {
    font-size: clamp(2rem, 5vw, 3.5rem);
    color: #e6edf3;
    margin-bottom: 1rem;
  }

  .title-underline {
    width: 100px;
    height: 4px;
    background: linear-gradient(90deg, #00d4ff, #00ff88);
    margin: 0 auto;
    border-radius: 2px;
  }

  .faq-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
    gap: 1rem;
    margin-bottom: 3rem;
  }

  .faq-item {
    background: rgba(22, 27, 34, 0.6);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 16px;
    overflow: hidden;
    transition: all 0.3s ease;
    animation: faqSlide 0.5s ease-out forwards;
    opacity: 0;
    transform: translateY(20px);
  }

  @keyframes faqSlide {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .faq-item:hover {
    border-color: rgba(0, 255, 136, 0.3);
  }

  .faq-item.open {
    border-color: #00ff88;
    box-shadow: 0 0 20px rgba(0, 255, 136, 0.1);
  }

  .faq-question {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.25rem 1.5rem;
    background: transparent;
    border: none;
    cursor: pointer;
    text-align: left;
    color: #e6edf3;
    font-size: 1rem;
    font-weight: 600;
    transition: all 0.3s ease;
  }

  .faq-question:hover {
    color: #00ff88;
  }

  .question-text {
    flex: 1;
    padding-right: 1rem;
  }

  .question-icon {
    position: relative;
    width: 20px;
    height: 20px;
    flex-shrink: 0;
  }

  .icon-bar {
    position: absolute;
    background: #00ff88;
    border-radius: 2px;
    transition: all 0.3s ease;
  }

  .icon-bar.horizontal {
    width: 100%;
    height: 2px;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
  }

  .icon-bar.vertical {
    width: 2px;
    height: 100%;
    left: 50%;
    top: 0;
    transform: translateX(-50%);
  }

  .icon-bar.vertical.hidden {
    transform: translateX(-50%) scaleY(0);
  }

  .faq-answer {
    padding: 0 1.5rem 1.25rem;
    color: #8b949e;
    line-height: 1.7;
  }

  .faq-answer p {
    margin: 0;
  }

  .contact-section {
    text-align: center;
    padding: 3rem;
    background: rgba(22, 27, 34, 0.6);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 20px;
  }

  .contact-text {
    font-size: 1.3rem;
    color: #e6edf3;
    margin-bottom: 1.5rem;
  }

  .contact-links {
    display: flex;
    justify-content: center;
    gap: 1rem;
    flex-wrap: wrap;
  }

  .contact-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 1rem 2rem;
    border-radius: 50px;
    font-weight: 600;
    text-decoration: none;
    transition: all 0.3s ease;
  }

  .contact-btn.discord {
    background: linear-gradient(135deg, #5865f2, #7289da);
    color: white;
  }

  .contact-btn.discord:hover {
    transform: scale(1.05);
    box-shadow: 0 0 20px rgba(88, 101, 242, 0.4);
  }

  .contact-btn.email {
    background: rgba(0, 255, 136, 0.1);
    border: 1px solid #00ff88;
    color: #00ff88;
  }

  .contact-btn.email:hover {
    background: rgba(0, 255, 136, 0.2);
    transform: scale(1.05);
    box-shadow: 0 0 20px rgba(0, 255, 136, 0.3);
  }

  @media (max-width: 768px) {
    .faq-grid {
      grid-template-columns: 1fr;
    }

    .contact-section {
      padding: 2rem 1.5rem;
    }
  }
</style>
