import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { Timer } from "three/addons/misc/Timer.js";
import GUI from "lil-gui";
import { and, depth, threshold } from "three/tsl";
import { Plane, PlaneGeometry } from "three/webgpu";

/**
 * Base
 */
// Debug
const gui = new GUI();

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

/**
 * House
 */
/**
 * Floor
 */
const floor = new THREE.Mesh(new THREE.PlaneGeometry(20, 20), new THREE.MeshStandardMaterial());
floor.rotation.x = -Math.PI * 0.5;
scene.add(floor);

// House container
const house = new THREE.Group();
scene.add(house);

// Walls
const wallsMesurements = {
  width: 4,
  height: 2.5,
  depth: 4,
};
const walls = new THREE.Mesh(
  new THREE.BoxGeometry(wallsMesurements.width, wallsMesurements.height, wallsMesurements.depth),
  new THREE.MeshStandardMaterial(),
);
walls.position.y += wallsMesurements.height / 2; // the walls were buried because the origin of geometry is center, so need to move up
house.add(walls);

// Roof
const roofMesurements = {
  radius: 3.5,
  height: 2,
  segments: 4.5,
};
const roof = new THREE.Mesh(
  new THREE.ConeGeometry(roofMesurements.radius, roofMesurements.height, roofMesurements.segments),
  new THREE.MeshStandardMaterial(),
);
roof.position.y += wallsMesurements.height + roofMesurements.height / 2;
roof.rotation.y = Math.PI * 0.25;
house.add(roof);

// Door
const doorMeasurments = {
  width: 2,
  height: 2,
};
const door = new THREE.Mesh(
  new PlaneGeometry(doorMeasurments.width, doorMeasurments.height),
  new THREE.MeshStandardMaterial({ color: "red" }),
);
door.position.y = doorMeasurments.height / 2;
door.position.z = wallsMesurements.width / 2 + 0.01;
house.add(door);

// Bushes
const bushGeometry = new THREE.SphereGeometry(1, 16, 16);
const bushMaterial = new THREE.MeshStandardMaterial();
const bush1 = new THREE.Mesh(bushGeometry, bushMaterial);
bush1.scale.set(0.5, 0.5, 0.5);
bush1.position.set(0.8, 0.2, 2.2);

const bush2 = new THREE.Mesh(bushGeometry, bushMaterial);
bush2.scale.set(0.25, 0.25, 0.25);
bush2.position.set(1.4, 0.1, 2.1);

const bush3 = new THREE.Mesh(bushGeometry, bushMaterial);
bush3.scale.set(0.4, 0.4, 0.4);
bush3.position.set(-0.8, 0.1, 2.2);

const bush4 = new THREE.Mesh(bushGeometry, bushMaterial);
bush4.scale.set(0.15, 0.15, 0.15);
bush4.position.set(-1, 0.05, 2.6);

const bush5 = new THREE.Mesh(bushGeometry, bushMaterial);
bush5.scale.set(0.15, 0.15, 0.15);
bush5.position.set(-2, 0.05, 2.6);

const bush6 = new THREE.Mesh(bushGeometry, bushMaterial);
bush6.scale.set(0.25, 0.25, 0.25);
bush6.position.set(-2, 0.05, -2.0);

const bush7 = new THREE.Mesh(bushGeometry, bushMaterial);
bush7.scale.set(0.55, 0.5, 0.55);
bush7.position.set(2.0, 0.1, -2.1);

house.add(bush1, bush2, bush3, bush4, bush5, bush6, bush7);

// Graves
const graves = new THREE.Group();
scene.add(graves);

const gravesGeometry = new THREE.BoxGeometry(0.6, 0.8, 0.2);
const graveMaterial = new THREE.MeshStandardMaterial();

for (let i = 0; i < 30; i++) {
  const angle = Math.random() * Math.PI * 2;
  const radius = 3 + Math.random() * 4;
  const x = Math.sin(angle) * 4;
  const z = Math.cos(angle) * 4;
  const grave = new THREE.Mesh(gravesGeometry, graveMaterial);
  grave.position.x = x;
  grave.position.y = Math.random() * 0.4;
  grave.position.z = z;

  grave.rotation.x = (Math.random() - 0.5) * 0.4;
  grave.rotation.y = (Math.random() - 0.5) * 0.4;
  grave.rotation.z = (Math.random() - 0.5) * 0.4;

  graves.add(grave);
}

/**
 * Lights
 */
// Ambient light
const ambientLight = new THREE.AmbientLight("#ffffff", 0.5);
scene.add(ambientLight);

// Directional light
const directionalLight = new THREE.DirectionalLight("#ffffff", 1.5);
directionalLight.position.set(3, 2, -8);
scene.add(directionalLight);

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);
camera.position.x = 4;
camera.position.y = 2;
camera.position.z = 5;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
const timer = new Timer();

const tick = () => {
  // Timer
  timer.update();
  const elapsedTime = timer.getElapsed();

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
