let layer_curr = 'SVG';
let mode_curr = 'mode-rect';
let border_curr = 'rgb(0,0,0)';
let width_curr = 3;
let fill_curr = 'rgb(171,210,104)';

const layer_canvas = document.getElementById('layer-canvas');
const layer_svg = document.getElementById('layer-svg');
const layer_both = document.getElementById('layer-both');
const layer_arr = [layer_canvas, layer_svg, layer_both];

const mode_cursor = document.getElementById('mode-cursor');
const mode_line = document.getElementById('mode-line');
const mode_rect = document.getElementById('mode-rect');
const mode_circ = document.getElementById('mode-circ');
const mode_arr = [mode_cursor, mode_line, mode_rect, mode_circ];
const mode_change = [mode_rect, mode_circ];

const border_width = document.getElementById('range-bar');
const border_none = document.getElementById('btn-border-none');
const border_white = document.getElementById('btn-border-white');
const border_grey = document.getElementById('btn-border-grey');
const border_black = document.getElementById('btn-border-black');
const border_yellow = document.getElementById('btn-border-yellow');
const border_red = document.getElementById('btn-border-red');
const border_blue = document.getElementById('btn-border-blue');
const border_green = document.getElementById('btn-border-green');
const border_arr = [border_none, border_white, border_grey, border_black, border_yellow, border_red, border_blue, border_green];
const border_dict = {
  'btn-border-none': 'transparent',
  'btn-border-white': 'rgb(255,255,255)',
  'btn-border-grey': 'rgb(191,191,191)',
  'btn-border-black': 'rgb(0,0,0)',
  'btn-border-yellow': 'rgb(251,255,97)',
  'btn-border-red': 'rgb(202,66,44)',
  'btn-border-blue': 'rgb(121,167,232)',
  'btn-border-green': 'rgb(171,210,104)',
};
const border_element_dict = {
  transparent: border_none,
  'rgb(255,255,255)': border_white,
  'rgb(191,191,191)': border_grey,
  'rgb(0,0,0)': border_black,
  'rgb(251,255,97)': border_yellow,
  'rgb(202,66,44)': border_red,
  'rgb(121,167,232)': border_blue,
  'rgb(171,210,104)': border_green,
};

const fill_none = document.getElementById('btn-fill-none');
const fill_white = document.getElementById('btn-fill-white');
const fill_grey = document.getElementById('btn-fill-grey');
const fill_black = document.getElementById('btn-fill-black');
const fill_yellow = document.getElementById('btn-fill-yellow');
const fill_red = document.getElementById('btn-fill-red');
const fill_blue = document.getElementById('btn-fill-blue');
const fill_green = document.getElementById('btn-fill-green');
const fill_arr = [fill_none, fill_white, fill_grey, fill_black, fill_yellow, fill_red, fill_blue, fill_green];
const fill_dict = {
  'btn-fill-none': 'transparent',
  'btn-fill-white': 'rgb(255,255,255)',
  'btn-fill-grey': 'rgb(191,191,191)',
  'btn-fill-black': 'rgb(0,0,0)',
  'btn-fill-yellow': 'rgb(251,255,97)',
  'btn-fill-red': 'rgb(202,66,44)',
  'btn-fill-blue': 'rgb(121,167,232)',
  'btn-fill-green': 'rgb(171,210,104)',
};
const fill_element_dict = {
  transparent: fill_none,
  'rgb(255,255,255)': fill_white,
  'rgb(191,191,191)': fill_grey,
  'rgb(0,0,0)': fill_black,
  'rgb(251,255,97)': fill_yellow,
  'rgb(202,66,44)': fill_red,
  'rgb(121,167,232)': fill_blue,
  'rgb(171,210,104)': fill_green,
};

const btn_delete_one = document.getElementById('btn-delete-one');
const btn_delete_all = document.getElementById('btn-delete-all');

const area_svg = document.getElementById('area-svg');
const area_canvas = document.getElementById('area-canvas');
const ctx_canvas = area_canvas.getContext('2d');
let saved_canvas_data;
let init_x, init_y;
let is_drawing = false;
let is_dragging = false;
let is_element_down = false;
let last_mode = mode_rect;
let last_border = border_black;
let last_fill = fill_green;
let element_offset_x, element_offset_y;
let element_offset_x2, element_offset_y2;
let operatingSvgElement = null;

// Util Funcs

const disableAllPanel = () => {
  mode_arr.forEach((el) => {
    el.parentElement.classList.remove('focus');
    el.classList.add('btn-color-disabled');
    el.removeEventListener('click', handleModeClick);
  });
  border_arr.forEach((el) => {
    el.parentElement.classList.remove('focus');
    el.classList.add('btn-color-disabled');
    el.removeEventListener('click', handleBorderClick);
  });
  fill_arr.forEach((el) => {
    el.parentElement.classList.remove('focus');
    el.classList.add('btn-color-disabled');
    el.removeEventListener('click', handleFillClick);
  });
  btn_delete_one.disabled = true;
  btn_delete_all.disabled = true;
  border_width.disabled = true;
};

const openAllPanel = () => {
  last_mode.parentElement.classList.add('focus');
  mode_arr.forEach((el) => {
    el.classList.remove('btn-color-disabled');
    el.addEventListener('click', handleModeClick);
  });
  last_border.parentElement.classList.add('focus');
  border_arr.forEach((el) => {
    el.classList.remove('btn-color-disabled');
    el.addEventListener('click', handleBorderClick);
  });
  last_fill.parentElement.classList.add('focus');
  fill_arr.forEach((el) => {
    el.classList.remove('btn-color-disabled');
    el.addEventListener('click', handleFillClick);
  });
  btn_delete_one.disabled = true;
  btn_delete_all.disabled = false;
  border_width.disabled = false;
};

const disableBorderNone = () => {
  border_none.classList.add('btn-color-disabled');
  border_none.removeEventListener('click', handleBorderClick);
};

const openBorderNone = () => {
  border_none.classList.remove('btn-color-disabled');
  border_none.addEventListener('click', handleBorderClick);
};

const disableFillNone = () => {
  fill_none.classList.add('btn-color-disabled');
  fill_none.removeEventListener('click', handleFillClick);
};

const openFillNone = () => {
  fill_none.classList.remove('btn-color-disabled');
  fill_none.addEventListener('click', handleFillClick);
};

const handleFillMode = (is_entering) => {
  if (is_entering) {
    if (fill_curr === 'transparent') {
      fill_curr = 'rgb(171,210,104)';
      fill_none.parentElement.classList.remove('focus');
      fill_green.parentElement.classList.add('focus');
      mode_change.forEach((el) => {
        el.style.backgroundColor = fill_curr;
      });
    }
    disableFillNone();
  } else {
    openFillNone();
  }
};

const handleLineMode = (is_entering) => {
  if (is_entering) {
    if (border_curr === 'transparent') {
      border_curr = 'rgb(0,0,0)';
      border_none.parentElement.classList.remove('focus');
      border_black.parentElement.classList.add('focus');
      mode_change.forEach((el) => {
        el.style.borderColor = border_curr;
      });
    }
    disableBorderNone();
  } else {
    openBorderNone();
  }
};

const handleNoneMode = () => {
  handleLineMode(mode_curr === 'mode-line');
  handleFillMode(mode_curr === 'mode-cursor' && layer_curr === 'Canvas');
  if (border_curr === 'transparent') {
    disableFillNone();
  } else if (fill_curr === 'transparent') {
    disableBorderNone();
  }
};

const clearCanvas = () => {
  ctx_canvas.clearRect(0, 0, area_canvas.width, area_canvas.height);
};

const saveCanvas = () => {
  const saved = new Image();
  saved.src = area_canvas.toDataURL('image/png');
  saved_canvas_data = saved;
};

const restoreCanvas = () => {
  ctx_canvas.drawImage(saved_canvas_data, 0, 0);
};

const createSvgElement = (type, attr) => {
  let element = document.createElementNS('http://www.w3.org/2000/svg', type);
  for (var name in attr) {
    element.setAttribute(name, attr[name]);
  }
  return element;
};

const draggingElementMove = (e) => {
  if (is_dragging === false) return;
  // Dragging
  let tag_type = operatingSvgElement.nodeName;
  switch (tag_type) {
    case 'line':
      operatingSvgElement.setAttribute('x1', e.clientX - element_offset_x);
      operatingSvgElement.setAttribute('y1', e.clientY - element_offset_y);
      operatingSvgElement.setAttribute('x2', e.clientX - element_offset_x2);
      operatingSvgElement.setAttribute('y2', e.clientY - element_offset_y2);
      break;
    case 'rect':
      operatingSvgElement.setAttribute('x', e.clientX - element_offset_x);
      operatingSvgElement.setAttribute('y', e.clientY - element_offset_y);
      break;
    case 'ellipse':
      operatingSvgElement.setAttribute('cx', e.clientX - element_offset_x);
      operatingSvgElement.setAttribute('cy', e.clientY - element_offset_y);
      break;
    default:
      break;
  }
};

const clearAllSvgFocus = () => {
  for (const child of area_svg.children) {
    if (child.tagName !== 'defs') {
      child.removeAttribute('filter');
    }
  }
  btn_delete_one.disabled = true;
};

const addSvgFocus = () => {
  operatingSvgElement.setAttribute('filter', 'url(#shadow)');
  border_curr = operatingSvgElement.getAttribute('stroke') ? operatingSvgElement.getAttribute('stroke') : border_curr;
  fill_curr = operatingSvgElement.getAttribute('fill') ? operatingSvgElement.getAttribute('fill') : fill_curr;
  width_curr = operatingSvgElement.getAttribute('stroke-width') ? parseInt(operatingSvgElement.getAttribute('stroke-width')) : width_curr;

  border_arr.forEach((el) => {
    el.parentElement.classList.remove('focus');
  });
  fill_arr.forEach((el) => {
    el.parentElement.classList.remove('focus');
  });
  mode_change.forEach((el) => {
    el.style.borderColor = border_curr;
    el.style.backgroundColor = fill_curr;
  });

  border_element_dict[border_curr].parentElement.classList.add('focus');
  fill_element_dict[fill_curr].parentElement.classList.add('focus');
  border_width.value = width_curr;
  document.getElementById('range-value').innerText = width_curr;

  last_border = border_element_dict[border_curr];
  last_fill = fill_element_dict[fill_curr];

  btn_delete_one.disabled = false;
};

const clearSvgArea = () => {
  while (area_svg.childNodes.length > 2) {
    area_svg.removeChild(area_svg.lastChild);
  }
};

const changeSelectedElementType = () => {
  console.log('operating:', operatingSvgElement);
  if (operatingSvgElement !== null) {
    operatingSvgElement.setAttribute('stroke', border_curr);
    operatingSvgElement.setAttribute('stroke-width', width_curr);
    operatingSvgElement.setAttribute('fill', fill_curr);
  }
}

// Event Listeners

const handleLayerChange = (e) => {
  e.preventDefault();
  layer_curr = e.target.value;
  switch (layer_curr) {
    case 'Canvas':
      area_canvas.style.display = 'block';
      area_svg.style.display = 'none';
      btn_delete_one.disabled = true;
      openAllPanel();
      handleNoneMode();
      break;
    case 'SVG':
      area_canvas.style.display = 'none';
      area_svg.style.display = 'block';
      btn_delete_one.disabled = false;
      clearAllSvgFocus();
      openAllPanel();
      handleNoneMode();
      break;
    case 'Both':
      area_canvas.style.display = 'block';
      area_svg.style.display = 'block';
      btn_delete_one.disabled = false;
      clearAllSvgFocus();
      disableAllPanel();
      break;
    default:
      break;
  }
};

const handleModeClick = (e) => {
  e.preventDefault();
  last_mode = e.target;
  mode_curr = e.target.id;
  mode_arr.forEach((mode) => {
    mode.parentElement.classList.remove('focus');
  });
  e.target.parentElement.classList.add('focus');
  if (layer_curr === "SVG") {
    clearAllSvgFocus();
    operatingSvgElement = null;
  }
  handleNoneMode();
};

const handleBorderClick = (e) => {
  e.preventDefault();
  last_border = e.target;
  border_arr.forEach((border) => {
    border.parentElement.classList.remove('focus');
  });
  e.target.parentElement.classList.add('focus');

  let border_color = border_dict[e.target.id];
  border_curr = border_color;
  mode_change.forEach((el) => {
    el.style.borderColor = border_color;
  });

  changeSelectedElementType();
  handleNoneMode();
};

const handleFillClick = (e) => {
  e.preventDefault();
  last_fill = e.target;
  fill_arr.forEach((el) => {
    el.parentElement.classList.remove('focus');
  });
  e.target.parentElement.classList.add('focus');

  let fill_color = fill_dict[e.target.id];
  fill_curr = fill_color;
  mode_change.forEach((el) => {
    el.style.backgroundColor = fill_color;
  });

  changeSelectedElementType();
  handleNoneMode();
};

const handleBorderWidthChange = (e) => {
  e.preventDefault();
  let wid = e.target.value;
  document.getElementById('range-value').innerText = wid;
  width_curr = parseInt(wid);
  changeSelectedElementType();
};

const handleBtnDeleteAllClick = (e) => {
  e.preventDefault();
  clearCanvas();
  clearSvgArea();
};

const handleCanvasMouseDown = (e) => {
  e.preventDefault();
  init_x = e.clientX - area_canvas.parentElement.offsetLeft;
  init_y = e.clientY - area_canvas.parentElement.offsetTop;
  is_drawing = true;
  switch (mode_curr) {
    case 'mode-cursor':
      floodFill(e, area_canvas, fill_curr);
      break;
    case 'mode-line':
      saveCanvas();
      ctx_canvas.strokeStyle = border_curr;
      ctx_canvas.lineWidth = width_curr;
      break;
    case 'mode-rect':
    case 'mode-circ':
      saveCanvas();
      ctx_canvas.strokeStyle = border_curr;
      ctx_canvas.lineWidth = width_curr;
      ctx_canvas.fillStyle = fill_curr;
      break;
    default:
      break;
  }
};

let width, height, length;
const handleCanvasMouseMove = (e) => {
  e.preventDefault();
  if (!is_drawing) return;

  let curr_x, curr_y, temp_x, temp_y;
  let canvas_offset_x = area_canvas.parentElement.offsetLeft;
  let canvas_offset_y = area_canvas.parentElement.offsetTop;

  curr_x = e.clientX >= canvas_offset_x ? e.clientX - canvas_offset_x : canvas_offset_x - e.clientX;
  curr_y = e.clientY >= canvas_offset_y ? e.clientY - canvas_offset_y : canvas_offset_y - e.clientY;
  width = curr_x >= init_x ? curr_x - init_x : init_x - curr_x;
  height = curr_y >= init_y ? curr_y - init_y : init_y - curr_y;
  length = Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2));
  temp_x = curr_x >= init_x ? init_x : init_x - width;
  temp_y = curr_y >= init_y ? init_y : init_y - height;

  switch (mode_curr) {
    case 'mode-cursor':
      break;
    case 'mode-line':
      clearCanvas();
      restoreCanvas();
      ctx_canvas.beginPath();
      ctx_canvas.moveTo(init_x, init_y);
      ctx_canvas.lineTo(curr_x, curr_y);
      ctx_canvas.stroke();
      break;
    case 'mode-rect':
      clearCanvas();
      restoreCanvas();
      ctx_canvas.beginPath();
      ctx_canvas.rect(temp_x, temp_y, width, height);
      ctx_canvas.fill();
      ctx_canvas.stroke();
      break;
    case 'mode-circ':
      clearCanvas();
      restoreCanvas();
      ctx_canvas.beginPath();
      ctx_canvas.ellipse(temp_x + width / 2, temp_y + height / 2, width / 2, height / 2, 0, 0, 2 * Math.PI);
      ctx_canvas.fill();
      ctx_canvas.stroke();
      break;
    default:
      break;
  }
};

const handleCanvasMouseUp = (e) => {
  e.preventDefault();
  is_drawing = false;
  switch (mode_curr) {
    case 'mode-cursor':
      break;
    case 'mode-line':
      if (length < 10) {
        clearCanvas();
        restoreCanvas();
      }
      break;
    case 'mode-rect':
      if (width < 10 || height < 10) {
        clearCanvas();
        restoreCanvas();
      }
      break;
    case 'mode-circ':
      if (width < 10 || height < 10) {
        clearCanvas();
        restoreCanvas();
      }
      break;
    default:
      break;
  }
};

const handleSvgMouseDown = (e) => {
  e.preventDefault();
  init_x = e.clientX - area_svg.parentElement.offsetLeft;
  init_y = e.clientY - area_svg.parentElement.offsetTop;
  console.log(init_x, init_y);
  switch (mode_curr) {
    case 'mode-cursor':
      is_drawing = false;
      break;
    case 'mode-line':
      is_drawing = true;
      is_element_down = true;
      var newElement = createSvgElement('line', {
        x1: init_x,
        y1: init_y,
        x2: init_x,
        y2: init_y,
        stroke: border_curr,
        'stroke-width': width_curr,
      });
      newElement.addEventListener('mousedown', handleSvgElementMouseDown);
      area_svg.appendChild(newElement);
      operatingSvgElement = newElement;
      break;
    case 'mode-rect':
      is_drawing = true;
      is_element_down = true;
      var newElement = createSvgElement('rect', {
        x: init_x,
        y: init_y,
        width: 0,
        height: 0,
        stroke: border_curr,
        'stroke-width': width_curr,
        fill: fill_curr,
      });
      newElement.addEventListener('mousedown', handleSvgElementMouseDown);
      area_svg.appendChild(newElement);
      operatingSvgElement = newElement;
      break;
    case 'mode-circ':
      is_drawing = true;
      is_element_down = true;
      var newElement = createSvgElement('ellipse', {
        cx: init_x,
        cy: init_y,
        rx: 0,
        ry: 0,
        stroke: border_curr,
        'stroke-width': width_curr,
        fill: fill_curr,
      });
      newElement.addEventListener('mousedown', handleSvgElementMouseDown);
      area_svg.appendChild(newElement);
      operatingSvgElement = newElement;
      break;
    default:
      break;
  }
};

const handleSvgMouseMove = (e) => {
  e.preventDefault();
  if (!is_drawing && !is_dragging) return;

  let curr_x, curr_y, temp_x, temp_y;
  let svg_offset_x = area_svg.parentElement.offsetLeft;
  let svg_offset_y = area_svg.parentElement.offsetTop;

  curr_x = e.clientX >= svg_offset_x ? e.clientX - svg_offset_x : svg_offset_x - e.clientX;
  curr_y = e.clientY >= svg_offset_y ? e.clientY - svg_offset_y : svg_offset_y - e.clientY;
  width = curr_x >= init_x ? curr_x - init_x : init_x - curr_x;
  height = curr_y >= init_y ? curr_y - init_y : init_y - curr_y;
  length = Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2));
  temp_x = curr_x >= init_x ? init_x : init_x - width;
  temp_y = curr_y >= init_y ? init_y : init_y - height;

  switch (mode_curr) {
    case 'mode-cursor':
      draggingElementMove(e);
      break;
    case 'mode-line':
      if (is_drawing) {
        operatingSvgElement.setAttribute('x2', curr_x);
        operatingSvgElement.setAttribute('y2', curr_y);
      }
      break;
    case 'mode-rect':
      if (is_drawing) {
        operatingSvgElement.setAttribute('x', temp_x);
        operatingSvgElement.setAttribute('y', temp_y);
        operatingSvgElement.setAttribute('width', width);
        operatingSvgElement.setAttribute('height', height);
      }
      break;
    case 'mode-circ':
      if (is_drawing) {
        operatingSvgElement.setAttribute('cx', temp_x + width / 2);
        operatingSvgElement.setAttribute('cy', temp_y + height / 2);
        operatingSvgElement.setAttribute('rx', width / 2);
        operatingSvgElement.setAttribute('ry', height / 2);
      }
      break;
    default:
      break;
  }
};

const handleSvgMouseUp = (e) => {
  e.preventDefault();
  is_dragging = false;
  if (is_drawing === true) {
    switch (mode_curr) {
      case 'mode-cursor':
        break;
      case 'mode-line':
        if (length < 10) {
          operatingSvgElement.remove();
        }
        break;
      case 'mode-rect':
        if (width < 10 || height < 10) {
          operatingSvgElement.remove();
        }
        break;
      case 'mode-circ':
        if (width < 10 || height < 10) {
          operatingSvgElement.remove();
        }
        break;
      default:
        break;
    }
    is_drawing = false;
    operatingSvgElement = null;
  } else if (is_element_down === true) {
    clearAllSvgFocus();
    addSvgFocus();
  } else {
    clearAllSvgFocus();
    operatingSvgElement = null;
  }
  is_element_down = false;
};

const handleSvgElementMouseDown = (e) => {
  e.preventDefault();
  if (mode_curr !== 'mode-cursor') return;
  operatingSvgElement = e.target;
  is_element_down = true;
  clearAllSvgFocus();
  addSvgFocus();

  let tag_type = operatingSvgElement.nodeName;
  switch (tag_type) {
    case 'line':
      element_offset_x = e.clientX - parseInt(operatingSvgElement.getAttribute('x1'));
      element_offset_y = e.clientY - parseInt(operatingSvgElement.getAttribute('y1'));
      element_offset_x2 = e.clientX - parseInt(operatingSvgElement.getAttribute('x2'));
      element_offset_y2 = e.clientY - parseInt(operatingSvgElement.getAttribute('y2'));
      break;
    case 'rect':
      element_offset_x = e.clientX - parseInt(operatingSvgElement.getAttribute('x'));
      element_offset_y = e.clientY - parseInt(operatingSvgElement.getAttribute('y'));
      break;
    case 'ellipse':
      element_offset_x = e.clientX - parseInt(operatingSvgElement.getAttribute('cx'));
      element_offset_y = e.clientY - parseInt(operatingSvgElement.getAttribute('cy'));
      break;
    default:
      break;
  }
  is_dragging = true;
};

const handleBtnDeleteOneClick = () => {
  operatingSvgElement.remove();
  operatingSvgElement = null;
  btn_delete_one.disabled = true;
};

const handleEscKeyDown = (e) => {
  e.preventDefault();
  if (e.key === 'Escape' || e.key === 'Esc') {
    if (layer_curr === 'Canvas') {
      is_drawing = false;
      clearCanvas();
      if (saved_canvas_data) restoreCanvas();
    } else if (layer_curr === 'SVG') {
      if (is_drawing) {
        is_drawing = false;
        is_element_down = false;
        operatingSvgElement.remove();
        operatingSvgElement = null;
        btn_delete_one.disabled = true;
      } else if (is_element_down) {
        is_dragging = false;
        is_element_down = false;
        let tag_type = operatingSvgElement.nodeName;
        console.log(tag_type);
        switch (tag_type) {
          case 'line':
            operatingSvgElement.setAttribute("x1", init_x - element_offset_x + area_canvas.parentElement.offsetLeft);
            operatingSvgElement.setAttribute("y1", init_y - element_offset_y + area_canvas.parentElement.offsetTop);
            operatingSvgElement.setAttribute("x2", init_x - element_offset_x2 + area_canvas.parentElement.offsetLeft);
            operatingSvgElement.setAttribute("y2", init_y - element_offset_y2 + area_canvas.parentElement.offsetTop);
            break;
          case 'rect':
            operatingSvgElement.setAttribute("x", init_x - element_offset_x + area_canvas.parentElement.offsetLeft);
            operatingSvgElement.setAttribute("y", init_y - element_offset_y + area_canvas.parentElement.offsetTop);
            break;
          case 'ellipse':
            operatingSvgElement.setAttribute("cx", init_x - element_offset_x + area_canvas.parentElement.offsetLeft);
            operatingSvgElement.setAttribute("cy", init_y - element_offset_y + area_canvas.parentElement.offsetTop);
            break;
          default:
            break;
        }
        operatingSvgElement = null;
        btn_delete_one.disabled = true;
      }
      
    }
  }
};



// Binding Event Listeners

layer_arr.forEach((element) => {
  element.addEventListener('change', handleLayerChange);
});

mode_arr.forEach((element) => {
  element.addEventListener('click', handleModeClick);
});

border_arr.forEach((element) => {
  element.addEventListener('click', handleBorderClick);
});

fill_arr.forEach((element) => {
  element.addEventListener('click', handleFillClick);
});

border_width.addEventListener('change', handleBorderWidthChange);

btn_delete_all.addEventListener('click', handleBtnDeleteAllClick);
btn_delete_one.addEventListener('click', handleBtnDeleteOneClick);

area_canvas.addEventListener('mousedown', handleCanvasMouseDown);
area_canvas.addEventListener('mousemove', handleCanvasMouseMove);
area_canvas.addEventListener('mouseup', handleCanvasMouseUp);

area_svg.addEventListener('mousedown', handleSvgMouseDown);
area_svg.addEventListener('mousemove', handleSvgMouseMove);
area_svg.addEventListener('mouseup', handleSvgMouseUp);

document.addEventListener('keydown', handleEscKeyDown);
