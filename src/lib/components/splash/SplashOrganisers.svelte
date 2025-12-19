<script>
  import { onMount } from "svelte";

  let visible = $state(false);
  let sectionRef;

  const organisers = [
    { name: "James Leung", image: "/james.png" },
    { name: "Uliana Ronska", image: "/uliana.jpg" },
    { name: "Athena Eng", image: "/athena.jpg" },
    { name: "Oliver Greenwood", image: "/oliver.png" },
    { name: "Jadon Mensah", image: "/jadon.png" },
  ];

  onMount(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) visible = true;
        });
      },
      { threshold: 0.2 },
    );

    if (sectionRef) observer.observe(sectionRef);
    return () => observer.disconnect();
  });
</script>

<section bind:this={sectionRef} class="organisers-section" class:visible>
  <div class="content-wrapper">
    <div class="section-header">
      <h2 class="section-title">Organising Committee</h2>
      <div class="title-underline"></div>
    </div>

    <div class="organisers-grid">
      {#each organisers as organiser, i}
        <div class="organiser-card" style="animation-delay: {i * 0.15}s">
          <div class="image-container">
            <img
              src={organiser.image}
              alt={organiser.name}
              class="organiser-image"
            />
            <div class="image-border"></div>
            <div class="image-glow"></div>
          </div>
          <div class="organiser-info">
            <h3 class="organiser-name">{organiser.name}</h3>
            <div class="name-underline"></div>
          </div>
        </div>
      {/each}
    </div>
  </div>

  <div class="section-footer">
    <p class="footer-text">
      <span class="footer-line">Copyright © Cam Hack 2025</span>
      <span class="footer-separator">•</span>
      <span class="footer-line">Art by Gwen Sellers</span>
    </p>
    <div class="footer-links">
      <a href="mailto:camhack@cucats.org" class="footer-link">Contact</a>
      <span class="footer-separator">•</span>
      <a href="/code-of-conduct" class="footer-link">Code of Conduct</a>
    </div>
  </div>
</section>

<style>
  .organisers-section {
    padding: 6rem 2rem 4rem;
    opacity: 0;
    transform: translateY(50px);
    transition:
      opacity 0.8s ease,
      transform 0.8s ease;
  }

  .organisers-section.visible {
    opacity: 1;
    transform: translateY(0);
  }

  .content-wrapper {
    max-width: 1000px;
    margin: 0 auto;
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
    background: linear-gradient(90deg, #9945ff, #00d4ff);
    margin: 0 auto;
    border-radius: 2px;
  }

  .organisers-grid {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 2.5rem;
  }

  .organiser-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    animation: cardPop 0.6s ease-out forwards;
    opacity: 0;
    transform: scale(0.8) translateY(20px);
  }

  @keyframes cardPop {
    to {
      opacity: 1;
      transform: scale(1) translateY(0);
    }
  }

  .image-container {
    position: relative;
    width: 140px;
    height: 140px;
    margin-bottom: 1rem;
  }

  .organiser-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
    position: relative;
    z-index: 1;
    transition: all 0.4s ease;
    filter: grayscale(0.3);
  }

  .organiser-card:hover .organiser-image {
    transform: scale(1.1);
    filter: grayscale(0);
  }

  .image-border {
    position: absolute;
    top: -4px;
    left: -4px;
    right: -4px;
    bottom: -4px;
    border-radius: 50%;
    background: linear-gradient(135deg, #00ff88, #9945ff, #00d4ff, #00ff88);
    background-size: 400% 400%;
    z-index: 0;
    animation: gradientRotate 4s linear infinite;
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  .organiser-card:hover .image-border {
    opacity: 1;
  }

  @keyframes gradientRotate {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }

  .image-glow {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 160px;
    height: 160px;
    background: radial-gradient(
      circle,
      rgba(0, 255, 136, 0.3) 0%,
      transparent 70%
    );
    transform: translate(-50%, -50%);
    z-index: -1;
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  .organiser-card:hover .image-glow {
    opacity: 1;
  }

  .organiser-info {
    text-align: center;
  }

  .organiser-name {
    font-size: 1.1rem;
    color: #e6edf3;
    margin: 0 0 0.5rem;
    transition: color 0.3s ease;
  }

  .organiser-card:hover .organiser-name {
    color: #00ff88;
  }

  .name-underline {
    width: 0;
    height: 2px;
    background: linear-gradient(90deg, #00ff88, #9945ff);
    margin: 0 auto;
    transition: width 0.3s ease;
  }

  .organiser-card:hover .name-underline {
    width: 100%;
  }

  .section-footer {
    text-align: center;
    margin-top: 6rem;
    padding-top: 3rem;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
  }

  .footer-text {
    color: #8b949e;
    margin-bottom: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .footer-links {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
  }

  .footer-link {
    color: #00ff88;
    text-decoration: none;
    transition: all 0.3s ease;
  }

  .footer-link:hover {
    color: #9945ff;
    text-shadow: 0 0 10px rgba(153, 69, 255, 0.5);
  }

  .footer-separator {
    color: rgba(255, 255, 255, 0.3);
  }

  @media (max-width: 640px) {
    .organisers-grid {
      gap: 2rem;
    }

    .image-container {
      width: 120px;
      height: 120px;
    }

    .footer-text {
      flex-direction: column;
    }

    .footer-text .footer-separator {
      display: none;
    }
  }
</style>
