import { Vector } from '../utils/vector.js';

class Mouse {
  constructor(canvas) {
    this.position = new Vector();
    this.down = false;
    this.createListeners(canvas);
  }

  createListeners(canvas) {
    /* Capture inputs for the mouse */
    addEventListener("mousedown", e => {
      this.down = true;
    });

    addEventListener("mouseup", e => {
      this.down = false;
    });
    /* Get mousepos on canvas */
    addEventListener("mousemove", e => {
      const rect = canvas.getBoundingClientRect();
      this.position.x = Math.floor((e.clientX - rect.left) / (rect.right - rect.left) * canvas.width);
      this.position.y = Math.floor((e.clientY - rect.top) / (rect.bottom - rect.top) * canvas.height);
    });
  }

  /* Draw white dot for cursor */
  drawMouse(canvas, imageDataBuffer) {
    const index = this.position.y * canvas.width + this.position.x;
    imageDataBuffer[index] = 0xFFFFFFFF;
  }
}

export { Mouse };
