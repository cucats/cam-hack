<script>
  import { onMount } from "svelte";
  import * as THREE from "three";

  let canvas;

  onMount(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000,
    );
    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    camera.position.z = 30;

    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 3000;
    const posArray = new Float32Array(particlesCount * 3);
    const colors = new Float32Array(particlesCount * 3);
    const scales = new Float32Array(particlesCount);

    for (let i = 0; i < particlesCount * 3; i += 3) {
      posArray[i] = (Math.random() - 0.5) * 100;
      posArray[i + 1] = (Math.random() - 0.5) * 100;
      posArray[i + 2] = (Math.random() - 0.5) * 100;

      const colorChoice = Math.random();
      if (colorChoice < 0.33) {
        colors[i] = 0.06;
        colors[i + 1] = 0.71;
        colors[i + 2] = 0.51;
      } else if (colorChoice < 0.66) {
        colors[i] = 0.13;
        colors[i + 1] = 0.83;
        colors[i + 2] = 0.78;
      } else {
        colors[i] = 0.52;
        colors[i + 1] = 0.89;
        colors[i + 2] = 0.58;
      }

      scales[i / 3] = Math.random() * 0.5 + 0.5;
    }

    particlesGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(posArray, 3),
    );
    particlesGeometry.setAttribute(
      "color",
      new THREE.BufferAttribute(colors, 3),
    );
    particlesGeometry.setAttribute(
      "scale",
      new THREE.BufferAttribute(scales, 1),
    );

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.5,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particlesMesh = new THREE.Points(
      particlesGeometry,
      particlesMaterial,
    );
    scene.add(particlesMesh);

    const geometries = [];
    const materials = [];
    const meshes = [];

    for (let i = 0; i < 15; i++) {
      const type = Math.floor(Math.random() * 3);
      let geometry;

      if (type === 0) {
        geometry = new THREE.OctahedronGeometry(Math.random() * 2 + 1, 0);
      } else if (type === 1) {
        geometry = new THREE.TetrahedronGeometry(Math.random() * 2 + 1, 0);
      } else {
        geometry = new THREE.IcosahedronGeometry(Math.random() * 2 + 1, 0);
      }

      const material = new THREE.MeshBasicMaterial({
        color: Math.random() < 0.5 ? 0x10b981 : 0x06b6d4,
        wireframe: true,
        transparent: true,
        opacity: 0.3,
      });

      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(
        (Math.random() - 0.5) * 50,
        (Math.random() - 0.5) * 50,
        (Math.random() - 0.5) * 50,
      );

      mesh.rotation.x = Math.random() * Math.PI;
      mesh.rotation.y = Math.random() * Math.PI;

      geometries.push(geometry);
      materials.push(material);
      meshes.push(mesh);
      scene.add(mesh);
    }

    const gridHelper = new THREE.GridHelper(100, 50, 0x10b981, 0x047857);
    gridHelper.position.y = -20;
    gridHelper.material.transparent = true;
    gridHelper.material.opacity = 0.2;
    scene.add(gridHelper);

    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (event) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener("mousemove", handleMouseMove);

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    let time = 0;

    const animate = () => {
      requestAnimationFrame(animate);
      time += 0.001;

      targetX = mouseX * 0.5;
      targetY = mouseY * 0.5;

      camera.position.x += (targetX - camera.position.x) * 0.05;
      camera.position.y += (targetY - camera.position.y) * 0.05;
      camera.lookAt(scene.position);

      particlesMesh.rotation.y = time * 0.3;
      particlesMesh.rotation.x = time * 0.2;

      const positions = particlesGeometry.attributes.position.array;
      for (let i = 0; i < positions.length; i += 3) {
        positions[i + 1] = Math.sin(time * 2 + positions[i] * 0.1) * 2;
      }
      particlesGeometry.attributes.position.needsUpdate = true;

      meshes.forEach((mesh, idx) => {
        mesh.rotation.x += 0.003 + idx * 0.0001;
        mesh.rotation.y += 0.005 + idx * 0.0001;
        mesh.position.y += Math.sin(time * 2 + idx) * 0.01;
      });

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);

      geometries.forEach((g) => g.dispose());
      materials.forEach((m) => m.dispose());
      particlesGeometry.dispose();
      particlesMaterial.dispose();
      renderer.dispose();
    };
  });
</script>

<canvas bind:this={canvas} class="fixed inset-0 -z-10"></canvas>

<style>
  canvas {
    display: block;
    background: linear-gradient(180deg, #0a0e1a 0%, #1a1f2e 100%);
  }
</style>
