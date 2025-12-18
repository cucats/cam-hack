<script>
  import { onMount, onDestroy } from "svelte";
  import { browser } from "$app/environment";

  let container;
  let animationId;
  let scene, camera, renderer;
  let particles, geometryGroup;
  let mouse = { x: 0, y: 0 };
  let targetMouse = { x: 0, y: 0 };
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
    if (animationId) cancelAnimationFrame(animationId);
    window.removeEventListener("mousemove", onMouseMove);
    window.removeEventListener("resize", onResize);
    if (renderer) renderer.dispose();
  });

  function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 50;

    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    createParticles();
    createFloatingGeometry();
    createMatrixRain();
  }

  function createParticles() {
    const particleCount = 2000;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 200;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 200;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 200;

      const colorChoice = Math.random();
      if (colorChoice < 0.7) {
        colors[i * 3] = 0;
        colors[i * 3 + 1] = 1;
        colors[i * 3 + 2] = 0.53;
      } else {
        colors[i * 3] = 0;
        colors[i * 3 + 1] = 1;
        colors[i * 3 + 2] = 0.8;
      }

      sizes[i] = Math.random() * 2 + 0.5;
    }

    const geometry = new THREE.BufferGeometry();
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

  function createFloatingGeometry() {
    geometryGroup = new THREE.Group();

    const geometries = [
      new THREE.IcosahedronGeometry(3, 0),
      new THREE.OctahedronGeometry(2.5),
      new THREE.TetrahedronGeometry(2),
      new THREE.TorusGeometry(2, 0.5, 8, 16),
      new THREE.DodecahedronGeometry(2),
    ];

    const material = new THREE.MeshBasicMaterial({
      color: 0x00ff88,
      wireframe: true,
      transparent: true,
      opacity: 0.3,
    });

    for (let i = 0; i < 15; i++) {
      const geo = geometries[Math.floor(Math.random() * geometries.length)];
      const mesh = new THREE.Mesh(geo, material.clone());

      mesh.position.x = (Math.random() - 0.5) * 100;
      mesh.position.y = (Math.random() - 0.5) * 100;
      mesh.position.z = (Math.random() - 0.5) * 50 - 20;

      mesh.rotation.x = Math.random() * Math.PI;
      mesh.rotation.y = Math.random() * Math.PI;

      mesh.userData = {
        rotationSpeed: {
          x: (Math.random() - 0.5) * 0.02,
          y: (Math.random() - 0.5) * 0.02,
        },
        floatSpeed: Math.random() * 0.5 + 0.5,
        floatOffset: Math.random() * Math.PI * 2,
      };

      geometryGroup.add(mesh);
    }

    scene.add(geometryGroup);
  }

  function createMatrixRain() {
    const rainGroup = new THREE.Group();
    const charCount = 100;

    for (let i = 0; i < charCount; i++) {
      const canvas = document.createElement("canvas");
      canvas.width = 32;
      canvas.height = 32;
      const ctx = canvas.getContext("2d");

      ctx.fillStyle = "#00ff88";
      ctx.font = "24px monospace";
      const chars = "01アイウエオカキクケコサシスセソ";
      ctx.fillText(chars[Math.floor(Math.random() * chars.length)], 8, 24);

      const texture = new THREE.CanvasTexture(canvas);
      const material = new THREE.SpriteMaterial({
        map: texture,
        transparent: true,
        opacity: Math.random() * 0.5 + 0.1,
        blending: THREE.AdditiveBlending,
      });

      const sprite = new THREE.Sprite(material);
      sprite.position.x = (Math.random() - 0.5) * 150;
      sprite.position.y = Math.random() * 100 - 50;
      sprite.position.z = (Math.random() - 0.5) * 50 - 30;
      sprite.scale.set(1.5, 1.5, 1);

      sprite.userData = {
        speed: Math.random() * 0.3 + 0.1,
        startY: sprite.position.y,
      };

      rainGroup.add(sprite);
    }

    scene.add(rainGroup);
    scene.userData.rainGroup = rainGroup;
  }

  function onMouseMove(event) {
    targetMouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    targetMouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  }

  function onResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }

  function animate() {
    animationId = requestAnimationFrame(animate);

    mouse.x += (targetMouse.x - mouse.x) * 0.05;
    mouse.y += (targetMouse.y - mouse.y) * 0.05;

    if (particles) {
      particles.rotation.x += 0.0003;
      particles.rotation.y += 0.0005;
      particles.position.x = mouse.x * 5;
      particles.position.y = mouse.y * 5;
    }

    if (geometryGroup) {
      geometryGroup.children.forEach((mesh) => {
        mesh.rotation.x += mesh.userData.rotationSpeed.x;
        mesh.rotation.y += mesh.userData.rotationSpeed.y;
        mesh.position.y +=
          Math.sin(Date.now() * 0.001 * mesh.userData.floatSpeed + mesh.userData.floatOffset) * 0.02;
      });
    }

    if (scene.userData.rainGroup) {
      scene.userData.rainGroup.children.forEach((sprite) => {
        sprite.position.y -= sprite.userData.speed;
        if (sprite.position.y < -50) {
          sprite.position.y = 50;
        }
      });
    }

    camera.position.x += (mouse.x * 10 - camera.position.x) * 0.02;
    camera.position.y += (mouse.y * 10 - camera.position.y) * 0.02;
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
