var EventEmitter = require("events").EventEmitter;

var Game = {
    frozen: false,
    currentLevel: 0,
    charX: 1,
    charY: 1,
    grid: null, // null for now but will be an array of levels once instantiated
    moveQueue: [],
    draw: function() {
        if(!this.frozen && this.moveQueue.length > 0) {
            this.moveQueue[0]();
        }
        this.moveQueue = [];
        this.make();
    },
    tiles: {
        0: "black",
        1: "yellow",
        2: "blue",
        3: "red"
    },
    make: function() {
        var level = this.currentLevel;
        this.grid[level][this.charX][this.charY] = 2;
        var ctx = this.ctx;
        var tileSize = this.tileSize;
        var row, col;
        for (var i = 0; i < this.grid[level].length; i++) {
            row = tileSize * i;
            for (var j = 0; j < this.grid[level][0].length; j++) {
                col = tileSize * j;
                ctx.beginPath();
                ctx.rect(row, col, tileSize, tileSize);
                ctx.fillStyle = this.tiles[this.grid[level][i][j]];
                ctx.fill();
                ctx.closePath();
            }
        }
    },
    moveRight: function() {
        var level = this.currentLevel;
        if(this.charX < 19) {
            if (this.grid[level][this.charX + 1][this.charY] === 0) {
                this.grid[level][this.charX][this.charY] = 0;
                this.charX += 1;
                this.grid[level][this.charX][this.charY] = 2;
            } else if (this.grid[level][this.charX + 1][this.charY] === 3) {
                this.levelUp();
            }
        }
    },
    moveLeft: function() {
        var level = this.currentLevel;
        if(this.charX > 0) {
            if (this.grid[level][this.charX - 1][this.charY] === 0) {
                this.grid[level][this.charX][this.charY] = 0;
                this.charX -= 1;
                this.grid[level][this.charX][this.charY] = 2;
            } else if (this.grid[level][this.charX - 1][this.charY] === 3) {
                this.levelUp();
            }
        }
    },
    moveUp: function() {
        var level = this.currentLevel;
        if(this.charY > 0) {
            if (this.grid[level][this.charX][this.charY -1] === 0) {
                this.grid[level][this.charX][this.charY] = 0;
                this.charY -= 1;
                this.grid[level][this.charX][this.charY] = 2;
            } else if (this.grid[level][this.charX][this.charY -1] === 3) {
                this.levelUp();
            }
        }
    },
    moveDown: function() {
        var level = this.currentLevel;
        if(this.charY < 19) {
            if (this.grid[level][this.charX][this.charY + 1] === 0) {
                this.grid[level][this.charX][this.charY] = 0;
                this.charY += 1;
                this.grid[level][this.charX][this.charY] = 2;
            } else if (this.grid[level][this.charX][this.charY + 1] === 3) {
                this.levelUp();
            }
        }
    },
    levelUp: function() {
        this.moveQueue = [];
        if (this.currentLevel === this.grid.length - 1) {
            this.frozen = true;
            this.events.emit("gameOver");
        } else {
            this.frozen = true;
            this.currentLevel++;
            this.events.emit("leveledUp", {currentLevel: this.currentLevel + 1});
            this.charX = 1;
            this.charY = 1;
            this.frozen = false;
        }
    },
    restart: function() {
        this.events.emit("restart");
        this.grid = this.cloneLevels(this.defaultGrid);
        this.charX = 1;
        this.charY = 1;
        this.currentLevel = 0;
        this.frozen = false;
        this.moveQueue = 0;
        this.make;
    },
    interval: null,
    keyDownHandler: function(e) {
        switch(e.keyCode) {
            case 39:
            this.moveQueue.push(this.moveRight.bind(this));
            break;
            case 37:
            this.moveQueue.push(this.moveLeft.bind(this));
            break;
            case 38:
            this.moveQueue.push(this.moveUp.bind(this));
            break;
            case 40:
            this.moveQueue.push(this.moveDown.bind(this));
            break;
        }
    },
    start: function() {
        // debugger;
        document.addEventListener("keydown", this.keyDownHandler.bind(this));
        // document.addEventListener("keydown", function(e) {
        //     console.log("Key down!");
        // });

        this.interval = setInterval((function() {
            this.draw();
        }).bind(this), 90);
    },
    create: function(options) {
        return Object
        .create(this)
        .initialize(options);
    },
    cloneLevels(levels) {
        return levels.map(function(level) {
            return level.map(function(row) {
                return row.concat();
            });
        });
    },
    initialize: function(options) {
        this.defaultGrid = options.levels;
        this.grid = this.cloneLevels(options.levels);
        this.canvas = options.canvas;
        this.ctx = options.ctx;
        this.tileSize = options.tileSize;
        this.events = new EventEmitter();
        return this;
    }
};

module.exports = Game;
