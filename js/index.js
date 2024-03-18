/* Main game file */
/* TODO:
 * Fix timestep */ 
import { Terrain } from './terrain/terrain.js';
import { Camera } from './managers/camera.js';
import { Mouse } from './managers/mouse.js';
import { Dummy } from './classes/physicsObjects/dummy.js';
import { mapNumber, clamp } from './utils/mapNumber.js';

const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');
const imageData = ctx.createImageData(canvas.width, canvas.height);
const imageDataBuffer = new Uint32Array(imageData.data.buffer);

const terrain = new Terrain(1024, 512);
terrain.createTerrain();

const camera = new Camera();
const mouse = new Mouse(canvas);
let physicsObjects = [];

let controls = {
  up: false,
  down: false,
  left: false,
  right: false,
};

/* Controls listener */
canvas.addEventListener('keydown', e => {
  // M key
  if (e.keyCode === 77) {
    terrain.createTerrain();
  }
  // J key
  if (e.keyCode === 74) {
    terrain.createGridPatternTerrain();
  }
  /* E key */
  if (e.keyCode === 69) {
    physicsObjects.push(new Dummy(mouse.position.x + Math.floor(camera.position.x), mouse.position.y + Math.floor(camera.position.y)));
  }
  if (e.keyCode === 87) {
    controls.up = true;
  }
  if (e.keyCode === 83) {
    controls.down = true;
  }
  if (e.keyCode === 65) {
    controls.left = true;
  }
  if (e.keyCode === 68) {
    controls.right = true;
  }
});

canvas.addEventListener('keyup', e => {
  if (e.keyCode === 87) {
    controls.up = false;
  }
  if (e.keyCode === 83) {
    controls.down = false;
  }
  if (e.keyCode === 65) {
    controls.left = false;
  }
  if (e.keyCode === 68) {
    controls.right = false;
  }
});

/* Main Loop */
let update = () => {
  /* Move camera with WASD */
  if (controls.up) {
    camera.velocity.y -= camera.acceleration;
  }
  if (controls.down) {
    camera.velocity.y += camera.acceleration;
  }
  if (controls.left) {
    camera.velocity.x -= camera.acceleration;
  }
  if (controls.right) {
    camera.velocity.x += camera.acceleration;
  }
  /* Draw in terrain with mouse */
  if (mouse.down) {
    terrain.set(mouse.position.x + Math.floor(camera.position.x), mouse.position.y + Math.floor(camera.position.y), 1);
  }

  camera.update(terrain, canvas);
  terrain.drawTerrain(canvas, imageDataBuffer, camera);
  mouse.drawMouse(canvas, imageDataBuffer);
  /* put the image on the canvas */
  ctx.putImageData(imageData, 0, 0);

  /* draw & update physics objects */
  /* run 10 iterations per frame */
  for (let z = 0; z < 10; z++) {
    physicsObjects.forEach(p => {
      p.update(terrain);
    });
  }
  /* clean up dead physics objects */
  physicsObjects = physicsObjects.filter(e => e.dead === false);
  physicsObjects.forEach(p => {
    p.drawObject(canvas, camera.position);
  });

  requestAnimationFrame(update);
};

requestAnimationFrame(update);

