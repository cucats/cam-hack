<script>
  import { onMount } from "svelte";

  let visible = $state(false);
  let sectionRef;

  const stats = [
    { value: "2", label: "Days" },
    { value: "£200", label: "Prize" },
    { value: "5", label: "Max Team Size" },
    { value: "∞", label: "Possibilities" },
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

<section bind:this={sectionRef} id="about" class="about-section" class:visible>
  <div class="content-wrapper">
    <div class="section-header">
      <h2 class="section-title">About</h2>
      <div class="title-underline"></div>
    </div>

    <div class="about-content">
      <div class="about-text">
        <p class="about-paragraph">
          Cam Hack is a 2 day hackathon for the innovative minds at the
          University of Cambridge. Over an action-packed weekend, students come
          together to design and build technology projects from the ground up.
          We welcome participants ranging from curious beginners to seasoned
          coders. Expect plenty of free stash, food, and mini-events throughout
          this hackathon.
        </p>
        <p class="about-paragraph">
          For the winning team, each person will receive £200 and can choose
          from a range of prizes including: smartwatches, Steam vouchers, Amazon
          vouchers, or Sony XM4 headphones.
        </p>
      </div>

      <div class="stats-grid">
        {#each stats as stat, i}
          <div class="stat-card" style="animation-delay: {i * 0.15}s">
            <div class="stat-value">{stat.value}</div>
            <div class="stat-label">{stat.label}</div>
            <div class="stat-border"></div>
          </div>
        {/each}
      </div>
    </div>
  </div>

  <div class="floating-elements">
    <div class="float-element elem-1"></div>
    <div class="float-element elem-2"></div>
    <div class="float-element elem-3"></div>
  </div>
</section>

<style>
  .about-section {
    position: relative;
    padding: 6rem 2rem;
    opacity: 0;
    transform: translateY(50px);
    transition:
      opacity 0.8s ease,
      transform 0.8s ease;
    overflow: hidden;
  }

  .about-section.visible {
    opacity: 1;
    transform: translateY(0);
  }

  .content-wrapper {
    max-width: 1200px;
    margin: 0 auto;
    position: relative;
    z-index: 1;
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
    background: linear-gradient(90deg, #00ff88, #00d4ff);
    margin: 0 auto;
    border-radius: 2px;
  }

  .about-content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
    align-items: center;
  }

  .about-text {
    animation: fadeInLeft 0.8s ease-out forwards;
    animation-delay: 0.3s;
    opacity: 0;
  }

  @keyframes fadeInLeft {
    from {
      opacity: 0;
      transform: translateX(-30px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  .about-paragraph {
    color: #8b949e;
    font-size: 1.1rem;
    line-height: 1.8;
    margin-bottom: 1.5rem;
  }

  .about-paragraph:last-child {
    margin-bottom: 0;
  }

  .stats-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
  }

  .stat-card {
    position: relative;
    padding: 2rem;
    background: rgba(22, 27, 34, 0.6);
    border-radius: 16px;
    text-align: center;
    overflow: hidden;
    animation: statPop 0.5s ease-out forwards;
    opacity: 0;
    transform: scale(0.8);
    transition: all 0.3s ease;
  }

  .stat-card:hover {
    transform: scale(1.05);
    background: rgba(22, 27, 34, 0.9);
  }

  @keyframes statPop {
    to {
      opacity: 1;
      transform: scale(1);
    }
  }

  .stat-value {
    font-size: 2.5rem;
    font-weight: 700;
    background: linear-gradient(135deg, #00ff88 0%, #00d4ff 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin-bottom: 0.5rem;
  }

  .stat-label {
    color: #8b949e;
    font-size: 0.9rem;
    text-transform: uppercase;
    letter-spacing: 2px;
  }

  .stat-border {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, #00ff88, #00d4ff);
    transform: scaleX(0);
    transition: transform 0.3s ease;
  }

  .stat-card:hover .stat-border {
    transform: scaleX(1);
  }

  .floating-elements {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    pointer-events: none;
    overflow: hidden;
  }

  .float-element {
    position: absolute;
    border-radius: 50%;
    opacity: 0.1;
  }

  .elem-1 {
    width: 300px;
    height: 300px;
    background: radial-gradient(circle, #00ff88, transparent);
    top: -100px;
    right: -100px;
    animation: floatSlow 10s ease-in-out infinite;
  }

  .elem-2 {
    width: 200px;
    height: 200px;
    background: radial-gradient(circle, #9945ff, transparent);
    bottom: -50px;
    left: -50px;
    animation: floatSlow 8s ease-in-out infinite reverse;
  }

  .elem-3 {
    width: 150px;
    height: 150px;
    background: radial-gradient(circle, #00d4ff, transparent);
    top: 50%;
    left: 30%;
    animation: floatSlow 12s ease-in-out infinite;
  }

  @keyframes floatSlow {
    0%,
    100% {
      transform: translate(0, 0) scale(1);
    }
    50% {
      transform: translate(30px, -30px) scale(1.1);
    }
  }

  @media (max-width: 768px) {
    .about-content {
      grid-template-columns: 1fr;
      gap: 3rem;
    }

    .stats-grid {
      grid-template-columns: repeat(2, 1fr);
      gap: 1rem;
    }

    .stat-card {
      padding: 1.5rem;
    }

    .stat-value {
      font-size: 2rem;
    }
  }
</style>
