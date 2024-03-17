/* Basic camera script, for usage with rendering methods */
import { Vector } from '../utils/vector.js';
import { clamp } from '../utils/mapNumber.js';

class Camera {
  constructor() {
    this.position = new Vector(0, 0);
    this.velocity = new Vector(0, 0);
    this.maxSpeed = 2;
    this.friction = 0.9;
    this.acceleration = 0.25;
  }

  update(terrain, canvas) {
    /* If velocity > 0, then stop camera movement */
    this.velocity.x = (Math.abs(this.velocity.x) > 0.01) ? clamp(this.velocity.x, -this.maxSpeed, this.maxSpeed) : 0;
    this.velocity.y = (Math.abs(this.velocity.y) > 0.01) ? clamp(this.velocity.y, -this.maxSpeed, this.maxSpeed) : 0;

    this.velocity = this.velocity.multiply(this.friction);
    this.position = this.position.add(this.velocity)

    this.position.x = clamp(this.position.x, 0, terrain.width - canvas.width);
    this.position.y = clamp(this.position.y, 0, terrain.height - canvas.height);
  }
}

export { Camera };
