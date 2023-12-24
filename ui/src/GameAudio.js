class GameAudio {
  constructor() {
    this.soundtrack = new Audio("/src/assets/audio/soundtrack.mp3");
  }
  play() {
    this.soundtrack.play();
  }
  stop() {
    this.soundtrack.stop();
  }
}

export default GameAudio;
