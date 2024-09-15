import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

//Crear la escena
const scene = new THREE.Scene();

//Configurar la cámara (FOV, aspecto, near, far)
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 2; // Alejar la cámara del modelo

//Configurar el renderizador
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement); // Agregar el canvas generado al DOM

//Configurar controles de órbita
const controls = new OrbitControls(camera, renderer.domElement);

//Añadir luz ambiental (ilumina todo de forma uniforme)
const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
scene.add(ambientLight);

//Añadir luz direccional (simula luz del sol)
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 10, 7).normalize();
scene.add(directionalLight);

// Cargar el modelo GLTF/GLB con un único loader
const loader = new GLTFLoader();
loader.load(
  '/PKMbllDiorama.gltf', // Ruta al archivo GLTF en la raíz
  function (gltf) {
    const model = gltf.scene;
    scene.add(model);

    //Ajustar la escala del modelo si es necesario
    model.scale.set(1, 1, 1); // Escalar el modelo (puedes cambiar estos valores)

    //Función de animación
    function animate() {
      requestAnimationFrame(animate);
      model.rotation.y += 0.01; // Rotar el modelo sobre el eje Y para verlo girar
      controls.update(); // Actualizar controles
      renderer.render(scene, camera);
    }

    animate(); //Iniciar la animación
  },
  undefined,
  function (error) {
    console.error('Ocurrió un error al cargar el modelo:', error);
  }
);

//Ajustar el renderizado al cambiar el tamaño de la ventana
window.addEventListener('resize', function () {
  const width = window.innerWidth;
  const height = window.innerHeight;
  renderer.setSize(width, height);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
});
