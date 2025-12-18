<script>
  import { onMount } from "svelte";

  const featuredProjects = [
    {
      title: "Lorem Ipsum Dolor",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      tech: ["React", "Node.js", "Three.js"],
    },
    {
      title: "Sit Amet Consectetur",
      description:
        "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      tech: ["Python", "TensorFlow", "FastAPI"],
    },
    {
      title: "Adipiscing Elit Sed",
      description:
        "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
      tech: ["Svelte", "TypeScript", "WebGL"],
    },
    {
      title: "Eiusmod Tempor",
      description:
        "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      tech: ["Rust", "WebAssembly", "WASM"],
    },
  ];

  let container;
  let visibleCards = $state(new Set());

  onMount(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = parseInt(entry.target.dataset.index);
          if (entry.isIntersecting) {
            visibleCards.add(index);
          }
        });
      },
      { threshold: 0.1 }
    );

    setTimeout(() => {
      const cards = container?.querySelectorAll(".project-card");
      cards?.forEach((card) => observer.observe(card));
    }, 100);

    return () => {
      const cards = container?.querySelectorAll(".project-card");
      cards?.forEach((card) => observer.unobserve(card));
    };
  });
</script>

<section class="projects-section">
  <div class="projects-container" bind:this={container}>
    <h2 class="projects-title">Featured Projects</h2>
    <div class="projects-grid">
      {#each featuredProjects as project, index}
        <div
          class="project-card"
          data-index={index}
          style="--index: {index}; --delay: {index * 0.1}s"
          class:visible={visibleCards.has(index)}
        >
          <div class="project-card-inner">
            <div class="project-number">0{index + 1}</div>
            <h3 class="project-title">{project.title}</h3>
            <p class="project-description">{project.description}</p>
            <div class="project-tech">
              {#each project.tech as tech}
                <span class="tech-tag">{tech}</span>
              {/each}
            </div>
          </div>
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
      rgba(255, 255, 255, 0.95) 0%,
      rgba(209, 250, 229, 0.3) 100%
    );
    position: relative;
    overflow: hidden;
  }

  .projects-section::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(
      circle at 50% 50%,
      rgba(134, 226, 147, 0.1) 0%,
      transparent 70%
    );
    pointer-events: none;
  }

  .projects-container {
    @apply mx-auto max-w-7xl relative z-10;
  }

  .projects-title {
    @apply text-5xl sm:text-6xl md:text-7xl font-bold text-center mb-16;
    background: linear-gradient(135deg, #86e293 0%, #86e6c6 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: fadeInUp 0.8s ease-out both;
  }

  .projects-grid {
    @apply grid grid-cols-1 md:grid-cols-2 gap-8;
  }

  .project-card {
    @apply relative;
    opacity: 0;
    transform: translateY(50px) rotateX(10deg);
    transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
    transition-delay: var(--delay, 0s);
    perspective: 1000px;
  }

  .project-card.visible {
    opacity: 1;
    transform: translateY(0) rotateX(0);
  }

  .project-card-inner {
    @apply bg-white rounded-3xl p-8 h-full;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
    border: 2px solid transparent;
    background-clip: padding-box;
    position: relative;
    overflow: hidden;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .project-card-inner::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #86e293 0%, #86e6c6 100%);
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .project-card:hover .project-card-inner {
    transform: translateY(-10px) scale(1.02);
    box-shadow: 0 20px 60px rgba(134, 226, 147, 0.3);
    border-color: rgba(134, 226, 147, 0.3);
  }

  .project-card:hover .project-card-inner::before {
    transform: scaleX(1);
  }

  .project-number {
    @apply text-6xl font-bold;
    background: linear-gradient(135deg, #86e293 0%, #86e6c6 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    opacity: 0.2;
    position: absolute;
    top: -10px;
    right: 20px;
    line-height: 1;
    transition: opacity 0.4s;
  }

  .project-card:hover .project-number {
    opacity: 0.4;
  }

  .project-title {
    @apply text-2xl font-bold mb-4 text-slate-800;
    position: relative;
    z-index: 1;
  }

  .project-description {
    @apply text-slate-600 mb-6 leading-relaxed;
    position: relative;
    z-index: 1;
  }

  .project-tech {
    @apply flex flex-wrap gap-2;
    position: relative;
    z-index: 1;
  }

  .tech-tag {
    @apply px-4 py-2 rounded-full text-sm font-medium;
    background: linear-gradient(135deg, rgba(134, 226, 147, 0.2) 0%, rgba(134, 230, 198, 0.2) 100%);
    color: #059669;
    border: 1px solid rgba(134, 226, 147, 0.3);
    transition: all 0.3s;
  }

  .project-card:hover .tech-tag {
    background: linear-gradient(135deg, rgba(134, 226, 147, 0.3) 0%, rgba(134, 230, 198, 0.3) 100%);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(134, 226, 147, 0.2);
  }

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
</style>
