var colors = ["blue", "green", "red", "purple", "brown"]

function MinesweeperUI($lBoard) {
  this.board = $lBoard;
  this.game = new Minesweeper();
  this.render();
}

MinesweeperUI.prototype.render = function() {
  this.board.empty();
  for (var i = 0; i < 100; i++){
    var div = document.createElement("div");
    div = $l(div);
    div.addClass('tile');
    var row = Math.floor(i / 10) + 1;
    var col = i % 10 + 1;
    div.attr('data-row', row);
    div.attr('data-col', col);
    this.board.append(div);
    var coords = {row:row, col:col};
    var gameTile = this.game.tile(coords);
    
    if(gameTile.explored){
      div.addClass('explored');
      var tileDispNum = gameTile.neighborBombCount();
      div.html(tileDispNum.toString());
      var divColor = 
    }
    // if(gameTile.bomb){
//       div.removeClass('explored');
//       div.addClass('bomb');
//       div.html("bomb");
//     }
    if(gameTile.flagged){
      div.addClass('flagged');
    }
  
  }

  this.board.find('.tile').on("click", this.handleClick.bind(this));
  this.board.find('.tile').on("contextmenu", this.handleRightClick.bind(this));
}

MinesweeperUI.prototype.handleClick = function (event) {
  var clickedTile = $l(event.target);
  var tileRow = clickedTile.attr("data-row");
  var tileCol = clickedTile.attr("data-col");
  this.game.explore({row:tileRow, col:tileCol});
  
  
  if(this.game.won()){
    alert("you've won");
  } else if (this.game.lost()){
    alert("you've lost");
  } else {
    this.render();
  }

};

MinesweeperUI.prototype.handleRightClick = function (event) {
  event.preventDefault();
  var clickedTile = $l(event.target);
  var tileRow = clickedTile.attr("data-row");
  var tileCol = clickedTile.attr("data-col");
  this.game.flag({row:tileRow, col:tileCol});
  this.render();
};