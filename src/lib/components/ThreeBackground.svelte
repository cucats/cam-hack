<script>
  import { onMount, onDestroy } from 'svelte';
  import * as THREE from 'three';

  let canvasContainer;
  let scene, camera, renderer, animationId;
  let geometry, material, mesh;
  let particlesMesh;

  onMount(() => {
    // Scene setup
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000); // Dark background
    scene.fog = new THREE.FogExp2(0x000000, 0.002);

    // Camera
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    // Renderer
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    canvasContainer.appendChild(renderer.domElement);

    // Main Geometry (Wireframe Icosahedron)
    geometry = new THREE.IcosahedronGeometry(1.5, 1);
    material = new THREE.MeshBasicMaterial({ 
      color: 0x86e293, // Green from theme
      wireframe: true,
      transparent: true,
      opacity: 0.5
    });
    mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 2000;
    const posArray = new Float32Array(particlesCount * 3);

    for(let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 20; // Spread out
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.02,
      color: 0x86e6c6, // Lighter green
      transparent: true,
      opacity: 0.8
    });

    particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    // Lights (though basic material doesn't need them, good for future)
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    // Animation Loop
    const animate = () => {
      animationId = requestAnimationFrame(animate);

      mesh.rotation.x += 0.001;
      mesh.rotation.y += 0.002;

      particlesMesh.rotation.y -= 0.0005;
      
      // Mouse interaction (simple drift for now)
      // We can add mouse tracking if we want, but sticking to auto-animation for robustness
      
      // Pulse effect
      const time = Date.now() * 0.001;
      mesh.scale.setScalar(1 + Math.sin(time) * 0.1);

      renderer.render(scene, camera);
    };

    animate();

    // Resize Handler
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
      if (renderer) renderer.dispose();
      if (geometry) geometry.dispose();
      if (material) material.dispose();
    };
  });
</script>

<div bind:this={canvasContainer} class="fixed inset-0 z-0 pointer-events-none"></div>
