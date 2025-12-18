<script>
  import { onMount, onDestroy } from "svelte";
  import * as THREE from "three";

  let container;
  let animationId;
  let scene, camera, renderer;
  let particles, particleGeometry, particleMaterial;
  let geometricShapes = [];
  let mouseX = 0;
  let mouseY = 0;
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
    container.appendChild(renderer.domElement);

    createParticles();
    createGeometricShapes();
    createAmbientLights();

    window.addEventListener("resize", onWindowResize);
    window.addEventListener("mousemove", onMouseMove);
  }

  function createParticles() {
    const particleCount = 2000;
    particleGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);

    const colorPalette = [
      new THREE.Color(0x10b981),
      new THREE.Color(0x00fff2),
      new THREE.Color(0x8b5cf6),
      new THREE.Color(0x059669),
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

    particleGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3),
    );
    particleGeometry.setAttribute(
      "color",
      new THREE.BufferAttribute(colors, 3),
    );
    particleGeometry.setAttribute("size", new THREE.BufferAttribute(sizes, 1));

    particleMaterial = new THREE.PointsMaterial({
      size: 1.5,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
    });

    particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);
  }

  function createGeometricShapes() {
    const geometries = [
      new THREE.IcosahedronGeometry(3, 0),
      new THREE.OctahedronGeometry(2.5, 0),
      new THREE.TetrahedronGeometry(2, 0),
      new THREE.TorusGeometry(2, 0.5, 8, 16),
      new THREE.DodecahedronGeometry(2, 0),
    ];

    const wireframeMaterial = new THREE.MeshBasicMaterial({
      color: 0x10b981,
      wireframe: true,
      transparent: true,
      opacity: 0.3,
    });

    for (let i = 0; i < 15; i++) {
      const geometry =
        geometries[Math.floor(Math.random() * geometries.length)];
      const hue = Math.random();
      const material = new THREE.MeshBasicMaterial({
        color: new THREE.Color().setHSL(hue * 0.3 + 0.45, 0.8, 0.5),
        wireframe: true,
        transparent: true,
        opacity: 0.2 + Math.random() * 0.3,
      });

      const mesh = new THREE.Mesh(geometry.clone(), material);
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
        originalY: mesh.position.y,
      };
      geometricShapes.push(mesh);
      scene.add(mesh);
    }
  }

  function createAmbientLights() {
    const light1 = new THREE.PointLight(0x10b981, 2, 100);
    light1.position.set(20, 20, 20);
    scene.add(light1);

    const light2 = new THREE.PointLight(0x00fff2, 2, 100);
    light2.position.set(-20, -20, 20);
    scene.add(light2);

    const light3 = new THREE.PointLight(0x8b5cf6, 1.5, 100);
    light3.position.set(0, 30, -20);
    scene.add(light3);
  }

  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }

  function onMouseMove(event) {
    mouseX = (event.clientX / window.innerWidth) * 2 - 1;
    mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
  }

  function animate() {
    animationId = requestAnimationFrame(animate);
    time += 0.01;

    if (particles) {
      particles.rotation.y += 0.0005;
      particles.rotation.x += 0.0002;

      const positions = particleGeometry.attributes.position.array;
      for (let i = 0; i < positions.length; i += 3) {
        positions[i + 1] += Math.sin(time + positions[i] * 0.01) * 0.02;
      }
      particleGeometry.attributes.position.needsUpdate = true;
    }

    geometricShapes.forEach((shape) => {
      shape.rotation.x += shape.userData.rotationSpeed.x;
      shape.rotation.y += shape.userData.rotationSpeed.y;
      shape.rotation.z += shape.userData.rotationSpeed.z;
      shape.position.y =
        shape.userData.originalY +
        Math.sin(
          time * shape.userData.floatSpeed + shape.userData.floatOffset,
        ) *
          3;
    });

    camera.position.x += (mouseX * 10 - camera.position.x) * 0.02;
    camera.position.y += (mouseY * 10 - camera.position.y) * 0.02;
    camera.lookAt(scene.position);

    renderer.render(scene, camera);
  }

  onMount(() => {
    init();
    animate();
  });

  onDestroy(() => {
    if (animationId) {
      cancelAnimationFrame(animationId);
    }
    if (renderer) {
      renderer.dispose();
    }
    window.removeEventListener("resize", onWindowResize);
    window.removeEventListener("mousemove", onMouseMove);
  });
</script>

<div
  bind:this={container}
  class="pointer-events-none fixed inset-0 -z-10"
></div>
