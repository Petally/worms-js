/* Main game file */
/* TODO:
 * Fix timestep */ 
import { Terrain } from './terrain/terrain.js';
import { Camera } from './managers/camera.js';
import { mapNumber, clamp } from './utils/mapNumber.js';

const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');
const canvasImageData = ctx.createImageData(canvas.width, canvas.height);

const terrain = new Terrain(1024, 512);
terrain.createTerrain();

const camera = new Camera();

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
  if (e.keyCode === 74) {
    terrain.createGridPatternTerrain();
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

  camera.update(terrain, canvas);
  terrain.drawTerrain(canvas, canvasImageData, camera);
  /* put the image on the canvas */
  ctx.putImageData(canvasImageData, 0, 0);

  requestAnimationFrame(update);
};

requestAnimationFrame(update);

