<script>
  import { onMount } from "svelte";
  import * as THREE from "three";

  let canvas;
  let scene, camera, renderer, particles, lines, geometricShapes;
  let mouseX = 0,
    mouseY = 0;
  let targetMouseX = 0,
    targetMouseY = 0;
  let scrollY = 0;

  onMount(() => {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000,
    );
    camera.position.z = 30;

    renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      alpha: true,
      antialias: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    const particleCount = 1500;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const color1 = new THREE.Color(0x86e293);
    const color2 = new THREE.Color(0x86e6c6);
    const color3 = new THREE.Color(0x10b981);

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 100;
      positions[i + 1] = (Math.random() - 0.5) * 100;
      positions[i + 2] = (Math.random() - 0.5) * 100;

      const colorChoice = Math.random();
      let color;
      if (colorChoice < 0.33) {
        color = color1;
      } else if (colorChoice < 0.66) {
        color = color2;
      } else {
        color = color3;
      }

      colors[i] = color.r;
      colors[i + 1] = color.g;
      colors[i + 2] = color.b;
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 0.5,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
    });

    particles = new THREE.Points(geometry, material);
    scene.add(particles);

    const lineGeometry = new THREE.BufferGeometry();
    const linePositions = [];
    const lineColors = [];

    for (let i = 0; i < 200; i++) {
      const idx1 = Math.floor(Math.random() * particleCount) * 3;
      const idx2 = Math.floor(Math.random() * particleCount) * 3;

      linePositions.push(
        positions[idx1],
        positions[idx1 + 1],
        positions[idx1 + 2],
      );
      linePositions.push(
        positions[idx2],
        positions[idx2 + 1],
        positions[idx2 + 2],
      );

      const lineColor = new THREE.Color(0x86e293);
      lineColors.push(lineColor.r, lineColor.g, lineColor.b);
      lineColors.push(lineColor.r, lineColor.g, lineColor.b);
    }

    lineGeometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(linePositions, 3),
    );
    lineGeometry.setAttribute(
      "color",
      new THREE.Float32BufferAttribute(lineColors, 3),
    );

    const lineMaterial = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.15,
      blending: THREE.AdditiveBlending,
    });

    lines = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(lines);

    geometricShapes = new THREE.Group();

    const octaGeometry = new THREE.OctahedronGeometry(3, 0);
    const octaMaterial = new THREE.MeshStandardMaterial({
      color: 0x86e293,
      wireframe: true,
      transparent: true,
      opacity: 0.3,
    });
    const octahedron = new THREE.Mesh(octaGeometry, octaMaterial);
    octahedron.position.set(-15, 10, -20);
    geometricShapes.add(octahedron);

    const torusGeometry = new THREE.TorusGeometry(4, 0.5, 16, 100);
    const torusMaterial = new THREE.MeshStandardMaterial({
      color: 0x86e6c6,
      wireframe: true,
      transparent: true,
      opacity: 0.25,
    });
    const torus = new THREE.Mesh(torusGeometry, torusMaterial);
    torus.position.set(15, -8, -25);
    geometricShapes.add(torus);

    const icosaGeometry = new THREE.IcosahedronGeometry(2.5, 0);
    const icosaMaterial = new THREE.MeshStandardMaterial({
      color: 0x10b981,
      wireframe: true,
      transparent: true,
      opacity: 0.3,
    });
    const icosahedron = new THREE.Mesh(icosaGeometry, icosaMaterial);
    icosahedron.position.set(0, -15, -15);
    geometricShapes.add(icosahedron);

    const tetraGeometry = new THREE.TetrahedronGeometry(3, 0);
    const tetraMaterial = new THREE.MeshStandardMaterial({
      color: 0x86e293,
      wireframe: true,
      transparent: true,
      opacity: 0.2,
    });
    const tetrahedron = new THREE.Mesh(tetraGeometry, tetraMaterial);
    tetrahedron.position.set(-10, -12, -30);
    geometricShapes.add(tetrahedron);

    scene.add(geometricShapes);

    const ambientLight = new THREE.AmbientLight(0x86e293, 0.5);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0x86e6c6, 1.5, 100);
    pointLight1.position.set(10, 10, 10);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x10b981, 1, 100);
    pointLight2.position.set(-10, -10, 10);
    scene.add(pointLight2);

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll);

    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
      renderer.dispose();
    };
  });

  function handleResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }

  function handleMouseMove(event) {
    targetMouseX = (event.clientX / window.innerWidth) * 2 - 1;
    targetMouseY = -(event.clientY / window.innerHeight) * 2 + 1;
  }

  function handleScroll() {
    scrollY = window.scrollY;
  }

  function animate() {
    requestAnimationFrame(animate);

    mouseX += (targetMouseX - mouseX) * 0.05;
    mouseY += (targetMouseY - mouseY) * 0.05;

    particles.rotation.x += 0.0005;
    particles.rotation.y += 0.0005;

    lines.rotation.x = particles.rotation.x;
    lines.rotation.y = particles.rotation.y;

    camera.position.x += (mouseX * 5 - camera.position.x) * 0.05;
    camera.position.y += (mouseY * 5 - camera.position.y) * 0.05;
    camera.position.z = 30 + scrollY * 0.01;
    camera.lookAt(scene.position);

    const positions = particles.geometry.attributes.position.array;
    const time = Date.now() * 0.0001;

    for (let i = 0; i < positions.length; i += 3) {
      positions[i + 1] += Math.sin(time + positions[i]) * 0.01;
    }
    particles.geometry.attributes.position.needsUpdate = true;

    geometricShapes.children.forEach((shape, index) => {
      shape.rotation.x += 0.002 + index * 0.0005;
      shape.rotation.y += 0.001 + index * 0.0003;
      shape.rotation.z += 0.0015 + index * 0.0004;

      shape.position.y += Math.sin(time * 2 + index) * 0.02;
      shape.position.x += Math.cos(time * 1.5 + index) * 0.01;
    });

    renderer.render(scene, camera);
  }
</script>

<canvas bind:this={canvas} class="fixed inset-0 -z-10"></canvas>
