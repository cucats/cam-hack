<script>
  import { onMount } from "svelte";

  let sectionRef;
  let visible = $state(false);

  const saturday = [
    { time: "09:30", event: "Breakfast", isBreak: true },
    { time: "10:00", event: "Opening Ceremony", isBreak: false },
    { time: "10:30", event: "Hacking begins!", isBreak: false },
    { time: "13:00", event: "Lunch", isBreak: true },
    { time: "18:00", event: "Dinner", isBreak: true },
  ];

  const sunday = [
    { time: "09:30", event: "Breakfast", isBreak: true },
    { time: "13:00", event: "Lunch", isBreak: true },
    { time: "16:30", event: "Hacking ends!", isBreak: false },
    { time: "17:00", event: "Dinner", isBreak: true },
    { time: "18:00", event: "Judging ends", isBreak: false },
    { time: "18:30", event: "Closing ceremony", isBreak: false },
  ];

  onMount(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            visible = true;
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef) {
      observer.observe(sectionRef);
    }

    return () => observer.disconnect();
  });
</script>

<div bind:this={sectionRef} class="schedule-container">
  <h2 class="section-title" class:visible>
    <span class="title-icon">&#128197;</span>
    Schedule
  </h2>

  <div class="schedule-grid">
    <div class="day-column" class:visible style="--delay: 0.2s">
      <div class="day-header">
        <div class="day-icon">&#127774;</div>
        <h4>Saturday 1st November</h4>
      </div>
      <div class="timeline">
        {#each saturday as item, i}
          <div
            class="timeline-item"
            class:break={item.isBreak}
            style="--item-delay: {i * 0.1}s"
          >
            <div class="timeline-dot"></div>
            <div class="timeline-content">
              <span class="timeline-time">{item.time}</span>
              <span class="timeline-event">{item.event}</span>
            </div>
          </div>
        {/each}
      </div>
    </div>

    <div class="day-column" class:visible style="--delay: 0.4s">
      <div class="day-header">
        <div class="day-icon">&#127773;</div>
        <h4>Sunday 2nd November</h4>
      </div>
      <div class="timeline">
        {#each sunday as item, i}
          <div
            class="timeline-item"
            class:break={item.isBreak}
            style="--item-delay: {i * 0.1}s"
          >
            <div class="timeline-dot"></div>
            <div class="timeline-content">
              <span class="timeline-time">{item.time}</span>
              <span class="timeline-event">{item.event}</span>
            </div>
          </div>
        {/each}
      </div>
    </div>
  </div>
</div>

<style>
  .schedule-container {
    max-width: 1280px;
    margin: 0 auto;
    padding: 2rem 1rem;
  }

  .section-title {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 3rem;
    opacity: 0;
    transform: translateY(30px);
    transition:
      opacity 0.8s ease,
      transform 0.8s ease;
  }

  .section-title.visible {
    opacity: 1;
    transform: translateY(0);
  }

  .title-icon {
    font-size: 2.5rem;
  }

  .schedule-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 3rem;
  }

  @media (min-width: 768px) {
    .schedule-grid {
      grid-template-columns: 1fr 1fr;
    }
  }

  .day-column {
    opacity: 0;
    transform: translateX(-30px);
    transition:
      opacity 0.8s ease,
      transform 0.8s ease;
    transition-delay: var(--delay);
  }

  .day-column.visible {
    opacity: 1;
    transform: translateX(0);
  }

  .day-column:nth-child(2) {
    transform: translateX(30px);
  }

  .day-column:nth-child(2).visible {
    transform: translateX(0);
  }

  .day-header {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 2rem;
    padding: 1.5rem;
    background: rgba(0, 255, 136, 0.05);
    border-radius: 15px;
    border: 1px solid rgba(0, 255, 136, 0.1);
  }

  .day-icon {
    font-size: 2rem;
  }

  .day-header h4 {
    margin: 0;
    font-family: "Orbitron", monospace;
    font-size: 1.1rem;
  }

  .timeline {
    position: relative;
    padding-left: 30px;
  }

  .timeline::before {
    content: "";
    position: absolute;
    left: 8px;
    top: 0;
    bottom: 0;
    width: 2px;
    background: linear-gradient(
      to bottom,
      #00ff88,
      rgba(0, 255, 136, 0.2),
      #00ff88
    );
  }

  .timeline-item {
    position: relative;
    padding: 1rem 0;
    opacity: 0;
    transform: translateX(-20px);
    transition:
      opacity 0.5s ease,
      transform 0.5s ease;
  }

  .day-column.visible .timeline-item {
    opacity: 1;
    transform: translateX(0);
    transition-delay: calc(var(--delay) + var(--item-delay));
  }

  .timeline-dot {
    position: absolute;
    left: -26px;
    top: 50%;
    transform: translateY(-50%);
    width: 14px;
    height: 14px;
    background: #00ff88;
    border-radius: 50%;
    box-shadow:
      0 0 10px #00ff88,
      0 0 20px #00ff88;
    transition: all 0.3s ease;
  }

  .timeline-item:hover .timeline-dot {
    transform: translateY(-50%) scale(1.3);
    box-shadow:
      0 0 15px #00ff88,
      0 0 30px #00ff88;
  }

  .timeline-item.break .timeline-dot {
    background: #00ffcc;
    box-shadow:
      0 0 10px #00ffcc,
      0 0 20px #00ffcc;
  }

  .timeline-content {
    display: flex;
    align-items: center;
    gap: 1.5rem;
    padding: 1rem 1.5rem;
    background: rgba(0, 255, 136, 0.03);
    border-radius: 12px;
    border: 1px solid rgba(0, 255, 136, 0.1);
    transition: all 0.3s ease;
  }

  .timeline-item:hover .timeline-content {
    background: rgba(0, 255, 136, 0.08);
    border-color: rgba(0, 255, 136, 0.3);
    transform: translateX(10px);
  }

  .timeline-time {
    font-family: "Orbitron", monospace;
    font-weight: bold;
    color: #00ff88;
    min-width: 60px;
  }

  .timeline-event {
    color: rgba(255, 255, 255, 0.9);
  }

  .timeline-item.break .timeline-event {
    font-style: italic;
    color: rgba(255, 255, 255, 0.7);
  }
</style>
