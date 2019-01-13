const noise = require('@giuliandrimba/noise');
const calc = require('@doublepi/calc')

let xoff = 0;
let NUMBER_BRANCHES = Math.random() * 10;

module.exports = class Sphere {
  constructor({ ctx, scale }, x, y, radius) {
    NUMBER_BRANCHES = Math.round(scale(10));
    this.ctx = ctx;
    this.x = x;
    this.scale = scale;
    this.y = y;
    this.radius = radius;
    this.branchX = x;
    this.branchY = y;
    this.width = this.ctx.canvas.width;
    this.angleStep = 360 / NUMBER_BRANCHES;
    this.lines = [];
    for (let index = 0; index < NUMBER_BRANCHES; index++) {
      this.lines.push({ x: this.x, y: this.y});
    }
  }

  draw() {
    this.ctx.fillStyle = '#FFFFFF';
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    this.ctx.fill();
    this.drawLines();
  }

  drawBranches() {
    this.drawLines()
  }
  
  drawLines() {
    xoff = xoff + 0.01;
    let angle = 0;
    var n = noise(xoff) * this.x + this.y;
    for (let i = 0; i < NUMBER_BRANCHES; i += 1) {
      const rad = calc.deg2rad(angle + n);

      const oldX = this.lines[i].x;
      const oldY = this.lines[i].y;

      this.lines[i].x = oldX + this.scale((Math.cos(rad)) * this.scale(2));
      this.lines[i].y = oldY + this.scale((Math.sin(rad)) * this.scale(2));
      angle += this.angleStep;
      this.ctx.fillStyle = '#FFFFFF';
      this.ctx.beginPath();
      this.ctx.arc(this.lines[i].x, this.lines[i].y, 1, 0, 2 * Math.PI);
      this.ctx.fill();
    }
  }
}
