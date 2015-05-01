function Tile (board, coords) {
  this.board = board;
  this.coords = coords;
  this.bombed = false;
  this.explored = false;
  this.flagged = false;
};

var _onBoard = function(coords) {
  //check if coords are on the board
};



Tile.prototype.explore = function(){
  //if tile is explored return
  
  //set explored to true
  
  //if no neighbors have bombs explore each of the neighbors
};

Tile.prototype.flag = function(){
  //sets flagged to true
};

Tile.prototype.neighbors = function(){
  //function does not take an argument bc I have access to coords 
  //as being part of the tile class
  
  //use my coords to find the coords of all my neighbors
  
  //put them in an array of neighbors to return only if the coords are on the board
};

Tile.prototype.neighborBombCount = function(){
  //return the number of bombs on neighbor
};

