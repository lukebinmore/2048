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
function getCookie(name){
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
      if (!introSection.hidden) {
        openGameScreen();
      }
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
  introSection.hidden = true;

  for (let element of pageElements) {
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

// Menu button functions
function openInstructions() {
  closePage();
  closePageButton.hidden = false;
  gamePage.hidden = true;
  instructionsPage.hidden = false;
}

function openHistory() {
  closePage();
  closePageButton.hidden = false;
  gamePage.hidden = true;
  historyPage.hidden = false;
}

function closePage() {
  instructionsPage.hidden = true;
  historyPage.hidden = true;
  closePageButton.hidden = true;
  gamePage.hidden = false;
}

// Game section resize functions
function getVerticalSpace() {
  let topRec = scoreSection.getBoundingClientRect();
  let bottomRec = ControlsSection.getBoundingClientRect();

  return bottomRec.top - topRec.bottom;
}

function compareSpace() {
  let vertical = getVerticalSpace();
  let horizontal = document.body.getBoundingClientRect().right;

  if (vertical <= horizontal) {
    return vertical;
  } else {
    return horizontal;
  }
}

function setSpace() {
  gameSection.style.width = compareSpace() + "px";
  gameSection.style.height = compareSpace() + "px";
}

function startWindowScript() {
  setSpace();
  window.addEventListener("resize", function () {
    setSpace();
  });
}

// Tips bar functions
function nextTip() {
  let tipIndex = newTipIndex(tipElement);

  tipElement.innerText = tips[tipIndex];
  updateAnimationSpeed(tipElement, tipIndex);
  restartAnimation(tipElement);
}

function newTipIndex(e) {
  if (e.dataset.tipindex < tips.length - 1) {
    ++e.dataset.tipindex;
  } else {
    e.dataset.tipindex = 0;
  }

  return e.dataset.tipindex;
}

function updateAnimationSpeed(e, tipIndex) {
  let width = e.offsetWidth;
  let duration = 3 * (width / 100);

  e.style.animationDuration = duration + "s";
  e.style.animationIterationCount = 1;
}

function restartAnimation(e) {
  e.classList.remove("tips-animation");
  void e.offsetWidth;
  e.classList.add("tips-animation");
}

function startTipsScript() {
  nextTip();
  document.getElementById("tips").addEventListener("animationend", function(){
    nextTip();
  });
}

/**
 * Game Screen Opener.
 * Verifies player details, closes the splash screen, opens the game screen and starts features.
 * @param {event} e 
 */
function openGameScreen(e) {
  if (validatePlayerDetails()) {
    closeSplashScreen();
  }
}

// Element declarations
// Player details inputs, splash screen section, game screen elements, play button, reset button & validation error element
const usernameInput = document.getElementById("input-username");
const cookiesInput = document.getElementById("input-cookies");
const pageElements = document.getElementsByClassName("main-page");
const introSection = document.getElementById("intro-section");
const errElement = document.getElementById("intro-error");
const splashPlayButton = document.getElementById("intro-play");
const splashResetButton = document.getElementById("intro-reset");

// Page menu buttons & pages
const instructionsButton = document.getElementById("instructions-button");
const historyButton = document.getElementById("history-button");
const closePageButton = document.getElementById("close-page-button");
const instructionsPage = document.getElementById("instructions-page");
const historyPage = document.getElementById("history-page");
const gamePage = document.getElementById("game-page");

// Game Screen Sections
const scoreSection = document.getElementById("score-section");
const ControlsSection = document.getElementById("controls-section");
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



document.addEventListener("click", clickInput);
document.addEventListener("keypress", keyboardInput);

updatePlayerFields();