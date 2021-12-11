function createGrid() {
  for (let i = 0; i < gameGridSize * gameGridSize; i++) {
    let tile = document.createElement("h2");

    tile.innerHTML = 0;
    gameGrid.appendChild(tile);
    tiles.push(tile);
  }

  setTileSize();
  getGameTiles();

  createTile();
  createTile();
}

function setTileSize() {
  let tileSize = 100 / gameGridSize;

  for (let tile of gameGrid.getElementsByTagName("h2")) {
    tile.style.width = tileSize + '%';
    tile.style.height = tileSize + '%';
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

function getGameTiles() {
  for (let i = 0; i < gameGridSize * gameGridSize; i++) {
    if (i % gameGridSize === 0) {
      let row = [];

      for (let i2 = 0; i2 < gameGridSize; i2++) {
        row.push(tiles[i + i2]);
      }

      gameTiles.push(row);
    }
  }
}

function gameShiftHorizontal(direction) {
  for (let iR = 0; iR < gameGridSize; iR++) {
    let row = [];

    for (let iC = 0; iC < gameGridSize; iC++) {
      row.push(parseInt(gameTiles[iR][iC].innerHTML));
    }

    let rowFiltered = row.filter(num => num);
    let emptyTiles = gameGridSize - rowFiltered.length;
    let newZeros = Array(emptyTiles).fill(0);
    let rowUpdated;

    if (direction === "left") {
      rowUpdated = rowFiltered.concat(newZeros);
    } else {
      rowUpdated = newZeros.concat(rowFiltered);
    }

    for (let iC = 0; iC < gameGridSize; iC++) {
      gameTiles[iR][iC].innerHTML = rowUpdated[iC];
    }
  }
}

function gameShiftVertical(direction) {
  for (let iC = 0; iC < gameGridSize; iC++) {
    let column = [];

    for (let iR = 0; iR < gameGridSize; iR++) {
      column.push(parseInt(gameTiles[iR][iC].innerHTML));
    }

    let columnFiltered = column.filter(num => num);
    let emptyTiles = gameGridSize - columnFiltered.length;
    let newZeros = Array(emptyTiles).fill(0);
    let columnUpdated;

    if (direction === "up") {
      columnUpdated = columnFiltered.concat(newZeros);
    } else {
      columnUpdated = newZeros.concat(columnFiltered);
    }

    for (let iR = 0; iR < gameGridSize; iR++) {
      gameTiles[iR][iC].innerHTML = columnUpdated[iR];
    }
  }
}

function gameCombineHorrizontal() {
  for (let iR = 0; iR < gameGridSize; iR++) {
    for (let iC = 0; iC < gameGridSize - 1; iC++) {
      if (gameTiles[iR][iC].innerHTML === gameTiles[iR][iC + 1].innerHTML) {
        gameTiles[iR][iC].innerHTML = parseInt(gameTiles[iR][iC].innerHTML * 2);
        gameTiles[iR][iC + 1].innerHTML = 0;
      }
    }
  }
}

function gameCombineVertical() {
  for (let iC = 0; iC < gameGridSize; iC++) {
    for (let iR = 0; iR < gameGridSize - 1; iR++) {
      if (gameTiles[iR][iC].innerHTML === gameTiles[iR + 1][iC].innerHTML) {
        gameTiles[iR][iC].innerHTML = parseInt(gameTiles[iR][iC].innerHTML * 2);
        gameTiles[iR + 1][iC].innerHTML = 0;
      }
    }
  }
}

function gameInputHorizontal(direction) {
  gameShiftHorizontal(direction);
  gameCombineHorrizontal();
  gameShiftHorizontal(direction);
  createTile();
  updateGameScore();
}

function gameInputVertical(direction) {
  gameShiftVertical(direction);
  gameCombineVertical();
  gameShiftVertical(direction);
  createTile();
  updateGameScore();
}

function updateGameScore() {
  for (let tile of tiles) {
    if (parseInt(tile.innerHTML) > parseInt(gameScore.innerHTML)) {
      gameScore.innerHTML = parseInt(tile.innerHTML);
    }
  }
}

function startGame() {
  createGrid();
}

// Game elements
const gameGrid = document.getElementById("game-grid");
const gameScore = document.getElementById("game-score");
let gameTiles = [];

// Game settings
const gameGridSize = 4;

// Game variables
let tiles = [];