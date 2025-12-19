<script>
  import { onMount } from "svelte";
  import { sponsors, organizers } from "../sponsors-data.js";

  let visible = $state(false);
  let sectionRef;

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

<section bind:this={sectionRef} class="sponsors-section" class:visible>
  <div class="section-header">
    <h2 class="section-title">Sponsored By</h2>
    <div class="title-underline"></div>
  </div>

  <div class="sponsors-track">
    <div class="sponsors-marquee">
      {#each [...sponsors, ...sponsors] as sponsor, i}
        <a
          href={sponsor.url}
          target="_blank"
          class="sponsor-card"
          style="animation-delay: {(i % sponsors.length) * 0.1}s"
        >
          <div class="sponsor-inner">
            <img src={sponsor.logo} alt={sponsor.name} class="sponsor-logo" />
            <div class="sponsor-glow"></div>
          </div>
        </a>
      {/each}
    </div>
  </div>

  <div class="organizer-section">
    <h3 class="organizer-title">{organizers.runBy.title}</h3>
    <a href={organizers.runBy.url} target="_blank" class="organizer-card">
      <img
        src={organizers.runBy.logo}
        alt={organizers.runBy.name}
        class="organizer-logo"
      />
      <div class="organizer-glow"></div>
    </a>
  </div>
</section>

<style>
  .sponsors-section {
    padding: 6rem 2rem;
    opacity: 0;
    transform: translateY(50px);
    transition:
      opacity 0.8s ease,
      transform 0.8s ease;
    overflow: hidden;
  }

  .sponsors-section.visible {
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
    background: linear-gradient(90deg, #9945ff, #00ff88);
    margin: 0 auto;
    border-radius: 2px;
  }

  .sponsors-track {
    overflow: hidden;
    padding: 2rem 0;
    mask-image: linear-gradient(
      90deg,
      transparent,
      white 10%,
      white 90%,
      transparent
    );
    -webkit-mask-image: linear-gradient(
      90deg,
      transparent,
      white 10%,
      white 90%,
      transparent
    );
  }

  .sponsors-marquee {
    display: flex;
    gap: 3rem;
    animation: marquee 30s linear infinite;
    width: max-content;
  }

  .sponsors-marquee:hover {
    animation-play-state: paused;
  }

  @keyframes marquee {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(-50%);
    }
  }

  .sponsor-card {
    flex-shrink: 0;
    width: 200px;
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(22, 27, 34, 0.6);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 16px;
    padding: 1.5rem;
    transition: all 0.3s ease;
    text-decoration: none;
  }

  .sponsor-card:hover {
    border-color: rgba(0, 255, 136, 0.5);
    background: rgba(22, 27, 34, 0.9);
    transform: scale(1.1);
    box-shadow:
      0 10px 30px rgba(0, 0, 0, 0.3),
      0 0 20px rgba(0, 255, 136, 0.2);
  }

  .sponsor-inner {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .sponsor-logo {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
    filter: brightness(0.9) grayscale(0.3);
    transition: filter 0.3s ease;
  }

  .sponsor-card:hover .sponsor-logo {
    filter: brightness(1) grayscale(0);
  }

  .sponsor-glow {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 150%;
    height: 150%;
    background: radial-gradient(
      circle,
      rgba(0, 255, 136, 0.15) 0%,
      transparent 60%
    );
    transform: translate(-50%, -50%);
    opacity: 0;
    transition: opacity 0.3s ease;
    pointer-events: none;
  }

  .sponsor-card:hover .sponsor-glow {
    opacity: 1;
  }

  .organizer-section {
    text-align: center;
    margin-top: 4rem;
    padding-top: 4rem;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
  }

  .organizer-title {
    font-size: 1.5rem;
    color: #8b949e;
    margin-bottom: 2rem;
    text-transform: uppercase;
    letter-spacing: 4px;
  }

  .organizer-card {
    display: inline-block;
    position: relative;
    padding: 2rem 4rem;
    background: rgba(22, 27, 34, 0.6);
    border: 1px solid rgba(153, 69, 255, 0.3);
    border-radius: 20px;
    transition: all 0.3s ease;
    text-decoration: none;
  }

  .organizer-card:hover {
    border-color: rgba(153, 69, 255, 0.6);
    transform: scale(1.05);
    box-shadow:
      0 10px 40px rgba(0, 0, 0, 0.3),
      0 0 30px rgba(153, 69, 255, 0.3);
  }

  .organizer-logo {
    max-width: 250px;
    height: auto;
  }

  .organizer-glow {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(
      circle at 50% 50%,
      rgba(153, 69, 255, 0.1) 0%,
      transparent 60%
    );
    border-radius: 20px;
    opacity: 0;
    transition: opacity 0.3s ease;
    pointer-events: none;
  }

  .organizer-card:hover .organizer-glow {
    opacity: 1;
  }

  @media (max-width: 768px) {
    .sponsor-card {
      width: 150px;
      height: 80px;
      padding: 1rem;
    }

    .organizer-card {
      padding: 1.5rem 2rem;
    }

    .organizer-logo {
      max-width: 180px;
    }
  }
</style>
