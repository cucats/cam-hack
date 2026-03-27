<script>
  const FORM_URL =
    "https://docs.google.com/forms/d/e/1FAIpQLScyyLCcd9LJAo_x2Ly0jvNgAI6-dqp3AmKYoFbca5mxLVvtCQ/viewform";
</script>

<svelte:head>
  <title>Sign up • Cam Hack 2025</title>
</svelte:head>

<section class="signup-section">
  <div class="content-wrapper">
    <div class="section-header">
      <h2 class="section-title">Sign up</h2>
      <div class="title-underline"></div>
    </div>
    
    <div class="info-card glass-card">
      <p class="deadline-text">The deadline for signing up is 23:59 24th October!</p>
      <p class="fallback-text">
        Not loading? Open the form directly <a
          target="_blank"
          href={FORM_URL}
          class="theme-hyperlink">here</a
        >.
      </p>
    </div>
    
    <div class="form-container glass-card">
      <iframe
        title="Sign up form"
        src="{FORM_URL}?embedded=true"
        class="form-iframe"
        frameborder="0"
      >
      </iframe>
    </div>
  </div>
</section>

<style>
  .signup-section {
    min-height: calc(100vh - 60px);
    padding: 4rem 2rem;
    background: var(--color-dark);
  }

  .content-wrapper {
    max-width: 900px;
    margin: 0 auto;
  }

  .section-header {
    text-align: center;
    margin-bottom: 2rem;
  }

  .section-title {
    font-size: clamp(2rem, 5vw, 3rem);
    margin-bottom: 1rem;
    color: var(--color-text-light);
  }

  .title-underline {
    width: 100px;
    height: 3px;
    background: linear-gradient(90deg, transparent, var(--color-primary), transparent);
    margin: 0 auto;
    border-radius: 2px;
  }

  .info-card {
    padding: 1.5rem 2rem;
    margin-bottom: 2rem;
    text-align: center;
  }

  .deadline-text {
    color: var(--color-primary);
    font-weight: 600;
    font-size: 1.1rem;
    margin-bottom: 0.5rem;
  }

  .fallback-text {
    color: var(--color-text-muted);
    margin: 0;
  }

  .form-container {
    padding: 1rem;
    overflow: hidden;
  }

  .form-iframe {
    width: 100%;
    height: 800px;
    border-radius: 0.5rem;
    background: white;
  }
</style>
