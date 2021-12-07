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