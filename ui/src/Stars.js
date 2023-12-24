class Stars {
  constructor(options = {}) {
    this.stars = [];
    this.colors = [
      "#2466B9",
      "#2495B9",
      "#5424B9",
      "#8524B9",
      "#26D6D3",
      "#A12070", // yellow
      "#00FEE0",
      "#7B00FE",
    ];
    this.starFrameCounter = 0;
    this.starFrameSpeed = 4;
    this.initialize(options.canvas, options.amount, options.sizes);
  }

  initialize(canvas, amount, sizes) {
    for (let i = 0; i < amount; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const [min, max] = sizes;
      const size = Math.random() * (max - min) + min;
      const isShining = i % 20 === 0;
      const index = Math.round(Math.random() * this.colors.length);
      const color = isShining ? this.colors[index] : "#6580D4";
      this.stars.push({ x, y, size, color });
    }
  }
  update(canvas) {
    for (const star of this.stars) {
      star.y += 1;
      if (star.y > canvas.height) {
        star.y = 0;
      }
    }
  }
  animateStars() {
    this.starFrameCounter++;
    for (let i = 0; i < this.stars.length; i++) {
      if (i % 20 === 0) {
        if (this.starFrameCounter % this.starFrameSpeed === 0) {
          if (this.stars[i].size > 3) this.stars[i].size -= 0.7;
          else this.stars[i].size += 0.1;
        }
      }
    }
  }
  drawBackground(context, canvas) {
    context.fillStyle = "black";
    context.fillRect(0, 0, canvas.width, canvas.height);
  }
  draw(context, canvas) {
    this.drawBackground(context, canvas);
    for (const star of this.stars) {
      context.beginPath();
      context.moveTo(star.x + star.size * Math.cos(0), star.y + star.size * Math.sin(0));
      for (let i = 1; i <= 6; i++) {
        context.lineTo(
          star.x + star.size * Math.cos((i * 2 * Math.PI) / 6),
          star.y + star.size * Math.sin((i * 2 * Math.PI) / 6)
        );
      }
      context.fillStyle = star.color;
      context.fill();
      context.closePath();
    }
  }
  render(context, canvas) {
    this.draw(context, canvas);
    this.update(canvas);
    this.animateStars();
  }
}

export default Stars;
