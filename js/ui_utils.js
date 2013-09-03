function getById(id) {
  return document.getElementById(id);
}

function setDisplay(elm, isDisplay) {
  elm.style.display = isDisplay ? 'block' : 'none';
}

function showElms(elms) {
  elms.forEach(function(e) {setDisplay(e, true);});
}

function hideElms(elms) {
  elms.forEach(function(e) {setDisplay(e, false);});
}

function addEvent(elm, event, handler) {
  elm.addEventListener(event, handler);
}

function removeChildren(elm) {
  while (elm.firstChild) {
    elm.removeChild(elm.firstChild);
  }
}

function createElementWithClass(tag, className) {
  var e = document.createElement(tag);
  e.className = className;
  return e;
}
