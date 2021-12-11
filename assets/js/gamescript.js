function createGrid() {
  for (let i = 0; i < gameGridSize * gameGridSize; i++) {
    let tile = document.createElement("div");

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

function updateGameTilesValues() {
  let values = [];

  for (let row of gameTiles) {
    let rowValues = [];

    for (let column of row) {
      rowValues.push(parseInt(column.innerHTML));
    }
    values.push(rowValues);
  }

  gameTilesValues = values;
}

function gameShiftHorizontal(direction) {
  updateGameTilesValues();

  for (let i = 0; i < gameGridSize; i++) {
    let rowFiltered = gameTilesValues[i].filter(num => num);
    let emptyTiles = gameGridSize - rowFiltered.length;
    let newZeros = Array(emptyTiles).fill(0);
    let rowUpdated;

    if (direction === "left") {
      rowUpdated = rowFiltered.concat(newZeros);
    } else {
      rowUpdated = newZeros.concat(rowFiltered);
    }

    for (let i2 = 0; i2 < gameGridSize; i2++) {
      gameTiles[i][i2].innerHTML = rowUpdated[i2];
    }
  }
}

function gameShiftVertical(direction) {
  updateGameTilesValues();

  for (let i = 0; i < gameGridSize; i++) {
    let column = [];

    for (let i2 = 0; i2 < gameGridSize; i2++) {
      column.push(gameTilesValues[i2][i]);
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

    for (let i2 = 0; i2 < gameGridSize; i2++) {
      gameTiles[i2][i].innerHTML = columnUpdated[i2];
    }
  }
}

function gameCombineHorrizontal() {
  updateGameTilesValues();

  for (let row of gameTiles) {
    for (let i = 0; i < row.length - 1; i++) {
      if (row[i].innerHTML === row[i + 1].innerHTML) {
        row[i].innerHTML = parseInt(row[i].innerHTML) * 2;
        row[i + 1].innerHTML = 0;
      }
    }
  }
}

function gameCombineVertical() {
  updateGameTilesValues();

  for (let i = 0; i < gameGridSize - 1; i++) {
    for (let i2 = 0; i2 < gameGridSize; i2++) {
      if (gameTilesValues[i][i2] === gameTilesValues[i + 1][i2]) {
        gameTiles[i][i2].innerHTML = gameTilesValues[i][i2] * 2;
        gameTiles[i + 1][i2].innerHTML = 0;
      }
    }
  }
}

function gameInputHorizontal(direction) {
  gameShiftHorizontal(direction);
  gameCombineHorrizontal();
  gameShiftHorizontal(direction);
  createTile();
}

function gameInputVertical(direction) {
  gameShiftVertical(direction);
  gameCombineVertical();
  gameShiftVertical(direction);
  createTile();
}

function startGame() {
  createGrid();
}

// Game elements
const gameGrid = document.getElementById("game-grid");
const gameScore = document.getElementById("game-score");
let gameTiles = [];
let gameTilesValues = [];

// Game settings
const gameGridSize = 4;

// Game variables
let tiles = [];