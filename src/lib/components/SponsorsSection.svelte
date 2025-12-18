<script>
  import { sponsors } from "./sponsors-data.js";
</script>

<div class="sponsors-section">
  <div class="sponsors-container">
    <h2 class="sponsors-title">Lorem Ipsum Dolor</h2>

    <div class="sponsors-grid">
      {#each sponsors as sponsor}
        <a
          href={sponsor.url}
          target="_blank"
          rel="noopener noreferrer"
          class="sponsor-card"
        >
          <div class="sponsor-inner">
            <img
              src={sponsor.logo}
              alt={sponsor.name}
              class="sponsor-logo {sponsor.className}"
            />
          </div>
        </a>
      {/each}
    </div>
  </div>
</div>

<style>
  .sponsors-section {
    padding: 6rem 2rem;
    position: relative;
  }

  .sponsors-container {
    max-width: 1280px;
    margin: 0 auto;
  }

  .sponsors-title {
    font-size: 3.5rem;
    font-weight: 900;
    text-align: center;
    margin-bottom: 4rem;
    font-family: "Orbitron", monospace;
    background: linear-gradient(135deg, #86e293 0%, #86e6c6 100%);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    position: relative;
  }

  .sponsors-title::before {
    content: "";
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 200px;
    height: 2px;
    background: linear-gradient(
      90deg,
      transparent,
      #86e293,
      #86e6c6,
      transparent
    );
    animation: line-expand 2s ease-in-out infinite;
  }

  @keyframes line-expand {
    0%,
    100% {
      width: 200px;
      opacity: 0.5;
    }
    50% {
      width: 300px;
      opacity: 1;
    }
  }

  .sponsors-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2rem;
  }

  .sponsor-card {
    background: rgba(134, 226, 147, 0.05);
    border: 2px solid rgba(134, 226, 147, 0.2);
    border-radius: 1.5rem;
    padding: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.4s ease;
    text-decoration: none;
    position: relative;
    overflow: hidden;
  }

  .sponsor-card::before {
    content: "";
    position: absolute;
    inset: -2px;
    background: linear-gradient(
      45deg,
      #86e293,
      #86e6c6,
      #10b981,
      #86e293
    );
    background-size: 300% 300%;
    border-radius: 1.5rem;
    opacity: 0;
    z-index: -1;
    animation: gradient-rotate 3s linear infinite;
  }

  .sponsor-card:hover {
    transform: translateY(-10px) scale(1.05);
    border-color: transparent;
    box-shadow:
      0 0 40px rgba(134, 226, 147, 0.5),
      inset 0 0 20px rgba(134, 226, 147, 0.1);
  }

  .sponsor-card:hover::before {
    opacity: 0.3;
  }

  @keyframes gradient-rotate {
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

  .sponsor-inner {
    position: relative;
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
  }

  .sponsor-logo {
    max-width: 100%;
    height: auto;
    filter: brightness(0.9);
    transition:
      filter 0.4s ease,
      transform 0.4s ease;
  }

  .sponsor-card:hover .sponsor-logo {
    filter: brightness(1.1) drop-shadow(0 0 10px rgba(134, 226, 147, 0.5));
    transform: scale(1.05);
  }

  .sponsor-card::after {
    content: "";
    position: absolute;
    inset: 0;
    background: radial-gradient(
      circle at center,
      rgba(134, 226, 147, 0.1) 0%,
      transparent 70%
    );
    opacity: 0;
    transition: opacity 0.4s ease;
  }

  .sponsor-card:hover::after {
    opacity: 1;
  }

  @media (max-width: 768px) {
    .sponsors-section {
      padding: 4rem 1rem;
    }

    .sponsors-title {
      font-size: 2rem;
      margin-bottom: 2rem;
    }

    .sponsors-grid {
      grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
      gap: 1rem;
    }

    .sponsor-card {
      padding: 1.5rem;
    }
  }
</style>
