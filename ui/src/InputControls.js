class InputControls {
  constructor(options = {}) {
    this.x = options.x;
    this.y = options.y;
    this.npc = options.npc || false;
    this.velocity = {
      main: 1,
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
    const inputsMap = {
      ArrowUp: ["y", -2],
      ArrowDown: ["y", 2],
      ArrowLeft: ["x", -2],
      ArrowRight: ["x", 2],
    };
    const input = inputsMap[e.key];
    if (e.type === "keydown") {
      if (input) {
        this.velocity[input[0]] = input[1] * this.velocity.main;
      }
    } else if (e.type === "keyup") {
      if (input) {
        this.velocity[input[0]] = 0;
      }
    }
  }
}

export default InputControls;
