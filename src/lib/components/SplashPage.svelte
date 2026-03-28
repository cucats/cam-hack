<script>
  import { onMount } from "svelte";
  import * as THREE from "three";
  import Schedule from "$lib/components/Schedule.svelte";
  import Rules from "$lib/components/Rules.svelte";
  import FAQ from "$lib/components/FAQ.svelte";
  import Organisers from "$lib/components/Organisers.svelte";

  let canvasContainer;
  let scene, camera, renderer, particles, particleSystem, torus;
  let mouseX = 0;
  let mouseY = 0;
  let animationFrameId;
  let daysSince = 0;
  let scrollY = 0;
  let featuredSection, aboutSection, sponsorsSection;

  onMount(() => {
    const eventDate = new Date("2025-11-02T18:00:00");
    const now = new Date();
    const diffTime = Math.abs(now - eventDate);
    daysSince = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    scene = new THREE.Scene();
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

    const particleCount = 2000;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const color1 = new THREE.Color(0x86e293);
    const color2 = new THREE.Color(0x86e6c6);
    const color3 = new THREE.Color(0x10b981);

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 20;
      positions[i + 1] = (Math.random() - 0.5) * 20;
      positions[i + 2] = (Math.random() - 0.5) * 20;

      const colorChoice = Math.random();
      let color;
      if (colorChoice < 0.4) color = color1;
      else if (colorChoice < 0.7) color = color2;
      else color = color3;

      colors[i] = color.r;
      colors[i + 1] = color.g;
      colors[i + 2] = color.b;
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 0.05,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
    });

    particleSystem = new THREE.Points(geometry, material);
    scene.add(particleSystem);

    const torusGeometry = new THREE.TorusGeometry(1, 0.3, 16, 100);
    const torusMaterial = new THREE.MeshStandardMaterial({
      color: 0x86e293,
      emissive: 0x10b981,
      emissiveIntensity: 0.5,
      metalness: 0.7,
      roughness: 0.3,
    });
    torus = new THREE.Mesh(torusGeometry, torusMaterial);
    torus.position.set(0, 0, -2);
    scene.add(torus);

    const torus2 = new THREE.Mesh(
      new THREE.TorusGeometry(0.6, 0.2, 12, 80),
      new THREE.MeshStandardMaterial({
        color: 0x86e6c6,
        emissive: 0x86e293,
        emissiveIntensity: 0.4,
        metalness: 0.6,
        roughness: 0.4,
      })
    );
    torus2.position.set(2, 1, -3);
    scene.add(torus2);

    const sphereGeometry = new THREE.SphereGeometry(0.4, 32, 32);
    const sphereMaterial = new THREE.MeshStandardMaterial({
      color: 0x10b981,
      emissive: 0x86e293,
      emissiveIntensity: 0.6,
      metalness: 0.8,
      roughness: 0.2,
    });
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    sphere.position.set(-2, -1, -2.5);
    scene.add(sphere);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0x86e293, 1, 100);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    const pointLight2 = new THREE.PointLight(0x86e6c6, 1, 100);
    pointLight2.position.set(-5, -5, 5);
    scene.add(pointLight2);

    function animate() {
      animationFrameId = requestAnimationFrame(animate);

      const time = Date.now() * 0.0005;

      particleSystem.rotation.x += 0.0005;
      particleSystem.rotation.y += 0.001;
      particleSystem.rotation.z = Math.sin(time) * 0.1;

      if (torus) {
        torus.rotation.x += 0.01;
        torus.rotation.y += 0.01;
        torus.position.y = Math.sin(time * 0.5) * 0.3;
      }

      scene.children.forEach((child) => {
        if (child.type === "Mesh" && child !== torus) {
          child.rotation.x += 0.005;
          child.rotation.y += 0.008;
        }
      });

      const scrollFactor = scrollY * 0.0001;
      camera.position.z = 5 + scrollFactor * 2;
      camera.position.x += (mouseX * 0.5 - camera.position.x) * 0.05;
      camera.position.y += (-mouseY * 0.5 - camera.position.y) * 0.05;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    }

    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    const handleScroll = () => {
      scrollY = window.scrollY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

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
        ".featured-section, .about-section, .sponsors-section, .schedule-section, .rules-section, .faq-section, .organisers-section"
      );
      sections.forEach((section) => observer.observe(section));
    }, 100);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      if (renderer) {
        renderer.dispose();
      }
      observer.disconnect();
    };
  });

  function handleMouseMove(event) {
    mouseX = (event.clientX / window.innerWidth) * 2 - 1;
    mouseY = (event.clientY / window.innerHeight) * 2 - 1;
  }
</script>

<svelte:window onmousemove={handleMouseMove} />

<div class="splash-container">
  <div class="canvas-wrapper" bind:this={canvasContainer}></div>

  <div class="content-wrapper">
    <section class="hero-section">
      <div class="hero-content">
        <div class="logo-container">
          <img
            src="/cam-hack-logo-text.png"
            alt="Cam Hack Logo"
            class="logo-image"
          />
        </div>
        <h1 class="hero-title">Cam Hack 2025</h1>
        <h2 class="hero-subtitle">1st &ndash; 2nd November</h2>
        <div class="countdown-container">
          <div class="countdown-box">
            <span class="countdown-number">{daysSince}</span>
            <span class="countdown-label">Days Since</span>
          </div>
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
    </section>

    <section class="featured-section" bind:this={featuredSection}>
      <div class="featured-content">
        <h2 class="section-title">Featured Projects</h2>
        <div class="projects-grid">
          <div class="project-card">
            <div class="project-image-wrapper">
              <a target="_blank" href="https://cam-hack-2025.devpost.com">
                <img
                  src="/unintended.png"
                  alt="Unintended Behaviour"
                  class="project-image"
                />
              </a>
            </div>
            <h3 class="project-title">Unintended Behaviour</h3>
            <p class="project-description">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
          <div class="project-card">
            <div class="project-image-wrapper">
              <div class="project-placeholder">
                <span>Project 2</span>
              </div>
            </div>
            <h3 class="project-title">Lorem Ipsum Project</h3>
            <p class="project-description">
              Ut enim ad minim veniam, quis nostrud exercitation ullamco
              laboris nisi ut aliquip ex ea commodo consequat.
            </p>
          </div>
          <div class="project-card">
            <div class="project-image-wrapper">
              <div class="project-placeholder">
                <span>Project 3</span>
              </div>
            </div>
            <h3 class="project-title">Dolor Sit Amet</h3>
            <p class="project-description">
              Duis aute irure dolor in reprehenderit in voluptate velit esse
              cillum dolore eu fugiat nulla pariatur.
            </p>
          </div>
        </div>
      </div>
    </section>

    <section id="about" class="about-section" bind:this={aboutSection}>
      <div class="about-content">
        <h2 class="section-title">About</h2>
        <p>
          Cam Hack is a 2 day hackathon for the innovative minds at the
          University of Cambridge. Over an action-packed weekend, students come
          together to design and build technology projects from the ground up.
          We welcome participants ranging from curious beginners to seasoned
          coders. Expect plenty of free stash, food, and mini-events throughout
          this hackathon.
        </p>
        <p>
          For the winning team, each person will receive £200 and can choose
          from a range of prizes including: smartwatches, Steam vouchers, Amazon
          vouchers, or Sony XM4 headphones.
        </p>
      </div>
    </section>

    <section id="schedule" class="schedule-section">
      <Schedule />
    </section>

    <section id="rules" class="rules-section">
      <Rules />
    </section>

    <section id="faq" class="faq-section">
      <FAQ />
    </section>

    <section class="organisers-section">
      <Organisers />
    </section>

    <section class="sponsors-section" bind:this={sponsorsSection}>
      <div class="sponsors-content">
        <h2 class="section-title">Sponsors</h2>
        <div class="sponsors-grid">
          <a
            href="https://www.anthropic.com"
            target="_blank"
            class="sponsor-item"
          >
            <img src="/anthropic-logo.png" alt="Anthropic" />
          </a>
          <a
            href="https://www.joinef.com"
            target="_blank"
            class="sponsor-item"
          >
            <img src="/entrepreneur-first-logo.png" alt="Entrepreneur First" />
          </a>
          <a href="https://janestreet.com" target="_blank" class="sponsor-item">
            <img src="/jane-street-logo.png" alt="Jane Street" />
          </a>
          <a
            href="https://founders.cam.ac.uk"
            target="_blank"
            class="sponsor-item"
          >
            <img
              src="/cucats-logo-gradient-full.png"
              alt="Founders at the University of Cambridge"
            />
          </a>
          <a
            href="https://www.qube-rt.com"
            target="_blank"
            class="sponsor-item"
          >
            <img src="/qube-rt-logo.png" alt="Qube RT" />
          </a>
          <a href="https://sierra.ai" target="_blank" class="sponsor-item">
            <img src="/sierra-logo.png" alt="Sierra" />
          </a>
          <a href="https://tpp-uk.com" target="_blank" class="sponsor-item">
            <img src="/tpp-logo.png" alt="TPP UK" />
          </a>
        </div>
      </div>
    </section>
  </div>
</div>

<style>
  .splash-container {
    position: relative;
    min-height: 100vh;
    overflow-x: hidden;
  }

  .canvas-wrapper {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
    pointer-events: none;
  }

  .canvas-wrapper :global(canvas) {
    display: block;
  }

  .content-wrapper {
    position: relative;
    z-index: 1;
  }

  .hero-section {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 4rem 2rem;
    background: linear-gradient(
      180deg,
      rgba(255, 255, 255, 0.95) 0%,
      rgba(134, 226, 147, 0.1) 100%
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

  .logo-image {
    width: 200px;
    height: auto;
    filter: drop-shadow(0 10px 20px rgba(16, 185, 129, 0.3));
  }

  .hero-title {
    font-size: 4rem;
    font-weight: 700;
    margin-bottom: 1rem;
    background: linear-gradient(120deg, #86e293 0%, #86e6c6 100%);
    background-size: 200% 200%;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: shimmer 3s ease-in-out infinite;
    text-shadow: 0 0 30px rgba(134, 226, 147, 0.3);
  }

  .hero-subtitle {
    font-size: 2rem;
    color: #334155;
    margin-bottom: 3rem;
    font-weight: 400;
  }

  .countdown-container {
    margin: 3rem 0;
    display: flex;
    justify-content: center;
  }

  .countdown-box {
    background: linear-gradient(135deg, #86e293 0%, #86e6c6 100%);
    padding: 2rem 4rem;
    border-radius: 20px;
    box-shadow: 0 20px 40px rgba(16, 185, 129, 0.3), 0 0 60px rgba(134, 226, 147, 0.2);
    animation: pulse 2s ease-in-out infinite, glow 3s ease-in-out infinite;
    transform-style: preserve-3d;
    position: relative;
    overflow: hidden;
  }

  .countdown-box::before {
    content: "";
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.3), transparent);
    animation: rotate 3s linear infinite;
  }

  .countdown-number {
    display: block;
    font-size: 5rem;
    font-weight: 700;
    color: white;
    text-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    position: relative;
    z-index: 1;
  }

  .countdown-label {
    display: block;
    font-size: 1.2rem;
    color: white;
    opacity: 0.9;
    margin-top: 0.5rem;
    position: relative;
    z-index: 1;
  }

  .hero-tagline {
    font-size: 1.5rem;
    color: #475569;
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
    display: inline-block;
    cursor: pointer;
  }

  .btn-primary {
    background: linear-gradient(135deg, #86e293 0%, #10b981 100%);
    color: white;
    box-shadow: 0 10px 20px rgba(16, 185, 129, 0.3);
  }

  .btn-primary:hover {
    transform: translateY(-3px) scale(1.05);
    box-shadow: 0 15px 30px rgba(16, 185, 129, 0.4);
  }

  .btn-secondary {
    background: rgba(148, 163, 184, 0.3);
    color: #64748b;
    cursor: not-allowed;
  }

  .featured-section,
  .about-section,
  .sponsors-section,
  .schedule-section,
  .rules-section,
  .faq-section,
  .organisers-section {
    padding: 6rem 2rem;
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    opacity: 0;
    transform: translateY(50px);
    transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }

  .featured-section.visible,
  .about-section.visible,
  .sponsors-section.visible,
  .schedule-section.visible,
  .rules-section.visible,
  .faq-section.visible,
  .organisers-section.visible {
    opacity: 1;
    transform: translateY(0);
  }

  .featured-content,
  .about-content,
  .sponsors-content {
    max-width: 1200px;
    margin: 0 auto;
  }

  .section-title {
    font-size: 3rem;
    text-align: center;
    margin-bottom: 3rem;
    background: linear-gradient(120deg, #86e293 0%, #86e6c6 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .projects-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
    margin-top: 3rem;
  }

  .project-card {
    background: white;
    border-radius: 20px;
    overflow: hidden;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    animation: fadeInUp 0.8s ease-out backwards;
    position: relative;
  }

  .project-card::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(134, 226, 147, 0.1) 0%, rgba(134, 230, 198, 0.1) 100%);
    opacity: 0;
    transition: opacity 0.3s ease;
    pointer-events: none;
  }

  .project-card:hover::before {
    opacity: 1;
  }

  .project-card:nth-child(1) {
    animation-delay: 0.1s;
  }

  .project-card:nth-child(2) {
    animation-delay: 0.2s;
  }

  .project-card:nth-child(3) {
    animation-delay: 0.3s;
  }

  .project-card:hover {
    transform: translateY(-10px) scale(1.02);
    box-shadow: 0 20px 40px rgba(16, 185, 129, 0.2);
  }

  .project-image-wrapper {
    width: 100%;
    height: 200px;
    overflow: hidden;
    background: linear-gradient(135deg, #86e293 0%, #86e6c6 100%);
  }

  .project-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
  }

  .project-card:hover .project-image {
    transform: scale(1.1);
  }

  .project-placeholder {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 1.5rem;
    font-weight: 600;
  }

  .project-title {
    font-size: 1.5rem;
    padding: 1.5rem 1.5rem 0.5rem;
    color: #1e293b;
  }

  .project-description {
    padding: 0 1.5rem 1.5rem;
    color: #64748b;
    line-height: 1.6;
  }

  .about-content p {
    font-size: 1.2rem;
    line-height: 1.8;
    color: #475569;
    margin-bottom: 1.5rem;
    max-width: 800px;
    margin-left: auto;
    margin-right: auto;
  }

  .sponsors-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 2rem;
    align-items: center;
    justify-items: center;
  }

  .sponsor-item {
    padding: 1.5rem;
    background: white;
    border-radius: 15px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    max-width: 200px;
  }

  .sponsor-item:hover {
    transform: translateY(-5px) scale(1.05);
    box-shadow: 0 10px 25px rgba(16, 185, 129, 0.2);
  }

  .sponsor-item img {
    max-width: 100%;
    height: auto;
    filter: grayscale(0.3);
    transition: filter 0.3s ease;
  }

  .sponsor-item:hover img {
    filter: grayscale(0);
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
      transform: translateY(0px);
    }
    50% {
      transform: translateY(-20px);
    }
  }

  @keyframes shimmer {
    0%,
    100% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
  }

  @keyframes pulse {
    0%,
    100% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.05);
    }
  }

  @keyframes glow {
    0%,
    100% {
      box-shadow: 0 20px 40px rgba(16, 185, 129, 0.3), 0 0 60px rgba(134, 226, 147, 0.2);
    }
    50% {
      box-shadow: 0 20px 40px rgba(16, 185, 129, 0.5), 0 0 80px rgba(134, 226, 147, 0.4);
    }
  }

  @keyframes rotate {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
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

    .countdown-box {
      padding: 1.5rem 2rem;
    }

    .projects-grid {
      grid-template-columns: 1fr;
    }

    .section-title {
      font-size: 2rem;
    }
  }
</style>
