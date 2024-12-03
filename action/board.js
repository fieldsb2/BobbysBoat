const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Define the grid size
const tileSize = 33.5;

// Define two shades of green for the grass
const greenShades = [
  "#228B22", // Forest green
  "#32CD32", // Lime green
];

// Snake starting position
let snake = [
  { x: 5, y: 5 }, // Head of the snake
  { x: 4, y: 5 }, // Middle part
  { x: 3, y: 5 }, // Tail part
];

// Snake direction (default is right)
let direction = "right";

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

      ctx.beginPath();
      ctx.arc(
        segment.x * tileSize + tileSize * 0.7,
        segment.y * tileSize + tileSize * 0.3,
        4,
        0,
        Math.PI * 2
      );
      ctx.fill();

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

// Draw the food for the snake
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
  drawSnake(); // Draw the snake
  drawFood(); // Draw the food
}

// Update snake position based on direction
function updateSnake() {
  const head = { ...snake[0] };

  // Update head position based on direction
  if (direction === "right") head.x += 1;
  if (direction === "left") head.x -= 1;
  if (direction === "up") head.y -= 1;
  if (direction === "down") head.y += 1;

  // Add new head to the snake
  snake.unshift(head);
  snake.pop(); // Remove the tail
}

// Handle keyboard input for D-pad
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowUp" && direction !== "down") direction = "up";
  if (e.key === "ArrowDown" && direction !== "up") direction = "down";
  if (e.key === "ArrowLeft" && direction !== "right") direction = "left";
  if (e.key === "ArrowRight" && direction !== "left") direction = "right";
});

// Game loop to update and render the game
function gameLoop() {
  updateSnake();
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawCanvas();
  setTimeout(gameLoop, 200); // Adjust speed (200ms per frame)
}

// Start the game loop
drawCanvas();
gameLoop();
