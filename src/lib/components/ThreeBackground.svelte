<script>
  import { onMount, onDestroy } from "svelte";
  import * as THREE from "three";

  let container;
  let scene, camera, renderer;
  let particles, wireframeMesh, gridHelper;
  let mouseX = 0,
    mouseY = 0;
  let animationId;
  let clock;

  onMount(() => {
    init();
    animate();

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("resize", onWindowResize);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onWindowResize);
      if (animationId) cancelAnimationFrame(animationId);
      if (renderer) {
        renderer.dispose();
        container.removeChild(renderer.domElement);
      }
    };
  });

  function init() {
    clock = new THREE.Clock();

    scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x030806, 0.0008);

    camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      1,
      5000,
    );
    camera.position.z = 1000;
    camera.position.y = 200;

    const particleCount = 2000;
    const particleGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);

    const color1 = new THREE.Color(0x00ff88);
    const color2 = new THREE.Color(0x00ffff);

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 4000;
      positions[i3 + 1] = (Math.random() - 0.5) * 4000;
      positions[i3 + 2] = (Math.random() - 0.5) * 4000;

      const mixRatio = Math.random();
      const mixedColor = color1.clone().lerp(color2, mixRatio);
      colors[i3] = mixedColor.r;
      colors[i3 + 1] = mixedColor.g;
      colors[i3 + 2] = mixedColor.b;

      sizes[i] = Math.random() * 4 + 1;
    }

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
      size: 3,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
    });

    particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    const icosahedronGeometry = new THREE.IcosahedronGeometry(300, 1);
    const wireframeMaterial = new THREE.MeshBasicMaterial({
      color: 0x00ff88,
      wireframe: true,
      transparent: true,
      opacity: 0.15,
    });
    wireframeMesh = new THREE.Mesh(icosahedronGeometry, wireframeMaterial);
    wireframeMesh.position.set(0, 0, -500);
    scene.add(wireframeMesh);

    const torusGeometry = new THREE.TorusGeometry(400, 2, 16, 100);
    const torusMaterial = new THREE.MeshBasicMaterial({
      color: 0x00ffff,
      transparent: true,
      opacity: 0.2,
    });
    const torus = new THREE.Mesh(torusGeometry, torusMaterial);
    torus.rotation.x = Math.PI / 2;
    torus.position.y = -300;
    scene.add(torus);

    const torus2 = new THREE.Mesh(
      new THREE.TorusGeometry(500, 1, 16, 100),
      new THREE.MeshBasicMaterial({
        color: 0x00ff88,
        transparent: true,
        opacity: 0.1,
      }),
    );
    torus2.rotation.x = Math.PI / 2;
    torus2.position.y = -300;
    scene.add(torus2);

    const gridSize = 4000;
    const gridDivisions = 40;
    gridHelper = new THREE.GridHelper(
      gridSize,
      gridDivisions,
      0x00ff88,
      0x00ff88,
    );
    gridHelper.material.transparent = true;
    gridHelper.material.opacity = 0.1;
    gridHelper.position.y = -500;
    scene.add(gridHelper);

    for (let i = 0; i < 20; i++) {
      const geometry = new THREE.OctahedronGeometry(Math.random() * 30 + 10);
      const material = new THREE.MeshBasicMaterial({
        color: Math.random() > 0.5 ? 0x00ff88 : 0x00ffff,
        wireframe: true,
        transparent: true,
        opacity: 0.3,
      });
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(
        (Math.random() - 0.5) * 2000,
        (Math.random() - 0.5) * 1000,
        (Math.random() - 0.5) * 2000,
      );
      mesh.userData = {
        rotationSpeed: Math.random() * 0.02,
        floatSpeed: Math.random() * 0.5 + 0.5,
        floatOffset: Math.random() * Math.PI * 2,
      };
      scene.add(mesh);
    }

    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);
  }

  function animate() {
    animationId = requestAnimationFrame(animate);
    const elapsedTime = clock.getElapsedTime();

    camera.position.x += (mouseX * 0.5 - camera.position.x) * 0.02;
    camera.position.y += (-mouseY * 0.3 + 200 - camera.position.y) * 0.02;
    camera.lookAt(scene.position);

    particles.rotation.y += 0.0003;
    particles.rotation.x += 0.0001;

    wireframeMesh.rotation.x += 0.002;
    wireframeMesh.rotation.y += 0.003;
    wireframeMesh.scale.setScalar(1 + Math.sin(elapsedTime * 0.5) * 0.1);

    scene.children.forEach((child) => {
      if (child.userData && child.userData.rotationSpeed) {
        child.rotation.x += child.userData.rotationSpeed;
        child.rotation.y += child.userData.rotationSpeed * 0.7;
        child.position.y +=
          Math.sin(
            elapsedTime * child.userData.floatSpeed +
              child.userData.floatOffset,
          ) * 0.5;
      }
    });

    renderer.render(scene, camera);
  }

  function onMouseMove(event) {
    mouseX = event.clientX - window.innerWidth / 2;
    mouseY = event.clientY - window.innerHeight / 2;
  }

  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }
</script>

<div bind:this={container} class="fixed inset-0 -z-10 overflow-hidden"></div>
