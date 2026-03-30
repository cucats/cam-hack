<script>
  import { onMount } from "svelte";
  import { sponsors, organizers } from "./sponsors-data.js";

  let visible = false;

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

    const element = document.querySelector(".sponsors-section");
    if (element) observer.observe(element);

    return () => observer.disconnect();
  });
</script>

<div class="sponsors-section" class:visible>
  <div class="container">
    <div class="header-container">
      <h2 class="section-title">
        <span class="title-line"></span>
        <span class="title-text">Sponsors</span>
        <span class="title-line"></span>
      </h2>
      <p class="section-subtitle">Powered by Innovation</p>
    </div>

    <div class="sponsors-grid">
      {#each sponsors as sponsor, index}
        <div class="sponsor-card" style="animation-delay: {index * 0.1}s">
          <div class="card-border"></div>
          <a
            href={sponsor.url}
            target="_blank"
            rel="noopener noreferrer"
            class="sponsor-link"
          >
            <div class="logo-wrapper">
              <img
                src={sponsor.logo}
                alt={sponsor.name}
                class="sponsor-logo {sponsor.className}"
              />
            </div>
          </a>
        </div>
      {/each}
    </div>

    <div class="organizer-section">
      <h3 class="organizer-title">{organizers.runBy.title}</h3>
      <a
        href={organizers.runBy.url}
        target="_blank"
        rel="noopener noreferrer"
        class="organizer-link"
      >
        <img
          src={organizers.runBy.logo}
          alt={organizers.runBy.name}
          class="organizer-logo"
        />
      </a>
    </div>
  </div>
</div>

<style>
  .sponsors-section {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 4rem 2rem;
    position: relative;
  }

  .container {
    max-width: 1400px;
    width: 100%;
    z-index: 1;
  }

  .header-container {
    text-align: center;
    margin-bottom: 4rem;
    opacity: 0;
    transform: translateY(30px);
    transition:
      opacity 1s ease,
      transform 1s ease;
  }

  .visible .header-container {
    opacity: 1;
    transform: translateY(0);
  }

  .section-title {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 2rem;
    margin-bottom: 1rem;
  }

  .title-line {
    width: 100px;
    height: 2px;
    background: linear-gradient(90deg, transparent, #10b981, transparent);
    animation: pulse-line 2s ease-in-out infinite;
  }

  @keyframes pulse-line {
    0%,
    100% {
      opacity: 0.5;
    }
    50% {
      opacity: 1;
    }
  }

  .title-text {
    font-size: clamp(2rem, 5vw, 3.5rem);
    font-weight: bold;
    color: white;
    letter-spacing: 0.05em;
    text-shadow: 0 0 20px rgba(16, 185, 129, 0.5);
  }

  .section-subtitle {
    font-size: 1.25rem;
    color: #86e293;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    margin: 0;
  }

  .sponsors-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 2rem;
    margin-bottom: 4rem;
  }

  .sponsor-card {
    position: relative;
    background: rgba(16, 185, 129, 0.05);
    border-radius: 1.5rem;
    padding: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 180px;
    transition: all 0.4s ease;
    opacity: 0;
    transform: translateY(30px);
    border: 2px solid rgba(16, 185, 129, 0.2);
  }

  .visible .sponsor-card {
    opacity: 1;
    transform: translateY(0);
    animation: fade-in-up 0.6s ease forwards;
  }

  @keyframes fade-in-up {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .sponsor-card::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 1.5rem;
    background: linear-gradient(
      135deg,
      rgba(16, 185, 129, 0.1),
      rgba(6, 182, 212, 0.1)
    );
    opacity: 0;
    transition: opacity 0.4s ease;
  }

  .sponsor-card:hover::before {
    opacity: 1;
  }

  .sponsor-card:hover {
    transform: translateY(-8px) scale(1.03);
    border-color: #10b981;
    box-shadow: 0 15px 50px rgba(16, 185, 129, 0.3);
  }

  .card-border {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 1.5rem;
    padding: 2px;
    background: linear-gradient(135deg, #10b981, #06b6d4);
    -webkit-mask:
      linear-gradient(#fff 0 0) content-box,
      linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask:
      linear-gradient(#fff 0 0) content-box,
      linear-gradient(#fff 0 0);
    mask-composite: exclude;
    opacity: 0;
    transition: opacity 0.4s ease;
  }

  .sponsor-card:hover .card-border {
    opacity: 1;
    animation: rotate-border 3s linear infinite;
  }

  @keyframes rotate-border {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  .sponsor-link {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    text-decoration: none;
    position: relative;
    z-index: 1;
  }

  .logo-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
  }

  .sponsor-logo {
    max-width: 100%;
    height: auto;
    filter: brightness(1) contrast(1.2);
    transition: all 0.4s ease;
  }

  .sponsor-card:hover .sponsor-logo {
    filter: brightness(1.2) contrast(1.3);
    transform: scale(1.05);
  }

  .organizer-section {
    text-align: center;
    margin-top: 5rem;
    padding-top: 3rem;
    border-top: 2px solid rgba(16, 185, 129, 0.2);
    opacity: 0;
    transform: translateY(30px);
    transition:
      opacity 1s ease 0.5s,
      transform 1s ease 0.5s;
  }

  .visible .organizer-section {
    opacity: 1;
    transform: translateY(0);
  }

  .organizer-title {
    font-size: 1.5rem;
    color: #86e293;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    margin-bottom: 2rem;
  }

  .organizer-link {
    display: inline-block;
    padding: 2rem;
    background: rgba(16, 185, 129, 0.05);
    border: 2px solid rgba(16, 185, 129, 0.3);
    border-radius: 1.5rem;
    transition: all 0.4s ease;
  }

  .organizer-link:hover {
    transform: scale(1.05);
    border-color: #10b981;
    box-shadow: 0 10px 40px rgba(16, 185, 129, 0.3);
  }

  .organizer-logo {
    width: 300px;
    max-width: 100%;
    height: auto;
    filter: brightness(1) contrast(1.2);
    transition: filter 0.4s ease;
  }

  .organizer-link:hover .organizer-logo {
    filter: brightness(1.2) contrast(1.3);
  }

  @media (max-width: 768px) {
    .sponsors-grid {
      grid-template-columns: 1fr;
      gap: 1.5rem;
    }

    .title-line {
      width: 50px;
    }

    .section-title {
      gap: 1rem;
    }

    .organizer-logo {
      width: 200px;
    }
  }
</style>
