import GameObject from "./GameObject";

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

    this.thrusterImage.onload = () => {
      this.isThrusterLoaded = true;
    };
  }
  updatePosition() {
    this.sprite.directions.imagePositionX += this.sprite.directions.imageVelocityX;
    this.sprite.directions.imagePositionY += this.sprite.directions.imageVelocityY;
  }
  inputControl(e) {
    const inputsMap = {
      ArrowUp: ["imageVelocityY", -2],
      ArrowDown: ["imageVelocityY", 2],
      ArrowLeft: ["imageVelocityX", -2],
      ArrowRight: ["imageVelocityX", 2],
    };
    const input = inputsMap[e.key];
    if (e.type === "keydown") {
      if (input) {
        // this.sprite.isTrusterEnabled = true;
        this.keyState[e.key] = true;
        this.sprite.directions[input[0]] = input[1] * this.sprite.imageVelocityMain;
      }
    } else if (e.type === "keyup") {
      if (input) {
        // this.sprite.isTrusterEnabled = false;
        this.keyState[e.key] = false;
        this.sprite.directions[input[0]] = 0;
      }
    }
  }
  animateTrusterClosure() {
    return () => {
      if (this.thrusterRate === this.thrusterSpriteWidth) {
        this.thrusterRate = this.sprite.spriteSizeWidth;
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
        this.sprite.spriteSizeWidth,
        this.sprite.spriteSizeHeight,
        this.sprite.directions.imagePositionX,
        this.sprite.directions.imagePositionY,
        this.sprite.imageScale,
        this.sprite.imageScale
      );
    }
  }
  init(context) {
    this.drawThruster(context);
    this.sprite.draw(context);
    this.updatePosition();
  }
}

export default SpaceShip;
