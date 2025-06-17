const params = new URLSearchParams(window.location.search);
const modelo = params.get('modelo');

fetch('modelos/modelos.json')
  .then(res => res.json())
  .then(data => {
    const info = data[modelo];
    if (!info) {
      document.body.innerHTML = '<p>Modelo no encontrado</p>';
      return;
    }

    document.getElementById('nombre-modelo').textContent = modelo;
    document.getElementById('descripcion').textContent = info.descripcion;

    const ul = document.getElementById('puntos');
    info.puntos.forEach(p => {
      const li = document.createElement('li');
      li.textContent = `${p.nombre} (${p.funcion}) - Voltaje: ${p.voltaje_esperado}`;
      ul.appendChild(li);
    });

    // Modelo 3D de prueba
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(400, 400);
    document.getElementById('modelo-3d').appendChild(renderer.domElement);

    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({ color: 0x0077ff });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    camera.position.z = 2;
    function animate() {
      requestAnimationFrame(animate);
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
      renderer.render(scene, camera);
    }
    animate();
  });