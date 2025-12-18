<div class="about-section">
  <div class="about-container">
    <h2 class="about-title">About</h2>
    <div class="about-content">
      <p class="about-text">
        Cam Hack is a 2 day hackathon for the innovative minds at the University
        of Cambridge. Over an action-packed weekend, students come together to
        design and build technology projects from the ground up. We welcome
        participants ranging from curious beginners to seasoned coders. Expect
        plenty of free stash, food, and mini-events throughout this hackathon.
      </p>
      <p class="about-text">
        For the winning team, each person will receive £200 and can choose from
        a range of prizes including: smartwatches, Steam vouchers, Amazon
        vouchers, or Sony XM4 headphones.
      </p>
    </div>
  </div>
</div>

<style>
  .about-section {
    @apply py-20 px-4 sm:px-8;
    background: rgba(255, 255, 255, 0.95);
    position: relative;
  }

  .about-container {
    @apply mx-auto max-w-4xl;
  }

  .about-title {
    @apply text-5xl sm:text-6xl font-bold mb-12 text-center;
    background: linear-gradient(135deg, #86e293 0%, #86e6c6 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: fadeInUp 0.8s ease-out both;
  }

  .about-content {
    animation: fadeInUp 0.8s ease-out 0.2s both;
  }

  .about-text {
    @apply text-lg sm:text-xl text-slate-700 mb-6 leading-relaxed;
  }

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
</style>
