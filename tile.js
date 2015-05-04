function Tile (coords) {
  this.coords = coords;
  this.bombed = false;
  this.explored = false;
  this.flagged = false;
  this.grid = null;
};

var _onBoard = function(row, col) {
  if(row < 1 || col < 1)
    return false;
  if(row > 10 || col > 10){
    return false;
  }
  return true;
};

Tile.prototype.explore = function(){
  //if tile is explored return
  if(this.explored){
    return;
  }
  //set explored to true
  this.explored = true;
  //if no neighbors have bombs explore each of the neighbors
  if(true){
    this.neighbors().forEach(function(tile){
      tile.explore();
    });
  }
};

Tile.prototype.flag = function(){
  //sets flagged to true
};

Tile.prototype.neighbors = function(){
  var neighbors = [];
  var possibleNeighborOffsets = [[1,-1],[1,0],[1,1],[0,-1],
  [0,1],[-1,-1],[-1,0],[-1,1]];
  //put them in an array of neighbors to return only if the coords are on the board
  for(var i = 0; i < possibleNeighborOffsets.length; i ++){
    var offset = possibleNeighborOffsets[i];
    var neighborRow = offset[0] + this.coords.row;
    var neighborCol = offset[1] + this.coords.col;
    if(_onBoard(neighborRow, neighborCol)){
      debugger
      neighbors.push(this.grid[neighborRow][neighborCol]);
    }
  }
  return neighbors;
};

Tile.prototype.neighborBombCount = function(){
  
};

