<script>
  import { onMount, onDestroy } from "svelte";
  import { browser } from "$app/environment";

  let container;
  let animationId;
  let scene, camera, renderer;
  let particles, lines, geometricShapes;
  let mouseX = 0,
    mouseY = 0;
  let time = 0;
  let THREE;

  onMount(async () => {
    if (!browser) return;

    THREE = await import("three");
    init();
    animate();
    window.addEventListener("resize", onWindowResize);
    window.addEventListener("mousemove", onMouseMove);
  });

  onDestroy(() => {
    if (!browser) return;
    if (animationId) cancelAnimationFrame(animationId);
    if (typeof window !== "undefined") {
      window.removeEventListener("resize", onWindowResize);
      window.removeEventListener("mousemove", onMouseMove);
    }
    if (renderer) {
      renderer.dispose();
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
    }
  });

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
    createGeometricShapes();
    createFloatingLines();
    createGlowingSpheres();
  }

  function createParticles() {
    const particleCount = 2000;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);

    const colorPalette = [
      new THREE.Color(0x22c55e),
      new THREE.Color(0x10b981),
      new THREE.Color(0x14b8a6),
      new THREE.Color(0x22d3ee),
      new THREE.Color(0x4ade80),
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

    const geometry = new THREE.BufferGeometry();
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

  function createGeometricShapes() {
    geometricShapes = new THREE.Group();

    const materials = [
      new THREE.MeshBasicMaterial({
        color: 0x22c55e,
        wireframe: true,
        transparent: true,
        opacity: 0.3,
      }),
      new THREE.MeshBasicMaterial({
        color: 0x10b981,
        wireframe: true,
        transparent: true,
        opacity: 0.3,
      }),
      new THREE.MeshBasicMaterial({
        color: 0x14b8a6,
        wireframe: true,
        transparent: true,
        opacity: 0.3,
      }),
    ];

    for (let i = 0; i < 15; i++) {
      let geometry;
      const shapeType = Math.floor(Math.random() * 4);

      switch (shapeType) {
        case 0:
          geometry = new THREE.IcosahedronGeometry(Math.random() * 3 + 1, 0);
          break;
        case 1:
          geometry = new THREE.OctahedronGeometry(Math.random() * 3 + 1, 0);
          break;
        case 2:
          geometry = new THREE.TetrahedronGeometry(Math.random() * 3 + 1, 0);
          break;
        default:
          geometry = new THREE.TorusGeometry(Math.random() * 2 + 1, 0.3, 8, 16);
      }

      const mesh = new THREE.Mesh(
        geometry,
        materials[Math.floor(Math.random() * materials.length)],
      );
      mesh.position.set(
        (Math.random() - 0.5) * 100,
        (Math.random() - 0.5) * 100,
        (Math.random() - 0.5) * 50,
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
      geometricShapes.add(mesh);
    }

    scene.add(geometricShapes);
  }

  function createFloatingLines() {
    lines = new THREE.Group();

    for (let i = 0; i < 30; i++) {
      const points = [];
      const startPoint = new THREE.Vector3(
        (Math.random() - 0.5) * 150,
        (Math.random() - 0.5) * 150,
        (Math.random() - 0.5) * 100,
      );

      for (let j = 0; j < 5; j++) {
        points.push(
          new THREE.Vector3(
            startPoint.x + (Math.random() - 0.5) * 20,
            startPoint.y + j * 5,
            startPoint.z + (Math.random() - 0.5) * 20,
          ),
        );
      }

      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      const material = new THREE.LineBasicMaterial({
        color: Math.random() > 0.5 ? 0x22c55e : 0x14b8a6,
        transparent: true,
        opacity: 0.4,
      });

      const line = new THREE.Line(geometry, material);
      line.userData = {
        speed: Math.random() * 0.5 + 0.2,
        offset: Math.random() * Math.PI * 2,
      };
      lines.add(line);
    }

    scene.add(lines);
  }

  function createGlowingSpheres() {
    const sphereGroup = new THREE.Group();

    for (let i = 0; i < 8; i++) {
      const geometry = new THREE.SphereGeometry(
        Math.random() * 1.5 + 0.5,
        16,
        16,
      );
      const material = new THREE.MeshBasicMaterial({
        color: 0x22c55e,
        transparent: true,
        opacity: 0.6,
      });

      const sphere = new THREE.Mesh(geometry, material);
      sphere.position.set(
        (Math.random() - 0.5) * 80,
        (Math.random() - 0.5) * 80,
        (Math.random() - 0.5) * 40,
      );
      sphere.userData = {
        pulseSpeed: Math.random() * 2 + 1,
        pulseOffset: Math.random() * Math.PI * 2,
        orbitRadius: Math.random() * 20 + 10,
        orbitSpeed: (Math.random() - 0.5) * 0.01,
        orbitOffset: Math.random() * Math.PI * 2,
      };
      sphereGroup.add(sphere);
    }

    scene.add(sphereGroup);
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

      const positions = particles.geometry.attributes.position.array;
      for (let i = 0; i < positions.length; i += 3) {
        positions[i + 1] += Math.sin(time + positions[i] * 0.01) * 0.02;
      }
      particles.geometry.attributes.position.needsUpdate = true;
    }

    if (geometricShapes) {
      geometricShapes.children.forEach((shape) => {
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
    }

    if (lines) {
      lines.children.forEach((line) => {
        line.rotation.y += 0.001;
        const positions = line.geometry.attributes.position.array;
        for (let i = 0; i < positions.length; i += 3) {
          positions[i] +=
            Math.sin(time * line.userData.speed + line.userData.offset + i) *
            0.02;
        }
        line.geometry.attributes.position.needsUpdate = true;
      });
    }

    scene.children.forEach((child) => {
      if (
        child instanceof THREE.Group &&
        child !== geometricShapes &&
        child !== lines
      ) {
        child.children.forEach((sphere) => {
          if (sphere.userData.pulseSpeed) {
            const pulse = Math.sin(
              time * sphere.userData.pulseSpeed + sphere.userData.pulseOffset,
            );
            sphere.scale.setScalar(1 + pulse * 0.2);
            sphere.material.opacity = 0.4 + pulse * 0.3;

            sphere.position.x +=
              Math.cos(
                time * sphere.userData.orbitSpeed + sphere.userData.orbitOffset,
              ) * 0.1;
            sphere.position.z +=
              Math.sin(
                time * sphere.userData.orbitSpeed + sphere.userData.orbitOffset,
              ) * 0.1;
          }
        });
      }
    });

    camera.position.x += (mouseX * 5 - camera.position.x) * 0.02;
    camera.position.y += (mouseY * 5 - camera.position.y) * 0.02;
    camera.lookAt(scene.position);

    renderer.render(scene, camera);
  }
</script>

{#if browser}
  <div bind:this={container} class="three-container"></div>
{/if}

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
</style>
