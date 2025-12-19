<script>
  import { onMount } from "svelte";
  import gsap from "gsap";
  import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
  import FAQuestion from "$lib/components/FAQuestion.svelte";

  let sectionElement;

  onMount(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.fromTo(
      sectionElement.querySelector("h2"),
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        scrollTrigger: {
          trigger: sectionElement,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      },
    );

    const questions = sectionElement.querySelectorAll(".faq-item");
    questions.forEach((q, index) => {
      gsap.fromTo(
        q,
        { x: index % 2 === 0 ? -30 : 30, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.5,
          delay: index * 0.08,
          scrollTrigger: {
            trigger: sectionElement.querySelector(".faq-grid"),
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        },
      );
    });
  });
</script>

<section bind:this={sectionElement} class="relative py-24">
  <div class="mx-auto max-w-7xl px-4">
    <h2
      class="glow-text from-primary-400 to-accent-400 mb-12 bg-gradient-to-r bg-clip-text text-center text-transparent"
    >
      FAQ
    </h2>

    <div class="faq-grid grid gap-4 lg:grid-cols-2">
      <div class="faq-item">
        <FAQuestion>
          {#snippet question()}
            <span>What is a hackathon?</span>
          {/snippet}
          A hackathon is an event where people collaborate to create new projects!
          It usually runs over a weekend and is a great way to learn new skills, meet
          new people, and have fun!
        </FAQuestion>
      </div>

      <div class="faq-item">
        <FAQuestion>
          {#snippet question()}
            <span>What are the hackathon tracks?</span>
          {/snippet}
          All projects submit to a main track, which aligns with the overall theme
          of the event (to be revealed on the day). Participants can optionally submit
          the same project to one or more secondary tracks, whose themes extend the
          main theme in some way.
        </FAQuestion>
      </div>

      <div class="faq-item">
        <FAQuestion>
          {#snippet question()}
            <span>Can I participate remotely?</span>
          {/snippet}
          While online participation is not allowed, it's okay to leave the venue
          for some time to hack elsewhere. We hope to see you at the Computer Lab!
        </FAQuestion>
      </div>

      <div class="faq-item">
        <FAQuestion>
          {#snippet question()}
            <span>How much does it cost?</span>
          {/snippet}
          Entry is free and includes food, drinks, and of course, stash!
        </FAQuestion>
      </div>

      <div class="faq-item">
        <FAQuestion>
          {#snippet question()}
            <span>Where is it?</span>
          {/snippet}
          Cam Hack 2025 will be in the Computer Laboratory, also known as the
          <a
            href="https://maps.app.goo.gl/185n4bsvv7AXw3FM7"
            class="theme-hyperlink">William Gates Building</a
          >.
        </FAQuestion>
      </div>

      <div class="faq-item">
        <FAQuestion>
          {#snippet question()}
            <span>I don't have a team!</span>
          {/snippet}
          If you don't have a team yet, don't hesitate to look around in our
          <a target="_blank" class="theme-hyperlink" href="/discord"
            >Discord server</a
          >. It's also common to form teams at the event itself!
        </FAQuestion>
      </div>

      <div class="faq-item">
        <FAQuestion>
          {#snippet question()}
            <span>How do I sign up?</span>
          {/snippet}
          Signups are now closed. We look forward to seeing you at the event!
        </FAQuestion>
      </div>

      <div class="faq-item">
        <FAQuestion>
          {#snippet question()}
            <span>I've never hacked before!</span>
          {/snippet}
          That's completely fine! Teams often have hackers with a mix of experience,
          including beginners.
        </FAQuestion>
      </div>

      <div class="faq-item">
        <FAQuestion>
          {#snippet question()}
            <span>Will there be food?</span>
          {/snippet}
          Yes! We will provide meals, as well as lots of snacks throughout the event!
          Please let us know if you have any dietary requirements in the sign up form.
        </FAQuestion>
      </div>

      <div class="faq-item">
        <FAQuestion>
          {#snippet question()}
            <span>Can I submit to multiple tracks?</span>
          {/snippet}
          Yes, projects can be submitted to multiple tracks.
        </FAQuestion>
      </div>

      <div class="faq-item">
        <FAQuestion>
          {#snippet question()}
            <span>What can I win?</span>
          {/snippet}
          For the winning team, each person will receive £200 and can choose from
          a range of prizes including: smartwatches, Steam vouchers, Amazon vouchers,
          or Sony XM4 headphones.
        </FAQuestion>
      </div>

      <div class="faq-item">
        <FAQuestion>
          {#snippet question()}
            <span>You didn't answer my questions!</span>
          {/snippet}
          You can ask us anything in our
          <a target="_blank" href="/discord" class="theme-hyperlink"
            >Discord server</a
          >! You can also email us at
          <a href="mailto:camhack@cucats.org" class="theme-hyperlink"
            >camhack@cucats.org</a
          >, or speak to us in person at the event, where we will be happy to
          answer.
        </FAQuestion>
      </div>
    </div>
  </div>

  <div class="section-divider"></div>
</section>
