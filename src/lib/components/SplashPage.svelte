<script>
  import { onMount } from "svelte";
  import * as THREE from "three";
  import { sponsors, organizers } from "./sponsors-data.js";

  let canvasContainer;
  let scene, camera, renderer;
  let particles = [];
  let featuredProjects = [
    {
      title: "Unintended Behaviour",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      link: "https://cam-hack-2025.devpost.com",
    },
  ];

  let daysSince = $state(0);
  let sectionElements = [];

  onMount(() => {
    const eventDate = new Date("2025-11-01T00:00:00");
    const now = new Date();
    const diffTime = Math.abs(now - eventDate);
    daysSince = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    initThree();
    animate();
    initScrollAnimations();

    return () => {
      if (renderer) {
        particles.forEach((particle) => {
          particle.mesh.geometry.dispose();
          particle.mesh.material.dispose();
          scene.remove(particle.mesh);
        });
        particles = [];
        renderer.dispose();
        window.removeEventListener("resize", handleResize);
      }
    };
  });

  function initScrollAnimations() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -100px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    }, observerOptions);

    setTimeout(() => {
      const sections = document.querySelectorAll(
        ".about-section, .schedule-section, .rules-section, .faq-section, .featured-projects-section, .sponsors-section"
      );
      sections.forEach((section) => {
        section.classList.remove("visible");
        observer.observe(section);
      });
    }, 100);
  }

  function initThree() {
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0e27);

    camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    canvasContainer.appendChild(renderer.domElement);

    const torusGeometry = new THREE.TorusGeometry(1, 0.3, 16, 100);
    const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
    const icosahedronGeometry = new THREE.IcosahedronGeometry(0.8, 0);

    for (let i = 0; i < 60; i++) {
      let geometry;
      const rand = Math.random();
      if (rand < 0.4) {
        geometry = torusGeometry;
      } else if (rand < 0.7) {
        geometry = boxGeometry;
      } else {
        geometry = icosahedronGeometry;
      }

      const material = new THREE.MeshStandardMaterial({
        color: new THREE.Color().setHSL(0.4 + Math.random() * 0.1, 0.8, 0.5),
        emissive: new THREE.Color().setHSL(0.4 + Math.random() * 0.1, 0.8, 0.2),
        emissiveIntensity: 0.5,
        metalness: 0.8,
        roughness: 0.2,
        transparent: true,
        opacity: 0.8,
      });

      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.x = (Math.random() - 0.5) * 25;
      mesh.position.y = (Math.random() - 0.5) * 25;
      mesh.position.z = (Math.random() - 0.5) * 25;
      mesh.rotation.x = Math.random() * Math.PI;
      mesh.rotation.y = Math.random() * Math.PI;
      mesh.rotation.z = Math.random() * Math.PI;
      const scale = Math.random() * 0.6 + 0.2;
      mesh.scale.setScalar(scale);

      particles.push({
        mesh: mesh,
        speed: {
          x: (Math.random() - 0.5) * 0.015,
          y: (Math.random() - 0.5) * 0.015,
          z: (Math.random() - 0.5) * 0.015,
        },
        rotation: {
          x: (Math.random() - 0.5) * 0.03,
          y: (Math.random() - 0.5) * 0.03,
          z: (Math.random() - 0.5) * 0.03,
        },
        basePosition: {
          x: mesh.position.x,
          y: mesh.position.y,
          z: mesh.position.z,
        },
      });
      scene.add(mesh);
    }

    const ambientLight = new THREE.AmbientLight(0x10b981, 0.4);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0x10b981, 1.5, 100);
    pointLight1.position.set(8, 8, 8);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x34d399, 1.2, 100);
    pointLight2.position.set(-8, -8, -8);
    scene.add(pointLight2);

    const pointLight3 = new THREE.PointLight(0x6ee7b7, 0.8, 100);
    pointLight3.position.set(0, 10, -10);
    scene.add(pointLight3);

    const directionalLight = new THREE.DirectionalLight(0x6ee7b7, 0.6);
    directionalLight.position.set(0, 10, 0);
    scene.add(directionalLight);

    window.addEventListener("resize", handleResize);
  }

  function handleResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }

  function animate() {
    requestAnimationFrame(animate);

    const time = Date.now() * 0.001;

    particles.forEach((particle, index) => {
      particle.mesh.rotation.x += particle.rotation.x;
      particle.mesh.rotation.y += particle.rotation.y;
      particle.mesh.rotation.z += particle.rotation.z;

      particle.mesh.position.x += particle.speed.x;
      particle.mesh.position.y += particle.speed.y;
      particle.mesh.position.z += particle.speed.z;

      const waveX = Math.sin(time + index * 0.1) * 0.5;
      const waveY = Math.cos(time + index * 0.15) * 0.5;
      particle.mesh.position.x += waveX * 0.01;
      particle.mesh.position.y += waveY * 0.01;

      if (Math.abs(particle.mesh.position.x) > 12) particle.speed.x *= -1;
      if (Math.abs(particle.mesh.position.y) > 12) particle.speed.y *= -1;
      if (Math.abs(particle.mesh.position.z) > 12) particle.speed.z *= -1;

      const distance = particle.mesh.position.distanceTo(camera.position);
      const opacity = Math.max(0.3, 1 - distance / 25);
      particle.mesh.material.opacity = opacity;

      const hue = (0.4 + Math.sin(time * 0.5 + index * 0.1) * 0.05) % 1;
      particle.mesh.material.color.setHSL(hue, 0.8, 0.5);
      particle.mesh.material.emissive.setHSL(hue, 0.8, 0.2);
    });

    camera.position.x = Math.sin(time * 0.3) * 0.8;
    camera.position.y = Math.cos(time * 0.2) * 0.8;
    camera.lookAt(0, 0, 0);

    renderer.render(scene, camera);
  }
</script>

<div class="splash-container">
  <div bind:this={canvasContainer} class="three-canvas"></div>

  <div class="content-overlay">
    <div class="hero-section">
      <div class="logo-container">
        <img
          src="/cam-hack-logo-text.png"
          alt="Cam Hack Logo"
          class="logo"
        />
      </div>
      <h1 class="main-title">Cam Hack 2025</h1>
      <h2 class="subtitle">1st &ndash; 2nd November</h2>
      <div class="countdown-container">
        <div class="countdown-label">Days since the event</div>
        <div class="countdown-number">{daysSince}</div>
      </div>
      <p class="tagline">What can you make in 2 days?</p>
      <div class="cta-buttons">
        <a
          target="_blank"
          href="/discord"
          class="btn btn-primary"
        >
          Join the Discord!
        </a>
        <a
          target="_blank"
          href="/signup"
          class="btn btn-secondary"
        >
          Signups closed
        </a>
      </div>
    </div>

    <div id="about" class="about-section">
      <h2 class="section-title">About</h2>
      <p class="section-text">
        Cam Hack is a 2 day hackathon for the innovative minds at the University
        of Cambridge. Over an action-packed weekend, students come together to
        design and build technology projects from the ground up. We welcome
        participants ranging from curious beginners to seasoned coders. Expect
        plenty of free stash, food, and mini-events throughout this hackathon.
      </p>
      <p class="section-text">
        For the winning team, each person will receive £200 and can choose from
        a range of prizes including: smartwatches, Steam vouchers, Amazon
        vouchers, or Sony XM4 headphones.
      </p>
    </div>

    <div id="schedule" class="schedule-section">
      <h2 class="section-title">Schedule</h2>
      <div class="schedule-grid">
        <div class="schedule-day">
          <h3 class="day-title">Saturday 1st November</h3>
          <ul class="schedule-list">
            <li><strong>09:30</strong> &bull; <em>Breakfast</em></li>
            <li><strong>10:00</strong> &bull; Opening Ceremony</li>
            <li><strong>10:30</strong> &bull; Hacking begins!</li>
            <li><strong>13:00</strong> &bull; <em>Lunch</em></li>
            <li><strong>18:00</strong> &bull; <em>Dinner</em></li>
          </ul>
        </div>
        <div class="schedule-day">
          <h3 class="day-title">Sunday 2nd November</h3>
          <ul class="schedule-list">
            <li><strong>09:30</strong> &bull; <em>Breakfast</em></li>
            <li><strong>13:00</strong> &bull; <em>Lunch</em></li>
            <li><strong>16:30</strong> &bull; Hacking ends!</li>
            <li><strong>17:00</strong> &bull; <em>Dinner</em></li>
            <li><strong>18:00</strong> &bull; Judging ends</li>
            <li><strong>18:30</strong> &bull; Closing ceremony</li>
          </ul>
        </div>
      </div>
    </div>

    <div id="rules" class="rules-section">
      <h2 class="section-title">Rules</h2>
      <div class="rules-content">
        <div class="rule-category">
          <h3 class="category-title">Entry</h3>
          <ul class="rule-list">
            <li>
              The maximum team size is 5. Any bigger, and we might have to
              split you up. Solo participation is allowed, but hacking is
              better with other people!
            </li>
            <li>
              Due to departmental rules, participants must be students at the
              University of Cambridge.
            </li>
          </ul>
        </div>
        <div class="rule-category">
          <h3 class="category-title">House rules</h3>
          <ul class="rule-list">
            <li>
              Please do not bring food into the Intel lab! All food must stay
              downstairs in the street. 🍕
            </li>
            <li>You must not bring or consume alcohol at the hackathon.</li>
            <li>
              We don't recommend it, but you can stay overnight in the lab if
              you want. 😴
            </li>
            <li>
              All participants must follow our
              <a href="/code-of-conduct" class="link">Code of Conduct</a>.
            </li>
          </ul>
        </div>
        <div class="rule-category">
          <h3 class="category-title">Submission</h3>
          <ul class="rule-list">
            <li>
              All work on projects must be done at the hackathon. Using existing
              open source code is allowed if credited, but the project should be
              substantially new.
            </li>
            <li>
              Working on a project and open sourcing it for the sole purpose of
              using the code in the hackathon is against the spirit of the rules
              and is not allowed.
            </li>
            <li>
              AI assistants (Copilot, ChatGPT, etc.) are allowed when writing
              code, but don't go overboard. For example, using AI assistants as
              a tool to help you code is fine, but asking one to generate a
              whole website or the core logic of your application is not
              allowed. Images generated by external (not part of your project)
              AI models must be credited, but such use is discouraged.
            </li>
            <li>
              After hacking finishes, representatives for each track will go
              around to look at each demo. You are free to look at other
              projects, as long as one team member is available to present a
              demo of their project.
            </li>
            <li>
              If you discover a breaking bug during your demo with a trivial
              fix, that's okay to rectify. 🐛
            </li>
            <li>
              Submissions will be made to
              <a
                href="https://cam-hack-2025.devpost.com"
                class="link"
                target="_blank"
                >Devpost</a
              >.
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div id="faq" class="faq-section">
      <h2 class="section-title">FAQ</h2>
      <div class="faq-grid">
        <div class="faq-item">
          <h3 class="faq-question">What is a hackathon?</h3>
          <p class="faq-answer">
            A hackathon is an event where people collaborate to create new
            projects! It usually runs over a weekend and is a great way to learn
            new skills, meet new people, and have fun!
          </p>
        </div>
        <div class="faq-item">
          <h3 class="faq-question">What are the hackathon tracks?</h3>
          <p class="faq-answer">
            All projects submit to a main track, which aligns with the overall
            theme of the event (to be revealed on the day). Participants can
            optionally submit the same project to one or more secondary tracks,
            whose themes extend the main theme in some way. Participants who opt
            into secondary tracks are eligible for both the main track and
            secondary track prizes.
          </p>
        </div>
        <div class="faq-item">
          <h3 class="faq-question">Can I participate remotely?</h3>
          <p class="faq-answer">
            While online participation is not allowed, it's okay to leave the
            venue for some time to hack elsewhere. We hope to see you at the
            Computer Lab!
          </p>
        </div>
        <div class="faq-item">
          <h3 class="faq-question">How much does it cost?</h3>
          <p class="faq-answer">
            Entry is free and includes food, drinks, and of course, stash!
          </p>
        </div>
        <div class="faq-item">
          <h3 class="faq-question">Where is it?</h3>
          <p class="faq-answer">
            Cam Hack 2025 will be in the Computer Laboratory, also known as the
            <a
              href="https://maps.app.goo.gl/185n4bsvv7AXw3FM7"
              class="link"
              target="_blank"
              >William Gates Building</a
            >.
          </p>
        </div>
        <div class="faq-item">
          <h3 class="faq-question">I don't have a team!</h3>
          <p class="faq-answer">
            If you don't have a team yet, don't hesitate to look around in our
            <a target="_blank" class="link" href="/discord">Discord server</a>.
            It's also common to form teams at the event itself!
          </p>
        </div>
        <div class="faq-item">
          <h3 class="faq-question">How do I sign up?</h3>
          <p class="faq-answer">
            Signups are now closed. We look forward to seeing you at the event!
          </p>
        </div>
        <div class="faq-item">
          <h3 class="faq-question">I've never hacked before!</h3>
          <p class="faq-answer">
            That's completely fine! Teams often have hackers with a mix of
            experience, including beginners.
          </p>
        </div>
        <div class="faq-item">
          <h3 class="faq-question">Will there be food?</h3>
          <p class="faq-answer">
            Yes! We will provide meals, as well as lots of snacks throughout
            the event! Please let us know if you have any dietary requirements
            in the sign up form.
          </p>
        </div>
        <div class="faq-item">
          <h3 class="faq-question">Can I submit to multiple tracks?</h3>
          <p class="faq-answer">
            Yes, projects can be submitted to multiple tracks.
          </p>
        </div>
        <div class="faq-item">
          <h3 class="faq-question">What can I win?</h3>
          <p class="faq-answer">
            For the winning team, each person will receive £200 and can choose
            from a range of prizes including: smartwatches, Steam vouchers,
            Amazon vouchers, or Sony XM4 headphones.
          </p>
        </div>
        <div class="faq-item">
          <h3 class="faq-question">You didn't answer my questions!</h3>
          <p class="faq-answer">
            You can ask us anything in our
            <a target="_blank" href="/discord" class="link">Discord server</a>!
            You can also email us at
            <a href="mailto:camhack@cucats.org" class="link"
              >camhack@cucats.org</a
            >, or speak to us in person at the event, where we will be happy to
            answer.
          </p>
        </div>
      </div>
    </div>

    <div class="featured-projects-section">
      <h2 class="section-title">Featured Projects</h2>
      <div class="projects-grid">
        {#each featuredProjects as project, i}
          <div class="project-card" style="animation-delay: {i * 0.1}s">
            <h3 class="project-title">{project.title}</h3>
            <p class="project-description">{project.description}</p>
            <a
              href={project.link}
              target="_blank"
              class="project-link"
            >
              View Project →
            </a>
          </div>
        {/each}
        <div class="project-card featured-image-card">
          <a target="_blank" href="https://cam-hack-2025.devpost.com">
            <img
              src="/unintended.png"
              alt="Unintended Behaviour"
              class="project-image"
            />
          </a>
        </div>
      </div>
    </div>

    <div class="sponsors-section">
      <h2 class="section-title">Sponsored by</h2>
      <div class="sponsors-grid">
        {#each sponsors as sponsor}
          <a href={sponsor.url} target="_blank" class="sponsor-logo">
            <img src={sponsor.logo} alt={sponsor.name} />
          </a>
        {/each}
      </div>
      <div class="organizers-section">
        <h3 class="organizers-title">{organizers.runBy.title}</h3>
        <a href={organizers.runBy.url} target="_blank" class="organizer-logo">
          <img src={organizers.runBy.logo} alt={organizers.runBy.name} />
        </a>
      </div>
    </div>
  </div>
</div>

<style>
  .splash-container {
    position: relative;
    width: 100%;
    min-height: 100vh;
    overflow-x: hidden;
  }

  .three-canvas {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
  }

  .content-overlay {
    position: relative;
    z-index: 1;
    background: linear-gradient(
      180deg,
      rgba(10, 14, 39, 0.95) 0%,
      rgba(10, 14, 39, 0.98) 20%,
      rgba(10, 14, 39, 0.99) 100%
    );
  }

  .hero-section {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 4rem 2rem;
    padding-top: 8rem;
    text-align: center;
    animation: fadeInUp 1s ease-out;
  }

  .logo-container {
    margin-bottom: 2rem;
    animation: float 3s ease-in-out infinite;
  }

  .logo {
    height: 200px;
    width: auto;
    filter: drop-shadow(0 0 20px rgba(16, 185, 129, 0.5));
  }

  .main-title {
    font-size: 5rem;
    font-weight: 700;
    background: linear-gradient(135deg, #10b981 0%, #34d399 50%, #6ee7b7 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin-bottom: 1rem;
    text-shadow: 0 0 30px rgba(16, 185, 129, 0.3);
    animation: glow 2s ease-in-out infinite alternate;
  }

  .subtitle {
    font-size: 2rem;
    color: #6ee7b7;
    margin-bottom: 3rem;
    font-weight: 400;
  }

  .countdown-container {
    margin: 3rem 0;
    padding: 2rem 4rem;
    background: rgba(16, 185, 129, 0.1);
    border: 2px solid rgba(16, 185, 129, 0.3);
    border-radius: 20px;
    backdrop-filter: blur(10px);
    animation: pulse 2s ease-in-out infinite;
  }

  .countdown-label {
    font-size: 1rem;
    color: #6ee7b7;
    margin-bottom: 0.5rem;
    text-transform: uppercase;
    letter-spacing: 2px;
  }

  .countdown-number {
    font-size: 4rem;
    font-weight: 700;
    color: #10b981;
    text-shadow: 0 0 20px rgba(16, 185, 129, 0.5);
  }

  .tagline {
    font-size: 1.5rem;
    color: #d1fae5;
    margin: 2rem 0;
  }

  .cta-buttons {
    display: flex;
    gap: 1.5rem;
    margin-top: 2rem;
    flex-wrap: wrap;
    justify-content: center;
  }

  .btn {
    padding: 1rem 2.5rem;
    border-radius: 12px;
    font-size: 1.1rem;
    font-weight: 600;
    text-decoration: none;
    transition: all 0.3s ease;
    cursor: pointer;
    display: inline-block;
  }

  .btn-primary {
    background: linear-gradient(135deg, #10b981 0%, #34d399 100%);
    color: #0a0e27;
    box-shadow: 0 4px 15px rgba(16, 185, 129, 0.4);
  }

  .btn-primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(16, 185, 129, 0.6);
  }

  .btn-secondary {
    background: rgba(107, 114, 128, 0.3);
    color: #9ca3af;
    border: 1px solid rgba(107, 114, 128, 0.5);
    cursor: not-allowed;
  }

  .about-section,
  .schedule-section,
  .rules-section,
  .faq-section,
  .featured-projects-section,
  .sponsors-section {
    padding: 6rem 2rem;
    max-width: 1200px;
    margin: 0 auto;
    opacity: 0;
    transform: translateY(50px);
    transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .about-section.visible,
  .schedule-section.visible,
  .rules-section.visible,
  .faq-section.visible,
  .featured-projects-section.visible,
  .sponsors-section.visible {
    opacity: 1;
    transform: translateY(0);
  }

  .section-title {
    font-size: 3rem;
    font-weight: 700;
    background: linear-gradient(135deg, #10b981 0%, #6ee7b7 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin-bottom: 3rem;
    text-align: center;
  }

  .section-text {
    font-size: 1.2rem;
    line-height: 1.8;
    color: #d1fae5;
    margin-bottom: 1.5rem;
  }

  .schedule-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 3rem;
    margin-top: 2rem;
  }

  .schedule-day {
    background: rgba(16, 185, 129, 0.05);
    border: 1px solid rgba(16, 185, 129, 0.2);
    border-radius: 16px;
    padding: 2rem;
    transition: all 0.3s ease;
  }

  .schedule-day:hover {
    background: rgba(16, 185, 129, 0.1);
    border-color: rgba(16, 185, 129, 0.4);
    transform: translateY(-5px);
  }

  .day-title {
    font-size: 1.5rem;
    color: #34d399;
    margin-bottom: 1.5rem;
  }

  .schedule-list {
    list-style: none;
    padding: 0;
  }

  .schedule-list li {
    color: #d1fae5;
    margin-bottom: 1rem;
    padding-left: 1rem;
    position: relative;
  }

  .schedule-list li::before {
    content: "▸";
    position: absolute;
    left: 0;
    color: #10b981;
  }

  .rules-content {
    display: grid;
    gap: 3rem;
  }

  .rule-category {
    background: rgba(16, 185, 129, 0.05);
    border-left: 4px solid #10b981;
    border-radius: 12px;
    padding: 2rem;
  }

  .category-title {
    font-size: 1.8rem;
    color: #34d399;
    margin-bottom: 1.5rem;
  }

  .rule-list {
    list-style: none;
    padding: 0;
  }

  .rule-list li {
    color: #d1fae5;
    margin-bottom: 1rem;
    padding-left: 1.5rem;
    position: relative;
    line-height: 1.6;
  }

  .rule-list li::before {
    content: "•";
    position: absolute;
    left: 0;
    color: #10b981;
    font-size: 1.5rem;
  }

  .link {
    color: #34d399;
    text-decoration: underline;
    transition: color 0.3s ease;
  }

  .link:hover {
    color: #6ee7b7;
  }

  .faq-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
    margin-top: 2rem;
  }

  .faq-item {
    background: rgba(16, 185, 129, 0.05);
    border: 1px solid rgba(16, 185, 129, 0.2);
    border-radius: 12px;
    padding: 1.5rem;
    transition: all 0.3s ease;
  }

  .faq-item:hover {
    background: rgba(16, 185, 129, 0.1);
    border-color: rgba(16, 185, 129, 0.4);
    transform: translateY(-3px);
  }

  .faq-question {
    font-size: 1.3rem;
    color: #34d399;
    margin-bottom: 1rem;
  }

  .faq-answer {
    color: #d1fae5;
    line-height: 1.6;
  }

  .featured-projects-section {
    padding: 6rem 2rem;
    max-width: 1200px;
    margin: 0 auto;
  }

  .projects-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
    margin-top: 3rem;
  }

  .project-card {
    background: rgba(16, 185, 129, 0.05);
    border: 1px solid rgba(16, 185, 129, 0.2);
    border-radius: 16px;
    padding: 2rem;
    transition: all 0.4s ease;
    animation: slideInUp 0.6s ease-out backwards;
  }

  .project-card:hover {
    background: rgba(16, 185, 129, 0.15);
    border-color: rgba(16, 185, 129, 0.5);
    transform: translateY(-10px) scale(1.02);
    box-shadow: 0 10px 30px rgba(16, 185, 129, 0.3);
  }

  .project-title {
    font-size: 1.8rem;
    color: #34d399;
    margin-bottom: 1rem;
  }

  .project-description {
    color: #d1fae5;
    line-height: 1.6;
    margin-bottom: 1.5rem;
  }

  .project-link {
    color: #10b981;
    text-decoration: none;
    font-weight: 600;
    transition: color 0.3s ease;
  }

  .project-link:hover {
    color: #6ee7b7;
  }

  .featured-image-card {
    grid-column: span 2;
    padding: 0;
    overflow: hidden;
  }

  .project-image {
    width: 100%;
    height: auto;
    display: block;
    transition: transform 0.4s ease;
  }

  .featured-image-card:hover .project-image {
    transform: scale(1.05);
  }

  .sponsors-section {
    padding: 6rem 2rem;
    max-width: 1200px;
    margin: 0 auto;
  }

  .sponsors-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 2rem;
    margin-top: 3rem;
    align-items: center;
  }

  .sponsor-logo {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1.5rem;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 12px;
    transition: all 0.3s ease;
  }

  .sponsor-logo:hover {
    background: rgba(255, 255, 255, 0.1);
    transform: translateY(-5px);
  }

  .sponsor-logo img {
    max-width: 100%;
    max-height: 80px;
    filter: brightness(0) invert(1) opacity(0.8);
    transition: filter 0.3s ease;
  }

  .sponsor-logo:hover img {
    filter: brightness(0) invert(1) opacity(1);
  }

  .organizers-section {
    margin-top: 4rem;
    text-align: center;
  }

  .organizers-title {
    font-size: 1.5rem;
    color: #6ee7b7;
    margin-bottom: 1.5rem;
  }

  .organizer-logo {
    display: inline-block;
    padding: 1.5rem;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 12px;
    transition: all 0.3s ease;
  }

  .organizer-logo:hover {
    background: rgba(255, 255, 255, 0.1);
    transform: scale(1.05);
  }

  .organizer-logo img {
    max-height: 100px;
    filter: brightness(0) invert(1) opacity(0.9);
  }

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes float {
    0%,
    100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-20px);
    }
  }

  @keyframes glow {
    from {
      filter: drop-shadow(0 0 20px rgba(16, 185, 129, 0.3));
    }
    to {
      filter: drop-shadow(0 0 30px rgba(16, 185, 129, 0.6));
    }
  }

  @keyframes pulse {
    0%,
    100% {
      border-color: rgba(16, 185, 129, 0.3);
      box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.4);
    }
    50% {
      border-color: rgba(16, 185, 129, 0.6);
      box-shadow: 0 0 0 10px rgba(16, 185, 129, 0);
    }
  }

  @keyframes slideInUp {
    from {
      opacity: 0;
      transform: translateY(50px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media (max-width: 768px) {
    .main-title {
      font-size: 3rem;
    }

    .subtitle {
      font-size: 1.5rem;
    }

    .countdown-number {
      font-size: 3rem;
    }

    .schedule-grid,
    .faq-grid,
    .projects-grid {
      grid-template-columns: 1fr;
    }

    .featured-image-card {
      grid-column: span 1;
    }

    .sponsors-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }
</style>