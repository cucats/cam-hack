<script>
  import { onMount } from "svelte";
  import gsap from "gsap";
  import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

  let sectionElement;

  const team = [
    { name: "James Leung", image: "/james.png" },
    { name: "Uliana Ronska", image: "/uliana.jpg" },
    { name: "Athena Eng", image: "/athena.jpg" },
    { name: "Oliver Greenwood", image: "/oliver.png" },
    { name: "Jadon Mensah", image: "/jadon.png" },
  ];

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

    const members = sectionElement.querySelectorAll(".team-member");
    members.forEach((member, index) => {
      gsap.fromTo(
        member,
        { y: 50, opacity: 0, scale: 0.8 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.6,
          delay: index * 0.1,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: sectionElement.querySelector(".team-grid"),
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
      Organising Committee
    </h2>

    <div class="team-grid flex flex-wrap justify-center gap-8">
      {#each team as member, index}
        <div class="team-member group text-center">
          <div class="relative mb-4 inline-block">
            <div
              class="from-primary-500 to-accent-500 absolute -inset-1 rounded-full bg-gradient-to-r opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-70"
            ></div>
            <img
              class="group-hover:border-primary-500/50 relative h-32 w-32 rounded-full border-2 border-white/10 object-cover transition-all duration-300 group-hover:scale-105 sm:h-40 sm:w-40"
              src={member.image}
              alt={member.name}
            />
          </div>
          <p
            class="text-dark-200 group-hover:text-primary-400 font-semibold transition-colors"
          >
            {member.name}
          </p>
        </div>
      {/each}
    </div>
  </div>

  <div class="section-divider"></div>
</section>
