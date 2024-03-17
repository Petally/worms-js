// linear congruential generator parameters
const M = 4294967296,
      A = 1664525,
      C = 1;

// psuedo-random number generator (linear congruential)
class PSNG {
  constructor() {
    this.Z = Math.floor(Math.random() * M);
  }

  next() {
    this.Z = (A * this.Z + C) % M;
    return this.Z / M - 0.5;
  }
}

// cosine interpolation
let Interpolate = (pa, pb, px) => {
  const ft = px * Math.PI, f = (1 - Math.cos(ft)) * 0.5;
  return pa * (1 - f) + pb * f;
}

// 1D perlin line generator
class Perlin {
  constructor(amp, wl, width) {
    this.x = 0;
    this.amp = amp;
    this.wl = wl;
    this.fq = 1 / wl;
    this.psng = new PSNG();
    this.a = this.psng.next();
    this.b = this.psng.next();
    this.pos = [];
    while (this.x < width) {
      if (this.x % this.wl === 0) {
        this.a = this.b;
        this.b = this.psng.next();
        this.pos.push(this.a * this.amp);
      } else {
        this.pos.push(Interpolate(this.a, this.b, (this.x % this.wl) / this.wl) * this.amp);
      }
      this.x++;
    }
  }
}
// octave generator
function GenerateNoise(amp, wl, octaves, divisor, width) {
  let result = [];
  for (let i = 0; i < octaves; i++) {
    result.push(new Perlin(amp, wl, width));
    amp /= divisor;
    wl /= divisor;
  }
  return result;
}

// combines octaves together
function CombineNoise(pl){
  let result = {pos: []};
  for (let i = 0, total = 0, j = 0; i < pl[0].pos.length; i++) {
    total = 0;
    for (j = 0; j < pl.length; j++) {
      total += pl[j].pos[i];
    }
    result.pos.push(total);
  }
  return result;
}
export { GenerateNoise, CombineNoise };
