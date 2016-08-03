// grab some globals for drawing on the canvas
const globals = require('./globals');
var levels = require('./levels');

const ctx = globals.ctx;
const tileSize = globals.tileSize;

var tiles = {
  0: 'black',
  1: 'yellow',
  2: 'blue',
  3: 'red'
}

var currentLevel = 2;


var game = {
  charX: 0,
  charY: 0,
  grid: levels[currentLevel],
  make: function() {
    this.grid[this.charX][this.charY] = 2;
    for (var i=0; i < this.grid.length; i++) {
      var row = tileSize * i;
      for (var j=0; j < this.grid[0].length; j++) {
        var col = tileSize * j;
        ctx.beginPath();
        ctx.rect(row, col, tileSize, tileSize);
        ctx.fillStyle = tiles[this.grid[i][j]];
        ctx.fill();
        ctx.closePath();
      }
    }
    ctx.font = '10px Arial';
    ctx.fillStyle = 'white';
    ctx.fillText(`charX: ${this.charX}`, 10, 10);
    ctx.fillText(`charY: ${this.charY}`, 10, 20);
    ctx.fillText(`charY: ${[this.charX, this.charY]}`, 200, 20);
  },
  moveRight: function() {
    if (this.grid[this.charX + 1][this.charY] === 0) {
      this.grid[this.charX][this.charY] = 0;
      this.charX += 1;
      this.grid[this.charX][this.charY] = 2;
    }
  },
  moveLeft: function() {
    if (this.grid[this.charX - 1][this.charY] === 0) {
      this.grid[this.charX][this.charY] = 0;
      this.charX -= 1;
      this.grid[this.charX][this.charY] = 2;
    }
  },
  moveUp: function() {
    if (this.grid[this.charX][this.charY -1] === 0) {
      this.grid[this.charX][this.charY] = 0;
      this.charY -= 1;
      this.grid[this.charX][this.charY] = 2;
    }
  },
  moveDown: function() {
    if (this.grid[this.charX][this.charY + 1] === 0) {
      this.grid[this.charX][this.charY] = 0;
      this.charY += 1;
      this.grid[this.charX][this.charY] = 2;
    }
  }
}

module.exports = game;
