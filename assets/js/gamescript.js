function createGrid() {
  for (let i = 0; i < gameGridSize * gameGridSize; i++) {
    let tile = document.createElement("div");
    tile.innerHTML = 0;
    gameGrid.appendChild(tile);
    tiles.push(tile);
  }

  createTile();
  createTile();
}

function createTile() {
  let randomNum = Math.floor(Math.random() * tiles.length);
  if (tiles[randomNum] == 0) {
    tiles[randomNum] = 2;
  } else {
    createTile();
  }
}

function startGame() {
  createGrid();
}

// Game elements
const gameGrid = document.getElementById("game-grid");
const gameScore = document.getElementById("game-score");

// Game settings
const gameGridSize = 4;

// Game variables
let tiles = [];