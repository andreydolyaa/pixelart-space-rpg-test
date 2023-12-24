class Sprite {
  constructor(options = {}) {
    this.gameObject = options.gameObject;
    this.image = new Image();
    this.image.src = options.src;
    this.spriteSizeWidth = 64;
    this.spriteSizeHeight = 64;
    this.imageScale = 150;

    this.directions = {
      imagePositionX: this.gameObject.x || 250,
      imagePositionY: this.gameObject.y || 250,
      imageVelocityX: 0,
      imageVelocityY: 0,
    };

    this.spriteSheetCutX = 0;
    this.spriteSheetCutY = 0;

    this.image.onload = () => {
      this.isImageLoaded = true;
    };
  }
  draw(context) {
    this.isImageLoaded &&
      context.drawImage(
        this.image,
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
