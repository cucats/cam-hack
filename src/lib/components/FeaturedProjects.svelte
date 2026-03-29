<script>
  import { onMount } from "svelte";
  import gsap from "gsap";
  import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

  let sectionElement;
  let projectCards = [];

  const projects = [
    {
      title: "Unintended Behaviour",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.",
      link: "https://cam-hack-2025.devpost.com",
      image: "/unintended.png",
      award: "Grand Prize",
    },
    {
      title: "Project Alpha",
      description:
        "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo.",
      link: "https://cam-hack-2025.devpost.com/project-gallery",
      image: "/cam-hack-theme.png",
      award: "Best Innovation",
    },
    {
      title: "Project Beta",
      description:
        "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
      link: "https://cam-hack-2025.devpost.com/project-gallery",
      image: "/cam-hack-theme.png",
      award: "Best Design",
    },
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
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      },
    );

    projectCards.forEach((card, index) => {
      gsap.fromTo(
        card,
        { y: 100, opacity: 0, rotateX: 15 },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: 0.8,
          delay: index * 0.2,
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
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
      Featured Projects
    </h2>

    <div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      {#each projects as project, index}
        <a
          href={project.link}
          target="_blank"
          bind:this={projectCards[index]}
          class="glass-card group hover:border-primary-500/50 relative overflow-hidden transition-all duration-500 hover:scale-[1.02]"
          style="perspective: 1000px;"
        >
          <div
            class="from-primary-500 to-accent-500 text-dark-950 absolute -top-2 -right-2 z-20 rounded-tr-xl rounded-bl-xl bg-gradient-to-r px-4 py-2 text-sm font-bold"
          >
            {project.award}
          </div>

          <div class="relative mb-4 overflow-hidden rounded-xl">
            <img
              src={project.image}
              alt={project.title}
              class="h-48 w-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div
              class="from-dark-950/80 absolute inset-0 bg-gradient-to-t to-transparent"
            ></div>
          </div>

          <h3
            class="text-primary-400 group-hover:text-primary-300 mb-2 text-xl font-bold transition-colors"
          >
            {project.title}
          </h3>

          <p class="text-dark-400">{project.description}</p>

          <div
            class="text-accent-400 mt-4 flex items-center opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          >
            <span class="text-sm font-semibold">View Project</span>
            <svg
              class="ml-2 h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              ></path>
            </svg>
          </div>

          <div
            class="from-primary-500/10 to-accent-500/10 absolute inset-0 -z-10 bg-gradient-to-br opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          ></div>
        </a>
      {/each}
    </div>

    <div class="mt-12 text-center">
      <a
        href="https://cam-hack-2025.devpost.com/project-gallery"
        target="_blank"
        class="border-primary-500/50 bg-primary-500/10 text-primary-400 hover:bg-primary-500/20 inline-flex items-center gap-2 rounded-xl border px-6 py-3 font-semibold transition-all duration-300 hover:shadow-[0_0_20px_rgba(16,185,129,0.3)]"
      >
        View All Projects
        <svg
          class="h-5 w-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
          ></path>
        </svg>
      </a>
    </div>
  </div>

  <div class="section-divider"></div>
</section>
