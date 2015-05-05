function Minesweeper(board) {
  this.grid = this.createState();
  this.bombsArray = this.createIndeciesForBombs();
  this.placeBombs();
};

Minesweeper.prototype.won = function () {
  //iterate through the grid
  var won = true;
  for(var i = 0; i < this.grid.length; i++){
    for(var j = 0; j < this.grid[i].length; j++){
      if(!this.grid[i][j].explored && !this.grid[i][j].bomb){
        won = false;
      }
    }
    //check each tiles explored + bombed
    return won;
  }
};

Minesweeper.prototype.lost = function () {
  var lost = false;
  for(var i = 0; i < this.grid.length; i++){
    for(var j = 0; j < this.grid[i].length; j++){
      if(this.grid[i][j].explored && this.grid[i][j].bomb){
        lost = true;
      }
    }
  }
  //check each tiles explored + bombed
  return lost;
};

Minesweeper.prototype.createState = function () {
  var tilesArray = []
  for(var i = 0; i < 10; i++){
    tilesArray.push([]);
    for(var j = 0; j < 10; j++){
      tilesArray[i].push(
        new Tile({row:i, col:j}, tilesArray)
      );
    }
  }
  return tilesArray;
};

Minesweeper.prototype.createIndeciesForBombs = function () {
  //will eventually take a number depending on the difficulty level
  //default: choose 15 tiles to have bombs
  var bombers = [];
  while(bombers.length < 15){
    var bombIndex = Math.floor(Math.random() * 100);
    if(bombers.indexOf(bombIndex) < 0){
      bombers.push(bombIndex)
    } 
  }
  return bombers;
};

Minesweeper.prototype.placeBombs = function () {
  for(var i = 0; i < this.bombsArray.length; i++){
    var tensBombIndex = Math.floor(this.bombsArray[i] / 10);
    var onesBombIndex = this.bombsArray[i] % 10;
    var tileForBomb = this.grid[tensBombIndex][onesBombIndex];
    tileForBomb.bomb = true;
  }
};

Minesweeper.prototype.tile = function (coords) {
  return this.grid[coords.row - 1][coords.col - 1];
};

Minesweeper.prototype.explore = function (coords) {
  this.tile(coords).explore();
};

Minesweeper.prototype.flag = function (coords) {
  this.tile(coords).flag();
};