// grab some globals for drawing on the canvas
const canvas = document.getElementById('canvas'),
      charCtx = canvas.getContext('2d'),
      bgCtx = canvas.getContext('2d');

var calcDistance = function(d1x, d1y, d2x, d2y) {
  return Math.pow(((d1x - d2x)*(d1x -d2x)+(d1y - d2y)*(d1y - d2y)), 0.5)
}

// setting some globals for keypresses
var rightPressed = false,
    leftPressed = false,
    upPressed = false,
    downPressed = false,
    targetReached = false;

var target = {
  xPos: Math.random() * 640,
  yPos: Math.random() * 480,
  make: function() {
    bgCtx.beginPath();
    bgCtx.rect(this.xPos, this.yPos, 50, 50);
    bgCtx.fillStyle = 'blue';
    bgCtx.fill();
    bgCtx.closePath();
  }
}

var background = {
  color: 'yellow',
  make: function() {
    bgCtx.beginPath();
    bgCtx.rect(0, 0, canvas.width, canvas.height);
    bgCtx.fillStyle = this.color;
    bgCtx.fill();
    bgCtx.closePath();
    target.make();
  }
}

// make the character object
var character = {
  xPos: 0,
  yPos: canvas.height - 50,
  place: function() {
    background.make()
    charCtx.beginPath();
    charCtx.rect(this.xPos, this.yPos, 50, 50);
    charCtx.fillStyle = 'black';
    charCtx.fill();
    charCtx.closePath();
  },
  moveRight: function() {
    if (this.xPos < canvas.width - 50) {
      this.xPos += 10;
    }
    this.place();
  },
  moveLeft: function() {
    if (this.xPos > 0) {
      this.xPos -= 10;
    }
    this.place();
  },
  moveUp: function() {
    if (this.yPos > 0) {
      this.yPos -= 10;
    }
    this.place();
  },
  moveDown: function() {
    if (this.yPos < canvas.height - 50) {
      this.yPos += 10;
    }
    this.place();
  },
  detectTarget: function() {
    if (calcDistance(target.xPos, target.yPos, this.xPos, this.yPos) < 50) {
      this.xPos = target.xPos;
      this.yPos = target.yPos;
      console.log("target reached!");
    }
  }
}

/* Got the next three chunks from the MDN
   tutorial
*/
function keyDownHandler(e) {
    if(e.keyCode == 39) {
        rightPressed = true;
    }
    else if(e.keyCode == 37) {
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
    }
    else if(e.keyCode == 37) {
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
  character.place();
  if (rightPressed) {
    character.moveRight();
  } else if (leftPressed) {
    character.moveLeft();
  } else if (upPressed) {
    character.moveUp();
  } else if (downPressed) {
    character.moveDown();
  }
  character.detectTarget();
}

// calling this for the animation effect
setInterval(draw, 10);
