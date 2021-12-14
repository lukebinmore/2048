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
  context.font = tipElement.style.fontFamily;

  tipElement.style.width = context.measureText(tips[tipIndex]).width;
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

/**
 * Tips Starter.
 * Sets the first tip, and starts the animation.
 */
function startTips() {
  nextTip();
  tipElement.addEventListener("animationend", nextTip);
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
      startTips();
      startGame();
    }
  }
}

/**
 * Page Manager Initializer.
 * Starts basic operations of script, and runs inistal starting functions.
 */
function initializeScript() {
  document.addEventListener("click", clickInput);
  document.addEventListener("keypress", keyboardInput);
  document.addEventListener("keydown", keyboardInput);
  window.addEventListener("resize", setGameSectionSize);

  updatePlayerFields();
}

// Element declarations
// Player details inputs, splash screen elements, game screen elements, play & reset buttons.
const usernameInput = document.getElementById("input-username");
const localStorageInput = document.getElementById("input-localstorage");
const gameScreenElements = document.getElementsByClassName("game-screen");
const splashScreen = document.getElementById("splash-screen");
const errElement = document.getElementById("splash-screen-error");
const splashPlayButton = document.getElementById("splash-screen-play");
const splashResetButton = document.getElementById("splash-screen-reset");

// Page menu buttons & pages
const instructionsButton = document.getElementById("instructions-button");
const historyButton = document.getElementById("history-button");
const closePageButton = document.getElementById("close-page-button");
const instructionsPage = document.getElementById("instructions-page");
const historyPage = document.getElementById("history-page");
const gamePage = document.getElementById("game-page");

// Game Screen Sections
const scoreSection = document.getElementById("score-section");
const controlsSection = document.getElementById("controls-section");
const gameSection = document.getElementById("game-section");

// On Screen Game buttons
const gameUpButton = document.getElementById("game-control-up");
const gameLeftButton = document.getElementById("game-control-left");
const gameDownButton = document.getElementById("game-control-down");
const gameRightButton = document.getElementById("game-control-right");

// Tips element & Tip content array
const tipElement = document.getElementById("tips");
let tips = [
  "You can use 'A, W, S, D', The arrow keys, and the arrow buttons above to play!",
  "With the Instructions or Score History menus open, you can press the 'ESC' key, or the 'X' button in the top left corner to return to the game!",
  "Try keeping your biggest tiles in a single corner, so that when you have a match, they aren't hidden behind other tiles!",
  "Check out the Score History page at any time to view your past scores and learn more about your progress!",
  "Check out the Instructions page at any time to view the aim of the game, instructions on how to play, and keyboard shortcuts that make playing the game easier!"
];

document.addEventListener("DOMContentLoaded", initializeScript);