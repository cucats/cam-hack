<script>
  import { onMount } from "svelte";
  import * as THREE from "three";

  let container;
  let scene, camera, renderer, particles, lines, geometricShapes = [];
  let mouseX = 0, mouseY = 0;
  let windowHalfX = 0, windowHalfY = 0;

  onMount(() => {
    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;

    init();
    animate();

    window.addEventListener("resize", onWindowResize);
    document.addEventListener("mousemove", onDocumentMouseMove);

    return () => {
      window.removeEventListener("resize", onWindowResize);
      document.removeEventListener("mousemove", onDocumentMouseMove);
      if (renderer) {
        renderer.dispose();
      }
    };
  });

  function init() {
    scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x000000, 0.0012);

    camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      1,
      10000
    );
    camera.position.z = 1000;

    const particleCount = 5000;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);

    const greenShades = [
      new THREE.Color(0x10b981),
      new THREE.Color(0x34d399),
      new THREE.Color(0x6ee7b7),
      new THREE.Color(0x84cc16),
      new THREE.Color(0x059669),
      new THREE.Color(0x06b6d4),
    ];

    for (let i = 0; i < particleCount * 3; i += 3) {
      const radius = Math.random() * 2000 + 1000;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;

      positions[i] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i + 2] = radius * Math.cos(phi);

      const color = greenShades[Math.floor(Math.random() * greenShades.length)];
      colors[i] = color.r;
      colors[i + 1] = color.g;
      colors[i + 2] = color.b;

      sizes[i / 3] = Math.random() * 4 + 1;
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute("size", new THREE.BufferAttribute(sizes, 1));

    const material = new THREE.PointsMaterial({
      size: 3,
      vertexColors: true,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending,
    });

    particles = new THREE.Points(geometry, material);
    scene.add(particles);

    const lineGeometry = new THREE.BufferGeometry();
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x10b981,
      transparent: true,
      opacity: 0.15,
      blending: THREE.AdditiveBlending,
    });

    const linePositions = [];
    for (let i = 0; i < 400; i++) {
      const radius = Math.random() * 2000 + 500;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;

      linePositions.push(
        radius * Math.sin(phi) * Math.cos(theta),
        radius * Math.sin(phi) * Math.sin(theta),
        radius * Math.cos(phi)
      );
    }

    lineGeometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(linePositions, 3)
    );
    lines = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(lines);

    const torusGeometry = new THREE.TorusGeometry(100, 20, 16, 100);
    const torusMaterial = new THREE.MeshBasicMaterial({
      color: 0x10b981,
      wireframe: true,
      transparent: true,
      opacity: 0.3,
    });
    const torus = new THREE.Mesh(torusGeometry, torusMaterial);
    torus.position.set(-500, 300, -1000);
    scene.add(torus);
    geometricShapes.push({ mesh: torus, speed: { x: 0.002, y: 0.003 } });

    const octahedronGeometry = new THREE.OctahedronGeometry(80);
    const octahedronMaterial = new THREE.MeshBasicMaterial({
      color: 0x34d399,
      wireframe: true,
      transparent: true,
      opacity: 0.3,
    });
    const octahedron = new THREE.Mesh(octahedronGeometry, octahedronMaterial);
    octahedron.position.set(400, -200, -800);
    scene.add(octahedron);
    geometricShapes.push({ mesh: octahedron, speed: { x: 0.004, y: 0.002 } });

    const icosahedronGeometry = new THREE.IcosahedronGeometry(60);
    const icosahedronMaterial = new THREE.MeshBasicMaterial({
      color: 0x6ee7b7,
      wireframe: true,
      transparent: true,
      opacity: 0.3,
    });
    const icosahedron = new THREE.Mesh(icosahedronGeometry, icosahedronMaterial);
    icosahedron.position.set(-300, -400, -1200);
    scene.add(icosahedron);
    geometricShapes.push({ mesh: icosahedron, speed: { x: 0.003, y: 0.004 } });

    const ringGeometry = new THREE.RingGeometry(50, 100, 32);
    const ringMaterial = new THREE.MeshBasicMaterial({
      color: 0x84cc16,
      wireframe: true,
      transparent: true,
      opacity: 0.3,
      side: THREE.DoubleSide,
    });
    const ring = new THREE.Mesh(ringGeometry, ringMaterial);
    ring.position.set(600, 400, -900);
    scene.add(ring);
    geometricShapes.push({ mesh: ring, speed: { x: 0.002, y: 0.005 } });

    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 1);
    container.appendChild(renderer.domElement);
  }

  function onDocumentMouseMove(event) {
    mouseX = event.clientX - windowHalfX;
    mouseY = event.clientY - windowHalfY;
  }

  function onWindowResize() {
    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
  }

  function animate() {
    requestAnimationFrame(animate);

    const time = Date.now() * 0.00005;

    camera.position.x += (mouseX * 0.3 - camera.position.x) * 0.05;
    camera.position.y += (-mouseY * 0.3 - camera.position.y) * 0.05;
    camera.lookAt(scene.position);

    particles.rotation.x = time * 0.3;
    particles.rotation.y = time * 0.5;

    if (lines) {
      lines.rotation.x = time * 0.2;
      lines.rotation.y = time * 0.3;
    }

    geometricShapes.forEach((shape) => {
      shape.mesh.rotation.x += shape.speed.x;
      shape.mesh.rotation.y += shape.speed.y;
      shape.mesh.position.y += Math.sin(time * 2 + shape.mesh.position.x * 0.001) * 0.5;
    });

    const positions = particles.geometry.attributes.position.array;
    for (let i = 0; i < positions.length; i += 3) {
      const x = positions[i];
      const y = positions[i + 1];
      const z = positions[i + 2];

      positions[i] += Math.sin(time * 3 + y * 0.01) * 0.1;
      positions[i + 1] += Math.cos(time * 2 + x * 0.01) * 0.1;
      positions[i + 2] += Math.sin(time * 4 + z * 0.01) * 0.1;
    }
    particles.geometry.attributes.position.needsUpdate = true;

    renderer.render(scene, camera);
  }
</script>

<div bind:this={container} class="three-container"></div>

<style>
  .three-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: -1;
    overflow: hidden;
  }

  .three-container :global(canvas) {
    display: block;
  }
</style>
