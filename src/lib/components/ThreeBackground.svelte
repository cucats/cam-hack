<script>
  import { onMount, onDestroy } from "svelte";
  import { browser } from "$app/environment";

  let container;
  let scene, camera, renderer;
  let particles,
    wireframes = [];
  let animationId;
  let mouseX = 0,
    mouseY = 0;
  let THREE;

  onMount(async () => {
    if (!browser) return;

    THREE = await import("three");
    init();
    animate();

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("resize", onResize);
  });

  onDestroy(() => {
    if (!browser) return;
    cleanup();
  });

  function cleanup() {
    if (animationId) cancelAnimationFrame(animationId);
    if (browser) {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
    }
    if (renderer) {
      renderer.dispose();
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
    }
  }

  function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000,
    );
    camera.position.z = 50;

    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    createParticles();
    createWireframeShapes();
  }

  function createParticles() {
    const geometry = new THREE.BufferGeometry();
    const count = 2000;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);

    const color1 = new THREE.Color(0x10b981);
    const color2 = new THREE.Color(0x06b6d4);
    const color3 = new THREE.Color(0x8b5cf6);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 200;
      positions[i3 + 1] = (Math.random() - 0.5) * 200;
      positions[i3 + 2] = (Math.random() - 0.5) * 100;

      const colorChoice = Math.random();
      let color;
      if (colorChoice < 0.5) color = color1;
      else if (colorChoice < 0.8) color = color2;
      else color = color3;

      colors[i3] = color.r;
      colors[i3 + 1] = color.g;
      colors[i3 + 2] = color.b;

      sizes[i] = Math.random() * 2 + 0.5;
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute("size", new THREE.BufferAttribute(sizes, 1));

    const material = new THREE.PointsMaterial({
      size: 1.5,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
    });

    particles = new THREE.Points(geometry, material);
    scene.add(particles);
  }

  function createWireframeShapes() {
    const shapes = [
      {
        geometry: new THREE.IcosahedronGeometry(8, 0),
        position: { x: -30, y: 20, z: -20 },
      },
      {
        geometry: new THREE.OctahedronGeometry(6, 0),
        position: { x: 35, y: -15, z: -10 },
      },
      {
        geometry: new THREE.TetrahedronGeometry(7, 0),
        position: { x: -25, y: -25, z: -15 },
      },
      {
        geometry: new THREE.TorusGeometry(5, 1.5, 8, 16),
        position: { x: 30, y: 25, z: -25 },
      },
      {
        geometry: new THREE.DodecahedronGeometry(5, 0),
        position: { x: 0, y: -30, z: -20 },
      },
      {
        geometry: new THREE.BoxGeometry(6, 6, 6),
        position: { x: -40, y: 0, z: -30 },
      },
    ];

    shapes.forEach((shapeData, index) => {
      const edges = new THREE.EdgesGeometry(shapeData.geometry);
      const colors = [
        0x10b981, 0x06b6d4, 0x8b5cf6, 0x34d399, 0x22d3ee, 0x10b981,
      ];
      const material = new THREE.LineBasicMaterial({
        color: colors[index % colors.length],
        transparent: true,
        opacity: 0.6,
      });
      const wireframe = new THREE.LineSegments(edges, material);
      wireframe.position.set(
        shapeData.position.x,
        shapeData.position.y,
        shapeData.position.z,
      );
      wireframe.userData = {
        rotationSpeed: {
          x: (Math.random() - 0.5) * 0.01,
          y: (Math.random() - 0.5) * 0.01,
          z: (Math.random() - 0.5) * 0.01,
        },
        floatSpeed: Math.random() * 0.5 + 0.5,
        floatOffset: Math.random() * Math.PI * 2,
        originalY: shapeData.position.y,
      };
      wireframes.push(wireframe);
      scene.add(wireframe);
    });
  }

  function onMouseMove(event) {
    mouseX = (event.clientX / window.innerWidth) * 2 - 1;
    mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
  }

  function onResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }

  function animate() {
    animationId = requestAnimationFrame(animate);

    const time = Date.now() * 0.001;

    if (particles) {
      particles.rotation.y += 0.0005;
      particles.rotation.x += 0.0002;

      const positions = particles.geometry.attributes.position.array;
      for (let i = 0; i < positions.length; i += 3) {
        positions[i + 1] += Math.sin(time + positions[i] * 0.01) * 0.02;
      }
      particles.geometry.attributes.position.needsUpdate = true;
    }

    wireframes.forEach((wireframe) => {
      wireframe.rotation.x += wireframe.userData.rotationSpeed.x;
      wireframe.rotation.y += wireframe.userData.rotationSpeed.y;
      wireframe.rotation.z += wireframe.userData.rotationSpeed.z;

      wireframe.position.y =
        wireframe.userData.originalY +
        Math.sin(
          time * wireframe.userData.floatSpeed + wireframe.userData.floatOffset,
        ) *
          3;
    });

    camera.position.x += (mouseX * 10 - camera.position.x) * 0.02;
    camera.position.y += (mouseY * 10 - camera.position.y) * 0.02;
    camera.lookAt(scene.position);

    renderer.render(scene, camera);
  }
</script>

<div bind:this={container} class="three-container"></div>

<style>
  .three-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
    pointer-events: none;
  }

  .three-container :global(canvas) {
    display: block;
  }
</style>
