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
  /* Works with canvases of any size */
  drawTerrain(canvas, imageData, camera) {
    const width = canvas.width;
    const height = canvas.height;
    let data = imageData.data;
    for (let i = 0; i < width * height; i++) {
      /* Don't ask me how I managed to make this work correctly. */
      const y = Math.floor(i / height) + Math.floor(camera.position.y);
      const x = (i % width) + Math.floor(camera.position.x);
      const cell = this.terrain[y * this.width + x];

      /* render green for terrain, blue for sky */
      const color = (cell === 0) ? [50, 50, 255] : [50, 200, 50];
      const index = i * 4;
      data[index + 0] = color[0];
      data[index + 1] = color[1];
      data[index + 2] = color[2];
      data[index + 3] = 255;
    }
  }
}

export { Terrain };
