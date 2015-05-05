function Tile (coords, grid) {
  this.coords = coords;
  this.bomb = false;
  this.explored = false;
  this.flagged = false;
  this.grid = grid;
};

var _onBoard = function(row, col) {
  if(row < 0 || col < 0)
    return false;
  if(row > 9 || col > 9){
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
  if(this.neighborBombCount() === 0){
    this.neighbors().forEach(function(tile){
      tile.explore();
    });
  }
};

Tile.prototype.flag = function(){
  //sets flagged to true
  this.flagged = true;
};

Tile.prototype.neighbors = function(){
  var neighbors = [];
  var possibleNeighborOffsets = [[1,-1],[1,0],[1,1],[0,-1],[0,1],[-1,-1],[-1,0],[-1,1]];
  //put them in an array of neighbors to return only if the coords are on the board
  for(var i = 0; i < possibleNeighborOffsets.length; i ++){
    var offset = possibleNeighborOffsets[i];
    //this.coords is reading data-col-id and data-row-id so uses 1,1 for 0,0
    var neighborRow = offset[0] + (this.coords.row);
    var neighborCol = offset[1] + (this.coords.col);
    
    if(_onBoard(neighborRow, neighborCol)){
      var tileOnGrid = this.grid[neighborRow][neighborCol];
      console.log("neighbors is : " + neighbors);
      neighbors.push(tileOnGrid);
    }
  }
  return neighbors;
};

Tile.prototype.neighborBombCount = function(){
  var count = 0;
  this.neighbors().forEach(function(tile) {
    if(tile.bomb){
      count++;
    }
  });
  return count;
};

