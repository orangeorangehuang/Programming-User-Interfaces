import React, { useContext } from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';
import ControlContext from '../../contexts/control-context';
import './CommandList.css';

const CommandItem = ({ cmd, currCommand, index }) => {
  let class_name = 'commandItem';
  let target_type = cmd.targetObject.type;
  let target_color = cmd.newValue.toString().substring(1);
  let msg = <></>;

  if (currCommand < index) {
    class_name = 'commandItem disabled';
  } else if (currCommand === index) {
    class_name = 'commandItem focused';
  }

  switch (cmd.type) {
    case 'Add':
      msg = <div>Create {target_type}</div>;
      break;
    case 'Delete':
      msg = <div>Delete {target_type}</div>;
      break;
    case 'Move':
      msg = <div>Move {target_type}</div>;
      break;
    case 'ChangeBorderColor':
      msg = (
        <div>
          Change {target_type} border color to <div className={'color-' + target_color}>{cmd.newValue}</div>
        </div>
      );
      break;
    case 'ChangeBorderWidth':
      msg = (
        <div>
          Change {target_type} border width to {cmd.newValue}
        </div>
      );
      break;
    case 'ChangeFillColor':
      msg = (
        <div>
          Change {target_type} fill color to <div className={'color-' + target_color}>{cmd.newValue}</div>
        </div>
      );
      break;
    default:
      break;
  }

  return <div className={class_name}>{msg}</div>;
};

const CommandList = () => {
  const { currCommand, commandList } = useContext(ControlContext);

  let commandItems = commandList.map((cmd, index) => {
    return <CommandItem key={index} cmd={cmd} currCommand={currCommand} index={index} />;
  });

  return <ScrollToBottom className='commandListContainer'>{commandItems}</ScrollToBottom>;
};

export default CommandList;
