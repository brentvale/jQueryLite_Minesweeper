function MinesweeperUI($lBoard, $lshowBombs, audio) {
  this.board = $lBoard;
  this.showBombsDiv = $lshowBombs;
  this.game = new Minesweeper();
  this.render();
  this.audio = audio;
  this.showBombs = false;
}

MinesweeperUI.prototype.render = function() {
  this.board.empty();
  this.showBombsDiv.empty();
  //place tiles
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
      if(this.showBombs){
        div.removeClass('explored');
        div.addClass('bomb');
        div.html("bomb");
      }
    }
    if(gameTile.flagged){
      div.addClass('flagged');
    }
  }
  //place show bombs button
  var showBombsButton = document.createElement("div");
  showBombsButton = $l(showBombsButton);
  var buttonText;
  if(this.showBombs){
    buttonText = "Hide Bombs"
  } else {
    buttonText = "Show Bombs"
  }
  showBombsButton.html(buttonText);
  showBombsButton.addClass("show");
  this.showBombsDiv.append(showBombsButton);
  //add event handlers
  this.board.find('.tile').on("click", this.handleClick.bind(this));
  this.board.find('.tile').on("contextmenu", this.handleRightClick.bind(this));
  this.showBombsDiv.find('.show').on("click", this.handleShowBombsClick.bind(this));
}

MinesweeperUI.prototype.handleClick = function (event) {
  var clickedTile = $l(event.target);
  var tileRow = clickedTile.attr("data-row");
  var tileCol = clickedTile.attr("data-col");
  this.game.explore({row:tileRow, col:tileCol});
  
  
  if(this.game.won()){
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

MinesweeperUI.prototype.handleShowBombsClick = function() {
  if(this.showBombs){
    this.showBombs = false;
  } else {
    this.showBombs = true;
  }
  this.render();
};
