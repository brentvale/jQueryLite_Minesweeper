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

function Minesweeper() {

}

function Tile (board, pos) {
  this.board = board;
  this.pos = pos;
  this.bombed = false;
  this.explored = false;
  this.flagged = false;
}

Tile.prototype.isBombed = function(){
  return this.bombed;
}

Tile.prototype.isExplored = function(){
  return this.explored;
}

Tile.prototype.isFlagged = function(){
  return this.flagged;
}

function Board() {

}
