// grab some globals for drawing on the canvas
const canvas = document.getElementById('canvas'),
      ctx = canvas.getContext('2d'),

      tileSize = 16; // that's in pixels,


var tiles = {
  0: 'black',
  1: 'yellow',
  2: 'blue',
  3: 'red'
}

var game = {
  charX: 0,
  charY: 0,
  targetX: Math.floor(Math.random() * 19),
  targetY: Math.floor(Math.random() * 19),
  grid: {
    levelOne: [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ]
  },
  make: function() {
    this.grid.levelOne[this.targetX][this.targetY] = 3;
    this.grid.levelOne[this.charX][this.charY] = 2;
    for (var i=0; i < this.grid.levelOne.length; i++) {
      var row = tileSize * i;
      for (var j=0; j < this.grid.levelOne[0].length; j++) {
        var col = tileSize * j;
        ctx.beginPath();
        ctx.rect(row, col, tileSize, tileSize);
        ctx.fillStyle = tiles[this.grid.levelOne[i][j]];
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
    if (this.grid.levelOne[this.charX + 1][this.charY] === 0) {
      this.grid.levelOne[this.charX][this.charY] = 0;
      this.charX += 1;
      this.grid.levelOne[this.charX][this.charY] = 2;
    }
  },
  moveLeft: function() {
    if (this.grid.levelOne[this.charX - 1][this.charY] === 0) {
      this.grid.levelOne[this.charX][this.charY] = 0;
      this.charX -= 1;
      this.grid.levelOne[this.charX][this.charY] = 2;
    }
  },
  moveUp: function() {
    if (this.grid.levelOne[this.charX][this.charY -1] === 0) {
      this.grid.levelOne[this.charX][this.charY] = 0;
      this.charY -= 1;
      this.grid.levelOne[this.charX][this.charY] = 2;
    }
  },
  moveDown: function() {
    if (this.grid.levelOne[this.charX][this.charY + 1] === 0) {
      this.grid.levelOne[this.charX][this.charY] = 0;
      this.charY += 1;
      this.grid.levelOne[this.charX][this.charY] = 2;
    }
  },
  detectTarget: function() {
    if (Math.abs(this.targetX - this.charX) < 1 && Math.abs(this.charY - this.targetY) < 1) {
      console.log("target reached!");
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
  if (rightPressed && game.charX < 19) {
    game.moveRight();
  } else if ((leftPressed && game.charX > 0)) {
    game.moveLeft();
  } else if ((downPressed && game.charY < 19)) {
    game.moveDown();
  } else if ((upPressed && game.charY > 0)) {
    game.moveUp();
  }
  game.detectTarget();
  game.make();
  requestAnimationFrame(draw);
}


// calling this for the animation effect
draw();
