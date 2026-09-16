import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import GUI from "lil-gui";
import { Sky, Timer } from "three/examples/jsm/Addons.js";
import * as Tone from "tone";

/**
 * Base
 */
// Debug
const gui = new GUI();
gui.hide();

window.addEventListener("keydown", (event) => {
  if (event.key == "h") gui.show(gui._hidden);
});

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader();

// Floor Texture
const floorAlphaTexture = textureLoader.load("./floor/alpha.webp");

const floorColorTexture = textureLoader.load(
  "./floor/coast_sand_rocks_02_1k/coast_sand_rocks_02_diff_1k.webp",
);
floorColorTexture.repeat.set(8, 8);
floorColorTexture.wrapS = THREE.RepeatWrapping;
floorColorTexture.wrapT = THREE.RepeatWrapping;
floorColorTexture.colorSpace = THREE.SRGBColorSpace;

const floorARMTexture = textureLoader.load(
  "./floor/coast_sand_rocks_02_1k/coast_sand_rocks_02_arm_1k.webp",
);
floorARMTexture.repeat.set(8, 8);
floorARMTexture.wrapS = THREE.RepeatWrapping;
floorARMTexture.wrapT = THREE.RepeatWrapping;

const floorNormalTexture = textureLoader.load(
  "./floor/coast_sand_rocks_02_1k/coast_sand_rocks_02_nor_gl_1k.webp",
);
floorNormalTexture.repeat.set(8, 8);
floorNormalTexture.wrapS = THREE.RepeatWrapping;
floorNormalTexture.wrapT = THREE.RepeatWrapping;

const floorDisplacementTexture = textureLoader.load(
  "./floor/coast_sand_rocks_02_1k/coast_sand_rocks_02_disp_1k.webp",
);
floorDisplacementTexture.repeat.set(8, 8);
floorDisplacementTexture.wrapS = THREE.RepeatWrapping;
floorDisplacementTexture.wrapT = THREE.RepeatWrapping;

// Wall Texture
const wallColorTexture = textureLoader.load(
  "./wall/castle_brick_broken_06_1k/castle_brick_broken_06_diff_1k.webp",
);
wallColorTexture.colorSpace = THREE.SRGBColorSpace;
const wallARMTexture = textureLoader.load(
  "./wall/castle_brick_broken_06_1k/castle_brick_broken_06_arm_1k.webp",
);
const wallNormalTexture = textureLoader.load(
  "./wall/castle_brick_broken_06_1k/castle_brick_broken_06_nor_gl_1k.webp",
);

// window Texture
const windowColorTexture = textureLoader.load(
  "./wallpaper/decrepit_wallpaper_1k/decrepit_wallpaper_diff_1k.jpg",
);
windowColorTexture.colorSpace = THREE.SRGBColorSpace;
const windowARMTexture = textureLoader.load(
  "./wallpaper/decrepit_wallpaper_1k/decrepit_wallpaper_arm_1k.jpg",
);
const windowNormalTexture = textureLoader.load(
  "./wallpaper/decrepit_wallpaper_1k/decrepit_wallpaper_nor_gl_1k.jpg",
);

// Roof Texture
const roofColorTexture = textureLoader.load("./roof/roof_slates_02_1k/roof_slates_02_diff_1k.webp");
roofColorTexture.repeat.set(3, 1);
roofColorTexture.wrapS = THREE.RepeatWrapping;
roofColorTexture.colorSpace = THREE.SRGBColorSpace;
const roofARMTexture = textureLoader.load("./roof/roof_slates_02_1k/roof_slates_02_arm_1k.webp");
roofARMTexture.repeat.set(3, 1);
roofARMTexture.wrapS = THREE.RepeatWrapping;
const roofNormalTexture = textureLoader.load(
  "./roof/roof_slates_02_1k/roof_slates_02_nor_gl_1k.webp",
);
roofNormalTexture.repeat.set(3, 1);
roofNormalTexture.wrapS = THREE.RepeatWrapping;

// Buches Texture
const bushColorTexture = textureLoader.load(
  "./bush/leaves_forest_ground_1k/leaves_forest_ground_diff_1k.webp",
);
bushColorTexture.colorSpace = THREE.SRGBColorSpace;
bushColorTexture.repeat.set(2, 1);
bushColorTexture.wrapS = THREE.RepeatWrapping;

const bushARMTexture = textureLoader.load(
  "./bush/leaves_forest_ground_1k/leaves_forest_ground_arm_1k.webp",
);
bushARMTexture.repeat.set(2, 1);
bushARMTexture.wrapS = THREE.RepeatWrapping;

const bushNormalTexture = textureLoader.load(
  "./bush/leaves_forest_ground_1k/leaves_forest_ground_nor_gl_1k.webp",
);
bushNormalTexture.repeat.set(2, 1);
bushNormalTexture.wrapS = THREE.RepeatWrapping;

// Graves Texture
const graveColorTexture = textureLoader.load(
  "./grave/plastered_stone_wall_1k/plastered_stone_wall_diff_1k.webp",
);
graveColorTexture.colorSpace = THREE.SRGBColorSpace;
graveColorTexture.repeat.set(0.3, 0.4);

const graveARMTexture = textureLoader.load(
  "./grave/plastered_stone_wall_1k/plastered_stone_wall_arm_1k.webp",
);
graveARMTexture.repeat.set(0.3, 0.4);

const graveNormalTexture = textureLoader.load(
  "./grave/plastered_stone_wall_1k/plastered_stone_wall_nor_gl_1k.webp",
);
graveNormalTexture.repeat.set(0.3, 0.4);

// Sign Texture
// Post — small, narrow, taller than wide (repeat 1.5, 5.5 on all 4 maps)
const signPostColorTexture = textureLoader.load(
  "./sign/bark_brown_02_1k/bark_brown_02_diff_1k.jpg",
);
signPostColorTexture.repeat.set(1.2, 14);
signPostColorTexture.wrapS = THREE.RepeatWrapping;
signPostColorTexture.wrapT = THREE.RepeatWrapping;
signPostColorTexture.colorSpace = THREE.SRGBColorSpace;

const signPostARMTexture = textureLoader.load("./sign/bark_brown_02_1k/bark_brown_02_arm_1k.jpg");
signPostARMTexture.repeat.set(1.2, 14);
signPostARMTexture.wrapS = THREE.RepeatWrapping;
signPostARMTexture.wrapT = THREE.RepeatWrapping;

const signPostNormalTexture = textureLoader.load(
  "./sign/bark_brown_02_1k/bark_brown_02_nor_gl_1k.jpg",
);
signPostNormalTexture.repeat.set(1.2, 14);
signPostNormalTexture.wrapS = THREE.RepeatWrapping;
signPostNormalTexture.wrapT = THREE.RepeatWrapping;

const signPostDisplacementTexture = textureLoader.load(
  "./sign/bark_brown_02_1k/bark_brown_02_disp_1k.jpg",
);
signPostDisplacementTexture.repeat.set(1.2, 14);
signPostDisplacementTexture.wrapS = THREE.RepeatWrapping;
signPostDisplacementTexture.wrapT = THREE.RepeatWrapping;

const signPostFolder = gui.addFolder("Sign Post Texture");
signPostFolder
  .add(signPostColorTexture.repeat, "y")
  .min(1)
  .max(30)
  .step(0.5)
  .name("postRepeatY")
  .onChange((v) => {
    signPostColorTexture.repeat.y = v;
    signPostARMTexture.repeat.y = v;
    signPostNormalTexture.repeat.y = v;
    signPostDisplacementTexture.repeat.y = v;
  });

// Board — wide, much bigger than the post (repeat 3.6, 1.6 on all 4 maps)
const signBoardColorTexture = textureLoader.load(
  "./sign/bark_brown_02_1k/bark_brown_02_diff_1k.jpg",
);
signBoardColorTexture.repeat.set(2, 1.6);
signBoardColorTexture.wrapS = THREE.RepeatWrapping;
signBoardColorTexture.wrapT = THREE.RepeatWrapping;
signBoardColorTexture.colorSpace = THREE.SRGBColorSpace;

const signBoardARMTexture = textureLoader.load("./sign/bark_brown_02_1k/bark_brown_02_arm_1k.jpg");
signBoardARMTexture.repeat.set(2, 1.6);
signBoardARMTexture.wrapS = THREE.RepeatWrapping;
signBoardARMTexture.wrapT = THREE.RepeatWrapping;

const signBoardNormalTexture = textureLoader.load(
  "./sign/bark_brown_02_1k/bark_brown_02_nor_gl_1k.jpg",
);
signBoardNormalTexture.repeat.set(2, 1.6);
signBoardNormalTexture.wrapS = THREE.RepeatWrapping;
signBoardNormalTexture.wrapT = THREE.RepeatWrapping;

const signBoardDisplacementTexture = textureLoader.load(
  "./sign/bark_brown_02_1k/bark_brown_02_disp_1k.jpg",
);
signBoardDisplacementTexture.repeat.set(2, 1.6);
signBoardDisplacementTexture.wrapS = THREE.RepeatWrapping;
signBoardDisplacementTexture.wrapT = THREE.RepeatWrapping;

const signBoardFolder = gui.addFolder("Sign Board Texture");
signBoardFolder
  .add(signBoardColorTexture.repeat, "y")
  .min(1)
  .max(30)
  .step(0.5)
  .name("postRepeatY")
  .onChange((v) => {
    signBoardColorTexture.repeat.y = v;
    signBoardARMTexture.repeat.y = v;
    signBoardNormalTexture.repeat.y = v;
    signBoardDisplacementTexture.repeat.y = v;
  });
signBoardFolder
  .add(signBoardColorTexture.repeat, "x")
  .min(1)
  .max(30)
  .step(0.5)
  .name("postRepeatX")
  .onChange((v) => {
    signBoardColorTexture.repeat.x = v;
    signBoardARMTexture.repeat.x = v;
    signBoardNormalTexture.repeat.x = v;
    signBoardDisplacementTexture.repeat.x = v;
  });

// Door Texture
const doorColorTexture = textureLoader.load("./door/color.webp");
doorColorTexture.colorSpace = THREE.SRGBColorSpace;
const doorAlphaTexture = textureLoader.load("./door/alpha.webp");
const doorHeightTexture = textureLoader.load("./door/height.webp");
const doorNormalTexture = textureLoader.load("./door/normal.webp");
const doorAmbientOcclusionTexture = textureLoader.load("./door/ambientOcclusion.webp");
const doorMetalnessTexture = textureLoader.load("./door/metalness.webp");
const doorRoughnessTexture = textureLoader.load("./door/roughness.webp");

// Fence Texture
const fenceColorTexture = textureLoader.load("./fence/rough_wood_1k/rough_wood_diff_1k.jpg");
fenceColorTexture.colorSpace = THREE.SRGBColorSpace;
fenceColorTexture.repeat.set(1.2, 4);
fenceColorTexture.wrapS = THREE.RepeatWrapping;
fenceColorTexture.wrapT = THREE.RepeatWrapping;
const fenceARMTexture = textureLoader.load("./fence/rough_wood_1k/rough_wood_arm_1k.jpg");
fenceARMTexture.repeat.set(1.2, 4);
fenceARMTexture.wrapS = THREE.RepeatWrapping;
fenceARMTexture.wrapT = THREE.RepeatWrapping;
const fenceNormalTexture = textureLoader.load("./fence/rough_wood_1k/rough_wood_nor_gl_1k.jpg");
fenceNormalTexture.repeat.set(1.2, 4);
fenceNormalTexture.wrapS = THREE.RepeatWrapping;
fenceNormalTexture.wrapT = THREE.RepeatWrapping;
const fenceDisplacementTexture = textureLoader.load("./fence/rough_wood_1k/rough_wood_disp_1k.jpg");
fenceDisplacementTexture.repeat.set(1.2, 4);
fenceDisplacementTexture.wrapS = THREE.RepeatWrapping;
fenceDisplacementTexture.wrapT = THREE.RepeatWrapping;

/**
 * House
 */
/**
 * Floor
 */
const floor = new THREE.Mesh(
  new THREE.PlaneGeometry(20, 20, 100, 100),
  new THREE.MeshStandardMaterial({
    transparent: true,
    alphaMap: floorAlphaTexture,
    map: floorColorTexture,
    aoMap: floorARMTexture,
    roughnessMap: floorARMTexture,
    metalnessMap: floorARMTexture,
    normalMap: floorNormalTexture,
    displacementMap: floorDisplacementTexture,
    displacementScale: 0.3,
    displacementBias: -0.2,
  }),
);
floor.rotation.x = -Math.PI * 0.5;
scene.add(floor);
gui
  .add(floor.material, "displacementScale")
  .min(0)
  .max(1)
  .step(0.01)
  .name("floorDisplacementScale");
gui.add(floor.material, "displacementBias").min(-1).max(1).step(0.01).name("floorDisplacementBias");

// House container
const house = new THREE.Group();
scene.add(house);

// Walls
const wallsMeasurements = {
  width: 4,
  height: 2.5,
  depth: 4,
};
const walls = new THREE.Mesh(
  new THREE.BoxGeometry(wallsMeasurements.width, wallsMeasurements.height, wallsMeasurements.depth),
  new THREE.MeshStandardMaterial({
    map: wallColorTexture,
    aoMap: wallARMTexture,
    roughnessMap: wallARMTexture,
    metalnessMap: wallARMTexture,
    normalMap: wallNormalTexture,
  }),
);
walls.position.y += wallsMeasurements.height / 2; // the walls were buried because the origin of geometry is center, so need to move up
house.add(walls);

// Window
const windowMeasurements = {
  glass: {
    width: 1.8,
    height: 1.0,
  },
  frame: {
    thickness: 0.1,
    depth: 0.06,
  },
  board: {
    width: 2.1,
    height: 0.2,
    depth: 0.05,
  },
};

const windowGroup = new THREE.Group();

// Glass
const windowGlassGeometry = new THREE.PlaneGeometry(
  windowMeasurements.glass.width,
  windowMeasurements.glass.height,
);
const windowGlassMaterial = new THREE.MeshStandardMaterial({
  map: windowColorTexture,
  aoMap: windowARMTexture,
  roughnessMap: windowARMTexture,
  metalnessMap: windowARMTexture,
  normalMap: windowNormalTexture,
});
const windowGlass = new THREE.Mesh(windowGlassGeometry, windowGlassMaterial);
windowGroup.add(windowGlass);

// Frame
const windowFrameMaterial = new THREE.MeshStandardMaterial({
  map: graveColorTexture,
  aoMap: graveARMTexture,
  roughnessMap: graveARMTexture,
  metalnessMap: graveARMTexture,
  normalMap: graveNormalTexture,
});

// Top/bottom bars span the full outer width(glass+both side bars)
const windowFrameTopBottomGeometry = new THREE.BoxGeometry(
  windowMeasurements.glass.width + windowMeasurements.frame.thickness * 2,
  windowMeasurements.frame.thickness,
  windowMeasurements.frame.depth,
);
const windowFrameTop = new THREE.Mesh(windowFrameTopBottomGeometry, windowFrameMaterial);
windowFrameTop.position.y =
  windowMeasurements.glass.height / 2 + windowMeasurements.frame.thickness / 2;
windowGroup.add(windowFrameTop);

const windowFrameBottom = new THREE.Mesh(windowFrameTopBottomGeometry, windowFrameMaterial);
windowFrameBottom.position.y = -(
  windowMeasurements.glass.height / 2 +
  windowMeasurements.frame.thickness / 2
);
windowGroup.add(windowFrameBottom);

// Left / right bars fit the inner height, between the top/bottom bars
const windowFrameSideGeometry = new THREE.BoxGeometry(
  windowMeasurements.frame.thickness,
  windowMeasurements.glass.height,
  windowMeasurements.frame.depth,
);

const windowFrameLeft = new THREE.Mesh(windowFrameSideGeometry, windowFrameMaterial);
windowFrameLeft.position.x = -(
  windowMeasurements.glass.width / 2 +
  windowMeasurements.frame.thickness / 2
);
windowGroup.add(windowFrameLeft);

const windowFrameRight = new THREE.Mesh(windowFrameSideGeometry, windowFrameMaterial);
windowFrameRight.position.x =
  windowMeasurements.glass.width / 2 + windowMeasurements.frame.thickness / 2;
windowGroup.add(windowFrameRight);

// Board — boarded-up plank, reuses the fence's rough_wood textures
const windowBoardColorTexture = textureLoader.load("./fence/rough_wood_1k/rough_wood_diff_1k.jpg");
windowBoardColorTexture.repeat.set(2.5, 1);

const windowBoardARMTexture = textureLoader.load("./fence/rough_wood_1k/rough_wood_arm_1k.jpg");
windowBoardARMTexture.repeat.set(2.5, 1);

const windowBoardNormalTexture = textureLoader.load(
  "./fence/rough_wood_1k/rough_wood_nor_gl_1k.jpg",
);
windowBoardNormalTexture.repeat.set(2.5, 1);

const windowBoardMaterial = new THREE.MeshStandardMaterial({
  map: windowBoardColorTexture,
  aoMap: windowBoardARMTexture,
  roughnessMap: windowBoardARMTexture,
  metalnessMap: windowBoardARMTexture,
  normalMap: windowBoardNormalTexture,
});

const windowBoardGeometry = new THREE.BoxGeometry(
  windowMeasurements.board.width,
  windowMeasurements.board.height,
  windowMeasurements.board.depth,
);
const windowBoard = new THREE.Mesh(windowBoardGeometry, windowBoardMaterial);
windowBoard.position.z = windowMeasurements.frame.depth / 2 + windowMeasurements.board.depth / 2;
windowBoard.position.x = -0.1;
windowBoard.position.y = 0.05;
windowBoard.rotation.z = -0.12;

const windowBoard2 = new THREE.Mesh(windowBoardGeometry, windowBoardMaterial);
windowBoard2.position.z = windowMeasurements.frame.depth / 2 + windowMeasurements.board.depth / 2;
windowBoard2.position.x = -0.1;
windowBoard2.position.y = -0.25;
windowBoard2.rotation.z = -0.18;
windowGroup.add(windowBoard, windowBoard2);

// Place the whole window on the wall — set once, instead of on every child
windowGroup.position.y = wallsMeasurements.height / 2;
windowGroup.position.z = -(wallsMeasurements.width / 2 + 0.01);
windowGroup.rotation.y = -Math.PI;
house.add(windowGroup);

// Roof
const roofMeasurements = {
  radius: 3.5,
  height: 1.5,
  segments: 4,
};
const roof = new THREE.Mesh(
  new THREE.ConeGeometry(
    roofMeasurements.radius,
    roofMeasurements.height,
    roofMeasurements.segments,
  ),
  new THREE.MeshStandardMaterial({
    map: roofColorTexture,
    aoMap: roofARMTexture,
    roughnessMap: roofARMTexture,
    metalnessMap: roofARMTexture,
    normalMap: roofNormalTexture,
  }),
);
roof.position.y += wallsMeasurements.height + roofMeasurements.height / 2;
roof.rotation.y = Math.PI * 0.25;
house.add(roof);

/**
 * Chimney
 */
const chimneyMeasurements = {
  width: 0.4,
  height: 1,
  depth: 0.4,
};
const chimney = new THREE.Mesh(
  new THREE.BoxGeometry(
    chimneyMeasurements.width,
    chimneyMeasurements.height,
    chimneyMeasurements.depth,
  ),
  new THREE.MeshStandardMaterial({
    map: graveColorTexture,
    aoMap: graveARMTexture,
    roughnessMap: graveARMTexture,
    metalnessMap: graveARMTexture,
    normalMap: graveNormalTexture,
  }),
);
chimney.position.y = wallsMeasurements.height + chimneyMeasurements.height / 2 + 0.01;
chimney.position.x = 1.3;
chimney.position.z = -1.94;
chimney.rotation.y = Math.PI * 0.25;
gui.add(chimney.position, "x").min(-3).max(3).step(0.01).name("chimneyX");
gui.add(chimney.position, "z").min(-3).max(3).step(0.01).name("chimneyZ");

const chimneyRoofMeasurements = {
  radius: 0.8,
  height: 0.35,
  segments: 4,
};
const chimneyRoof = new THREE.Mesh(
  new THREE.ConeGeometry(
    chimneyRoofMeasurements.radius,
    chimneyRoofMeasurements.height,
    chimneyRoofMeasurements.segments,
  ),
  new THREE.MeshStandardMaterial({
    map: graveColorTexture,
    aoMap: roofARMTexture,
    roughnessMap: roofARMTexture,
    metalnessMap: roofARMTexture,
    normalMap: roofNormalTexture,
  }),
);
chimneyRoof.position.y = chimneyMeasurements.height / 2;
chimneyRoof.rotation.y = Math.PI * 0.25;
gui.add(chimneyRoof.position, "x").min(-3).max(3).step(0.01).name("chimneyRoofX");
gui.add(chimneyRoof.position, "z").min(-3).max(3).step(0.01).name("chimneyRoofZ");
chimney.add(chimneyRoof);

house.add(chimney);

// Door
const doorMeasurements = {
  width: 2.2,
  height: 2.2,
};
const door = new THREE.Mesh(
  new THREE.PlaneGeometry(doorMeasurements.width, doorMeasurements.height, 100, 100),
  new THREE.MeshStandardMaterial({
    map: doorColorTexture,
    transparent: true,
    alphaMap: doorAlphaTexture,
    aoMap: doorAmbientOcclusionTexture,
    displacementMap: doorHeightTexture,
    displacementScale: 0.15,
    displacementBias: -0.04,
    normalMap: doorNormalTexture,
    metalnessMap: doorMetalnessTexture,
    roughnessMap: doorRoughnessTexture,
  }),
);
door.position.y = doorMeasurements.height / 2;
door.position.z = wallsMeasurements.width / 2 + 0.01;
house.add(door);

// Bushes
const bushGeometry = new THREE.SphereGeometry(1, 16, 16);
const bushMaterial = new THREE.MeshStandardMaterial({
  color: "#ffee00",
  map: bushColorTexture,
  aoMap: bushARMTexture,
  roughnessMap: bushARMTexture,
  metalnessMap: bushARMTexture,
  normalMap: bushNormalTexture,
});
const bush1 = new THREE.Mesh(bushGeometry, bushMaterial);
bush1.scale.set(0.5, 0.5, 0.5);
bush1.position.set(0.8, 0.2, 2.2);
bush1.rotation.x = -0.75;

const bush2 = new THREE.Mesh(bushGeometry, bushMaterial);
bush2.scale.set(0.25, 0.25, 0.25);
bush2.position.set(1.4, 0.1, 2.1);
bush2.rotation.x = -0.75;

const bush3 = new THREE.Mesh(bushGeometry, bushMaterial);
bush3.scale.set(0.4, 0.4, 0.4);
bush3.position.set(-0.8, 0.1, 2.2);
bush3.rotation.x = -0.75;

const bush4 = new THREE.Mesh(bushGeometry, bushMaterial);
bush4.scale.set(0.15, 0.15, 0.15);
bush4.position.set(-1, 0.05, 2.6);
bush4.rotation.x = -0.75;

const bush5 = new THREE.Mesh(bushGeometry, bushMaterial);
bush5.scale.set(0.15, 0.15, 0.15);
bush5.position.set(-2, 0.05, 2.6);
bush5.rotation.x = -0.75;

const bush6 = new THREE.Mesh(bushGeometry, bushMaterial);
bush6.scale.set(0.25, 0.25, 0.25);
bush6.position.set(-2, 0.05, -2.0);
bush6.rotation.x = 0.75;

const bush7 = new THREE.Mesh(bushGeometry, bushMaterial);
bush7.scale.set(0.55, 0.5, 0.55);
bush7.position.set(1.4, 0.1, -2.1);
bush7.rotation.x = 0.5;

house.add(bush1, bush2, bush3, bush4, bush5, bush6, bush7);

// Graves
const graves = new THREE.Group();
scene.add(graves);

const gravesGeometry = new THREE.BoxGeometry(0.6, 0.8, 0.2);
const graveMaterial = new THREE.MeshStandardMaterial({
  map: graveColorTexture,
  aoMap: graveARMTexture,
  roughnessMap: graveARMTexture,
  metalnessMap: graveARMTexture,
  normalMap: graveNormalTexture,
});

for (let i = 0; i < 30; i++) {
  const angle = Math.random() * Math.PI * 2;
  const radius = 3 + Math.random() * 4;

  const x = Math.sin(angle) * radius;
  const z = Math.cos(angle) * radius;

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
 * Fences
 */
const fenceMeasurements = {
  post: {
    radiusTop: 0.025,
    radiusBottom: 0.03,
    height: 0.9,
  },
  radius: 8,
  count: 120,
};

const fence = new THREE.Group();
scene.add(fence);

const fencePostGeometry = new THREE.CylinderGeometry(
  fenceMeasurements.post.radiusTop,
  fenceMeasurements.post.radiusBottom,
  fenceMeasurements.post.height,
  8,
  12,
);

const fenceMaterial = new THREE.MeshStandardMaterial({
  map: fenceColorTexture,
  aoMap: fenceARMTexture,
  roughnessMap: fenceARMTexture,
  metalnessMap: fenceARMTexture,
  normalMap: fenceNormalTexture,
  //   displacementMap: fenceDisplacementTexture,
  //   displacementScale: 0.01,
  //   displacementBias: -0.005,
});

for (let i = 0; i < fenceMeasurements.count; i++) {
  // Missing posts — rotted away entirely. ~12% of slots just stay empty.
  if (Math.random() < 0.12) continue;

  const baseAngle = (i / fenceMeasurements.count) * Math.PI * 2;
  const angle = baseAngle + (Math.random() - 0.5) * 0.08;

  const x = Math.sin(angle) * fenceMeasurements.radius;
  const z = Math.cos(angle) * fenceMeasurements.radius;

  const fencePost = new THREE.Mesh(fencePostGeometry, fenceMaterial);

  // Some posts snapped/sunk shorter than others
  const heightScale = 0.55 + Math.random() * 0.45;
  fencePost.scale.y = heightScale;

  fencePost.position.x = x;
  fencePost.position.y = fenceMeasurements.post.height * heightScale * 0.3;
  fencePost.position.z = z;

  const isVeryLeaning = Math.random() < 0.15;
  const leanAmount = isVeryLeaning ? 0.3 + Math.random() * 0.3 : (Math.random() - 0.5) * 0.2;
  const leanDirection = Math.random() * Math.PI * 2;

  fencePost.rotation.x = Math.cos(leanDirection) * leanAmount;
  fencePost.rotation.z = Math.sin(leanDirection) * leanAmount;

  fence.add(fencePost);
}

const fenceFolder = gui.addFolder("Fence");
fenceFolder
  .add(fenceColorTexture.repeat, "x")
  .min(0.1)
  .max(10)
  .step(0.1)
  .name("repeatX")
  .onChange((v) => {
    fenceColorTexture.repeat.x = v;
    fenceARMTexture.repeat.x = v;
    fenceNormalTexture.repeat.x = v;
    fenceDisplacementTexture.repeat.x = v;
  });
fenceFolder
  .add(fenceColorTexture.repeat, "y")
  .min(0.1)
  .max(10)
  .step(0.1)
  .name("repeatY")
  .onChange((v) => {
    fenceColorTexture.repeat.y = v;
    fenceARMTexture.repeat.y = v;
    fenceNormalTexture.repeat.y = v;
    fenceDisplacementTexture.repeat.y = v;
  });
fenceFolder
  .add(fenceMaterial, "displacementScale")
  .min(0)
  .max(0.1)
  .step(0.001)
  .name("displacementScale");
fenceFolder
  .add(fenceMaterial, "displacementBias")
  .min(-0.1)
  .max(0.1)
  .step(0.001)
  .name("displacementBias");

/**
 * Wood Sign
 */
const signMeasurements = {
  post: {
    width: 0.18,
    height: 4.1,
    depth: 0.11,
  },
  board: {
    width: 1.25,
    height: 0.2,
    depth: 0.06,
  },
};

const signPostGeometry = new THREE.BoxGeometry(
  signMeasurements.post.width,
  signMeasurements.post.height,
  signMeasurements.post.depth,
  4,
  20,
  4,
);

const signBoardGeometry = new THREE.BoxGeometry(
  signMeasurements.board.width,
  signMeasurements.board.height,
  signMeasurements.board.depth,
  20,
  4,
  4,
);

const signPostMaterial = new THREE.MeshStandardMaterial({
  map: signPostColorTexture,
  aoMap: signPostARMTexture,
  roughnessMap: signPostARMTexture,
  metalnessMap: signPostARMTexture,
  normalMap: signPostNormalTexture,
  displacementMap: signPostDisplacementTexture,
  displacementScale: 0.058, // start small — bark bump is fine, not a canyon
  displacementBias: -0.023,
});

const signBoardMaterial = new THREE.MeshStandardMaterial({
  map: signBoardColorTexture,
  aoMap: signBoardARMTexture,
  roughnessMap: signBoardARMTexture,
  metalnessMap: signBoardARMTexture,
  normalMap: signBoardNormalTexture,
  displacementMap: signBoardDisplacementTexture,
  displacementScale: 0.062,
  displacementBias: -0.02,
});

// Sign Group
const signs = new THREE.Group();
scene.add(signs);

const createSign = (scale = 1) => {
  const sign = new THREE.Group();

  const post = new THREE.Mesh(signPostGeometry, signPostMaterial);
  const board = new THREE.Mesh(signBoardGeometry, signBoardMaterial);

  // Post starts at the ground
  post.position.y = signMeasurements.post.height / 2;

  // Board sits near the top of the post
  board.position.x = 0.3;
  board.position.y = signMeasurements.post.height - signMeasurements.board.height / 2;

  // Slightly rotate the board for an old, crooked look
  board.rotation.z = -0.3;

  sign.add(post, board);

  // Different overall sign size
  sign.scale.setScalar(scale);

  return sign;
};

const signScales = [0.7, 1, 1.3];

for (const scale of signScales) {
  const sign = createSign(scale);

  // Place signs just outside the fence
  const angle = Math.random() * Math.PI * 2;
  const radius = fenceMeasurements.radius + 0.7;

  sign.position.x = (Math.random() - 0.65) * radius;
  sign.position.z = -radius * 0.75;

  // Random leaning / crooked construction
  sign.rotation.x = (Math.random() - 0.5) * 0.15;
  sign.rotation.y = -angle + (Math.random() - 0.5) * 0.4;
  sign.rotation.z = (Math.random() - 0.5) * 0.18;

  signs.add(sign);
}

/**
 * Lights
 */
// Ambient light
const ambientLight = new THREE.AmbientLight("#86cdff", 0.275);
scene.add(ambientLight);

// Directional light
const directionalLight = new THREE.DirectionalLight("#86cdff", 1);
directionalLight.position.set(3, 2, -8);
scene.add(directionalLight);

// Door Light
const doorLight = new THREE.PointLight("#ff7d46", 1);
doorLight.position.set(0, 2.2, 2.5);
house.add(doorLight);

/**
 * Ghosts
 */
const ghost1 = new THREE.PointLight("#8800ff", 6);
const ghost2 = new THREE.PointLight("#008b8b", 6);
const ghost3 = new THREE.PointLight("#740202", 6);
scene.add(ghost1, ghost2, ghost3);

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
camera.position.x = 6;
camera.position.y = 4;
camera.position.z = 10;
// Back of the house testing
// camera.position.x = 0.5;
// camera.position.y = 1.5;
// camera.position.z = -5.5;
scene.add(camera);
const cameraPosition = gui.addFolder("Camera position");
cameraPosition.add(camera.position, "y").min(-20).max(30).step(0.5).name("positionY");
cameraPosition.add(camera.position, "x").min(-20).max(30).step(0.5).name("positionX");
cameraPosition.add(camera.position, "z").min(-20).max(30).step(0.5).name("positionZ");

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
 * Shadows
 */
// Renderer
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

// Cast and receive
directionalLight.castShadow = true;
ghost1.castShadow = true;
ghost2.castShadow = true;
ghost3.castShadow = true;

// Objects
walls.castShadow = true;
walls.receiveShadow = true;
roof.castShadow = true;
floor.receiveShadow = true;
graves.children.forEach((grave) => {
  grave.castShadow = true;
  grave.receiveShadow = true;
});
signs.traverse((object) => {
  if (object.isMesh) {
    object.castShadow = true;
    object.receiveShadow = true;
  }
});
fence.children.forEach((post) => {
  post.castShadow = true;
  post.receiveShadow = true;
});
chimney.castShadow = true;
chimney.receiveShadow = true;
chimneyRoof.castShadow = true;
chimneyRoof.receiveShadow = true;
windowGroup.traverse((object) => {
  if (object.isMesh) {
    object.castShadow = true;
    object.receiveShadow = true;
  }
});

// Mapping
directionalLight.shadow.mapSize.width = 256;
directionalLight.shadow.mapSize.height = 256;
directionalLight.shadow.camera.top = 8;
directionalLight.shadow.camera.right = 8;
directionalLight.shadow.camera.bottom = -8;
directionalLight.shadow.camera.left = -8;
directionalLight.shadow.camera.near = 1;
directionalLight.shadow.camera.far = 20;

ghost1.shadow.mapSize.width = 256;
ghost1.shadow.mapSize.height = 256;
ghost1.shadow.camera.far = 10;

ghost2.shadow.mapSize.width = 256;
ghost2.shadow.mapSize.height = 256;
ghost2.shadow.camera.far = 10;

ghost3.shadow.mapSize.width = 256;
ghost3.shadow.mapSize.height = 256;
ghost3.shadow.camera.far = 10;

/**
 * Sky
 */
const sky = new Sky();
sky.material.uniforms["turbidity"].value = 10;
sky.material.uniforms["rayleigh"].value = 3;
sky.material.uniforms["mieCoefficient"].value = 0.1;
sky.material.uniforms["mieDirectionalG"].value = 0.95;
sky.material.uniforms["sunPosition"].value.set(0.3, -0.038, -0.95);
sky.scale.set(100, 100, 100);
scene.add(sky);

/**
 * Fog
 */
scene.fog = new THREE.FogExp2("#02343f", 0.1);

/**
 * Spooky Sound
 */
// 1. Initial volume fix and below (-18 dB)
const volumeNode = new Tone.Volume(-18).toDestination();

// 2. Deeper synthesizer + Integrated effects
const delay = new Tone.PingPongDelay("4n", 0.4).connect(volumeNode);
const reverb = new Tone.Reverb({ decay: 4, wet: 0.5 }).connect(delay);

const ghostSynth = new Tone.MonoSynth({
  oscillator: { type: "sine" },
  envelope: { attack: 0.2, release: 2.0 }, // Slower and denser attack and release
  portamento: 0.2,
}).connect(reverb);

// Vibrato drastically reduced (only a slight cold tremor)
new Tone.LFO(6, -15, 15).start().connect(ghostSynth.oscillator.detune);

// 3. Altered melody: Lower notes (Octave 3) and more dissonant and mournful intervals.
const notes = [
  "C3",
  "C#3",
  "E3",
  "D#3",
  "G3",
  "F#3",
  "D#3",
  "C3",
  "C3",
  "C#3",
  "E3",
  "G3",
  "G#3",
  "E3",
  "C#3",
  "C3",
];

// 4. Loop sequencer (a little slower at 95 BPM)
const seq = new Tone.Sequence(
  (time, note) => {
    if (note) ghostSynth.triggerAttackRelease(note, "4n", time);
  },
  notes,
  "4n",
);

Tone.getTransport().bpm.value = 105;

// 5. Toggle
const toggleMusic = async () => {
  const btn = document.getElementById("btn-play");

  if (Tone.getTransport().state === "started") {
    Tone.getTransport().stop();
    seq.stop();
    btn.innerText = "👻";
  } else {
    await Tone.start();
    Tone.getTransport().start();
    seq.start(0);
    btn.innerText = "🛑";
  }
};

document.getElementById("btn-play").addEventListener("click", (e) => {
  toggleMusic();
});

/**
 * Animate
 */
const timer = new Timer();

const tick = () => {
  // Timer
  timer.update();
  const elapsedTime = timer.getElapsed();

  // Ghost
  const ghost1Angle = elapsedTime * 0.5;
  ghost1.position.x = Math.cos(ghost1Angle) * 4;
  ghost1.position.z = Math.sin(ghost1Angle) * 4;
  ghost1.position.y =
    Math.sin(ghost1Angle) * Math.sin(ghost1Angle * 2.34) * Math.sin(ghost1Angle * 3.45);

  const ghost2Angle = -elapsedTime * 0.3;
  ghost2.position.x = Math.cos(ghost2Angle) * 5;
  ghost2.position.z = Math.sin(ghost2Angle) * 5;
  ghost2.position.y =
    Math.sin(ghost2Angle) * Math.sin(ghost2Angle * 2.34) * Math.sin(ghost2Angle * 3.45);

  const ghost3Angle = elapsedTime * 0.22;
  ghost3.position.x = Math.cos(ghost3Angle) * 6;
  ghost3.position.z = Math.sin(ghost3Angle) * 6;
  ghost3.position.y =
    Math.sin(ghost3Angle) * Math.sin(ghost3Angle * 2.34) * Math.sin(ghost3Angle * 3.45);

  // Door flickering effect (layered sine waves = irregular flicker, not a clean pulse)
  const pulse1 = Math.sin(elapsedTime * 10) * 0.5; // slow, big swing
  const pulse2 = Math.sin(elapsedTime * 23.5) * 0.15; // faster, smaller wobble
  const pulse3 = Math.sin(elapsedTime * 71.1) * 0.05; // fast, tiny jitter

  doorLight.intensity = 4 + pulse1 + pulse2 + pulse3;

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
