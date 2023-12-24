import GameObject from "./GameObject";
import InputControls from "./InputControls";

class Asteroid extends GameObject {
  constructor(options = {}) {
    super(options);
    this.inputControls = new InputControls({ x: this.x, y: this.y, npc: true });
  }
  runNpcAutoPosition(x = null, y = null) {
    this.inputControls.velocity.x = x;
    this.inputControls.velocity.y = y;
    this.x += this.inputControls.velocity.x;
    this.y += this.inputControls.velocity.y;
    if (this.y === 700) {
      this.y = -200;
      this.x = -200;
      this.inputControls.velocity.y = 0;
    }
  }
  init(context) {
    this.sprite.draw(context);
    this.runNpcAutoPosition(1, 1);
  }
}

export default Asteroid;
