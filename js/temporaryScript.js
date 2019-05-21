function EnemyFlipped(x, y, speed) {
  this.x = x;
  this.y = y;
  this.speed = speed;
  this.sprite = 'images/enemyBugFlipped.png';
}

EnemyFlipped.prototype.update = function(dt) {
  this.x += this.speed * dt;
  if (this.x <= -60) {
    this.x = 505;
    this.speed = 150 + Math.floor(Math.random() * 350 + 1);
  }
};

// Render function
EnemyFlipped.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
