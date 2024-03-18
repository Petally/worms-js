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
    /* Apply gravity */
    this.acceleration.y += 0.1;

    /* Update velocity */
    this.velocity = this.velocity.add(this.acceleration);

    /* Update position */
    const potentialPosition = this.position.add(this.velocity);

    /* Reset acceleration */
    this.acceleration = new Vector(0, 0);
    this.stable = false;

    /* Collision check with terrain */
    const angle = Math.atan(this.velocity.x, this.velocity.y);
    let response = new Vector(0, 0);
    let collision = false;

    for (let r = angle - Math.PI / 2; r < angle + Math.PI / 2; r += Math.PI / 8) {
      let testPosX = (this.radius) * Math.cos(r) + potentialPosition.x;
      let testPosY = (this.radius) * Math.sin(r) + potentialPosition.y;
      testPosX = clamp(testPosX, 0, terrain.width - 1);
      testPosY = clamp(testPosY, 0, terrain.height - 1);

      const terrainIndex = terrain.index(Math.floor(testPosX), Math.floor(testPosY));
      /* Test if any points on the semicircle intersect with terrain */
      if (terrain.terrain[terrainIndex] !== 0) {
        /* Accumulate collision points to give an escape response */
        /* Effectively, normal to the areas of contact */
        response = response.add(potentialPosition.subtract(new Vector(testPosX, testPosY)));
        collision = true;
      }
    }

    let magVelocity = 0;
    /* Find angle of collision */
    if (collision) {
      /* Force the object to be stable, this stops the object penetrating the terrain */
      this.stable = true;
      magVelocity = this.velocity.magnitude();
      const magResponse = response.magnitude();

      /* Calculate reflection vector of object's velocity vector, using response vector */
      const dot = Vector.dot(this.velocity, response.unit());

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
      this.position = potentialPosition;
    }

    /* Turn off movement if the movement is too small */
    if (magVelocity < 0.1) {
      this.stable = true;
    }
  }
}

export { PhysicsObject };
