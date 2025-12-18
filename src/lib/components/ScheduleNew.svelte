<div class="schedule-container">
  <div class="content-wrapper">
    <h2 class="section-title">
      <span class="title-accent">{"<"}</span>
      Schedule
      <span class="title-accent">{"/>"}</span>
    </h2>
    
    <div class="schedule-grid">
      <div class="day-card">
        <div class="day-header">
          <h3 class="day-title">Saturday</h3>
          <div class="day-date">1st November</div>
        </div>
        
        <div class="timeline">
          <div class="timeline-item">
            <div class="time-badge">09:30</div>
            <div class="event-content meal">
              <span class="event-icon">🥐</span>
              <span class="event-name">Breakfast</span>
            </div>
          </div>

          <div class="timeline-item">
            <div class="time-badge">10:00</div>
            <div class="event-content">
              <span class="event-icon">🎤</span>
              <span class="event-name">Opening Ceremony</span>
            </div>
          </div>

          <div class="timeline-item highlight">
            <div class="time-badge">10:30</div>
            <div class="event-content">
              <span class="event-icon">💻</span>
              <span class="event-name">Hacking begins!</span>
            </div>
          </div>

          <div class="timeline-item">
            <div class="time-badge">13:00</div>
            <div class="event-content meal">
              <span class="event-icon">🍕</span>
              <span class="event-name">Lunch</span>
            </div>
          </div>

          <div class="timeline-item">
            <div class="time-badge">18:00</div>
            <div class="event-content meal">
              <span class="event-icon">🍔</span>
              <span class="event-name">Dinner</span>
            </div>
          </div>
        </div>
      </div>

      <div class="day-card">
        <div class="day-header">
          <h3 class="day-title">Sunday</h3>
          <div class="day-date">2nd November</div>
        </div>
        
        <div class="timeline">
          <div class="timeline-item">
            <div class="time-badge">09:30</div>
            <div class="event-content meal">
              <span class="event-icon">🥐</span>
              <span class="event-name">Breakfast</span>
            </div>
          </div>

          <div class="timeline-item">
            <div class="time-badge">13:00</div>
            <div class="event-content meal">
              <span class="event-icon">🍕</span>
              <span class="event-name">Lunch</span>
            </div>
          </div>

          <div class="timeline-item highlight">
            <div class="time-badge">16:30</div>
            <div class="event-content">
              <span class="event-icon">🛑</span>
              <span class="event-name">Hacking ends!</span>
            </div>
          </div>

          <div class="timeline-item">
            <div class="time-badge">17:00</div>
            <div class="event-content meal">
              <span class="event-icon">🍔</span>
              <span class="event-name">Dinner</span>
            </div>
          </div>

          <div class="timeline-item">
            <div class="time-badge">18:00</div>
            <div class="event-content">
              <span class="event-icon">⚖️</span>
              <span class="event-name">Judging ends</span>
            </div>
          </div>

          <div class="timeline-item highlight">
            <div class="time-badge">18:30</div>
            <div class="event-content">
              <span class="event-icon">🏆</span>
              <span class="event-name">Closing ceremony</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Space+Mono:wght@400;700&display=swap');

  .schedule-container {
    padding: 6rem 2rem;
    background: linear-gradient(180deg, rgba(0, 0, 0, 0.9) 0%, rgba(10, 77, 46, 0.2) 100%);
    position: relative;
  }

  .content-wrapper {
    max-width: 1200px;
    margin: 0 auto;
  }

  .section-title {
    font-family: 'Orbitron', sans-serif;
    font-size: clamp(2rem, 5vw, 3.5rem);
    font-weight: 900;
    text-align: center;
    color: #00ff88;
    margin-bottom: 4rem;
    letter-spacing: 0.3rem;
    text-transform: uppercase;
    text-shadow: 0 0 20px rgba(0, 255, 136, 0.5);
  }

  .title-accent {
    color: #88ffb8;
    font-weight: 400;
  }

  .schedule-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 3rem;
  }

  .day-card {
    background: rgba(0, 0, 0, 0.6);
    border: 2px solid rgba(0, 255, 136, 0.3);
    border-radius: 20px;
    padding: 2rem;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .day-card:hover {
    border-color: #00ff88;
    box-shadow: 
      0 15px 40px rgba(0, 255, 136, 0.3),
      inset 0 0 20px rgba(0, 255, 136, 0.1);
  }

  .day-header {
    text-align: center;
    margin-bottom: 2rem;
    padding-bottom: 1.5rem;
    border-bottom: 2px solid rgba(0, 255, 136, 0.3);
  }

  .day-title {
    font-family: 'Orbitron', sans-serif;
    font-size: clamp(1.8rem, 3vw, 2.5rem);
    font-weight: 900;
    color: #00ff88;
    margin-bottom: 0.5rem;
    letter-spacing: 0.2rem;
    text-shadow: 0 0 15px rgba(0, 255, 136, 0.5);
  }

  .day-date {
    font-family: 'Space Mono', monospace;
    font-size: clamp(0.9rem, 1.5vw, 1.1rem);
    color: #88ffb8;
    letter-spacing: 0.1rem;
  }

  .timeline {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .timeline-item {
    display: flex;
    gap: 1.5rem;
    align-items: center;
    transition: all 0.3s ease;
  }

  .timeline-item:hover {
    transform: translateX(10px);
  }

  .timeline-item.highlight {
    position: relative;
  }

  .timeline-item.highlight::before {
    content: '';
    position: absolute;
    left: -2rem;
    right: -2rem;
    top: -0.5rem;
    bottom: -0.5rem;
    background: rgba(0, 255, 136, 0.1);
    border-radius: 10px;
    border-left: 3px solid #00ff88;
  }

  .time-badge {
    font-family: 'Orbitron', sans-serif;
    font-size: clamp(0.9rem, 1.5vw, 1.1rem);
    font-weight: 700;
    color: #0a0a0a;
    background: linear-gradient(135deg, #00ff88 0%, #00cc6a 100%);
    padding: 0.5rem 1rem;
    border-radius: 10px;
    min-width: 80px;
    text-align: center;
    box-shadow: 0 0 15px rgba(0, 255, 136, 0.4);
    position: relative;
    z-index: 1;
  }

  .event-content {
    font-family: 'Space Mono', monospace;
    font-size: clamp(0.95rem, 1.5vw, 1.1rem);
    color: #e0e0e0;
    display: flex;
    align-items: center;
    gap: 0.8rem;
    position: relative;
    z-index: 1;
  }

  .event-content.meal {
    font-style: italic;
    color: #88ffb8;
  }

  .event-icon {
    font-size: 1.5rem;
  }

  .event-name {
    font-weight: 700;
  }

  @media (max-width: 768px) {
    .schedule-container {
      padding: 4rem 1rem;
    }

    .schedule-grid {
      grid-template-columns: 1fr;
      gap: 2rem;
    }

    .day-card {
      padding: 1.5rem;
    }

    .timeline-item {
      gap: 1rem;
    }

    .time-badge {
      min-width: 70px;
      padding: 0.4rem 0.8rem;
    }
  }
</style>
