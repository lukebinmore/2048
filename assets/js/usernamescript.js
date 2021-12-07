function changePage() {
  let pageElements = document.getElementsByClassName("main-page");
  let usernameSection = document.getElementById("username-section");

  usernameSection.hidden = true;

  for (let element of pageElements) {
    element.hidden = false;
  }
}

function clickPlay() {
  changePage();
  startWindowScript();
  startTipsScript();
}