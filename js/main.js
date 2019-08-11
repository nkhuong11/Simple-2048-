var GAME_SIDE;
var GAME_SIDE_ELEMENT;
var TILES_STATE;
var TILES_ELEMENTS;
var SCORE_ELEMENT;
var SCORE;
var BONOUS;
var INITIAL_X; // identify touch
var INITIAL_Y;
var FINAL_X;
var FINAL_Y;

function new_game() {
  GAME_SIDE_ELEMENT = document.getElementById("side");
  GAME_SIDE = parseInt(GAME_SIDE_ELEMENT.value);
  if(isNaN(GAME_SIDE) || (GAME_SIDE < 2)) {
    GAME_SIDE = 4;
    document.getElementById("side").value = 4;
  }

  var grid_container = document.getElementById('grid-container');
  grid_container.innerHTML = "";
  
  TILES_STATE = new Array(GAME_SIDE);
  for (let i = 0; i < GAME_SIDE; i++) {
    TILES_STATE[i] = new Array(GAME_SIDE);
    let grid_row = document.createElement("DIV");
    grid_row.setAttribute("class", "grid-row");
    grid_row.setAttribute("style", "height: calc(100%/" + GAME_SIDE + ")");
    grid_container.appendChild(grid_row);
    for (let j = 0; j < GAME_SIDE; j++) {
      let tile_wrapper = document.createElement("DIV");
      tile_wrapper.setAttribute("class", "tile-wrapper");
      tile_wrapper.setAttribute("style", "width: calc(100%/" + GAME_SIDE + ")");

      let tile = document.createElement("DIV");
      tile.setAttribute("class", "tile");
      //tile.setAttribute("style", "width: calc(100%/" + GAME_SIDE + ");font-size: calc(100vmin/" + (GAME_SIDE + 8) + " - 10px)");
      
      tile_wrapper.appendChild(tile);
      grid_row.appendChild(tile_wrapper);

      TILES_STATE[i][j] = {value: 0, isMerged: false};
    }
  }
  TILES_ELEMENTS = document.getElementsByClassName("tile");
  SCORE = 0;
  BONOUS = 0;
  SCORE_ELEMENT = document.getElementsByClassName("main-score")[0];
  SCORE_ELEMENT.innerHTML = SCORE
  newblock();
}

function newblock(){
  let empty_cells = [];
  for (let i = 0; i < GAME_SIDE; i++) {
    for (let j = 0; j < GAME_SIDE; j++) {
      if (TILES_STATE[i][j].value === 0) {
        empty_cells.push({x: i, y: j});
      }
    }
  }
  
  if(empty_cells.length > 1) {
    let cell = empty_cells[Math.floor(Math.random() * empty_cells.length)];
    generateBlock(cell.x, cell.y, 2);
  } else {
    // console.log('GAME OVER');
  }
}

function generateBlock(x, y, value) {
  TILES_STATE[x][y].value = value;
  TILES_ELEMENTS[(x * GAME_SIDE) + y].innerHTML = value;
  TILES_ELEMENTS[(x * GAME_SIDE) + y].style.background = "rgb("+(170+(value*50)%155)+","+(160+(value*74)%155)+","+(150+(value*10)%155)+", 0.95)";
  TILES_ELEMENTS[(x * GAME_SIDE) + y].setAttribute("class", `tile tile-new tile-${value}`);
}


function moveLeft() {
  for (let i = 0; i < GAME_SIDE; i++) {
    TILES_STATE[i] = operate(TILES_STATE[i]);
  }
  renderTiles();
  updateScore()
  newblock();
}

function moveRight() {
  TILES_STATE = rowsFlipped(TILES_STATE);
  for (let i = 0; i < GAME_SIDE; i++) {
    TILES_STATE[i] = operate(TILES_STATE[i]);
  }
  // flip back to normal
  TILES_STATE = rowsFlipped(TILES_STATE);
  renderTiles();
  updateScore();
  newblock();

}

function moveUp() {
  TILES_STATE = rotateLeft(TILES_STATE);
  for (let i = 0; i < GAME_SIDE; i++) {
    TILES_STATE[i] = operate(TILES_STATE[i]);
  }
  TILES_STATE = rotateRight(TILES_STATE);
  renderTiles();
  updateScore();
  newblock();
}

function moveDown() {
  TILES_STATE = rotateRight(TILES_STATE);
  for (let i = 0; i < GAME_SIDE; i++) {
    TILES_STATE[i] = operate(TILES_STATE[i]);
  }
  TILES_STATE = rotateLeft(TILES_STATE);
  renderTiles();
  updateScore();
  newblock();
}

function operate(row) {
  row = slideTiles(row);
  row = mergeTiles(row);
  row = slideTiles(row);
  return row;
}

// Using for moveRight;
function rowsFlipped(matrix) {
  let temp_value, temp_isMerged;
  let middle = Math.floor(GAME_SIDE/2);
  for (let i = 0; i < GAME_SIDE; i++) {
    for (let j = 0; j < middle; j++) {
      temp_value = matrix[i][j].value;
      temp_isMerged = matrix[i][j].isMerged;

      matrix[i][j].value = matrix[i][GAME_SIDE - j - 1].value;
      matrix[i][j].isMerged = matrix[i][GAME_SIDE - j - 1].isMerged;

      matrix[i][GAME_SIDE - j - 1].value = temp_value;
      matrix[i][GAME_SIDE - j - 1].isMerged = temp_isMerged;
    }
  }
  return matrix;
}

// Using for moveUp & moveDown
function rotateLeft(matrix){
  let temp_value, temp_isMerged;
  let N = matrix.length;
  
  for (let x = 0; x < N/2; x++) {
    for (let y = x; y < N - x - 1; y++ ) {
      temp_value = matrix[x][y].value;
      temp_isMerged = matrix[x][y].isMerged;

      matrix[x][y].value = matrix[y][N-1-x].value;
      matrix[x][y].isMerged = matrix[y][N-1-x].isMerged;


      matrix[y][N-1-x].value = matrix[N-1-x][N-1-y].value;
      matrix[y][N-1-x].isMerged = matrix[N-1-x][N-1-y].isMerged;

      matrix[N-1-x][N-1-y].value = matrix[N-1-y][x].value;
      matrix[N-1-x][N-1-y].isMerged = matrix[N-1-y][x].isMerged;

      matrix[N-1-y][x].value = temp_value;
      matrix[N-1-y][x].isMerged = temp_isMerged;
    }
  }
  return matrix;
}

function rotateRight(matrix){
  let temp_value, temp_isMerged;
  let N = matrix.length;
  
  for (let x = 0; x < N/2; x++) {
    for (let y = x; y < N - x - 1; y++ ) {
      temp_value = matrix[x][y].value;
      temp_isMerged = matrix[x][y].isMerged;

      matrix[x][y].value = matrix[N-1-y][x].value;
      matrix[x][y].isMerged = matrix[N-1-y][x].isMerged;

      matrix[N-1-y][x].value = matrix[N-1-x][N-1-y].value;
      matrix[N-1-y][x].isMerged = matrix[N-1-x][N-1-y].isMerged;

      matrix[N-1-x][N-1-y].value = matrix[y][N-1-x].value;
      matrix[N-1-x][N-1-y].isMerged = matrix[y][N-1-x].isMerged;

      matrix[y][N-1-x].value = temp_value;
      matrix[y][N-1-x].isMerged = temp_isMerged;
    }
  }
  return matrix;
}

function slideTiles(row) {
  let newRow = new Array(row.length);
  for (let i = 0; i < row.length; i++) {
    newRow[i] = {value: 0, isMerged: false}
  }

  let index = 0
  for(let i = 0; i < row.length; i++) {
    if (row[i].value !== 0) {
      newRow[index].value = row[i].value;
      newRow[index].isMerged = row[i].isMerged;
      index++;
    }
  }
  return newRow;
}

function mergeTiles(row) {
  for(let i = 0; i < row.length - 1; i++) {
    if (row[i].value && row[i + 1].value) {
      if(row[i].value === row[i + 1].value) {
        BONOUS = BONOUS + row[i].value + row[i + 1].value;
        row[i].value = row[i].value + row[i + 1].value;
        row[i].isMerged = true;
        row[i + 1].value = 0;
        i++;
      }
    }
  }

  return row;
}


function renderTiles() {
  for(let x = 0; x < GAME_SIDE; x++) {
    for(let y = 0; y < GAME_SIDE; y++) {
      TILES_ELEMENTS[(x * GAME_SIDE) + y].style.animationName = "";
      if (TILES_STATE[x][y].value !== 0) {
        let value = TILES_STATE[x][y].value;
        TILES_ELEMENTS[(x * GAME_SIDE) + y].innerHTML = value;
        TILES_ELEMENTS[(x * GAME_SIDE) + y].style.background = "rgb("+(170+(value*50)%155)+","+(160+(value*74)%155)+","+(150+(value*10)%155)+", 0.95)";
        if (TILES_STATE[x][y].isMerged === true) {
          //reset isMerged to false
          TILES_STATE[x][y].isMerged = false;
          TILES_ELEMENTS[(x * GAME_SIDE) + y].style.animationName = "pop";
        }
        TILES_ELEMENTS[(x * GAME_SIDE) + y].setAttribute("class", `tile tile-${value}`);
      } else {
        TILES_ELEMENTS[(x * GAME_SIDE) + y].innerHTML = "";
        TILES_ELEMENTS[(x * GAME_SIDE) + y].setAttribute("class", "tile tile-hide");
        TILES_ELEMENTS[(x * GAME_SIDE) + y].style.background = "transparent";
      }
      
      // let styleAttribute = TILES_ELEMENTS[(x * GAME_SIDE) + y].style;
      // console.log(styleAttribute);
      

    }
  }
}

function changeSide(value){
  GAME_SIDE = parseInt(GAME_SIDE_ELEMENT.value);
  GAME_SIDE += value;
  GAME_SIDE_ELEMENT.value = GAME_SIDE;
}

function updateScore() {
  SCORE_ELEMENT.setAttribute("class", "main-score");
  if (BONOUS !== 0) {
    SCORE += BONOUS;
    SCORE_ELEMENT.setAttribute("class", "main-score score-change");
    SCORE_ELEMENT.innerHTML = SCORE;
    BONOUS = 0;
  }
  
}


function identifier(d, startClick){
  if( startClick === true ){
    INITIAL_X = d.clientX;
    INITIAL_Y = d.clientY;
  }
  else {
    FINAL_X = d.clientX;
    FINAL_Y = d.clientY;
    dist_x = FINAL_X - INITIAL_X;
    dist_y = FINAL_Y - INITIAL_Y;

    if( Math.abs(dist_x) > Math.abs(dist_y)){
      if(dist_x > 25){
        moveRight();
      }
      else if(dist_x < -25){
        moveLeft();
      }
    }
    else{
      if(dist_y > 25){
        moveDown();
      }
      else if(dist_y < -25){
        moveUp();
      }
    }
  }
}

function touchStart(d){
  INITIAL_X = d.touches[0].clientX;
  INITIAL_Y = d.touches[0].clientY;
  console.log(d.touches);
}

function touchEnd(d){
    FINAL_X = d.changedTouches[0].clientX;
    FINAL_Y = d.changedTouches[0].clientY;
    dist_x = FINAL_X - INITIAL_X;
    dist_y = FINAL_Y - INITIAL_Y;
    if(Math.abs(dist_x) > Math.abs(dist_y)){
      if(dist_x > 25){
        moveRight();
      }
      else if(dist_x < -25){
        moveLeft();
      }
    }
    else{
      if(dist_y > 25){
        moveDown();
      }
      else if(dist_y < -25){
        moveUp();
      }
    }
}

window.onkeydown = function(event){
  switch(event.keyCode) {
    case 37:
      // move left
      moveLeft();
      break;
    case 38:
      // move up
      moveUp();
      break;
    case 39:
      // move right
      moveRight();
      break;
    case 40:
      // move down
      moveDown();
      break;
    case 13:
      new_game();
      break;
    default:
      return;
  }
};

window.onload = function(){
  var devicePixelRatio = window.devicePixelRatio;
  var screen_height = window.screen.height * devicePixelRatio;
  var screen_width = window.screen.width * devicePixelRatio;
  
  console.log(window.devicePixelRatio);
  var menu_element = document.getElementById("menu");
  var grid_container = document.getElementById("grid-container");
  if (screen_height < screen_width) {
    grid_container.style.height = (screen_height * 0.73) + "px";
    grid_container.style.width = grid_container.style.height;
  } else {
    grid_container.style.height = (screen_width * 0.95) + "px";
    grid_container.style.width = grid_container.style.height;
  }
  
  grid_container.addEventListener('touchstart',touchStart,{passive : true});
  grid_container.addEventListener('touchend',touchEnd,{passive : true});

  var min = (Math.min(grid_container.offsetHeight, grid_container.offsetWidth) - 70) * devicePixelRatio;

 
  menu_element.style.left = "calc((100% - " + min + "px)/2)";
  menu_element.style.top = "calc((100% - " + min + "px)/2 - 35px)";
  menu_element.style.width = min + "px";
  
  grid_container.style.top = "calc((100% - " + min + "px)/2 + 35px)";
  grid_container.style.left = "calc((100% - " + min + "px)/2)";
  grid_container.style.height = min + "px";
  grid_container.style.width = min + "px"
  new_game();
};