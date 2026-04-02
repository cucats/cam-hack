<script>
  import { onMount } from 'svelte';

  let visible = $state(false);

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

    const element = document.querySelector('#schedule');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  });
</script>

<section id="schedule" class="schedule-section" class:visible>
  <div class="schedule-container">
    <h2 class="section-title">
      <span class="title-line"></span>
      <span class="title-text">Schedule</span>
      <span class="title-line"></span>
    </h2>
    
    <div class="schedule-grid">
      <div class="day-card">
        <h3 class="day-title">Saturday 1st November</h3>
        <div class="timeline">
          <div class="timeline-item">
            <div class="time-badge">09:30</div>
            <div class="event-name">Breakfast</div>
          </div>
          <div class="timeline-item">
            <div class="time-badge">10:00</div>
            <div class="event-name">Opening Ceremony</div>
          </div>
          <div class="timeline-item highlight">
            <div class="time-badge">10:30</div>
            <div class="event-name">Hacking begins!</div>
          </div>
          <div class="timeline-item">
            <div class="time-badge">13:00</div>
            <div class="event-name">Lunch</div>
          </div>
          <div class="timeline-item">
            <div class="time-badge">18:00</div>
            <div class="event-name">Dinner</div>
          </div>
        </div>
      </div>

      <div class="day-card">
        <h3 class="day-title">Sunday 2nd November</h3>
        <div class="timeline">
          <div class="timeline-item">
            <div class="time-badge">09:30</div>
            <div class="event-name">Breakfast</div>
          </div>
          <div class="timeline-item">
            <div class="time-badge">13:00</div>
            <div class="event-name">Lunch</div>
          </div>
          <div class="timeline-item highlight">
            <div class="time-badge">16:30</div>
            <div class="event-name">Hacking ends!</div>
          </div>
          <div class="timeline-item">
            <div class="time-badge">17:00</div>
            <div class="event-name">Dinner</div>
          </div>
          <div class="timeline-item">
            <div class="time-badge">18:00</div>
            <div class="event-name">Judging ends</div>
          </div>
          <div class="timeline-item">
            <div class="time-badge">18:30</div>
            <div class="event-name">Closing ceremony</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Space+Mono:wght@400;700&display=swap');

  .schedule-section {
    position: relative;
    padding: 8rem 2rem;
    background: linear-gradient(180deg, #1a1e3f 0%, #0a0e27 100%);
    overflow: hidden;
    opacity: 0;
    transform: translateY(50px);
    transition: all 1s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .schedule-section.visible {
    opacity: 1;
    transform: translateY(0);
  }

  .schedule-section::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, #00ff88, transparent);
  }

  .schedule-container {
    max-width: 1400px;
    margin: 0 auto;
  }

  .section-title {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 2rem;
    margin-bottom: 4rem;
  }

  .title-line {
    flex: 1;
    height: 2px;
    background: linear-gradient(90deg, transparent, #00ff88, transparent);
    max-width: 200px;
  }

  .title-text {
    font-family: 'Orbitron', monospace;
    font-size: clamp(2rem, 5vw, 3.5rem);
    font-weight: 900;
    color: #00ff88;
    text-shadow: 0 0 20px rgba(0, 255, 136, 0.5);
    text-transform: uppercase;
    letter-spacing: 0.1em;
    white-space: nowrap;
  }

  .schedule-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
    gap: 3rem;
  }

  .day-card {
    position: relative;
    background: linear-gradient(135deg, rgba(0, 255, 136, 0.05), rgba(0, 204, 255, 0.05));
    border: 2px solid rgba(0, 255, 136, 0.2);
    border-radius: 25px;
    padding: 2.5rem;
    backdrop-filter: blur(10px);
    transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
    opacity: 0;
    transform: scale(0.9);
    animation: scaleUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
  }

  .day-card:nth-child(2) {
    animation-delay: 0.2s;
  }

  .schedule-section.visible .day-card {
    opacity: 1;
    transform: scale(1);
  }

  @keyframes scaleUp {
    to {
      opacity: 1;
      transform: scale(1);
    }
  }

  .day-card:hover {
    border-color: rgba(0, 255, 136, 0.5);
    box-shadow: 0 20px 60px rgba(0, 255, 136, 0.3);
    transform: scale(1.02);
  }

  .day-title {
    font-family: 'Orbitron', monospace;
    font-size: 1.8rem;
    font-weight: 700;
    color: #00ccff;
    text-align: center;
    margin-bottom: 2rem;
    text-shadow: 0 0 15px rgba(0, 204, 255, 0.5);
  }

  .timeline {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .timeline-item {
    position: relative;
    display: flex;
    align-items: center;
    gap: 1.5rem;
    padding: 1rem;
    border-radius: 15px;
    background: rgba(0, 0, 0, 0.2);
    transition: all 0.3s ease;
  }

  .timeline-item:hover {
    background: rgba(0, 255, 136, 0.1);
    transform: translateX(10px);
  }

  .timeline-item.highlight {
    background: linear-gradient(135deg, rgba(0, 255, 136, 0.15), rgba(0, 204, 255, 0.15));
    border: 1px solid rgba(0, 255, 136, 0.3);
  }

  .time-badge {
    font-family: 'Orbitron', monospace;
    font-size: 1.1rem;
    font-weight: 700;
    color: #00ff88;
    background: rgba(0, 255, 136, 0.1);
    padding: 0.5rem 1rem;
    border-radius: 10px;
    border: 1px solid rgba(0, 255, 136, 0.3);
    min-width: 100px;
    text-align: center;
  }

  .event-name {
    font-family: 'Space Mono', monospace;
    font-size: 1.1rem;
    color: rgba(255, 255, 255, 0.9);
  }

  @media (max-width: 768px) {
    .schedule-section {
      padding: 4rem 1rem;
    }

    .schedule-grid {
      grid-template-columns: 1fr;
      gap: 2rem;
    }

    .day-card {
      padding: 1.5rem;
    }

    .section-title {
      gap: 1rem;
    }

    .title-line {
      max-width: 50px;
    }

    .timeline-item {
      flex-direction: column;
      gap: 0.5rem;
      align-items: flex-start;
    }

    .time-badge {
      min-width: auto;
    }
  }
</style>
