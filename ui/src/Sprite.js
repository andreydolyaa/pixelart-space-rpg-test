class Sprite {
  constructor(options = {}) {
    this.gameObject = options.gameObject;
    this.image = new Image();
    this.image.src = options.src;
    this.spriteWidth = 64;
    this.spriteHeight = 64;
    this.spriteSheetCutX = 0;
    this.spriteSheetCutY = 0;
    this.imageScale = 100;

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
        this.spriteWidth,
        this.spriteHeight,
        this.gameObject.x,
        this.gameObject.y,
        this.imageScale,
        this.imageScale
      );
  }
}

export default Sprite;
