<script>
  const projects = [
    {
      title: "Unintended Behaviour",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.",
      image: "/unintended.png",
      link: "https://cam-hack-2025.devpost.com",
    },
    {
      title: "Project Alpha",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum.",
      image: "/cam-hack-theme.png",
      link: "https://cam-hack-2025.devpost.com/project-gallery",
    },
    {
      title: "Neural Interface",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin gravida dolor sit amet lacus.",
      image: "/cam-hack-theme.png",
      link: "https://cam-hack-2025.devpost.com/project-gallery",
    },
  ];

  let hoveredIndex = $state(-1);
</script>

<div class="mx-auto max-w-7xl py-20">
  <h2 class="mb-4 text-center text-4xl font-bold sm:text-5xl md:text-6xl">
    <span class="gradient-text">Featured Projects</span>
  </h2>
  <p class="mb-16 text-center text-lg text-gray-400">
    Lorem ipsum dolor sit amet consectetur adipiscing elit
  </p>

  <div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
    {#each projects as project, i}
      <a
        href={project.link}
        target="_blank"
        class="card group cursor-pointer"
        onmouseenter={() => (hoveredIndex = i)}
        onmouseleave={() => (hoveredIndex = -1)}
      >
        <div class="relative mb-4 overflow-hidden rounded-xl">
          <img
            src={project.image}
            alt={project.title}
            class="h-48 w-full object-cover transition-all duration-700 group-hover:scale-110"
          />
          <div
            class="from-dark-void absolute inset-0 bg-gradient-to-t via-transparent to-transparent"
          ></div>
          <div
            class="bg-neon-green/10 absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          ></div>
        </div>

        <h3
          class="group-hover:text-neon-green mb-2 text-xl font-bold transition-colors duration-300"
        >
          {project.title}
        </h3>

        <p class="text-sm leading-relaxed text-gray-400">
          {project.description}
        </p>

        <div
          class="text-neon-green mt-4 flex translate-x-[-10px] transform items-center opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
        >
          <span class="text-sm font-bold">View Project</span>
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
      </a>
    {/each}
  </div>

  <div class="mt-12 text-center">
    <a
      href="https://cam-hack-2025.devpost.com/project-gallery"
      target="_blank"
      class="text-neon-green hover:text-neon-cyan inline-flex items-center gap-2 text-lg font-bold transition-colors duration-300"
    >
      <span>View All Projects</span>
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
