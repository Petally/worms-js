import { CombineNoise, GenerateNoise } from '../generation/perlinNoise1D.js';

class Terrain {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.terrain = new Array(width * height).fill(0);
  }

  createTerrain() {
    /* surface to be filled with heights */
    /* 0 to 1 */
    let surface = CombineNoise(GenerateNoise(128, 128, 8, 8, this.width));
    /* Convert 1d height map to 2d bitmap */
    for (let x = 0; x < this.width; x++) {
      for (let y = 0; y < this.height; y++) {
        /* Add mapheight/2 so perlin noise is based around the center */
        if (y >= this.height / 2 + surface.pos[x]) {
          this.terrain[y * this.width + x] = 1;
        } else {
          this.terrain[y * this.width + x] = 0;
        }
      }
    }
  }

  createGridPatternTerrain() {
    this.terrain = this.terrain.fill(0);
  }

  index(x, y) {
    return y * this.width + x;
  }

  set(x, y, input) {
    this.terrain[this.index(x, y)] = input;
  }

  /* Draws visible landscape on screen */
  /* Works with canvases of any size */
  drawTerrain(canvas, imageData, camera) {
    const width = canvas.width;
    const height = canvas.height;
    let data = imageData.data;
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const xPos = x + Math.floor(camera.position.x);
        const yPos = y + Math.floor(camera.position.y);
        const i = this.index(xPos, yPos);
        const cell = this.terrain[i];

        /* render green for terrain, blue for sky */
        const color = (cell === 0) ? [50, 50, 255] : [50, 200, 50];
        const index = (y * width + x) * 4;
        data[index + 0] = color[0];
        data[index + 1] = color[1];
        data[index + 2] = color[2];
        data[index + 3] = 255;
      }
    }
  }
}

export { Terrain };
