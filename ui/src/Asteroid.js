import GameObject from "./GameObject";

class Asteroid extends GameObject {
  constructor(options = {}) {
    super(options);
  }
  init(context) {
    this.sprite.draw(context);
  }
}

export default Asteroid;
