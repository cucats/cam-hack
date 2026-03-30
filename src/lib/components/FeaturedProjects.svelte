<script>
  import { onMount } from "svelte";

  const projects = [
    { name: "Lorem Ipsum Generator", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." },
    { name: "Dolor Sit Amet", description: "Sed do eiusmod tempor incididunt ut labore et dolore magna." },
    { name: "Consectetur Adipiscing", description: "Ut enim ad minim veniam, quis nostrud exercitation." },
    { name: "Elit Sed Do", description: "Duis aute irure dolor in reprehenderit in voluptate velit." },
    { name: "Eiusmod Tempor", description: "Excepteur sint occaecat cupidatat non proident sunt." },
    { name: "Incididunt Ut Labore", description: "Magna aliqua enim ad minim veniam quis nostrud." },
  ];

  let visibleProjects = $state([]);
  let observer;
  let containerVisible = $state(false);

  onMount(() => {
    const container = document.querySelector(".featured-projects-container");
    if (container) {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              containerVisible = true;
              const elements = document.querySelectorAll(".project-card");
              elements.forEach((el, index) => {
                setTimeout(() => {
                  visibleProjects = [...visibleProjects, index];
                }, index * 150);
              });
            }
          });
        },
        { threshold: 0.1 }
      );
      observer.observe(container);
    }

    return () => {
      if (observer && container) {
        observer.unobserve(container);
      }
    };
  });
</script>

<div class="featured-projects-container mx-auto max-w-7xl">
  <h2 class="mb-12 text-center">Featured Projects</h2>
  <div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
    {#each projects as project, index}
      <div
        class="project-card group relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-50 to-cyan-50 p-8 shadow-lg transition-all duration-700 {visibleProjects.includes(index)
          ? 'translate-y-0 opacity-100 scale-100'
          : 'translate-y-20 opacity-0 scale-95'}"
      >
        <div class="absolute inset-0 bg-gradient-to-br from-emerald-400/0 via-emerald-500/0 to-emerald-600/0 transition-all duration-500 group-hover:from-emerald-400/30 group-hover:via-emerald-500/20 group-hover:to-emerald-600/30"></div>
        <div class="absolute top-0 left-0 h-full w-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
        <h3 class="relative mb-4 text-2xl font-bold text-emerald-900 transition-colors duration-300 group-hover:text-emerald-700">{project.name}</h3>
        <p class="relative text-emerald-700">{project.description}</p>
        <div class="relative mt-6 flex items-center text-emerald-600 group-hover:text-emerald-500 transition-colors duration-300">
          <span class="text-sm font-semibold">View Project</span>
          <svg
            class="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 5l7 7-7 7"
            ></path>
          </svg>
        </div>
      </div>
    {/each}
  </div>
</div>

<style>
  .project-card {
    transform-style: preserve-3d;
  }

  .project-card:hover {
    transform: translateY(-12px) scale(1.03) rotateY(2deg);
    box-shadow: 0 25px 50px rgba(16, 185, 129, 0.4);
  }
</style>