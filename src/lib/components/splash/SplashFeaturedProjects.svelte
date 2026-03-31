<script>
  import { onMount } from "svelte";

  let visible = $state(false);
  let sectionRef;

  const projects = [
    {
      title: "Unintended Behaviour",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      image: "/unintended.png",
      link: "https://cam-hack-2025.devpost.com",
      award: "Grand Prize Winner",
    },
    {
      title: "Project Alpha",
      description:
        "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      image: "/cam-hack-theme.png",
      link: "https://cam-hack-2025.devpost.com/project-gallery",
      award: "Runner Up",
    },
    {
      title: "Neural Vision",
      description:
        "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
      image: "/cam-hack-theme.png",
      link: "https://cam-hack-2025.devpost.com/project-gallery",
      award: "Best Innovation",
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
      { threshold: 0.2 },
    );

    if (sectionRef) observer.observe(sectionRef);
    return () => observer.disconnect();
  });
</script>

<section bind:this={sectionRef} class="featured-section" class:visible>
  <div class="section-header">
    <h2 class="section-title">Featured Projects</h2>
    <div class="title-underline"></div>
  </div>

  <div class="projects-grid">
    {#each projects as project, i}
      <a
        href={project.link}
        target="_blank"
        class="project-card"
        style="animation-delay: {i * 0.2}s"
      >
        <div class="card-glow"></div>
        <div class="card-content">
          <div class="image-container">
            <img
              src={project.image}
              alt={project.title}
              class="project-image"
            />
            <div class="image-overlay"></div>
            {#if project.award}
              <div class="award-badge">{project.award}</div>
            {/if}
          </div>
          <div class="project-info">
            <h3 class="project-title">{project.title}</h3>
            <p class="project-description">{project.description}</p>
            <div class="view-project">
              <span>View Project</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </div>
          </div>
        </div>
      </a>
    {/each}
  </div>

  <div class="view-all-container">
    <a
      href="https://cam-hack-2025.devpost.com/project-gallery"
      target="_blank"
      class="view-all-btn"
    >
      <span>View All Projects</span>
      <div class="btn-particles"></div>
    </a>
  </div>
</section>

<style>
  .featured-section {
    padding: 6rem 2rem;
    max-width: 1400px;
    margin: 0 auto;
    opacity: 0;
    transform: translateY(50px);
    transition:
      opacity 0.8s ease,
      transform 0.8s ease;
  }

  .featured-section.visible {
    opacity: 1;
    transform: translateY(0);
  }

  .section-header {
    text-align: center;
    margin-bottom: 4rem;
  }

  .section-title {
    font-size: clamp(2rem, 5vw, 3.5rem);
    color: #e6edf3;
    margin-bottom: 1rem;
  }

  .title-underline {
    width: 100px;
    height: 4px;
    background: linear-gradient(90deg, #00ff88, #9945ff);
    margin: 0 auto;
    border-radius: 2px;
    animation: underlineGlow 2s ease-in-out infinite;
  }

  @keyframes underlineGlow {
    0%,
    100% {
      box-shadow:
        0 0 10px rgba(0, 255, 136, 0.5),
        0 0 20px rgba(153, 69, 255, 0.3);
    }
    50% {
      box-shadow:
        0 0 20px rgba(0, 255, 136, 0.8),
        0 0 40px rgba(153, 69, 255, 0.5);
    }
  }

  .projects-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 2rem;
    margin-bottom: 3rem;
  }

  .project-card {
    position: relative;
    border-radius: 20px;
    overflow: hidden;
    text-decoration: none;
    background: rgba(22, 27, 34, 0.8);
    border: 1px solid rgba(0, 255, 136, 0.2);
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    animation: cardSlideUp 0.6s ease-out forwards;
    opacity: 0;
    transform: translateY(30px);
  }

  @keyframes cardSlideUp {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .project-card:hover {
    transform: translateY(-10px) scale(1.02);
    border-color: rgba(0, 255, 136, 0.5);
    box-shadow:
      0 20px 40px rgba(0, 0, 0, 0.4),
      0 0 30px rgba(0, 255, 136, 0.2);
  }

  .card-glow {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(
      circle at 50% 0%,
      rgba(0, 255, 136, 0.1) 0%,
      transparent 50%
    );
    opacity: 0;
    transition: opacity 0.3s ease;
    pointer-events: none;
  }

  .project-card:hover .card-glow {
    opacity: 1;
  }

  .card-content {
    position: relative;
    z-index: 1;
  }

  .image-container {
    position: relative;
    overflow: hidden;
    height: 200px;
  }

  .project-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
  }

  .project-card:hover .project-image {
    transform: scale(1.1);
  }

  .image-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      180deg,
      transparent 0%,
      rgba(13, 17, 23, 0.8) 100%
    );
  }

  .award-badge {
    position: absolute;
    top: 1rem;
    right: 1rem;
    background: linear-gradient(135deg, #00ff88, #0a9254);
    color: #0d1117;
    padding: 0.5rem 1rem;
    border-radius: 50px;
    font-size: 0.8rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 1px;
    box-shadow: 0 4px 15px rgba(0, 255, 136, 0.4);
  }

  .project-info {
    padding: 1.5rem;
  }

  .project-title {
    font-size: 1.5rem;
    color: #e6edf3;
    margin-bottom: 0.5rem;
  }

  .project-description {
    color: #8b949e;
    font-size: 0.95rem;
    line-height: 1.6;
    margin-bottom: 1rem;
  }

  .view-project {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: #00ff88;
    font-weight: 600;
    transition: gap 0.3s ease;
  }

  .project-card:hover .view-project {
    gap: 1rem;
  }

  .view-project svg {
    transition: transform 0.3s ease;
  }

  .project-card:hover .view-project svg {
    transform: translateX(5px);
  }

  .view-all-container {
    text-align: center;
  }

  .view-all-btn {
    position: relative;
    display: inline-block;
    padding: 1rem 3rem;
    font-size: 1.1rem;
    font-weight: 600;
    color: #00ff88;
    background: transparent;
    border: 2px solid #00ff88;
    border-radius: 50px;
    text-decoration: none;
    overflow: hidden;
    transition: all 0.3s ease;
  }

  .view-all-btn:hover {
    background: rgba(0, 255, 136, 0.1);
    box-shadow:
      0 0 20px rgba(0, 255, 136, 0.4),
      inset 0 0 20px rgba(0, 255, 136, 0.1);
    transform: scale(1.05);
  }

  .view-all-btn span {
    position: relative;
    z-index: 1;
  }

  @media (max-width: 768px) {
    .projects-grid {
      grid-template-columns: 1fr;
    }

    .featured-section {
      padding: 4rem 1rem;
    }
  }
</style>
