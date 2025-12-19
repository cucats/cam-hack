<script>
  import { onMount } from 'svelte';
  import * as THREE from 'three';

  let container;
  let scene, camera, renderer, particles, geometryGroup;
  let mouseX = 0, mouseY = 0;
  let windowHalfX = 0;
  let windowHalfY = 0;

  onMount(() => {
    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;

    init();
    animate();

    return () => {
      if (renderer) {
        renderer.dispose();
      }
      window.removeEventListener('resize', onWindowResize);
      window.removeEventListener('mousemove', onMouseMove);
    };
  });

  function init() {
    scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x0a0e0d, 1, 1000);

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.z = 400;

    const particleCount = 3000;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);

    const color1 = new THREE.Color(0x00ff88);
    const color2 = new THREE.Color(0x00ffcc);
    const color3 = new THREE.Color(0x0d7f4a);

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 1000;
      positions[i3 + 1] = (Math.random() - 0.5) * 1000;
      positions[i3 + 2] = (Math.random() - 0.5) * 1000;

      const colorChoice = Math.random();
      let color;
      if (colorChoice < 0.33) color = color1;
      else if (colorChoice < 0.66) color = color2;
      else color = color3;

      colors[i3] = color.r;
      colors[i3 + 1] = color.g;
      colors[i3 + 2] = color.b;

      sizes[i] = Math.random() * 3 + 1;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    const material = new THREE.PointsMaterial({
      size: 2,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true
    });

    particles = new THREE.Points(geometry, material);
    scene.add(particles);

    geometryGroup = new THREE.Group();
    scene.add(geometryGroup);

    const geometries = [
      new THREE.IcosahedronGeometry(100, 0),
      new THREE.TorusGeometry(80, 20, 16, 100),
      new THREE.OctahedronGeometry(90, 0)
    ];

    geometries.forEach((geom, index) => {
      const edges = new THREE.EdgesGeometry(geom);
      const line = new THREE.LineSegments(
        edges,
        new THREE.LineBasicMaterial({ 
          color: 0x00ff88,
          transparent: true,
          opacity: 0.3
        })
      );
      line.position.x = (index - 1) * 250;
      line.position.z = -200;
      geometryGroup.add(line);
    });

    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x0a0e0d, 1);
    container.appendChild(renderer.domElement);

    window.addEventListener('resize', onWindowResize);
    window.addEventListener('mousemove', onMouseMove);
  }

  function onWindowResize() {
    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }

  function onMouseMove(event) {
    mouseX = (event.clientX - windowHalfX) * 0.5;
    mouseY = (event.clientY - windowHalfY) * 0.5;
  }

  function animate() {
    requestAnimationFrame(animate);
    render();
  }

  function render() {
    const time = Date.now() * 0.00005;

    camera.position.x += (mouseX - camera.position.x) * 0.05;
    camera.position.y += (-mouseY - camera.position.y) * 0.05;
    camera.lookAt(scene.position);

    particles.rotation.y = time * 0.5;
    particles.rotation.x = time * 0.3;

    geometryGroup.children.forEach((child, index) => {
      child.rotation.x = time * (index + 1) * 0.3;
      child.rotation.y = time * (index + 1) * 0.5;
      child.rotation.z = time * (index + 1) * 0.2;
    });

    const positions = particles.geometry.attributes.position.array;
    for (let i = 0; i < positions.length; i += 3) {
      positions[i + 1] = Math.sin((time + positions[i]) * 3) * 50;
    }
    particles.geometry.attributes.position.needsUpdate = true;

    renderer.render(scene, camera);
  }
</script>

<div bind:this={container} class="fixed inset-0 -z-10"></div>
