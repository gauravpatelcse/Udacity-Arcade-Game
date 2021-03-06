"use strict";
let max_speed = 600,
    min_speed = 100;

// Enemies our player must avoid
var Enemy = function(x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = this.get_speed();
};

//to get random speed for enemy object
Enemy.prototype.get_speed = function() {
    return Math.floor(Math.random() * (max_speed - min_speed + 1) + min_speed);
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x < 600)
        this.x += this.speed * dt;
    else {
        this.x = -100;
        this.speed = this.get_speed();
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    //the score will be seen on the grid itself.
    ctx.fillStyle = 'magenta';
    ctx.font = '20px Times New Roman';
    ctx.fillText('Classic Arcade Game',170,15);
    ctx.fillStyle = '#53ea0e';
    ctx.fillText('Score = ' + player.playerScore, 210, 35);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x, y) {
    this.sprite = 'images/char-boy.png';
    this.x = x;
    this.y = y;
    this.playerScore = 0;
};

//2D collision detection
Player.prototype.update = function() {
    for (var i = 0; i < 3; i++) {
        if ((this.x < allEnemies[i].x + 72) && (this.x + 72 > allEnemies[i].x) && (this.y < allEnemies[i].y + 72) && (this.y + 72 > allEnemies[i].y)) {
            this.reset();
        }
    }
};

//to reset the initial position of the player
Player.prototype.reset = function() {
    this.x = 200;
    this.y = 400;
};

//Score of the Player
Player.prototype.scored = function() {
    //"use strict";
    this.playerScore += 1;
};

//Draw the enemy on the screen
Player.prototype.render = function() {
    //"use strict";
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(key) {
    // make sure player is within boundaries of canvas
    // make player move with appropriate keyboard key presse
    if (key == 'left') {
        if (this.x > 0) {
            this.x -= 100;
        }
    } else if (key == 'right') {
        if (this.x < 400) {
            this.x += 100;
        }
    } else if (key == 'up') {
        if (this.y > 40) {
            this.y -= 90;
        } else {
            //if water is hit player goes back to initial position
            // and increment score by 1
            this.scored();
            this.reset();
        }
    } else if (key == 'down') {
        if (this.y < 400) {
            this.y += 90;
        }
    }

};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [
    new Enemy(0, 40),
    new Enemy(0, 130),
    new Enemy(0, 220)
];

var player = new Player(200, 400);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
