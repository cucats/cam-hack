<script>
  import { onMount } from 'svelte';
  import * as THREE from 'three';

  let canvas;
  let animationId;

  onMount(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    
    camera.position.z = 30;

    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 3000;
    const posArray = new Float32Array(particlesCount * 3);
    const velocities = new Float32Array(particlesCount * 3);
    
    for(let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 150;
      velocities[i] = (Math.random() - 0.5) * 0.02;
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.2,
      color: 0x10b981,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending
    });
    
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    const particlesGeometry2 = new THREE.BufferGeometry();
    const particlesCount2 = 1500;
    const posArray2 = new Float32Array(particlesCount2 * 3);
    
    for(let i = 0; i < particlesCount2 * 3; i++) {
      posArray2[i] = (Math.random() - 0.5) * 120;
    }
    
    particlesGeometry2.setAttribute('position', new THREE.BufferAttribute(posArray2, 3));
    
    const particlesMaterial2 = new THREE.PointsMaterial({
      size: 0.1,
      color: 0x86e293,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending
    });
    
    const particlesMesh2 = new THREE.Points(particlesGeometry2, particlesMaterial2);
    scene.add(particlesMesh2);

    const geometries = [];
    const geometryTypes = [
      THREE.IcosahedronGeometry,
      THREE.TetrahedronGeometry,
      THREE.OctahedronGeometry
    ];
    
    for(let i = 0; i < 20; i++) {
      const GeometryType = geometryTypes[i % geometryTypes.length];
      const geometry = new GeometryType(Math.random() * 2 + 0.5, 0);
      const material = new THREE.MeshBasicMaterial({
        color: i % 4 === 0 ? 0x10b981 : i % 4 === 1 ? 0x86e293 : i % 4 === 2 ? 0xd1fae5 : 0x0a4d2e,
        wireframe: true,
        transparent: true,
        opacity: 0.3
      });
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(
        (Math.random() - 0.5) * 60,
        (Math.random() - 0.5) * 60,
        (Math.random() - 0.5) * 60
      );
      mesh.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );
      mesh.userData = {
        rotationSpeed: Math.random() * 0.002 + 0.001,
        floatSpeed: Math.random() * 0.001 + 0.0005,
        floatOffset: Math.random() * Math.PI * 2
      };
      geometries.push(mesh);
      scene.add(mesh);
    }

    const torusGroup = new THREE.Group();
    for(let i = 0; i < 5; i++) {
      const torusGeometry = new THREE.TorusGeometry(10 + i * 3, 0.2, 16, 100);
      const torusMaterial = new THREE.MeshBasicMaterial({
        color: 0x10b981,
        wireframe: true,
        transparent: true,
        opacity: 0.1
      });
      const torus = new THREE.Mesh(torusGeometry, torusMaterial);
      torus.rotation.x = Math.random() * Math.PI;
      torus.rotation.y = Math.random() * Math.PI;
      torusGroup.add(torus);
    }
    scene.add(torusGroup);

    let mouseX = 0;
    let mouseY = 0;
    let scrollY = 0;
    
    document.addEventListener('mousemove', (event) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    });
    
    window.addEventListener('scroll', () => {
      scrollY = window.scrollY;
    });

    const clock = new THREE.Clock();

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      
      const elapsedTime = clock.getElapsedTime();
      
      particlesMesh.rotation.y += 0.0005;
      particlesMesh.rotation.x += 0.0002;
      
      const positions = particlesGeometry.attributes.position.array;
      for(let i = 0; i < positions.length; i += 3) {
        positions[i] += velocities[i];
        positions[i+1] += velocities[i+1];
        positions[i+2] += velocities[i+2];
        
        if(Math.abs(positions[i]) > 75) velocities[i] *= -1;
        if(Math.abs(positions[i+1]) > 75) velocities[i+1] *= -1;
        if(Math.abs(positions[i+2]) > 75) velocities[i+2] *= -1;
      }
      particlesGeometry.attributes.position.needsUpdate = true;
      
      particlesMesh2.rotation.y -= 0.0003;
      particlesMesh2.rotation.x -= 0.0001;
      
      torusGroup.rotation.x = elapsedTime * 0.1;
      torusGroup.rotation.y = elapsedTime * 0.15;
      torusGroup.rotation.z = elapsedTime * 0.05;
      
      geometries.forEach((mesh, index) => {
        mesh.rotation.x += mesh.userData.rotationSpeed;
        mesh.rotation.y += mesh.userData.rotationSpeed * 1.5;
        mesh.position.y += Math.sin(elapsedTime * mesh.userData.floatSpeed + mesh.userData.floatOffset) * 0.02;
        mesh.position.x += Math.cos(elapsedTime * mesh.userData.floatSpeed * 0.7 + mesh.userData.floatOffset) * 0.01;
      });
      
      camera.position.x += (mouseX * 5 - camera.position.x) * 0.03;
      camera.position.y += (mouseY * 5 - scrollY * 0.01 - camera.position.y) * 0.03;
      camera.lookAt(scene.position);
      
      renderer.render(scene, camera);
    };
    
    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
      renderer.dispose();
    };
  });
</script>

<canvas bind:this={canvas} class="fixed inset-0 -z-10"></canvas>
