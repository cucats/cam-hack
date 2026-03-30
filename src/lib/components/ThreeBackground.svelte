<script>
  import { onMount } from "svelte";
  import * as THREE from "three";

  let container;
  let scene, camera, renderer;
  let particles, particleSystem;
  let mouseX = 0;
  let mouseY = 0;
  let animationId;
  let originalPositions;

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
    container.appendChild(renderer.domElement);

    const particleCount = 3000;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);

    const green1 = new THREE.Color(0x059669);
    const green2 = new THREE.Color(0x10b981);
    const green3 = new THREE.Color(0x34d399);
    const green4 = new THREE.Color(0x6ee7b7);
    const cyan = new THREE.Color(0x06b6d4);

    for (let i = 0; i < particleCount * 3; i += 3) {
      const radius = 15 + Math.random() * 10;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      positions[i] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i + 2] = radius * Math.cos(phi);

      const colorChoice = Math.random();
      let color;
      if (colorChoice < 0.2) {
        color = green1;
      } else if (colorChoice < 0.4) {
        color = green2;
      } else if (colorChoice < 0.6) {
        color = green3;
      } else if (colorChoice < 0.8) {
        color = green4;
      } else {
        color = cyan;
      }

      colors[i] = color.r;
      colors[i + 1] = color.g;
      colors[i + 2] = color.b;

      sizes[i / 3] = 0.05 + Math.random() * 0.15;
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute("size", new THREE.BufferAttribute(sizes, 1));

    originalPositions = new Float32Array(positions);

    const material = new THREE.PointsMaterial({
      size: 0.15,
      vertexColors: true,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
    });

    particleSystem = new THREE.Points(geometry, material);
    scene.add(particleSystem);

    const handleMouseMove = (event) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener("mousemove", handleMouseMove);

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    const animate = () => {
      animationId = requestAnimationFrame(animate);

      const time = Date.now() * 0.0005;

      particleSystem.rotation.x += 0.0003;
      particleSystem.rotation.y += 0.0008;
      particleSystem.rotation.z += 0.0002;

      const positions = particleSystem.geometry.attributes.position.array;
      for (let i = 0; i < positions.length; i += 3) {
        const index = i / 3;
        const wave1 = Math.sin(time + index * 0.01) * 0.3;
        const wave2 = Math.cos(time * 0.7 + index * 0.015) * 0.2;
        const wave3 = Math.sin(time * 0.5 + index * 0.02) * 0.25;
        positions[i] = originalPositions[i] + wave1;
        positions[i + 1] = originalPositions[i + 1] + wave2;
        positions[i + 2] = originalPositions[i + 2] + wave3;
      }
      particleSystem.geometry.attributes.position.needsUpdate = true;

      const colors = particleSystem.geometry.attributes.color.array;
      for (let i = 0; i < colors.length; i += 3) {
        const intensity = 0.8 + Math.sin(time + i * 0.1) * 0.2;
        colors[i] *= intensity;
        colors[i + 1] *= intensity;
        colors[i + 2] *= intensity;
      }
      particleSystem.geometry.attributes.color.needsUpdate = true;

      camera.position.x += (mouseX * 0.8 - camera.position.x) * 0.03;
      camera.position.y += (mouseY * 0.8 - camera.position.y) * 0.03;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };

    animate();

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

<div bind:this={container} class="three-background"></div>

<style>
  .three-background {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    pointer-events: none;
  }

  :global(.three-background canvas) {
    display: block;
  }
</style>