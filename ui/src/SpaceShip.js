import GameObject from "./GameObject";

class SpaceShip extends GameObject {
  constructor(options = {}) {
    super(options);
    this.keyState = {};
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
}

export default SpaceShip;
