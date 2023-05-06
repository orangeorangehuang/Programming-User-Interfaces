import React, { useContext } from 'react';

import { FaTrash } from 'react-icons/fa';
import { ImUndo, ImRedo } from 'react-icons/im';

import CursorImg from '../../assets/img/cursor.png';
import LineImg from '../../assets/img/line.png';
import supportedColors from '../../shared/supportedColors';
import ControlContext from '../../contexts/control-context';

import './ControlPanel.css';

const Modes = ({ currMode, changeCurrMode, currBorderColor, currFillColor }) => {
  return (
    <div className='Control'>
      <h3>Mode:</h3>
      <div className='Modes'>
        <div className={['Mode', currMode === 'select' ? 'Active' : null].join(' ')} onClick={() => changeCurrMode('select')}>
          <img src={CursorImg} alt='cursor' />
        </div>
        <div className={['Mode', currMode === 'line' ? 'Active' : null].join(' ')} onClick={() => changeCurrMode('line')}>
          <img src={LineImg} alt='line' />
        </div>
        <div className={['Mode', currMode === 'rect' ? 'Active' : null].join(' ')} onClick={() => changeCurrMode('rect')}>
          <div
            style={{
              backgroundColor: currFillColor,
              width: 36,
              height: 20,
              border: `2px solid ${currBorderColor}`,
            }}
          ></div>
        </div>
        <div className={['Mode', currMode === 'ellipse' ? 'Active' : null].join(' ')} onClick={() => changeCurrMode('ellipse')}>
          <div
            style={{
              backgroundColor: currFillColor,
              width: 36,
              height: 20,
              border: `2px solid ${currBorderColor}`,
              borderRadius: '50%',
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

const ColorPicker = ({ title, currColor, setCurrColor, conflictColors }) => {
  return (
    <div className='Control'>
      <h3>{title}</h3>
      <div className='Modes'>
        {supportedColors.map((color, idx) => (
          <div
            key={idx}
            className={['Mode', currColor === color ? 'Active' : null].join(' ')}
            onClick={() => {
              if (!(color === 'transparent' && conflictColors.includes('transparent'))) setCurrColor(color);
            }}
          >
            <div
              className='ColorBlock'
              style={{
                backgroundColor: color,
                border: color === 'transparent' ? 'none' : null,
                opacity: color === 'transparent' && conflictColors.includes('transparent') ? 0.3 : null,
                cursor: color === 'transparent' && conflictColors.includes('transparent') ? 'not-allowed' : null,
              }}
            >
              {color === 'transparent' && 'None'}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const BorderColor = ({ currMode, currBorderColor, changeCurrBorderColor, currFillColor }) => {
  return (
    <ColorPicker
      title={'Border color:'}
      currColor={currBorderColor}
      setCurrColor={changeCurrBorderColor}
      conflictColors={[currFillColor, currMode === 'line' ? 'transparent' : null]}
    />
  );
};

const FillColor = ({ currFillColor, changeCurrFillColor, currBorderColor }) => {
  return <ColorPicker title={'Fill color:'} currColor={currFillColor} setCurrColor={changeCurrFillColor} conflictColors={[currBorderColor]} />;
};

const BorderWidth = ({ currBorderWidth, changeCurrBorderWidth, changeCurrBorderWidthWithMouseUp, changeCurrBorderWidthWithMouseDown }) => {
  return (
    <div className='Control'>
      <h3>Border width:</h3>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <input
          type='range'
          tabIndex='-1'
          style={{ width: 200 }}
          onChange={(e) => changeCurrBorderWidth(e.target.value)}
          onMouseDown={(e) => changeCurrBorderWidthWithMouseDown()}
          onMouseUp={(e) => changeCurrBorderWidthWithMouseUp(e.target.value)}
          min={1}
          max={30}
          value={currBorderWidth}
        />
        &nbsp;&nbsp;&nbsp;
        <span>{currBorderWidth}</span>
      </div>
    </div>
  );
};

const Delete = ({ selectedShapeId, deleteSelectedShape, shapesMap }) => {
  return (
    <div className='Control'>
      <h3>Delete:</h3>
      <div className='DeleteButtonsContainer'>
        <button
          onClick={() => deleteSelectedShape()}
          disabled={!selectedShapeId}
          style={{
            cursor: (selectedShapeId) ? null: 'not-allowed',
          }}
        >
          <FaTrash className='ButtonIcon' /> Delete
        </button>{' '}
      </div>
    </div>
  );
};

const UndoRedo = ({ undo, redo, currCommand, commandList }) => {
  return (
    <div className='Control'>
      <h3>Undo / Redo:</h3>
      <div className='UndoRedoButtonsContainer'>
        {currCommand === -1 ? (
          <button id='undoBtn' disabled>
            <ImUndo className='ButtonIcon' />
            Undo
          </button>
        ) : (
          <button id='undoBtn' onClick={() => undo()}>
            <ImUndo className='ButtonIcon' />
            Undo
          </button>
        )}{' '}
        {currCommand === commandList.length - 1 ? (
          <button id='redoBtn' disabled>
            <ImRedo className='ButtonIcon' />
            Redo
          </button>
        ) : (
          <button id='redoBtn' onClick={() => redo()}>
            <ImRedo className='ButtonIcon' />
            Redo
          </button>
        )}
      </div>
    </div>
  );
};

const ControlPanel = () => {
  // use useContext to access the functions & values from the provider
  const {
    currMode,
    changeCurrMode,
    currBorderColor,
    changeCurrBorderColor,
    currFillColor,
    changeCurrFillColor,
    currBorderWidth,
    changeCurrBorderWidth,
    selectedShapeId,
    deleteSelectedShape,
    changeCurrBorderWidthWithMouseUp,
    changeCurrBorderWidthWithMouseDown,
    undo,
    redo,
    shapesMap,
    currCommand,
    commandList,
  } = useContext(ControlContext);

  return (
    <div className='ControlPanel'>
      <Modes currMode={currMode} changeCurrMode={changeCurrMode} currBorderColor={currBorderColor} currFillColor={currFillColor} />
      <BorderColor
        currMode={currMode}
        currBorderColor={currBorderColor}
        changeCurrBorderColor={changeCurrBorderColor}
        currFillColor={currFillColor}
      />
      <BorderWidth
        currBorderWidth={currBorderWidth}
        changeCurrBorderWidth={changeCurrBorderWidth}
        changeCurrBorderWidthWithMouseUp={changeCurrBorderWidthWithMouseUp}
        changeCurrBorderWidthWithMouseDown={changeCurrBorderWidthWithMouseDown}
      />
      <FillColor currFillColor={currFillColor} changeCurrFillColor={changeCurrFillColor} currBorderColor={currBorderColor} />
      <Delete selectedShapeId={selectedShapeId} deleteSelectedShape={deleteSelectedShape} shapesMap={shapesMap} />
      <UndoRedo undo={undo} redo={redo} currCommand={currCommand} commandList={commandList} />
    </div>
  );
};

export default ControlPanel;
