<svelte:head>
  <title>Code of Conduct &bull; Cam Hack 2025</title>
</svelte:head>

<div class="coc-container">
  <div class="content-wrapper">
    <h2 class="section-title">
      <span class="title-accent">{"["}</span>
      Code of Conduct
      <span class="title-accent">{"]"}</span>
    </h2>
    
    <div class="content-card">
      <p class="intro-text">
        Cam Hack is committed to providing a safe, inclusive, and welcoming
        experience for everyone. This code outlines our expectations for all
        participants and attendees.
      </p>
      
      <p class="text">
        We do not tolerate any form of harassment, discrimination, or exclusion of
        any form. In particular, we do not tolerate discrimination based on
      </p>
      
      <ul class="discrimination-list">
        <li>Race, ethnicity, or nationality</li>
        <li>Gender identity, expression, or sexual orientation</li>
        <li>Age</li>
        <li>Disability or medical condition</li>
        <li>Physical appearance or body size</li>
        <li>Religion or belief system</li>
      </ul>
      
      <p class="text">
        If you feel you are being harassed by someone else at the hackathon,
        please come talk to a member of the committee and we will handle the
        situation accordingly. Participants who break these rules may be
        disqualified at the discretion of the committee.
      </p>
    </div>
  </div>
</div>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Space+Mono:wght@400;700&display=swap');

  .coc-container {
    min-height: calc(100vh - 80px);
    padding: 6rem 2rem;
    background: linear-gradient(180deg, rgba(0, 0, 0, 0.9) 0%, rgba(10, 77, 46, 0.2) 100%);
    position: relative;
  }

  .content-wrapper {
    max-width: 1000px;
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

  .intro-text {
    font-family: 'Space Mono', monospace;
    font-size: clamp(1rem, 1.5vw, 1.2rem);
    line-height: 1.8;
    color: #00ff88;
    margin-bottom: 2rem;
    font-weight: 700;
  }

  .text {
    font-family: 'Space Mono', monospace;
    font-size: clamp(0.95rem, 1.5vw, 1.1rem);
    line-height: 1.8;
    color: #e0e0e0;
    margin-bottom: 1.5rem;
  }

  .discrimination-list {
    list-style: none;
    padding: 0;
    margin: 2rem 0;
  }

  .discrimination-list li {
    font-family: 'Space Mono', monospace;
    font-size: clamp(0.95rem, 1.5vw, 1.1rem);
    line-height: 1.8;
    color: #e0e0e0;
    padding-left: 2rem;
    margin-bottom: 0.8rem;
    position: relative;
  }

  .discrimination-list li::before {
    content: '▹';
    position: absolute;
    left: 0;
    color: #00ff88;
    font-size: 1.5rem;
    line-height: 1.8rem;
  }

  @media (max-width: 768px) {
    .coc-container {
      padding: 4rem 1rem;
      min-height: calc(100vh - 70px);
    }

    .content-card {
      padding: 2rem;
    }
  }
</style>
