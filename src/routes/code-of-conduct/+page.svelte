<svelte:head>
  <title>Code of Conduct • Cam Hack 2025</title>
</svelte:head>

<section class="coc-section">
  <div class="content-wrapper">
    <div class="section-header">
      <h2 class="section-title">Code of Conduct</h2>
      <div class="title-underline"></div>
    </div>
    
    <div class="content-card glass-card">
      <p>
        Cam Hack is committed to providing a safe, inclusive, and welcoming
        experience for everyone. This code outlines our expectations for all
        participants and attendees.
      </p>
      <p>
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
      <p>
        If you feel you are being harassed by someone else at the hackathon,
        please come talk to a member of the committee and we will handle the
        situation accordingly. Participants who break these rules may be
        disqualified at the discretion of the committee.
      </p>
    </div>
  </div>
</section>

<style>
  .coc-section {
    min-height: calc(100vh - 60px);
    padding: 4rem 2rem;
    background: var(--color-dark);
  }

  .content-wrapper {
    max-width: 800px;
    margin: 0 auto;
  }

  .section-header {
    text-align: center;
    margin-bottom: 3rem;
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

  .content-card {
    padding: 2.5rem;
  }

  .content-card p {
    color: var(--color-text-light);
    line-height: 1.8;
    margin-bottom: 1.5rem;
  }

  .discrimination-list {
    list-style: none;
    padding: 0;
    margin: 0 0 1.5rem 0;
  }

  .discrimination-list li {
    position: relative;
    padding-left: 1.5rem;
    margin-bottom: 0.75rem;
    color: var(--color-text-muted);
  }

  .discrimination-list li::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0.5rem;
    width: 6px;
    height: 6px;
    background: var(--color-primary);
    border-radius: 50%;
  }
</style>
