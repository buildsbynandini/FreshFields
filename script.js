var prevpos = window.scrollY;
window.onscroll = function() {
var currentpos = window.scrollY;
  if (prevpos > currentpos) {
    document.getElementById("s").style.top = "0";
  } else {
    document.getElementById("s").style.top = "-505px";
  }
  prevpos = currentpos;
}

