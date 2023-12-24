import GameObject from "./GameObject";
import InputControls from "./InputControls";

class SpaceShip extends GameObject {
  constructor(options = {}) {
    super(options);
    this.keyState = {};
    this.thrusterImage = new Image();
    this.thrusterImage.src = "/src/assets/Nairan/engine/PNGs/fighter.png";
    this.isTrusterEnabled = true;
    this.thrusterRate = 64;
    this.thrusterSpeed = 64;
    this.thrusterFrameCounter = 0;
    this.thrusterSpriteWidth = 512;

    this.inputControls = new InputControls({ x: this.x, y: this.y, npc: false });

    this.thrusterImage.onload = () => {
      this.isThrusterLoaded = true;
    };
  }
  animateTrusterClosure() {
    return () => {
      if (this.thrusterRate === this.thrusterSpriteWidth) {
        this.thrusterRate = this.sprite.spriteWidth;
      } else {
        if (this.thrusterFrameCounter === 10) {
          this.thrusterFrameCounter = 0;
          this.thrusterRate += this.thrusterSpeed;
        } else {
          this.thrusterFrameCounter++;
        }
      }
      return this.thrusterRate;
    };
  }
  drawThruster(context) {
    if (this.isThrusterLoaded && this.isTrusterEnabled) {
      const animateThruster = this.animateTrusterClosure();
      context.drawImage(
        this.thrusterImage,
        animateThruster(),
        this.sprite.spriteSheetCutY,
        this.sprite.spriteWidth,
        this.sprite.spriteHeight,
        this.x,
        this.y,
        this.sprite.imageScale,
        this.sprite.imageScale
      );
    }
  }
  handleNewPositionUpdates(data) {
    const [x, y] = data;
    this.x = x;
    this.y = y;
  }
  init(context) {
    this.drawThruster(context);
    this.sprite.draw(context);
    this.handleNewPositionUpdates(this.inputControls.updatePosition());
  }
}

export default SpaceShip;
