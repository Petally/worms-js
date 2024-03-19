/* Mutates a given 1 dimensional array to draw filled circles */

let drawLine = (sx, ex, ny, arr, arrWidth, arrHeight, value) => {
  for (let i = sx; i < ex; i++) {
    if (ny >= 0 && ny < arrHeight && i >= 0 && i < arrWidth) {
      arr[ny * arrWidth + i] = value;
    } else {
    }
  }
};

let drawBresenhamCircle = (xc, yc, r, arr, arrWidth, arrHeight, value) => {
  let x = 0;
  let y = r;
  let p = 3 - 2 * r;
  if (!r) { return };
  while (y >= x) {
    drawLine(xc - x, xc + x, yc - y, arr, arrWidth, arrHeight, value);
    drawLine(xc - y, xc + y, yc - x, arr, arrWidth, arrHeight, value);
    drawLine(xc - x, xc + x, yc + y, arr, arrWidth, arrHeight, value);
    drawLine(xc - y, xc + y, yc + x, arr, arrWidth, arrHeight, value);
    if (p < 0) {
      p += 4 * x++ + 6;
    } else {
      p += 4 * (x++ - y--) + 10;
    }
  }
};

export { drawBresenhamCircle };
