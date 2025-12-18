<script>
  import { onMount, onDestroy } from "svelte";
  import * as THREE from "three";

  let container;
  let animationId;
  let scene, camera, renderer;
  let particles,
    geometries = [];
  let mouseX = 0,
    mouseY = 0;
  let windowHalfX = 0,
    windowHalfY = 0;

  onMount(() => {
    if (typeof window === "undefined") return;

    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;

    scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x020617, 0.0008);

    camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      1,
      3000,
    );
    camera.position.z = 1000;

    const particleCount = 5000;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);

    const color1 = new THREE.Color(0x10b981);
    const color2 = new THREE.Color(0x06b6d4);
    const color3 = new THREE.Color(0x059669);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 2000;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 2000;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 2000;

      const mixRatio = Math.random();
      const particleColor =
        mixRatio < 0.33 ? color1 : mixRatio < 0.66 ? color2 : color3;
      colors[i * 3] = particleColor.r;
      colors[i * 3 + 1] = particleColor.g;
      colors[i * 3 + 2] = particleColor.b;

      sizes[i] = Math.random() * 3 + 1;
    }

    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3),
    );
    particleGeometry.setAttribute(
      "color",
      new THREE.BufferAttribute(colors, 3),
    );
    particleGeometry.setAttribute("size", new THREE.BufferAttribute(sizes, 1));

    const particleMaterial = new THREE.PointsMaterial({
      size: 2,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
    });

    particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    const geometryTypes = [
      new THREE.IcosahedronGeometry(30, 0),
      new THREE.OctahedronGeometry(25, 0),
      new THREE.TetrahedronGeometry(28, 0),
      new THREE.TorusGeometry(20, 8, 8, 24),
      new THREE.DodecahedronGeometry(22, 0),
    ];

    for (let i = 0; i < 20; i++) {
      const geometry =
        geometryTypes[Math.floor(Math.random() * geometryTypes.length)];
      const material = new THREE.MeshBasicMaterial({
        color: Math.random() > 0.5 ? 0x10b981 : 0x06b6d4,
        wireframe: true,
        transparent: true,
        opacity: 0.3,
      });
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(
        (Math.random() - 0.5) * 1500,
        (Math.random() - 0.5) * 1500,
        (Math.random() - 0.5) * 1500,
      );
      mesh.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI,
      );
      mesh.userData.rotationSpeed = {
        x: (Math.random() - 0.5) * 0.01,
        y: (Math.random() - 0.5) * 0.01,
        z: (Math.random() - 0.5) * 0.01,
      };
      mesh.userData.floatSpeed = Math.random() * 0.002 + 0.001;
      mesh.userData.floatOffset = Math.random() * Math.PI * 2;
      geometries.push(mesh);
      scene.add(mesh);
    }

    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x020617, 1);
    container.appendChild(renderer.domElement);

    document.addEventListener("mousemove", onMouseMove);
    window.addEventListener("resize", onResize);

    animate();
  });

  function onMouseMove(event) {
    mouseX = (event.clientX - windowHalfX) * 0.5;
    mouseY = (event.clientY - windowHalfY) * 0.5;
  }

  function onResize() {
    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }

  function animate() {
    animationId = requestAnimationFrame(animate);

    const time = Date.now() * 0.001;

    camera.position.x += (mouseX - camera.position.x) * 0.02;
    camera.position.y += (-mouseY - camera.position.y) * 0.02;
    camera.lookAt(scene.position);

    particles.rotation.y += 0.0002;
    particles.rotation.x += 0.0001;

    const positions = particles.geometry.attributes.position.array;
    for (let i = 0; i < positions.length; i += 3) {
      positions[i + 1] += Math.sin(time + positions[i] * 0.01) * 0.1;
    }
    particles.geometry.attributes.position.needsUpdate = true;

    geometries.forEach((mesh, index) => {
      mesh.rotation.x += mesh.userData.rotationSpeed.x;
      mesh.rotation.y += mesh.userData.rotationSpeed.y;
      mesh.rotation.z += mesh.userData.rotationSpeed.z;
      mesh.position.y +=
        Math.sin(
          time * mesh.userData.floatSpeed * 10 + mesh.userData.floatOffset,
        ) * 0.5;
    });

    renderer.render(scene, camera);
  }

  onDestroy(() => {
    if (typeof window === "undefined") return;
    if (animationId) cancelAnimationFrame(animationId);
    document.removeEventListener("mousemove", onMouseMove);
    window.removeEventListener("resize", onResize);
    if (renderer) {
      renderer.dispose();
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
    }
  });
</script>

<div bind:this={container} class="fixed inset-0 -z-10"></div>
