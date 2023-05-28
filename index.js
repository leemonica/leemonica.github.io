// set x1,y1 at center of canvas

var x1 = Math.floor(window.innerWidth / 2);
var y1 = Math.floor(window.innerHeight / 2);

// set cursor position as x2,y2 coordinates

document.addEventListener("DOMContentLoaded", init);

function init() {
  if (window.Event) {
    document.captureEvents(Event.MOUSEMOVE);
  }
  document.onmousemove = getCursorXY;
}

function getCursorXY(e) {
  const x2 = window.Event
    ? e.pageX
    : event.clientX +
      (document.documentElement.scrollLeft
        ? document.documentElement.scrollLeft
        : document.body.scrollLeft);

  document.getElementById("x2").value = x2;

  const y2 = window.Event
    ? e.pageY
    : event.clientY +
      (document.documentElement.scrollTop
        ? document.documentElement.scrollTop
        : document.body.scrollTop);

  document.getElementById("y2").value = y2;

  const rAngle = getAngle(x1, y1, x2, y2);
  const degreesRaw = convertToDegrees(rAngle);
  const degreesUnadj = Math.round(degreesRaw); // rounding angle to nearest whole integer

  if (x2 < x1 && y2 > y1) {
      var degrees = 90 + (90 - degreesUnadj); // quadrant 1
  } else if (x2 < x1 && y2 < y1) {
      var degrees = degreesUnadj + 180; // quadrant 2
  } else if (x2 > x1 && y2 < y1) {
      var degrees = 270 + (90 - degreesUnadj); // quadrant 3
  } else {
      var degrees = degreesUnadj; // quadrant 4
  }

  var degrees2 = degrees * 2
  var degrees3 = degrees + 75
  // const degreesValue =
  //  "linear-gradient(" + degrees + "deg, rgba(255, 140, 94, 0.8), rgba(255, 140, 94,0) 70%),linear-gradient(127deg, rgba(138, 248, 64, 0.8), rgba(138, 248, 64,0) 70%),linear-gradient(336deg, rgba(140, 132, 255, 0.8), rgba(140, 132, 255,0) 70%)"; // replace "45deg" in CSS gradient with new "#deg"

  const degreesValue =
  "linear-gradient(" + degrees + "deg, rgba(79, 187, 255, 0.8), rgba(79, 187, 255, 0) 70%),linear-gradient(" + degrees3 + "deg, rgba(20, 233, 255, 0.8), rgba(20, 233, 255, 0) 70%),linear-gradient(" + degrees2 + "deg, rgba(255,255,255, 0.8), rgba(255,255,255, 0) 70%)"; // replace "45deg" in CSS gradient with new "#deg"

  // console.log(degreesValue); //checking to see that angle is being calculated

  $(`body`).css(`background-image`, degreesValue);
}

// calculate angle between center point and cursor position in radians

function getAngle(x1, y1, x2, y2) {
  var distY = Math.abs(y2 - y1); //opposite
  var distX = Math.abs(x2 - x1); //adjacent
  var dist = Math.sqrt(distY * distY + distX * distX); //hypotenuse,
  var val = distY / dist;
  var aSine = Math.asin(val);
  return aSine;
}

//convert radians to degrees

function convertToDegrees(radians) {
  return radians * (180 / Math.PI);
}

// what happens when the window is resized
