/*
* Make everything a global variable. For ease of access
*/
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
//Snek Speed set to 0, so when user starts up screen 
let speedX = 0;
let speedY = 0;
// Define the grid size
const tileSize = 33.5;

// Define two shades of green for the grass
const greenShades = [
  "#228B22", // Forest green
  "#32CD32", // Lime green
];

// Draw the grass with alternating shades of green
function drawGrass() {
  for (let y = 0; y < canvas.height; y += tileSize) {
    for (let x = 0; x < canvas.width; x += tileSize) {
      const colorIndex = (x / tileSize + y / tileSize) % 2 === 0 ? 0 : 1;
      ctx.fillStyle = greenShades[colorIndex]; // Alternate between two shades
      ctx.fillRect(x, y, tileSize, tileSize);
    }
  }
}

// Draw the grid
function drawGrid() {
  ctx.strokeStyle = "darkgreen"; // Color of grid lines
  ctx.lineWidth = 1;

  // Draw vertical lines
  for (let x = 0; x <= canvas.width; x += tileSize) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, canvas.height);
    ctx.stroke();
  }

  // Draw horizontal lines
  for (let y = 0; y <= canvas.height; y += tileSize) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(canvas.width, y);
    ctx.stroke();
  }
}

// Draw the snake with two eyes
function drawSnake() {
  const snake = [
    { x: 5, y: 5 }, // Head of the snake
    { x: 4, y: 5 }, // Middle part
    { x: 3, y: 5 }, // Tail part
  ];

  // Draw each segment of the snake
  snake.forEach((segment, index) => {
    ctx.fillStyle = index === 0 ? "yellow" : "yellow"; // Snake head is yellow, others are green
    ctx.fillRect(
      segment.x * tileSize,
      segment.y * tileSize,
      tileSize,
      tileSize
    );

    // Optional: Add a border to each segment
    ctx.strokeStyle = "darkgreen";
    ctx.strokeRect(
      segment.x * tileSize,
      segment.y * tileSize,
      tileSize,
      tileSize
    );

    // Draw eyes on the snake's head (first segment)
    if (index === 0) {
      // Draw left eye
      ctx.fillStyle = "white";
      ctx.beginPath();
      ctx.arc(
        segment.x * tileSize + tileSize * 0.3,
        segment.y * tileSize + tileSize * 0.3,
        4,
        0,
        Math.PI * 2
      );
      ctx.fill();

      // Draw right eye
      ctx.beginPath();
      ctx.arc(
        segment.x * tileSize + tileSize * 0.7,
        segment.y * tileSize + tileSize * 0.3,
        4,
        0,
        Math.PI * 2
      );
      ctx.fill();

      // Draw pupils
      ctx.fillStyle = "black";
      ctx.beginPath();
      ctx.arc(
        segment.x * tileSize + tileSize * 0.3,
        segment.y * tileSize + tileSize * 0.3,
        2,
        0,
        Math.PI * 2
      );
      ctx.fill();

      ctx.beginPath();
      ctx.arc(
        segment.x * tileSize + tileSize * 0.7,
        segment.y * tileSize + tileSize * 0.3,
        2,
        0,
        Math.PI * 2
      );
      ctx.fill();
    }
  });
}

function SnekSpeed() {
  drawSnake().snake;
}
//Draw the food for the snake
function drawFood() {
  const food = { x: 10, y: 10 }; // Fixed spawn location for the food

  ctx.fillStyle = "red"; // Color of the food
  ctx.fillRect(food.x * tileSize, food.y * tileSize, tileSize, tileSize);

  // Add border for food
  ctx.strokeStyle = "darkred";
  ctx.strokeRect(food.x * tileSize, food.y * tileSize, tileSize, tileSize);
}
// Draw the entire canvas
function drawCanvas() {
  drawGrass(); // Draw the grass background with alternating colors
  drawGrid(); // Draw the grid
  drawSnake(); // Draw the static snake
  drawFood(); // Draw the food
}


// Function to open the tutorial overlay
function openTutorial() {
  const tutorialOverlay = document.getElementById("tutorialOverlay");
  tutorialOverlay.style.display = "flex";
}

// Function to close the tutorial overlay
function closeTutorial() {
  const tutorialOverlay = document.getElementById("tutorialOverlay");
  tutorialOverlay.style.display = "none";
}

// Add event listeners for buttons
document.addEventListener("DOMContentLoaded", () => {
  const tutorialButton = document.getElementById("tutorialButton");
  const closeTutorialButton = document.getElementById("closeTutorialButton");

  // Tutorial button opens the tutorial overlay
  tutorialButton.addEventListener("click", openTutorial);

  // Close button inside the tutorial overlay
  closeTutorialButton.addEventListener("click", closeTutorial);
});

// Initial rendering of the canvas
drawCanvas();
