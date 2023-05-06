import CommandObject from './CommandObject';
import { borderWidget } from '../util';

export default class ChangeBorderColorCommandObject extends CommandObject {
  constructor(undoHandler) {
    super(undoHandler, true);
  }

  /* override to return true if this command can be executed,
   *  e.g., if there is an object selected
   */
  canExecute() {
    return window.selectedObj !== null; // global variable for selected
  }

  /* override to execute the action of this command.
   * pass in false for addToUndoStack if this is a command which is NOT
   * put on the undo stack, like Copy, or a change of selection or Save
   */

  execute() {
    if (window.selectedObj) {
      this.type = 'ChangeBorderColor';
      this.targetObject = window.selectedObj; // global variable for selected
      this.oldValue = window.selectedObj.borderColor; // object's current color
      this.newValue = borderWidget.currentColor; // get the color widget's current color
      window.selectedObj.borderColor = this.newValue; // actually change
      // Note that this command object must be a NEW command object so it can be
      // registered to put it onto the stack
      if (this.addToUndoStack) this.undoHandler.registerExecution(this);
    }
  }

  /* override to undo the operation of this command
   */
  undo() {
    window.selectedObj = this.targetObject;
    window.selectedObj.borderColor = this.oldValue;
    // maybe also need to fix the palette to show this object's color?
  }

  /* override to redo the operation of this command, which means to
   * undo the undo. This should ONLY be called if the immediate
   * previous operation was an Undo of this command. Anything that
   * can be undone can be redone, so there is no need for a canRedo.
   */
  redo() {
    window.selectedObj = this.targetObject;
    window.selectedObj.borderColor = this.newValue;
    // maybe also need to fix the palette to show this object's color?
  }

  /* override to return true if this operation can be repeated in the
   * current context
   */
  canRepeat() {
    return window.selectedObj !== null;
  }

  /* override to execute the operation again, this time possibly on
   * a new object. Thus, this typically uses the same value but a new
   * selectedObject.
   */
  repeat() {
    if (window.selectedObj !== null) {
      this.targetObject = window.selectedObj; // get new selected obj
      this.oldValue = window.selectedObj.borderColor; // object's current color
      // no change to newValue since reusing the same color
      window.selectedObj.borderColor = this.newValue; // actually change

      // Note that this command object must be a NEW command object so it can be
      // registered to put it onto the stack
      if (this.addToUndoStack) this.undoHandler.registerExecution({ ...this });
    }
  }
}
