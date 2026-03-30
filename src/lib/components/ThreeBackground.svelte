<script>
  import { onMount } from 'svelte';
  import * as THREE from 'three';

  let container;
  let mounted = false;

  onMount(() => {
    mounted = true;
    
    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x0a0f0a, 1, 100);
    
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 30;
    
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);
    
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 5000;
    const posArray = new Float32Array(particlesCount * 3);
    const colorsArray = new Float32Array(particlesCount * 3);
    
    for(let i = 0; i < particlesCount * 3; i += 3) {
      posArray[i] = (Math.random() - 0.5) * 100;
      posArray[i + 1] = (Math.random() - 0.5) * 100;
      posArray[i + 2] = (Math.random() - 0.5) * 100;
      
      const color = new THREE.Color();
      color.setHSL(Math.random() * 0.15 + 0.3, 1, 0.5);
      colorsArray[i] = color.r;
      colorsArray[i + 1] = color.g;
      colorsArray[i + 2] = color.b;
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colorsArray, 3));
    
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.15,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending
    });
    
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);
    
    const gridHelper = new THREE.GridHelper(100, 50, 0x00ff88, 0x0a4d3c);
    gridHelper.position.y = -20;
    scene.add(gridHelper);
    
    const torusGeometry = new THREE.TorusGeometry(10, 0.5, 16, 100);
    const torusMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x00ff88,
      emissive: 0x00ff88,
      emissiveIntensity: 0.5,
      wireframe: true,
      transparent: true,
      opacity: 0.3
    });
    const torus = new THREE.Mesh(torusGeometry, torusMaterial);
    torus.position.set(-15, 5, -20);
    scene.add(torus);
    
    const torusKnot = new THREE.TorusKnot(7, 1.5, 100, 16);
    const torusKnotMaterial = new THREE.MeshStandardMaterial({
      color: 0x0dff00,
      emissive: 0x0dff00,
      emissiveIntensity: 0.3,
      wireframe: true,
      transparent: true,
      opacity: 0.2
    });
    const torusKnotMesh = new THREE.Mesh(torusKnot, torusKnotMaterial);
    torusKnotMesh.position.set(15, -5, -25);
    scene.add(torusKnotMesh);
    
    const ambientLight = new THREE.AmbientLight(0x00ff88, 0.3);
    scene.add(ambientLight);
    
    const pointLight1 = new THREE.PointLight(0x00ff88, 2, 100);
    pointLight1.position.set(20, 20, 20);
    scene.add(pointLight1);
    
    const pointLight2 = new THREE.PointLight(0x0dff00, 1.5, 100);
    pointLight2.position.set(-20, -20, 20);
    scene.add(pointLight2);
    
    const pointLight3 = new THREE.PointLight(0x00ffaa, 1, 80);
    pointLight3.position.set(0, 30, -10);
    scene.add(pointLight3);
    
    let mouseX = 0;
    let mouseY = 0;
    
    const handleMouseMove = (event) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);
    
    let time = 0;
    
    const animate = () => {
      if (!mounted) return;
      
      requestAnimationFrame(animate);
      
      time += 0.001;
      
      particlesMesh.rotation.y = time * 0.3;
      particlesMesh.rotation.x = time * 0.15;
      
      const positions = particlesMesh.geometry.attributes.position.array;
      for (let i = 1; i < positions.length; i += 3) {
        positions[i] += Math.sin(time * 5 + positions[i] * 0.1) * 0.02;
      }
      particlesMesh.geometry.attributes.position.needsUpdate = true;
      
      torus.rotation.x += 0.008;
      torus.rotation.y += 0.004;
      torus.position.y = 5 + Math.sin(time * 2) * 2;
      
      torusKnotMesh.rotation.x += 0.003;
      torusKnotMesh.rotation.y += 0.007;
      torusKnotMesh.position.y = -5 + Math.cos(time * 1.5) * 2;
      
      pointLight1.position.x = 20 + Math.sin(time * 2) * 10;
      pointLight1.position.y = 20 + Math.cos(time * 2) * 10;
      
      pointLight2.position.x = -20 + Math.cos(time * 1.5) * 10;
      pointLight2.position.z = 20 + Math.sin(time * 1.5) * 10;
      
      camera.position.x += (mouseX * 5 - camera.position.x) * 0.05;
      camera.position.y += (mouseY * 5 - camera.position.y) * 0.05;
      camera.lookAt(scene.position);
      
      renderer.render(scene, camera);
    };
    
    animate();
    
    return () => {
      mounted = false;
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
    };
  });
</script>

<div bind:this={container} class="three-background"></div>

<style>
  .three-background {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 0;
    pointer-events: none;
  }

  .three-background :global(canvas) {
    display: block;
  }
</style>
