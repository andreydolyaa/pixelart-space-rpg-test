import Asteroid from "./Asteroid";
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
      src: "/src/assets/Nairan/base/PNGs/fighter.png",
    });
    this.asteroid = new Asteroid({
      x: 50,
      y: 50,
      src: "/src/assets/environment/asteroids/PNGs/asteroid-1.png",
    });
  }
  clearCanvas() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
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
      this.stars.init(this.context, this.canvas);
      this.hero.init(this.context);

      this.asteroid.sprite.draw(this.context);
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
