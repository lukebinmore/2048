/**
 * Cookie Creater.
 * Creates an empty cookie by setting the cookie expiry date.
 */
function createCookie() {
  document.cookie = "expires=Tue, 19 Jan 2038 04:14:07 GMT";
}

/**
 * Cookier Setter.
 * Sets the value of a cookie, or creates.
 * @param {string} name - Key of the cookie.
 * @param {string} value - Value of the cookie.
 */
function setCookie(name, value) {
  document.cookie = name + "=" + value + ";";
}

/**
 * Cookie Grabber.
 * Gets the value of a cookie from the key supplied.
 * @param {string} name - Key of the cookie.
 * @returns - Value of the cookie.
 */
function getCookie(name) {
  let cookies = document.cookie.split(";");

  for (let cookie of cookies) {
    let cookiePair = cookie.split("=");

    if (cookiePair[0].trim() === name) {
      return cookiePair[1];
    }
  }

  return "";
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
      if (!splashScreen.hidden) {
        openGameScreen();
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
  }
}

/**
 * Player Fields Updater.
 * Updates the player fields on the splash screen with the values stored in cookies if they exist.
 */
function updatePlayerFields() {
  if (getCookie("username") !== "") {
    usernameInput.value = getCookie("username");
  } else {
    createCookie();
  }

  if (getCookie("cookies") == "agreed") {
    cookiesInput.checked = true;
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

  if (!cookiesInput.checked) {
    failedValidation("cookies not accepted");
    cookiesInput.focus();
    return false;
  }

  setCookie("username", usernameInput.value);
  setCookie("cookies", "agreed");

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
    case "cookies not accepted":
      errElement.innerText = "Please confirm usage of cookies!";
      break;
  }
}

/**
 * Player Details Resetter.
 * Resets the player details inputs to default values.
 */
function resetPlayerFields() {
  usernameInput.value = "";
  cookiesInput.checked = false;
  errElement.innerText = "";

  setCookie("username", "");
  setCookie("cookies", "");
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
  let tipIndex = newTipIndex(tipElement);

  tipElement.innerText = tips[tipIndex];
  updateAnimationSpeed(tipElement, tipIndex);
  restartAnimation(tipElement);
}

/**
 * Tip Index Updater/Grabber.
 * Gets the current tip index, increases by 1 and updates the stored index.
 * @param {ibject} element - Tips element.
 * @returns - New index.
 */
function newTipIndex(element) {
  if (element.dataset.tipindex < tips.length - 1) {
    ++element.dataset.tipindex;
  } else {
    element.dataset.tipindex = 0;
  }

  return element.dataset.tipindex;
}

/**
 * Tip Animation Setter.
 * Calculates then sets the animation speed for the new tip to be displayed.
 * @param {object} element - Tips element.
 * @param {integer} tipIndex - Tip index.
 */
function updateAnimationSpeed(element, tipIndex) {
  let width = element.offsetWidth;
  let duration = 3 * (width / 100);

  element.style.animationDuration = duration + "s";
  element.style.animationIterationCount = 1;
}

/**
 * Tip Animation Restarter.
 * Restarts the animation for the new top to be displayed.
 * @param {object} element - Tips element.
 */
function restartAnimation(element) {
  element.classList.remove("tips-animation");
  void element.offsetWidth;
  element.classList.add("tips-animation");
}

/**
 * Tips Starter.
 * Sets the first tip, and starts the animation.
 */
function startTips() {
  nextTip();
  document.getElementById("tips").addEventListener("animationend", nextTip);
}

/**
 * Game Screen Opener.
 * Verifies player details, closes the splash screen, opens the game screen and starts features.
 * @param {event} e 
 */
function openGameScreen(e) {
  if (validatePlayerDetails()) {
    closeSplashScreen();
    setGameSectionSize();
    startTips();
    startGame();
  }
}

/**
 * Page Manager Initializer.
 * Starts basic operations of script, and runs inistal starting functions.
 */
function initializeScript() {
  document.addEventListener("click", clickInput);
  document.addEventListener("keypress", keyboardInput);
  window.addEventListener("resize", setGameSectionSize);

  updatePlayerFields();
}

// Element declarations
// Player details inputs, splash screen elements, game screen elements, play & reset buttons.
const usernameInput = document.getElementById("input-username");
const cookiesInput = document.getElementById("input-cookies");
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

// Tips element & Tip content array
const tipElement = document.getElementById("tips");
let tips = [
  "aoipasdfkdoskfposdkfposkdfpoksdpfokspdofkpsodkfposkdfposkdfp",
  "bpoakspdokapsokdpaoskdpoaksdpokaspodkapsokdaposkdpoaksdpoaksdpokaspdokapsodkaposkdpoaksd",
  "cpoaksdpokasdpokaspdokaspodkapsodkapsokdpaoskdpaoskdpaoskdpaoskdpoaksdpaoksdpoaksdpoaksdpaoskdpaoskdpaoskdpaoskdpaoskdpoaskdpaoskdpaoskda",
  "dpaoskdpoaksdpoaskdpaoksdpaoksdpoaksdpoaksdpaoskdpaoksdpaoskdpaoskdpaoskdpaoskdpaoskdpaoskdpaoskdpaoskdpaoskdpaoskdpaoskdpasokdaposkdpaoskdpaoskdaposkdpaoskdpaoskdpaoskdpaoskdpaoskdapsodka",
  "epoaskdpoaksdpoaksdpoaksdpokasdpoaksdpoaksdpoaksdpoaksdpoaksdpoaksdpoaksdpokasdpokaspdokapsodkaposkdpoaskdpoasidjfpiasdjfpadsijfpoasidjfpaoisjdfpoiasjdfpoiasjdfpoiajsdfpoijasdpfoijasdpfoijaspdoifjapsodifjaposidjfpaoisdjfpaoisdjfpaoisdjf"
];

document.addEventListener("DOMContentLoaded", initializeScript);