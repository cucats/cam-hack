<div class="mx-auto max-w-7xl schedule-container">
  <h2>Schedule</h2>
  <div class="flex max-md:flex-col schedule-grid">
    <div class="flex-1 schedule-day">
      <h4>Saturday 1st November</h4>
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
    <div class="mb-4 flex-1 schedule-day">
      <h4>Sunday 2nd November</h4>
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

<style>
  .schedule-container {
    position: relative;
  }

  .schedule-day {
    padding: 1.5rem;
    border-radius: 1rem;
    background: rgba(255, 255, 255, 0.5);
    backdrop-filter: blur(4px);
    border: 2px solid rgba(16, 185, 129, 0.2);
    transition: all 0.5s ease;
  }

  .schedule-day:hover {
    border-color: #34d399;
    box-shadow: 0 10px 15px -3px rgba(16, 185, 129, 0.1), 0 4px 6px -2px rgba(16, 185, 129, 0.05);
    transform: translateY(-5px);
  }

  .schedule-list {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .schedule-item {
    padding: 0.75rem;
    border-radius: 0.5rem;
    background: rgba(236, 253, 245, 0.5);
    transition: all 0.3s ease;
  }

  .schedule-item:hover {
    background: rgba(209, 250, 229, 0.7);
    transform: translateX(0.5rem);
  }

  .schedule-item strong {
    color: #047857;
  }
</style>
