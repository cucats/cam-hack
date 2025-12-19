<script>
  import { onMount, onDestroy } from "svelte";
  import { browser } from "$app/environment";

  let container;
  let scene, camera, renderer, particles, geometries, clock;
  let animationId;
  let mouse = { x: 0, y: 0 };
  let mounted = $state(false);

  onMount(async () => {
    if (!browser) return;

    const THREE = await import("three");
    mounted = true;

    await new Promise((r) => setTimeout(r, 0));

    init(THREE);
    animate(THREE);
    window.addEventListener("resize", onWindowResize);
    window.addEventListener("mousemove", onMouseMove);
  });

  onDestroy(() => {
    if (!browser) return;
    window.removeEventListener("resize", onWindowResize);
    window.removeEventListener("mousemove", onMouseMove);
    if (animationId) cancelAnimationFrame(animationId);
    if (renderer) {
      renderer.dispose();
      renderer.forceContextLoss();
    }
  });

  function init(THREE) {
    if (!container) return;

    clock = new THREE.Clock();
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000,
    );
    camera.position.z = 30;

    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const particleCount = 2000;
    const particleGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);

    const colorPalette = [
      new THREE.Color(0x00ff88),
      new THREE.Color(0x0a9254),
      new THREE.Color(0x9945ff),
      new THREE.Color(0x00d4ff),
    ];

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 100;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 100;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 100;

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

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.15,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
    });

    particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    geometries = [];
    const shapeCount = 15;
    for (let i = 0; i < shapeCount; i++) {
      let geometry;
      const shapeType = Math.floor(Math.random() * 4);
      switch (shapeType) {
        case 0:
          geometry = new THREE.IcosahedronGeometry(Math.random() * 2 + 1, 0);
          break;
        case 1:
          geometry = new THREE.OctahedronGeometry(Math.random() * 2 + 1, 0);
          break;
        case 2:
          geometry = new THREE.TetrahedronGeometry(Math.random() * 2 + 1, 0);
          break;
        default:
          geometry = new THREE.TorusGeometry(
            Math.random() * 1.5 + 0.5,
            0.3,
            8,
            16,
          );
      }

      const color =
        colorPalette[Math.floor(Math.random() * colorPalette.length)];
      const material = new THREE.MeshBasicMaterial({
        color: color,
        wireframe: true,
        transparent: true,
        opacity: 0.4,
      });

      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(
        (Math.random() - 0.5) * 60,
        (Math.random() - 0.5) * 60,
        (Math.random() - 0.5) * 30,
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
        floatSpeed: Math.random() * 0.5 + 0.2,
        floatOffset: Math.random() * Math.PI * 2,
      };
      geometries.push(mesh);
      scene.add(mesh);
    }

    const lineCount = 20;
    for (let i = 0; i < lineCount; i++) {
      const points = [];
      const startPoint = new THREE.Vector3(
        (Math.random() - 0.5) * 80,
        (Math.random() - 0.5) * 80,
        (Math.random() - 0.5) * 40,
      );
      const endPoint = new THREE.Vector3(
        startPoint.x + (Math.random() - 0.5) * 30,
        startPoint.y + (Math.random() - 0.5) * 30,
        startPoint.z + (Math.random() - 0.5) * 15,
      );
      points.push(startPoint, endPoint);

      const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
      const lineMaterial = new THREE.LineBasicMaterial({
        color: colorPalette[Math.floor(Math.random() * colorPalette.length)],
        transparent: true,
        opacity: 0.2,
      });
      const line = new THREE.Line(lineGeometry, lineMaterial);
      scene.add(line);
    }
  }

  function animate(THREE) {
    animationId = requestAnimationFrame(() => animate(THREE));
    const elapsed = clock.getElapsedTime();

    if (particles) {
      particles.rotation.x += 0.0003;
      particles.rotation.y += 0.0005;

      const positions = particles.geometry.attributes.position.array;
      for (let i = 0; i < positions.length; i += 3) {
        positions[i + 1] += Math.sin(elapsed + i) * 0.002;
      }
      particles.geometry.attributes.position.needsUpdate = true;
    }

    geometries.forEach((mesh) => {
      mesh.rotation.x += mesh.userData.rotationSpeed.x;
      mesh.rotation.y += mesh.userData.rotationSpeed.y;
      mesh.rotation.z += mesh.userData.rotationSpeed.z;
      mesh.position.y +=
        Math.sin(
          elapsed * mesh.userData.floatSpeed + mesh.userData.floatOffset,
        ) * 0.01;
    });

    camera.position.x += (mouse.x * 5 - camera.position.x) * 0.02;
    camera.position.y += (-mouse.y * 5 - camera.position.y) * 0.02;
    camera.lookAt(scene.position);

    renderer.render(scene, camera);
  }

  function onWindowResize() {
    if (!camera || !renderer) return;
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }

  function onMouseMove(event) {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = (event.clientY / window.innerHeight) * 2 - 1;
  }
</script>

{#if browser}
  <div bind:this={container} class="three-container"></div>
{:else}
  <div class="three-container"></div>
{/if}

<style>
  .three-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    background: linear-gradient(135deg, #0d1117 0%, #161b22 50%, #0d1117 100%);
  }

  .three-container :global(canvas) {
    display: block;
  }
</style>
