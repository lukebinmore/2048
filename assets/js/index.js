//#region Script Management
/**
 * Script Initializer.
 * Starts basic operations of script, and runs inistal starting functions.
 */
function initializeScript() {
  document.addEventListener("click", clickInput);
  document.addEventListener("keypress", keyboardInput);
  document.addEventListener("keydown", keyboardInput);
  window.addEventListener("resize", setGameSectionSize);
  tipElement.addEventListener("animationend", nextTip);

  updatePlayerFields();
}
//#endregion

//#region localStorage Manipulation
/**
 * localStorage Item Setter.
 * Sets the value of a localStorage item, or creates it.
 * @param {string} name - Key of localStorage item.
 * @param {string} value - Value of localStorage item.
 */
function setLocalStorage(name, value) {
  let valueString;

  if (value.constructor === Array) {
    valueString = JSON.stringify(value);
  }

  window.localStorage.setItem(name, value);
}

/**
 * localStorage Item Grabber.
 * Gets the value of a localStorage item.
 * @param {string} name - Key of localStorage item.
 * @returns - Value of the localStorage item.
 */
function getLocalStorage(name) {
  return window.localStorage.getItem(name);
}
//#endregion

//#region Input Management
/**
 * Click Input Manager.
 * Manages and directs click based input to the appropriate function.
 * @param {event} e - Click event.
 */
function clickInput(e) {
  switch (e.target) {
    case instructionsButton:
      openInstructions();
      break;
    case historyButton:
      openHistory()
      break;
    case closePageButton:
      closePage();
      break;
    case splashPlayButton:
      openGameScreen();
      break;
    case splashResetButton:
      resetPlayerFields();
      break;
    case gameUpButton:
      gameInputVertical("up");
      break;
    case gameDownButton:
      gameInputVertical("down");
      break;
    case gameLeftButton:
      gameInputHorizontal("left");
      break;
    case gameRightButton:
      gameInputHorizontal("right");
      break;
    case gameResetButton:
      gameReset();
      break;
  }

  switch (e.target.parentElement) {
    case instructionsButton:
      openInstructions();
      break;
    case historyButton:
      openHistory()
      break;
    case closePageButton:
      closePage();
      break;
    case gameUpButton:
      gameInputVertical("up");
      break;
    case gameDownButton:
      gameInputVertical("down");
      break;
    case gameLeftButton:
      gameInputHorizontal("left");
      break;
    case gameRightButton:
      gameInputHorizontal("right");
      break;
  }
}

/**
 * Keyboard Input Manager.
 * Manages and directs keyboard based input to the approrpiate function.
 * @param {event} e - Keyboard event.
 */
function keyboardInput(e) {
  switch (e.key) {
    case "Enter":
      openGameScreen();
      break;
    case 'a':
      gameInputHorizontal("left");
      break;
    case 'd':
      gameInputHorizontal("right");
      break;
    case 'w':
      gameInputVertical("up");
      break;
    case 's':
      gameInputVertical("down");
      break;
    case 'Escape':
      closePage();
      break;
  }

  switch (e.keyCode) {
    case 37:
      gameInputHorizontal("left");
      break;
    case 39:
      gameInputHorizontal("right");
      break;
    case 38:
      gameInputVertical("up");
      break;
    case 40:
      gameInputVertical("down");
      break;
  }
}
//#endregion

//#region Splash Screen Management
/**
 * Player Fields Updater.
 * Updates the player fields on the splash screen with the values stored in localStorage if they exist.
 */
function updatePlayerFields() {
  if (getLocalStorage("username") !== "") {
    usernameInput.value = getLocalStorage("username");
  }

  if (getLocalStorage("localStorage") == "agreed") {
    localStorageInput.checked = true;
  }
}

/**
 * Splash Screen Closer.
 * Closes the splash screen and takes player to game screen.
 */
function closeSplashScreen() {
  splashScreen.hidden = true;

  for (let element of gameScreenElements) {
    element.hidden = false;
  }
}

/**
 * Player Details Validator.
 * Validates the details entered by the user.
 * @returns - If details are valid for use.
 */
function validatePlayerDetails() {
  if (usernameInput.value === "") {
    failedValidation("username empty");
    usernameInput.focus();
    return false;
  }

  if (!localStorageInput.checked) {
    failedValidation("localStorage not accepted");
    localStorageInput.focus();
    return false;
  }

  setLocalStorage("username", usernameInput.value);
  setLocalStorage("localStorage", "agreed");

  return true;
}

/**
 * Player Details Failed Validation Result.
 * Provides the user with info on why the validation fails.
 * @param {string} input - Failure reason.
 */
function failedValidation(input) {
  switch (input) {
    case "username empty":
      errElement.innerText = "Please enter a username!";
      break;
    case "localStorage not accepted":
      errElement.innerText = "Please confirm usage of localStorage!";
      break;
  }
}

/**
 * Player Details Resetter.
 * Resets the player details inputs to default values.
 */
function resetPlayerFields() {
  usernameInput.value = "";
  localStorageInput.checked = false;
  errElement.innerText = "";

  setLocalStorage("username", "");
  setLocalStorage("localStorage", "");
}

/**
 * Game Screen Opener.
 * Verifies player details, closes the splash screen, opens the game screen and starts features.
 * @param {event} e 
 */
function openGameScreen(e) {
  if (!splashScreen.hidden) {
    if (validatePlayerDetails()) {
      closeSplashScreen();
      setGameSectionSize();
      nextTip();
      startGame();
    }
  }
}

//#endregion

//#region Game Section Size Management
/**
 * Vertical Space Retreiver.
 * Gets the vertical space between score section and the controls section.
 * @returns - The vertical space in pixels.
 */
function getVerticalSpace() {
  let topRec = scoreSection.getBoundingClientRect();
  let bottomRec = controlsSection.getBoundingClientRect();

  return bottomRec.top - topRec.bottom;
}

/**
 * Space Comparer.
 * Compares the amount of vertical space between the score section and controls section, to the width of the page.
 * @returns - The smallest space in pixels.
 */
function compareSpace() {
  let vertical = getVerticalSpace();
  let horizontal = document.body.getBoundingClientRect().right;

  if (vertical <= horizontal) {
    return vertical;
  } else {
    return horizontal;
  }
}

/**
 * Space Setter.
 * Set's the width and height of the game section to the available space.
 */
function setGameSectionSize() {
  gameSection.style.width = compareSpace() + "px";
  gameSection.style.height = compareSpace() + "px";
}
//#endregion

//#region Page Management
/**
 * Instructions Opener.
 * Opens the instructions page in the game window.
 */
function openInstructions() {
  closePage();
  closePageButton.hidden = false;
  gamePage.hidden = true;
  instructionsPage.hidden = false;
}

/**
 * History Opener.
 * Opens the score history page in the game window.
 */
function openHistory() {
  closePage();
  updateHistoryPage();
  closePageButton.hidden = false;
  gamePage.hidden = true;
  historyPage.hidden = false;
}

/**
 * Page Closer.
 * Closes the instruction and history pages, and returns to the game page.
 */
function closePage() {
  instructionsPage.hidden = true;
  historyPage.hidden = true;
  closePageButton.hidden = true;
  gamePage.hidden = false;
}
//#endregion

//#region Game Operation / Management
/**
 * Game Creator.
 * Creates the game grid, and populates it with empty tiles, then sets up the starting colors and get's two starting blocks.
 */
function startGame() {
  for (let i = 0; i < gameGridSize * gameGridSize; i++) {
    let tile = document.createElement("h2");

    tile.innerHTML = 0;
    gameGrid.appendChild(tile);
    tilesList.push(tile);
  }

  setTileSize();
  getGameTiles();
  gameTimer("start");

  createTile();
  createTile();

  updateTileColor();
}

/**
 * Tile Size Setter.
 * Sets the size of the tiles based on the grid size configured.
 */
function setTileSize() {
  let tileSize = 100 / gameGridSize;

  for (let tile of gameGrid.getElementsByTagName("h2")) {
    tile.style.width = tileSize + '%';
    tile.style.height = tileSize + '%';
  }
}

/**
 * Tile Creator.
 * Creates a numbered tile at a random empty location in the grid.
 */
function createTile() {
  let randomNum = Math.floor(Math.random() * tilesList.length);

  if (tilesList[randomNum].innerHTML == 0) {
    tilesList[randomNum].innerHTML = 2;
  } else {
    createTile();
  }
}

/**
 * Tile Grabber.
 * Gets the tiles in the grid, and saves them to a multi-dimensional array.
 */
function getGameTiles() {
  for (let i = 0; i < gameGridSize * gameGridSize; i++) {
    if (i % gameGridSize === 0) {
      let row = [];

      for (let i2 = 0; i2 < gameGridSize; i2++) {
        row.push(tilesList[i + i2]);
      }

      gameTiles.push(row);
    }
  }
}

/**
 * Game Timer.
 * Calculates how long the game took to win or loose.
 * @param {string} state - "start" or "stop" the timer.
 */
function gameTimer(state) {
  if (state === "start") {
    gameStartTime = new Date().getTime();
  } else {
    gameTimeTaken = (new Date().getTime() - gameStartTime) / 1000;
  }
}

/**
 * Horizontal Tile Shifter.
 * Pushes the tiles in a horizonal direction (left or right).
 * @param {string} direction - Direction of movement.
 */
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

/**
 * Vertical Tile Shifter.
 * Pushes the tiles in a vertical direction (up or down).
 * @param {string} direction - Direction of movement.
 */
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

/**
 * Horizontal Movement Check.
 * Checks if horizontal movement is possible.
 * @param {string} direction - Direction of movement.
 * @returns - True if move possible, false if not.
 */
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

/**
 * Verical Movement Check.
 * Checks if vertical movement is possible.
 * @param {string} direction - Direction of movement.
 * @returns - True if move possible, false if not.
 */
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

/**
 * Horizontal Tile Combiner.
 * Combines any matching tiles after a movement.
 */
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

/**
 * Vertical Tile Combiner.
 * Combines any matching tiles after a movement.
 */
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

/**
 * Game Over Check.
 * Checks if there are any more possible moves, or if the maximum score has been reached.
 * @returns - Nothing.
 */
function gameOverCheck() {
  if (gameResults.style.display !== "block") {
    if (!gameShiftHorizontalCheck("left") && !gameShiftHorizontalCheck("right") && !gameShiftVerticalCheck("up") && !gameShiftVerticalCheck("down")) {
      gameGrid.style.display = "none";
      gameResults.style.display = "block";
      gameTimer("stop");
      addScoreToHistory();
      updateGameResults();
    }


    for (let tile of tilesList) {
      if (parseInt(tile.innerHTML) === gameWinScore) {
        gameGrid.style.display = "none";
        gameResults.style.display = "block";
        gameTimer("stop");
        addScoreToHistory();
        updateGameResults();
        return;
      }
    }
  }
}

/**
 * Horizontal Input Manager.
 * Starts process for movement in given horizontal direction.
 * @param {string} direction - Direction of movement.
 */
function gameInputHorizontal(direction) {
  if (!gamePage.hidden) {
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

/**
 * Vertical Input Manager.
 * Starts process for movement in given vertical direction.
 * @param {string} direction - Direction of movement.
 */
function gameInputVertical(direction) {
  if (!gamePage.hidden) {
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

/**
 * Game Resetter.
 * Resets the game to starting stage.
 */
function gameReset() {
  gameGrid.style.display = "flex";
  gameResults.style.display = "none";
  gameScore.innerHTML = "2";
  gameGrid.innerHTML = "";
  tilesList = [];
  gameTiles = [];
  startGame();
}

/**
 * Game Score Updater.
 * Updates the players current score.
 */
function updateGameScore() {
  for (let tile of tilesList) {
    if (parseInt(tile.innerHTML) > parseInt(gameScore.innerHTML)) {
      gameScore.innerHTML = parseInt(tile.innerHTML);
    }
  }
}

/**
 * Tile Color Updater.
 * Updates the tile colour based on it's value.
 */
function updateTileColor() {
  for (let i = 0; i < tilesList.length; i++) {
    let colorIndex = Math.floor(Math.log2(parseInt(tilesList[i].innerHTML) + 1));

    tilesList[i].style.backgroundColor = gameColors[colorIndex];

    if (tilesList[i].innerHTML == 0) {
      tilesList[i].style.color = gameColors[colorIndex];
    } else {
      tilesList[i].style.color = "#000";
    }
  }
}
//#endregion

//#region Game Results Management
/**
 * Time Converter.
 * Converts seconds from a number to HH:MM:SS format.
 * @param {number} seconds - Time in seconds to convert.
 * @returns - Time in HH:MM:SS format.
 */
function convertSecondsToTime(seconds) {
  let time = new Date(null);
  time.setSeconds(seconds);
  return time.toISOString().substr(11, 8);
}

/**
 * Game Results Updater.
 * Updates the results page with the current and previous game results.
 */
function updateGameResults() {
  if (parseInt(gameScore.innerHTML) === gameWinScore) {
    resultsOutcome.innerHTML = "WINNER!";
  } else {
    resultsOutcome.innerHTML = "Game Over!";
  }

  getScoreHistory();

  resultsScore.innerHTML = gameScore.innerHTML;
  resultsBestScore.innerHTML = gameScoreHistory[getHighestScore()].score;
  resultsTime.innerHTML = convertSecondsToTime(gameTimeTaken);
  resultsBestTime.innerHTML = convertSecondsToTime(gameScoreHistory[getFastestTime()].time);
}
//#endregion

//#region Score History Management
/**
 * Game Number Grabber.
 * Gets the next number to be used for saved game scores.
 * @returns - Latest game number + 1.
 */
function getGameNum() {
  let latestGame = 0;
  for (let i = 0; i < window.localStorage.length; i++) {
    let key = window.localStorage.key(i);
    if (key.startsWith("game-")) {
      let gameNum = parseInt(key.replace("game-", ""));
      if (gameNum > latestGame) {
        latestGame = gameNum;
      }
    }
  }

  return latestGame;
}

/**
 * Score Adder.
 * Adds game to score history.
 */
function addScoreToHistory() {
  let key = "game-" + (getGameNum() + 1);
  let values = [
    new Date(), //Date of score
    gameTimeTaken, //Time Taken
    gameScore.innerHTML //Game Score
  ];

  setLocalStorage(key, values);
}

/**
 * Score History Grabber.
 * Gets the score history from localStorage, and puts it in an organised object array. (gameScoreHistory)
 * Then sorts the array by the newest scores to oldest scores
 */
function getScoreHistory() {
  gameScoreHistory = [];
  for (let i = 0; i < window.localStorage.length; i++) {
    let key = window.localStorage.key(i);
    let values = window.localStorage.getItem(key).split(',');

    if (key.startsWith("game-")) {
      gameScoreHistory[key] = {
        date: values[0],
        time: values[1],
        score: values[2]
      };
    }
  }
}

/**
 * Highest Score Grabber.
 * Finds the highest score obtained, and returns the key for that recorded score.
 * @returns - Key for highest score recorded.
 */
function getHighestScore() {
  let highestScoreKey = "game-1";

  for (let key in gameScoreHistory) {
    if (gameScoreHistory[key].score > gameScoreHistory[highestScoreKey].score) {
      highestScoreKey = key;
    }
  }

  return highestScoreKey;
}

/**
 * Fastest Time Grabber.
 * Finds the fastest time obtained, and returns the key for that recorded time.
 * @returns - Key for fastest time recorded.
 */
function getFastestTime() {
  let fastestTimeKey = "game-1";

  for (let key in gameScoreHistory) {
    if (gameScoreHistory[key].time < gameScoreHistory[fastestTimeKey].time) {
      fastestTimeKey = key;
    }
  }

  return fastestTimeKey;
}

/**
 * Game History Page Updater.
 * Runs process for updating History page. Including running all functions to pull specific scores from history, and display them.
 */
function updateHistoryPage() {
  let newestScore = null;
  let bestScore = "game-1";

  getScoreHistory();

  displayNewestScore();
  displayBestScore();
  displayAllScores();
}

/**
 * Date String Builder.
 * Creates a date and time string in DD/MM/YYYY - HH:MM:SS format from the date passed to it.
 * @param {date} date - Date to create string for.
 * @returns - String of date in DD/MM/YYYY - HH:MM:SS format.
 */
function getDateString(date) {
  date = new Date(date);

  let dd = String(date.getDate()).padStart(2, '0');
  let mm = String(date.getMonth() + 1).padStart(2, '0');
  let yyyy = date.getFullYear();
  let time = date.toISOString().substr(11, 8);

  let dateString = [dd, mm, yyyy].join('/') + ' - ' + time;

  return dateString;
}

/**
 * Score Display Formatter.
 * Creates a string of HTML to display a score on the score history page properly.
 * @param {string} key - The key of the score to be formatted.
 * @returns - The formatted HTML string.
 */
function getScoreHTML(key) {
  let date = getDateString(gameScoreHistory[key].date);
  let time = convertSecondsToTime(gameScoreHistory[key].time);
  let score = gameScoreHistory[key].score;
  let html = (
    `<p>Date:</p>` +
    `<p>${date}</p>` +
    `<p>Time Taken: ${time}</p>` +
    `<p>Score: ${score}</p>`
  );

  return html;
}

/**
 * Newest Score Displayer.
 * Grabs and displays the newest score on the score histry screen, based on the score's key name.
 */
function displayNewestScore() {
  let newest = "game-1";
  scoreHistoryNewest.innerHTML = "";

  for (let key in gameScoreHistory) {
    if (parseInt(key.replace("game-", "")) >= parseInt(newest.replace("game-", ""))) {
      newest = key;
    }
  }

  let newestScore = document.createElement("div");
  newestScore.innerHTML = getScoreHTML(newest);
  scoreHistoryNewest.appendChild(newestScore);
}

/**
 * Best Score Displayer.
 * Grabs and displays the best score on the score history screen, based on the highest score and the fastest time.
 */
function displayBestScore() {
  let best = "game-1";

  scoreHistoryBest.innerHTML = "";

  for (let key in gameScoreHistory) {
    if (parseInt(gameScoreHistory[key].score) >= parseInt(gameScoreHistory[best].score)) {
      if (parseInt(gameScoreHistory[key].time) <= parseInt(gameScoreHistory[best].time)) {
        best = key;
      }
    }
  }

  let bestScore = document.createElement("div");
  bestScore.innerHTML = getScoreHTML(best);
  scoreHistoryBest.appendChild(bestScore);
}

/**
 * All Score Displayer.
 * Adds all past scores to the score history page.
 */
function displayAllScores() {
  scoreHistoryAll.innerHTML = "";

  for (let key in gameScoreHistory) {
    let nextScore = document.createElement("div");

    nextScore.innerHTML = getScoreHTML(key)
    scoreHistoryAll.appendChild(nextScore);
  }
}
//#endregion

//#region Tip Management
/**
 * Tip Switcher
 * Sets the new tip, set's the correct animation speed & restarts animation.
 */
function nextTip() {
  let tipIndex = newTipIndex();

  tipElement.innerText = tips[tipIndex];
  updateTipWidth(tipIndex);
  updateAnimationSpeed(tipIndex);
  restartAnimation();
}

/**
 * Tip Index Updater/Grabber.
 * Gets the current tip index, increases by 1 and updates the stored index.
 * @param {ibject} element - Tips element.
 * @returns - New index.
 */
function newTipIndex() {
  if (tipElement.dataset.tipindex < tips.length - 1) {
    ++tipElement.dataset.tipindex;
  } else {
    tipElement.dataset.tipindex = 0;
  }

  return tipElement.dataset.tipindex;
}

/**
 * Tip Width Updater.
 * Calculates the width of the new tip, and updates the pixel width of the tip element to match.
 * @param {Integer} tipIndex - Tip index.
 */
function updateTipWidth(tipIndex) {
  let canvas = updateTipWidth.canvas || (updateTipWidth.canvas = document.createElement("canvas"));
  let context = canvas.getContext("2d");
  let fontSize = window.getComputedStyle(tipElement, null).getPropertyValue("font-size");
  let fontFamily = window.getComputedStyle(tipElement, null).getPropertyValue("font-family")
  context.font = fontSize + " " + fontFamily;

  tipElement.style.width = context.measureText(tips[tipIndex]).width + "px";
}

/**
 * Tip Animation Setter.
 * Calculates then sets the animation speed for the new tip to be displayed.
 * @param {object} element - Tips element.
 * @param {integer} tipIndex - Tip index.
 */
function updateAnimationSpeed(tipIndex) {
  let width = tipElement.offsetWidth;
  let duration = 3 * (width / 100);

  tipElement.style.animationDuration = duration + "s";
  tipElement.style.animationIterationCount = 1;
}

/**
 * Tip Animation Restarter.
 * Restarts the animation for the new top to be displayed.
 * @param {object} element - Tips element.
 */
function restartAnimation() {
  tipElement.classList.remove("tips-animation");
  void tipElement.offsetWidth;
  tipElement.classList.add("tips-animation");
}
//#endregion

//#region Declarations
// Splash Screen - User Inputs
const usernameInput = document.getElementById("input-username");
const localStorageInput = document.getElementById("input-localstorage");

// Splash Screen - Buttons
const splashPlayButton = document.getElementById("splash-screen-play");
const splashResetButton = document.getElementById("splash-screen-reset");

// Splash Screen - Content
const splashScreen = document.getElementById("splash-screen");
const errElement = document.getElementById("splash-screen-error");

// Game Screen
const gameScreenElements = document.getElementsByClassName("game-screen");

// Game Screen - Score History
const historyPage = document.getElementById("history-page");
const scoreHistoryNewest = document.getElementById("score-history-newest");
const scoreHistoryBest = document.getElementById("score-history-best");
const scoreHistoryAll = document.getElementById("score-history-all");
let gameScoreHistory = [];

// Game Screen - Instructions
const instructionsPage = document.getElementById("instructions-page");

// Game Screen - Page Buttons
const instructionsButton = document.getElementById("instructions-button");
const historyButton = document.getElementById("history-button");
const closePageButton = document.getElementById("close-page-button");

// Game Screen - On Screen Game Controls
const controlsSection = document.getElementById("controls-section");
const gameUpButton = document.getElementById("game-control-up");
const gameLeftButton = document.getElementById("game-control-left");
const gameDownButton = document.getElementById("game-control-down");
const gameRightButton = document.getElementById("game-control-right");

// Game Screen - Score Section
const scoreSection = document.getElementById("score-section");
const gameScore = document.getElementById("game-score");

// Game Screen - Game Section
const gamePage = document.getElementById("game-page");
const gameSection = document.getElementById("game-section");
const gameGrid = document.getElementById("game-grid");
const gameGridSize = 4;
const gameWinScore = 16;
let gameStartTime;
let gameTimeTaken;
let tilesList = [];
let gameTiles = [];
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

// Game Screen - Game Results
const gameResults = document.getElementById("game-results");
const resultsOutcome = document.getElementById("results-outcome");
const resultsScore = document.getElementById("results-score");
const resultsBestScore = document.getElementById("results-best-score");
const resultsTime = document.getElementById("results-time");
const resultsBestTime = document.getElementById("results-best-time");
const gameResetButton = document.getElementById("game-reset");

// Game Screen - Tips
const tipElement = document.getElementById("tips");
let tips = [
  "You can use 'A, W, S, D', The arrow keys, and the arrow buttons above to play!",
  "With the Instructions or Score History menus open, you can press the 'ESC' key, or the 'X' button in the top left corner to return to the game!",
  "Try keeping your biggest tiles in a single corner, so that when you have a match, they aren't hidden behind other tiles!",
  "Check out the Score History page at any time to view your past scores and learn more about your progress!",
  "Check out the Instructions page at any time to view the aim of the game, instructions on how to play, and keyboard shortcuts that make playing the game easier!"
];
//#endregion

document.addEventListener("DOMContentLoaded", initializeScript);