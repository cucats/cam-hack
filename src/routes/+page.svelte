<script>
  import { onMount } from 'svelte';
  import * as THREE from 'three';
  import { sponsors, organizers } from '$lib/components/sponsors-data.js';

  let canvas;
  let scene, camera, renderer, particles, particleGeometry, particleMaterial;
  let geometricShapes = [];
  let mouseX = 0, mouseY = 0;
  let windowHalfX = 0, windowHalfY = 0;
  let animationFrameId;

  const eventDate = new Date('2025-11-01T00:00:00');
  const now = new Date();
  const daysSince = Math.floor((now - eventDate) / (1000 * 60 * 60 * 24));

  onMount(() => {
    initThree();
    animate();
    
    const handleResize = () => {
      windowHalfX = window.innerWidth / 2;
      windowHalfY = window.innerHeight / 2;
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    
    const handleMouseMove = (event) => {
      mouseX = (event.clientX - windowHalfX) / 100;
      mouseY = (event.clientY - windowHalfY) / 100;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      if (renderer) {
        renderer.dispose();
      }
    };
  });

  function initThree() {
    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;

    scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x0f172a, 1, 2000);

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 2000);
    camera.position.z = 500;

    const particleCount = 2000;
    particleGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = Math.random() * 2000 - 1000;
      positions[i + 1] = Math.random() * 2000 - 1000;
      positions[i + 2] = Math.random() * 2000 - 1000;
      
      velocities[i] = (Math.random() - 0.5) * 0.2;
      velocities[i + 1] = (Math.random() - 0.5) * 0.2;
      velocities[i + 2] = (Math.random() - 0.5) * 0.2;
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeometry.setAttribute('velocity', new THREE.BufferAttribute(velocities, 3));

    particleMaterial = new THREE.PointsMaterial({
      color: 0x10b981,
      size: 3,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending
    });

    particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    const geometries = [
      new THREE.IcosahedronGeometry(30, 0),
      new THREE.OctahedronGeometry(25, 0),
      new THREE.TetrahedronGeometry(28, 0)
    ];

    for (let i = 0; i < 8; i++) {
      const geometry = geometries[Math.floor(Math.random() * geometries.length)];
      const material = new THREE.MeshBasicMaterial({
        color: i % 2 === 0 ? 0x10b981 : 0x06b6d4,
        wireframe: true,
        transparent: true,
        opacity: 0.3
      });
      const mesh = new THREE.Mesh(geometry, material);
      
      mesh.position.x = Math.random() * 1600 - 800;
      mesh.position.y = Math.random() * 1600 - 800;
      mesh.position.z = Math.random() * 1600 - 800;
      
      mesh.rotation.x = Math.random() * Math.PI;
      mesh.rotation.y = Math.random() * Math.PI;
      
      mesh.userData = {
        rotationSpeed: {
          x: (Math.random() - 0.5) * 0.01,
          y: (Math.random() - 0.5) * 0.01,
          z: (Math.random() - 0.5) * 0.01
        }
      };
      
      scene.add(mesh);
      geometricShapes.push(mesh);
    }

    renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
  }

  function animate() {
    animationFrameId = requestAnimationFrame(animate);

    const positions = particles.geometry.attributes.position.array;
    const velocities = particles.geometry.attributes.velocity.array;

    for (let i = 0; i < positions.length; i += 3) {
      positions[i] += velocities[i];
      positions[i + 1] += velocities[i + 1];
      positions[i + 2] += velocities[i + 2];

      if (Math.abs(positions[i]) > 1000) velocities[i] *= -1;
      if (Math.abs(positions[i + 1]) > 1000) velocities[i + 1] *= -1;
      if (Math.abs(positions[i + 2]) > 1000) velocities[i + 2] *= -1;
    }

    particles.geometry.attributes.position.needsUpdate = true;
    particles.rotation.y += 0.0002;

    geometricShapes.forEach(shape => {
      shape.rotation.x += shape.userData.rotationSpeed.x;
      shape.rotation.y += shape.userData.rotationSpeed.y;
      shape.rotation.z += shape.userData.rotationSpeed.z;
    });

    camera.position.x += (mouseX - camera.position.x) * 0.05;
    camera.position.y += (-mouseY - camera.position.y) * 0.05;
    camera.lookAt(scene.position);

    renderer.render(scene, camera);
  }
</script>

<svelte:head>
  <title>Cam Hack 2025</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
</svelte:head>

<canvas bind:this={canvas} class="fixed top-0 left-0 w-full h-full -z-10"></canvas>

<div class="main-container">
  <section class="hero-section">
    <div class="hero-content">
      <div class="logo-wrapper">
        <img src="/cam-hack-logo-text.png" alt="Cam Hack Logo" class="main-logo" />
      </div>
      <h1 class="title">CAM HACK 2025</h1>
      <div class="date-info">1st - 2nd November</div>
      <div class="countdown-wrapper">
        <div class="countdown-label">Days since event</div>
        <div class="countdown-number">{daysSince}</div>
      </div>
      <div class="cta-buttons">
        <a href="/discord" target="_blank" class="btn btn-primary">
          <span>Join Discord</span>
        </a>
        <a href="/signup" class="btn btn-disabled">
          <span>Signups Closed</span>
        </a>
      </div>
      <p class="tagline">What can you make in 2 days?</p>
    </div>
  </section>

  <section class="featured-section">
    <div class="section-content">
      <h2 class="section-title glitch" data-text="FEATURED PROJECT">FEATURED PROJECT</h2>
      <div class="featured-card">
        <div class="card-glow"></div>
        <h3 class="featured-title">Unintended Behaviour</h3>
        <p class="featured-desc">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        <a href="https://cam-hack-2025.devpost.com" target="_blank" class="featured-image-wrapper">
          <img src="/unintended.png" alt="Unintended" class="featured-image" />
        </a>
      </div>
    </div>
  </section>

  <section class="sponsors-section">
    <div class="section-content">
      <h2 class="section-title">SPONSORED BY</h2>
      <div class="sponsors-grid">
        {#each sponsors as sponsor}
          <a href={sponsor.url} target="_blank" class="sponsor-card">
            <img src={sponsor.logo} alt={sponsor.name} class="sponsor-logo {sponsor.className}" />
          </a>
        {/each}
      </div>
    </div>
  </section>

  <section class="info-section">
    <div class="section-content">
      <div class="info-grid">
        <div class="info-card">
          <h3 class="info-title">About</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.</p>
        </div>
        
        <div class="info-card">
          <h3 class="info-title">Schedule</h3>
          <div class="schedule-cols">
            <div>
              <h4 class="schedule-day">Saturday 1st Nov</h4>
              <ul class="schedule-list">
                <li><span class="time">09:30</span> Breakfast</li>
                <li><span class="time">10:00</span> Opening</li>
                <li><span class="time">10:30</span> Hacking begins</li>
                <li><span class="time">13:00</span> Lunch</li>
                <li><span class="time">18:00</span> Dinner</li>
              </ul>
            </div>
            <div>
              <h4 class="schedule-day">Sunday 2nd Nov</h4>
              <ul class="schedule-list">
                <li><span class="time">09:30</span> Breakfast</li>
                <li><span class="time">13:00</span> Lunch</li>
                <li><span class="time">16:30</span> Hacking ends</li>
                <li><span class="time">17:00</span> Dinner</li>
                <li><span class="time">18:30</span> Closing</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="organizers-section">
    <div class="section-content">
      <h2 class="section-title">RUN BY</h2>
      <a href={organizers.runBy.url} target="_blank" class="organizer-logo-wrapper">
        <img src={organizers.runBy.logo} alt={organizers.runBy.name} class="organizer-logo" />
      </a>
    </div>
  </section>
</div>

<style>
  :global(body) {
    background: linear-gradient(180deg, #0f172a 0%, #1e293b 50%, #0f172a 100%);
    font-family: 'Inter', sans-serif;
    margin: 0;
    padding: 0;
    overflow-x: hidden;
  }

  :global(h1, h2, h3, h4) {
    font-family: 'Space Grotesk', sans-serif;
  }

  .main-container {
    position: relative;
    z-index: 1;
    color: #ffffff;
  }

  .hero-section {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem;
    position: relative;
  }

  .hero-content {
    text-align: center;
    max-width: 900px;
    animation: fadeInUp 1s ease-out;
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

  .logo-wrapper {
    margin-bottom: 2rem;
    animation: float 3s ease-in-out infinite;
  }

  @keyframes float {
    0%, 100% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(-20px);
    }
  }

  .main-logo {
    width: 200px;
    height: 200px;
    filter: drop-shadow(0 0 30px rgba(16, 185, 129, 0.5));
  }

  .title {
    font-size: clamp(3rem, 8vw, 6rem);
    font-weight: 700;
    margin: 0 0 1rem 0;
    letter-spacing: 0.05em;
    background: linear-gradient(135deg, #10b981 0%, #06b6d4 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: shimmer 3s ease-in-out infinite;
  }

  @keyframes shimmer {
    0%, 100% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
  }

  .date-info {
    font-size: clamp(1.2rem, 3vw, 2rem);
    color: #06b6d4;
    margin-bottom: 3rem;
    font-weight: 500;
  }

  .countdown-wrapper {
    margin: 3rem 0;
    padding: 2rem;
    background: rgba(16, 185, 129, 0.1);
    border: 2px solid #10b981;
    border-radius: 20px;
    backdrop-filter: blur(10px);
    box-shadow: 0 0 50px rgba(16, 185, 129, 0.3);
    animation: pulse 2s ease-in-out infinite;
  }

  @keyframes pulse {
    0%, 100% {
      box-shadow: 0 0 50px rgba(16, 185, 129, 0.3);
    }
    50% {
      box-shadow: 0 0 80px rgba(16, 185, 129, 0.5);
    }
  }

  .countdown-label {
    font-size: 1rem;
    color: #86e293;
    text-transform: uppercase;
    letter-spacing: 0.2em;
    margin-bottom: 0.5rem;
  }

  .countdown-number {
    font-size: clamp(3rem, 10vw, 5rem);
    font-weight: 700;
    color: #10b981;
    font-family: 'Space Grotesk', sans-serif;
  }

  .cta-buttons {
    display: flex;
    gap: 1.5rem;
    justify-content: center;
    margin: 2rem 0;
    flex-wrap: wrap;
  }

  .btn {
    padding: 1rem 2.5rem;
    border-radius: 50px;
    font-size: 1.1rem;
    font-weight: 600;
    text-decoration: none;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
    font-family: 'Space Grotesk', sans-serif;
  }

  .btn::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.3);
    transform: translate(-50%, -50%);
    transition: width 0.6s, height 0.6s;
  }

  .btn:hover::before {
    width: 300px;
    height: 300px;
  }

  .btn span {
    position: relative;
    z-index: 1;
  }

  .btn-primary {
    background: linear-gradient(135deg, #10b981 0%, #059669 100%);
    color: #ffffff;
    box-shadow: 0 10px 30px rgba(16, 185, 129, 0.4);
  }

  .btn-primary:hover {
    transform: translateY(-3px);
    box-shadow: 0 15px 40px rgba(16, 185, 129, 0.6);
  }

  .btn-disabled {
    background: rgba(107, 114, 128, 0.3);
    color: #9ca3af;
    cursor: not-allowed;
  }

  .tagline {
    font-size: 1.5rem;
    color: #cbd5e1;
    margin-top: 2rem;
    font-weight: 300;
  }

  .featured-section,
  .sponsors-section,
  .info-section,
  .organizers-section {
    padding: 6rem 2rem;
    position: relative;
  }

  .section-content {
    max-width: 1200px;
    margin: 0 auto;
  }

  .section-title {
    font-size: clamp(2.5rem, 5vw, 4rem);
    text-align: center;
    margin-bottom: 4rem;
    font-weight: 700;
    letter-spacing: 0.1em;
    color: #10b981;
    text-transform: uppercase;
    position: relative;
  }

  .section-title::after {
    content: '';
    display: block;
    width: 100px;
    height: 4px;
    background: linear-gradient(90deg, transparent, #10b981, transparent);
    margin: 1rem auto 0;
  }

  .glitch {
    position: relative;
  }

  .glitch::before,
  .glitch::after {
    content: attr(data-text);
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .glitch::before {
    animation: glitch-1 2s infinite;
    color: #06b6d4;
    z-index: -1;
  }

  .glitch::after {
    animation: glitch-2 2s infinite;
    color: #10b981;
    z-index: -2;
  }

  @keyframes glitch-1 {
    0%, 100% {
      transform: translate(0);
      opacity: 0;
    }
    50% {
      transform: translate(-2px, 2px);
      opacity: 0.5;
    }
  }

  @keyframes glitch-2 {
    0%, 100% {
      transform: translate(0);
      opacity: 0;
    }
    50% {
      transform: translate(2px, -2px);
      opacity: 0.5;
    }
  }

  .featured-card {
    background: rgba(15, 23, 42, 0.8);
    border: 2px solid #10b981;
    border-radius: 30px;
    padding: 3rem;
    position: relative;
    overflow: hidden;
    backdrop-filter: blur(10px);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }

  .featured-card:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 60px rgba(16, 185, 129, 0.4);
  }

  .card-glow {
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(16, 185, 129, 0.1) 0%, transparent 70%);
    animation: rotate 10s linear infinite;
  }

  @keyframes rotate {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  .featured-title {
    font-size: 2.5rem;
    color: #10b981;
    margin-bottom: 1rem;
    position: relative;
  }

  .featured-desc {
    font-size: 1.2rem;
    color: #cbd5e1;
    margin-bottom: 2rem;
    line-height: 1.8;
    position: relative;
  }

  .featured-image-wrapper {
    display: block;
    position: relative;
    border-radius: 20px;
    overflow: hidden;
    transition: transform 0.3s ease;
  }

  .featured-image-wrapper:hover {
    transform: scale(1.02);
  }

  .featured-image {
    width: 100%;
    height: auto;
    display: block;
    border-radius: 20px;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
  }

  .sponsors-section {
    background: rgba(30, 41, 59, 0.3);
    backdrop-filter: blur(10px);
  }

  .sponsors-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 3rem;
    align-items: center;
    justify-items: center;
  }

  .sponsor-card {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem;
    background: rgba(15, 23, 42, 0.5);
    border: 1px solid rgba(16, 185, 129, 0.3);
    border-radius: 20px;
    transition: all 0.3s ease;
    width: 100%;
    height: 150px;
    backdrop-filter: blur(5px);
  }

  .sponsor-card:hover {
    transform: translateY(-10px) scale(1.05);
    border-color: #10b981;
    box-shadow: 0 20px 40px rgba(16, 185, 129, 0.3);
    background: rgba(15, 23, 42, 0.8);
  }

  .sponsor-logo {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
    filter: brightness(0) invert(1);
    transition: filter 0.3s ease;
  }

  .sponsor-card:hover .sponsor-logo {
    filter: brightness(1) invert(0);
  }

  .info-section {
    background: rgba(15, 23, 42, 0.3);
  }

  .info-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 3rem;
  }

  .info-card {
    background: rgba(30, 41, 59, 0.5);
    border: 1px solid rgba(16, 185, 129, 0.3);
    border-radius: 25px;
    padding: 2.5rem;
    backdrop-filter: blur(10px);
    transition: all 0.3s ease;
  }

  .info-card:hover {
    border-color: #10b981;
    box-shadow: 0 10px 40px rgba(16, 185, 129, 0.2);
    transform: translateY(-5px);
  }

  .info-title {
    font-size: 2rem;
    color: #10b981;
    margin-bottom: 1.5rem;
    font-weight: 600;
  }

  .info-card p {
    color: #cbd5e1;
    line-height: 1.8;
    margin-bottom: 1rem;
  }

  .schedule-cols {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 2rem;
  }

  .schedule-day {
    color: #06b6d4;
    font-size: 1.2rem;
    margin-bottom: 1rem;
    font-weight: 600;
  }

  .schedule-list {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .schedule-list li {
    color: #cbd5e1;
    margin-bottom: 0.8rem;
    padding-left: 1rem;
    position: relative;
  }

  .schedule-list li::before {
    content: '▸';
    position: absolute;
    left: 0;
    color: #10b981;
  }

  .time {
    color: #10b981;
    font-weight: 600;
    font-family: 'Ubuntu Mono', monospace;
    margin-right: 0.5rem;
  }

  .organizers-section {
    padding-bottom: 8rem;
  }

  .organizer-logo-wrapper {
    display: flex;
    justify-content: center;
    padding: 3rem;
    background: rgba(15, 23, 42, 0.5);
    border: 2px solid rgba(16, 185, 129, 0.3);
    border-radius: 30px;
    backdrop-filter: blur(10px);
    transition: all 0.3s ease;
  }

  .organizer-logo-wrapper:hover {
    border-color: #10b981;
    box-shadow: 0 20px 60px rgba(16, 185, 129, 0.3);
    transform: translateY(-5px);
  }

  .organizer-logo {
    max-width: 400px;
    width: 100%;
    height: auto;
  }

  @media (max-width: 768px) {
    .hero-section {
      padding: 1rem;
    }

    .main-logo {
      width: 150px;
      height: 150px;
    }

    .cta-buttons {
      flex-direction: column;
      align-items: stretch;
    }

    .btn {
      width: 100%;
    }

    .featured-card {
      padding: 2rem;
    }

    .sponsors-grid {
      grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
      gap: 2rem;
    }

    .sponsor-card {
      height: 120px;
    }

    .info-grid {
      grid-template-columns: 1fr;
    }

    .schedule-cols {
      grid-template-columns: 1fr;
    }
  }
</style>
