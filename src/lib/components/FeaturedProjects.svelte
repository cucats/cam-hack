<script>
  import { onMount } from "svelte";

  let mounted = $state(false);
  let visible = $state(false);
  let sectionRef;

  const projects = [
    {
      title: "Unintended Behaviour",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      image: "/unintended.png",
      link: "https://cam-hack-2025.devpost.com",
      featured: true,
    },
    {
      title: "Project Alpha",
      description:
        "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      image: "/cam-hack-theme.png",
      link: "https://cam-hack-2025.devpost.com/project-gallery",
      featured: false,
    },
    {
      title: "Project Beta",
      description:
        "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
      image: "/cam-hack-theme.png",
      link: "https://cam-hack-2025.devpost.com/project-gallery",
      featured: false,
    },
    {
      title: "Project Gamma",
      description:
        "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      image: "/cam-hack-theme.png",
      link: "https://cam-hack-2025.devpost.com/project-gallery",
      featured: false,
    },
  ];

  onMount(() => {
    mounted = true;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            visible = true;
          }
        });
      },
      { threshold: 0.1 },
    );

    if (sectionRef) {
      observer.observe(sectionRef);
    }

    return () => observer.disconnect();
  });
</script>

<div
  bind:this={sectionRef}
  class="section-darker grid-bg noise-overlay relative py-24"
>
  <div class="relative z-10 mx-auto max-w-7xl px-4 sm:px-8">
    <div class="mb-16 text-center">
      <h2
        class="font-display mb-4 text-4xl font-bold sm:text-5xl {visible
          ? 'animate-slide-up'
          : 'opacity-0'}"
      >
        <span class="gradient-text text-glow">Featured Projects</span>
      </h2>
      <div
        class="neon-line mx-auto w-24 {visible
          ? 'animate-scale-in delay-200'
          : 'opacity-0'}"
      ></div>
    </div>

    <div
      class="featured-project mb-16 {visible
        ? 'animate-slide-up delay-300'
        : 'opacity-0'}"
    >
      <a
        target="_blank"
        href={projects[0].link}
        class="group gradient-border block overflow-hidden rounded-2xl transition-all duration-500 hover:scale-[1.02]"
      >
        <div class="relative aspect-video overflow-hidden">
          <img
            src={projects[0].image}
            alt={projects[0].title}
            class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div
            class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"
          ></div>
          <div class="absolute right-0 bottom-0 left-0 p-8">
            <div
              class="mb-2 inline-block rounded-full bg-emerald-500/20 px-4 py-1 text-sm font-semibold text-emerald-400"
            >
              Winner
            </div>
            <h3
              class="font-display mb-2 text-3xl font-bold text-white sm:text-4xl"
            >
              {projects[0].title}
            </h3>
            <p class="max-w-2xl text-gray-300">{projects[0].description}</p>
          </div>
        </div>
      </a>
    </div>

    <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {#each projects.slice(1) as project, index}
        <a
          target="_blank"
          href={project.link}
          class="group card-hover glass neon-border block overflow-hidden rounded-xl {visible
            ? 'animate-slide-up'
            : 'opacity-0'}"
          style="animation-delay: {0.4 + index * 0.1}s;"
        >
          <div class="relative aspect-video overflow-hidden">
            <img
              src={project.image}
              alt={project.title}
              class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div
              class="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent"
            ></div>
          </div>
          <div class="p-6">
            <h4
              class="font-display mb-2 text-xl font-bold text-white transition-colors group-hover:text-emerald-400"
            >
              {project.title}
            </h4>
            <p class="text-sm text-gray-400">{project.description}</p>
          </div>
        </a>
      {/each}
    </div>

    <div
      class="mt-12 text-center {visible
        ? 'animate-slide-up delay-700'
        : 'opacity-0'}"
    >
      <a
        target="_blank"
        href="https://cam-hack-2025.devpost.com/project-gallery"
        class="btn-neon inline-block rounded-xl"
      >
        View All Projects
      </a>
    </div>
  </div>
</div>

<style>
  .featured-project {
    perspective: 1000px;
  }
</style>
