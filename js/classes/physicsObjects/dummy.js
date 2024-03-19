import { PhysicsObject } from '../physicsObject.js';

class Dummy extends PhysicsObject {
  constructor(x, y) {
    super(x, y);
  }

  drawObject(canvas, offset) {
    const ctx = canvas.getContext('2d');
    /* Draw circle */
    ctx.fillStyle = '#FFF';
    ctx.fillRect(this.position.x - offset.x, this.position.y - offset.y, this.radius, this.radius);
  }
}

export { Dummy };
