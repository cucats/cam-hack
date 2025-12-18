<script>
  const FORM_URL =
    "https://docs.google.com/forms/d/e/1FAIpQLScyyLCcd9LJAo_x2Ly0jvNgAI6-dqp3AmKYoFbca5mxLVvtCQ/viewform";
</script>

<svelte:head>
  <title>Sign up &bull; Cam Hack 2025</title>
</svelte:head>

<div class="signup-container">
  <div class="content-wrapper">
    <h2 class="section-title">
      <span class="title-accent">{"{"}</span>
      Sign up
      <span class="title-accent">{"}"}</span>
    </h2>
    
    <div class="content-card">
      <p class="deadline-text">
        The deadline for signing up is 23:59 24th October!
      </p>
      
      <p class="info-text">
        Not loading? Open the form directly <a
          target="_blank"
          href={FORM_URL}
          class="form-link">here</a>.
      </p>
      
      <div class="iframe-wrapper">
        <iframe
          title="Sign up form"
          src="{FORM_URL}?embedded=true"
          class="signup-iframe"
          frameborder="0"
        >
        </iframe>
      </div>
    </div>
  </div>
</div>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Space+Mono:wght@400;700&display=swap');

  .signup-container {
    min-height: calc(100vh - 80px);
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

  .content-card {
    background: rgba(0, 0, 0, 0.6);
    border: 2px solid rgba(0, 255, 136, 0.3);
    border-radius: 20px;
    padding: 3rem;
    box-shadow: 
      0 10px 40px rgba(0, 255, 136, 0.2),
      inset 0 0 20px rgba(0, 255, 136, 0.05);
  }

  .deadline-text {
    font-family: 'Orbitron', sans-serif;
    font-size: clamp(1rem, 1.5vw, 1.3rem);
    font-weight: 700;
    color: #00ff88;
    margin-bottom: 1.5rem;
    text-align: center;
    text-shadow: 0 0 10px rgba(0, 255, 136, 0.5);
  }

  .info-text {
    font-family: 'Space Mono', monospace;
    font-size: clamp(0.95rem, 1.5vw, 1.1rem);
    line-height: 1.8;
    color: #e0e0e0;
    margin-bottom: 2rem;
    text-align: center;
  }

  .form-link {
    color: #00ff88;
    text-decoration: none;
    font-weight: 700;
    transition: all 0.3s ease;
    text-shadow: 0 0 10px rgba(0, 255, 136, 0.3);
    border-bottom: 2px solid transparent;
  }

  .form-link:hover {
    color: #88ffb8;
    border-bottom-color: #88ffb8;
    text-shadow: 0 0 20px rgba(0, 255, 136, 0.6);
  }

  .iframe-wrapper {
    background: rgba(255, 255, 255, 0.05);
    border: 2px solid rgba(0, 255, 136, 0.3);
    border-radius: 15px;
    overflow: hidden;
    box-shadow: inset 0 0 20px rgba(0, 255, 136, 0.1);
  }

  .signup-iframe {
    width: 100%;
    height: 800px;
    border: none;
  }

  @media (max-width: 768px) {
    .signup-container {
      padding: 4rem 1rem;
      min-height: calc(100vh - 70px);
    }

    .content-card {
      padding: 2rem;
    }

    .signup-iframe {
      height: 600px;
    }
  }
</style>
