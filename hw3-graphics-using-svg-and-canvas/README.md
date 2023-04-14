# hw3-graphics-using-svg-and-canvas
- 學號：R11922101 
- 系級：資工碩一 
- 姓名：黃嘉宏 

## 1. Requirement Testing
### 1.1 General
- [x] Scrolling can be enabled.
### 1.2 Control Panel
#### Layer
- [x] When showing both layers, both Canvas (bottom) and SVG (top) are visible. No editing is allowed (all the controls are greyed out).
#### Mode (Default: Rectangle)
- [x] Cursor
- [x] Rectangle
- [x] Ellipse
- [x] Line
#### Border (Default: Black)
- [x] At least 7 colors and "none" for the border.
- [x] Show the selected color using the same kind of feedback as for the mode.
- [x] The default is black border.
- [x] It is impossible to make both the Border and the Fill to be "none" at the same time
#### Border (Default: 3)
- [x] Between 1px and 30px.
- [x] The default is 3.
#### Fill (Default: Green)
- [x] At least 7 colors and "none" for the fill.
- [x] The default is green fill.
- [x] It is impossible to make both the Border and the Fill to be "none" at the same time
#### Delete
- [x] The `Delete` button is only enabled when in SVG mode and when there is an object selected.
- [x] The `Delete all` button is always enabled in both Canvas and SVG mode.

### 1.3 Drawing (Creating)
- [x] Support interim-feedback.
- [x] Will not create an object unless it is bigger than a minimum size (`10px` by `10px` for rectangles and ellipses, or a length of at least `10px` for lines).
- [x] Hitting `ESC` will abort the operation.

### 1.4 Selecting
- [x] Shadow for selected objects (including lines, rectangles and ellipses).
- [x] When the user clicks on an object and that object becomes selected, the menus in the palette changes to match the selection. (Border color, Border width and Fill color)
- [x] Clicking on the background causes there to be no selection.
- [x] When an object is selected, and the user clicks on a different color or changes the border width in the palette, then the selected item changes to match.
- [x] Switching out of selection mode to go to drawing mode causes there to be nothing selected.
- [x] Changing from SVG to Canvas and back to SVG leaves there being no selection.

### 1.5 Dragging
- [x] The object become selected before dragging starts, and stay selected after the movement ends.
- [x] Hitting ESC will abort the operation, causing there to be nothing selected

### 1.6 Flood Fill
- [x] Integrate `floodfill.js` with my code.

 
## 2. Bonus Requirements
### 2.1 Draw and Move Lines
- [x] Add Line mode to the palette.
- [x] If Line mode is selected, the "None" button in the `Border Color` section will be greyed out.
- [x] Changing the Border color or Border width changes the properties that new lines are drawn with.
- [x] In SVG mode, if a line is selected, then the palette changes to match the line, and changing the palette changes the selected line's properties.
- [x] Lines should become selected when clicked on in SVG mode.
- [x] Shadow works fine for showing selected lines.
- [x] Moving a line changes its position without affecting its slope or size.
## 3. What was most difficult to implement or debug
- State control with mouse events. The order of mouse event is important. Take Dragging for example: 
`mousedown on object` > `mousedown on background` > `mousemove` > `mouseup on object` > `mouseup on background`
- I use 3 global variables to switch between states as in HW2.
## 4. Anything else of interest
A mistake-proofing UI design is used to avoid errors.
- It is not allowed to have both the border and fill be "none". If one of them is selected, the other will be disabled and greyed out.
- It is quite weird to flood fill an area while `Fill Color` is set to be "None". So, if Flood Fill mode is selected (in Canvas layer), the "None" button in the `Fill Color` section will be disabled and greyed out.