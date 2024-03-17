class Vector {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  add(v) {
    return new Vector(this.x + v.x, this.y + v.y);
  }

  subtract(v) {
    return new Vector(this.x - v.x, this.y - v.y);
  }

  multiply(n) {
    return new Vector(this.x * n, this.y * n);
  }

  magnitude() {
    return Math.sqrt(this.x ** 2 + this.y ** 2);
  }
  // Unit vector that's perpendicular to the original one
  normal() {
    return new Vector(-this.y, this.x);
  }
  // Vector direction with mag of 1
  unit() {
    if (this.magnitude() === 0) {
      return new Vector(0, 0);
    } else {
      return new Vector(this.x / this.magnitude(), this.y / this.magnitude());
    }
  }
  // Dot product
  static dot(v1, v2) {
    return v1.x * v2.x + v1.y * v2.y;
  }
}

export { Vector };
