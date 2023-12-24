import GameObject from "./GameObject";
import InputControls from "./InputControls";
import SpriteAnimation from "./SpriteAnimation";

class SpaceShip extends GameObject {
  constructor(options = {}) {
    super(options);
    this.keyState = {};
    this.thrusterImage = new Image();
    this.weaponImage = new Image();
    this.thrusterImage.src = "/src/assets/Nairan/engine/PNGs/fighter.png";
    this.weaponImage.src = "/src/assets/Nairan/weapons/PNGs/fighter.png";
    this.isTrusterEnabled = true;

    this.inputControls = new InputControls({ x: this.x, y: this.y, npc: false });

    this.animateThruster = new SpriteAnimation({
      animationRate: 64,
      animationSpeed: 64,
      animationSpriteWidth: 512,
      frameSpeed: 7,
    });

    this.animateShooting = new SpriteAnimation({
      animationRate: 64,
      animationSpeed: 64,
      animationSpriteWidth: 1792,
      frameSpeed: 1,
    });

    this.thrusterImage.onload = () => {
      this.isThrusterLoaded = true;
    };

    this.weaponImage.onload = () => {
      this.isWeaponLoaded = true;
    };
  }

  drawThruster(context) {
    if (this.isThrusterLoaded && this.inputControls.moving) {
      const animate = this.animateThruster.animate();
      context.drawImage(
        this.thrusterImage,
        animate(),
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
  drawShooting(context) {
    if (this.isWeaponLoaded && this.inputControls.shooting) {
      const animate = this.animateShooting.animate();
      context.drawImage(
        this.weaponImage,
        animate(),
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
  render(context) {
    this.sprite.draw(context);
    this.drawShooting(context);
    this.drawThruster(context);
    this.handleNewPositionUpdates(this.inputControls.updatePosition());
  }
}

export default SpaceShip;
