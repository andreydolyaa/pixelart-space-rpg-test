import Sprite from "./Sprite";

class GameObject {
  constructor(options = {}) {
    this.x = options.x || 0;
    this.y = options.y || 0;
    this.sprite = new Sprite({
      gameObject: this,
      shipSrc: options.shipSrc,
      thrusterSrc: options.thrusterSrc
    });
  }
}

export default GameObject;
