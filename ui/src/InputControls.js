class InputControls {
  constructor(options = {}) {
    this.x = options.x;
    this.y = options.y;
    this.npc = options.npc || false;
    this.speed = -1;
    this.shooting = false;
    this.moving = false;
    this.map = {
      w: ["y", this.speed],
      s: ["y", this.speed * -1],
      a: ["x", this.speed],
      d: ["x", this.speed * -1],
    };
    this.velocity = {
      main: 1.5,
      x: 0,
      y: 0,
    };
    !this.npc && this.setInputListeners();
  }
  setInputListeners() {
    window.addEventListener("keydown", (e) => {
      this.inputControl(e);
    });
    window.addEventListener("keyup", (e) => {
      this.inputControl(e);
    });
  }
  updatePosition() {
    this.x += this.velocity.x;
    this.y += this.velocity.y;
    this.watchActiveMovement();
    return [this.x, this.y];
  }
  watchActiveMovement() {
    if (this.velocity.y !== 0 || this.velocity.x !== 0) {
      this.moving = true;
    } else {
      this.moving = false;
    }
  }
  handleShooting(pressed) {
    if (pressed) this.shooting = true;
    else this.shooting = false;
  }
  inputControl(e) {
    const pressed = e.type === "keydown";
    const released = e.type === "keyup";
    if (e.key === "k") {
      this.handleShooting(pressed);
    }
    const input = this.map[e.key];
    if (pressed) {
      this.velocity[input[0]] = input[1] * this.velocity.main;
    } else if (released) {
      this.velocity[input[0]] = 0;
    }
  }
}

export default InputControls;
