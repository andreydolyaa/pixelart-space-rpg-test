import GameAudio from "./src/GameAudio";
import World from "./src/World";

function init() {
  const audio = new GameAudio();
  const world = new World({});
  world.init();
  setTimeout(() => {
    audio.play();
  }, 100);
}

init();
