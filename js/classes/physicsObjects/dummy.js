import { PhysicsObject } from '../physicsObject.js';

class Dummy extends PhysicsObject {
  constructor(x, y) {
    super(x, y);
  }

  drawObject(canvas, offset) {
    const ctx = canvas.getContext('2d');
    /* Draw circle */
    const posX = Math.floor(this.position.x - offset.x - this.radius / 2);
    const posY = Math.floor(this.position.y - offset.y - this.radius / 2);
    ctx.fillStyle = '#FFF';
    ctx.fillRect(posX, posY, this.radius, this.radius);
  }
}

export { Dummy };
