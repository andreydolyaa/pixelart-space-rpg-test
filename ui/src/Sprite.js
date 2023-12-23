class Sprite {
  constructor(options = {}) {
    this.gameObject = options.gameObject;
    this.shipImage = new Image();
    this.thrusterImage = new Image();
    this.shipImage.src = options.shipSrc;
    this.thrusterImage.src = options.thrusterSrc;
    this.spriteSizeWidth = 64;
    this.spriteSizeHeight = 64;
    this.imageScale = 150;

    this.directions = {
      imagePositionX: this.gameObject.x || 250,
      imagePositionY: this.gameObject.y || 250,
      imageVelocityX: 0,
      imageVelocityY: 0,
    };

    this.imageVelocityMain = 1;
    this.spriteSheetCutX = 0;
    this.spriteSheetCutY = 0;

    this.isTrusterEnabled = true;
    this.thrusterRate = 64;
    this.thrusterSpeed = 64;
    this.thrusterFrameCounter = 0;
    this.thrusterSpriteWidth = 512;

    this.shipImage.onload = () => {
      this.isShipLoaded = true;
    };
    this.thrusterImage.onload = () => {
      this.isThrusterLoaded = true;
    };
  }
  animateTrusterClosure() {
    return () => {
      if (this.thrusterRate === this.thrusterSpriteWidth) {
        this.thrusterRate = this.spriteSizeWidth;
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
  draw(context) {
    if (this.isThrusterLoaded && this.isTrusterEnabled) {
      const animateThruster = this.animateTrusterClosure();
      context.drawImage(
        this.thrusterImage,
        animateThruster(),
        this.spriteSheetCutY,
        this.spriteSizeWidth,
        this.spriteSizeHeight,
        this.directions.imagePositionX,
        this.directions.imagePositionY,
        this.imageScale,
        this.imageScale
      );
    }
    this.isShipLoaded &&
      context.drawImage(
        this.shipImage,
        this.spriteSheetCutX,
        this.spriteSheetCutY,
        this.spriteSizeWidth,
        this.spriteSizeHeight,
        this.directions.imagePositionX,
        this.directions.imagePositionY,
        this.imageScale,
        this.imageScale
      );
  }
}

export default Sprite;
