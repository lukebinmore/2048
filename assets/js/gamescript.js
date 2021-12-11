function createGrid() {
  for (let i = 0; i < gameGridSize * gameGridSize; i++) {
    let tile = document.createElement("div");

    tile.innerHTML = 0;
    gameGrid.appendChild(tile);
    tiles.push(tile);
  }

  setTileSize();

  createTile();
  createTile();
}

function setTileSize() {
  let tileSize = 100 / gameGridSize;
  for (let div of gameGrid.getElementsByTagName("div")) {
    div.style.width = tileSize + '%';
    div.style.height = tileSize + '%';
  }
}

function createTile() {
  let randomNum = Math.floor(Math.random() * tiles.length);

  if (tiles[randomNum].innerHTML == 0) {
    tiles[randomNum].innerHTML = 2;
  } else {
    createTile();
  }
}

function getCurrentGrid() {
  let currentGrid = [];

  for (let i = 0; i < gameGridSize * gameGridSize; i++) {
    if (i % gameGridSize === 0) {
      let totals = [];
      let row = [];

      for (let i2 = 0; i2 < gameGridSize; i2++) {
        row.push(parseInt(tiles[i + i2].innerHTML));
      }

      currentGrid.push(row);
    }    
  }

  return currentGrid;
}

function startGame() {
  createGrid();
  getCurrentGrid();
}

// Game elements
const gameGrid = document.getElementById("game-grid");
const gameScore = document.getElementById("game-score");

// Game settings
const gameGridSize = 4;

// Game variables
let tiles = [];