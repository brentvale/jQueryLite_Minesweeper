var DELTAS = [
  [-1, -1],
  [-1,  0],
  [-1,  1],
  [ 0, -1],
  [ 0,  1],
  [ 1, -1],
  [ 1,  0],
  [ 1,  1]
];

function Minesweeper(board) {
  this.board = board;
  this.grid = this.createState();
  this.placeBombs();z
};

Minesweeper.prototype.won = function () {
  //iterate through the grid
  var won = true;
  for(var i = 0; i < this.grid.length; i++){
    if(!this.grid[i].explored && !this.grid[i].bomb){
       won = false;
       return won;
    }
  }
  //check each tiles explored + bombed
  return won;
};

Minesweeper.prototype.lost = function () {
  var lost = false;
  for(var i = 0; i < this.grid.length; i++){
    if(this.grid[i].explored && this.grid[i].bomb){
      lost = true;
    }
  }
  //check each tiles explored + bombed
  return lost;
};

Minesweeper.prototype.createState = function () {
  var tilesArray = []
  for(var i = 0; i < 10; i++){
    for(var j = 0; j < 10; j++){
      tilesArray.push(
        new Tile(this.board, [i,j])
      );
    }
  }
  
  return tilesArray;
};

Minesweeper.prototype.placeBombs = function () {
  
};

Minesweeper.prototype.tile = function (coords) {
  
};

Minesweeper.prototype.explore = function (coords) {
  
};

Minesweeper.prototype.flag = function (coords) {
  
};