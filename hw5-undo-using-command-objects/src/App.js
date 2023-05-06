import React, { Component } from 'react';

import ControlPanel from './containers/ControlPanel/ControlPanel';
import Workspace from './containers/Workspace/Workspace';
import CommandList from './containers/CommandList/CommandList';

import ControlContext from './contexts/control-context';
import { genId, defaultValues, fillWidget, borderWidget, shapeMapWidget } from './shared/util';

import ChangeFillColorCommandObject from './shared/commandObjects/ChangeFillColorCommandObject';
import ChangeBorderColorCommandObject from './shared/commandObjects/ChangeBorderColorCommandObject';
import ChangeBorderWidthCommandObject from './shared/commandObjects/ChangeBorderWidthCommandObject';
import DeleteCommandObject from './shared/commandObjects/DeleteCommandObject';
import AddCommandObject from './shared/commandObjects/AddCommandObject';
import MoveCommandObject from './shared/commandObjects/MoveCommandObject';

import './App.css';

window.selectedObj = null;
window.shapesMap = {};
window.shapes = {};

class App extends Component {
  state = {
    // controls
    currMode: defaultValues.mode,
    currBorderColor: defaultValues.borderColor,
    currBorderWidth: defaultValues.borderWidth,
    currFillColor: defaultValues.fillColor,

    // workspace
    shapes: [],
    shapesMap: {},
    selectedShapeId: undefined,

    // handling undo/redo
    commandList: [],
    currCommand: -1,
  };

  constructor() {
    super();

    /*
     * pass this undoHandler into command object constructors:
     *  e.g. let cmdObj = new ChangeFillColorCommandObject(this.undoHandler);
     */
    console.log('construct');
    this.undoHandler = {
      registerExecution: this.registerExecution,
      // TODO: fill this up with whatever you need for the command objects
    };
  }

  /*
   * TODO:
   * add the commandObj to the commandList so
   * that is available for undoing.
   */
  registerExecution = (commandObject) => {
    console.log('registerExecution');
    let tempCommandList = this.state.commandList;
    tempCommandList.length = this.state.currCommand + 1;
    this.setState({ commandList: [...tempCommandList, ...[commandObject]], currCommand: this.state.currCommand + 1 });
  };

  /*
   * TODO:
   * actually call the undo method of the command at
   * the current position in the undo stack
   */
  undo = () => {
    // console.log('undo', this.state.currCommand, this.state.commandList);
    this.state.commandList[this.state.currCommand].undo();

    // console.log(window.shapesMap, window.shapes);
    this.setState({
      currCommand: this.state.currCommand - 1,
      shapesMap: window.shapesMap,
      shapes: window.shapes,
    });

    if (window.selectedObj) {
      this.updateShape(window.selectedObj.id, {
        fillColor: window.selectedObj.fillColor,
        borderColor: window.selectedObj.borderColor,
        borderWidth: window.selectedObj.borderWidth,
        visible: window.selectedObj.visible,
        initCoords: window.selectedObj.initCoords,
        finalCoords: window.selectedObj.finalCoords,
      });
      console.log(window.selectedObj.fillColor);
      this.setState({
        selectedShapeId: window.selectedObj.id,
        currFillColor: window.selectedObj.fillColor,
        currBorderColor: window.selectedObj.borderColor,
        currBorderWidth: window.selectedObj.borderWidth,
      });
      const test = new Set(window.shapes);
      if (test.has(window.selectedObj.id)) {
        if (window.shapesMap[window.selectedObj.id].visible === true) this.selectShape(window.selectedObj.id, window.shapesMap, window.shapes);
        else this.selectShape(null);
      } else this.selectShape(null);
    }

    this.changeCurrMode('select');
  };

  /*
   * TODO:
   * actually call the redo method of the command at
   * the current position in the undo stack. Note that this is
   * NOT the same command as would be affected by a doUndo()
   */
  redo = () => {
    this.state.commandList[this.state.currCommand + 1].redo();

    this.setState({
      currCommand: this.state.currCommand + 1,
    });

    if (window.shapesMap && window.shapes) {
      this.setState({
        shapesMap: window.shapesMap,
        shapes: window.shapes,
      });
    }

    if (window.selectedObj) {
      this.updateShape(window.selectedObj.id, {
        fillColor: window.selectedObj.fillColor,
        borderColor: window.selectedObj.borderColor,
        borderWidth: window.selectedObj.borderWidth,
        visible: window.selectedObj.visible,
        initCoords: window.selectedObj.initCoords,
        finalCoords: window.selectedObj.finalCoords,
      });
      this.setState({
        selectedShapeId: window.selectedObj.id,
        currFillColor: window.selectedObj.fillColor,
        currBorderColor: window.selectedObj.borderColor,
        currBorderWidth: window.selectedObj.borderWidth,
      });

      const test = new Set(window.shapes);
      if (test.has(window.selectedObj.id)) {
        if (this.state.shapesMap[window.selectedObj.id].visible === true) this.selectShape(window.selectedObj.id, window.shapesMap, window.shapes);
        else this.selectShape(null);
      } else this.selectShape(null);
    }

    this.changeCurrMode('select');
  };

  keyDown = (e) => {
    let ctrlDown = e.ctrlKey || e.metaKey;
    if (ctrlDown && e.keyCode === 90) {
      console.log('ctrl+z');
      if (this.state.currCommand !== -1) this.undo()
    }
    else if (ctrlDown && e.keyCode === 89) {
      console.log('ctrl+y');
      if (this.state.currCommand !== this.state.commandList.length - 1) this.redo()
    }
  };

  // add the shapeId to the array, and the shape itself to the map
  addShape = (shapeData) => {
    let shapes = [...this.state.shapes];
    let shapesMap = { ...this.state.shapesMap };
    const id = genId();
    shapesMap[id] = {
      ...shapeData,
      id,
    };
    shapes.push(id);
    this.setState({ shapes, shapesMap, selectedShapeId: id });

    window.selectedObj = Object.assign(shapeData, { id });
    window.shapesMap = this.state.shapesMap;
    shapeMapWidget.shapeMap = shapesMap;
    window.shapes = this.state.shapes;
    shapeMapWidget.shapes = shapes;
    let cmdObj = new AddCommandObject(this.undoHandler);
    if (cmdObj.canExecute()) cmdObj.execute();
  };

  // get the shape by its id, and update its properties
  updateShape = (shapeId, newData) => {
    let shapesMap = { ...this.state.shapesMap };
    let targetShape = shapesMap[shapeId];
    shapesMap[shapeId] = { ...targetShape, ...newData };
    this.setState({ shapesMap });
  };

  moveShape = (newData) => {
    if (this.state.selectedShapeId) {
      shapeMapWidget.data = newData;
      this.updateShape(this.state.selectedShapeId, newData);
    }
  };

  moveShapeWithMouseDown = () => {
    if (this.state.selectedShapeId) {
      window.selectedObj = this.state.shapesMap[this.state.selectedShapeId];

      window.shapes = this.state.shapes;
      window.shapesMap = this.state.shapesMap;
    }
  };

  moveShapeWithMouseUp = () => {
    console.log('move up');
    if (this.state.selectedShapeId) {
      let cmdObj = new MoveCommandObject(this.undoHandler);
      if (cmdObj.canExecute()) cmdObj.execute();
    }
  };

  // deleting a shape sets its visibility to false, rather than removing it
  deleteSelectedShape = () => {
    window.selectedObj = this.state.shapesMap[this.state.selectedShapeId];
    window.shapesMap = this.state.shapesMap;
    window.shapes = this.state.shapes;
    let cmdObj = new DeleteCommandObject(this.undoHandler);
    if (cmdObj.canExecute()) cmdObj.execute();

    let shapesMap = { ...this.state.shapesMap };
    shapesMap[this.state.selectedShapeId].visible = false;
    this.setState({ shapesMap, selectedShapeId: undefined });
  };

  changeCurrMode = (mode) => {
    if (mode === 'line') {
      this.setState({
        currMode: mode,
        currBorderColor: defaultValues.borderColor,
      });
    } else if (mode === 'select') {
      this.setState({ currMode: mode });
    } else {
      this.setState({ currMode: mode });
      this.selectShape(null);
    }
  };

  changeCurrBorderColor = (borderColor) => {
    this.setState({ currBorderColor: borderColor });

    if (this.state.selectedShapeId) {
      window.selectedObj = this.state.shapesMap[this.state.selectedShapeId];
      window.shapesMap = this.state.shapesMap;
      window.shapes = this.state.shapes;
      borderWidget.currentColor = borderColor;
      this.updateShape(this.state.selectedShapeId, { borderColor });
    }

    let cmdObj = new ChangeBorderColorCommandObject(this.undoHandler);
    if (cmdObj.canExecute()) cmdObj.execute();
  };

  changeCurrBorderWidth = (borderWidth) => {
    this.setState({ currBorderWidth: borderWidth });
    if (this.state.selectedShapeId) {
      this.updateShape(this.state.selectedShapeId, { borderWidth });
    }
  };

  changeCurrBorderWidthWithMouseDown = () => {
    if (this.state.selectedShapeId) {
      window.selectedObj = this.state.shapesMap[this.state.selectedShapeId];
      window.shapesMap = this.state.shapesMap;
      window.shapes = this.state.shapes;
    }
  };

  changeCurrBorderWidthWithMouseUp = (borderWidth) => {
    borderWidget.currentWidth = borderWidth;
    let cmdObj = new ChangeBorderWidthCommandObject(this.undoHandler);
    if (cmdObj.canExecute()) cmdObj.execute();
  };

  changeCurrFillColor = (fillColor) => {
    this.setState({ currFillColor: fillColor });

    if (this.state.selectedShapeId) {
      window.selectedObj = this.state.shapesMap[this.state.selectedShapeId];
      window.shapesMap = this.state.shapesMap;
      window.shapes = this.state.shapes;
      fillWidget.currentColor = fillColor;
      this.updateShape(this.state.selectedShapeId, { fillColor });
    }

    let cmdObj = new ChangeFillColorCommandObject(this.undoHandler);
    if (cmdObj.canExecute()) cmdObj.execute();
  };

  selectShape = (id, map = this.state.shapesMap, shapes = this.state.shapes) => {
    this.setState({ selectedShapeId: id });
    if (id) {
      // console.log(id, this.state.shapes, this.state.shapes.filter((shapeId) => shapeId === id)[0])
      const { borderColor, borderWidth, fillColor } = map[shapes.filter((shapeId) => shapeId === id)[0]];
      this.setState({
        currBorderColor: borderColor,
        currBorderWidth: borderWidth,
        currFillColor: fillColor,
      });
      window.selectedObj = map[id];
    } else {
      window.selectedObj = null;
    }
    // console.log(window.selectedObj);
  };

  render() {
    const { currMode, currBorderColor, currBorderWidth, currFillColor, shapes, shapesMap, selectedShapeId } = this.state;
    window.addEventListener('keydown', this.keyDown);

    // update the context with the functions and values defined above and from state
    // and pass it to the structure below it (control panel and workspace)
    return (
      <React.Fragment>
        <ControlContext.Provider
          value={{
            currMode,
            changeCurrMode: this.changeCurrMode,
            currBorderColor,
            changeCurrBorderColor: this.changeCurrBorderColor,
            currBorderWidth,
            changeCurrBorderWidth: this.changeCurrBorderWidth,
            currFillColor,
            changeCurrFillColor: this.changeCurrFillColor,
            changeCurrBorderWidthWithMouseUp: this.changeCurrBorderWidthWithMouseUp,
            changeCurrBorderWidthWithMouseDown: this.changeCurrBorderWidthWithMouseDown,

            shapes,
            shapesMap,
            addShape: this.addShape,
            moveShape: this.moveShape,
            moveShapeWithMouseUp: this.moveShapeWithMouseUp,
            moveShapeWithMouseDown: this.moveShapeWithMouseDown,
            selectedShapeId,
            selectShape: this.selectShape,
            deleteSelectedShape: this.deleteSelectedShape,

            undo: this.undo,
            redo: this.redo,

            currCommand: this.state.currCommand,
            commandList: this.state.commandList,
          }}
        >
          <ControlPanel />
          <Workspace />
          <CommandList />
        </ControlContext.Provider>
      </React.Fragment>
    );
  }
}

export default App;
