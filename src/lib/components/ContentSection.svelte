<script>
  export let title;
</script>

<div class="content-section">
  <div class="content-container">
    <h2 class="content-title">{title}</h2>
    <div class="content-body">
      <slot />
    </div>
  </div>
</div>

<style>
  .content-section {
    padding: 6rem 2rem;
    position: relative;
  }

  .content-container {
    max-width: 1000px;
    margin: 0 auto;
    background: rgba(10, 15, 26, 0.7);
    border: 2px solid rgba(134, 226, 147, 0.15);
    border-radius: 2rem;
    padding: 3rem;
    box-shadow:
      0 0 40px rgba(134, 226, 147, 0.2),
      inset 0 0 30px rgba(134, 226, 147, 0.05);
    transition: all 0.5s ease;
    position: relative;
    overflow: hidden;
  }

  .content-container::before {
    content: "";
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(134, 226, 147, 0.1),
      transparent
    );
    transition: left 0.8s;
  }

  .content-container:hover {
    border-color: rgba(134, 226, 147, 0.4);
    box-shadow:
      0 0 60px rgba(134, 226, 147, 0.4),
      inset 0 0 40px rgba(134, 226, 147, 0.1);
    transform: translateY(-5px);
  }

  .content-container:hover::before {
    left: 100%;
  }

  .content-title {
    font-size: 3rem;
    font-weight: 900;
    margin-bottom: 2rem;
    font-family: "Orbitron", monospace;
    background: linear-gradient(135deg, #86e293 0%, #86e6c6 100%);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    position: relative;
    display: inline-block;
  }

  .content-title::after {
    content: "_";
    animation: blink 1s step-end infinite;
    margin-left: 5px;
  }

  @keyframes blink {
    0%,
    50% {
      opacity: 1;
    }
    51%,
    100% {
      opacity: 0;
    }
  }

  .content-body {
    font-size: 1.125rem;
    line-height: 1.8;
    color: rgba(134, 226, 147, 0.9);
  }

  .content-body :global(p) {
    margin-bottom: 1rem;
  }

  .content-body :global(ul) {
    list-style: none;
    padding: 0;
  }

  .content-body :global(li) {
    padding: 0.5rem 0;
    padding-left: 1.5rem;
    position: relative;
  }

  .content-body :global(li::before) {
    content: "▹";
    position: absolute;
    left: 0;
    color: #86e293;
    font-weight: bold;
  }

  .content-body :global(strong) {
    color: #86e293;
    font-weight: 700;
  }

  .content-body :global(em) {
    color: #86e6c6;
  }

  .content-body :global(h4) {
    font-size: 1.5rem;
    font-weight: 700;
    color: #86e293;
    margin-bottom: 1rem;
    font-family: "Orbitron", monospace;
  }

  @media (max-width: 768px) {
    .content-section {
      padding: 4rem 1rem;
    }

    .content-container {
      padding: 2rem;
    }

    .content-title {
      font-size: 2rem;
      margin-bottom: 1.5rem;
    }

    .content-body {
      font-size: 1rem;
    }
  }
</style>
