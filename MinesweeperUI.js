function minesweeperUI(board) {
  this.$board = board;
  this.game = new Minesweeper();
}

minesweeperUI.prototype.render = function() {

  for (var i = 0; i < 100; i++){
    var div = document.createElement("div");
    div = $l(div);
    div.addClass('tile');
    div.attr('data-row', Math.floor(i / 10));
    div.attr('data-col', i % 10);
    this.$board.append(div);
  }

  // this.$board.html(divsArray.join(""));
  $l(".tile").on("click", function() {
     console.log($l(this).attr("data-row")) });
}
