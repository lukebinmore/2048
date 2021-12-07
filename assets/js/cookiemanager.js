function getCookie(name){
  let cookies = document.cookie.split(";");

  for (let cookie of cookies) {
    let cookiePair = cookie.split("=");

    if (cookiePair[0] === name) {
      return cookiePair[0];
    }
  }

  return "";
}