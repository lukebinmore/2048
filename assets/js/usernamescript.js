function setHeight(e) {
  let topRec = document.getElementsByTagName("header")[0].getBoundingClientRect();
  let bottomRec = document.getElementsByTagName("footer")[0].getBoundingClientRect();

  e.style.minHeight = (bottomRec.top - topRec.bottom) + "px";
}


setHeight(document.getElementById("username-section"));