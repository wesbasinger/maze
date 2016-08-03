var game = require('./game');

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
  game.make();
  requestAnimationFrame(draw);
}


// calling this for the animation effect
draw();
