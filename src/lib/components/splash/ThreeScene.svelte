<script>
  import { onMount, onDestroy } from "svelte";
  import * as THREE from "three";

  let canvas;
  let scene, camera, renderer;
  let particles, particleSystem;
  let geometry, torus, torus2;
  let mouse = { x: 0, y: 0 };
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
    const green3 = new THREE.Color(0x10b981);

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 20;
      positions[i3 + 1] = (Math.random() - 0.5) * 20;
      positions[i3 + 2] = (Math.random() - 0.5) * 20;

      const colorChoice = Math.random();
      let color;
      if (colorChoice < 0.4) color = green1;
      else if (colorChoice < 0.7) color = green2;
      else color = green3;

      colors[i3] = color.r;
      colors[i3 + 1] = color.g;
      colors[i3 + 2] = color.b;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 0.1,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
    });

    particles = new THREE.Points(geometry, material);
    scene.add(particles);

    const torusGeometry = new THREE.TorusGeometry(1.5, 0.3, 16, 100);
    const torusMaterial = new THREE.MeshStandardMaterial({
      color: 0x86e293,
      emissive: 0x86e293,
      emissiveIntensity: 0.5,
      transparent: true,
      opacity: 0.6,
      metalness: 0.8,
      roughness: 0.2,
    });
    torus = new THREE.Mesh(torusGeometry, torusMaterial);
    scene.add(torus);

    const torusGeometry2 = new THREE.TorusGeometry(2, 0.2, 16, 100);
    const torusMaterial2 = new THREE.MeshStandardMaterial({
      color: 0x86e6c6,
      emissive: 0x86e6c6,
      emissiveIntensity: 0.4,
      transparent: true,
      opacity: 0.5,
      metalness: 0.7,
      roughness: 0.3,
    });
    torus2 = new THREE.Mesh(torusGeometry2, torusMaterial2);
    scene.add(torus2);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0x86e293, 1);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    const pointLight2 = new THREE.PointLight(0x86e6c6, 0.8);
    pointLight2.position.set(-5, -5, 5);
    scene.add(pointLight2);

    const handleMouseMove = (event) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", handleResize);

    let time = 0;
    const animate = () => {
      animationId = requestAnimationFrame(animate);
      time += 0.01;

      particles.rotation.x = time * 0.1;
      particles.rotation.y = time * 0.15;

      const positions = particles.geometry.attributes.position.array;
      for (let i = 0; i < positions.length; i += 3) {
        positions[i] += Math.sin(time + positions[i] * 0.1) * 0.0005;
        positions[i + 1] += Math.cos(time + positions[i + 1] * 0.1) * 0.0005;
      }
      particles.geometry.attributes.position.needsUpdate = true;

      torus.rotation.x = time * 0.5;
      torus.rotation.y = time * 0.3;
      torus.position.x = Math.sin(time) * 0.5;
      torus.position.y = Math.cos(time * 0.7) * 0.3;

      torus2.rotation.x = -time * 0.4;
      torus2.rotation.y = -time * 0.6;
      torus2.position.x = -Math.sin(time * 0.8) * 0.4;
      torus2.position.y = -Math.cos(time * 0.5) * 0.5;

      camera.position.x += (mouse.x * 0.5 - camera.position.x) * 0.05;
      camera.position.y += (mouse.y * 0.5 - camera.position.y) * 0.05;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    };

    animate();

    onDestroy(() => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      if (animationId) cancelAnimationFrame(animationId);
      if (renderer) renderer.dispose();
      if (particles) {
        particles.geometry.dispose();
        particles.material.dispose();
      }
      if (torus) {
        torus.geometry.dispose();
        torus.material.dispose();
      }
      if (torus2) {
        torus2.geometry.dispose();
        torus2.material.dispose();
      }
    });
  });
</script>

<canvas bind:this={canvas} class="fixed inset-0 -z-10"></canvas>
