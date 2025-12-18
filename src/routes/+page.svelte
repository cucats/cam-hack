<script>
  import { onMount } from "svelte";
  import { browser } from "$app/environment";
  import { sponsors, organizers } from "$lib/components/sponsors-data.js";

  let canvasContainer;
  let daysSinceEvent = $state(0);
  let scrollY = $state(0);
  let visibleSections = $state({});

  const eventDate = new Date("2025-11-01T10:00:00");

  $effect(() => {
    if (browser) {
      const updateCountdown = () => {
        const now = new Date();
        const diff = now.getTime() - eventDate.getTime();
        daysSinceEvent = Math.floor(diff / (1000 * 60 * 60 * 24));
      };
      updateCountdown();
      const interval = setInterval(updateCountdown, 60000);
      return () => clearInterval(interval);
    }
  });

  onMount(async () => {
    const THREE = await import("three");
    const { gsap } = await import("gsap");

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000,
    );
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    canvasContainer.appendChild(renderer.domElement);

    const particleCount = 2000;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);
    const velocities = [];

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 100;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 100;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 50;

      const isGreen = Math.random() > 0.3;
      if (isGreen) {
        colors[i * 3] = 0;
        colors[i * 3 + 1] = 1;
        colors[i * 3 + 2] = 0.53;
      } else {
        colors[i * 3] = 0;
        colors[i * 3 + 1] = 0.83;
        colors[i * 3 + 2] = 1;
      }

      sizes[i] = Math.random() * 2 + 0.5;
      velocities.push({
        x: (Math.random() - 0.5) * 0.02,
        y: (Math.random() - 0.5) * 0.02,
        z: (Math.random() - 0.5) * 0.01,
      });
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute("size", new THREE.BufferAttribute(sizes, 1));

    const vertexShader = `
      attribute float size;
      attribute vec3 color;
      varying vec3 vColor;
      void main() {
        vColor = color;
        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        gl_PointSize = size * (300.0 / -mvPosition.z);
        gl_Position = projectionMatrix * mvPosition;
      }
    `;

    const fragmentShader = `
      varying vec3 vColor;
      void main() {
        float dist = length(gl_PointCoord - vec2(0.5));
        if (dist > 0.5) discard;
        float alpha = 1.0 - smoothstep(0.0, 0.5, dist);
        gl_FragColor = vec4(vColor, alpha * 0.8);
      }
    `;

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    const torusGeometry = new THREE.TorusGeometry(15, 0.3, 16, 100);
    const torusMaterial = new THREE.MeshBasicMaterial({
      color: 0x00ff88,
      transparent: true,
      opacity: 0.3,
      wireframe: true,
    });
    const torus = new THREE.Mesh(torusGeometry, torusMaterial);
    torus.position.z = -30;
    scene.add(torus);

    const torus2Geometry = new THREE.TorusGeometry(20, 0.2, 16, 100);
    const torus2Material = new THREE.MeshBasicMaterial({
      color: 0x00d4ff,
      transparent: true,
      opacity: 0.2,
      wireframe: true,
    });
    const torus2 = new THREE.Mesh(torus2Geometry, torus2Material);
    torus2.position.z = -40;
    torus2.rotation.x = Math.PI / 4;
    scene.add(torus2);

    const icosahedronGeometry = new THREE.IcosahedronGeometry(8, 1);
    const icosahedronMaterial = new THREE.MeshBasicMaterial({
      color: 0x00ff88,
      transparent: true,
      opacity: 0.15,
      wireframe: true,
    });
    const icosahedron = new THREE.Mesh(
      icosahedronGeometry,
      icosahedronMaterial,
    );
    icosahedron.position.z = -25;
    scene.add(icosahedron);

    camera.position.z = 30;

    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (event) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    const handleScroll = () => {
      scrollY = window.scrollY;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll);

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    const clock = new THREE.Clock();

    const animate = () => {
      requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      const positionAttribute = geometry.getAttribute("position");
      for (let i = 0; i < particleCount; i++) {
        positionAttribute.array[i * 3] += velocities[i].x;
        positionAttribute.array[i * 3 + 1] += velocities[i].y;
        positionAttribute.array[i * 3 + 2] += velocities[i].z;

        if (Math.abs(positionAttribute.array[i * 3]) > 50)
          velocities[i].x *= -1;
        if (Math.abs(positionAttribute.array[i * 3 + 1]) > 50)
          velocities[i].y *= -1;
        if (Math.abs(positionAttribute.array[i * 3 + 2]) > 25)
          velocities[i].z *= -1;
      }
      positionAttribute.needsUpdate = true;

      particles.rotation.y = elapsedTime * 0.02;
      particles.rotation.x = elapsedTime * 0.01;

      torus.rotation.x = elapsedTime * 0.1;
      torus.rotation.y = elapsedTime * 0.15;

      torus2.rotation.x = -elapsedTime * 0.08;
      torus2.rotation.z = elapsedTime * 0.12;

      icosahedron.rotation.x = elapsedTime * 0.05;
      icosahedron.rotation.y = elapsedTime * 0.07;

      camera.position.x += (mouseX * 5 - camera.position.x) * 0.05;
      camera.position.y += (mouseY * 5 - camera.position.y) * 0.05;
      camera.lookAt(scene.position);

      const scrollOffset = scrollY * 0.001;
      particles.position.y = -scrollOffset * 10;

      renderer.render(scene, camera);
    };

    animate();

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          visibleSections[entry.target.id] = true;
          gsap.fromTo(
            entry.target,
            { opacity: 0, y: 100 },
            { opacity: 1, y: 0, duration: 1, ease: "power3.out" },
          );
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      threshold: 0.1,
    });

    document.querySelectorAll("section[id]").forEach((section) => {
      observer.observe(section);
    });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      observer.disconnect();
      renderer.dispose();
    };
  });

  const faqItems = [
    {
      q: "What is a hackathon?",
      a: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      q: "What are the hackathon tracks?",
      a: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
    },
    {
      q: "Can I participate remotely?",
      a: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis aute irure dolor in reprehenderit in voluptate velit esse.",
    },
    {
      q: "How much does it cost?",
      a: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Excepteur sint occaecat cupidatat non proident.",
    },
    {
      q: "Where is it?",
      a: "Cam Hack 2025 will be in the Computer Laboratory, also known as the William Gates Building.",
    },
    {
      q: "I don't have a team!",
      a: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sunt in culpa qui officia deserunt mollit anim id est laborum.",
    },
  ];

  let expandedFaq = $state({});
</script>

<svelte:head>
  <title>Cam Hack 2025</title>
</svelte:head>

<div class="relative min-h-screen overflow-x-hidden bg-[#0a0a0a]">
  <div
    bind:this={canvasContainer}
    class="fixed inset-0 z-0"
    style="pointer-events: none;"
  ></div>

  <nav
    class="fixed top-0 right-0 left-0 z-50 border-b border-white/10 bg-[#0a0a0a]/80 backdrop-blur-xl"
  >
    <div class="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
      <a href="/" class="flex items-center gap-3">
        <img
          src="/cam-hack-logo-text.png"
          alt="Cam Hack Logo"
          class="h-12 w-12"
        />
        <span class="font-display text-xl font-bold text-[#00ff88]"
          >Cam Hack 2025</span
        >
      </a>
      <div class="hidden items-center gap-8 md:flex">
        <a
          href="#about"
          class="font-medium transition-colors hover:text-[#00ff88]">About</a
        >
        <a
          href="#schedule"
          class="font-medium transition-colors hover:text-[#00ff88]">Schedule</a
        >
        <a
          href="#projects"
          class="font-medium transition-colors hover:text-[#00ff88]">Projects</a
        >
        <a
          href="#faq"
          class="font-medium transition-colors hover:text-[#00ff88]">FAQ</a
        >
        <a
          href="/signup"
          class="rounded-full bg-gradient-to-r from-[#00ff88] to-[#00d4ff] px-6 py-2 font-semibold text-black transition-transform hover:scale-105"
          >Sign Up</a
        >
      </div>
    </div>
  </nav>

  <section
    class="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 pt-20"
  >
    <div class="animate-float mb-8">
      <img
        src="/cam-hack-logo-text.png"
        alt="Cam Hack Logo"
        class="mx-auto h-48 w-48 drop-shadow-[0_0_30px_rgba(0,255,136,0.5)] md:h-64 md:w-64"
      />
    </div>
    <h1
      class="font-display mb-4 text-center text-5xl font-black md:text-7xl lg:text-8xl"
    >
      <span class="gradient-text">Cam Hack</span>
      <span class="text-white">2025</span>
    </h1>
    <p class="font-display mb-8 text-2xl text-[#00d4ff] md:text-3xl">
      1st – 2nd November
    </p>
    <div
      class="mb-12 rounded-2xl border border-[#00ff88]/30 bg-[#0a0a0a]/50 px-8 py-6 backdrop-blur-sm"
    >
      <p
        class="mb-2 text-center text-sm tracking-widest text-white/60 uppercase"
      >
        Days Since Event
      </p>
      <p
        class="font-display glow-green text-center text-6xl font-black text-[#00ff88] md:text-8xl"
      >
        {daysSinceEvent}
      </p>
    </div>
    <p class="mb-8 text-center text-xl text-white/80 md:text-2xl">
      What can you make in 2 days?
    </p>
    <div class="flex flex-wrap justify-center gap-4">
      <a
        href="/discord"
        target="_blank"
        class="box-glow-green rounded-full border border-[#00ff88]/50 bg-[#00ff88]/10 px-8 py-4 font-semibold text-[#00ff88] transition-all hover:scale-105 hover:bg-[#00ff88]/20"
      >
        Join the Discord!
      </a>
      <a
        href="/signup"
        class="rounded-full bg-gradient-to-r from-[#00ff88] to-[#00d4ff] px-8 py-4 font-semibold text-black transition-transform hover:scale-105"
      >
        Sign Up Now
      </a>
    </div>
    <div class="absolute bottom-10 animate-bounce">
      <svg
        class="h-8 w-8 text-[#00ff88]"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M19 14l-7 7m0 0l-7-7m7 7V3"
        ></path>
      </svg>
    </div>
  </section>

  <section id="projects" class="section-dark relative z-10 py-24">
    <div class="mx-auto max-w-7xl">
      <h2
        class="font-display gradient-text mb-12 text-center text-4xl font-bold md:text-5xl"
      >
        Featured Projects
      </h2>
      <p class="mb-12 text-center text-xl text-white/70">
        Unintended Behaviour
      </p>
      <a
        target="_blank"
        href="https://cam-hack-2025.devpost.com"
        class="group relative block overflow-hidden rounded-3xl"
      >
        <div
          class="absolute inset-0 bg-gradient-to-r from-[#00ff88]/20 to-[#00d4ff]/20 opacity-0 transition-opacity group-hover:opacity-100"
        ></div>
        <img
          src="/unintended.png"
          alt="Unintended Behaviour"
          class="w-full rounded-3xl transition-transform duration-500 group-hover:scale-[1.02]"
        />
        <div
          class="absolute inset-0 rounded-3xl border-2 border-transparent transition-colors group-hover:border-[#00ff88]/50"
        ></div>
      </a>
    </div>
  </section>

  <section id="sponsors" class="section-surface relative z-10 py-24">
    <div class="mx-auto max-w-7xl">
      <h2
        class="font-display gradient-text mb-16 text-center text-4xl font-bold md:text-5xl"
      >
        Sponsored By
      </h2>
      <div
        class="mb-16 grid grid-cols-2 place-items-center gap-8 sm:grid-cols-3 lg:grid-cols-4"
      >
        {#each sponsors as sponsor, i}
          <a
            href={sponsor.url}
            target="_blank"
            class="group relative rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-all hover:scale-105 hover:border-[#00ff88]/30 hover:bg-white/10"
            style="animation-delay: {i * 100}ms"
          >
            <img
              src={sponsor.logo}
              alt={sponsor.name}
              class="h-16 w-auto max-w-[150px] object-contain brightness-0 invert transition-all group-hover:brightness-100 group-hover:invert-0"
            />
          </a>
        {/each}
      </div>
      <div class="text-center">
        <h3 class="font-display mb-8 text-2xl text-[#00d4ff]">
          {organizers.runBy.title}
        </h3>
        <a href={organizers.runBy.url} target="_blank" class="inline-block">
          <img
            src={organizers.runBy.logo}
            alt={organizers.runBy.name}
            class="h-20 w-auto transition-transform hover:scale-105"
          />
        </a>
      </div>
    </div>
  </section>

  <section id="about" class="section-dark relative z-10 py-24 opacity-0">
    <div class="mx-auto max-w-4xl text-center">
      <h2
        class="font-display gradient-text mb-8 text-4xl font-bold md:text-5xl"
      >
        About
      </h2>
      <div class="space-y-6 text-lg leading-relaxed text-white/80">
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
    </div>
  </section>

  <section id="schedule" class="section-surface relative z-10 py-24 opacity-0">
    <div class="mx-auto max-w-6xl">
      <h2
        class="font-display gradient-text mb-16 text-center text-4xl font-bold md:text-5xl"
      >
        Schedule
      </h2>
      <div class="grid gap-12 md:grid-cols-2">
        <div
          class="box-glow-green rounded-3xl border border-[#00ff88]/20 bg-[#0a0a0a]/50 p-8"
        >
          <h3 class="font-display mb-6 text-2xl text-[#00ff88]">
            Saturday 1st November
          </h3>
          <ul class="space-y-4">
            <li class="flex items-center gap-4 border-b border-white/10 pb-4">
              <span class="font-mono text-[#00d4ff]">09:30</span>
              <span class="text-white/60">Breakfast</span>
            </li>
            <li class="flex items-center gap-4 border-b border-white/10 pb-4">
              <span class="font-mono text-[#00d4ff]">10:00</span>
              <span>Opening Ceremony</span>
            </li>
            <li class="flex items-center gap-4 border-b border-white/10 pb-4">
              <span class="font-mono text-[#00d4ff]">10:30</span>
              <span class="font-bold text-[#00ff88]">Hacking begins!</span>
            </li>
            <li class="flex items-center gap-4 border-b border-white/10 pb-4">
              <span class="font-mono text-[#00d4ff]">13:00</span>
              <span class="text-white/60">Lunch</span>
            </li>
            <li class="flex items-center gap-4">
              <span class="font-mono text-[#00d4ff]">18:00</span>
              <span class="text-white/60">Dinner</span>
            </li>
          </ul>
        </div>
        <div
          class="box-glow-cyan rounded-3xl border border-[#00d4ff]/20 bg-[#0a0a0a]/50 p-8"
        >
          <h3 class="font-display mb-6 text-2xl text-[#00d4ff]">
            Sunday 2nd November
          </h3>
          <ul class="space-y-4">
            <li class="flex items-center gap-4 border-b border-white/10 pb-4">
              <span class="font-mono text-[#00d4ff]">09:30</span>
              <span class="text-white/60">Breakfast</span>
            </li>
            <li class="flex items-center gap-4 border-b border-white/10 pb-4">
              <span class="font-mono text-[#00d4ff]">13:00</span>
              <span class="text-white/60">Lunch</span>
            </li>
            <li class="flex items-center gap-4 border-b border-white/10 pb-4">
              <span class="font-mono text-[#00d4ff]">16:30</span>
              <span class="font-bold text-[#00ff88]">Hacking ends!</span>
            </li>
            <li class="flex items-center gap-4 border-b border-white/10 pb-4">
              <span class="font-mono text-[#00d4ff]">17:00</span>
              <span class="text-white/60">Dinner</span>
            </li>
            <li class="flex items-center gap-4 border-b border-white/10 pb-4">
              <span class="font-mono text-[#00d4ff]">18:00</span>
              <span>Judging ends</span>
            </li>
            <li class="flex items-center gap-4">
              <span class="font-mono text-[#00d4ff]">18:30</span>
              <span class="font-bold text-[#00ff88]">Closing ceremony</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>

  <section id="rules" class="section-dark relative z-10 py-24 opacity-0">
    <div class="mx-auto max-w-4xl">
      <h2
        class="font-display gradient-text mb-16 text-center text-4xl font-bold md:text-5xl"
      >
        Rules
      </h2>
      <div class="space-y-12">
        <div>
          <h3
            class="font-display mb-6 flex items-center gap-3 text-2xl text-[#00ff88]"
          >
            <span
              class="flex h-10 w-10 items-center justify-center rounded-full bg-[#00ff88]/20"
              >1</span
            >
            Entry
          </h3>
          <ul class="space-y-3 text-white/80">
            <li class="flex items-start gap-3">
              <span class="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-[#00ff88]"
              ></span>
              <span
                >Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Maximum team size is 5.</span
              >
            </li>
            <li class="flex items-start gap-3">
              <span class="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-[#00ff88]"
              ></span>
              <span
                >Lorem ipsum dolor sit amet. Participants must be students at
                the University of Cambridge.</span
              >
            </li>
          </ul>
        </div>
        <div>
          <h3
            class="font-display mb-6 flex items-center gap-3 text-2xl text-[#00d4ff]"
          >
            <span
              class="flex h-10 w-10 items-center justify-center rounded-full bg-[#00d4ff]/20"
              >2</span
            >
            House Rules
          </h3>
          <ul class="space-y-3 text-white/80">
            <li class="flex items-start gap-3">
              <span class="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-[#00d4ff]"
              ></span>
              <span>Lorem ipsum dolor sit amet, no food in Intel lab.</span>
            </li>
            <li class="flex items-start gap-3">
              <span class="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-[#00d4ff]"
              ></span>
              <span>Lorem ipsum, no alcohol at the hackathon.</span>
            </li>
            <li class="flex items-start gap-3">
              <span class="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-[#00d4ff]"
              ></span>
              <span
                >All participants must follow our
                <a
                  href="/code-of-conduct"
                  class="text-[#00ff88] hover:underline">Code of Conduct</a
                >.</span
              >
            </li>
          </ul>
        </div>
        <div>
          <h3
            class="font-display mb-6 flex items-center gap-3 text-2xl text-[#00ff88]"
          >
            <span
              class="flex h-10 w-10 items-center justify-center rounded-full bg-[#00ff88]/20"
              >3</span
            >
            Submission
          </h3>
          <ul class="space-y-3 text-white/80">
            <li class="flex items-start gap-3">
              <span class="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-[#00ff88]"
              ></span>
              <span
                >Lorem ipsum dolor sit amet, all work must be done at the
                hackathon.</span
              >
            </li>
            <li class="flex items-start gap-3">
              <span class="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-[#00ff88]"
              ></span>
              <span
                >Lorem ipsum, AI assistants are allowed when writing code.</span
              >
            </li>
            <li class="flex items-start gap-3">
              <span class="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-[#00ff88]"
              ></span>
              <span
                >Submissions will be made to
                <a
                  href="https://cam-hack-2025.devpost.com"
                  class="text-[#00ff88] hover:underline">Devpost</a
                >.</span
              >
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>

  <section id="faq" class="section-surface relative z-10 py-24 opacity-0">
    <div class="mx-auto max-w-4xl">
      <h2
        class="font-display gradient-text mb-16 text-center text-4xl font-bold md:text-5xl"
      >
        FAQ
      </h2>
      <div class="space-y-4">
        {#each faqItems as item, i}
          <div
            class="overflow-hidden rounded-2xl border border-white/10 bg-[#0a0a0a]/50 transition-all hover:border-[#00ff88]/30"
          >
            <button
              class="flex w-full items-center justify-between p-6 text-left"
              onclick={() => (expandedFaq[i] = !expandedFaq[i])}
            >
              <span class="font-semibold text-white">{item.q}</span>
              <svg
                class="h-6 w-6 flex-shrink-0 text-[#00ff88] transition-transform {expandedFaq[
                  i
                ]
                  ? 'rotate-180'
                  : ''}"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 9l-7 7-7-7"
                ></path>
              </svg>
            </button>
            {#if expandedFaq[i]}
              <div class="border-t border-white/10 bg-white/5 px-6 py-4">
                <p class="text-white/70">{item.a}</p>
              </div>
            {/if}
          </div>
        {/each}
      </div>
    </div>
  </section>

  <section id="organisers" class="section-dark relative z-10 py-24 opacity-0">
    <div class="mx-auto max-w-6xl">
      <h2
        class="font-display gradient-text mb-16 text-center text-4xl font-bold md:text-5xl"
      >
        Organising Committee
      </h2>
      <div class="flex flex-wrap justify-center gap-8">
        {#each [{ name: "James Leung", img: "/james.png" }, { name: "Uliana Ronska", img: "/uliana.jpg" }, { name: "Athena Eng", img: "/athena.jpg" }, { name: "Oliver Greenwood", img: "/oliver.png" }, { name: "Jadon Mensah", img: "/jadon.png" }] as organiser, i}
          <div
            class="group flex flex-col items-center"
            style="animation-delay: {i * 150}ms"
          >
            <div
              class="relative mb-4 overflow-hidden rounded-full p-1"
              style="background: linear-gradient(135deg, #00ff88, #00d4ff)"
            >
              <img
                src={organiser.img}
                alt={organiser.name}
                class="h-32 w-32 rounded-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div
                class="absolute inset-0 rounded-full bg-gradient-to-r from-[#00ff88]/0 to-[#00d4ff]/0 transition-all group-hover:from-[#00ff88]/20 group-hover:to-[#00d4ff]/20"
              ></div>
            </div>
            <p
              class="font-semibold text-white transition-colors group-hover:text-[#00ff88]"
            >
              {organiser.name}
            </p>
          </div>
        {/each}
      </div>
    </div>
  </section>

  <section class="section-surface relative z-10 border-t border-white/10 py-16">
    <div class="mx-auto max-w-4xl text-center">
      <h2 class="font-display gradient-text mb-8 text-3xl font-bold">
        Ready to Hack?
      </h2>
      <p class="mb-8 text-white/70">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
        tempor incididunt ut labore.
      </p>
      <div class="flex flex-wrap justify-center gap-4">
        <a
          href="/signup"
          class="rounded-full bg-gradient-to-r from-[#00ff88] to-[#00d4ff] px-8 py-4 font-semibold text-black transition-transform hover:scale-105"
        >
          Sign Up Now
        </a>
        <a
          href="/discord"
          target="_blank"
          class="rounded-full border border-[#00ff88]/50 bg-transparent px-8 py-4 font-semibold text-[#00ff88] transition-all hover:bg-[#00ff88]/10"
        >
          Join Discord
        </a>
      </div>
      <div
        class="mt-16 flex flex-wrap justify-center gap-6 text-sm text-white/50"
      >
        <a href="mailto:camhack@cucats.org" class="hover:text-[#00ff88]"
          >Contact</a
        >
        <span>•</span>
        <a href="/code-of-conduct" class="hover:text-[#00ff88]"
          >Code of Conduct</a
        >
      </div>
      <p class="mt-6 text-sm text-white/30">
        Copyright © Cam Hack 2025. Art by Gwen Sellers
      </p>
    </div>
  </section>
</div>
