function MinesweeperUI($lBoard, audio) {
  this.board = $lBoard;
  this.game = new Minesweeper();
  this.render();
  this.audio = audio;
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
      var classToAdd = "color" + tileDispNum.toString();
      div.addClass(classToAdd);
    }
    if(gameTile.bomb){
      div.removeClass('explored');
      div.addClass('bomb');
      div.html("bomb");
      
    }
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
    debugger
    alert("you've won");
    this.reset();
  } else if (this.game.lost()){
    var count = 1;
    this.audio.play();
    var animationInterval = window.setInterval(function() {
      clickedTile.addClass("explosion");
      var explodeClass = "explode-" + count;
      if(count > 1){
        var classToRemove = "explode-" + (count-1);
        clickedTile.removeClass(classToRemove);
      }
      clickedTile.addClass(explodeClass);
      count++;
    },40)
    var that = this;
    window.setTimeout(function() {
      clearInterval(animationInterval);
      alert("you lose");
      that.reset();
    },640);
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

MinesweeperUI.prototype.reset = function () {
  this.game = new Minesweeper();
  this.render();
};
