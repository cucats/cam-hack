<script>
  import { onMount } from "svelte";

  let visible = $state(false);
  let sectionRef;
  let activeDay = $state(0);

  const schedule = [
    {
      day: "Saturday 1st November",
      events: [
        { time: "09:30", event: "Breakfast", type: "meal" },
        { time: "10:00", event: "Opening Ceremony", type: "ceremony" },
        { time: "10:30", event: "Hacking begins!", type: "highlight" },
        { time: "13:00", event: "Lunch", type: "meal" },
        { time: "18:00", event: "Dinner", type: "meal" },
      ],
    },
    {
      day: "Sunday 2nd November",
      events: [
        { time: "09:30", event: "Breakfast", type: "meal" },
        { time: "13:00", event: "Lunch", type: "meal" },
        { time: "16:30", event: "Hacking ends!", type: "highlight" },
        { time: "17:00", event: "Dinner", type: "meal" },
        { time: "18:00", event: "Judging ends", type: "ceremony" },
        { time: "18:30", event: "Closing ceremony", type: "ceremony" },
      ],
    },
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

<section
  bind:this={sectionRef}
  id="schedule"
  class="schedule-section"
  class:visible
>
  <div class="content-wrapper">
    <div class="section-header">
      <h2 class="section-title">Schedule</h2>
      <div class="title-underline"></div>
    </div>

    <div class="day-tabs">
      {#each schedule as day, i}
        <button
          class="day-tab"
          class:active={activeDay === i}
          onclick={() => (activeDay = i)}
        >
          <span class="day-number">Day {i + 1}</span>
          <span class="day-date"
            >{day.day.split(" ").slice(0, 2).join(" ")}</span
          >
        </button>
      {/each}
    </div>

    <div class="timeline-container">
      <div class="timeline-line"></div>
      <div class="timeline-progress" style="height: 100%"></div>

      {#each schedule[activeDay].events as event, i}
        <div
          class="timeline-item"
          class:meal={event.type === "meal"}
          class:highlight={event.type === "highlight"}
          class:ceremony={event.type === "ceremony"}
          style="animation-delay: {i * 0.1}s"
        >
          <div class="timeline-dot">
            <div class="dot-pulse"></div>
          </div>
          <div class="timeline-content">
            <div class="event-time">{event.time}</div>
            <div class="event-name">{event.event}</div>
          </div>
        </div>
      {/each}
    </div>
  </div>
</section>

<style>
  .schedule-section {
    padding: 6rem 2rem;
    opacity: 0;
    transform: translateY(50px);
    transition:
      opacity 0.8s ease,
      transform 0.8s ease;
  }

  .schedule-section.visible {
    opacity: 1;
    transform: translateY(0);
  }

  .content-wrapper {
    max-width: 800px;
    margin: 0 auto;
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
    background: linear-gradient(90deg, #00ff88, #9945ff);
    margin: 0 auto;
    border-radius: 2px;
  }

  .day-tabs {
    display: flex;
    justify-content: center;
    gap: 1rem;
    margin-bottom: 3rem;
  }

  .day-tab {
    padding: 1rem 2rem;
    background: rgba(22, 27, 34, 0.6);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 12px;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.3rem;
    color: #8b949e;
  }

  .day-tab:hover {
    border-color: rgba(0, 255, 136, 0.3);
    background: rgba(22, 27, 34, 0.9);
  }

  .day-tab.active {
    border-color: #00ff88;
    background: rgba(0, 255, 136, 0.1);
    color: #00ff88;
    box-shadow: 0 0 20px rgba(0, 255, 136, 0.2);
  }

  .day-number {
    font-size: 1rem;
    font-weight: 700;
  }

  .day-date {
    font-size: 0.8rem;
    opacity: 0.7;
  }

  .timeline-container {
    position: relative;
    padding-left: 40px;
  }

  .timeline-line {
    position: absolute;
    left: 15px;
    top: 0;
    bottom: 0;
    width: 2px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 1px;
  }

  .timeline-progress {
    position: absolute;
    left: 15px;
    top: 0;
    width: 2px;
    background: linear-gradient(180deg, #00ff88, #9945ff);
    border-radius: 1px;
    animation: progressGrow 1s ease-out forwards;
    transform-origin: top;
  }

  @keyframes progressGrow {
    from {
      transform: scaleY(0);
    }
    to {
      transform: scaleY(1);
    }
  }

  .timeline-item {
    position: relative;
    padding: 1.5rem 0;
    animation: itemSlide 0.5s ease-out forwards;
    opacity: 0;
    transform: translateX(-20px);
  }

  @keyframes itemSlide {
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  .timeline-dot {
    position: absolute;
    left: -33px;
    top: 50%;
    transform: translateY(-50%);
    width: 16px;
    height: 16px;
    background: #0d1117;
    border: 3px solid #00ff88;
    border-radius: 50%;
    z-index: 1;
    transition: all 0.3s ease;
  }

  .timeline-item:hover .timeline-dot {
    transform: translateY(-50%) scale(1.3);
    box-shadow: 0 0 15px rgba(0, 255, 136, 0.5);
  }

  .timeline-item.meal .timeline-dot {
    border-color: #ff9f43;
  }

  .timeline-item.highlight .timeline-dot {
    border-color: #9945ff;
    background: #9945ff;
  }

  .timeline-item.ceremony .timeline-dot {
    border-color: #00d4ff;
  }

  .dot-pulse {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 30px;
    height: 30px;
    background: rgba(0, 255, 136, 0.3);
    border-radius: 50%;
    opacity: 0;
    animation: pulse 2s ease-out infinite;
  }

  .timeline-item.highlight .dot-pulse {
    background: rgba(153, 69, 255, 0.3);
    animation: pulse 1.5s ease-out infinite;
  }

  @keyframes pulse {
    0% {
      transform: translate(-50%, -50%) scale(0.5);
      opacity: 0.8;
    }
    100% {
      transform: translate(-50%, -50%) scale(2);
      opacity: 0;
    }
  }

  .timeline-content {
    display: flex;
    align-items: center;
    gap: 1.5rem;
    padding: 1rem 1.5rem;
    background: rgba(22, 27, 34, 0.6);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 12px;
    transition: all 0.3s ease;
  }

  .timeline-item:hover .timeline-content {
    border-color: rgba(0, 255, 136, 0.3);
    background: rgba(22, 27, 34, 0.9);
    transform: translateX(10px);
  }

  .event-time {
    font-size: 1.2rem;
    font-weight: 700;
    color: #00ff88;
    min-width: 60px;
  }

  .timeline-item.meal .event-time {
    color: #ff9f43;
  }

  .timeline-item.highlight .event-time {
    color: #9945ff;
  }

  .timeline-item.ceremony .event-time {
    color: #00d4ff;
  }

  .event-name {
    font-size: 1.1rem;
    color: #e6edf3;
  }

  .timeline-item.meal .event-name {
    font-style: italic;
    color: #8b949e;
  }

  @media (max-width: 640px) {
    .day-tabs {
      flex-direction: column;
    }

    .timeline-content {
      flex-direction: column;
      align-items: flex-start;
      gap: 0.5rem;
    }
  }
</style>
