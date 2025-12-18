<script>
  import { onMount, onDestroy } from "svelte";
  import * as THREE from "three";

  let canvas;
  let scene, camera, renderer;
  let particles, particleSystem;
  let geometry, torus, torusMesh;
  let animationId;
  let mouseX = 0;
  let mouseY = 0;

  onMount(() => {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      alpha: true,
      antialias: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const particleCount = 2000;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const green1 = new THREE.Color(0x86e293);
    const green2 = new THREE.Color(0x86e6c6);
    const green3 = new THREE.Color(0x059669);

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 20;
      positions[i3 + 1] = (Math.random() - 0.5) * 20;
      positions[i3 + 2] = (Math.random() - 0.5) * 20;

      const colorChoice = Math.random();
      let color;
      if (colorChoice < 0.4) {
        color = green1;
      } else if (colorChoice < 0.7) {
        color = green2;
      } else {
        color = green3;
      }

      colors[i3] = color.r;
      colors[i3 + 1] = color.g;
      colors[i3 + 2] = color.b;
    }

    geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 0.05,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
    });

    particleSystem = new THREE.Points(geometry, material);
    scene.add(particleSystem);

    const torusGeometry = new THREE.TorusGeometry(1.5, 0.5, 16, 100);
    const torusMaterial = new THREE.MeshStandardMaterial({
      color: 0x86e293,
      emissive: 0x86e293,
      emissiveIntensity: 0.5,
      transparent: true,
      opacity: 0.3,
      wireframe: true,
    });
    torusMesh = new THREE.Mesh(torusGeometry, torusMaterial);
    scene.add(torusMesh);

    const torusGeometry2 = new THREE.TorusGeometry(2, 0.3, 16, 100);
    const torusMaterial2 = new THREE.MeshStandardMaterial({
      color: 0x86e6c6,
      emissive: 0x86e6c6,
      emissiveIntensity: 0.4,
      transparent: true,
      opacity: 0.25,
      wireframe: true,
    });
    const torusMesh2 = new THREE.Mesh(torusGeometry2, torusMaterial2);
    scene.add(torusMesh2);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0x86e293, 1, 100);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    const handleMouseMove = (event) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", handleResize);

    const animate = () => {
      animationId = requestAnimationFrame(animate);

      const time = Date.now() * 0.001;

      particleSystem.rotation.x += 0.0005;
      particleSystem.rotation.y += 0.001;

      const positions = particleSystem.geometry.attributes.position.array;
      for (let i = 0; i < positions.length; i += 3) {
        const i3 = i;
        const wave = Math.sin(time * 0.5 + positions[i3] * 0.1) * 0.02;
        const wave2 = Math.cos(time * 0.3 + positions[i3 + 1] * 0.1) * 0.02;
        positions[i3 + 1] += wave + wave2;
        positions[i3 + 2] += Math.sin(time * 0.4 + i * 0.01) * 0.001;
      }
      particleSystem.geometry.attributes.position.needsUpdate = true;

      torusMesh.rotation.x += 0.01;
      torusMesh.rotation.y += 0.015;
      torusMesh.position.y = Math.sin(time * 0.5) * 0.3;
      torusMesh2.rotation.x -= 0.008;
      torusMesh2.rotation.y -= 0.012;
      torusMesh2.position.y = Math.cos(time * 0.4) * 0.2;

      camera.position.x += (mouseX * 0.5 - camera.position.x) * 0.05;
      camera.position.y += (mouseY * 0.5 - camera.position.y) * 0.05;
      camera.lookAt(scene.position);

      pointLight.position.x = Math.sin(time) * 3;
      pointLight.position.y = Math.cos(time * 0.7) * 3;
      pointLight.intensity = 0.8 + Math.sin(time * 2) * 0.2;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
    };
  });

  onDestroy(() => {
    if (animationId) {
      cancelAnimationFrame(animationId);
    }
    if (renderer) {
      renderer.dispose();
    }
    if (geometry) {
      geometry.dispose();
    }
    if (particleSystem) {
      particleSystem.material.dispose();
    }
  });
</script>

<canvas bind:this={canvas} class="fixed inset-0 -z-10"></canvas>

<style>
  canvas {
    width: 100%;
    height: 100%;
  }
</style>