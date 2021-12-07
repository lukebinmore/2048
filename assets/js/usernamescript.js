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
    failedValidation("username empty");
    return false;
  }

  if (!cookiesInput.checked) {
    failedValidation("cookies not accepted");
    return false;
  }

  setCookie("username", usernameInput.value);
  setCookie("cookies", "agreed");

  return true;
}

function failedValidation(input) {
  let errElement = document.getElementById("intro-error");
  switch (input) {
    case "username empty":
      errElement.innerText = "Please enter a username!";
      break;
    case "cookies not accepted":
      errElement.innerText = "Please confirm usage of cookies!";
      break;
  }
}

function resetFields() {
  document.getElementById("input-username").value = "";
  document.getElementById("input-cookies").checked = false;
  document.getElementById("intro-error").innerText = "";

  setCookie("username", "");
  setCookie("cookies", "");
}

function clickPlay(e) {
  if (validateInput() && e.key === "Enter") {
    document.removeEventListener("keypress", clickPlay);
    changePage();
    startWindowScript();
    startTipsScript();
  }
}

function startUsernameScript() {
  updateUsernameField();

  document.getElementById("intro-play").addEventListener("click", clickPlay);
  
  document.getElementById("intro-reset").addEventListener("click", resetFields);

  document.addEventListener("keypress", clickPlay);
}

startUsernameScript();