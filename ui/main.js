import "./style.css";

const canvas = document.querySelector("#canvas");
const context = canvas.getContext("2d");
context.imageSmoothingEnabled = false;

const fighter = new Image();
const thruster = new Image();
thruster.src = "/Nairan/engine/PNGs/fighter.png";
fighter.src = "/Nairan/base/PNGs/fighter.png";

let isFighterLoaded = false;
let isThrusterLoaded = false;

fighter.onload = () => {
  isFighterLoaded = true;
};
thruster.onload = () => {
  isThrusterLoaded = true;
};

const fighterSize = 150;
const fighterVelocity = 1;

const directions = {
  fighterX: 250,
  fighterY: 250,
  velocityX: 0,
  velocityY: 0,
};
let currentThrusterRate = 64;
let thrusterFrameCounter = 0;
let thrusterRateSpeed = 64;

function animateThruster() {
  return () => {
    if (currentThrusterRate === 512) {
      currentThrusterRate = 64;
    } else {
      if (thrusterFrameCounter === 10) {
        thrusterFrameCounter = 0;
        currentThrusterRate += thrusterRateSpeed;
      } else {
        thrusterFrameCounter++;
      }
    }
    return currentThrusterRate;
  };
}

const keyState = {};

function inputControl(e) {
  const inputsMap = {
    ArrowUp: ["velocityY", -2],
    ArrowDown: ["velocityY", 2],
    ArrowLeft: ["velocityX", -2],
    ArrowRight: ["velocityX", 2],
  };
  const input = inputsMap[e.key];
  if (e.type === "keydown") {
    if (input) {
      keyState[e.key] = true;
      directions[input[0]] = input[1] * fighterVelocity;
    }
  } else if (e.type === "keyup") {
    if (input) {
      keyState[e.key] = false;
      directions[input[0]] = 0;
    }
  }
}

function updateFighterPosition() {
  directions.fighterX += directions.velocityX;
  directions.fighterY += directions.velocityY;
}

function startGameLoop() {
  const frame = () => {
    context.clearRect(0, 0, canvas.width, canvas.height);
    
    const animateThrusterRate = animateThruster();
    context.fillStyle = "black";
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.drawImage(
      fighter,
      0,
      0,
      64,
      64,
      directions.fighterX,
      directions.fighterY,
      fighterSize,
      fighterSize
    );

    context.drawImage(
      thruster,
      animateThrusterRate(),
      0,
      64,
      64,
      directions.fighterX,
      directions.fighterY,
      fighterSize,
      fighterSize
    );
    updateFighterPosition();

    requestAnimationFrame(() => {
      frame();
    });
  };
  window.addEventListener("keydown", inputControl);
  window.addEventListener("keyup", inputControl);

  frame();
}

startGameLoop();
