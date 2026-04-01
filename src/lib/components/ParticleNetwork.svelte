<script>
  import { onMount } from 'svelte';
  import * as THREE from 'three';

  let container;
  let scene, camera, renderer;
  let particles = [];
  let particleCount = 150;
  let mouseX = 0, mouseY = 0;
  let targetX = 0, targetY = 0;

  onMount(() => {
    init();
    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    const handleMouseMove = (event) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      if (renderer) {
        renderer.dispose();
      }
    };
  });

  function init() {
    scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x000a08, 0.001);

    camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      1,
      1000
    );
    camera.position.z = 400;

    renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true 
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000a08, 1);
    container.appendChild(renderer.domElement);

    const geometry = new THREE.SphereGeometry(2, 8, 8);
    const material = new THREE.MeshBasicMaterial({ 
      color: 0x00ff87,
      transparent: true,
      opacity: 0.8
    });

    for (let i = 0; i < particleCount; i++) {
      const particle = new THREE.Mesh(geometry, material.clone());
      
      particle.position.x = Math.random() * 1000 - 500;
      particle.position.y = Math.random() * 1000 - 500;
      particle.position.z = Math.random() * 1000 - 500;

      particle.velocity = {
        x: Math.random() * 0.4 - 0.2,
        y: Math.random() * 0.4 - 0.2,
        z: Math.random() * 0.4 - 0.2
      };

      scene.add(particle);
      particles.push(particle);
    }

    const lineMaterial = new THREE.LineBasicMaterial({ 
      color: 0x64ffda,
      transparent: true,
      opacity: 0.3
    });

    particles.forEach((p1, i) => {
      particles.slice(i + 1).forEach(p2 => {
        const distance = p1.position.distanceTo(p2.position);
        if (distance < 120) {
          const geometry = new THREE.BufferGeometry().setFromPoints([
            p1.position,
            p2.position
          ]);
          const line = new THREE.Line(geometry, lineMaterial);
          scene.add(line);
        }
      });
    });
  }

  function animate() {
    requestAnimationFrame(animate);

    targetX += (mouseX - targetX) * 0.02;
    targetY += (mouseY - targetY) * 0.02;

    camera.position.x += (targetX * 50 - camera.position.x) * 0.05;
    camera.position.y += (targetY * 50 - camera.position.y) * 0.05;
    camera.lookAt(scene.position);

    particles.forEach((particle, index) => {
      particle.position.x += particle.velocity.x;
      particle.position.y += particle.velocity.y;
      particle.position.z += particle.velocity.z;

      if (Math.abs(particle.position.x) > 500) particle.velocity.x *= -1;
      if (Math.abs(particle.position.y) > 500) particle.velocity.y *= -1;
      if (Math.abs(particle.position.z) > 500) particle.velocity.z *= -1;

      const time = Date.now() * 0.001;
      const scale = 1 + Math.sin(time + index * 0.1) * 0.3;
      particle.scale.set(scale, scale, scale);

      const opacity = 0.5 + Math.sin(time + index * 0.2) * 0.3;
      particle.material.opacity = opacity;
    });

    scene.children.forEach(child => {
      if (child.type === 'Line') {
        scene.remove(child);
      }
    });

    particles.forEach((p1, i) => {
      particles.slice(i + 1).forEach(p2 => {
        const distance = p1.position.distanceTo(p2.position);
        if (distance < 120) {
          const lineMaterial = new THREE.LineBasicMaterial({ 
            color: 0x64ffda,
            transparent: true,
            opacity: (1 - distance / 120) * 0.3
          });
          const geometry = new THREE.BufferGeometry().setFromPoints([
            p1.position,
            p2.position
          ]);
          const line = new THREE.Line(geometry, lineMaterial);
          scene.add(line);
        }
      });
    });

    renderer.render(scene, camera);
  }
</script>

<div bind:this={container} class="particle-container"></div>

<style>
  .particle-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    background: radial-gradient(ellipse at center, #001a12 0%, #000a08 100%);
  }

  :global(body) {
    overflow-x: hidden;
  }
</style>
