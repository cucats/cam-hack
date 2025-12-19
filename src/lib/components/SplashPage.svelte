<script>
  import { onMount } from "svelte";
  import * as THREE from "three";
  import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

  let canvasContainer;
  let scene, camera, renderer, controls;
  let particles = [];
  let torusKnots = [];
  let mouseX = 0;
  let mouseY = 0;
  let animationId;
  let scrollY = 0;
  let particleCount = 1000;

  const eventDate = new Date("2025-11-01T00:00:00");
  let daysSince = $state(0);

  function calculateDaysSince() {
    const now = new Date();
    const diff = now - eventDate;
    daysSince = Math.floor(diff / (1000 * 60 * 60 * 24));
  }

  function handleScroll() {
    scrollY = window.scrollY;
    if (camera) {
      camera.position.z = 5 + scrollY * 0.01;
    }
  }

  onMount(() => {
    calculateDaysSince();
    setInterval(calculateDaysSince, 86400000);

    const width = canvasContainer.clientWidth;
    const height = canvasContainer.clientHeight;

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0a0a);

    camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 5;

    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    canvasContainer.appendChild(renderer.domElement);

    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enableZoom = false;

    const ambientLight = new THREE.AmbientLight(0x86e293, 0.3);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0x86e293, 1, 100);
    pointLight1.position.set(5, 5, 5);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x86e6c6, 1, 100);
    pointLight2.position.set(-5, -5, 5);
    scene.add(pointLight2);

    const geometry = new THREE.TorusKnotGeometry(0.3, 0.1, 100, 16);
    for (let i = 0; i < 8; i++) {
      const material = new THREE.MeshStandardMaterial({
        color: i % 2 === 0 ? 0x86e293 : 0x86e6c6,
        metalness: 0.7,
        roughness: 0.3,
        emissive: i % 2 === 0 ? 0x86e293 : 0x86e6c6,
        emissiveIntensity: 0.2,
      });
      const torusKnot = new THREE.Mesh(geometry, material);
      torusKnot.position.x = (Math.random() - 0.5) * 4;
      torusKnot.position.y = (Math.random() - 0.5) * 4;
      torusKnot.position.z = (Math.random() - 0.5) * 4;
      torusKnot.rotation.x = Math.random() * Math.PI;
      torusKnot.rotation.y = Math.random() * Math.PI;
      torusKnots.push(torusKnot);
      scene.add(torusKnot);
    }

    const particleGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 10;
    }

    particleGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    const particleMaterial = new THREE.PointsMaterial({
      color: 0x86e293,
      size: 0.05,
      transparent: true,
      opacity: 0.6,
    });

    const particleSystem = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particleSystem);
    particles.push(particleSystem);

    function handleMouseMove(event) {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    }

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll, { passive: true });

    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -100px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-in");
        }
      });
    }, observerOptions);

    setTimeout(() => {
      document.querySelectorAll(".project-card, .schedule-day, .about-text, .faq-item").forEach((el) => {
        observer.observe(el);
      });
    }, 100);

    function animate() {
      animationId = requestAnimationFrame(animate);

      const time = Date.now() * 0.001;

      torusKnots.forEach((knot, index) => {
        knot.rotation.x += 0.01;
        knot.rotation.y += 0.01;
        knot.position.x += Math.sin(time + index) * 0.001;
        knot.position.y += Math.cos(time + index) * 0.001;
        const pulse = Math.sin(time * 2 + index) * 0.1;
        knot.scale.set(1 + pulse, 1 + pulse, 1 + pulse);
      });

      const baseZ = 5 + scrollY * 0.01;
      camera.position.x += (mouseX * 0.5 - camera.position.x) * 0.05;
      camera.position.y += (mouseY * 0.5 - camera.position.y) * 0.05;
      camera.position.z += (baseZ - camera.position.z) * 0.05;

      particles.forEach((particleSystem) => {
        const particlePositions = particleSystem.geometry.attributes.position.array;
        for (let i = 0; i < particleCount; i++) {
          const i3 = i * 3;
          particlePositions[i3 + 1] += Math.sin(time + i) * 0.0005;
          if (particlePositions[i3 + 1] > 5) {
            particlePositions[i3 + 1] = -5;
          }
        }
        particleSystem.geometry.attributes.position.needsUpdate = true;
      });

      controls.update();
      renderer.render(scene, camera);
    }

    animate();

    function handleResize() {
      const width = canvasContainer.clientWidth;
      const height = canvasContainer.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      observer.disconnect();
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
      if (renderer) {
        renderer.dispose();
      }
    };
  });
</script>

<div class="splash-container">
  <div class="three-canvas" bind:this={canvasContainer}></div>

  <div class="splash-content">
    <div class="hero-section">
      <div class="logo-container">
        <img src="/cam-hack-logo-text.png" alt="Cam Hack Logo" class="logo" />
      </div>
      <h1 class="main-title">Cam Hack 2025</h1>
      <h2 class="subtitle">1st – 2nd November</h2>
      <div class="countdown-container">
        <div class="countdown-label">Days since the event</div>
        <div class="countdown-number">{daysSince}</div>
      </div>
      <p class="tagline">What can you make in 2 days?</p>
      <div class="cta-buttons">
        <a
          target="_blank"
          href="/discord"
          class="cta-button primary"
        >
          Join the Discord!
        </a>
        <a
          target="_blank"
          href="/signup"
          class="cta-button secondary"
        >
          Signups closed
        </a>
      </div>
    </div>

    <div class="featured-projects-section">
      <h2 class="section-title">Featured Projects</h2>
      <div class="projects-grid">
        <div class="project-card">
          <div class="project-icon">⚡</div>
          <h3 class="project-title">Unintended Behaviour</h3>
          <p class="project-description">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>
        <div class="project-card">
          <div class="project-icon">🚀</div>
          <h3 class="project-title">Lorem Ipsum Project</h3>
          <p class="project-description">
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
        </div>
        <div class="project-card">
          <div class="project-icon">💡</div>
          <h3 class="project-title">Innovation Hub</h3>
          <p class="project-description">
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
          </p>
        </div>
        <div class="project-card">
          <div class="project-icon">🎯</div>
          <h3 class="project-title">Tech Vision</h3>
          <p class="project-description">
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </div>
      </div>
    </div>

    <div id="about" class="about-section">
      <h2 class="section-title">About</h2>
      <p class="about-text">
        Cam Hack is a 2 day hackathon for the innovative minds at the University of
        Cambridge. Over an action-packed weekend, students come together to design
        and build technology projects from the ground up. We welcome participants
        ranging from curious beginners to seasoned coders. Expect plenty of free
        stash, food, and mini-events throughout this hackathon.
      </p>
      <p class="about-text">
        For the winning team, each person will receive £200 and can choose from a
        range of prizes including: smartwatches, Steam vouchers, Amazon vouchers, or
        Sony XM4 headphones.
      </p>
    </div>

    <div id="schedule" class="schedule-section">
      <h2 class="section-title">Schedule</h2>
      <div class="schedule-grid">
        <div class="schedule-day">
          <h4 class="day-title">Saturday 1st November</h4>
          <ul class="schedule-list">
            <li><strong>09:30</strong> &bull; <em>Breakfast</em></li>
            <li><strong>10:00</strong> &bull; Opening Ceremony</li>
            <li><strong>10:30</strong> &bull; Hacking begins!</li>
            <li><strong>13:00</strong> &bull; <em>Lunch</em></li>
            <li><strong>18:00</strong> &bull; <em>Dinner</em></li>
          </ul>
        </div>
        <div class="schedule-day">
          <h4 class="day-title">Sunday 2nd November</h4>
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
              class="rules-link">Code of Conduct</a
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
              class="rules-link">Devpost</a
            >.
          </li>
        </ul>
      </div>
    </div>

    <div id="faq" class="faq-section">
      <h2 class="section-title">FAQ</h2>
      <div class="faq-content">
        <div class="faq-item">
          <h4 class="faq-question">What is a hackathon?</h4>
          <p class="faq-answer">
            A hackathon is an event where people collaborate to create new projects! It usually
            runs over a weekend and is a great way to learn new skills, meet new people,
            and have fun!
          </p>
        </div>
        <div class="faq-item">
          <h4 class="faq-question">What are the hackathon tracks?</h4>
          <p class="faq-answer">
            All projects submit to a main track, which aligns with the overall theme of the
            event (to be revealed on the day). Participants can optionally submit the same
            project to one or more secondary tracks, whose themes extend the main theme in
            some way. Participants who opt into secondary tracks are eligible for both the
            main track and secondary track prizes.
          </p>
        </div>
        <div class="faq-item">
          <h4 class="faq-question">Can I participate remotely?</h4>
          <p class="faq-answer">
            While online participation is not allowed, it's okay to leave the venue for some
            time to hack elsewhere. We hope to see you at the Computer Lab!
          </p>
        </div>
        <div class="faq-item">
          <h4 class="faq-question">How much does it cost?</h4>
          <p class="faq-answer">
            Entry is free and includes food, drinks, and of course, stash!
          </p>
        </div>
        <div class="faq-item">
          <h4 class="faq-question">Where is it?</h4>
          <p class="faq-answer">
            Cam Hack 2025 will be in the Computer Laboratory, also known as the
            <a href="https://maps.app.goo.gl/185n4bsvv7AXw3FM7" class="rules-link"
              >William Gates Building</a
            >.
          </p>
        </div>
        <div class="faq-item">
          <h4 class="faq-question">I don't have a team!</h4>
          <p class="faq-answer">
            If you don't have a team yet, don't hesitate to look around in our
            <a target="_blank" class="rules-link" href="/discord">Discord server</a
            >. It's also common to form teams at the event itself!
          </p>
        </div>
        <div class="faq-item">
          <h4 class="faq-question">How do I sign up?</h4>
          <p class="faq-answer">
            Signups are now closed. We look forward to seeing you at the event!
          </p>
        </div>
        <div class="faq-item">
          <h4 class="faq-question">I've never hacked before!</h4>
          <p class="faq-answer">
            That's completely fine! Teams often have hackers with a mix of experience, including
            beginners.
          </p>
        </div>
        <div class="faq-item">
          <h4 class="faq-question">Will there be food?</h4>
          <p class="faq-answer">
            Yes! We will provide meals, as well as lots of snacks throughout the event! Please
            let us know if you have any dietary requirements in the sign up form.
          </p>
        </div>
        <div class="faq-item">
          <h4 class="faq-question">Can I submit to multiple tracks?</h4>
          <p class="faq-answer">
            Yes, projects can be submitted to multiple tracks.
          </p>
        </div>
        <div class="faq-item">
          <h4 class="faq-question">What can I win?</h4>
          <p class="faq-answer">
            For the winning team, each person will receive £200 and can choose from a range
            of prizes including: smartwatches, Steam vouchers, Amazon vouchers, or Sony XM4
            headphones.
          </p>
        </div>
        <div class="faq-item">
          <h4 class="faq-question">You didn't answer my questions!</h4>
          <p class="faq-answer">
            You can ask us anything in our
            <a target="_blank" href="/discord" class="rules-link">Discord server</a
            >! You can also email us at
            <a href="mailto:camhack@cucats.org" class="rules-link"
              >camhack@cucats.org</a
            >, or speak to us in person at the event, where we will be happy to answer.
          </p>
        </div>
      </div>
    </div>
  </div>
</div>

<style>
  .splash-container {
    position: relative;
    min-height: 100vh;
    width: 100%;
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

  .splash-content {
    position: relative;
    z-index: 1;
    width: 100%;
  }

  .hero-section {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 4rem 2rem;
    text-align: center;
    background: linear-gradient(180deg, rgba(10, 10, 10, 0.7) 0%, rgba(10, 10, 10, 0.9) 100%);
    position: relative;
  }

  .hero-section::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at 50% 50%, rgba(134, 226, 147, 0.1) 0%, transparent 70%);
    animation: pulseGlow 4s ease-in-out infinite;
    pointer-events: none;
  }

  @keyframes pulseGlow {
    0%, 100% {
      opacity: 0.5;
    }
    50% {
      opacity: 1;
    }
  }

  .logo-container {
    margin-bottom: 2rem;
    animation: float 6s ease-in-out infinite;
  }

  @keyframes float {
    0%, 100% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(-20px);
    }
  }

  .logo {
    width: 200px;
    height: auto;
    filter: drop-shadow(0 0 20px rgba(134, 226, 147, 0.5));
    animation: glow 3s ease-in-out infinite alternate;
  }

  @keyframes glow {
    from {
      filter: drop-shadow(0 0 20px rgba(134, 226, 147, 0.5));
    }
    to {
      filter: drop-shadow(0 0 30px rgba(134, 230, 198, 0.8));
    }
  }

  .main-title {
    font-size: 5rem;
    font-weight: bold;
    background: linear-gradient(135deg, #86e293 0%, #86e6c6 50%, #86e293 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin: 1rem 0;
    text-shadow: 0 0 30px rgba(134, 226, 147, 0.5);
    animation: fadeInUp 1s ease-out, gradientShift 3s ease infinite;
    letter-spacing: 0.1em;
    background-size: 200% 200%;
  }

  @keyframes gradientShift {
    0%, 100% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
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

  .subtitle {
    font-size: 2rem;
    color: #86e6c6;
    margin-bottom: 3rem;
    animation: fadeInUp 1s ease-out 0.2s both;
    font-weight: 300;
  }

  .countdown-container {
    margin: 3rem 0;
    padding: 2rem 4rem;
    background: rgba(134, 226, 147, 0.1);
    border: 2px solid rgba(134, 226, 147, 0.3);
    border-radius: 20px;
    backdrop-filter: blur(10px);
    animation: fadeInUp 1s ease-out 0.4s both, pulse 2s ease-in-out infinite;
  }

  @keyframes pulse {
    0%, 100% {
      box-shadow: 0 0 20px rgba(134, 226, 147, 0.3);
    }
    50% {
      box-shadow: 0 0 40px rgba(134, 226, 147, 0.6);
    }
  }

  .countdown-label {
    font-size: 1rem;
    color: #86e6c6;
    margin-bottom: 0.5rem;
    text-transform: uppercase;
    letter-spacing: 0.1em;
  }

  .countdown-number {
    font-size: 4rem;
    font-weight: bold;
    color: #86e293;
    text-shadow: 0 0 20px rgba(134, 226, 147, 0.5);
  }

  .tagline {
    font-size: 1.5rem;
    color: #ffffff;
    margin: 2rem 0;
    animation: fadeInUp 1s ease-out 0.6s both;
  }

  .cta-buttons {
    display: flex;
    gap: 1.5rem;
    margin-top: 2rem;
    flex-wrap: wrap;
    justify-content: center;
    animation: fadeInUp 1s ease-out 0.8s both;
  }

  .cta-button {
    padding: 1rem 2.5rem;
    border-radius: 50px;
    font-size: 1.1rem;
    font-weight: 600;
    text-decoration: none;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
    cursor: pointer;
  }

  .cta-button::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.2);
    transform: translate(-50%, -50%);
    transition: width 0.6s, height 0.6s;
  }

  .cta-button:hover::before {
    width: 300px;
    height: 300px;
  }

  .cta-button.primary {
    background: linear-gradient(135deg, #86e293 0%, #86e6c6 100%);
    color: #0a0a0a;
    box-shadow: 0 4px 20px rgba(134, 226, 147, 0.4);
  }

  .cta-button.primary:hover {
    transform: translateY(-3px) scale(1.05);
    box-shadow: 0 8px 30px rgba(134, 226, 147, 0.6);
  }

  .cta-button.secondary {
    background: rgba(255, 255, 255, 0.1);
    color: #ffffff;
    border: 2px solid rgba(134, 226, 147, 0.3);
    cursor: not-allowed;
    opacity: 0.6;
  }

  .featured-projects-section,
  .about-section,
  .schedule-section,
  .rules-section,
  .faq-section {
    padding: 6rem 2rem;
    background: rgba(10, 10, 10, 0.95);
    backdrop-filter: blur(10px);
  }

  .section-title {
    font-size: 3.5rem;
    background: linear-gradient(135deg, #86e293 0%, #86e6c6 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-align: center;
    margin-bottom: 4rem;
    text-shadow: 0 0 20px rgba(134, 226, 147, 0.3);
    position: relative;
    animation: fadeInUp 0.8s ease-out;
  }

  .section-title::after {
    content: "";
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 100px;
    height: 3px;
    background: linear-gradient(90deg, transparent, #86e293, transparent);
  }

  .projects-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 2rem;
    max-width: 1200px;
    margin: 0 auto;
  }

  .project-card {
    background: rgba(134, 226, 147, 0.05);
    border: 1px solid rgba(134, 226, 147, 0.2);
    border-radius: 20px;
    padding: 2.5rem;
    text-align: center;
    transition: all 0.4s ease;
    position: relative;
    overflow: hidden;
    opacity: 0;
    transform: translateY(50px);
  }

  .project-card.animate-in {
    animation: fadeInUp 0.8s ease-out forwards;
  }

  .project-card.animate-in:nth-child(1) {
    animation-delay: 0.1s;
  }
  .project-card.animate-in:nth-child(2) {
    animation-delay: 0.2s;
  }
  .project-card.animate-in:nth-child(3) {
    animation-delay: 0.3s;
  }
  .project-card.animate-in:nth-child(4) {
    animation-delay: 0.4s;
  }

  .project-card::before {
    content: "";
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(134, 226, 147, 0.1) 0%, transparent 70%);
    opacity: 0;
    transition: opacity 0.4s ease;
  }

  .project-card:hover {
    transform: translateY(-10px) scale(1.02);
    border-color: rgba(134, 226, 147, 0.5);
    box-shadow: 0 10px 40px rgba(134, 226, 147, 0.3);
  }

  .project-card:hover::before {
    opacity: 1;
  }

  .project-icon {
    font-size: 4rem;
    margin-bottom: 1rem;
    filter: drop-shadow(0 0 10px rgba(134, 226, 147, 0.5));
    animation: floatRotate 6s ease-in-out infinite;
    display: inline-block;
  }

  @keyframes floatRotate {
    0%, 100% {
      transform: translateY(0px) rotate(0deg);
    }
    25% {
      transform: translateY(-10px) rotate(90deg);
    }
    50% {
      transform: translateY(0px) rotate(180deg);
    }
    75% {
      transform: translateY(-10px) rotate(270deg);
    }
  }

  .project-title {
    font-size: 1.5rem;
    color: #86e293;
    margin-bottom: 1rem;
    font-weight: 600;
  }

  .project-description {
    color: rgba(255, 255, 255, 0.8);
    line-height: 1.6;
    font-size: 1rem;
  }

  .about-text {
    color: rgba(255, 255, 255, 0.9);
    font-size: 1.2rem;
    line-height: 1.8;
    max-width: 900px;
    margin: 0 auto 2rem;
    text-align: center;
  }

  .schedule-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 3rem;
    max-width: 1000px;
    margin: 0 auto;
  }

  .schedule-day {
    background: rgba(134, 226, 147, 0.05);
    border: 1px solid rgba(134, 226, 147, 0.2);
    border-radius: 20px;
    padding: 2.5rem;
    transition: all 0.4s ease;
    opacity: 0;
    transform: translateY(50px);
  }

  .schedule-day.animate-in {
    animation: fadeInUp 0.8s ease-out forwards;
  }

  .about-text {
    opacity: 0;
    transform: translateY(30px);
  }

  .about-text.animate-in {
    animation: fadeInUp 0.8s ease-out forwards;
  }

  .schedule-day:hover {
    transform: translateY(-5px);
    border-color: rgba(134, 226, 147, 0.5);
    box-shadow: 0 10px 30px rgba(134, 226, 147, 0.2);
  }

  .day-title {
    font-size: 1.8rem;
    color: #86e293;
    margin-bottom: 1.5rem;
    text-align: center;
  }

  .schedule-list {
    list-style: none;
    padding: 0;
  }

  .schedule-list li {
    color: rgba(255, 255, 255, 0.9);
    padding: 0.8rem 0;
    border-bottom: 1px solid rgba(134, 226, 147, 0.1);
    transition: all 0.3s ease;
  }

  .schedule-list li:hover {
    padding-left: 1rem;
    color: #86e6c6;
  }

  .schedule-list li:last-child {
    border-bottom: none;
  }

  .rules-content {
    max-width: 900px;
    margin: 0 auto;
  }

  .rules-subtitle {
    font-size: 2rem;
    color: #86e293;
    margin: 2rem 0 1rem;
  }

  .rules-list {
    list-style: disc;
    padding-left: 2rem;
    color: rgba(255, 255, 255, 0.9);
    line-height: 1.8;
    margin-bottom: 2rem;
  }

  .rules-list li {
    margin-bottom: 1rem;
  }

  .rules-link {
    color: #86e6c6;
    text-decoration: underline;
    transition: color 0.3s ease;
  }

  .rules-link:hover {
    color: #86e293;
  }

  .faq-content {
    max-width: 900px;
    margin: 0 auto;
  }

  .faq-item {
    background: rgba(134, 226, 147, 0.05);
    border: 1px solid rgba(134, 226, 147, 0.2);
    border-radius: 15px;
    padding: 2rem;
    margin-bottom: 1.5rem;
    transition: all 0.3s ease;
    opacity: 0;
    transform: translateY(30px);
  }

  .faq-item.animate-in {
    animation: fadeInUp 0.6s ease-out forwards;
  }

  .faq-item:hover {
    border-color: rgba(134, 226, 147, 0.5);
    transform: translateY(-3px);
    box-shadow: 0 5px 20px rgba(134, 226, 147, 0.2);
  }

  .faq-question {
    font-size: 1.3rem;
    color: #86e293;
    margin-bottom: 1rem;
    font-weight: 600;
  }

  .faq-answer {
    color: rgba(255, 255, 255, 0.9);
    line-height: 1.8;
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

    .section-title {
      font-size: 2.5rem;
    }

    .projects-grid {
      grid-template-columns: 1fr;
    }
  }
</style>