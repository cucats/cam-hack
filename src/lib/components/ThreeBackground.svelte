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
      1000
    );

    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      alpha: true,
      antialias: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 5000;
    const posArray = new Float32Array(particlesCount * 3);
    const colorArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i += 3) {
      posArray[i] = (Math.random() - 0.5) * 60;
      posArray[i + 1] = (Math.random() - 0.5) * 60;
      posArray[i + 2] = (Math.random() - 0.5) * 60;

      const color = new THREE.Color();
      const hue = 0.3 + Math.random() * 0.2;
      color.setHSL(hue, 0.8, 0.5 + Math.random() * 0.3);
      colorArray[i] = color.r;
      colorArray[i + 1] = color.g;
      colorArray[i + 2] = color.b;
    }

    particlesGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(posArray, 3)
    );
    particlesGeometry.setAttribute(
      "color",
      new THREE.BufferAttribute(colorArray, 3)
    );

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.08,
      vertexColors: true,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending,
    });

    const particlesMesh = new THREE.Points(
      particlesGeometry,
      particlesMaterial
    );
    scene.add(particlesMesh);

    const torusGeometry = new THREE.TorusGeometry(2, 0.5, 16, 100);
    const material1 = new THREE.MeshStandardMaterial({
      color: 0x34d399,
      emissive: 0x10b981,
      emissiveIntensity: 0.5,
      metalness: 0.9,
      roughness: 0.1,
    });

    const torus1 = new THREE.Mesh(torusGeometry, material1);
    scene.add(torus1);

    const torus2 = new THREE.Mesh(torusGeometry, material1.clone());
    torus2.material.color.setHex(0x6ee7b7);
    torus2.material.emissive.setHex(0x34d399);
    torus2.position.set(6, -4, -6);
    scene.add(torus2);

    const torus3 = new THREE.Mesh(torusGeometry, material1.clone());
    torus3.material.color.setHex(0x059669);
    torus3.material.emissive.setHex(0x047857);
    torus3.position.set(-6, 4, -6);
    scene.add(torus3);

    const ringGeometry = new THREE.RingGeometry(3, 3.5, 32);
    const ringMaterial = new THREE.MeshStandardMaterial({
      color: 0x10b981,
      emissive: 0x34d399,
      emissiveIntensity: 0.4,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.6,
    });

    const ring1 = new THREE.Mesh(ringGeometry, ringMaterial);
    ring1.rotation.x = Math.PI / 2;
    ring1.position.set(0, 0, -8);
    scene.add(ring1);

    const ring2 = new THREE.Mesh(ringGeometry, ringMaterial.clone());
    ring2.rotation.y = Math.PI / 4;
    ring2.position.set(4, -2, -7);
    scene.add(ring2);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0x10b981, 1.5, 50);
    pointLight1.position.set(5, 5, 5);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x34d399, 1, 50);
    pointLight2.position.set(-5, -5, 5);
    scene.add(pointLight2);

    const directionalLight = new THREE.DirectionalLight(0x6ee7b7, 0.5);
    directionalLight.position.set(0, 10, 5);
    scene.add(directionalLight);

    camera.position.z = 12;
    camera.position.y = 2;

    let time = 0;
    let mouseX = 0;
    let mouseY = 0;

    function onMouseMove(event) {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    }

    window.addEventListener("mousemove", onMouseMove);

    function animate() {
      requestAnimationFrame(animate);

      time += 0.008;

      camera.position.x += (mouseX * 2 - camera.position.x) * 0.05;
      camera.position.y += (mouseY * 2 + 2 - camera.position.y) * 0.05;
      camera.lookAt(0, 0, 0);

      torus1.rotation.x += 0.012;
      torus1.rotation.y += 0.008;
      torus1.position.y = Math.sin(time) * 0.8;
      torus1.position.x = Math.cos(time * 0.7) * 0.5;

      torus2.rotation.x -= 0.01;
      torus2.rotation.y += 0.012;
      torus2.position.y = Math.cos(time * 0.9) * 0.6;
      torus2.position.x = 6 + Math.sin(time * 0.8) * 0.4;

      torus3.rotation.x += 0.008;
      torus3.rotation.y -= 0.01;
      torus3.position.y = 4 + Math.sin(time * 1.1) * 0.7;
      torus3.position.x = -6 + Math.cos(time * 0.9) * 0.5;

      ring1.rotation.z += 0.005;
      ring2.rotation.z -= 0.008;
      ring2.rotation.x += 0.003;

      particlesMesh.rotation.y += 0.0003;
      particlesMesh.rotation.x += 0.0002;

      const positions = particlesMesh.geometry.attributes.position.array;
      for (let i = 0; i < particlesCount; i++) {
        const i3 = i * 3;
        positions[i3 + 1] += Math.sin(time * 2 + positions[i3] * 0.01) * 0.002;
        positions[i3] += Math.cos(time * 1.5 + positions[i3 + 1] * 0.01) * 0.001;
      }
      particlesMesh.geometry.attributes.position.needsUpdate = true;

      pointLight1.position.x = Math.sin(time) * 5;
      pointLight1.position.y = Math.cos(time) * 5;
      pointLight2.position.x = Math.cos(time * 0.8) * -5;
      pointLight2.position.y = Math.sin(time * 0.8) * -5;

      renderer.render(scene, camera);
    }

    animate();

    function handleResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", onMouseMove);
      renderer.dispose();
    };
  });
</script>

<canvas bind:this={canvas} class="fixed inset-0 -z-10"></canvas>
