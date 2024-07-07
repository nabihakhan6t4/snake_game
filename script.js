// Game Constants & Variables
let inputDir = { x: 0, y: 0 }; // Initial direction of the snake
const foodSound = new Audio("sounds/eat.mp3"); // Sound for when snake eats food
const gameOverSound = new Audio("sounds/game_over.mp3"); // Sound for game over
const moveSound = new Audio("sounds/snake_move.mp3"); // Sound for snake movement
const musicSound = new Audio("sounds/snake_music (1).mp3"); // Background music for the game
let speed = 10; // Speed of the snake
let score = 0; // Current score of the player
let lastPaintTime = 0; // Timestamp of the last frame
let snakeArr = [{ x: 13, y: 15 }]; // Array to store snake's position
let food = { x: 6, y: 7 }; // Initial position of food

// Game Function
function main(currentTime) {
  window.requestAnimationFrame(main); // Request animation frame for smooth animation

  // Control frame rate based on speed
  if ((currentTime - lastPaintTime) / 1000 < 1 / speed) {
    return;
  }

  lastPaintTime = currentTime; // Update last paint time
  gameEngine(); // Call the main game engine function
}

function isCollide(sarr) {
  // Check if snake collides with itself or the wall
  for (let i = 1; i < snakeArr.length; i++) {
    if (snakeArr[i].x === snakeArr[0].x && snakeArr[i].y === snakeArr[0].y) {
      return true;
    }
  }

  // Check if snake bumps into the wall
  if (
    snakeArr[0].x >= 18 ||
    snakeArr[0].x <= 0 ||
    snakeArr[0].y >= 18 ||
    snakeArr[0].y <= 0
  ) {
    return true;
  }

  return false; // Return false if no collision
}

function gameEngine() {
  // Update snake position and handle game logic

  // Check for collision
  if (isCollide(snakeArr)) {
    gameOverSound.play(); // Play game over sound
    musicSound.pause(); // Pause background music
    inputDir = { x: 0, y: 0 }; // Reset snake direction
    setTimeout(() => {
      alert("Game Over. Press any key to play again.");
    }, 100); // Delayed alert for better user experience
    snakeArr = [{ x: 13, y: 15 }]; // Reset snake position
    musicSound.play(); // Play background music again
    score = 0; // Reset score
  }

  // Check if snake eats food
  if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
    foodSound.play(); // Play food eat sound
    score += 1; // Increase score
    if (score > highscore) {
      highscore = score; // Update high score if current score is higher
      localStorage.setItem("highscore", highscore); // Store high score in local storage
      document.getElementById("highscoreBox").innerHTML =
        "High Score: " + highscore; // Update high score display
    }
    document.getElementById("scoreBox").innerHTML = "Score: " + score; // Update score display
    snakeArr.unshift({
      x: snakeArr[0].x + inputDir.x,
      y: snakeArr[0].y + inputDir.y,
    }); // Add new segment to snake

    // Generate new food position
    let a = 1; // Minimum grid position
    let b = 17; // Maximum grid position
    food = {
      x: a + Math.round(Math.random() * (b - a)), // Random x position for food
      y: a + Math.round(Math.random() * (b - a)), // Random y position for food
    };
  }

  // Move the snake
  for (let i = snakeArr.length - 2; i >= 0; i--) {
    snakeArr[i + 1] = { ...snakeArr[i] }; // Move each segment of the snake
  }
  snakeArr[0].x += inputDir.x; // Update head position based on direction
  snakeArr[0].y += inputDir.y; // Update head position based on direction

  // Render the snake and food on the game board
  let board = document.getElementById("board");
  board.innerHTML = ""; // Clear previous board state
  snakeArr.forEach((e, index) => {
    let snakeElement = document.createElement("div"); // Create div element for snake segment
    snakeElement.style.gridRowStart = e.y; // Set row position
    snakeElement.style.gridColumnStart = e.x; // Set column position
    snakeElement.classList.add(index === 0 ? "head" : "snake"); // Add CSS class based on segment type
    board.appendChild(snakeElement); // Append snake segment to board
  });

  let foodElement = document.createElement("div"); // Create div element for food
  foodElement.style.gridRowStart = food.y; // Set row position
  foodElement.style.gridColumnStart = food.x; // Set column position
  foodElement.classList.add("food"); // Add CSS class for food
  board.appendChild(foodElement); // Append food to board
}

// Initial setup
musicSound.play();
let highscore = localStorage.getItem("highscore"); // Get high score from local storage
if (highscore === null) {
  highscore = 0; // Set initial high score if not found
  localStorage.setItem("highscore", highscore); // Store initial high score in local storage
} else {
  highscore = parseInt(highscore); // Parse high score from string to integer
  document.getElementById("highscoreBox").innerHTML =
    "High Score: " + highscore; // Display high score on the screen
}

// Event listener for keyboard input
window.addEventListener("keydown", (e) => {
  moveSound.play(); // Play movement sound on key press
  switch (e.key) {
    case "ArrowUp":
      inputDir.x = 0; // Move snake up
      inputDir.y = -1;
      break;
    case "ArrowDown":
      inputDir.x = 0; // Move snake down
      inputDir.y = 1;
      break;
    case "ArrowRight":
      inputDir.x = 1; // Move snake right
      inputDir.y = 0;
      break;
    case "ArrowLeft":
      inputDir.x = -1; // Move snake left
      inputDir.y = 0;
      break;
    default:
      break;
  }
});

// Start the game loop
window.requestAnimationFrame(main); // Start the game animation loop
