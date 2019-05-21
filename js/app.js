// Global Vaviables
let score = 0;
let totalLives = 5;

// Enemies our player must avoid
function Enemy(x, y, speed) {
  this.x = x;
  this.y = y;
  this.speed = speed;
  this.sprite = 'images/enemy-bug.png';
}

// Update the enemy's position
// Parameter: dt, a time delta between ticks

Enemy.prototype.update = function(dt) {
  let scoreValue = document.querySelector('.scoreValue');
  let lives = document.querySelector('.livesValue');
  // Multiplying any movement by the dt perameter ensures the game runs at the same speed for all computers
  this.x += this.speed * dt;

  // Gives bugs random speeds
  if (this.x >= 505) {
    this.x = -60;
    this.speed = 150 + Math.floor(Math.random() * 400 + 1);
  }

  // Handles player collision detection and updates score || source https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection
  if (this.x < player.x + 65 &&
  this.x + 78 > player.x &&
  this.y < player.y + 40 &&
  70 + this.y > player.y) {
    score -= 50;
    scoreValue.innerText = score;
    totalLives--
    lives.innerText = totalLives;
    if (totalLives === 0) {
      gameOver();
    }
    setTimeout(() => {
      player.reset();
    }, 15)
  }
};

// Draws the enemy on the screen
Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// The Player class and it's functions
function Player(x, y) {
  this.x = x;
  this.y = y;
  this.sprite = 'images/char-boy.png';
}

// Keeps player in bounds - Gives a score of 100 and resets player position once you've reached the water
Player.prototype.update = function(dt) {
  let scoreValue = document.querySelector('.scoreValue');

  if (this.x > 402) {
    this.x = 402;
  }

  if (this.x < -2) {
    this.x = -2;
  }

  if (this.y > 402) {
    this.y = 402;
  }

  if (this.y < -8) {
    this.y = -8;
    setTimeout(() => {
      player.reset();
    }, 100);
    score += 100;
    scoreValue.innerText = score;
  }
};

Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Perameters for arrow keys
Player.prototype.handleInput = function(arrowKeys) {
  if (arrowKeys == 'right') {
    this.x += 101;
  }
  if (arrowKeys == 'left') {
    this.x -= 101;
  }
  if (arrowKeys == 'up') {
    this.y += -83;
  }
  if (arrowKeys == 'down') {
    this.y -= -83;
  }
};

// handles resetting the player position when called
Player.prototype.reset = function() {
  this.x = 200;
  this.y = 405;
};

// Instantiating all objects into arrays
let allEnemies = [
  new Enemy(-80, 60, 100),
  new Enemy(-80, 140, 100),
  new Enemy(-80, 305, 100)
];

// Instantiates player
let player = new Player(200, 405);

// This listens for key presses and sends the keys to our Player.handleInput() method.
document.addEventListener('keyup', function(e) {
  const allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  };

  player.handleInput(allowedKeys[e.keyCode]);
});

// A game over function called when 0 lives are left - makes modal visible - resets all variables
function gameOver() {
  const restart = document.querySelector('#clickRestart');
  const modal = document.querySelector('.gameRestart');
  let lives = document.querySelector('.livesValue');
  let scoreValue = document.querySelector('.scoreValue');
  let finalLives = document.getElementById('finalLives');
  let finalScore = document.getElementById('finalScore');

  modal.classList.add('visible');
  finalLives.innerText = totalLives;
  finalScore.innerText = score;
  restart.addEventListener('click', () => {
    player.reset();
    score = 0;
    totalLives = 5;
    scoreValue.innerText = score;
    lives.innerText = totalLives;
    modal.classList.remove('visible');
  })
}
