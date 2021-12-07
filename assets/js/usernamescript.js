function updateUsernameField() {
  let usernameInput = document.getElementById("input-username");
  let cookiesInput = document.getElementById("input-cookies");

  if (getCookie("username") !== "") {
    usernameInput.value = getCookie("username");
  } else {
    createCookie();
  }

  if (getCookie("cookies") == "agreed") {
    cookiesInput.checked = true;
  }
}

function changePage() {
  let pageElements = document.getElementsByClassName("main-page");
  let introSection = document.getElementById("intro-section");

  introSection.hidden = true;

  for (let element of pageElements) {
    element.hidden = false;
  }
}

function validateInput() {
  let usernameInput = document.getElementById("input-username");
  let cookiesInput = document.getElementById("input-cookies");

  if (usernameInput.value === "") {
    return false;
  }

  if (!cookiesInput.checked) {
    return false;
  }

  setCookie("username", usernameInput.value);
  setCookie("cookies", "agreed");

  return true;
}

function resetFields() {
  document.getElementById("input-username").value = "";
  document.getElementById("input-cookies").checked = false;

  setCookie("username", "");
  setCookie("cookies", "");
}

function clickPlay() {
  if (validateInput()) {
    changePage();
    startWindowScript();
    startTipsScript();
  }
}

updateUsernameField();

document.getElementById("intro-play").addEventListener("click", function () {
  clickPlay();
})

document.getElementById("intro-reset").addEventListener("click", function() {
  resetFields();
})