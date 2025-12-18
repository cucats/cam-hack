<script>
  import { onMount } from "svelte";

  let projects = [
    {
      title: "Unintended Behaviour",
      image: "/unintended.png",
      link: "https://cam-hack-2025.devpost.com",
    },
  ];

  let visible = $state(false);

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

    const container = document.querySelector(".projects-container");
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

<div class="projects-container">
  <h2 class="section-title">Featured Projects</h2>
  <div class="projects-grid">
    {#each projects as project, i}
      <div
        class="project-card"
        style="animation-delay: {i * 0.2}s"
        class:visible
      >
        <a target="_blank" href={project.link} class="project-link">
          <div class="project-image-wrapper">
            <img src={project.image} alt={project.title} class="project-image" />
            <div class="project-overlay">
              <h3 class="project-title">{project.title}</h3>
            </div>
          </div>
        </a>
      </div>
    {/each}
  </div>
</div>

<style>
  .projects-container {
    margin: 0 auto;
    max-width: 80rem;
    padding-top: 4rem;
    padding-bottom: 4rem;
  }

  .section-title {
    font-size: 3rem;
    font-weight: 700;
    text-align: center;
    margin-bottom: 3rem;
    background: linear-gradient(to right, #10b981, #10b981, #059669);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    font-family: "Ubuntu Mono", monospace;
  }

  .projects-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 2rem;
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
    opacity: 0;
    transform: translateY(2.5rem);
    transition: opacity 1s ease, transform 1s ease;
  }

  .project-card.visible {
    opacity: 1;
    transform: translateY(0);
  }

  .project-link {
    display: block;
    position: relative;
    overflow: hidden;
    border-radius: 1.5rem;
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
    transition: transform 0.3s ease;
  }

  .project-link:hover {
    transform: translateY(-10px) scale(1.02);
  }

  .project-image-wrapper {
    position: relative;
    aspect-ratio: 16 / 9;
  }

  .project-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
  }

  .project-link:hover .project-image {
    transform: scale(1.1);
  }

  .project-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      to top,
      rgba(5, 150, 105, 0.9),
      rgba(6, 95, 70, 0.5),
      transparent
    );
    opacity: 0;
    transition: opacity 0.3s ease;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    padding: 1.5rem;
  }

  .project-link:hover .project-overlay {
    opacity: 1;
  }

  .project-title {
    font-size: 1.5rem;
    font-weight: 700;
    color: white;
    text-align: center;
    font-family: "Ubuntu Mono", monospace;
  }
</style>
