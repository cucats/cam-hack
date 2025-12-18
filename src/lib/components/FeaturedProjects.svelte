<script>
  import { onMount } from "svelte";

  const projects = [
    {
      title: "Unintended Behaviour",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      title: "Neural Nexus",
      description:
        "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    },
    {
      title: "Quantum Quasar",
      description:
        "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    },
    {
      title: "Synthetic Symphony",
      description:
        "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    },
  ];

  let visibleProjects = $state([]);

  onMount(() => {
    projects.forEach((project, index) => {
      setTimeout(() => {
        visibleProjects = [...visibleProjects, project];
      }, index * 200);
    });
  });
</script>

<div class="featured-projects">
  <h2 class="section-title">Featured Projects</h2>
  <div class="projects-grid">
    {#each projects as project, index}
      <div
        class="project-card"
        style="--index: {index}"
        class:visible={visibleProjects.includes(project)}
      >
        <div class="project-glow"></div>
        <h3 class="project-title">{project.title}</h3>
        <p class="project-description">{project.description}</p>
      </div>
    {/each}
  </div>
</div>

<style>
  .featured-projects {
    @apply mx-auto max-w-7xl py-16 px-4;
  }

  .section-title {
    @apply text-5xl font-bold text-center mb-16;
    font-family: "Ubuntu Mono", monospace;
    color: #059669;
    text-shadow: 0 0 20px rgba(134, 226, 147, 0.3);
    animation: title-entrance 1s ease-out;
  }

  .projects-grid {
    @apply grid grid-cols-1 md:grid-cols-2 gap-8;
  }

  .project-card {
    @apply relative p-8 rounded-2xl bg-white/90 backdrop-blur-sm;
    border: 2px solid rgba(134, 226, 147, 0.3);
    opacity: 0;
    transform: translateY(50px) scale(0.9) rotateX(10deg);
    transition: all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
    overflow: hidden;
    transform-style: preserve-3d;
  }

  .project-card.visible {
    opacity: 1;
    transform: translateY(0) scale(1) rotateX(0deg);
  }

  .project-card:hover {
    transform: translateY(-15px) scale(1.03) rotateX(-5deg);
    border-color: rgba(134, 226, 147, 0.8);
    box-shadow: 0 25px 50px rgba(134, 226, 147, 0.4),
      0 0 80px rgba(134, 230, 198, 0.2);
  }

  .project-glow {
    @apply absolute inset-0 opacity-0;
    background: linear-gradient(
      135deg,
      rgba(134, 226, 147, 0.15) 0%,
      rgba(134, 230, 198, 0.15) 50%,
      rgba(5, 150, 105, 0.1) 100%
    );
    transition: opacity 0.5s ease;
    animation: glow-pulse 3s ease-in-out infinite;
  }

  .project-card:hover .project-glow {
    opacity: 1;
  }

  @keyframes glow-pulse {
    0%,
    100% {
      opacity: 0.1;
    }
    50% {
      opacity: 0.2;
    }
  }

  .project-title {
    @apply text-2xl font-bold mb-4 relative z-10;
    font-family: "Ubuntu Mono", monospace;
    color: #047857;
    animation: slide-in-left 0.8s ease-out;
    animation-delay: calc(var(--index) * 0.1s);
    animation-fill-mode: both;
  }

  .project-description {
    @apply text-lg relative z-10;
    color: #1e293b;
    line-height: 1.6;
    animation: fade-in 1s ease-out;
    animation-delay: calc(var(--index) * 0.1s + 0.3s);
    animation-fill-mode: both;
  }

  @keyframes title-entrance {
    from {
      opacity: 0;
      transform: translateY(-30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes slide-in-left {
    from {
      opacity: 0;
      transform: translateX(-30px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @keyframes fade-in {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
</style>