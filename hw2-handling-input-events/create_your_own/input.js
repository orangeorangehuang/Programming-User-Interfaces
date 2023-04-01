/*
* all the code for homework 2 goes into this file.
You will attach event handlers to the document, workspace, and targets defined in the html file
to handle mouse, touch and possible other events.

You will certainly need a large number of global variables to keep track of the current modes and states
of the interaction.
*/

const targets = document.querySelectorAll('.target');
const workspace = document.querySelector('#workspace');

let target_focus = null;
let offsetX = 0;
let offsetY = 0;
let originalX = 0;
let originalY = 0;
let isDown = false;
let isClicked = false; // won't reset targets when click workspace
let clickWorks = true; // won't change color after moving

const clearAllSelectBoxes = () => {
  targets.forEach((target) => {
    target.style.backgroundColor = 'red';
  });
};

const move = (e) => {
  e.preventDefault();
  if (isDown) {
    target_focus.style.left = `${e.pageX - offsetX}px`;
    target_focus.style.top = `${e.pageY - offsetY}px`;
    clickWorks = false;
  }
};

const resetMove = (e) => {
  e.preventDefault();
  if (isDown) {
    target_focus.style.left = `${originalX}px`;
    target_focus.style.top = `${originalY}px`;
    isDown = false;
  }
};

const clickWorkspace = (e) => {
  e.preventDefault();
  if (!isClicked) {
    clearAllSelectBoxes();
  }
  clickWorks = true;
  isClicked = false;
};

const clickTarget = (e) => {
  e.preventDefault();
  if (clickWorks) {
    clearAllSelectBoxes();
    target_focus.style.backgroundColor = '#00f';
  }
  clickWorks = true;
  isClicked = true;
};

const doubleClickTarget = (e) => {
  e.preventDefault();
  isDown = true;
  offsetX = e.offsetX;
  offsetY = e.offsetY;
  document.addEventListener('mousemove', move);
};

targets.forEach((target) => {
  target.addEventListener(
    'click',
    (e) => {
      e.preventDefault();
      target_focus = target;
      clickTarget(e);
    },
    false
  );

  target.addEventListener(
    'dblclick',
    (e) => {
      e.preventDefault();
      target_focus = target;
      doubleClickTarget(e);
    },
    false
  );

  target.addEventListener(
    'mousedown',
    (e) => {
      e.preventDefault();
      isDown = true;
      target_focus = target;
      offsetX = e.offsetX;
      offsetY = e.offsetY;
      originalX = e.pageX - offsetX;
      originalY = e.pageY - offsetY;
      document.addEventListener('mousemove', move);
    },
    false
  );

  target.addEventListener(
    'mouseup',
    (e) => {
      e.preventDefault();
      isDown = false;
      // clickWorks = true;
      document.removeEventListener('mousemove', move);
    },
    false
  );
});

workspace.addEventListener('click', clickWorkspace, false);

document.addEventListener(
  'keydown',
  (e) => {
    e.preventDefault();
    if (e.key === 'Escape' || e.key === 'Esc') {
      resetMove(e);
      return false;
    }
  },
  false
);

// 
// 
// 
// 
// 
// 
// 
// 
// 
// Touch Events

let touchX = 0;
let touchY = 0;
let touchTempX = 0;
let touchTempY = 0;
let touchOriginalX = 0;
let touchOriginalY = 0;

let dragTouchX = 0;
let dragTouchY = 0;
let dragOriginalX = 0;
let dragOriginalY = 0;

let resizeX = 0;
let resizeY = 0;
let originalWidth = 0;
let originalHeight = 0;
let resizeWidth = 0;
let resizeHeight = 0;

let touchTempTarget = null;
let touchFocusTarget = null;
let touchOperateTarget = null;
let touchState = 'pending';
// touchState:
//    pending
//    touchingTarget: Touched but no further changes
//    focused
//    resizing
//    doubleTouchingTarget: Double touched but not yet start moving
//    movingTarget
//    draggingTarget
//    abortDragging


// Target Part

const touchMove = (e) => {
  e.preventDefault();
  if (touchState === 'movingTarget') {
    touchFocusTarget.style.left = `${e.touches[0].clientX - touchX}px`;
    touchFocusTarget.style.top = `${e.touches[0].clientY - touchY}px`;
    resizeX = e.touches[0].clientX - touchX;
    resizeY = e.touches[0].clientY - touchY;
  }
};

const touchDrag = (e) => {
  e.preventDefault();
  if (touchState === 'draggingTarget') {
    touchOperateTarget.style.left = `${e.touches[0].clientX - dragTouchX}px`;
    touchOperateTarget.style.top = `${e.touches[0].clientY - dragTouchY}px`;
    if (touchOperateTarget === touchFocusTarget) {
      resizeX = e.touches[0].clientX - dragTouchX;
      resizeY = e.touches[0].clientY - dragTouchY;
    }
  }
};

let lastClick = 0;
targets.forEach((target) => {
  target.addEventListener(
    'touchstart',
    (e) => {
      e.preventDefault();
      touchTempTarget = target;
      touchTempX = e.touches[0].clientX - target.offsetLeft;
      touchTempY = e.touches[0].clientY - target.offsetTop;
      dragTouchX = e.touches[0].clientX - target.offsetLeft;
      dragTouchY = e.touches[0].clientY - target.offsetTop;
      dragOriginalX = target.offsetLeft;
      dragOriginalY = target.offsetTop;
    },
    false
  );

  target.addEventListener(
    'touchmove',
    (e) => {
      e.preventDefault();
      if (touchState !== "abortDragging") {
        touchOperateTarget = target;
        touchState = 'draggingTarget';
        touchDrag(e);
      }
    },
    false
  );

  target.addEventListener(
    'touchend',
    (e) => {
      e.preventDefault();

      // touch
      if (touchState == 'abortDragging') {
        if (touchFocusTarget !== null) {
          touchState = 'focused';
        }
        else {
          touchState = 'pending';
        }
      }
      else if (touchState == 'pending' || touchState == 'focused') {
        clearAllSelectBoxes();
        touchFocusTarget = touchTempTarget;
        touchFocusTarget.style.backgroundColor = '#00f';
        touchState = 'touchingTarget';
        touchX = touchTempX;
        touchY = touchTempY;
        touchOriginalX = target.offsetLeft;
        touchOriginalY = target.offsetTop;
        resizeX = target.offsetLeft;
        resizeY = target.offsetTop;
        resizeWidth = target.offsetWidth;
        resizeHeight = target.offsetHeight;
        originalWidth = target.offsetWidth;
        originalHeight = target.offsetHeight;
      }

      //double touch
      let date = new Date();
      let time = date.getTime();
      const time_between_taps = 200; // 200ms
      if (time - lastClick < time_between_taps) {
        touchState = 'doubleTouchingTarget';
      }
      lastClick = time;
    },
    false
  );
});


// Workspace Part

let touchStartTimeWS = 0;
let touchResizingTimeWS = 0;
let touchResizeX1 = 0;
let touchResizeY1 = 0;
let touchResizeX2 = 0;
let touchResizeY2 = 0;

const touchResizing = (e) => {
  if (touchState != "resizing") return;
  let dx_init = (touchResizeX1 - touchResizeX2 > 0)? touchResizeX1 - touchResizeX2: touchResizeX2 - touchResizeX1;
  let dy_init = (touchResizeY1 - touchResizeY2 > 0)? touchResizeY1 - touchResizeY2: touchResizeY2 - touchResizeY1;
  let direction = (dx_init > dy_init)? "x" : "y";
  let x1 = e.touches[0].clientX;
  let y1 = e.touches[0].clientY;
  let x2 = e.touches[1].clientX;
  let y2 = e.touches[1].clientY;
  let dx = (x1 - x2 > 0)? (x1 - x2 - dx_init)/10: (x2 - x1 - dx_init)/10;
  let dy = (y1 - y2 > 0)? (y1 - y2 - dy_init)/10: (y2 - y1 - dy_init)/10;

  if (direction == "x") {
    let x_prime = resizeX - dx/2;
    let width_prime = resizeWidth + dx;
    if (x_prime >= 0 && x_prime + width_prime <= window.innerWidth && width_prime > 20){
      touchFocusTarget.style.left = `${x_prime}px`;
      touchFocusTarget.style.width = `${width_prime}px`;
      resizeX = x_prime;
      resizeWidth = width_prime;
    } 
  } else {
    let y_prime = resizeY - dy/2;
    let height_prime = resizeHeight + dy;
    if (y_prime >= 0 && y_prime + height_prime <= window.innerHeight && height_prime > 20){
      touchFocusTarget.style.top = `${y_prime}px`;
      touchFocusTarget.style.height = `${height_prime}px`;
      resizeY = y_prime;
      resizeHeight = height_prime;
    } 
  }
};

workspace.addEventListener(
  'touchstart',
  (e) => {
    e.preventDefault();
    let date = new Date();
    let time = date.getTime(); 
    touchStartTimeWS = time;

    if (touchState === 'focused' || touchState === 'resizing') {
      touchResizingTimeWS = time;
      if (e.touches.length == 1) {
        // Before Resize
        touchResizeX1 = e.touches[0].clientX;
        touchResizeY1 = e.touches[0].clientY;
      } else if (e.touches.length == 1 && time - touchStartTimeWS < 200) {
        // Resize
        touchResizeX2 = e.touches[0].clientX;
        touchResizeY2 = e.touches[0].clientY;
        workspace.addEventListener("touchmove", touchResizing, false);
        touchState = "resizing"
      } else if (e.touches.length == 2) {
        // Resize
        touchResizeX1 = e.touches[0].clientX;
        touchResizeY1 = e.touches[0].clientY;
        touchResizeX2 = e.touches[1].clientX;
        touchResizeY2 = e.touches[1].clientY;
        workspace.addEventListener("touchmove", touchResizing, false);
        touchState = "resizing"
      } else if (e.touches.length == 3) {
        // Abort
        touchFocusTarget.style.left = `${touchOriginalX}px`;
        touchFocusTarget.style.top = `${touchOriginalY}px`;
        touchFocusTarget.style.width = `${originalWidth}px`;
        touchFocusTarget.style.height = `${originalHeight}px`;
        touchFocusTarget = null;
        clearAllSelectBoxes();
        touchState = "focused";
       
      } else {
        clearAllSelectBoxes();
        touchState = 'pending';
      }
    }
  },
  false
);

workspace.addEventListener(
  'touchend',
  (e) => {
    e.preventDefault();
    let date = new Date();
    let time = date.getTime();

    if (touchState === 'doubleTouchingTarget') {
      document.addEventListener('touchmove', touchMove);
      touchState = 'movingTarget';
    } 
    else if (touchState === 'movingTarget') {
      if (e.touches.length >= 1) {
        // Abort
        touchFocusTarget.style.left = `${touchOriginalX}px`;
        touchFocusTarget.style.top = `${touchOriginalY}px`;
        touchState = 'focused';
      } 
      else if (time - touchStartTimeWS < 200) {
        touchState = 'pending';
        touchOriginalX = touchFocusTarget.offsetLeft;
        touchOriginalY = touchFocusTarget.offsetTop;
        touchFocusTarget = null;
        clearAllSelectBoxes();
        document.removeEventListener('touchmove', touchMove);
      }
    } 
    else if (touchState === 'draggingTarget') {
      if (e.touches.length >= 1) {
        // Abort
        if (touchFocusTarget !== null) {
          if (touchOperateTarget === touchFocusTarget){
            resizeX = dragOriginalX;
            resizeY = dragOriginalY;
            touchOriginalX = touchOperateTarget.offsetLeft;
            touchOriginalY = touchOperateTarget.offsetTop;
          }
        }
        touchState = 'abortDragging';
        touchOperateTarget.style.left = `${dragOriginalX}px`;
        touchOperateTarget.style.top = `${dragOriginalY}px`;
        touchOperateTarget = null;
      }
      else if (touchFocusTarget !== null) {
        touchState = 'focused';
      }
      else {
        touchState = 'pending';
      }
    } 
    else if (touchState === 'touchingTarget') {
      touchState = 'focused';
    } 
    else if (touchState === 'focused') {
      clearAllSelectBoxes();
      touchState = 'pending';
    } 
    else if (touchState === 'resizing') {
      if (e.touches.length == 0) {
        touchState = "focused";
      }
    }
  },
  false
);