<script>
  import { onMount } from 'svelte';

  let isVisible = false;

  const scheduleData = [
    {
      day: 'SATURDAY 1ST NOVEMBER',
      events: [
        { time: '09:30', name: 'Breakfast', isFood: true },
        { time: '10:00', name: 'Opening Ceremony', isFood: false },
        { time: '10:30', name: 'Hacking begins!', isFood: false },
        { time: '13:00', name: 'Lunch', isFood: true },
        { time: '18:00', name: 'Dinner', isFood: true }
      ]
    },
    {
      day: 'SUNDAY 2ND NOVEMBER',
      events: [
        { time: '09:30', name: 'Breakfast', isFood: true },
        { time: '13:00', name: 'Lunch', isFood: true },
        { time: '16:30', name: 'Hacking ends!', isFood: false },
        { time: '17:00', name: 'Dinner', isFood: true },
        { time: '18:00', name: 'Judging ends', isFood: false },
        { time: '18:30', name: 'Closing ceremony', isFood: false }
      ]
    }
  ];

  onMount(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            isVisible = true;
          }
        });
      },
      { threshold: 0.2 }
    );

    const section = document.querySelector('.schedule-section');
    if (section) {
      observer.observe(section);
    }

    return () => {
      observer.disconnect();
    };
  });
</script>

<div class="schedule-section" class:visible={isVisible}>
  <div class="schedule-container">
    <div class="title-wrapper">
      <h2 class="section-title">SCHEDULE</h2>
      <div class="title-decoration"></div>
    </div>

    <div class="timeline-grid">
      {#each scheduleData as daySchedule, dayIndex}
        <div class="day-column" class:visible={isVisible} style="animation-delay: {dayIndex * 0.2}s">
          <div class="day-header">
            <h3 class="day-title">{daySchedule.day}</h3>
          </div>

          <div class="events-list">
            {#each daySchedule.events as event, eventIndex}
              <div 
                class="event-item" 
                class:food={event.isFood}
                style="animation-delay: {(dayIndex * 0.2 + eventIndex * 0.1)}s"
              >
                <div class="event-time">{event.time}</div>
                <div class="event-connector"></div>
                <div class="event-name">{event.name}</div>
                <div class="event-pulse"></div>
              </div>
            {/each}
          </div>
        </div>
      {/each}
    </div>
  </div>
</div>

<style>
  .schedule-section {
    position: relative;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 6rem 2rem;
  }

  .schedule-container {
    max-width: 1400px;
    width: 100%;
  }

  .title-wrapper {
    text-align: center;
    margin-bottom: 5rem;
    opacity: 0;
    transform: translateY(30px);
    transition: all 1s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .visible .title-wrapper {
    opacity: 1;
    transform: translateY(0);
  }

  .section-title {
    font-size: clamp(2.5rem, 6vw, 5rem);
    color: #00ff87;
    font-weight: 900;
    letter-spacing: 0.2em;
    margin-bottom: 1.5rem;
    text-shadow: 0 0 30px rgba(0, 255, 135, 0.6);
  }

  .title-decoration {
    width: 150px;
    height: 4px;
    margin: 0 auto;
    background: linear-gradient(90deg, transparent, #00ff87, transparent);
    animation: pulseWidth 2s ease-in-out infinite;
  }

  @keyframes pulseWidth {
    0%, 100% {
      width: 150px;
    }
    50% {
      width: 250px;
    }
  }

  .timeline-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 4rem;
  }

  .day-column {
    opacity: 0;
    transform: translateX(-50px);
  }

  .visible .day-column {
    animation: slideInFromLeft 1s ease-out forwards;
  }

  @keyframes slideInFromLeft {
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  .day-header {
    margin-bottom: 2rem;
    padding-bottom: 1rem;
    border-bottom: 3px solid #00ff87;
    position: relative;
  }

  .day-header::after {
    content: '';
    position: absolute;
    bottom: -3px;
    left: 0;
    width: 0;
    height: 3px;
    background: #64ffda;
    animation: growLine 2s ease-out infinite;
  }

  @keyframes growLine {
    0%, 100% {
      width: 0;
    }
    50% {
      width: 100%;
    }
  }

  .day-title {
    font-size: 1.3rem;
    color: #64ffda;
    font-weight: 800;
    letter-spacing: 0.1em;
  }

  .events-list {
    position: relative;
  }

  .event-item {
    position: relative;
    display: grid;
    grid-template-columns: 80px 30px 1fr;
    gap: 1rem;
    align-items: center;
    margin-bottom: 2rem;
    opacity: 0;
    transform: translateX(-20px);
  }

  .visible .event-item {
    animation: fadeSlideIn 0.8s ease-out forwards;
  }

  @keyframes fadeSlideIn {
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  .event-time {
    font-size: 1.2rem;
    color: #00ff87;
    font-weight: 800;
    letter-spacing: 0.05em;
    text-align: right;
    text-shadow: 0 0 10px rgba(0, 255, 135, 0.5);
  }

  .event-connector {
    width: 20px;
    height: 20px;
    border: 3px solid #00ff87;
    border-radius: 50%;
    position: relative;
    background: #000a08;
    transition: all 0.3s ease;
  }

  .event-item:hover .event-connector {
    transform: scale(1.3);
    box-shadow: 0 0 20px rgba(0, 255, 135, 0.8);
  }

  .event-connector::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 8px;
    height: 8px;
    background: #00ff87;
    border-radius: 50%;
    transform: translate(-50%, -50%);
    animation: pulse 2s ease-in-out infinite;
  }

  @keyframes pulse {
    0%, 100% {
      opacity: 0.5;
      transform: translate(-50%, -50%) scale(0.8);
    }
    50% {
      opacity: 1;
      transform: translate(-50%, -50%) scale(1.2);
    }
  }

  .event-name {
    font-size: 1.1rem;
    color: #e0ffe8;
    font-weight: 600;
    letter-spacing: 0.03em;
    transition: all 0.3s ease;
  }

  .event-item.food .event-name {
    font-style: italic;
    color: #64ffda;
  }

  .event-item:hover .event-name {
    color: #00ff87;
    transform: translateX(5px);
  }

  .event-pulse {
    position: absolute;
    left: 110px;
    width: 20px;
    height: 20px;
    border: 2px solid #00ff87;
    border-radius: 50%;
    opacity: 0;
    animation: pulseRing 2s ease-out infinite;
  }

  @keyframes pulseRing {
    0% {
      transform: scale(1);
      opacity: 0.5;
    }
    100% {
      transform: scale(2.5);
      opacity: 0;
    }
  }

  @media (max-width: 768px) {
    .schedule-section {
      padding: 4rem 1rem;
    }

    .timeline-grid {
      gap: 3rem;
    }

    .event-item {
      grid-template-columns: 70px 25px 1fr;
      gap: 0.8rem;
    }

    .event-time {
      font-size: 1rem;
    }

    .event-name {
      font-size: 1rem;
    }
  }
</style>
