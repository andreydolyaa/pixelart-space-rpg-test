import GameObject from "./GameObject";
import InputControls from "./InputControls";

class Asteroid extends GameObject {
  constructor(options = {}) {
    super(options);
    this.inputControls = new InputControls({ x: this.x, y: this.y, npc: true });
  }
  setAsteroidSize(size) {
    this.sprite.imageScale = size;
  }
  runNpcAutoPosition(x = null, y = null) {
    this.inputControls.velocity.x = x;
    this.inputControls.velocity.y = y;
    this.x += this.inputControls.velocity.x;
    this.y += this.inputControls.velocity.y;
    // TODO: refactor this calculations
    if (this.y === 500) {
      this.y = -200;
      this.x = -200;
      this.inputControls.velocity.y = 0;
      this.inputControls.velocity.x = 0;
    }
    if (this.x === -500) {
      this.y = 0;
      this.x = 500;
      this.inputControls.velocity.y = 0;
      this.inputControls.velocity.x = 0;
    }
  }
  init(context, x, y, size) {
    this.sprite.draw(context);
    this.setAsteroidSize(size);
    this.runNpcAutoPosition(x, y);
  }
}

export default Asteroid;
