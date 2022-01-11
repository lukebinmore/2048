//#region Script Management
/**
 * Script Initializer.
 * Starts basic operations of script, and runs inistal starting functions.
 */
function initializeScript() {
  // Create event listeners
  document.addEventListener("click", clickInput);
  document.addEventListener("keypress", keyboardInput);
  document.addEventListener("keydown", keyboardInput);
  window.addEventListener("resize", setGameSectionSize);
  tipElement.addEventListener("animationend", nextTip);

  // Update player info fields with existing information
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

  // If the value passed is an array, convert it to a JSON string
  if (value.constructor === Array) {
    valueString = JSON.stringify(value);
  }

  // Add the item to localStorage
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
  // Check if clicked input matches specific element, then run corresponding function for element clicked
  switch (e.target) {
    case instructionsButton:
      openInstructions();
      break;
    case historyButton:
      openHistory();
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

  // Check if clicked input matches specific element's parent, then run corresponding function for element clicked
  switch (e.target.parentElement) {
    case instructionsButton:
      openInstructions();
      break;
    case historyButton:
      openHistory();
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
  // Check if keyboard input matches pre-determined shortcuts or game inputs, then run corresponding function for shortcut or game input
  switch (e.key) {
    case "Enter":
      // If splash screen is open, try to play game, else if game results page is open, restart game
      if (!splashScreen.hidden) {
        openGameScreen();
      } else if (gameResults.style.display === "block") {
        gameReset();
      }
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

  // Check if keyboard input matches pre-determined shortcuts or game inputs, then run corresponding function for shortcut or game input
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
  // If stored value is not nothing, then get stored value
  if (getLocalStorage("username") !== "") {
    usernameInput.value = getLocalStorage("username");
  }

  // If stored value is not nothing, then get stored value
  if (getLocalStorage("localStorage") == "agreed") {
    localStorageInput.checked = true;
  }
}

/**
 * Splash Screen Closer.
 * Closes the splash screen and takes player to game screen.
 */
function closeSplashScreen() {
  // Hide splash screen container
  splashScreen.hidden = true;

  // Show each element of game screen
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
  // Validate user has entered a username
  if (usernameInput.value === "") {
    failedValidation("username empty");
    usernameInput.focus();
    return false;
  }

  // Validate user has accepted localstorage usage
  if (!localStorageInput.checked) {
    failedValidation("localStorage not accepted");
    localStorageInput.focus();
    return false;
  }

  // Set items to local storage
  setLocalStorage("username", usernameInput.value);
  setLocalStorage("localStorage", "agreed");

  // Confirm details have been validate
  return true;
}

/**
 * Player Details Failed Validation Result.
 * Provides the user with info on why the validation fails.
 * @param {string} input - Failure reason.
 */
function failedValidation(input) {
  // Select appropriate error message for failed validation
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
  // Set inputs to nothing, and clear error message
  usernameInput.value = "";
  localStorageInput.checked = false;
  errElement.innerText = "";

  // Clear localStorage values
  setLocalStorage("username", "");
  setLocalStorage("localStorage", "");
}

/**
 * Game Screen Opener.
 * Verifies player details, closes the splash screen, opens the game screen and starts features.
 * @param {event} e 
 */
function openGameScreen(e) {
  // Check if details entered are valid
  if (validatePlayerDetails()) {
    closeSplashScreen();
    setGameSectionSize();
    nextTip();
    startGame();
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
  // Get positions of specific element sides
  let topRec = scoreSection.getBoundingClientRect();
  let bottomRec = controlsSection.getBoundingClientRect();

  // Return gap
  return bottomRec.top - topRec.bottom;
}

/**
 * Space Comparer.
 * Compares the amount of vertical space between the score section and controls section, to the width of the page.
 * @returns - The smallest space in pixels.
 */
function compareSpace() {
  // Set the vertical and horizontal space
  let vertical = getVerticalSpace();
  let horizontal = document.body.getBoundingClientRect().right;

  // Check which is smaller and return
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
  // Close all possible open pages
  closePage();

  // Show close page button, hide game and show instructions page
  closePageButton.hidden = false;
  gamePage.hidden = true;
  instructionsPage.hidden = false;
}

/**
 * History Opener.
 * Opens the score history page in the game window.
 */
function openHistory() {
  // Close all possible open pages
  closePage();

  // Update the score history content
  updateHistoryPage();

  // Show close page button, hide game and show instructions page
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
  // Create game grid
  for (let i = 0; i < gameGridSize * gameGridSize; i++) {
    let tile = document.createElement("h2");

    tile.innerHTML = 0;
    gameGrid.appendChild(tile);
    tilesList.push(tile);
  }

  // Set the tile size then build array of tiles
  setTileSize();
  getGameTiles();

  // Create starting two tiles
  createTile();
  createTile();

  // Set initial tile color
  updateTileColor();
}

/**
 * Tile Size Setter.
 * Sets the size of the tiles based on the grid size configured.
 */
function setTileSize() {
  // Get required tile size
  let tileSize = 100 / gameGridSize;

  // Set all tiles to correct size
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
  // Get random position in grid
  let randomNum = Math.floor(Math.random() * tilesList.length);

  // Check if tile is empty, and create tile if it is. Run again if not
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
  // Loop through each row of grid
  for (let i = 0; i < gameGridSize * gameGridSize; i++) {
    if (i % gameGridSize === 0) {
      let row = [];

      // Loop through each cell and push to temp array
      for (let i2 = 0; i2 < gameGridSize; i2++) {
        row.push(tilesList[i + i2]);
      }

      // Push temporary row array to multi-dimensional array
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
  // Check passed argument
  if (state === "start" && gameStartTime === undefined) {
    // Set start time
    gameStartTime = new Date().getTime();
  } else {
    // Set time taken based on current time - game start time
    gameTimeTaken = (new Date().getTime() - gameStartTime) / 1000;
  }
}

/**
 * Horizontal Tile Shifter.
 * Pushes the tiles in a horizonal direction (left or right).
 * @param {string} direction - Direction of movement.
 */
function gameShiftHorizontal(direction) {
  // Loop through game grid rows
  for (let iR = 0; iR < gameGridSize; iR++) {
    let row = [];

    // Get row of tile values
    for (let iC = 0; iC < gameGridSize; iC++) {
      row.push(parseInt(gameTiles[iR][iC].innerHTML));
    }

    // Get non-zero tiles, and get new empty tiles
    let rowFiltered = row.filter(num => num);
    let emptyTiles = gameGridSize - rowFiltered.length;
    let newZeros = Array(emptyTiles).fill(0);
    let rowUpdated;

    // Concat new empty tiles and non-zero tiles based on direction
    if (direction === "left") {
      rowUpdated = rowFiltered.concat(newZeros);
    } else {
      rowUpdated = newZeros.concat(rowFiltered);
    }

    // Apply new row values to tiles
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
  // Loop through game grid columns
  for (let iC = 0; iC < gameGridSize; iC++) {
    let column = [];

    // Get column of tile values
    for (let iR = 0; iR < gameGridSize; iR++) {
      column.push(parseInt(gameTiles[iR][iC].innerHTML));
    }

    // Get non-zero tiles, and get new empty tiles
    let columnFiltered = column.filter(num => num);
    let emptyTiles = gameGridSize - columnFiltered.length;
    let newZeros = Array(emptyTiles).fill(0);
    let columnUpdated;

    // Concat new empty tiles and non-zero tiles based on direction
    if (direction === "up") {
      columnUpdated = columnFiltered.concat(newZeros);
    } else {
      columnUpdated = newZeros.concat(columnFiltered);
    }

    // Apply new row values to tiles
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
  // Loop through rows in game grid
  for (let iR = 0; iR < gameGridSize; iR++) {
    let row = [];

    // Get row of tile values
    for (let iC = 0; iC < gameGridSize; iC++) {
      row.push(parseInt(gameTiles[iR][iC].innerHTML));
    }

    // Reverse row based on direction provided
    if (direction === "left") {
      row.reverse();
    }

    // Loop through tiles in row
    for (let iC = 0; iC < gameGridSize - 1; iC++) {
      // Check if current tile has value
      if (row[iC] !== 0) {
        // Check if tile is next to empty tile, return true if it is, false if it's not
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
  // Loop through columns in game grid
  for (let iC = 0; iC < gameGridSize; iC++) {
    let column = [];

    // Get column of tile values
    for (let iR = 0; iR < gameGridSize; iR++) {
      column.push(parseInt(gameTiles[iR][iC].innerHTML));
    }

    // Reverse column based on direction provided
    if (direction === "up") {
      column.reverse();
    }

    // Loop through tiles in column
    for (let iR = 0; iR < gameGridSize - 1; iR++) {
      // Check if current tile has value
      if (column[iR] !== 0) {
        // Check if tile is next to empty tile, return true if it is, false if it's not
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
function gameCombineHorrizontal(direction) {
  // Loop through rows in game grid
  for (let iR = 0; iR < gameGridSize; iR++) {
    let row = [];

    // Get row of tile values
    for (let iC = 0; iC < gameGridSize; iC++) {
      row.push(parseInt(gameTiles[iR][iC].innerHTML));
    }

    // Reverse row based on direction provided
    if (direction === "right") {
      row.reverse();
    }

    // Loop through tiles in row
    for (let iC = 0; iC < gameGridSize - 1; iC++) {
      // Check if tile matches neighbor tile
      if (row[iC] === row[iC + 1]) {
        // Double this tile, clear neighbor tile
        row[iC] = row[iC] * 2;
        row[iC + 1] = 0;
      }
    }

    // Reverse row based on direction provided
    if (direction === "right") {
      row.reverse();
    }

    // Set new values to tiles in row
    for (let iC = 0; iC < gameGridSize; iC++) {
      gameTiles[iR][iC].innerHTML = row[iC];
    }
  }
}

/**
 * Vertical Tile Combiner.
 * Combines any matching tiles after a movement.
 */
function gameCombineVertical(direction) {
  // Loop through columns in game grid
  for (let iC = 0; iC < gameGridSize; iC++) {
    let column = [];

    // Get column of tile values
    for (let iR = 0; iR < gameGridSize; iR++) {
      column.push(parseInt(gameTiles[iR][iC].innerHTML));
    }

    // Reverse row based on direction provided
    if (direction === "down") {
      column.reverse();
    }

    // Loop through tiles in column
    for (let iR = 0; iR < gameGridSize - 1; iR++) {
      // Check if tile matches neighbor tile
      if (column[iR] === column[iR + 1]) {
        // Double this tile, clear neighbor tile
        column[iR] *= 2;
        column[iR + 1] = 0;
      }
    }

    // Reverse row based on direction provided
    if (direction === "down") {
      column.reverse();
    }

    // Set new values to tiles in column
    for (let iR = 0; iR < gameGridSize; iR++) {
      gameTiles[iR][iC].innerHTML = column[iR];
    }
  }
}

/**
 * Game Over Check.
 * Checks if there are any more possible moves, or if the maximum score has been reached.
 * @returns - Nothing.
 */
function gameOverCheck() {
  // Check if game results are shown
  if (gameResults.style.display !== "block") {
    // Check if any moves are possible
    if (!gameShiftHorizontalCheck("left") && !gameShiftHorizontalCheck("right") && !gameShiftVerticalCheck("up") && !gameShiftVerticalCheck("down")) {
      // Show game results page
      gameGrid.style.display = "none";
      gameResults.style.display = "block";

      // Stop game timer, add score to history and update game results page
      gameTimer("stop");
      addScoreToHistory();
      updateGameResults();
    }

    // Loop through tiles in game grid
    for (let tile of tilesList) {

      // Check if winning score reached
      if (parseInt(tile.innerHTML) === gameWinScore) {
        // Show game results page
        gameGrid.style.display = "none";
        gameResults.style.display = "block";

        // Stop game timer, add score to history and update game results page
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
  // Check if game page is open
  if (!gamePage.hidden && !gameSection.hidden) {
    // Start game timer
    gameTimer("start");

    // Check if move is possible
    if (gameShiftHorizontalCheck(direction)) {
      // Shift tiles, combine tiles, shift again, create new tile
      gameShiftHorizontal(direction);
      gameCombineHorrizontal(direction);
      gameShiftHorizontal(direction);
      createTile();
    }

    // Update game score with current max tile value, update tile colors, check for game over
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
  // Check if game page is open
  if (!gamePage.hidden && !gameSection.hidden) {
    // Start game timer
    gameTimer("start");

    // Check if move is possible
    if (gameShiftVerticalCheck(direction)) {
      // Shift tiles, combine tiles, shift again, create new tile
      gameShiftVertical(direction);
      gameCombineVertical(direction);
      gameShiftVertical(direction);
      createTile();
    }

    // Update game score with current max tile value, update tile colors, check for game over
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
  // Show game page, hide game results
  gameGrid.style.display = "flex";
  gameResults.style.display = "none";

  // Reset game values and clear game grid
  gameScore.innerHTML = "2";
  gameGrid.innerHTML = "";
  gameStartTime = undefined;
  tilesList = [];
  gameTiles = [];

  // Re-start game
  startGame();
}

/**
 * Game Score Updater.
 * Updates the players current score.
 */
function updateGameScore() {
  // Loop through all tiles in grid
  for (let tile of tilesList) {
    // Check if current tile value is higher than displayed score
    if (parseInt(tile.innerHTML) > parseInt(gameScore.innerHTML)) {
      // Update score
      gameScore.innerHTML = parseInt(tile.innerHTML);
    }
  }
}

/**
 * Tile Color Updater.
 * Updates the tile colour based on it's value.
 */
function updateTileColor() {
  // Loop through all tiles in grid
  for (let i = 0; i < tilesList.length; i++) {
    // Get color based on tile value multitude of 2
    let colorIndex = Math.floor(Math.log2(parseInt(tilesList[i].innerHTML) + 1));

    // Set tile background color
    tilesList[i].style.backgroundColor = gameColors[colorIndex];

    // Set color of text based on value
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
  // Calculate time segments from seconds
  let hh = Math.floor(seconds / 3600);
  let mm = Math.floor((seconds - (hh * 3600)) / 60);
  let ss = Math.floor((seconds - (hh * 3600) - (mm * 60)));

  // Concatenate time segments with starting 0's
  if (hh < 10) { hh = "0" + hh; }
  if (mm < 10) { mm = "0" + mm; }
  if (ss < 10) { ss = "0" + ss; }

  // Combine time segments
  let time = [hh, mm, ss].join(':');

  // Return time
  return time;
}

/**
 * Game Results Updater.
 * Updates the results page with the current and previous game results.
 */
function updateGameResults() {
  // Set winner or loser based on recorded game score
  if (parseInt(gameScore.innerHTML) === gameWinScore) {
    resultsOutcome.innerHTML = "WINNER!";
  } else {
    resultsOutcome.innerHTML = "Game Over!";
  }

  // Update score history object
  getScoreHistory();

  // Set game results variables based on game values
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

  // Loop through all localStorage items
  for (let i = 0; i < window.localStorage.length; i++) {
    // Set key variable to current localStorage item key
    let key = window.localStorage.key(i);

    // Check if key starts with game-
    if (key.startsWith("game-")) {
      // Extract game number from current key
      let gameNum = parseInt(key.replace("game-", ""));

      // Check if game number is greater than currently stored highest
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
  // Set key to most recent game number + 1
  let key = "game-" + (getGameNum() + 1);

  // Set values to be saved to localStorage
  let values = [
    new Date(), //Date of score
    gameTimeTaken, //Time Taken
    gameScore.innerHTML //Game Score
  ];

  // Add score to localStorage
  setLocalStorage(key, values);
}

/**
 * Score History Grabber.
 * Gets the score history from localStorage, and puts it in an organised object array. (gameScoreHistory)
 * Then sorts the array by the newest scores to oldest scores
 */
function getScoreHistory() {
  let unorderedScores = [];
  let keyNums = [];

  gameScoreHistory = [];

  // Loop through localStorage items
  for (let i = 0; i < window.localStorage.length; i++) {
    // Get current key and value
    let key = window.localStorage.key(i);
    let values = window.localStorage.getItem(key).split(',');

    // Check if key starts with game-
    if (key.startsWith("game-")) {
      // Add game number to array
      keyNums.push(parseInt(key.replace("game-", "")));
      // Add values to array
      unorderedScores[key] = {
        date: values[0],
        time: parseInt(values[1]),
        score: parseInt(values[2])
      };
    }
  }

  // Sort game number's array
  keyNums.sort(function (a, b) { return a - b; });

  // Add game number and values to game score object
  for (let key of keyNums) {
    gameScoreHistory["game-" + key] = unorderedScores["game-" + key];
  }
}

/**
 * Highest Score Grabber.
 * Finds the highest score obtained, and returns the key for that recorded score.
 * @returns - Key for highest score recorded.
 */
function getHighestScore() {
  let highestScoreKey = "game-1";

  // Loop through game keys
  for (let key in gameScoreHistory) {
    // Check if score is higher than stored highest
    if (gameScoreHistory[key].score > gameScoreHistory[highestScoreKey].score) {
      // Update stored highest with current game key
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

  // Loop through game keys
  for (let key in gameScoreHistory) {
    // Check if time is lower than stored fastest time
    if (gameScoreHistory[key].time < gameScoreHistory[fastestTimeKey].time) {
      // Update stored time with current fastest key
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
  // Update stored game score history
  getScoreHistory();

  // Display game game scores and chart
  displayNewestScore();
  displayBestScore();
  displayGoogleChart();
  displayAllScores();
}

/**
 * Date String Builder.
 * Creates a date and time string in DD/MM/YYYY - HH:MM:SS format from the date passed to it.
 * @param {date} date - Date to create string for.
 * @returns - String of date in DD/MM/YYYY - HH:MM:SS format.
 */
function getDateString(date) {
  // Convert date variable to Date() format
  date = new Date(date);

  // Extract date and time segments from variable and pad with 0's
  let dd = String(date.getDate()).padStart(2, '0');
  let mm = String(date.getMonth() + 1).padStart(2, '0');
  let yyyy = date.getFullYear();
  let time = date.toLocaleTimeString('en-us', { hour12: false });

  // Create date and time string
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
  // Get game details and save to variables
  let date = getDateString(gameScoreHistory[key].date);
  let time = convertSecondsToTime(gameScoreHistory[key].time);
  let score = gameScoreHistory[key].score;

  // Create HTML from variables
  let html = (
    `<p>${key.replace("game-", "Game: ")}</p>` +
    `<p>Score: ${score}</p>` +
    `<p>Time Taken: ${time}</p>` +
    `<p>Date:</p>` +
    `<p>${date}</p>`
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

  // Loop through game scores
  for (let key in gameScoreHistory) {
    // Check if game key number is higher than currently stored newest key
    if (parseInt(key.replace("game-", "")) >= parseInt(newest.replace("game-", ""))) {
      // Update newest key with current key
      newest = key;
    }
  }

  // Create and display element with newest game score
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

  // Loop through game scores
  for (let key in gameScoreHistory) {
    if (gameScoreHistory.hasOwnProperty(key)) {
      // Check if score is higher than highest current score
      if (gameScoreHistory[key].score > gameScoreHistory[best].score) {
        // Update best score with current
        best = key;
      }

      // Check if greater than or equal to current best stored
      if (gameScoreHistory[key].score >= gameScoreHistory[best].score) {
        // Check if current score time is lower than currently stored best
        if (gameScoreHistory[key].time <= gameScoreHistory[best].time) {
          // Update best score with current score key
          best = key;
        }
      }
    }
  }

  // Create and display element with best game score
  let bestScore = document.createElement("div");
  bestScore.innerHTML = getScoreHTML(best);
  scoreHistoryBest.appendChild(bestScore);
}

/**
 * Google Chart Displayer.
 * Creates and draws a google area chart with the relevant data from the current players score history.
 */
function displayGoogleChart() {
  // Set chart labels
  let chartData = [["Game", "Score"]];

  // Update game score history
  getScoreHistory();

  // Loop through scores in game history
  for (let key in gameScoreHistory) {
    if (gameScoreHistory.hasOwnProperty(key)) {
      // Push score and game number to array
      chartData.push([key.replace("game-", ""), gameScoreHistory[key].score]);
    }
  }

  // Get latest 10 results from new array
  if (chartData.length > 11) {
    chartData.splice(1, chartData.length - 11);
  }

  // Add data to chart
  google.charts.load('current', { 'packages': ['corechart'] });
  google.charts.setOnLoadCallback(drawChart);

  // Create google chart
  function drawChart() {
    var data = google.visualization.arrayToDataTable(chartData);
    var options = {
      legend: 'none',
      backgroundColor: '#000',
      theme: 'maximized',
      chartArea: {
        width: '95%'
      },
      hAxis: {
        viewWindow: false,
        textStyle: {
          color: '#fff'
        }
      },
      vAxis: {
        textStyle: {
          color: '#fff'
        }
      }
    };
    var chart = new google.visualization.LineChart(document.getElementById('score-history-chart'));
    chart.draw(data, options);
  }
}

/**
 * All Score Displayer.
 * Adds all past scores to the score history page.
 */
function displayAllScores() {
  scoreHistoryAll.innerHTML = "";

  // Loop through scores in score history
  for (let key in gameScoreHistory) {
    if (gameScoreHistory.hasOwnProperty(key)) {
      // Create new element for next score
      let nextScore = document.createElement("div");

      nextScore.innerHTML = getScoreHTML(key);
      scoreHistoryAll.prepend(nextScore);
    }
  }
}
//#endregion

//#region Tip Management
/**
 * Tip Switcher
 * Sets the new tip, set's the correct animation speed & restarts animation.
 */
function nextTip() {
  // Get next tip index, and update stored
  let tipIndex = newTipIndex();

  // Set next tip text
  tipElement.innerText = tips[tipIndex];

  // Update tip width and speed
  updateTipWidth(tipIndex);
  updateAnimationSpeed(tipIndex);

  // Restart tip animation
  restartAnimation();
}

/**
 * Tip Index Updater/Grabber.
 * Gets the current tip index, increases by 1 and updates the stored index.
 * @param {ibject} element - Tips element.
 * @returns - New index.
 */
function newTipIndex() {
  // Increase tip index by if not at max
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
  // Create canvas with next tip text
  let canvas = updateTipWidth.canvas || (updateTipWidth.canvas = document.createElement("canvas"));
  let context = canvas.getContext("2d");
  let fontSize = window.getComputedStyle(tipElement, null).getPropertyValue("font-size");
  let fontFamily = window.getComputedStyle(tipElement, null).getPropertyValue("font-family");
  context.font = fontSize + " " + fontFamily;

  // Get width of text on canvas and set to tip element
  tipElement.style.width = context.measureText(tips[tipIndex]).width + "px";
}

/**
 * Tip Animation Setter.
 * Calculates then sets the animation speed for the new tip to be displayed.
 * @param {object} element - Tips element.
 * @param {integer} tipIndex - Tip index.
 */
function updateAnimationSpeed(tipIndex) {
  // Get aniamtion speed based on width of text
  let width = tipElement.offsetWidth;
  let duration = 3 * (width / 100);

  // Set new animation speed
  tipElement.style.animationDuration = duration + "s";
  tipElement.style.animationIterationCount = 1;
}

/**
 * Tip Animation Restarter.
 * Restarts the animation for the new top to be displayed.
 * @param {object} element - Tips element.
 */
function restartAnimation() {
  // Remove and re-add animation from element
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
const gameWinScore = 2048;
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
];

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