<div class="about-content">
  <p class="about-paragraph">
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
    tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
    quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
    consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
    cillum dolore eu fugiat nulla pariatur.
  </p>
  <p class="about-paragraph">
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
    tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
    quis nostrud exercitation ullamco laboris.
  </p>
</div>

<style>
  .about-content {
    position: relative;
  }

  .about-paragraph {
    position: relative;
    padding-left: 1.5rem;
    transition: all 0.3s ease;
  }

  .about-paragraph::before {
    content: ">";
    position: absolute;
    left: 0;
    color: #86e293;
    font-weight: bold;
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  .about-paragraph:hover {
    padding-left: 2rem;
  }

  .about-paragraph:hover::before {
    opacity: 1;
  }
</style>
