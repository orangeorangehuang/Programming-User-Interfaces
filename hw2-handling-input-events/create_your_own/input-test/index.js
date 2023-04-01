const clearButton = document.querySelector("#clear-button");
const target = document.querySelector("#target");
const workarea = document.querySelector("#workarea");
const targetEventsDisplay = document.querySelector("#target-events-display");
const workareaEventsDisplay = document.querySelector(
  "#workarea-events-display"
);
const capturetarget = document.querySelector("#capturetarget");
const captureworkarea = document.querySelector("#captureworkarea");


let showMouseMove = false;
let showTouchMove = false;

let mousemoveToggleButton = document.querySelector("#mousemove-toggle-button");
let touchmoveToggleButton = document.querySelector("#touchmove-toggle-button");

var counter = 1;

mousemoveToggleButton.addEventListener("click", (event) => {
  if (showMouseMove) {
    showMouseMove = false;
    mousemoveToggleButton.innerText = "Hiding mousemove events";
  } else {
    showMouseMove = true;
    mousemoveToggleButton.innerText = "Showing mousemove events";
  }
});

touchmoveToggleButton.addEventListener("click", (event) => {
  if (showTouchMove) {
    showTouchMove = false;
    touchmoveToggleButton.innerText = "Hiding touchmove events";
  } else {
    showTouchMove = true;
    touchmoveToggleButton.innerText = "Showing touchmove events";
  }
});

// clear button logic:
clearButton.addEventListener(
  "click",
  (event) => {
    targetEventsDisplay.innerHTML = "";
    workareaEventsDisplay.innerHTML = "";
    counter = 1;
  },
  false
);

target.addEventListener("click", (e) => {
  let notpropogate ="";
  if (e.detail>= 3) notpropogate = " - not propogating";
  printOutEvent("click ("+e.detail+")"+notpropogate);
  if (e.detail>= 3) e.stopPropagation();
}, false);
target.addEventListener("dblclick", () => printOutEvent("dbclick"), false);
target.addEventListener("mousedown", () => printOutEvent("mousedown"), false);
target.addEventListener("mousemove", () => printOutEvent("mousemove"), false);
target.addEventListener("mouseup", () => printOutEvent("mouseup"), false);
target.addEventListener("mouseover", () => printOutEvent("mouseover"), false);
target.addEventListener("mouseout", () => printOutEvent("mouseout"), false);

target.addEventListener(
  "touchstart",
  (e) => printOutEvent("touchstart (" + e.touches.length + ")", "target"),
  false
);
target.addEventListener(
  "touchmove",
  (e) => printOutEvent("touchmove (" + e.touches.length + ")", "target"),
  false
);
target.addEventListener(
  "touchend",
  (e) => printOutEvent("touchend (" + e.touches.length + ")", "target"),
  false
);


workarea.addEventListener(
  "click",
  (e) => printOutEvent("click ("+e.detail+")", "workarea"),
  false
);
workarea.addEventListener(
  "dblclick",
  () => printOutEvent("dbclick", "workarea"),
  false
);
workarea.addEventListener(
  "mousedown",
  () => printOutEvent("mousedown", "workarea"),
  false
);
workarea.addEventListener(
  "mousemove",
  () => printOutEvent("mousemove", "workarea"),
  false
);
workarea.addEventListener(
  "mouseup",
  () => printOutEvent("mouseup", "workarea"),
  false
);

workarea.setAttribute("tabindex", -1); // enable getting the keyboard focus: https://stackoverflow.com/questions/18928116/javascript-keydown-event-listener-is-not-working
workarea.focus(); // give it the focus to start: https://stackoverflow.com/questions/6754275/set-keyboard-focus-to-a-div/6809236
workarea.addEventListener(
  "keydown",
  (e) => printOutEvent("keydown=" + e.code, "workarea"),
  false
);



workarea.addEventListener(
  "touchstart",
  (e) => printOutEvent("touchstart (" + e.touches.length + ")", "workarea"),
  false
);
workarea.addEventListener(
  "touchmove",
  (e) => printOutEvent("touchmove (" + e.touches.length + ")", "workarea"),
  false
);
workarea.addEventListener(
  "touchend",
  (e) => printOutEvent("touchend (" + e.touches.length + ")", "workarea"),
  false
);

captureworkarea.addEventListener(
  "click",
  (e) => {
     printOutEvent("click CAPTURING ("+e.detail+")", "workarea");
  },
  true //so this one gets events on way down, so workarea will be BEFORE target
);
capturetarget.addEventListener("click", () => printOutEvent("click (capture rect)"), false);


const printOutEvent = (eventName, eventTarget = "target") => {
  if (!showMouseMove && eventName.includes("mousemove")) return;
  if (!showTouchMove && eventName.includes("touchmove")) return;

  let item = document.createElement("DIV");
  item.classList.add("item");
  item.innerText =
    "" + (counter++) + ") " + new Date().getTime().toString().substring(7) + " - " + eventName;
  if (eventTarget === "target") {
    targetEventsDisplay.prepend(item);
  } else if (eventTarget === "workarea") {
    workareaEventsDisplay.prepend(item);
  }
};
