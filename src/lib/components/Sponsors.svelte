<script>
  import { onMount } from "svelte";
  import gsap from "gsap";
  import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
  import { sponsors, organizers } from "./sponsors-data.js";

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

    const logos = sectionElement.querySelectorAll(".sponsor-logo");
    logos.forEach((logo, index) => {
      gsap.fromTo(
        logo,
        { scale: 0.5, opacity: 0, rotateY: 90 },
        {
          scale: 1,
          opacity: 1,
          rotateY: 0,
          duration: 0.6,
          delay: index * 0.1,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: sectionElement.querySelector(".sponsors-grid"),
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
      Sponsored by
    </h2>

    <div
      class="sponsors-grid mb-16 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4"
    >
      {#each sponsors as sponsor}
        <a
          href={sponsor.url}
          target="_blank"
          class="sponsor-logo glass-card group hover:border-primary-500/50 flex items-center justify-center p-6 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(16,185,129,0.2)]"
        >
          <img
            src={sponsor.logo}
            alt={sponsor.name}
            class="h-auto max-h-16 w-auto max-w-full opacity-70 grayscale transition-all duration-300 group-hover:opacity-100 group-hover:grayscale-0"
          />
        </a>
      {/each}
    </div>

    <div class="text-center">
      <h3 class="text-dark-300 mb-6 text-2xl">{organizers.runBy.title}</h3>
      <a
        href={organizers.runBy.url}
        target="_blank"
        class="sponsor-logo glass-card hover:border-primary-500/50 inline-block p-8 transition-all duration-300 hover:scale-105"
      >
        <img
          src={organizers.runBy.logo}
          alt={organizers.runBy.name}
          class="h-auto max-h-20 w-auto max-w-[200px] opacity-80 transition-opacity duration-300 hover:opacity-100"
        />
      </a>
    </div>
  </div>

  <div class="section-divider"></div>
</section>
