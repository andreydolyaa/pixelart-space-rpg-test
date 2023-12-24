import Sprite from "./Sprite";

class SpriteAnimation extends Sprite {
  constructor(options = {}) {
    super(options);
    this.animationRate = options.animationRate;
    this.animationSpeed = options.animationSpeed;
    this.animationSpriteWidth = options.animationSpriteWidth;
    this.frameSpeed = options.frameSpeed || 10;
    this.animationFrameCounter = 0;
  }
  animate() {
    return () => {
      if (this.animationRate === this.animationSpriteWidth) {
        this.animationRate = this.spriteWidth;
      } else {
        if (this.animationFrameCounter === this.frameSpeed) {
          this.animationFrameCounter = 0;
          this.animationRate += this.animationSpeed;
        } else {
          this.animationFrameCounter++;
        }
      }
      return this.animationRate;
    };
  }
}

export default SpriteAnimation;
