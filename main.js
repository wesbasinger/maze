// grab some globals for drawing on the canvas
var EventEmitter = require('events').EventEmitter;
const globals = require('./globals');
var levels = require('./levels');

var gameEmitter = new EventEmitter();

const ctx = globals.ctx;
const tileSize = globals.tileSize;

var tiles = {
  0: 'black',
  1: 'yellow',
  2: 'blue',
  3: 'red'
}

var moveQueue = [];

var game = {
  frozen: false,
  currentLevel: 1,
  charX: 1,
  charY: 1,
  grid: levels,
  make: function() {
    debugger;
    this.grid[0][this.charX][this.charY] = 2;
    for (var i=0; i < this.grid[0].length; i++) {
      var row = tileSize * i;
      for (var j=0; j < this.grid[0][0].length; j++) {
        var col = tileSize * j;
        ctx.beginPath();
        ctx.rect(row, col, tileSize, tileSize);
        ctx.fillStyle = tiles[this.grid[0][i][j]];
        ctx.fill();
        ctx.closePath();
      }
    }
  },
  moveRight: function() {
    if (this.grid[0][this.charX + 1][this.charY] === 0) {
      this.grid[0][this.charX][this.charY] = 0;
      this.charX += 1;
      this.grid[0][this.charX][this.charY] = 2;
    } else if (this.grid[0][this.charX + 1][this.charY] === 3) {
      this.levelUp();
    }
  },
  moveLeft: function() {
    if (this.grid[0][this.charX - 1][this.charY] === 0) {
      this.grid[0][this.charX][this.charY] = 0;
      this.charX -= 1;
      this.grid[0][this.charX][this.charY] = 2;
    } else if (this.grid[0][this.charX - 1][this.charY] === 3) {
      this.levelUp();
    }
  },
  moveUp: function() {
    if (this.grid[0][this.charX][this.charY -1] === 0) {
      this.grid[0][this.charX][this.charY] = 0;
      this.charY -= 1;
      this.grid[0][this.charX][this.charY] = 2;
    } else if (this.grid[0][this.charX][this.charY -1] === 3) {
      this.levelUp();
    }
  },
  moveDown: function() {
    if (this.grid[0][this.charX][this.charY + 1] === 0) {
      this.grid[0][this.charX][this.charY] = 0;
      this.charY += 1;
      this.grid[0][this.charX][this.charY] = 2;
    } else if (this.grid[0][this.charX][this.charY + 1] === 3) {
      this.levelUp();
    }
  },
  levelUp: function() {
    moveQueue = [];
    if (this.grid.length === 1) {
      gameEmitter.emit("gameOver");
    } else {
      this.frozen = true;
      this.currentLevel ++;
      gameEmitter.emit('leveledUp', {currentLevel: this.currentLevel})
      this.charX = 1;
      this.charY = 1;
      this.grid = this.grid.slice(1);
      this.frozen = false;
    }
  }
}

var level = document.getElementById('level');
var messages = document.getElementById('messages');

gameEmitter.on('gameOver', function() {
  game.frozen = true;
  messages.innerText = "You win!";
});

gameEmitter.on('leveledUp', function(data) {
  level.innerText = "";
  level.innerText = data.currentLevel;
})


// setting some globals for keypresses
var rightPressed = false,
    leftPressed = false,
    upPressed = false,
    downPressed = false

/* Got the next three chunks from the MDN
   tutorial
*/

function keyDownHandler(e) {
    if(e.keyCode == 39) {
        moveQueue.push('right');
    } else if(e.keyCode == 37) {
        moveQueue.push('left');
    } else if (e.keyCode == 38) {
        moveQueue.push('up');
    } else if (e.keyCode == 40) {
        moveQueue.push('down');
    }
}

document.addEventListener("keydown", keyDownHandler, false);

// continuous drawing loop;
function draw() {
    if(!game.frozen && moveQueue.length > 0) {
        switch(moveQueue[0]) {
            case 'right':
                if(game.charX < 19) game.moveRight();
                break;
            case 'left':
                if(game.charX > 0) game.moveLeft();
                break;
            case 'down':
                if(game.charY < 19) game.moveDown();
                break;
            case 'up':
                if(game.charY > 0) game.moveUp();
                break;
        }
    }
    moveQueue = [];
    game.make();
  //requestAnimationFrame(draw);
}


// calling this for the animation effect
setInterval(function() {
  draw();
}, 90);
