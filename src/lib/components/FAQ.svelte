<script>
  import { onMount } from "svelte";
  import FAQuestion from "$lib/components/FAQuestion.svelte";

  let sectionRef;
  let visible = $state(false);

  onMount(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            visible = true;
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef) {
      observer.observe(sectionRef);
    }

    return () => observer.disconnect();
  });
</script>

<div bind:this={sectionRef} class="faq-container">
  <h2 class="section-title" class:visible>
    <span class="title-icon">&#10067;</span>
    FAQ
  </h2>

  <div class="faq-grid" class:visible>
    <div class="faq-column">
      <FAQuestion delay={0}>
        {#snippet question()}
          <span>What is a hackathon?</span>
        {/snippet}
        A hackathon is an event where people collaborate to create new projects!
        It usually runs over a weekend and is a great way to learn new skills,
        meet new people, and have fun!
      </FAQuestion>

      <FAQuestion delay={0.1}>
        {#snippet question()}
          <span>What are the hackathon tracks?</span>
        {/snippet}
        All projects submit to a main track, which aligns with the overall theme
        of the event (to be revealed on the day). Participants can optionally
        submit the same project to one or more secondary tracks, whose themes
        extend the main theme in some way. Participants who opt into secondary
        tracks are eligible for both the main track and secondary track prizes.
      </FAQuestion>

      <FAQuestion delay={0.2}>
        {#snippet question()}
          <span>Can I participate remotely?</span>
        {/snippet}
        While online participation is not allowed, it's okay to leave the venue
        for some time to hack elsewhere. We hope to see you at the Computer Lab!
      </FAQuestion>

      <FAQuestion delay={0.3}>
        {#snippet question()}
          <span>How much does it cost?</span>
        {/snippet}
        Entry is free and includes food, drinks, and of course, stash!
      </FAQuestion>

      <FAQuestion delay={0.4}>
        {#snippet question()}
          <span>Where is it?</span>
        {/snippet}
        Cam Hack 2025 will be in the Computer Laboratory, also known as the
        <a
          href="https://maps.app.goo.gl/185n4bsvv7AXw3FM7"
          target="_blank"
          class="faq-link">William Gates Building</a
        >.
      </FAQuestion>

      <FAQuestion delay={0.5}>
        {#snippet question()}
          <span>I don't have a team!</span>
        {/snippet}
        If you don't have a team yet, don't hesitate to look around in our
        <a target="_blank" class="faq-link" href="/discord">Discord server</a>.
        It's also common to form teams at the event itself!
      </FAQuestion>
    </div>

    <div class="faq-column">
      <FAQuestion delay={0.1}>
        {#snippet question()}
          <span>How do I sign up?</span>
        {/snippet}
        Signups are now closed. We look forward to seeing you at the event!
      </FAQuestion>

      <FAQuestion delay={0.2}>
        {#snippet question()}
          <span>I've never hacked before!</span>
        {/snippet}
        That's completely fine! Teams often have hackers with a mix of
        experience, including beginners.
      </FAQuestion>

      <FAQuestion delay={0.3}>
        {#snippet question()}
          <span>Will there be food?</span>
        {/snippet}
        Yes! We will provide meals, as well as lots of snacks throughout the
        event! Please let us know if you have any dietary requirements in the
        sign up form.
      </FAQuestion>

      <FAQuestion delay={0.4}>
        {#snippet question()}
          <span>Can I submit to multiple tracks?</span>
        {/snippet}
        Yes, projects can be submitted to multiple tracks.
      </FAQuestion>

      <FAQuestion delay={0.5}>
        {#snippet question()}
          <span>What can I win?</span>
        {/snippet}
        For the winning team, each person will receive £200 and can choose from
        a range of prizes including: smartwatches, Steam vouchers, Amazon
        vouchers, or Sony XM4 headphones.
      </FAQuestion>

      <FAQuestion delay={0.6}>
        {#snippet question()}
          <span>You didn't answer my questions!</span>
        {/snippet}
        You can ask us anything in our
        <a target="_blank" href="/discord" class="faq-link">Discord server</a>!
        You can also email us at
        <a href="mailto:camhack@cucats.org" class="faq-link"
          >camhack@cucats.org</a
        >, or speak to us in person at the event, where we will be happy to
        answer.
      </FAQuestion>
    </div>
  </div>
</div>

<style>
  .faq-container {
    max-width: 1280px;
    margin: 0 auto;
    padding: 2rem 1rem;
  }

  .section-title {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 3rem;
    opacity: 0;
    transform: translateY(30px);
    transition:
      opacity 0.8s ease,
      transform 0.8s ease;
  }

  .section-title.visible {
    opacity: 1;
    transform: translateY(0);
  }

  .title-icon {
    font-size: 2.5rem;
  }

  .faq-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  @media (min-width: 768px) {
    .faq-grid {
      grid-template-columns: 1fr 1fr;
    }
  }

  .faq-column {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  :global(.faq-link) {
    color: #00ffcc;
    text-decoration: none;
    transition: all 0.3s ease;
  }

  :global(.faq-link:hover) {
    color: #00ff88;
    text-shadow: 0 0 10px rgba(0, 255, 136, 0.5);
  }
</style>
