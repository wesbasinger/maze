// grab some globals for drawing on the canvas
var EventEmitter = require('events').EventEmitter;
const globals = require('./globals');
var levels = require('./levels');

var gameEmitter = new EventEmitter();

const ctx = globals.ctx;
const tileSize = globals.tileSize;
var frozen = false;

var tiles = {
  0: 'black',
  1: 'yellow',
  2: 'blue',
  3: 'red'
}

var currentLevel = 1

var game = {
  currentLevel: 1,
  charX: 1,
  charY: 1,
  grid: levels,
  make: function() {
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
    /*  These five lines are debugging code
     ========================================
    */
    ctx.font = '10px Arial';
    ctx.fillStyle = 'white';
    ctx.fillText(`charX: ${this.charX}`, 10, 10);
    ctx.fillText(`charY: ${this.charY}`, 10, 20);
    ctx.fillText(`charY: ${[this.charX, this.charY]}`, 200, 20);
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
    if (this.grid.length === 1) {
      gameEmitter.emit("gameOver");
    } else {
      this.currentLevel ++;
      gameEmitter.emit('leveledUp', {currentLevel: this.currentLevel})
      frozen = true;
      this.charX = 1;
      this.charY = 1;
      this.grid = this.grid.slice(1);
      frozen = false;
    }
  }
}

gameEmitter.on('gameOver', function() {
  console.log("Game over!");
});

gameEmitter.on('leveledUp', function(data) {
  console.log("currentLevel is " + data.currentLevel);
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
        rightPressed = true;
    } else if(e.keyCode == 37) {
        leftPressed = true;
    } else if (e.keyCode == 38) {
        upPressed = true;
    } else if (e.keyCode == 40) {
        downPressed = true;
    }
}

function keyUpHandler(e) {
    if(e.keyCode == 39) {
        rightPressed = false;
    } else if(e.keyCode == 37) {
        leftPressed = false;
    } else if (e.keyCode == 38) {
        upPressed = false;
    } else if (e.keyCode == 40) {
        downPressed = false;
    }
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

// continuous drawing loop;
function draw() {
  if (rightPressed && game.charX < 19 && !frozen) {
    game.moveRight();
  } else if ((leftPressed && game.charX > 0 && !frozen)) {
    game.moveLeft();
  } else if ((downPressed && game.charY < 19 && !frozen)) {
    game.moveDown();
  } else if ((upPressed && game.charY > 0 && !frozen)) {
    game.moveUp();
  }
  game.make();
  requestAnimationFrame(draw);
}


// calling this for the animation effect
draw();
