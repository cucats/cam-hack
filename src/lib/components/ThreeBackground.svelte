<script>
  import { onMount, onDestroy } from "svelte";
  import * as THREE from "three";
  import { gsap } from "gsap";

  let container;
  let scene, camera, renderer;
  let particles, particleSystem;
  let geometry, material;
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

    renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);

    const particleCount = 2000;
    particles = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      particles[i] = (Math.random() - 0.5) * 20;
      particles[i + 1] = (Math.random() - 0.5) * 20;
      particles[i + 2] = (Math.random() - 0.5) * 20;
    }

    geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(particles, 3));

    material = new THREE.PointsMaterial({
      color: 0x86e293,
      size: 0.1,
      transparent: true,
      opacity: 0.6,
    });

    particleSystem = new THREE.Points(geometry, material);
    scene.add(particleSystem);

    const torusGeometry = new THREE.TorusGeometry(1.5, 0.5, 16, 100);
    const torusMaterial = new THREE.MeshStandardMaterial({
      color: 0x86e6c6,
      transparent: true,
      opacity: 0.3,
      wireframe: true,
    });
    const torus = new THREE.Mesh(torusGeometry, torusMaterial);
    scene.add(torus);

    const torus2 = new THREE.Mesh(
      new THREE.TorusGeometry(2, 0.3, 16, 100),
      new THREE.MeshStandardMaterial({
        color: 0x86e293,
        transparent: true,
        opacity: 0.2,
        wireframe: true,
      })
    );
    torus2.rotation.x = Math.PI / 2;
    scene.add(torus2);

    const icosahedronGeometry = new THREE.IcosahedronGeometry(1, 0);
    const icosahedronMaterial = new THREE.MeshStandardMaterial({
      color: 0x86e6c6,
      transparent: true,
      opacity: 0.15,
      wireframe: true,
    });
    const icosahedron = new THREE.Mesh(icosahedronGeometry, icosahedronMaterial);
    scene.add(icosahedron);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0x86e293, 1, 100);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    const handleMouseMove = (event) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
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

      particleSystem.rotation.x += 0.0005;
      particleSystem.rotation.y += 0.001;

      torus.rotation.x += 0.01;
      torus.rotation.y += 0.01;

      torus2.rotation.z += 0.008;
      torus2.rotation.y += 0.005;

      icosahedron.rotation.x += 0.005;
      icosahedron.rotation.y += 0.007;
      icosahedron.rotation.z += 0.003;

      camera.position.x += (mouse.x * 0.5 - camera.position.x) * 0.05;
      camera.position.y += (mouse.y * 0.5 - camera.position.y) * 0.05;
      camera.lookAt(scene.position);

      const positions = particleSystem.geometry.attributes.position.array;
      for (let i = 1; i < positions.length; i += 3) {
        positions[i] += Math.sin(Date.now() * 0.001 + i) * 0.0005;
      }
      particleSystem.geometry.attributes.position.needsUpdate = true;

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
      if (geometry) {
        geometry.dispose();
      }
      if (material) {
        material.dispose();
      }
    };
  });
</script>

<div bind:this={container} class="fixed inset-0 -z-10"></div>
