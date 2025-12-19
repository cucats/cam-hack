<svelte:head>
  <title>Code of Conduct &bull; Cam Hack 2025</title>
</svelte:head>

<section class="coc-section">
  <div class="coc-container">
    <h2 class="coc-title">Code of Conduct</h2>
    <div class="coc-content">
      <p>
        Cam Hack is committed to providing a safe, inclusive, and welcoming
        experience for everyone. This code outlines our expectations for all
        participants and attendees.
      </p>
      <p>
        We do not tolerate any form of harassment, discrimination, or exclusion of
        any form. In particular, we do not tolerate discrimination based on
      </p>
      <ul class="coc-list">
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
    min-height: calc(100vh - 80px);
    padding: 4rem 2rem;
  }

  .coc-container {
    max-width: 900px;
    margin: 0 auto;
  }

  .coc-title {
    font-size: 3rem;
    color: #00ff88;
    text-align: center;
    margin-bottom: 3rem;
    text-transform: uppercase;
    letter-spacing: 4px;
    font-family: 'Space Grotesk', sans-serif;
  }

  .coc-content {
    background: rgba(13, 127, 74, 0.1);
    border: 1px solid rgba(0, 255, 136, 0.2);
    border-radius: 20px;
    padding: 3rem;
    font-size: 1.2rem;
    line-height: 1.8;
  }

  .coc-content p {
    margin-bottom: 1.5rem;
    color: #e8fff5;
  }

  .coc-list {
    list-style: none;
    padding: 0;
    margin: 1.5rem 0;
  }

  .coc-list li {
    position: relative;
    padding-left: 2rem;
    margin-bottom: 1rem;
    color: #e8fff5;
  }

  .coc-list li::before {
    content: '▸';
    position: absolute;
    left: 0;
    color: #00ff88;
    font-size: 1.5rem;
    line-height: 1.8;
  }

  @media (max-width: 768px) {
    .coc-title {
      font-size: 2rem;
    }

    .coc-content {
      padding: 2rem;
      font-size: 1rem;
    }
  }
</style>
