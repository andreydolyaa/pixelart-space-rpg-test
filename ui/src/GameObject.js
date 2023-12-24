import Sprite from "./Sprite";

class GameObject {
  constructor(options = {}) {
    this.x = options.x || 0;
    this.y = options.y || 0;
    this.npc = options.npc || false;
    this.sprite = new Sprite({
      gameObject: this,
      src: options.src,
    });
  }
}

export default GameObject;
