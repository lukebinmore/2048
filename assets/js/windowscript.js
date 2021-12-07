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