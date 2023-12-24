class InputControls {
  constructor(options = {}) {
    this.x = options.x;
    this.y = options.y;
    this.npc = options.npc || false;
    this.speed = -2;
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
    return [this.x, this.y];
  }
  inputControl(e) {
    const pressed = e.type === "keydown";
    const released = e.type === "keyup";
    const input = this.map[e.key];
    if (pressed) {
      this.velocity[input[0]] = input[1] * this.velocity.main;
    } else if (released) {
      this.velocity[input[0]] = 0;
    }
  }
}

export default InputControls;
