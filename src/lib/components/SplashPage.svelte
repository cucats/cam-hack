<script>
  import { onMount } from "svelte";
  import * as THREE from "three";
  import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
  import { sponsors, organizers } from "./sponsors-data.js";

  let canvasContainer;
  let scene, camera, renderer, controls;
  let particles, particleSystem;
  let torus, torusGroup;
  let mouseX = 0;
  let mouseY = 0;
  let scrollY = 0;
  let daysSince = 0;
  let visibleSections = new Set();

  const eventDate = new Date("2025-11-01T00:00:00");
  const now = new Date();
  daysSince = Math.floor((now - eventDate) / (1000 * 60 * 60 * 24));

  const featuredProjects = [
    {
      title: "Lorem Ipsum Project Alpha",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.",
      tech: ["React", "Node.js", "MongoDB"]
    },
    {
      title: "Lorem Ipsum Project Beta",
      description: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo.",
      tech: ["Python", "TensorFlow", "Flask"]
    },
    {
      title: "Lorem Ipsum Project Gamma",
      description: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
      tech: ["Svelte", "Three.js", "WebGL"]
    },
    {
      title: "Lorem Ipsum Project Delta",
      description: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      tech: ["Rust", "WebAssembly", "Wasm"]
    }
  ];

  onMount(() => {
    initThreeJS();
    animate();
    setupEventListeners();

    return () => {
      if (renderer) {
        renderer.dispose();
      }
      if (controls) {
        controls.dispose();
      }
    };
  });

  function initThreeJS() {
    scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x86e293, 50, 200);

    camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 30;
    camera.position.y = 5;

    renderer = new THREE.WebGLRenderer({
      canvas: canvasContainer,
      alpha: true,
      antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enableZoom = false;
    controls.enablePan = false;

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0x86e6c6, 1);
    directionalLight.position.set(10, 10, 5);
    scene.add(directionalLight);

    const pointLight = new THREE.PointLight(0x86e293, 1, 100);
    pointLight.position.set(-10, -10, -10);
    scene.add(pointLight);

    const particleGeometry = new THREE.BufferGeometry();
    const particleCount = 3000;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 200;
      positions[i + 1] = (Math.random() - 0.5) * 200;
      positions[i + 2] = (Math.random() - 0.5) * 200;

      const color = Math.random() > 0.5 ? 0x86e293 : 0x86e6c6;
      colors[i] = ((color >> 16) & 255) / 255;
      colors[i + 1] = ((color >> 8) & 255) / 255;
      colors[i + 2] = (color & 255) / 255;
    }

    particleGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3)
    );
    particleGeometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.8,
      transparent: true,
      opacity: 0.7,
      vertexColors: true,
      blending: THREE.AdditiveBlending
    });

    particleSystem = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particleSystem);

    const torusGeometry = new THREE.TorusGeometry(8, 2, 16, 100);
    const torusMaterial = new THREE.MeshStandardMaterial({
      color: 0x86e6c6,
      metalness: 0.7,
      roughness: 0.3,
      transparent: true,
      opacity: 0.8
    });

    torusGroup = new THREE.Group();

    for (let i = 0; i < 7; i++) {
      torus = new THREE.Mesh(torusGeometry, torusMaterial.clone());
      torus.rotation.x = Math.random() * Math.PI;
      torus.rotation.y = Math.random() * Math.PI;
      torus.position.x = (Math.random() - 0.5) * 25;
      torus.position.y = (Math.random() - 0.5) * 25;
      torus.position.z = (Math.random() - 0.5) * 25;
      torusGroup.add(torus);
    }

    scene.add(torusGroup);

    const sphereGeometry = new THREE.SphereGeometry(3, 32, 32);
    const sphereMaterial = new THREE.MeshStandardMaterial({
      color: 0x86e293,
      metalness: 0.8,
      roughness: 0.2,
      emissive: 0x86e293,
      emissiveIntensity: 0.4
    });

    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    sphere.position.set(0, 0, 0);
    scene.add(sphere);

    const ringGeometry = new THREE.RingGeometry(10, 12, 64);
    const ringMaterial = new THREE.MeshBasicMaterial({
      color: 0x86e293,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.3
    });
    const ring = new THREE.Mesh(ringGeometry, ringMaterial);
    ring.rotation.x = -Math.PI / 2;
    scene.add(ring);
  }

  function animate() {
    requestAnimationFrame(animate);

    const time = Date.now() * 0.001;

    if (particleSystem) {
      particleSystem.rotation.y += 0.0005;
      particleSystem.rotation.x += 0.0003;

      const positions = particleSystem.geometry.attributes.position.array;
      for (let i = 1; i < positions.length; i += 3) {
        positions[i] += Math.sin(time + i * 0.01) * 0.015;
        positions[i + 2] += Math.cos(time + i * 0.01) * 0.01;
      }
      particleSystem.geometry.attributes.position.needsUpdate = true;
    }

    if (torusGroup) {
      torusGroup.rotation.x += 0.005;
      torusGroup.rotation.y += 0.007;
      torusGroup.children.forEach((torus, index) => {
        torus.rotation.x += 0.01 * (index + 1);
        torus.rotation.z += 0.008 * (index + 1);
        torus.position.y += Math.sin(time + index) * 0.03;
        torus.position.x += Math.cos(time * 0.5 + index) * 0.02;
      });
    }

    if (camera) {
      const scrollFactor = Math.min(scrollY / 500, 1);
      camera.position.x += (mouseX * 0.8 - camera.position.x) * 0.05;
      camera.position.y += (-mouseY * 0.8 + 5 - scrollFactor * 10 - camera.position.y) * 0.05;
      camera.position.z = 30 + scrollFactor * 20;
      camera.lookAt(0, 0, 0);
    }

    if (controls) {
      controls.update();
    }

    if (renderer && scene && camera) {
      renderer.render(scene, camera);
    }
  }

  function setupEventListeners() {
    const handleMouseMove = (event) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseY = (event.clientY / window.innerHeight) * 2 - 1;
    };

    const handleResize = () => {
      if (camera && renderer) {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      }
    };

    const handleScroll = () => {
      scrollY = window.scrollY;
      const sections = document.querySelectorAll(".content-section section");
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.8 && rect.bottom > 0) {
          section.classList.add("visible");
        }
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };
  }
</script>

<div class="splash-container">
  <canvas bind:this={canvasContainer} class="three-canvas"></canvas>

  <div class="hero-section">
    <div class="hero-content">
      <div class="logo-container">
        <img
          src="/cam-hack-logo-text.png"
          alt="Cam Hack Logo"
          class="logo"
        />
      </div>
      <h1 class="hero-title">Cam Hack 2025</h1>
      <h2 class="hero-subtitle">1st – 2nd November</h2>
      <div class="countdown-container">
        <div class="countdown-label">Days Since Event</div>
        <div class="countdown-number">{daysSince}</div>
      </div>
      <p class="hero-tagline">What can you make in 2 days?</p>
      <div class="hero-buttons">
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
  </div>

  <div class="content-section">
    <section id="about" class="about-section">
      <div class="section-content">
        <h2 class="section-title">About</h2>
        <p class="section-text">
          Cam Hack is a 2 day hackathon for the innovative minds at the University of
          Cambridge. Over an action-packed weekend, students come together to design
          and build technology projects from the ground up. We welcome participants
          ranging from curious beginners to seasoned coders. Expect plenty of free
          stash, food, and mini-events throughout this hackathon.
        </p>
        <p class="section-text">
          For the winning team, each person will receive £200 and can choose from a
          range of prizes including: smartwatches, Steam vouchers, Amazon vouchers, or
          Sony XM4 headphones.
        </p>
      </div>
    </section>

    <section class="projects-section">
      <div class="section-content">
        <h2 class="section-title">Featured Projects</h2>
        <div class="projects-grid">
          {#each featuredProjects as project, i}
            <div class="project-card" style="animation-delay: {i * 0.1}s">
              <div class="project-header">
                <h3 class="project-title">{project.title}</h3>
              </div>
              <p class="project-description">{project.description}</p>
              <div class="project-tech">
                {#each project.tech as tech}
                  <span class="tech-tag">{tech}</span>
                {/each}
              </div>
            </div>
          {/each}
        </div>
      </div>
    </section>

    <section id="schedule" class="schedule-section">
      <div class="section-content">
        <h2 class="section-title">Schedule</h2>
        <div class="schedule-grid">
          <div class="schedule-day">
            <h3 class="schedule-day-title">Saturday 1st November</h3>
            <ul class="schedule-list">
              <li><strong>09:30</strong> &bull; <em>Breakfast</em></li>
              <li><strong>10:00</strong> &bull; Opening Ceremony</li>
              <li><strong>10:30</strong> &bull; Hacking begins!</li>
              <li><strong>13:00</strong> &bull; <em>Lunch</em></li>
              <li><strong>18:00</strong> &bull; <em>Dinner</em></li>
            </ul>
          </div>
          <div class="schedule-day">
            <h3 class="schedule-day-title">Sunday 2nd November</h3>
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
    </section>

    <section id="rules" class="rules-section">
      <div class="section-content">
        <h2 class="section-title">Rules</h2>
        <div class="rules-content">
          <h3 class="rules-subtitle">Entry</h3>
          <ul class="rules-list">
            <li>
              The maximum team size is 5. Any bigger, and we might have to split you up.
              Solo participation is allowed, but hacking is better with other people!
            </li>
            <li>
              Due to departmental rules, participants must be students at the University
              of Cambridge.
            </li>
          </ul>
          <h3 class="rules-subtitle">House rules</h3>
          <ul class="rules-list">
            <li>
              Please do not bring food into the Intel lab! All food must stay downstairs
              in the street. 🍕
            </li>
            <li>You must not bring or consume alcohol at the hackathon.</li>
            <li>
              We don't recommend it, but you can stay overnight in the lab if you want.
              😴
            </li>
            <li>
              All participants must follow our <a
                href="/code-of-conduct"
                class="theme-link">Code of Conduct</a
              >.
            </li>
          </ul>
          <h3 class="rules-subtitle">Submission</h3>
          <ul class="rules-list">
            <li>
              All work on projects must be done at the hackathon. Using existing open
              source code is allowed if credited, but the project should be
              substantially new.
            </li>
            <li>
              Working on a project and open sourcing it for the sole purpose of using
              the code in the hackathon is against the spirit of the rules and is not
              allowed.
            </li>
            <li>
              AI assistants (Copilot, ChatGPT, etc.) are allowed when writing code, but
              don't go overboard. For example, using AI assistants as a tool to help you
              code is fine, but asking one to generate a whole website or the core logic
              of your application is not allowed. Images generated by external (not part
              of your project) AI models must be credited, but such use is discouraged.
            </li>
            <li>
              After hacking finishes, representatives for each track will go around to
              look at each demo. You are free to look at other projects, as long as one
              team member is available to present a demo of their project.
            </li>
            <li>
              If you discover a breaking bug during your demo with a trivial fix, that's
              okay to rectify. 🐛
            </li>
            <li>
              Submissions will be made to <a
                href="https://cam-hack-2025.devpost.com"
                class="theme-link">Devpost</a
              >.
            </li>
          </ul>
        </div>
      </div>
    </section>

    <section id="faq" class="faq-section">
      <div class="section-content">
        <h2 class="section-title">FAQ</h2>
        <div class="faq-content">
          <div class="faq-item">
            <h3 class="faq-question">What is a hackathon?</h3>
            <p class="faq-answer">
              A hackathon is an event where people collaborate to create new projects! It usually
              runs over a weekend and is a great way to learn new skills, meet new people,
              and have fun!
            </p>
          </div>
          <div class="faq-item">
            <h3 class="faq-question">What are the hackathon tracks?</h3>
            <p class="faq-answer">
              All projects submit to a main track, which aligns with the overall theme of the
              event (to be revealed on the day). Participants can optionally submit the same
              project to one or more secondary tracks, whose themes extend the main theme in
              some way. Participants who opt into secondary tracks are eligible for both the
              main track and secondary track prizes.
            </p>
          </div>
          <div class="faq-item">
            <h3 class="faq-question">Can I participate remotely?</h3>
            <p class="faq-answer">
              While online participation is not allowed, it's okay to leave the venue for some
              time to hack elsewhere. We hope to see you at the Computer Lab!
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
              <a href="https://maps.app.goo.gl/185n4bsvv7AXw3FM7" class="theme-link"
                >William Gates Building</a
              >.
            </p>
          </div>
          <div class="faq-item">
            <h3 class="faq-question">I don't have a team!</h3>
            <p class="faq-answer">
              If you don't have a team yet, don't hesitate to look around in our
              <a target="_blank" class="theme-link" href="/discord">Discord server</a
              >. It's also common to form teams at the event itself!
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
              That's completely fine! Teams often have hackers with a mix of experience, including
              beginners.
            </p>
          </div>
          <div class="faq-item">
            <h3 class="faq-question">Will there be food?</h3>
            <p class="faq-answer">
              Yes! We will provide meals, as well as lots of snacks throughout the event! Please
              let us know if you have any dietary requirements in the sign up form.
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
              For the winning team, each person will receive £200 and can choose from a range
              of prizes including: smartwatches, Steam vouchers, Amazon vouchers, or Sony XM4
              headphones.
            </p>
          </div>
          <div class="faq-item">
            <h3 class="faq-question">You didn't answer my questions!</h3>
            <p class="faq-answer">
              You can ask us anything in our
              <a target="_blank" href="/discord" class="theme-link">Discord server</a
              >! You can also email us at
              <a href="mailto:camhack@cucats.org" class="theme-link"
                >camhack@cucats.org</a
              >, or speak to us in person at the event, where we will be happy to answer.
            </p>
          </div>
        </div>
      </div>
    </section>

    <section class="organisers-section">
      <div class="section-content">
        <h2 class="section-title">Organising Committee</h2>
        <div class="organisers-grid">
          <div class="organiser-card">
            <img
              class="organiser-image"
              src="/james.png"
              alt="James Leung"
            />
            <p class="organiser-name">James Leung</p>
          </div>
          <div class="organiser-card">
            <img
              class="organiser-image"
              src="/uliana.jpg"
              alt="Uliana Ronska"
            />
            <p class="organiser-name">Uliana Ronska</p>
          </div>
          <div class="organiser-card">
            <img
              class="organiser-image"
              src="/athena.jpg"
              alt="Athena Eng"
            />
            <p class="organiser-name">Athena Eng</p>
          </div>
          <div class="organiser-card">
            <img
              class="organiser-image"
              src="/oliver.png"
              alt="Oliver Greenwood"
            />
            <p class="organiser-name">Oliver Greenwood</p>
          </div>
          <div class="organiser-card">
            <img
              class="organiser-image"
              src="/jadon.png"
              alt="Jadon Mensah"
            />
            <p class="organiser-name">Jadon Mensah</p>
          </div>
        </div>
      </div>
    </section>

    <section class="sponsors-section">
      <div class="section-content">
        <h2 class="section-title">Sponsored by</h2>
        <div class="sponsors-grid">
          {#each sponsors as sponsor}
            <a
              class="sponsor-link"
              target="_blank"
              href={sponsor.url}
            >
              <img
                class="sponsor-logo {sponsor.className}"
                src={sponsor.logo}
                alt={sponsor.name}
              />
            </a>
          {/each}
        </div>
        <div class="organizer-section">
          <h3 class="organizer-title">{organizers.runBy.title}</h3>
          <a target="_blank" href={organizers.runBy.url} class="organizer-link">
            <img
              class="organizer-logo {organizers.runBy.className}"
              src={organizers.runBy.logo}
              alt={organizers.runBy.name}
            />
          </a>
        </div>
      </div>
    </section>
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
    pointer-events: none;
  }

  .hero-section {
    position: relative;
    z-index: 1;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem;
    background: linear-gradient(
      180deg,
      rgba(134, 226, 147, 0.1) 0%,
      rgba(134, 230, 198, 0.05) 100%
    );
  }

  .hero-content {
    text-align: center;
    max-width: 800px;
    animation: fadeInUp 1s ease-out;
  }

  .logo-container {
    margin-bottom: 2rem;
    animation: float 3s ease-in-out infinite;
  }

  .logo {
    width: 200px;
    height: auto;
    filter: drop-shadow(0 10px 30px rgba(134, 226, 147, 0.3));
  }

  .hero-title {
    font-size: 4rem;
    font-weight: 700;
    color: #1a1a1a;
    margin-bottom: 1rem;
    text-shadow: 0 4px 20px rgba(134, 226, 147, 0.3);
    animation: glow 2s ease-in-out infinite alternate;
  }

  .hero-subtitle {
    font-size: 2rem;
    color: #4a5568;
    margin-bottom: 2rem;
    font-weight: 400;
  }

  .countdown-container {
    margin: 3rem 0;
    padding: 2rem;
    background: rgba(134, 226, 147, 0.1);
    border-radius: 20px;
    backdrop-filter: blur(10px);
    border: 2px solid rgba(134, 226, 147, 0.3);
    animation: pulse 2s ease-in-out infinite;
  }

  .countdown-label {
    font-size: 1rem;
    color: #4a5568;
    margin-bottom: 0.5rem;
    text-transform: uppercase;
    letter-spacing: 2px;
  }

  .countdown-number {
    font-size: 4rem;
    font-weight: 700;
    color: #86e293;
    text-shadow: 0 0 20px rgba(134, 226, 147, 0.5);
  }

  .hero-tagline {
    font-size: 1.5rem;
    color: #4a5568;
    margin: 2rem 0;
  }

  .hero-buttons {
    display: flex;
    gap: 1rem;
    justify-content: center;
    flex-wrap: wrap;
    margin-top: 2rem;
  }

  .btn {
    padding: 1rem 2rem;
    border-radius: 12px;
    font-size: 1.1rem;
    font-weight: 600;
    text-decoration: none;
    transition: all 0.3s ease;
    cursor: pointer;
    display: inline-block;
  }

  .btn-primary {
    background: linear-gradient(135deg, #86e293 0%, #86e6c6 100%);
    color: #1a1a1a;
    box-shadow: 0 4px 15px rgba(134, 226, 147, 0.4);
  }

  .btn-primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(134, 226, 147, 0.6);
  }

  .btn-secondary {
    background: rgba(156, 163, 175, 0.3);
    color: #4a5568;
    cursor: not-allowed;
  }

  .content-section {
    position: relative;
    z-index: 1;
    background: #ffffff;
  }

  section {
    padding: 5rem 2rem;
    position: relative;
    opacity: 0;
    transform: translateY(50px);
    transition: all 0.8s ease-out;
  }

  section.visible {
    opacity: 1;
    transform: translateY(0);
  }

  .section-content {
    max-width: 1200px;
    margin: 0 auto;
  }

  .section-title {
    font-size: 3rem;
    font-weight: 700;
    color: #1a1a1a;
    margin-bottom: 2rem;
    text-align: center;
    position: relative;
  }

  .section-title::after {
    content: "";
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 100px;
    height: 4px;
    background: linear-gradient(90deg, #86e293 0%, #86e6c6 100%);
    border-radius: 2px;
  }

  .section-text {
    font-size: 1.2rem;
    line-height: 1.8;
    color: #4a5568;
    margin-bottom: 1.5rem;
  }

  .about-section {
    background: linear-gradient(
      180deg,
      rgba(134, 226, 147, 0.05) 0%,
      rgba(255, 255, 255, 1) 100%
    );
  }

  .projects-section {
    background: #fafafa;
  }

  .projects-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 2rem;
    margin-top: 3rem;
  }

  .project-card {
    background: #ffffff;
    border-radius: 16px;
    padding: 2rem;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
    animation: slideInUp 0.6s ease-out backwards;
    border: 2px solid transparent;
  }

  .project-card:hover {
    transform: translateY(-10px);
    box-shadow: 0 8px 30px rgba(134, 226, 147, 0.3);
    border-color: #86e293;
  }

  .project-title {
    font-size: 1.5rem;
    font-weight: 700;
    color: #1a1a1a;
    margin-bottom: 1rem;
  }

  .project-description {
    font-size: 1rem;
    line-height: 1.6;
    color: #4a5568;
    margin-bottom: 1.5rem;
  }

  .project-tech {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .tech-tag {
    padding: 0.4rem 0.8rem;
    background: linear-gradient(135deg, #86e293 0%, #86e6c6 100%);
    color: #1a1a1a;
    border-radius: 8px;
    font-size: 0.85rem;
    font-weight: 600;
  }

  .schedule-section {
    background: linear-gradient(
      180deg,
      rgba(255, 255, 255, 1) 0%,
      rgba(134, 230, 198, 0.05) 100%
    );
  }

  .schedule-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 3rem;
    margin-top: 3rem;
  }

  .schedule-day {
    background: #ffffff;
    border-radius: 16px;
    padding: 2rem;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    border-left: 4px solid #86e293;
  }

  .schedule-day-title {
    font-size: 1.5rem;
    font-weight: 700;
    color: #1a1a1a;
    margin-bottom: 1.5rem;
  }

  .schedule-list {
    list-style: none;
    padding: 0;
  }

  .schedule-list li {
    padding: 0.75rem 0;
    border-bottom: 1px solid rgba(134, 226, 147, 0.2);
    font-size: 1.1rem;
    color: #4a5568;
  }

  .schedule-list li:last-child {
    border-bottom: none;
  }

  .sponsors-section {
    background: #fafafa;
  }

  .sponsors-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 2rem;
    margin: 3rem 0;
    place-items: center;
  }

  .sponsor-link {
    display: inline-block;
    padding: 1.5rem;
    background: #ffffff;
    border-radius: 12px;
    transition: all 0.3s ease;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 120px;
  }

  .sponsor-link:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 20px rgba(134, 226, 147, 0.3);
  }

  .sponsor-logo {
    max-width: 100%;
    height: auto;
    filter: grayscale(100%);
    transition: filter 0.3s ease;
  }

  .sponsor-link:hover .sponsor-logo {
    filter: grayscale(0%);
  }

  .organizer-section {
    text-align: center;
    margin-top: 4rem;
    padding: 2rem;
  }

  .organizer-title {
    font-size: 1.5rem;
    font-weight: 700;
    color: #1a1a1a;
    margin-bottom: 1.5rem;
  }

  .organizer-link {
    display: inline-block;
    transition: transform 0.3s ease;
  }

  .organizer-link:hover {
    transform: scale(1.05);
  }

  .organizer-logo {
    max-width: 200px;
    height: auto;
  }

  .rules-section {
    background: #ffffff;
  }

  .rules-content {
    max-width: 800px;
    margin: 0 auto;
  }

  .rules-subtitle {
    font-size: 1.8rem;
    font-weight: 700;
    color: #1a1a1a;
    margin-top: 2rem;
    margin-bottom: 1rem;
  }

  .rules-list {
    list-style: disc;
    padding-left: 2rem;
    margin-bottom: 1.5rem;
  }

  .rules-list li {
    font-size: 1.1rem;
    line-height: 1.8;
    color: #4a5568;
    margin-bottom: 0.75rem;
  }

  .theme-link {
    color: #86e293;
    text-decoration: none;
    font-weight: 600;
    transition: color 0.3s ease;
  }

  .theme-link:hover {
    color: #86e6c6;
  }

  .faq-section {
    background: #fafafa;
  }

  .faq-content {
    max-width: 900px;
    margin: 0 auto;
  }

  .faq-item {
    background: #ffffff;
    border-radius: 12px;
    padding: 1.5rem;
    margin-bottom: 1rem;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
    transition: all 0.3s ease;
    border-left: 4px solid transparent;
  }

  .faq-item:hover {
    border-left-color: #86e293;
    box-shadow: 0 4px 15px rgba(134, 226, 147, 0.2);
    transform: translateX(5px);
  }

  .faq-question {
    font-size: 1.3rem;
    font-weight: 700;
    color: #1a1a1a;
    margin-bottom: 0.75rem;
  }

  .faq-answer {
    font-size: 1.05rem;
    line-height: 1.7;
    color: #4a5568;
  }

  .organisers-section {
    background: linear-gradient(
      180deg,
      rgba(255, 255, 255, 1) 0%,
      rgba(134, 230, 198, 0.05) 100%
    );
  }

  .organisers-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 2rem;
    margin-top: 3rem;
    max-width: 1000px;
    margin-left: auto;
    margin-right: auto;
  }

  .organiser-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    background: #ffffff;
    border-radius: 16px;
    padding: 1.5rem;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
  }

  .organiser-card:hover {
    transform: translateY(-10px);
    box-shadow: 0 8px 25px rgba(134, 226, 147, 0.3);
  }

  .organiser-image {
    width: 128px;
    height: 128px;
    border-radius: 50%;
    object-fit: cover;
    margin-bottom: 1rem;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  }

  .organiser-name {
    text-align: center;
    font-size: 1rem;
    color: #1a1a1a;
    font-weight: 600;
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
      text-shadow: 0 4px 20px rgba(134, 226, 147, 0.3);
    }
    to {
      text-shadow: 0 4px 30px rgba(134, 226, 147, 0.6),
        0 0 40px rgba(134, 226, 147, 0.3);
    }
  }

  @keyframes pulse {
    0%,
    100% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.02);
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
    .hero-title {
      font-size: 2.5rem;
    }

    .hero-subtitle {
      font-size: 1.5rem;
    }

    .countdown-number {
      font-size: 3rem;
    }

    .section-title {
      font-size: 2rem;
    }

    .projects-grid {
      grid-template-columns: 1fr;
    }

    .schedule-grid {
      grid-template-columns: 1fr;
    }
  }
</style>