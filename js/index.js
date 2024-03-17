/* Main game file */
import { perlinNoise1D } from 'utils/perlinNoise1D.js';

const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');

const mapWidth = canvas.width;
const mapHeight = canvas.height;

let map = new Array(mapWidth * mapHeight).fill(0);

let createMap = () => {
  /* surface to be filled with heights */
  const surface = new Array(mapWidth);
  /* noiseSeed to be filled with noise values */
  const noiseSeed = new Array(mapWidth);

  for (let i = 0; i < mapWidth; i++)
    noiseSeed[i] = Math.random();
  /* Set starting value of terrain to middle */
  noiseSeed[0] = 0.5;
  perlinNoise1D(mapWidth, noiseSeed, 8, 2, surface);

  /* Convert 1d height map to 2d bitmap */
  for (let x = 0; x < mapWidth; x++) {
    for (let y = 0; y < mapHeight; y++) {
      if (y >= surface[x] * mapHeight) {
        map[y * mapWidth + x] = 1;
      } else {
        map[y * mapWidth + x] = 0;
      }
    }
  }
};
