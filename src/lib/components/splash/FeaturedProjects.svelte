<script>
  import { onMount } from "svelte";

  const projects = [
    {
      title: "Unintended Behaviour",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.",
    },
    {
      title: "Neural Nexus",
      description:
        "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo.",
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

  let visible = $state(false);
  let container;

  onMount(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            visible = true;
          }
        });
      },
      { threshold: 0.1 }
    );

    if (container) {
      observer.observe(container);
    }

    return () => {
      if (container) {
        observer.unobserve(container);
      }
    };
  });
</script>

<section class="projects-section">
  <div bind:this={container} class="projects-container">
    <h2 class="section-title">Featured Projects</h2>
    <div class="projects-grid" class:visible>
      {#each projects as project, i}
        <div
          class="project-card"
          style="animation-delay: {i * 0.15}s"
        >
          <div class="project-glow"></div>
          <h3 class="project-title">{project.title}</h3>
          <p class="project-description">{project.description}</p>
          <div class="project-accent"></div>
        </div>
      {/each}
    </div>
  </div>
</section>

<style>
  .projects-section {
    @apply py-20 px-4 sm:px-8;
    background: linear-gradient(
      180deg,
      rgba(134, 226, 147, 0.05) 0%,
      transparent 100%
    );
    position: relative;
    overflow: hidden;
  }

  .projects-container {
    @apply mx-auto max-w-7xl;
  }

  .section-title {
    @apply text-5xl sm:text-6xl md:text-7xl font-bold text-center mb-16;
    background: linear-gradient(135deg, #86e293 0%, #86e6c6 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: title-appear 1s ease-out;
  }

  .projects-grid {
    @apply grid grid-cols-1 md:grid-cols-2 gap-8;
  }

  .projects-grid.visible .project-card {
    opacity: 1;
    transform: translateY(0) rotateX(0deg);
  }

  .project-card {
    @apply relative p-8 rounded-3xl;
    background: rgba(255, 255, 255, 0.7);
    backdrop-filter: blur(10px);
    border: 2px solid rgba(134, 226, 147, 0.3);
    opacity: 0;
    transform: translateY(50px) rotateX(15deg);
    transition: all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
    transform-style: preserve-3d;
    perspective: 1000px;
  }

  .project-card:hover {
    transform: translateY(-10px) scale(1.02);
    border-color: rgba(134, 226, 147, 0.6);
    box-shadow: 0 20px 60px rgba(134, 226, 147, 0.3);
  }

  .project-glow {
    @apply absolute inset-0 rounded-3xl;
    background: radial-gradient(
      circle at 50% 0%,
      rgba(134, 226, 147, 0.2) 0%,
      transparent 70%
    );
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  .project-card:hover .project-glow {
    opacity: 1;
  }

  .project-title {
    @apply text-3xl font-bold mb-4;
    color: #86e293;
    position: relative;
    z-index: 1;
  }

  .project-description {
    @apply text-lg text-slate-700;
    position: relative;
    z-index: 1;
    line-height: 1.6;
  }

  .project-accent {
    @apply absolute bottom-0 left-0 right-0 h-1 rounded-b-3xl;
    background: linear-gradient(90deg, #86e293 0%, #86e6c6 100%);
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  .projects-grid.visible .project-card .project-accent {
    transform: scaleX(1);
  }

  @keyframes title-appear {
    from {
      opacity: 0;
      transform: translateY(-30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
</style>
