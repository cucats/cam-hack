<script>
  import { onMount } from "svelte";
  import gsap from "gsap";
  import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

  let sectionElement;

  onMount(() => {
    gsap.registerPlugin(ScrollTrigger);

    const elements = sectionElement.querySelectorAll(".animate-in");
    elements.forEach((el, index) => {
      gsap.fromTo(
        el,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          delay: index * 0.15,
          scrollTrigger: {
            trigger: sectionElement,
            start: "top 75%",
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
      class="animate-in glow-text from-primary-400 to-accent-400 mb-8 bg-gradient-to-r bg-clip-text text-center text-transparent"
    >
      About
    </h2>

    <div class="grid gap-8 lg:grid-cols-2">
      <div class="glass-card animate-in">
        <div
          class="from-primary-500 to-accent-500 mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br"
        >
          <svg
            class="text-dark-950 h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
            ></path>
          </svg>
        </div>
        <h3 class="text-primary-400 mb-4">What is Cam Hack?</h3>
        <p class="text-dark-300">
          Cam Hack is a 2 day hackathon for the innovative minds at the
          University of Cambridge. Over an action-packed weekend, students come
          together to design and build technology projects from the ground up.
          We welcome participants ranging from curious beginners to seasoned
          coders. Expect plenty of free stash, food, and mini-events throughout
          this hackathon.
        </p>
      </div>

      <div class="glass-card animate-in">
        <div
          class="from-accent-500 to-primary-500 mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br"
        >
          <svg
            class="text-dark-950 h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
        </div>
        <h3 class="text-accent-400 mb-4">Prizes</h3>
        <p class="text-dark-300">
          For the winning team, each person will receive £200 and can choose
          from a range of prizes including: smartwatches, Steam vouchers, Amazon
          vouchers, or Sony XM4 headphones.
        </p>
      </div>
    </div>

    <div class="animate-in mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
      <div class="glass-card text-center">
        <div class="text-primary-400 text-3xl font-bold">2</div>
        <div class="text-dark-400 text-sm">Days</div>
      </div>
      <div class="glass-card text-center">
        <div class="text-accent-400 text-3xl font-bold">£200</div>
        <div class="text-dark-400 text-sm">Per Winner</div>
      </div>
      <div class="glass-card text-center">
        <div class="text-primary-400 text-3xl font-bold">5</div>
        <div class="text-dark-400 text-sm">Max Team Size</div>
      </div>
      <div class="glass-card text-center">
        <div class="text-accent-400 text-3xl font-bold">∞</div>
        <div class="text-dark-400 text-sm">Free Food</div>
      </div>
    </div>
  </div>

  <div class="section-divider"></div>
</section>
