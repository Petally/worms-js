import { Vector } from '../utils/vector.js';
import { clamp } from '../utils/mapNumber.js';

class PhysicsObject {
  constructor(x, y) {
    this.position = new Vector(x, y);
    this.velocity = new Vector(0, 0);
    this.acceleration = new Vector(0, 0);

    this.radius = 4;
    this.stable = false;
    this.friction = 0.8;

    this.bouncesBeforeDeath = -1;

    this.dead = false;
  }

  drawObject(canvas, offset) {

  }

  bounceDeathAction() {

  }

  /* Expects terrain object */
  update(terrain) {
    /* Test variable, remove later when actual timestep is implemented */
    const dt = 0.008;
    /* Apply gravity */
    this.acceleration.y += 2;

    /* Update velocity */
    this.velocity = this.velocity.add(this.acceleration.multiply(dt));

    /* Update position */
    const potentialPosition = this.position.add(this.velocity.multiply(dt));

    /* Reset acceleration */
    this.acceleration = new Vector(0, 0);
    this.stable = false;

    /* Collision check with terrain */
    const angle = Math.atan2(this.velocity.y, this.velocity.x);
    let response = new Vector(0, 0);
    let collision = false;

    for (let r = angle - Math.PI / 2; r < angle + Math.PI / 2; r += Math.PI / 8) {
      /* Calculate test point on circumfrence of circle */
      let testPosX = this.radius * Math.cos(r) + potentialPosition.x;
      let testPosY = this.radius * Math.sin(r) + potentialPosition.y;

      testPosX = clamp(testPosX, 0, terrain.width - 1);
      testPosY = clamp(testPosY, 0, terrain.height - 1);

      const terrainIndex = terrain.index(Math.floor(testPosX), Math.floor(testPosY));
      /* Test if any points on the semicircle intersect with terrain */
      if (terrain.terrain[terrainIndex] !== 0) {
        /* Accumulate collision points to give an escape response */
        /* Effectively, normal to the areas of contact */
        response.x += potentialPosition.x - testPosX;
        response.y += potentialPosition.y - testPosY;
        collision = true;
      }
    }

    let magVelocity = this.velocity.magnitude();
    let magResponse = response.magnitude();
    /* Find angle of collision */
    if (collision) {
      /* Force the object to be stable, this stops the object penetrating the terrain */
      this.stable = true;

      /* Calculate reflection vector of object's velocity vector, using response vector */
      const dot = this.velocity.x * (response.x / magResponse) + this.velocity.y * (response.y / magResponse);

      /* Use friction coefficient to dampen response (approximate energy loss) */
      this.velocity.x = this.friction * (-2 * dot * (response.x / magResponse) + this.velocity.x);
      this.velocity.y = this.friction * (-2 * dot * (response.y / magResponse) + this.velocity.y);

      /* Some objects will 'die' after several bounces */
      if (this.bouncesBeforeDeath > 0) {
        this.bouncesBeforeDeath -= 1;
        this.dead = this.bouncesBeforeDeath === 0;

        /* If object is dead, work out what to do next */
        if (this.dead) {
          /* Action upon object death */
          /* = 0 Nothing */
          /* > 0 Explosion */
          const deathResponse = this.bounceDeathAction();
          if (deathResponse > 0) {
            terrain.explode(this.position, deathResponse);
          }
        }
      }
    } else {
      /* If no collision, then just move to the potentialPosition */
      this.position = potentialPosition;
    }

    /* Turn off movement if the movement is too small */
    if (magVelocity < 0.1) {
      this.stable = true;
    }
  }
}

export { PhysicsObject };
