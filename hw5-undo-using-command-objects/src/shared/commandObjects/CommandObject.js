/*
 * top level definition of what Command Objects
 * should be like. This is basically an abstract class that particular
 * command objects should extend
 */
export default class CommandObject {
  constructor(controls, addToUndoStack = true) {
    this.type = '';
    this.undoHandler = controls;
    this.addToUndoStack = addToUndoStack; // is this the kind of operations that is queued?
    this.targetObject = undefined; // object this command affected
    this.newValue = undefined; // new value used by the command
    this.oldValue = undefined; // previous (old) value for the object
  }

  /* override to return true if this command can be executed,
   *  e.g., if there is an object selected
   */
  canExecute() {
    return false;
  }

  /* override to execute the action of this command.
   * pass in false for addToUndoStack if this is a command which is NOT
   * put on the undo stack, like Copy, or a change of selection or Save
   */
  execute() {}

  /* override to undo the operation of this command.
   * this should be a NEW command object so it can be put on the undo stack.
   * execute will only be called if addToUndoStack was true, so it must
   * be an undoable operation. Be sure to register this
   * object on the undo stack.
   */
  undo() {}

  /* override to redo the operation of this command, which means to
   * undo the undo. This should ONLY be called if the immediate
   * previous operation was an Undo of this command. Anything that
   * can be undone can be redone, so there is no need for a canRedo.
   */
  redo() {}

  /* override to return true if this operation can be repeated in the
   * current context. NOTE: Repeat is extra credit.
   */
  canRepeat() {
    return false;
  }

  /* override to execute the operation again, this time possibly on
   * a new object. Thus, this typically uses the same value but a new
   * targetObject. Be sure to register this
   * object on the undo stack.  NOTE: Repeat is extra credit.
   */
  repeat() {}
}
