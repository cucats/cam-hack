<div class="featured-section">
  <div class="featured-container">
    <h2 class="featured-title">Unintended Behaviour</h2>
    <a
      target="_blank"
      href="https://cam-hack-2025.devpost.com"
      class="featured-link"
    >
      <div class="featured-image-wrapper">
        <div class="bracket tl"></div>
        <div class="bracket tr"></div>
        <div class="bracket bl"></div>
        <div class="bracket br"></div>
        <img
          src="/unintended.png"
          alt="Unintended"
          class="featured-image"
        />
        <div class="featured-overlay">
          <span class="featured-cta">Lorem Ipsum</span>
        </div>
      </div>
    </a>
  </div>
</div>

<style>
  .featured-section {
    padding: 6rem 2rem;
    position: relative;
  }

  .featured-container {
    max-width: 1280px;
    margin: 0 auto;
  }

  .featured-title {
    font-size: 3.5rem;
    font-weight: 900;
    text-align: center;
    margin-bottom: 3rem;
    font-family: "Orbitron", monospace;
    background: linear-gradient(135deg, #86e293 0%, #86e6c6 100%);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: titleShimmer 3s ease-in-out infinite;
    position: relative;
  }

  .featured-title::before,
  .featured-title::after {
    content: "[ ";
    color: #86e293;
    opacity: 0.5;
    font-weight: 300;
  }

  .featured-title::after {
    content: " ]";
  }

  .featured-link {
    display: block;
    text-decoration: none;
  }

  .featured-image-wrapper {
    position: relative;
    border-radius: 2rem;
    overflow: hidden;
    box-shadow:
      0 0 60px rgba(134, 226, 147, 0.4),
      inset 0 0 40px rgba(134, 226, 147, 0.1);
    border: 2px solid rgba(134, 226, 147, 0.3);
    transition: all 0.5s ease;
  }

  .featured-image-wrapper::before {
    content: "";
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: linear-gradient(
      45deg,
      transparent,
      rgba(134, 226, 147, 0.1),
      transparent
    );
    transform: rotate(45deg);
    animation: shimmer 3s linear infinite;
  }

  .featured-image-wrapper:hover {
    transform: scale(1.02) translateY(-10px);
    box-shadow:
      0 0 100px rgba(134, 226, 147, 0.8),
      inset 0 0 60px rgba(134, 226, 147, 0.2);
    border-color: #86e293;
  }

  .featured-image {
    width: 100%;
    height: auto;
    display: block;
    transition: all 0.5s ease;
  }

  .featured-image-wrapper:hover .featured-image {
    filter: brightness(1.1);
  }

  .featured-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      135deg,
      rgba(134, 226, 147, 0.1),
      rgba(134, 230, 198, 0.1)
    );
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: opacity 0.5s ease;
  }

  .featured-image-wrapper:hover .featured-overlay {
    opacity: 1;
  }

  .featured-cta {
    font-size: 2rem;
    font-weight: 900;
    color: #86e293;
    font-family: "Orbitron", monospace;
    text-shadow:
      0 0 20px rgba(134, 226, 147, 0.8),
      0 0 40px rgba(134, 226, 147, 0.4);
    animation: pulse 2s ease-in-out infinite;
  }

  @keyframes titleShimmer {
    0%,
    100% {
      filter: brightness(1);
    }
    50% {
      filter: brightness(1.3);
    }
  }

  @keyframes pulse {
    0%,
    100% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.05);
    }
  }

  @keyframes shimmer {
    0% {
      transform: translateX(-100%) translateY(-100%) rotate(45deg);
    }
    100% {
      transform: translateX(100%) translateY(100%) rotate(45deg);
    }
  }

  .bracket {
    position: absolute;
    width: 40px;
    height: 40px;
    border: 3px solid #86e293;
    z-index: 10;
    opacity: 0;
    transition: opacity 0.3s;
  }

  .featured-image-wrapper:hover .bracket {
    opacity: 1;
  }

  .bracket.tl {
    top: 10px;
    left: 10px;
    border-right: none;
    border-bottom: none;
    animation: bracket-pulse 2s ease-in-out infinite;
  }

  .bracket.tr {
    top: 10px;
    right: 10px;
    border-left: none;
    border-bottom: none;
    animation: bracket-pulse 2s ease-in-out infinite 0.5s;
  }

  .bracket.bl {
    bottom: 10px;
    left: 10px;
    border-right: none;
    border-top: none;
    animation: bracket-pulse 2s ease-in-out infinite 1s;
  }

  .bracket.br {
    bottom: 10px;
    right: 10px;
    border-left: none;
    border-top: none;
    animation: bracket-pulse 2s ease-in-out infinite 1.5s;
  }

  @keyframes bracket-pulse {
    0%,
    100% {
      box-shadow: 0 0 5px rgba(134, 226, 147, 0.5);
    }
    50% {
      box-shadow: 0 0 20px rgba(134, 226, 147, 1);
    }
  }

  @media (max-width: 768px) {
    .featured-section {
      padding: 4rem 1rem;
    }

    .featured-title {
      font-size: 2rem;
      margin-bottom: 2rem;
    }

    .featured-cta {
      font-size: 1.5rem;
    }
  }
</style>
