// grab some globals for drawing on the canvas
const globals = require('./globals');
var levels = require('./levels');

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
  charX: 1,
  charY: 1,
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
    if (this.grid[this.charX + 1][this.charY] === 0) {
      this.grid[this.charX][this.charY] = 0;
      this.charX += 1;
      this.grid[this.charX][this.charY] = 2;
    } else if (this.grid[this.charX + 1][this.charY] === 3) {
      frozen = true;
      gameEmitter.emit('targetReached');
    }
  },
  moveLeft: function() {
    if (this.grid[this.charX - 1][this.charY] === 0) {
      this.grid[this.charX][this.charY] = 0;
      this.charX -= 1;
      this.grid[this.charX][this.charY] = 2;
    } else if (this.grid[this.charX - 1][this.charY] === 3) {
      frozen = true;
    }
  },
  moveUp: function() {
    if (this.grid[this.charX][this.charY -1] === 0) {
      this.grid[this.charX][this.charY] = 0;
      this.charY -= 1;
      this.grid[this.charX][this.charY] = 2;
    } else if (this.grid[this.charX][this.charY -1] === 3) {
      frozen = true;
    }
  },
  moveDown: function() {
    if (this.grid[this.charX][this.charY + 1] === 0) {
      this.grid[this.charX][this.charY] = 0;
      this.charY += 1;
      this.grid[this.charX][this.charY] = 2;
    } else if (this.grid[this.charX][this.charY + 1] === 3) {
      frozen = true;
    }
  }
}


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
