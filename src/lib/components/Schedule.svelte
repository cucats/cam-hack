<script>
  import { onMount } from 'svelte';
  
  let sectionRef;
  let isVisible = $state(false);

  const saturday = [
    { time: '09:30', event: 'Breakfast', isFood: true },
    { time: '10:00', event: 'Opening Ceremony', isFood: false },
    { time: '10:30', event: 'Hacking begins!', isFood: false, isHighlight: true },
    { time: '13:00', event: 'Lunch', isFood: true },
    { time: '18:00', event: 'Dinner', isFood: true },
  ];

  const sunday = [
    { time: '09:30', event: 'Breakfast', isFood: true },
    { time: '13:00', event: 'Lunch', isFood: true },
    { time: '16:30', event: 'Hacking ends!', isFood: false, isHighlight: true },
    { time: '17:00', event: 'Dinner', isFood: true },
    { time: '18:00', event: 'Judging ends', isFood: false },
    { time: '18:30', event: 'Closing ceremony', isFood: false, isHighlight: true },
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
      { threshold: 0.1 }
    );

    if (sectionRef) observer.observe(sectionRef);

    return () => observer.disconnect();
  });
</script>

<div class="schedule-section" bind:this={sectionRef}>
  <div class="content-wrapper" class:visible={isVisible}>
    <div class="section-header">
      <h2 class="section-title">
        <span class="title-icon">📅</span>
        Schedule
      </h2>
      <div class="title-underline"></div>
    </div>

    <div class="timeline-container">
      <div class="day-column">
        <div class="day-header glass-card">
          <h3>Saturday</h3>
          <span class="day-date">1st November</span>
        </div>
        <div class="timeline">
          {#each saturday as item, index}
            <div 
              class="timeline-item"
              class:food={item.isFood}
              class:highlight={item.isHighlight}
              style="animation-delay: {index * 0.1}s"
            >
              <div class="time-marker">
                <div class="marker-dot"></div>
                <div class="marker-line"></div>
              </div>
              <div class="event-card glass-card">
                <span class="event-time">{item.time}</span>
                <span class="event-name">{item.event}</span>
                {#if item.isFood}
                  <span class="food-icon">🍽️</span>
                {/if}
              </div>
            </div>
          {/each}
        </div>
      </div>

      <div class="timeline-divider">
        <div class="divider-line"></div>
        <div class="divider-icon">⚡</div>
        <div class="divider-line"></div>
      </div>

      <div class="day-column">
        <div class="day-header glass-card">
          <h3>Sunday</h3>
          <span class="day-date">2nd November</span>
        </div>
        <div class="timeline">
          {#each sunday as item, index}
            <div 
              class="timeline-item"
              class:food={item.isFood}
              class:highlight={item.isHighlight}
              style="animation-delay: {(index + saturday.length) * 0.1}s"
            >
              <div class="time-marker">
                <div class="marker-dot"></div>
                <div class="marker-line"></div>
              </div>
              <div class="event-card glass-card">
                <span class="event-time">{item.time}</span>
                <span class="event-name">{item.event}</span>
                {#if item.isFood}
                  <span class="food-icon">🍽️</span>
                {/if}
              </div>
            </div>
          {/each}
        </div>
      </div>
    </div>
  </div>
</div>

<style>
  .schedule-section {
    position: relative;
    padding: 6rem 2rem;
    overflow: hidden;
  }

  .content-wrapper {
    max-width: 1100px;
    margin: 0 auto;
    opacity: 0;
    transform: translateY(50px);
    transition: all 0.8s ease-out;
  }

  .content-wrapper.visible {
    opacity: 1;
    transform: translateY(0);
  }

  .section-header {
    text-align: center;
    margin-bottom: 4rem;
  }

  .section-title {
    display: inline-flex;
    align-items: center;
    gap: 0.75rem;
    font-size: clamp(2rem, 5vw, 3rem);
    margin-bottom: 1rem;
  }

  .title-icon {
    font-size: 0.8em;
  }

  .title-underline {
    width: 100px;
    height: 3px;
    background: linear-gradient(90deg, transparent, var(--color-primary), transparent);
    margin: 0 auto;
    border-radius: 2px;
  }

  .timeline-container {
    display: flex;
    gap: 2rem;
    justify-content: center;
  }

  @media (max-width: 768px) {
    .timeline-container {
      flex-direction: column;
      align-items: center;
    }

    .timeline-divider {
      display: none;
    }
  }

  .day-column {
    flex: 1;
    max-width: 400px;
  }

  .day-header {
    text-align: center;
    padding: 1.5rem;
    margin-bottom: 2rem;
  }

  .day-header h3 {
    font-size: 1.5rem;
    color: var(--color-primary);
    margin-bottom: 0.25rem;
  }

  .day-date {
    color: var(--color-text-muted);
    font-size: 0.95rem;
  }

  .timeline {
    position: relative;
  }

  .timeline-item {
    display: flex;
    gap: 1rem;
    margin-bottom: 1rem;
    opacity: 0;
    animation: slide-in 0.5s ease-out forwards;
  }

  .content-wrapper.visible .timeline-item {
    animation-play-state: running;
  }

  @keyframes slide-in {
    from {
      opacity: 0;
      transform: translateX(-20px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  .time-marker {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 20px;
  }

  .marker-dot {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: var(--color-dark-card);
    border: 2px solid var(--color-primary);
    flex-shrink: 0;
    transition: all 0.3s ease;
  }

  .timeline-item:hover .marker-dot {
    background: var(--color-primary);
    box-shadow: 0 0 15px var(--color-primary);
  }

  .timeline-item.highlight .marker-dot {
    background: var(--color-primary);
    box-shadow: 0 0 10px var(--color-primary);
  }

  .marker-line {
    width: 2px;
    flex: 1;
    min-height: 30px;
    background: linear-gradient(to bottom, var(--color-primary), rgba(0, 255, 136, 0.2));
  }

  .timeline-item:last-child .marker-line {
    display: none;
  }

  .event-card {
    flex: 1;
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1rem 1.5rem;
    transition: all 0.3s ease;
  }

  .event-card:hover {
    transform: translateX(5px);
    box-shadow: 0 10px 30px rgba(0, 255, 136, 0.15);
  }

  .timeline-item.highlight .event-card {
    border: 1px solid rgba(0, 255, 136, 0.4);
  }

  .event-time {
    font-family: var(--font-mono);
    font-weight: 600;
    color: var(--color-primary);
    font-size: 0.95rem;
    min-width: 55px;
  }

  .event-name {
    flex: 1;
    color: var(--color-text-light);
  }

  .timeline-item.food .event-name {
    color: var(--color-text-muted);
    font-style: italic;
  }

  .food-icon {
    font-size: 1.2rem;
  }

  .timeline-divider {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    padding: 0 1rem;
  }

  .divider-line {
    width: 2px;
    height: 100px;
    background: linear-gradient(to bottom, transparent, var(--color-primary), transparent);
  }

  .divider-icon {
    font-size: 1.5rem;
    animation: pulse 2s infinite;
  }

  @keyframes pulse {
    0%, 100% { transform: scale(1); opacity: 1; }
    50% { transform: scale(1.2); opacity: 0.8; }
  }
</style>
