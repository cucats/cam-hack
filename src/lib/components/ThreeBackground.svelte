<script>
  import { onMount, onDestroy } from 'svelte';
  import { browser } from '$app/environment';

  let container;
  let scene, camera, renderer;
  let particles, particleGeometry;
  let geometricShapes = [];
  let mouseX = 0, mouseY = 0;
  let animationId;
  let clock;
  let THREE;

  onMount(async () => {
    if (!browser) return;
    
    THREE = await import('three');
    init();
    animate();
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('resize', onWindowResize);
  });

  onDestroy(() => {
    if (!browser) return;
    if (animationId) cancelAnimationFrame(animationId);
    window.removeEventListener('mousemove', onMouseMove);
    window.removeEventListener('resize', onWindowResize);
    if (renderer) {
      renderer.dispose();
      container?.removeChild(renderer.domElement);
    }
    if (particleGeometry) particleGeometry.dispose();
    geometricShapes.forEach(shape => {
      shape.geometry.dispose();
      shape.material.dispose();
    });
  });

  function init() {
    clock = new THREE.Clock();
    scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0a0a0a, 0.0008);

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
    camera.position.z = 1000;

    const particleCount = 2000;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);

    const primaryColor = new THREE.Color(0x00ff88);
    const accentColor = new THREE.Color(0x7c3aed);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 4000;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 4000;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 4000;

      const mixRatio = Math.random();
      const color = primaryColor.clone().lerp(accentColor, mixRatio);
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;

      sizes[i] = Math.random() * 4 + 1;
    }

    particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    particleGeometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    const particleMaterial = new THREE.PointsMaterial({
      size: 2,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true
    });

    particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    const geometries = [
      new THREE.IcosahedronGeometry(60, 0),
      new THREE.OctahedronGeometry(50, 0),
      new THREE.TetrahedronGeometry(55, 0),
      new THREE.DodecahedronGeometry(45, 0)
    ];

    for (let i = 0; i < 12; i++) {
      const geometry = geometries[i % geometries.length];
      const material = new THREE.MeshBasicMaterial({
        color: i % 2 === 0 ? 0x00ff88 : 0x7c3aed,
        wireframe: true,
        transparent: true,
        opacity: 0.3
      });

      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.x = (Math.random() - 0.5) * 3000;
      mesh.position.y = (Math.random() - 0.5) * 3000;
      mesh.position.z = (Math.random() - 0.5) * 2000 - 500;
      mesh.rotation.x = Math.random() * Math.PI;
      mesh.rotation.y = Math.random() * Math.PI;
      mesh.userData = {
        rotationSpeed: {
          x: (Math.random() - 0.5) * 0.01,
          y: (Math.random() - 0.5) * 0.01,
          z: (Math.random() - 0.5) * 0.01
        },
        floatSpeed: Math.random() * 0.5 + 0.5,
        floatOffset: Math.random() * Math.PI * 2
      };

      geometricShapes.push(mesh);
      scene.add(mesh);
    }

    for (let i = 0; i < 8; i++) {
      const ringGeometry = new THREE.TorusGeometry(100 + i * 30, 1, 16, 100);
      const ringMaterial = new THREE.MeshBasicMaterial({
        color: 0x00ff88,
        transparent: true,
        opacity: 0.1 - i * 0.01
      });
      const ring = new THREE.Mesh(ringGeometry, ringMaterial);
      ring.position.z = -500;
      ring.rotation.x = Math.PI / 2;
      ring.userData = {
        rotationSpeed: { x: 0, y: 0, z: 0.001 * (i % 2 === 0 ? 1 : -1) },
        floatSpeed: 0,
        floatOffset: 0
      };
      geometricShapes.push(ring);
      scene.add(ring);
    }

    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x0a0a0a, 1);
    container.appendChild(renderer.domElement);
  }

  function onMouseMove(event) {
    mouseX = (event.clientX - window.innerWidth / 2) * 0.5;
    mouseY = (event.clientY - window.innerHeight / 2) * 0.5;
  }

  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }

  function animate() {
    animationId = requestAnimationFrame(animate);

    const time = clock.getElapsedTime();

    camera.position.x += (mouseX - camera.position.x) * 0.02;
    camera.position.y += (-mouseY - camera.position.y) * 0.02;
    camera.lookAt(scene.position);

    particles.rotation.y += 0.0003;
    particles.rotation.x += 0.0001;

    geometricShapes.forEach((shape, index) => {
      shape.rotation.x += shape.userData.rotationSpeed.x;
      shape.rotation.y += shape.userData.rotationSpeed.y;
      shape.rotation.z += shape.userData.rotationSpeed.z;
      
      if (shape.userData.floatSpeed > 0) {
        shape.position.y += Math.sin(time * shape.userData.floatSpeed + shape.userData.floatOffset) * 0.5;
      }
    });

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

  .three-container :global(canvas) {
    display: block;
  }
</style>
