import { PhysicsObject } from '../physicsObject.js';

class ImpactGrenade extends PhysicsObject {
  constructor(x, y) {
    super(x, y);
    this.bouncesBeforeDeath = 1;
  }

  drawObject(canvas, offset) {
    const ctx = canvas.getContext('2d');
    /* Draw circle */
    const posX = Math.floor(this.position.x - offset.x - this.radius / 2);
    const posY = Math.floor(this.position.y - offset.y - this.radius / 2);
    ctx.fillStyle = '#0A0';
    ctx.fillRect(posX, posY, this.radius, this.radius);
  }

  bounceDeathAction() {
    return 20;
  }
}

export { ImpactGrenade };
