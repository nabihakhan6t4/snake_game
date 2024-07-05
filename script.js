// Game Constants & Variables
let direction = { x: 0, y: 0 };
const foodSound = new Audio("sounds/eat.mp3");
const gameOverSound = new Audio("sounds/game_over.mp3");
const moveSound = new Audio("sounds/snake_move.mp3");
const musicSound = new Audio("sounds/snake_music (1).mp3");
let speed = 2;
let lastPaintTime = 0;
let snakeArr = [{ x: 13, y: 15 }];
let food = { x: 6, y: 7 }; // Add 'let' to properly declare 'food'

// Game Function
function main(currentTime) {
  window.requestAnimationFrame(main);
  // console.log(currentTime);
  if ((currentTime - lastPaintTime) / 1000 < 1 / speed) {
    return;
  }
  lastPaintTime = currentTime;
  gameEngine();
}

function gameEngine() {
  // Updating the snake array and food
  // Display the snake and food
  board.innerHTML = "";
  snakeArr.forEach((e, index) => {
    let snakeElement = document.createElement("div");
    snakeElement.style.gridRowStart = e.y;
    snakeElement.style.gridColumnStart = e.x;
    if (index === 0) {
      snakeElement.classList.add("head");
    } else {
      snakeElement.classList.add("snake");
    }
    board.appendChild(snakeElement);
  });

  let foodElement = document.createElement("div");
  foodElement.style.gridRowStart = food.y;
  foodElement.style.gridColumnStart = food.x;
  foodElement.classList.add("food");
  board.appendChild(foodElement);
}

// Main Logic Starts Here
window.requestAnimationFrame(main);

window.addEventListener("keydown", (e) => {
  snakeVelocity = { x: 0, y: 0 };
  moveSound.play();
  switch (e.key) {
    case "ArrowUp":
      console.log("ArrowUp");
      snakeVelocity.x = 0;
      snakeVelocity.y = -1;
      break;
    case "ArrowDown":
      console.log("ArrowDown");
      snakeArr = ity.x = 0;
      snakeVelocity.y = 1;

      break;
    case "ArrowRight":
      console.log("ArrowRight");
      snakeVelocity.x = 0;
      snakeVelocity.y = 0;

      break;
    case "ArrowLeft":
      console.log("ArrowLeft");
      snakeVelocity.x = 0;
      snakeVelocity.y = 0;
      break;
    default:
      break;
  }
});
