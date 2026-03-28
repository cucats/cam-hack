<script>
  import { onMount } from "svelte";
  import * as THREE from "three";

  let container;
  let scene, camera, renderer, particles, particleSystem, geometricShapes = [];
  let mouseX = 0, mouseY = 0;
  let targetX = 0, targetY = 0;
  let time = 0;

  onMount(() => {
    init();
    animate();

    const handleMouseMove = (event) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
    };
  });

  function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 50;

    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    const particleCount = 3000;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);

    const color1 = new THREE.Color(0x00ff88);
    const color2 = new THREE.Color(0x88ffb8);
    const color3 = new THREE.Color(0x00cc6a);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 200;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 200;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 200;

      const colorChoice = Math.random();
      const selectedColor = colorChoice < 0.33 ? color1 : colorChoice < 0.66 ? color2 : color3;
      colors[i * 3] = selectedColor.r;
      colors[i * 3 + 1] = selectedColor.g;
      colors[i * 3 + 2] = selectedColor.b;

      sizes[i] = Math.random() * 2 + 0.5;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute("size", new THREE.BufferAttribute(sizes, 1));

    const material = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 }
      },
      vertexShader: `
        attribute float size;
        attribute vec3 color;
        varying vec3 vColor;
        uniform float time;
        
        void main() {
          vColor = color;
          vec3 pos = position;
          pos.x += sin(time * 0.3 + position.y * 0.01) * 2.0;
          pos.y += cos(time * 0.2 + position.x * 0.01) * 2.0;
          pos.z += sin(time * 0.4 + position.x * 0.01 + position.y * 0.01) * 2.0;
          
          vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
          gl_PointSize = size * (300.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        
        void main() {
          float dist = length(gl_PointCoord - vec2(0.5));
          if (dist > 0.5) discard;
          
          float alpha = 1.0 - smoothstep(0.3, 0.5, dist);
          gl_FragColor = vec4(vColor, alpha * 0.8);
        }
      `,
      transparent: true,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    particleSystem = new THREE.Points(geometry, material);
    scene.add(particleSystem);

    const geometryLines = new THREE.BufferGeometry();
    const linePositions = [];
    const lineColors = [];

    for (let i = 0; i < 100; i++) {
      const start = new THREE.Vector3(
        (Math.random() - 0.5) * 150,
        (Math.random() - 0.5) * 150,
        (Math.random() - 0.5) * 150
      );
      const end = new THREE.Vector3(
        start.x + (Math.random() - 0.5) * 30,
        start.y + (Math.random() - 0.5) * 30,
        start.z + (Math.random() - 0.5) * 30
      );

      linePositions.push(start.x, start.y, start.z);
      linePositions.push(end.x, end.y, end.z);

      const color = new THREE.Color(0x00ff88);
      lineColors.push(color.r, color.g, color.b);
      lineColors.push(color.r, color.g, color.b);
    }

    geometryLines.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(linePositions, 3)
    );
    geometryLines.setAttribute(
      "color",
      new THREE.Float32BufferAttribute(lineColors, 3)
    );

    const materialLines = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.15,
      blending: THREE.AdditiveBlending
    });

    const lines = new THREE.LineSegments(geometryLines, materialLines);
    scene.add(lines);

    const shapeGeometries = [
      new THREE.OctahedronGeometry(1),
      new THREE.TetrahedronGeometry(1),
      new THREE.IcosahedronGeometry(1, 0)
    ];

    for (let i = 0; i < 15; i++) {
      const geometry = shapeGeometries[Math.floor(Math.random() * shapeGeometries.length)];
      const material = new THREE.MeshBasicMaterial({
        color: 0x00ff88,
        wireframe: true,
        transparent: true,
        opacity: 0.15
      });
      const mesh = new THREE.Mesh(geometry, material);
      
      mesh.position.set(
        (Math.random() - 0.5) * 150,
        (Math.random() - 0.5) * 150,
        (Math.random() - 0.5) * 100
      );
      
      mesh.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );
      
      const scale = Math.random() * 2 + 1;
      mesh.scale.set(scale, scale, scale);
      
      mesh.userData = {
        rotationSpeed: {
          x: (Math.random() - 0.5) * 0.02,
          y: (Math.random() - 0.5) * 0.02,
          z: (Math.random() - 0.5) * 0.02
        },
        floatSpeed: Math.random() * 0.5 + 0.3,
        floatOffset: Math.random() * Math.PI * 2
      };
      
      geometricShapes.push(mesh);
      scene.add(mesh);
    }
  }

  function animate() {
    requestAnimationFrame(animate);

    time += 0.016;
    targetX += (mouseX - targetX) * 0.02;
    targetY += (mouseY - targetY) * 0.02;

    if (particleSystem) {
      particleSystem.rotation.x += 0.0002;
      particleSystem.rotation.y += 0.0003;
      particleSystem.position.x = targetX * 10;
      particleSystem.position.y = targetY * 10;
      
      particleSystem.material.uniforms.time.value = time;
    }

    geometricShapes.forEach((shape) => {
      shape.rotation.x += shape.userData.rotationSpeed.x;
      shape.rotation.y += shape.userData.rotationSpeed.y;
      shape.rotation.z += shape.userData.rotationSpeed.z;
      
      shape.position.y += Math.sin(time * shape.userData.floatSpeed + shape.userData.floatOffset) * 0.05;
      
      const distance = Math.sqrt(
        Math.pow(mouseX * 50 - shape.position.x, 2) +
        Math.pow(mouseY * 50 - shape.position.y, 2)
      );
      
      if (distance < 30) {
        shape.material.opacity = Math.min(0.4, 0.15 + (30 - distance) / 100);
      } else {
        shape.material.opacity += (0.15 - shape.material.opacity) * 0.1;
      }
    });

    renderer.render(scene, camera);
  }
</script>

<div bind:this={container} class="three-background"></div>

<style>
  .three-background {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    pointer-events: none;
  }

  .three-background :global(canvas) {
    display: block;
  }
</style>
