// Cookie managment functions

function createCookie() {
  document.cookie = "expires=Tue, 19 Jan 2038 04:14:07 GMT";
}

function setCookie(name, value) {
  document.cookie = name + "=" + value + ";";
}

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



// User input management functions

function clickInput(e) {
  switch (e.target) {
    case (instructionsButton):
      openInstructions();
      break;
    case (historyButton):
      openHistory()
      break;
    case (closePageButton):
      closePage();
      break;
  }

  switch (e.target.parentElement) {
    case instructionsButton:
      openInstructions();
      break;
    case historyButton:
      openHistory()
      break;
    case (closePageButton):
      closePage();
      break;
  }
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
  let topRec = document.getElementById("score-section").getBoundingClientRect();
  let bottomRec = document.getElementById("controls-section").getBoundingClientRect();

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
  let game = document.getElementById("game-section");

  game.style.width = compareSpace() + "px";
  game.style.height = compareSpace() + "px";
}

function startWindowScript() {
  setSpace();
  window.addEventListener("resize", function () {
    setSpace();
  });
}







// Element declerations

let instructionsButton = document.getElementById("instructions-button");
let historyButton = document.getElementById("history-button");
let closePageButton = document.getElementById("close-page-button");

let instructionsPage = document.getElementById("instructions-page");
let historyPage = document.getElementById("history-page");
let gamePage = document.getElementById("game-page");

document.addEventListener("click", clickInput);