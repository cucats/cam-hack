<script>
  import { onMount, onDestroy } from 'svelte';
  import { browser } from '$app/environment';

  let container;
  let scene, camera, renderer;
  let particles, particleSystem;
  let mouseX = 0, mouseY = 0;
  let animationId;
  let clock;
  let geometryLines = [];
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
    if (renderer) renderer.dispose();
  });

  function init() {
    clock = new THREE.Clock();
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000);
    camera.position.z = 500;

    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    createParticles();
    createFloatingGeometry();
    createGridLines();
  }

  function createParticles() {
    const particleCount = 2000;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);

    const color1 = new THREE.Color(0x10b981);
    const color2 = new THREE.Color(0x34d399);
    const color3 = new THREE.Color(0x059669);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 2000;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 2000;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 2000;

      const colorChoice = Math.random();
      let color;
      if (colorChoice < 0.33) color = color1;
      else if (colorChoice < 0.66) color = color2;
      else color = color3;

      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;

      sizes[i] = Math.random() * 3 + 1;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    const material = new THREE.PointsMaterial({
      size: 2,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
    });

    particleSystem = new THREE.Points(geometry, material);
    scene.add(particleSystem);
  }

  function createFloatingGeometry() {
    const geometries = [
      new THREE.IcosahedronGeometry(30, 0),
      new THREE.OctahedronGeometry(25, 0),
      new THREE.TetrahedronGeometry(20, 0),
      new THREE.DodecahedronGeometry(28, 0),
    ];

    for (let i = 0; i < 15; i++) {
      const geo = geometries[Math.floor(Math.random() * geometries.length)];
      const material = new THREE.MeshBasicMaterial({
        color: new THREE.Color().setHSL(0.38 + Math.random() * 0.1, 0.8, 0.5),
        wireframe: true,
        transparent: true,
        opacity: 0.4,
      });

      const mesh = new THREE.Mesh(geo, material);
      mesh.position.x = (Math.random() - 0.5) * 1500;
      mesh.position.y = (Math.random() - 0.5) * 1500;
      mesh.position.z = (Math.random() - 0.5) * 1000;
      mesh.rotation.x = Math.random() * Math.PI;
      mesh.rotation.y = Math.random() * Math.PI;
      mesh.userData = {
        rotationSpeed: { x: Math.random() * 0.01 - 0.005, y: Math.random() * 0.01 - 0.005 },
        floatSpeed: Math.random() * 0.5 + 0.2,
        floatOffset: Math.random() * Math.PI * 2,
      };

      geometryLines.push(mesh);
      scene.add(mesh);
    }
  }

  function createGridLines() {
    const gridSize = 2000;
    const divisions = 40;
    const step = gridSize / divisions;

    const linesMaterial = new THREE.LineBasicMaterial({
      color: 0x10b981,
      transparent: true,
      opacity: 0.1,
    });

    for (let i = -divisions / 2; i <= divisions / 2; i++) {
      const pointsH = [
        new THREE.Vector3(-gridSize / 2, i * step, -200),
        new THREE.Vector3(gridSize / 2, i * step, -200),
      ];
      const geometryH = new THREE.BufferGeometry().setFromPoints(pointsH);
      const lineH = new THREE.Line(geometryH, linesMaterial);
      scene.add(lineH);

      const pointsV = [
        new THREE.Vector3(i * step, -gridSize / 2, -200),
        new THREE.Vector3(i * step, gridSize / 2, -200),
      ];
      const geometryV = new THREE.BufferGeometry().setFromPoints(pointsV);
      const lineV = new THREE.Line(geometryV, linesMaterial);
      scene.add(lineV);
    }
  }

  function onMouseMove(event) {
    mouseX = (event.clientX - window.innerWidth / 2) * 0.05;
    mouseY = (event.clientY - window.innerHeight / 2) * 0.05;
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

    if (particleSystem) {
      particleSystem.rotation.y = time * 0.02;
      particleSystem.rotation.x = time * 0.01;
    }

    geometryLines.forEach((mesh) => {
      mesh.rotation.x += mesh.userData.rotationSpeed.x;
      mesh.rotation.y += mesh.userData.rotationSpeed.y;
      mesh.position.y += Math.sin(time * mesh.userData.floatSpeed + mesh.userData.floatOffset) * 0.3;
    });

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
    z-index: -1;
    background: linear-gradient(135deg, #0a0f1a 0%, #0f172a 50%, #0a1628 100%);
  }
</style>
