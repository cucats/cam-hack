<script>
  import { page } from "$app/stores";
</script>

<section class="error-section">
  <div class="error-container">
    <div class="error-code">{$page.status}</div>
    <h1 class="error-message">{$page.error?.message}</h1>
    <div class="error-decoration">
      <span class="dot"></span>
      <span class="line"></span>
      <span class="dot"></span>
    </div>
    <a href="/" class="home-button">
      <span>Return Home</span>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M5 12h14M12 5l7 7-7 7"/>
      </svg>
    </a>
  </div>
</section>

<style>
  .error-section {
    min-height: calc(100vh - 60px);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem;
    background: var(--color-dark);
  }

  .error-container {
    text-align: center;
  }

  .error-code {
    font-family: var(--font-mono);
    font-size: clamp(6rem, 20vw, 12rem);
    font-weight: 700;
    color: var(--color-primary);
    text-shadow: 0 0 50px rgba(0, 255, 136, 0.5);
    line-height: 1;
    margin-bottom: 1rem;
  }

  .error-message {
    font-size: clamp(1.5rem, 4vw, 2.5rem);
    color: var(--color-text-light);
    margin-bottom: 2rem;
  }

  .error-decoration {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    margin-bottom: 3rem;
  }

  .dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: var(--color-primary);
  }

  .line {
    width: 60px;
    height: 2px;
    background: linear-gradient(90deg, var(--color-primary), var(--color-accent));
  }

  .home-button {
    display: inline-flex;
    align-items: center;
    gap: 0.75rem;
    padding: 1rem 2rem;
    background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-dark) 100%);
    color: var(--color-dark);
    font-weight: 600;
    font-size: 1.1rem;
    text-decoration: none;
    border-radius: 0.75rem;
    transition: all 0.3s ease;
  }

  .home-button:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 30px rgba(0, 255, 136, 0.4);
  }

  .home-button svg {
    width: 20px;
    height: 20px;
    transition: transform 0.3s ease;
  }

  .home-button:hover svg {
    transform: translateX(5px);
  }
</style>
