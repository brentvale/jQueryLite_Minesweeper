function MinesweeperUI($lBoard) {
  this.board = $lBoard;
  this.game = new Minesweeper(this.board);
  this.render();
}

MinesweeperUI.prototype.render = function() {

  for (var i = 0; i < 100; i++){
    var div = document.createElement("div");
    div = $l(div);
    div.addClass('tile');
    div.attr('data-row', Math.floor(i / 10) + 1);
    div.attr('data-col', i % 10 + 1);
    this.board.append(div);
  }

  this.board.find('.tile').on("click", this.handleClick.bind(this));
  this.board.find('.tile').on("contextmenu", this.handleRightClick.bind(this));
}

MinesweeperUI.prototype.handleClick = function (event) {
  event.preventDefault();
  var clickedTile = $l(event.target);
  var tileRow = clickedTile.attr("data-row");
  var tileCol = clickedTile.attr("data-col");
  if(this.game.won()){
    debugger
    alert("you've won");
  } else if (this.game.lost()){
    alert("you've lost");
  } else {
    alert("still playing");
  }

};

MinesweeperUI.prototype.handleRightClick = function (event) {
  event.preventDefault();
  //
};