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

  updateTileColor();
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

function gameShiftHorizontalCheck(direction) {
  for (let iR = 0; iR < gameGridSize; iR++) {
    let row = [];

    for (let iC = 0; iC < gameGridSize; iC++) {
      row.push(parseInt(gameTiles[iR][iC].innerHTML));
    }

    if (direction === "left") {
      row.reverse();
    }

    for (let iC = 0; iC < gameGridSize - 1; iC++) {
      if (row[iC] !== 0) {
        if (row[iC + 1] === 0) {
          return true;
        } else if (row[iC] === row[iC + 1]) {
          return true;
        }
      }
    }
  }

  return false;
}

function gameShiftVerticalCheck(direction) {
  for (let iC = 0; iC < gameGridSize; iC++) {
    let column = [];

    for (let iR = 0; iR < gameGridSize; iR++) {
      column.push(parseInt(gameTiles[iR][iC].innerHTML));
    }

    if (direction === "up") {
      column.reverse();
    }

    for (let iR = 0; iR < gameGridSize - 1; iR++) {
      if (column[iR] !== 0) {
        if (column[iR + 1] === 0) {
          return true;
        } else if (column[iR] === column[iR + 1]) {
          return true;
        }
      }
    }
  }

  return false;
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

function gameOverCheck() {
  if (!gameShiftHorizontalCheck("left") && !gameShiftHorizontalCheck("right") && !gameShiftVerticalCheck("up") && !gameShiftVerticalCheck("down")){
    gameGrid.style.display = "none";
    gameResults.style.display = "block";
  }
}

function gameInputHorizontal(direction) {
  if (!game.hidden) {
    if (gameShiftHorizontalCheck(direction)) {
      gameShiftHorizontal(direction)
      gameCombineHorrizontal();
      gameShiftHorizontal(direction);
      createTile();
    }
    updateGameScore();
    updateTileColor();
    gameOverCheck();
  }
}

function gameInputVertical(direction) {
  if (!game.hidden) {
    if (gameShiftVerticalCheck(direction)) {
      gameShiftVertical(direction)
      gameCombineVertical();
      gameShiftVertical(direction);
      createTile();
    }
    updateGameScore();
    updateTileColor();
    gameOverCheck();
  }
}

function updateGameScore() {
  for (let tile of tiles) {
    if (parseInt(tile.innerHTML) > parseInt(gameScore.innerHTML)) {
      gameScore.innerHTML = parseInt(tile.innerHTML);
    }
  }
}

function updateTileColor() {
  for (let i = 0; i < tiles.length; i++) {
    let colorIndex = Math.floor(Math.log2(parseInt(tiles[i].innerHTML) + 1));

    tiles[i].style.backgroundColor = gameColors[colorIndex];

    if (tiles[i].innerHTML == 0) {
      tiles[i].style.color = gameColors[colorIndex];
    } else {
      tiles[i].style.color = "#000";
    }
  }
}

function startGame() {
  createGrid();
}

// Game elements
const game = document.getElementById("game-page");
const gameGrid = document.getElementById("game-grid");
const gameScore = document.getElementById("game-score");
const gameResults = document.getElementById("game-results");
let gameTiles = [];

// Game settings
const gameGridSize = 4;

// Game variables
let tiles = [];

// Game colors
const gameColors = [
  "#E0E0E0",
  "hsl(30, 100%, 60%)",
  "hsl(50, 100%, 60%)",
  "hsl(70, 100%, 60%)",
  "hsl(90, 100%, 60%)",
  "hsl(110, 100%, 60%)",
  "hsl(130, 100%, 60%)",
  "hsl(150, 100%, 60%)",
  "hsl(170, 100%, 60%)",
  "hsl(190, 100%, 60%)",
  "hsl(210, 100%, 60%)",
  "hsl(230, 100%, 60%)",
  "hsl(250, 100%, 60%)",
  "hsl(270, 100%, 60%)",
  "hsl(290, 100%, 60%)",
  "hsl(310, 100%, 60%)",
  "hsl(330, 100%, 60%)",
  "hsl(350, 100%, 60%)"
]