

// Adding console logs for each direction clicked
document.getElementById("up").addEventListener("click", () => console.log("up"));
document.getElementById("down").addEventListener("click", () => console.log("down"));
document.getElementById("left").addEventListener("click", () => console.log("left"));
document.getElementById("right").addEventListener("click", () => console.log("right"));

//Logs arrow key presses with same D-Pad functionality
document.addEventListener("keydown", (event) => {
  switch (event.key) {
    case "ArrowUp":
      console.log("up");
      break;
    case "ArrowDown":
      console.log("down");
      break;
    case "ArrowLeft":
      console.log("left");
      break;
    case "ArrowRight":
      console.log("right");
      break;
    default:
      // Do nothing for other keys
      break;
  }
});

