# hw2-handling-input-events
- 學號：R11922101 
- 系級：資工碩一 
- 姓名：黃嘉宏 

## 1. Requirements
### 1.1 General Requirements
- [x] My code for HW2 is put under the subfolder `create_your_own`, and is linked from the `CREATE YOUR OWN` link on the website from HW1. 
- [x] My code works no matter how many `div`s there are.

### 1.2 Basic Requirements
#### 1.2.1 Mouse Event
- [x] mouse-click on a `div`
- [x] mouse-click on workarea, not on any objects
- [x] mouse down on a `div` and move (dragging mode)
    - [x] `div` start moving, following the mouse, until mouse-up.
    - [x] This way of moving should not change the selected `div`.
- [x] mouse double-click (following mode)
    - [x] Starts a mode in which this `div` follows the mouse.
    - [x] The `div` should stop following the mouse on the next mouse up event.
    - [x] While in this mode, all other mouse behaviors on the `div`s should be suspended.
- [x] `ESC` keydown
    - [x] The moving or growing should be aborted.
    - [x] The `div` should go back to the way it was before the operation starts.

#### 1.2.2 Touch Event
- [x] one-finger tap and double-tap
    - [x] Do the same thing as mouse-click, dragging and mouse-double-click.
    - [x] Double tap (following-the-finger mode): When you do touchstart, the `div` follows the finger even if the touch is not on the object, until touchend.
    - [x] Touchend does not stop the mode, so the next touchstart continues to move the same `div`. This mode only ends with a click action.
    - [x] If the user puts down another finger in the following-the-finger mode, then this should be aborted (same as `ESC` keydown).
- [x] two-finger touch
    - [x] Resizing in horizontal direction.
    - [x] If one finger is released but the other stays on the screen, this should stop the size change as it last was (just stop growing but not abort).
    - [x] If the finger goes back into contact before the other finger lets up, the div can go back to changing size.
    - [x] If a third finger is put down on the surface, this should abort the change size and go back to the original size before the change size started.
    - [x] Minimum width and height for the `div` (`20pt` fo each).
    
### 1.3 Bonus Requirements
- [x] Resizing in either horizontal or vertical directions.
    - Depending on the orientation of the fingers when they both touch the surface.

## 2. Deployment
- [Netlify Link](https://gregarious-faloodeh-023244.netlify.app/)

## 3. Control Strategy
### 3.1 Mouse Event
Three global variables is used to switch between states:
- `isDown`
    - Controls the move and reset operations in dragging mode and following mode.
    - Set to `false` by default.
    - Set to `true` on mousedown.
    - Set to `false` on mouseup.
- `isClicked`
    - Controls whether all selected `div`s should be cleared.
    - Set to `false` by default.
    - Set to `true` on click event of a `div`.
    - Set to `false` on click event of the workspace.
- `clickWorks`
    - Controls whether to change selected `div` when another `div` is clicked.
    - Set to `true` by default.
    - Set to `false` when in dragging mode and following mode.
    - Set to `true` after a `div` or the workspace is clicked.

### 3.2 Touch Event
The variable `touchState` is used to store the current state of the process. There are eight states:
- `pending`
    - Default mode.
    - On touchmove event of a `div`, change to `draggingTarget` state.
    - On touchend event of one-finger tap on a `div`, change to `touchingTarget` state.
    - On touchend event of double-tap on a `div`, change to `doubleTouchingTarget` state.
- `focused`
    - A `div` is selected and can be further operated.
    - On touchstart of the workspace, if a two-finger touch is detected, change to `resizing` state.
    - On touchend event of one-finger tap on a `div`, change to `touchingTarget` state.
    - On touchend event of double-tap on a `div`, change to `doubleTouchingTarget` state.
    - On touchend event of the workspace, change to `pending` state.
- `touchingTarget`
    - Touched but no further changes.
    - On touchend event of the workspace, change to `focused` state.
- `doubleTouchingTarget`
    - A `div`is double touched but not yet start moving.
    - On touchend event of the workspace, change to `movingTarget` state.
- `movingTarget`
    - A `div` is double-tapped and in the following-the-finger mode.
    - On touchend event of the workspace:
        - If another finger is put down (Aborted), change to `focused` state.
        - If a click action (touchstart and touchend quickly in the same place) is detected, change to `pending` state.
- `draggingTarget`
    - If a `div` is moved and not in `abortDragging` state, the state will change to `draggingTarget` state. In this state, the `div` is in dragging mode and can be dragged.
    - On touchend event of the workspace:
        - If another finger is put down (Aborted), change to `abortDragging` state.
        - Else if there is a selected `div`, change to `focused` state.
        - Else, change to `pending` state.
- `abortDragging`
    - The dragging mode is aborted, and further moving is disabled.
    - On touchend event of a `div`:
        - If there is a selected `div`, change to `focused` state.
        - Else, change to `pending` state.
- `resizing`
    - The selected `div` is in resizing mode and can be resized in either horizontal and vertical directions.
    - On touchstart event of a `div`, if a third-finger touch is detected, change to `focused` state.
    - On touchend event of the workspace, if all fingers have left the screen (`e.touches.length == 0`), change to `focused` state.
## 4. Anything Else
- Resizing on boundary: Any resizing attempts to make the `div` out of the boundary of the screen will just be ignored, but the resizing mode continues, in case the user moves their fingers further apart again.
