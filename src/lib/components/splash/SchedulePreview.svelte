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

<section class="schedule-section">
  <div bind:this={container} class="schedule-container">
    <h2 class="section-title" class:visible>Schedule</h2>
    <div class="schedule-grid" class:visible>
      <div class="schedule-day">
        <h3 class="day-title">Saturday 1st November</h3>
        <ul class="schedule-list">
          <li class="schedule-item">
            <strong>09:30</strong> &bull; <em>Breakfast</em>
          </li>
          <li class="schedule-item">
            <strong>10:00</strong> &bull; Opening Ceremony
          </li>
          <li class="schedule-item">
            <strong>10:30</strong> &bull; Hacking begins!
          </li>
          <li class="schedule-item">
            <strong>13:00</strong> &bull; <em>Lunch</em>
          </li>
          <li class="schedule-item">
            <strong>18:00</strong> &bull; <em>Dinner</em>
          </li>
        </ul>
      </div>
      <div class="schedule-day">
        <h3 class="day-title">Sunday 2nd November</h3>
        <ul class="schedule-list">
          <li class="schedule-item">
            <strong>09:30</strong> &bull; <em>Breakfast</em>
          </li>
          <li class="schedule-item">
            <strong>13:00</strong> &bull; <em>Lunch</em>
          </li>
          <li class="schedule-item">
            <strong>16:30</strong> &bull; Hacking ends!
          </li>
          <li class="schedule-item">
            <strong>17:00</strong> &bull; <em>Dinner</em>
          </li>
          <li class="schedule-item">
            <strong>18:00</strong> &bull; Judging ends
          </li>
          <li class="schedule-item">
            <strong>18:30</strong> &bull; Closing ceremony
          </li>
        </ul>
      </div>
    </div>
  </div>
</section>

<style>
  .schedule-section {
    @apply py-20 px-4 sm:px-8;
    background: linear-gradient(
      180deg,
      transparent 0%,
      rgba(134, 230, 198, 0.05) 100%
    );
  }

  .schedule-container {
    @apply mx-auto max-w-6xl;
  }

  .section-title {
    @apply text-5xl sm:text-6xl md:text-7xl font-bold text-center mb-16;
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

  .schedule-grid {
    @apply grid grid-cols-1 md:grid-cols-2 gap-8;
    opacity: 0;
    transform: translateY(30px);
    transition: all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.2s;
  }

  .schedule-grid.visible {
    opacity: 1;
    transform: translateY(0);
  }

  .schedule-day {
    @apply p-8 rounded-3xl;
    background: rgba(255, 255, 255, 0.6);
    backdrop-filter: blur(10px);
    border: 2px solid rgba(134, 226, 147, 0.2);
    transition: all 0.4s ease;
  }

  .schedule-day:hover {
    border-color: rgba(134, 226, 147, 0.5);
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(134, 226, 147, 0.2);
  }

  .day-title {
    @apply text-2xl font-bold mb-6;
    color: #86e293;
    position: relative;
    padding-bottom: 1rem;
  }

  .day-title::after {
    content: "";
    @apply absolute bottom-0 left-0;
    width: 60px;
    height: 3px;
    background: linear-gradient(90deg, #86e293 0%, #86e6c6 100%);
    border-radius: 2px;
  }

  .schedule-list {
    @apply space-y-3;
  }

  .schedule-item {
    @apply text-lg;
    color: #334155;
    opacity: 0;
    transform: translateX(-20px);
    transition: all 0.4s ease;
  }

  .schedule-grid.visible .schedule-item {
    opacity: 1;
    transform: translateX(0);
  }

  .schedule-grid.visible .schedule-item:nth-child(1) {
    transition-delay: 0.1s;
  }
  .schedule-grid.visible .schedule-item:nth-child(2) {
    transition-delay: 0.2s;
  }
  .schedule-grid.visible .schedule-item:nth-child(3) {
    transition-delay: 0.3s;
  }
  .schedule-grid.visible .schedule-item:nth-child(4) {
    transition-delay: 0.4s;
  }
  .schedule-grid.visible .schedule-item:nth-child(5) {
    transition-delay: 0.5s;
  }
  .schedule-grid.visible .schedule-item:nth-child(6) {
    transition-delay: 0.6s;
  }
</style>
