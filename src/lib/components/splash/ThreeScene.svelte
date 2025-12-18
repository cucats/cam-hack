<script>
  import { onMount, onDestroy } from "svelte";
  import * as THREE from "three";

  let canvas;
  let scene, camera, renderer;
  let particles, particleSystem;
  let torus, torusMesh;
  let animationId;
  let mouse = { x: 0, y: 0 };

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
      canvas,
      antialias: true,
      alpha: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const particleGeometry = new THREE.BufferGeometry();
    const particleCount = 2000;
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 20;
    }

    particleGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3)
    );

    const particleMaterial = new THREE.PointsMaterial({
      color: 0x86e293,
      size: 0.05,
      transparent: true,
      opacity: 0.8,
    });

    particleSystem = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particleSystem);

    const torusGeometry = new THREE.TorusGeometry(1.5, 0.5, 16, 100);
    const torusMaterial = new THREE.MeshStandardMaterial({
      color: 0x86e6c6,
      metalness: 0.7,
      roughness: 0.3,
      transparent: true,
      opacity: 0.6,
    });
    torusMesh = new THREE.Mesh(torusGeometry, torusMaterial);
    scene.add(torusMesh);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0x86e293, 1, 100);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    const handleMouseMove = (event) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);

    const animate = () => {
      animationId = requestAnimationFrame(animate);

      particleSystem.rotation.x += 0.0005;
      particleSystem.rotation.y += 0.001;

      torusMesh.rotation.x += 0.01;
      torusMesh.rotation.y += 0.015;

      camera.position.x += (mouse.x * 0.5 - camera.position.x) * 0.05;
      camera.position.y += (-mouse.y * 0.5 - camera.position.y) * 0.05;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  });

  onDestroy(() => {
    if (animationId) {
      cancelAnimationFrame(animationId);
    }
    if (renderer) {
      renderer.dispose();
    }
    if (particleSystem) {
      particleSystem.geometry.dispose();
      particleSystem.material.dispose();
    }
    if (torusMesh) {
      torusMesh.geometry.dispose();
      torusMesh.material.dispose();
    }
  });
</script>

<canvas bind:this={canvas} class="fixed inset-0 -z-10"></canvas>
