<script>
  import { onMount } from "svelte";
  import * as THREE from "three";

  let canvasRef;
  let countdownDays = $state(0);
  let featuredProjects = [
    {
      title: "Lorem Ipsum Project Alpha",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.",
      tags: ["Machine Learning", "Web"],
    },
    {
      title: "Dolor Sit Amet Beta",
      description:
        "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo.",
      tags: ["Mobile", "AI"],
    },
    {
      title: "Consectetur Adipiscing Gamma",
      description:
        "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
      tags: ["Blockchain", "IoT"],
    },
    {
      title: "Sed Do Eiusmod Delta",
      description:
        "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      tags: ["AR/VR", "Gaming"],
    },
  ];

  let scene, camera, renderer;
  let particles, particleSystem;
  let geometricShapes = [];
  let mouseX = 0;
  let mouseY = 0;
  let scrollY = 0;
  let animationFrameId;
  let visibleSections = $state(new Set());

  onMount(() => {
    const eventDate = new Date("2025-11-01");
    const today = new Date();
    const diffTime = today - eventDate;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    countdownDays = diffDays;

    initThreeJS();
    animate();
    setupScrollAnimations();

    const handleMouseMove = (e) => {
      mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    const handleScroll = () => {
      scrollY = window.scrollY;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      if (renderer) {
        renderer.dispose();
      }
    };
  });

  function setupScrollAnimations() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -100px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          visibleSections.add(entry.target.id);
          entry.target.classList.add("section-visible");
        }
      });
    }, observerOptions);

    setTimeout(() => {
      document.querySelectorAll("section[id]").forEach((section) => {
        observer.observe(section);
      });
    }, 100);
  }

  function initThreeJS() {
    scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x0a0a0a, 10, 50);

    camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 30;

    renderer = new THREE.WebGLRenderer({
      canvas: canvasRef,
      alpha: true,
      antialias: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const particleCount = 2000;
    const particlesGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const color1 = new THREE.Color(0x86e293);
    const color2 = new THREE.Color(0x86e6c6);
    const color3 = new THREE.Color(0x10b981);

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 100;
      positions[i + 1] = (Math.random() - 0.5) * 100;
      positions[i + 2] = (Math.random() - 0.5) * 100;

      const randomColor = Math.random();
      let color;
      if (randomColor < 0.33) {
        color = color1;
      } else if (randomColor < 0.66) {
        color = color2;
      } else {
        color = color3;
      }

      colors[i] = color.r;
      colors[i + 1] = color.g;
      colors[i + 2] = color.b;
    }

    particlesGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3)
    );
    particlesGeometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.1,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
    });

    particleSystem = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particleSystem);

    for (let i = 0; i < 15; i++) {
      const geometry = new THREE.IcosahedronGeometry(
        0.5 + Math.random() * 1.5,
        0
      );
      const material = new THREE.MeshStandardMaterial({
        color: new THREE.Color().setHSL(
          0.3 + Math.random() * 0.2,
          0.7,
          0.5 + Math.random() * 0.3
        ),
        metalness: 0.7,
        roughness: 0.3,
        emissive: new THREE.Color().setHSL(
          0.3 + Math.random() * 0.2,
          0.7,
          0.1
        ),
      });

      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(
        (Math.random() - 0.5) * 40,
        (Math.random() - 0.5) * 40,
        (Math.random() - 0.5) * 40
      );
      mesh.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );

      geometricShapes.push({
        mesh,
        rotationSpeed: {
          x: (Math.random() - 0.5) * 0.02,
          y: (Math.random() - 0.5) * 0.02,
          z: (Math.random() - 0.5) * 0.02,
        },
        floatSpeed: Math.random() * 0.01 + 0.005,
        floatAmplitude: Math.random() * 2 + 1,
        initialY: mesh.position.y,
      });

      scene.add(mesh);
    }

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight1 = new THREE.DirectionalLight(0x86e293, 1);
    directionalLight1.position.set(10, 10, 5);
    scene.add(directionalLight1);

    const directionalLight2 = new THREE.DirectionalLight(0x86e6c6, 0.8);
    directionalLight2.position.set(-10, -10, -5);
    scene.add(directionalLight2);

    const pointLight = new THREE.PointLight(0x10b981, 1, 100);
    pointLight.position.set(0, 0, 0);
    scene.add(pointLight);

    window.addEventListener("resize", () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });
  }

  function animate() {
    animationFrameId = requestAnimationFrame(animate);

    const time = Date.now() * 0.001;

    if (particleSystem) {
      particleSystem.rotation.y += 0.0005;
      particleSystem.rotation.x += 0.0003;

      const positions = particleSystem.geometry.attributes.position.array;
      for (let i = 1; i < positions.length; i += 3) {
        positions[i] += Math.sin(time + positions[i]) * 0.01;
      }
      particleSystem.geometry.attributes.position.needsUpdate = true;
    }

    geometricShapes.forEach((shape, index) => {
      shape.mesh.rotation.x += shape.rotationSpeed.x;
      shape.mesh.rotation.y += shape.rotationSpeed.y;
      shape.mesh.rotation.z += shape.rotationSpeed.z;

      shape.mesh.position.y =
        shape.initialY + Math.sin(time * shape.floatSpeed + index) * shape.floatAmplitude;

      shape.mesh.position.x += mouseX * 0.1;
      shape.mesh.position.y += mouseY * 0.1;

      const distance = shape.mesh.position.distanceTo(camera.position);
      const scale = 1 + Math.sin(time + index) * 0.1;
      shape.mesh.scale.set(scale, scale, scale);
    });

    camera.position.x += (mouseX * 2 - camera.position.x) * 0.05;
    camera.position.y += (-mouseY * 2 - camera.position.y) * 0.05;
    camera.position.z = 30 + scrollY * 0.01;
    camera.rotation.z = mouseX * 0.01;
    camera.lookAt(scene.position);

    renderer.render(scene, camera);
  }
</script>

<div class="relative min-h-screen overflow-hidden bg-black text-white">
  <canvas
    bind:this={canvasRef}
    class="fixed inset-0 z-0"
  ></canvas>

  <div class="relative z-10">
    <section class="flex min-h-screen flex-col items-center justify-center px-4 text-center">
      <div
        class="mb-8 animate-fade-in-up"
        style="animation-delay: 0.2s"
      >
        <img
          src="/cam-hack-logo-text.png"
          alt="Cam Hack Logo"
          class="mx-auto mb-8 h-32 w-auto sm:h-40 md:h-48"
        />
      </div>

      <h1
        class="mb-4 bg-gradient-to-r from-emerald-400 via-green-300 to-emerald-500 bg-clip-text text-5xl font-bold text-transparent sm:text-6xl md:text-7xl lg:text-8xl animate-fade-in-up"
        style="animation-delay: 0.4s"
      >
        Cam Hack 2025
      </h1>

      <h2
        class="mb-8 text-2xl text-emerald-300 sm:text-3xl md:text-4xl animate-fade-in-up"
        style="animation-delay: 0.6s"
      >
        1st &ndash; 2nd November
      </h2>

      <div
        class="mb-12 rounded-2xl bg-gradient-to-r from-emerald-900/40 to-green-800/40 p-8 backdrop-blur-md animate-fade-in-up border border-emerald-500/30 shadow-lg shadow-emerald-500/20"
        style="animation-delay: 0.8s"
      >
        <div class="text-6xl font-bold text-emerald-300 sm:text-7xl md:text-8xl transition-transform duration-300 hover:scale-110">
          {countdownDays}
        </div>
        <div class="mt-2 text-xl text-emerald-200 sm:text-2xl">
          {countdownDays === 1 ? "Day" : "Days"} Since the Event
        </div>
      </div>

      <p
        class="mb-8 max-w-2xl text-xl text-emerald-100 sm:text-2xl animate-fade-in-up"
        style="animation-delay: 1s"
      >
        What can you make in 2 days?
      </p>

      <div
        class="flex flex-wrap justify-center gap-4 animate-fade-in-up"
        style="animation-delay: 1.2s"
      >
        <a
          target="_blank"
          href="/discord"
          class="group relative overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-500 to-green-500 px-8 py-4 text-lg font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-emerald-500/50"
        >
          <span class="relative z-10">Join the Discord!</span>
          <div
            class="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-500 opacity-0 transition-opacity group-hover:opacity-100"
          ></div>
        </a>
        <a
          target="_blank"
          href="/signup"
          class="cursor-not-allowed rounded-2xl bg-gray-700/50 px-8 py-4 text-lg font-semibold text-gray-400 backdrop-blur-sm"
        >
          Signups closed
        </a>
      </div>
    </section>

    <section
      id="about"
      class="section-fade-in relative min-h-screen bg-gradient-to-b from-black via-emerald-950/20 to-black px-4 py-20"
    >
      <div class="mx-auto max-w-7xl">
        <h2
          class="mb-8 text-center text-4xl font-bold text-emerald-300 sm:text-5xl md:text-6xl"
        >
          About
        </h2>
        <div class="mx-auto max-w-4xl space-y-6 text-lg text-emerald-100 sm:text-xl">
          <p>
            Cam Hack is a 2 day hackathon for the innovative minds at the
            University of Cambridge. Over an action-packed weekend, students come
            together to design and build technology projects from the ground up. We
            welcome participants ranging from curious beginners to seasoned coders.
            Expect plenty of free stash, food, and mini-events throughout this
            hackathon.
          </p>
          <p>
            For the winning team, each person will receive £200 and can choose from
            a range of prizes including: smartwatches, Steam vouchers, Amazon
            vouchers, or Sony XM4 headphones.
          </p>
        </div>
      </div>
    </section>

    <section
      id="featured-projects"
      class="section-fade-in relative min-h-screen bg-gradient-to-b from-black via-green-950/20 to-black px-4 py-20"
    >
      <div class="mx-auto max-w-7xl">
        <h2
          class="mb-16 text-center text-4xl font-bold text-emerald-300 sm:text-5xl md:text-6xl"
        >
          Featured Projects
        </h2>
        <div
          class="grid gap-8 sm:grid-cols-2 lg:grid-cols-2"
        >
          {#each featuredProjects as project, index}
            <div
              class="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-900/30 to-green-900/30 p-8 backdrop-blur-md transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-emerald-500/20 hover:-translate-y-2"
              style="animation-delay: {index * 0.1}s"
            >
              <div
                class="absolute inset-0 bg-gradient-to-r from-emerald-500/0 via-emerald-500/10 to-emerald-500/0 opacity-0 transition-opacity group-hover:opacity-100"
              ></div>
              <h3 class="relative z-10 mb-4 text-2xl font-bold text-emerald-300">
                {project.title}
              </h3>
              <p class="relative z-10 mb-4 text-emerald-100">
                {project.description}
              </p>
              <div class="relative z-10 flex flex-wrap gap-2">
                {#each project.tags as tag}
                  <span
                    class="rounded-full bg-emerald-800/50 px-4 py-1 text-sm text-emerald-200"
                  >
                    {tag}
                  </span>
                {/each}
              </div>
            </div>
          {/each}
        </div>
      </div>
    </section>

    <section
      id="schedule"
      class="section-fade-in relative min-h-screen bg-gradient-to-b from-black via-emerald-950/20 to-black px-4 py-20"
    >
      <div class="mx-auto max-w-7xl">
        <h2
          class="mb-12 text-center text-4xl font-bold text-emerald-300 sm:text-5xl md:text-6xl"
        >
          Schedule
        </h2>
        <div class="mx-auto grid max-w-5xl gap-8 sm:grid-cols-2">
          <div
            class="rounded-3xl bg-gradient-to-br from-emerald-900/30 to-green-900/30 p-8 backdrop-blur-md"
          >
            <h4 class="mb-6 text-2xl font-bold text-emerald-300">
              Saturday 1st November
            </h4>
            <ul class="space-y-3 text-emerald-100">
              <li>
                <strong class="text-emerald-300">09:30</strong> &bull;{" "}
                <em>Breakfast</em>
              </li>
              <li>
                <strong class="text-emerald-300">10:00</strong> &bull; Opening
                Ceremony
              </li>
              <li>
                <strong class="text-emerald-300">10:30</strong> &bull; Hacking
                begins!
              </li>
              <li>
                <strong class="text-emerald-300">13:00</strong> &bull;{" "}
                <em>Lunch</em>
              </li>
              <li>
                <strong class="text-emerald-300">18:00</strong> &bull;{" "}
                <em>Dinner</em>
              </li>
            </ul>
          </div>
          <div
            class="rounded-3xl bg-gradient-to-br from-emerald-900/30 to-green-900/30 p-8 backdrop-blur-md"
          >
            <h4 class="mb-6 text-2xl font-bold text-emerald-300">
              Sunday 2nd November
            </h4>
            <ul class="space-y-3 text-emerald-100">
              <li>
                <strong class="text-emerald-300">09:30</strong> &bull;{" "}
                <em>Breakfast</em>
              </li>
              <li>
                <strong class="text-emerald-300">13:00</strong> &bull;{" "}
                <em>Lunch</em>
              </li>
              <li>
                <strong class="text-emerald-300">16:30</strong> &bull; Hacking
                ends!
              </li>
              <li>
                <strong class="text-emerald-300">17:00</strong> &bull;{" "}
                <em>Dinner</em>
              </li>
              <li>
                <strong class="text-emerald-300">18:00</strong> &bull; Judging
                ends
              </li>
              <li>
                <strong class="text-emerald-300">18:30</strong> &bull; Closing
                ceremony
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <section
      id="sponsors"
      class="section-fade-in relative min-h-screen bg-gradient-to-b from-black via-green-950/20 to-black px-4 py-20"
    >
      <div class="mx-auto max-w-7xl">
        <h3
          class="mb-12 text-center text-3xl font-bold text-emerald-300 sm:text-4xl"
        >
          Sponsored by
        </h3>
        <div
          class="mb-12 grid grid-cols-2 place-items-center gap-8 sm:grid-cols-3 lg:grid-cols-4"
        >
          <a
            target="_blank"
            href="https://www.anthropic.com"
            class="transition-transform hover:scale-110"
          >
            <img
              src="/anthropic-logo.png"
              alt="Anthropic"
              class="h-auto w-3/5"
            />
          </a>
          <a
            target="_blank"
            href="https://www.joinef.com"
            class="transition-transform hover:scale-110"
          >
            <img
              src="/entrepreneur-first-logo.png"
              alt="Entrepreneur First"
              class="h-auto w-2/5"
            />
          </a>
          <a
            target="_blank"
            href="https://janestreet.com"
            class="transition-transform hover:scale-110"
          >
            <img
              src="/jane-street-logo.png"
              alt="Jane Street"
              class="h-auto w-11/12"
            />
          </a>
          <a
            target="_blank"
            href="https://founders.cam.ac.uk"
            class="transition-transform hover:scale-110"
          >
            <img
              src="/founders-logo.png"
              alt="Founders at the University of Cambridge"
              class="h-auto w-11/12"
            />
          </a>
          <a
            target="_blank"
            href="https://www.qube-rt.com"
            class="transition-transform hover:scale-110"
          >
            <img
              src="/qube-rt-logo.png"
              alt="Qube RT"
              class="h-auto w-3/5"
            />
          </a>
          <a
            target="_blank"
            href="https://sierra.ai"
            class="transition-transform hover:scale-110"
          >
            <img
              src="/sierra-logo.png"
              alt="Sierra"
              class="h-auto w-3/5"
            />
          </a>
          <a
            target="_blank"
            href="https://tpp-uk.com"
            class="transition-transform hover:scale-110"
          >
            <img
              src="/tpp-logo.png"
              alt="TPP UK"
              class="h-auto w-3/5"
            />
          </a>
        </div>
        <div class="text-center">
          <h3 class="mb-4 text-2xl font-bold text-emerald-300 sm:text-3xl">
            Run by
          </h3>
          <a
            target="_blank"
            href="https://cucats.org"
            class="inline-block transition-transform hover:scale-110"
          >
            <img
              src="/cucats-logo-gradient-full.png"
              alt="Cambridge University Computing and Technology Society First"
              class="h-auto w-1/4"
            />
          </a>
        </div>
      </div>
    </section>
  </div>
</div>

<style>
  @keyframes fade-in-up {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes fade-in-scale {
    from {
      opacity: 0;
      transform: scale(0.9) translateY(20px);
    }
    to {
      opacity: 1;
      transform: scale(1) translateY(0);
    }
  }

  @keyframes slide-in-left {
    from {
      opacity: 0;
      transform: translateX(-50px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @keyframes slide-in-right {
    from {
      opacity: 0;
      transform: translateX(50px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  .animate-fade-in-up {
    animation: fade-in-up 1s ease-out forwards;
    opacity: 0;
  }

  .section-fade-in {
    opacity: 0;
    transform: translateY(50px);
    transition: opacity 1s ease-out, transform 1s ease-out;
  }

  .section-fade-in.section-visible {
    opacity: 1;
    transform: translateY(0);
  }

  .section-fade-in.section-visible > div > h2 {
    animation: fade-in-up 0.8s ease-out forwards;
  }

  .section-fade-in.section-visible > div > div {
    animation: fade-in-scale 1s ease-out forwards;
    animation-delay: 0.2s;
    opacity: 0;
  }
</style>