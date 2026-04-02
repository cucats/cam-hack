<div class="schedule-grid">
  <div class="schedule-day">
    <h4>Saturday 1st November</h4>
    <ul>
      <li>
        <strong>09:30</strong> &bull; <em>Lorem Ipsum</em>
      </li>
      <li>
        <strong>10:00</strong> &bull; Lorem Ipsum Dolor
      </li>
      <li>
        <strong>10:30</strong> &bull; Lorem Ipsum Sit!
      </li>
      <li>
        <strong>13:00</strong> &bull; <em>Lorem Ipsum</em>
      </li>
      <li>
        <strong>18:00</strong> &bull; <em>Lorem Ipsum</em>
      </li>
    </ul>
  </div>
  <div class="schedule-day">
    <h4>Sunday 2nd November</h4>
    <ul>
      <li>
        <strong>09:30</strong> &bull; <em>Lorem Ipsum</em>
      </li>
      <li>
        <strong>13:00</strong> &bull; <em>Lorem Ipsum</em>
      </li>
      <li>
        <strong>16:30</strong> &bull; Lorem Ipsum Sit!
      </li>
      <li>
        <strong>17:00</strong> &bull; <em>Lorem Ipsum</em>
      </li>
      <li>
        <strong>18:00</strong> &bull; Lorem Ipsum Dolor
      </li>
      <li>
        <strong>18:30</strong> &bull; Lorem Ipsum Sit
      </li>
    </ul>
  </div>
</div>

<style>
  .schedule-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2rem;
  }

  .schedule-day {
    position: relative;
    padding: 1.5rem;
    background: rgba(134, 226, 147, 0.03);
    border: 1px solid rgba(134, 226, 147, 0.2);
    border-radius: 1rem;
    transition: all 0.3s ease;
  }

  .schedule-day:hover {
    background: rgba(134, 226, 147, 0.06);
    border-color: rgba(134, 226, 147, 0.4);
    transform: translateY(-5px);
    box-shadow: 0 0 30px rgba(134, 226, 147, 0.2);
  }

  .schedule-day::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 4px;
    height: 100%;
    background: linear-gradient(180deg, #86e293, #86e6c6);
    border-radius: 1rem 0 0 1rem;
  }

  .schedule-day ul {
    list-style: none;
    padding: 0;
  }

  .schedule-day li {
    padding: 0.75rem 0;
    border-bottom: 1px solid rgba(134, 226, 147, 0.1);
    position: relative;
    padding-left: 1rem;
    transition: all 0.2s ease;
  }

  .schedule-day li:hover {
    padding-left: 1.5rem;
    border-bottom-color: rgba(134, 226, 147, 0.3);
  }

  .schedule-day li::before {
    content: "▸";
    position: absolute;
    left: 0;
    color: #86e293;
    opacity: 0;
    transition: opacity 0.2s ease;
  }

  .schedule-day li:hover::before {
    opacity: 1;
  }

  .schedule-day li:last-child {
    border-bottom: none;
  }
</style>
