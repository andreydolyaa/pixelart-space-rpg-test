import SpaceShip from "./SpaceShip";
import Stars from "./Stars";

class World {
  constructor(options = {}) {
    this.canvas = document.querySelector("#canvas");
    this.context = this.canvas.getContext("2d");
    this.context.imageSmoothingEnabled = false;
    this.stars = new Stars({
      context: this.context,
      canvas: this.canvas,
      amount: 1000,
      sizes: [0.5, 1.5],
    });
    this.hero = new SpaceShip({
      x: 250,
      y: 250,
      shipSrc: "/src/assets/Nairan/base/PNGs/fighter.png",
      thrusterSrc: "/src/assets/Nairan/engine/PNGs/fighter.png",
    });
  }
  clearCanvas() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
  setCanvasBackground() {
    this.context.fillStyle = "black";
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }
  setInputControlListeners() {
    window.addEventListener("keydown", (e) => {
      this.hero.inputControl(e);
    });
    window.addEventListener("keyup", (e) => {
      this.hero.inputControl(e);
    });
  }
  runGameLoop() {
    const frame = () => {
      this.clearCanvas();
      this.setCanvasBackground();
      this.stars.draw(this.context);
      this.stars.update(this.canvas);
      this.stars.animateStars()
      this.hero.sprite.draw(this.context);
      this.hero.updatePosition();
      requestAnimationFrame(() => {
        frame();
      });
    };
    this.setInputControlListeners();
    frame();
  }
  init() {
    this.runGameLoop();
  }
}

export default World;
