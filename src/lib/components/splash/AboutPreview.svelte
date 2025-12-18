<script>
  import { onMount } from "svelte";

  let visible = $state(false);
  let container;

  onMount(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            visible = true;
          }
        });
      },
      { threshold: 0.2 }
    );

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

<section class="about-section">
  <div bind:this={container} class="about-container">
    <h2 class="section-title" class:visible>About</h2>
    <div class="content-wrapper" class:visible>
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
</section>

<style>
  .about-section {
    @apply py-20 px-4 sm:px-8;
    background: linear-gradient(
      180deg,
      transparent 0%,
      rgba(134, 226, 147, 0.05) 50%,
      transparent 100%
    );
    position: relative;
  }

  .about-container {
    @apply mx-auto max-w-4xl;
  }

  .section-title {
    @apply text-5xl sm:text-6xl md:text-7xl font-bold text-center mb-12;
    background: linear-gradient(135deg, #86e293 0%, #86e6c6 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    opacity: 0;
    transform: translateY(-30px);
    transition: all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  .section-title.visible {
    opacity: 1;
    transform: translateY(0);
  }

  .content-wrapper {
    opacity: 0;
    transform: translateY(30px);
    transition: all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.2s;
  }

  .content-wrapper.visible {
    opacity: 1;
    transform: translateY(0);
  }

  .about-text {
    @apply text-lg sm:text-xl text-slate-700 mb-6 leading-relaxed;
    position: relative;
  }

  .about-text::before {
    content: "";
    @apply absolute -left-4 top-0 bottom-0 w-1 rounded-full;
    background: linear-gradient(180deg, #86e293 0%, #86e6c6 100%);
    opacity: 0;
    transform: scaleY(0);
    transition: all 0.6s ease 0.4s;
  }

  .content-wrapper.visible .about-text::before {
    opacity: 1;
    transform: scaleY(1);
  }
</style>
