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
    let surface = CombineNoise(GenerateNoise(128, 128, 8, 2, this.width));
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
  /* Draws visible landscape on screen */
  drawTerrain(canvas, imageData, camera) {
    /* render green for terrain, blue for sky */
    const width = canvas.width;
    const height = canvas.height;
    let data = imageData.data;
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const cell = this.terrain[(y + Math.floor(camera.position.y)) * this.width + (x + Math.floor(camera.position.x))];
        const color = (cell === 0) ? [50, 50, 255] : [50, 200, 50];
        const index = y * (this.width * 2) + x * 4;
        data[index + 0] = color[0];
        data[index + 1] = color[1];
        data[index + 2] = color[2];
        data[index + 3] = 255;
      }
    }
  }
}

export { Terrain };
