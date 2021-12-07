function nextTip() {
  let tipElement = document.getElementById("tips");
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

let tips = [
  "aoipasdfkdoskfposdkfposkdfpoksdpfokspdofkpsodkfposkdfposkdfp",
  "bpoakspdokapsokdpaoskdpoaksdpokaspodkapsokdaposkdpoaksdpoaksdpokaspdokapsodkaposkdpoaksd",
  "cpoaksdpokasdpokaspdokaspodkapsodkapsokdpaoskdpaoskdpaoskdpaoskdpoaksdpaoksdpoaksdpoaksdpaoskdpaoskdpaoskdpaoskdpaoskdpoaskdpaoskdpaoskda",
  "dpaoskdpoaksdpoaskdpaoksdpaoksdpoaksdpoaksdpaoskdpaoksdpaoskdpaoskdpaoskdpaoskdpaoskdpaoskdpaoskdpaoskdpaoskdpaoskdpaoskdpasokdaposkdpaoskdpaoskdaposkdpaoskdpaoskdpaoskdpaoskdpaoskdapsodka",
  "epoaskdpoaksdpoaksdpoaksdpokasdpoaksdpoaksdpoaksdpoaksdpoaksdpoaksdpoaksdpokasdpokaspdokapsodkaposkdpoaskdpoasidjfpiasdjfpadsijfpoasidjfpaoisjdfpoiasjdfpoiasjdfpoiajsdfpoijasdpfoijasdpfoijaspdoifjapsodifjaposidjfpaoisdjfpaoisdjfpaoisdjf"
];