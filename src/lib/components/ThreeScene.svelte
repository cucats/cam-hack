<script>
  import { onMount } from "svelte";
  import * as THREE from "three";

  let canvasContainer;
  let scene, camera, renderer;
  let particles, particleSystem;
  let geometry, torus, torus2, icosahedron;
  let mouseX = 0;
  let mouseY = 0;
  let animationId;

  onMount(() => {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    canvasContainer.appendChild(renderer.domElement);

    const particleCount = 2000;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const color1 = new THREE.Color(0x86e293);
    const color2 = new THREE.Color(0x86e6c6);

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 50;
      positions[i + 1] = (Math.random() - 0.5) * 50;
      positions[i + 2] = (Math.random() - 0.5) * 50;

      const color = Math.random() > 0.5 ? color1 : color2;
      colors[i] = color.r;
      colors[i + 1] = color.g;
      colors[i + 2] = color.b;
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 0.1,
      vertexColors: true,
      transparent: true,
      opacity: 0.6,
    });

    particleSystem = new THREE.Points(geometry, material);
    scene.add(particleSystem);

    const torusGeometry = new THREE.TorusGeometry(1, 0.3, 16, 100);
    const torusMaterial = new THREE.MeshStandardMaterial({
      color: 0x86e293,
      emissive: 0x86e293,
      emissiveIntensity: 0.8,
      transparent: true,
      opacity: 0.6,
      wireframe: false,
    });
    torus = new THREE.Mesh(torusGeometry, torusMaterial);
    torus.position.set(-2, 1, -2);
    scene.add(torus);

    const torusGeometry2 = new THREE.TorusGeometry(0.8, 0.25, 16, 100);
    const torusMaterial2 = new THREE.MeshStandardMaterial({
      color: 0x86e6c6,
      emissive: 0x86e6c6,
      emissiveIntensity: 0.8,
      transparent: true,
      opacity: 0.6,
      wireframe: false,
    });
    torus2 = new THREE.Mesh(torusGeometry2, torusMaterial2);
    torus2.position.set(2, -1, -3);
    scene.add(torus2);

    const icosahedronGeometry = new THREE.IcosahedronGeometry(0.5, 0);
    const icosahedronMaterial = new THREE.MeshStandardMaterial({
      color: 0x86e293,
      emissive: 0x86e293,
      emissiveIntensity: 0.6,
      transparent: true,
      opacity: 0.5,
    });
    icosahedron = new THREE.Mesh(icosahedronGeometry, icosahedronMaterial);
    icosahedron.position.set(0, -2, -4);
    scene.add(icosahedron);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0x86e293, 1, 100);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    const handleMouseMove = (event) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener("mousemove", handleMouseMove);

    const animate = () => {
      animationId = requestAnimationFrame(animate);

      particleSystem.rotation.x += 0.0005;
      particleSystem.rotation.y += 0.001;

      const positions = particleSystem.geometry.attributes.position.array;
      const time = Date.now() * 0.001;
      for (let i = 1; i < positions.length; i += 3) {
        positions[i] += Math.sin(time + i * 0.01) * 0.0002;
        positions[i + 2] += Math.cos(time + i * 0.01) * 0.0001;
      }
      particleSystem.geometry.attributes.position.needsUpdate = true;

      torus.rotation.x += 0.01;
      torus.rotation.y += 0.015;
      torus.position.x = -2 + mouseX * 0.5;
      torus.position.y = 1 + mouseY * 0.5;

      torus2.rotation.x -= 0.012;
      torus2.rotation.y -= 0.008;
      torus2.position.x = 2 - mouseX * 0.3;
      torus2.position.y = -1 - mouseY * 0.3;

      if (icosahedron) {
        icosahedron.rotation.x += 0.008;
        icosahedron.rotation.y += 0.012;
        icosahedron.position.y = -2 + Math.sin(Date.now() * 0.001) * 0.5;
      }

      camera.position.x += (mouseX * 0.5 - camera.position.x) * 0.05;
      camera.position.y += (mouseY * 0.5 - camera.position.y) * 0.05;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
      if (renderer) {
        renderer.dispose();
      }
    };
  });
</script>

<div bind:this={canvasContainer} class="three-scene"></div>

<style>
  .three-scene {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
    pointer-events: none;
  }
</style>