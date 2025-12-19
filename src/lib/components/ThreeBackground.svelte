<script>
  import { onMount, onDestroy } from "svelte";
  import * as THREE from "three";

  let container;
  let animationId;
  let scene, camera, renderer;
  let particles,
    geometricShapes = [];
  let mouse = { x: 0, y: 0 };
  let time = 0;

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
    renderer.setClearColor(0x0a0a0f, 1);
    container.appendChild(renderer.domElement);

    createParticles();
    createGeometricShapes();
    createMatrixRain();

    window.addEventListener("resize", onWindowResize);
    window.addEventListener("mousemove", onMouseMove);
  }

  function createParticles() {
    const particleCount = 2000;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);

    const colorPalette = [
      new THREE.Color(0x10b981),
      new THREE.Color(0x34d399),
      new THREE.Color(0x6ee7b7),
      new THREE.Color(0xa78bfa),
      new THREE.Color(0x14b8a6),
    ];

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 200;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 200;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 200;

      const color =
        colorPalette[Math.floor(Math.random() * colorPalette.length)];
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;

      sizes[i] = Math.random() * 2 + 0.5;
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute("size", new THREE.BufferAttribute(sizes, 1));

    const material = new THREE.PointsMaterial({
      size: 0.5,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
    });

    particles = new THREE.Points(geometry, material);
    scene.add(particles);
  }

  function createGeometricShapes() {
    const shapeTypes = [
      new THREE.IcosahedronGeometry(3, 0),
      new THREE.OctahedronGeometry(2.5, 0),
      new THREE.TetrahedronGeometry(2, 0),
      new THREE.BoxGeometry(2, 2, 2),
      new THREE.TorusGeometry(2, 0.5, 8, 16),
    ];

    for (let i = 0; i < 15; i++) {
      const geometry =
        shapeTypes[Math.floor(Math.random() * shapeTypes.length)];
      const hue = 0.4 + Math.random() * 0.2;
      const material = new THREE.MeshBasicMaterial({
        color: new THREE.Color().setHSL(hue, 0.8, 0.5),
        wireframe: true,
        transparent: true,
        opacity: 0.3,
      });

      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(
        (Math.random() - 0.5) * 100,
        (Math.random() - 0.5) * 100,
        (Math.random() - 0.5) * 50 - 20,
      );
      mesh.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI,
      );
      mesh.userData = {
        rotationSpeed: {
          x: (Math.random() - 0.5) * 0.02,
          y: (Math.random() - 0.5) * 0.02,
          z: (Math.random() - 0.5) * 0.02,
        },
        floatSpeed: Math.random() * 0.5 + 0.5,
        floatOffset: Math.random() * Math.PI * 2,
      };

      geometricShapes.push(mesh);
      scene.add(mesh);
    }
  }

  function createMatrixRain() {
    const lineCount = 50;
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x10b981,
      transparent: true,
      opacity: 0.2,
    });

    for (let i = 0; i < lineCount; i++) {
      const points = [];
      const x = (Math.random() - 0.5) * 150;
      const z = (Math.random() - 0.5) * 100 - 30;
      const length = Math.random() * 20 + 10;

      points.push(new THREE.Vector3(x, 100, z));
      points.push(new THREE.Vector3(x, 100 - length, z));

      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      const line = new THREE.Line(geometry, lineMaterial);
      line.userData = { speed: Math.random() * 0.5 + 0.3, resetY: 100 };
      scene.add(line);
    }
  }

  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }

  function onMouseMove(event) {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  }

  function animate() {
    animationId = requestAnimationFrame(animate);
    time += 0.01;

    if (particles) {
      particles.rotation.y += 0.0005;
      particles.rotation.x += 0.0002;

      const positions = particles.geometry.attributes.position.array;
      for (let i = 0; i < positions.length; i += 3) {
        positions[i + 1] += Math.sin(time + positions[i] * 0.01) * 0.02;
      }
      particles.geometry.attributes.position.needsUpdate = true;
    }

    geometricShapes.forEach((shape) => {
      shape.rotation.x += shape.userData.rotationSpeed.x;
      shape.rotation.y += shape.userData.rotationSpeed.y;
      shape.rotation.z += shape.userData.rotationSpeed.z;
      shape.position.y +=
        Math.sin(
          time * shape.userData.floatSpeed + shape.userData.floatOffset,
        ) * 0.05;
    });

    camera.position.x += (mouse.x * 5 - camera.position.x) * 0.02;
    camera.position.y += (mouse.y * 5 - camera.position.y) * 0.02;
    camera.lookAt(scene.position);

    renderer.render(scene, camera);
  }

  onMount(() => {
    init();
    animate();
  });

  onDestroy(() => {
    cancelAnimationFrame(animationId);
    window.removeEventListener("resize", onWindowResize);
    window.removeEventListener("mousemove", onMouseMove);
    if (renderer) {
      renderer.dispose();
    }
  });
</script>

<div bind:this={container} class="three-container"></div>

<style>
  .three-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    pointer-events: none;
  }

  .three-container :global(canvas) {
    display: block;
  }
</style>
