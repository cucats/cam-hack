<script>
  import { onMount } from "svelte";

  let sectionRef;
  let visible = $state(false);

  const projects = [
    {
      title: "Unintended Behaviour",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      image: "/unintended.png",
      link: "https://cam-hack-2025.devpost.com",
    },
    {
      title: "Project Alpha",
      description:
        "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      image: "/cam-hack-theme.png",
      link: "https://cam-hack-2025.devpost.com/project-gallery",
    },
    {
      title: "Neural Interface",
      description:
        "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
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
      { threshold: 0.1 }
    );

    if (sectionRef) {
      observer.observe(sectionRef);
    }

    return () => observer.disconnect();
  });
</script>

<div bind:this={sectionRef} class="featured-container">
  <h2 class="section-title" class:visible>
    <span class="title-decorator"></span>
    Featured Projects
    <span class="title-decorator"></span>
  </h2>

  <div class="projects-grid">
    {#each projects as project, i}
      <a
        href={project.link}
        target="_blank"
        class="project-card"
        class:visible
        style="--delay: {i * 0.2}s"
      >
        <div class="project-image-wrapper">
          <img src={project.image} alt={project.title} class="project-image" />
          <div class="project-overlay"></div>
          <div class="project-glow"></div>
        </div>
        <div class="project-content">
          <h3 class="project-title">{project.title}</h3>
          <p class="project-description">{project.description}</p>
          <div class="project-link">
            <span>View Project</span>
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </div>
        </div>
        <div class="card-border"></div>
      </a>
    {/each}
  </div>

  <a
    href="https://cam-hack-2025.devpost.com/project-gallery"
    target="_blank"
    class="view-all-button"
    class:visible
  >
    View All Projects
  </a>
</div>

<style>
  .featured-container {
    max-width: 1280px;
    margin: 0 auto;
    padding: 4rem 1rem;
  }

  .section-title {
    text-align: center;
    font-size: 2.5rem;
    margin-bottom: 4rem;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1.5rem;
    opacity: 0;
    transform: translateY(30px);
    transition:
      opacity 0.8s ease,
      transform 0.8s ease;
  }

  .section-title.visible {
    opacity: 1;
    transform: translateY(0);
  }

  .title-decorator {
    width: 60px;
    height: 2px;
    background: linear-gradient(90deg, transparent, #00ff88, transparent);
  }

  .projects-grid {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    gap: 2rem;
    margin-bottom: 3rem;
  }

  @media (min-width: 768px) {
    .projects-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (min-width: 1024px) {
    .projects-grid {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  .project-card {
    position: relative;
    background: rgba(0, 255, 136, 0.02);
    border-radius: 20px;
    overflow: hidden;
    text-decoration: none;
    color: inherit;
    opacity: 0;
    transform: translateY(50px) scale(0.95);
    transition:
      opacity 0.8s ease,
      transform 0.8s ease;
    transition-delay: var(--delay);
  }

  .project-card.visible {
    opacity: 1;
    transform: translateY(0) scale(1);
  }

  .project-card:hover {
    transform: translateY(-10px) scale(1.02);
  }

  .project-card:hover .project-overlay {
    opacity: 0.3;
  }

  .project-card:hover .project-glow {
    opacity: 1;
  }

  .project-card:hover .card-border {
    opacity: 1;
  }

  .project-card:hover .project-image {
    transform: scale(1.1);
  }

  .project-image-wrapper {
    position: relative;
    height: 200px;
    overflow: hidden;
  }

  .project-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.6s ease;
  }

  .project-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      to bottom,
      transparent 0%,
      rgba(0, 255, 136, 0.1) 100%
    );
    opacity: 0;
    transition: opacity 0.4s ease;
  }

  .project-glow {
    position: absolute;
    inset: 0;
    background: radial-gradient(
      circle at center,
      rgba(0, 255, 136, 0.2) 0%,
      transparent 70%
    );
    opacity: 0;
    transition: opacity 0.4s ease;
  }

  .project-content {
    padding: 1.5rem;
  }

  .project-title {
    font-family: "Orbitron", monospace;
    font-size: 1.25rem;
    margin-bottom: 0.75rem;
    color: #00ff88;
  }

  .project-description {
    font-size: 0.9rem;
    color: rgba(255, 255, 255, 0.7);
    line-height: 1.6;
    margin-bottom: 1rem;
  }

  .project-link {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: #00ffcc;
    font-size: 0.875rem;
    font-weight: 600;
    transition: all 0.3s ease;
  }

  .project-card:hover .project-link {
    gap: 1rem;
    color: #00ff88;
    text-shadow: 0 0 10px rgba(0, 255, 136, 0.5);
  }

  .project-link svg {
    transition: transform 0.3s ease;
  }

  .project-card:hover .project-link svg {
    transform: translateX(5px);
  }

  .card-border {
    position: absolute;
    inset: 0;
    border-radius: 20px;
    border: 2px solid transparent;
    background: linear-gradient(135deg, #00ff88, #00ffcc, #88ff00) border-box;
    -webkit-mask:
      linear-gradient(#fff 0 0) padding-box,
      linear-gradient(#fff 0 0);
    mask:
      linear-gradient(#fff 0 0) padding-box,
      linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    opacity: 0;
    transition: opacity 0.4s ease;
    pointer-events: none;
  }

  .view-all-button {
    display: block;
    width: fit-content;
    margin: 0 auto;
    padding: 1rem 3rem;
    border: 2px solid #00ff88;
    border-radius: 50px;
    color: #00ff88;
    font-weight: bold;
    text-decoration: none;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    opacity: 0;
    transform: translateY(30px);
    transition:
      opacity 0.8s ease,
      transform 0.8s ease,
      background 0.3s ease,
      box-shadow 0.3s ease;
    transition-delay: 0.6s;
  }

  .view-all-button.visible {
    opacity: 1;
    transform: translateY(0);
  }

  .view-all-button:hover {
    background: rgba(0, 255, 136, 0.1);
    box-shadow:
      0 0 30px rgba(0, 255, 136, 0.3),
      inset 0 0 30px rgba(0, 255, 136, 0.1);
  }
</style>
