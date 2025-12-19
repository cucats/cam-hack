<script>
  import { onMount } from "svelte";
  import * as THREE from "three";

  let container;
  let scene, camera, renderer, particles, geometries = [];
  let mouseX = 0, mouseY = 0;
  let targetMouseX = 0, targetMouseY = 0;

  onMount(() => {
    init();
    animate();

    return () => {
      if (renderer) {
        renderer.dispose();
        container.removeChild(renderer.domElement);
      }
    };
  });

  function init() {
    scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x0a0e1a, 1, 1000);

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.z = 500;

    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 3000;
    const posArray = new Float32Array(particlesCount * 3);
    const colorsArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i += 3) {
      posArray[i] = (Math.random() - 0.5) * 2000;
      posArray[i + 1] = (Math.random() - 0.5) * 2000;
      posArray[i + 2] = (Math.random() - 0.5) * 1000;

      const greenShade = Math.random();
      colorsArray[i] = greenShade * 0.5;
      colorsArray[i + 1] = 0.4 + greenShade * 0.6;
      colorsArray[i + 2] = greenShade * 0.3;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colorsArray, 3));

    const particlesMaterial = new THREE.PointsMaterial({
      size: 2,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending
    });

    particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    const geometryTypes = [
      new THREE.OctahedronGeometry(40, 0),
      new THREE.IcosahedronGeometry(35, 0),
      new THREE.TetrahedronGeometry(45, 0)
    ];

    for (let i = 0; i < 15; i++) {
      const geometry = geometryTypes[Math.floor(Math.random() * geometryTypes.length)];
      const material = new THREE.MeshPhongMaterial({
        color: i % 3 === 0 ? 0x10b981 : i % 3 === 1 ? 0x059669 : 0x84cc16,
        transparent: true,
        opacity: 0.15,
        wireframe: true,
        emissive: 0x10b981,
        emissiveIntensity: 0.3
      });

      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(
        (Math.random() - 0.5) * 1000,
        (Math.random() - 0.5) * 1000,
        (Math.random() - 0.5) * 500
      );
      mesh.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );
      mesh.userData = {
        rotationSpeed: {
          x: (Math.random() - 0.5) * 0.01,
          y: (Math.random() - 0.5) * 0.01,
          z: (Math.random() - 0.5) * 0.01
        }
      };
      geometries.push(mesh);
      scene.add(mesh);
    }

    const ambientLight = new THREE.AmbientLight(0x10b981, 0.3);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0x84cc16, 0.5);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);

    const pointLight = new THREE.PointLight(0x10b981, 1, 500);
    pointLight.position.set(0, 0, 200);
    scene.add(pointLight);

    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(0x0a0e1a, 1);
    container.appendChild(renderer.domElement);

    window.addEventListener('resize', onWindowResize);
    document.addEventListener('mousemove', onMouseMove);
  }

  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }

  function onMouseMove(event) {
    targetMouseX = (event.clientX - window.innerWidth / 2) * 0.1;
    targetMouseY = (event.clientY - window.innerHeight / 2) * 0.1;
  }

  function animate() {
    requestAnimationFrame(animate);

    mouseX += (targetMouseX - mouseX) * 0.05;
    mouseY += (targetMouseY - mouseY) * 0.05;

    camera.position.x = mouseX;
    camera.position.y = -mouseY;
    camera.lookAt(scene.position);

    particles.rotation.y += 0.0002;
    particles.rotation.x += 0.0001;

    geometries.forEach(mesh => {
      mesh.rotation.x += mesh.userData.rotationSpeed.x;
      mesh.rotation.y += mesh.userData.rotationSpeed.y;
      mesh.rotation.z += mesh.userData.rotationSpeed.z;

      mesh.position.y += Math.sin(Date.now() * 0.001 + mesh.position.x * 0.01) * 0.1;
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
    z-index: 0;
    pointer-events: none;
  }

  .three-container :global(canvas) {
    display: block;
  }
</style>
