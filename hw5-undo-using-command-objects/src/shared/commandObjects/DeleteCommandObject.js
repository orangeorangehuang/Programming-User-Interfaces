import CommandObject from './CommandObject';

export default class DeleteCommandObject extends CommandObject {
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
      this.type = 'Delete';
      this.targetObject = window.selectedObj; // global variable for selected
      this.oldValue = window.selectedObj.visible; // object's current color
      this.newValue = false; // get the color widget's current color
      window.selectedObj.visible = this.newValue; // actually change
      // Note that this command object must be a NEW command object so it can be
      // registered to put it onto the stack
      if (this.addToUndoStack) this.undoHandler.registerExecution(this);
    }
  }

  /* override to undo the operation of this command
   */
  undo() {
    window.selectedObj = this.targetObject;
    window.selectedObj.visible = this.oldValue;
    // maybe also need to fix the palette to show this object's color?
  }

  /* override to redo the operation of this command, which means to
   * undo the undo. This should ONLY be called if the immediate
   * previous operation was an Undo of this command. Anything that
   * can be undone can be redone, so there is no need for a canRedo.
   */
  redo() {
    window.selectedObj = this.targetObject;
    window.selectedObj.visible = this.newValue;
    // maybe also need to fix the palette to show this object's color?
  }
}
