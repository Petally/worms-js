/* Main game file */
import { CombineNoise, GenerateNoise } from './utils/perlinNoise1D.js';
import { mapNumber, clamp } from './utils/mapNumber.js';

const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');
const canvasImageData = ctx.createImageData(canvas.width, canvas.height);

const mapWidth = 1024;
const mapHeight = 512;

let cameraPosX = 0;
let cameraPosY = 0;

let map = new Array(mapWidth * mapHeight).fill(0);

let controls = {
  up: false,
  down: false,
  left: false,
  right: false,
};

let createMap = () => {
  /* surface to be filled with heights */
  /* 0 to 1 */
  let surface = CombineNoise(GenerateNoise(128, 128, 8, 2, mapWidth));
  /* Convert 1d height map to 2d bitmap */
  for (let x = 0; x < mapWidth; x++) {
    for (let y = 0; y < mapHeight; y++) {
      /* Add mapheight/2 so perlin noise is based around the center */
      if (y >= mapHeight / 2 + surface.pos[x]) {
        map[y * mapWidth + x] = 1;
      } else {
        map[y * mapWidth + x] = 0;
      }
    }
  }
};

/* Draws visible landscape on screen */
let drawLandscape = () => {
  /* render green for terrain, blue for sky */
  const width = canvas.width;
  const height = canvas.height;
  let data = canvasImageData.data;
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const mapCell = map[(y + cameraPosY) * mapWidth + (x + cameraPosX)];
      const color = (mapCell === 0) ? [50, 50, 255] : [50, 200, 50];
      const index = y * (mapWidth * 2) + x * 4;
      data[index + 0] = color[0];
      data[index + 1] = color[1];
      data[index + 2] = color[2];
      data[index + 3] = 255;
    }
  }
};

/* Controls listener */
canvas.addEventListener('keydown', e => {
  // M key
  if (e.keyCode === 77) {
    createMap();
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
    cameraPosY -= 1;
  }
  if (controls.down) {
    cameraPosY += 1;
  }
  if (controls.left) {
    cameraPosX -= 1;
  }
  if (controls.right) {
    cameraPosX += 1;
  }

  cameraPosX = clamp(cameraPosX, 0, mapWidth - canvas.width);
  cameraPosY = clamp(cameraPosY, 0, mapHeight - canvas.height);

  drawLandscape();
  /* put the image on the canvas */
  ctx.putImageData(canvasImageData, 0, 0);
  requestAnimationFrame(update);
};

requestAnimationFrame(update);

createMap();
drawLandscape();

