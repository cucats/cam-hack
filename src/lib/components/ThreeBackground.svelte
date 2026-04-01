<script>
  import { onMount, onDestroy } from "svelte";
  import * as THREE from "three";

  let container;
  let renderer, scene, camera;
  let particles, particleSystem;
  let geometryLines;
  let mouseX = 0,
    mouseY = 0;
  let animationFrameId;
  let clock;

  onMount(() => {
    init();
    animate();

    window.addEventListener("resize", onWindowResize);
    window.addEventListener("mousemove", onMouseMove);

    return () => {
      window.removeEventListener("resize", onWindowResize);
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(animationFrameId);
      if (renderer) {
        renderer.dispose();
      }
    };
  });

  function init() {
    clock = new THREE.Clock();

    scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0a0f0d, 0.0008);

    camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      1,
      10000
    );
    camera.position.z = 1000;

    const particleCount = 5000;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);

    const color1 = new THREE.Color(0x00ff88);
    const color2 = new THREE.Color(0x00ffcc);
    const color3 = new THREE.Color(0x88ff00);

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 4000;
      positions[i3 + 1] = (Math.random() - 0.5) * 4000;
      positions[i3 + 2] = (Math.random() - 0.5) * 4000;

      const colorChoice = Math.random();
      let c;
      if (colorChoice < 0.33) c = color1;
      else if (colorChoice < 0.66) c = color2;
      else c = color3;

      colors[i3] = c.r;
      colors[i3 + 1] = c.g;
      colors[i3 + 2] = c.b;

      sizes[i] = Math.random() * 4 + 1;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute("size", new THREE.BufferAttribute(sizes, 1));

    const vertexShader = `
      attribute float size;
      varying vec3 vColor;
      void main() {
        vColor = color;
        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        gl_PointSize = size * (300.0 / -mvPosition.z);
        gl_Position = projectionMatrix * mvPosition;
      }
    `;

    const fragmentShader = `
      varying vec3 vColor;
      void main() {
        float dist = length(gl_PointCoord - vec2(0.5));
        if (dist > 0.5) discard;
        float alpha = 1.0 - smoothstep(0.3, 0.5, dist);
        gl_FragColor = vec4(vColor, alpha * 0.8);
      }
    `;

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      transparent: true,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    particleSystem = new THREE.Points(geometry, material);
    scene.add(particleSystem);

    const lineCount = 100;
    const linePositions = new Float32Array(lineCount * 6);
    const lineColors = new Float32Array(lineCount * 6);

    for (let i = 0; i < lineCount; i++) {
      const i6 = i * 6;
      const x1 = (Math.random() - 0.5) * 3000;
      const y1 = (Math.random() - 0.5) * 3000;
      const z1 = (Math.random() - 0.5) * 3000;
      const x2 = x1 + (Math.random() - 0.5) * 500;
      const y2 = y1 + (Math.random() - 0.5) * 500;
      const z2 = z1 + (Math.random() - 0.5) * 500;

      linePositions[i6] = x1;
      linePositions[i6 + 1] = y1;
      linePositions[i6 + 2] = z1;
      linePositions[i6 + 3] = x2;
      linePositions[i6 + 4] = y2;
      linePositions[i6 + 5] = z2;

      const intensity = Math.random() * 0.5 + 0.5;
      lineColors[i6] = 0;
      lineColors[i6 + 1] = intensity;
      lineColors[i6 + 2] = intensity * 0.5;
      lineColors[i6 + 3] = 0;
      lineColors[i6 + 4] = intensity * 0.8;
      lineColors[i6 + 5] = intensity * 0.3;
    }

    geometryLines = new THREE.BufferGeometry();
    geometryLines.setAttribute(
      "position",
      new THREE.BufferAttribute(linePositions, 3)
    );
    geometryLines.setAttribute(
      "color",
      new THREE.BufferAttribute(lineColors, 3)
    );

    const lineMaterial = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.4,
      blending: THREE.AdditiveBlending,
    });

    const lines = new THREE.LineSegments(geometryLines, lineMaterial);
    scene.add(lines);

    const torusGeometry = new THREE.TorusGeometry(600, 2, 16, 100);
    const torusMaterial = new THREE.MeshBasicMaterial({
      color: 0x00ff88,
      transparent: true,
      opacity: 0.15,
      wireframe: true,
    });
    const torus = new THREE.Mesh(torusGeometry, torusMaterial);
    torus.name = "torus";
    scene.add(torus);

    const icosaGeometry = new THREE.IcosahedronGeometry(400, 1);
    const icosaMaterial = new THREE.MeshBasicMaterial({
      color: 0x00ffaa,
      transparent: true,
      opacity: 0.1,
      wireframe: true,
    });
    const icosahedron = new THREE.Mesh(icosaGeometry, icosaMaterial);
    icosahedron.name = "icosahedron";
    scene.add(icosahedron);

    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x0a0f0d, 1);
    container.appendChild(renderer.domElement);
  }

  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }

  function onMouseMove(event) {
    mouseX = (event.clientX - window.innerWidth / 2) * 0.05;
    mouseY = (event.clientY - window.innerHeight / 2) * 0.05;
  }

  function animate() {
    animationFrameId = requestAnimationFrame(animate);

    const time = clock.getElapsedTime();

    camera.position.x += (mouseX - camera.position.x) * 0.02;
    camera.position.y += (-mouseY - camera.position.y) * 0.02;
    camera.lookAt(scene.position);

    particleSystem.rotation.y = time * 0.03;
    particleSystem.rotation.x = time * 0.01;

    const torus = scene.getObjectByName("torus");
    if (torus) {
      torus.rotation.x = time * 0.2;
      torus.rotation.y = time * 0.15;
    }

    const icosahedron = scene.getObjectByName("icosahedron");
    if (icosahedron) {
      icosahedron.rotation.x = -time * 0.1;
      icosahedron.rotation.y = time * 0.08;
    }

    const positions = particleSystem.geometry.attributes.position.array;
    for (let i = 0; i < positions.length; i += 3) {
      positions[i + 1] += Math.sin(time + positions[i] * 0.01) * 0.3;
    }
    particleSystem.geometry.attributes.position.needsUpdate = true;

    renderer.render(scene, camera);
  }
</script>

<div bind:this={container} class="three-container"></div>

<style>
  .three-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    pointer-events: none;
  }

  .three-container :global(canvas) {
    display: block;
  }
</style>
