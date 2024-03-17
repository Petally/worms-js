/* Main game file */
const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");

const mapWidth = canvas.width;
const mapHeight = canvas.height;

let map = new Array(mapWidth * mapHeight).fill(0);

let createMap = () => {

};

/* 1D noise function that mutates the given output array */
let perlinNoise1D = (count, seed, octaves, bias, output) => {
  for (let x = 0; x < count; x++) {
    let noise = 0;
    let scaleAcc = 0;
    let scale = 1;

    for (let o = 0; o < octaves; o++) {
      const pitch = count >> o;
      const sample1 = (x / pitch) * pitch;
      const sample2 = (sample1 + pitch) % count;
      const let blend = (x - sample1) / pitch;
      const sample = (1 - blend) * seed[sample1] + blend * seed[sample2];
      scaleAcc += scale;
      noise += sample * scale;
      scale = scale / bias;
    }

    /* Scale to seed range */
    output[x] = noise / scaleAcc;
  }
};
