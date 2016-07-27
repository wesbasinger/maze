// grab some globals for drawing on the canvas
const canvas = document.getElementById('canvas'),
      charCtx = canvas.getContext('2d'),
      bgCtx = canvas.getContext('2d');

// setting some globals for keypresses
var rightPressed = false,
    leftPressed = false,
    upPressed = false,

var background = {
  color: 'yellow',
  make: function() {
    bgCtx.beginPath();
    bgCtx.rect(0, 0, canvas.width, canvas.height);
    bgCtx.fillStyle = this.color;
    bgCtx.fill();
    bgCtx.closePath();
  }
}

// make the character object
var character = {
  xPos: 0,
  yPos: canvas.height - 100,
  place: function() {
    background.make()
    charCtx.beginPath();
    charCtx.rect(this.xPos, this.yPos, 100, 100);
    charCtx.fillStyle = 'black';
    charCtx.fill();
    charCtx.closePath();
  },
  moveRight: function() {
    this.xPos += 10;
    if (this.xPos > 640) {
      background.change();
      this.xPos = 0;
      this.place();
    } else {
      this.place();
    }
  },
  moveLeft: function() {
    this.xPos -= 10;
    if (this.xPos < 0) {
      background.change();
      this.xPos = 640;
      this.place();
    } else {
      this.place();
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
  } 
}

// calling this for the animation effect
setInterval(draw, 10);
