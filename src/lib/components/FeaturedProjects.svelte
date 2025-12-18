<script>
  import { onMount } from "svelte";

  let visible = $state(false);
  let sectionRef;

  const projects = [
    {
      title: "Unintended Behaviour",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisi vel consectetur interdum.",
      image: "/unintended.png",
      link: "https://cam-hack-2025.devpost.com",
      featured: true,
    },
    {
      title: "Project Alpha",
      description:
        "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      image: "/cam-hack-theme.png",
      link: "https://cam-hack-2025.devpost.com/project-gallery",
    },
    {
      title: "Project Beta",
      description:
        "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
      image: "/cam-hack-theme.png",
      link: "https://cam-hack-2025.devpost.com/project-gallery",
    },
    {
      title: "Project Gamma",
      description:
        "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum.",
      image: "/cam-hack-theme.png",
      link: "https://cam-hack-2025.devpost.com/project-gallery",
    },
  ];

  onMount(() => {
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

<div bind:this={sectionRef} class="relative overflow-hidden py-24 sm:py-32">
  <div class="absolute inset-0 opacity-30">
    <div class="glow-orb"></div>
  </div>

  <div class="relative z-10 mx-auto max-w-7xl px-4 sm:px-8">
    <div class="title-container mb-16 text-center" class:visible>
      <h2 class="section-title text-gradient mx-auto">Featured Projects</h2>
      <p class="mx-auto mt-8 max-w-2xl text-lg text-gray-400">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </p>
    </div>

    <div class="featured-project mb-16" class:visible>
      <a
        href={projects[0].link}
        target="_blank"
        class="featured-link group relative block overflow-hidden rounded-3xl"
      >
        <div class="relative aspect-video overflow-hidden">
          <img
            src={projects[0].image}
            alt={projects[0].title}
            class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div class="featured-overlay absolute inset-0"></div>
          <div class="featured-border absolute inset-0 rounded-3xl"></div>
        </div>
        <div class="absolute right-0 bottom-0 left-0 p-8">
          <span
            class="featured-badge mb-2 inline-block rounded-full px-4 py-1 text-sm font-medium"
          >
            Featured
          </span>
          <h3 class="text-gradient mb-2 text-3xl font-bold sm:text-4xl">
            {projects[0].title}
          </h3>
          <p class="max-w-xl text-gray-300">{projects[0].description}</p>
        </div>
      </a>
    </div>

    <div
      class="projects-grid grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
      class:visible
    >
      {#each projects.slice(1) as project, index}
        <a
          href={project.link}
          target="_blank"
          class="project-card group card overflow-hidden p-0"
          style="animation-delay: {(index + 1) * 0.15}s"
        >
          <div class="relative aspect-video overflow-hidden">
            <img
              src={project.image}
              alt={project.title}
              class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div class="project-overlay absolute inset-0"></div>
          </div>
          <div class="p-6">
            <h4
              class="project-title mb-2 text-xl font-bold text-gray-100 transition-colors"
            >
              {project.title}
            </h4>
            <p class="text-sm text-gray-400">{project.description}</p>
          </div>
        </a>
      {/each}
    </div>

    <div class="cta-container mt-12 text-center" class:visible>
      <a
        href="https://cam-hack-2025.devpost.com/project-gallery"
        target="_blank"
        class="btn-secondary inline-flex items-center gap-2"
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
            d="M17 8l4 4m0 0l-4 4m4-4H3"
          />
        </svg>
      </a>
    </div>
  </div>
</div>

<style>
  .section-title::after {
    left: 50%;
    transform: translateX(-50%);
  }

  .glow-orb {
    background: linear-gradient(
      to bottom,
      transparent,
      rgba(16, 185, 129, 0.05),
      transparent
    );
    width: 100%;
    height: 100%;
  }

  .featured-project,
  .projects-grid,
  .title-container,
  .cta-container {
    opacity: 0;
    transform: translateY(30px);
    transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .visible.featured-project,
  .visible.projects-grid,
  .visible.title-container,
  .visible.cta-container {
    opacity: 1;
    transform: translateY(0);
  }

  .projects-grid .project-card {
    opacity: 0;
    transform: translateY(20px);
  }

  .visible.projects-grid .project-card {
    animation: fadeInUp 0.6s ease-out forwards;
  }

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .featured-overlay {
    background: linear-gradient(to top, #0a0a0f, transparent);
    opacity: 0.8;
  }

  .featured-border {
    border: 2px solid transparent;
    transition: border-color 0.3s ease;
  }

  .featured-link:hover .featured-border {
    border-color: rgba(16, 185, 129, 0.5);
  }

  .featured-badge {
    background-color: rgba(16, 185, 129, 0.2);
    color: #10b981;
  }

  .project-overlay {
    background: linear-gradient(to top, #0a0a0f, transparent);
  }

  .project-card:hover .project-title {
    color: #10b981;
  }
</style>
