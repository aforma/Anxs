const noise = require('@giuliandrimba/noise');
const calc = require('@doublepi/calc')

let xoff = 0;

module.exports = class Sphere {
  constructor({ two, scale }, x, y, radius) {
    this.two = two;
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.total = this.radius;
    this.branchX = x;
    this.branchY = y;
    this.circle = two.makeCircle(x, y, scale(radius));
    this.circle.fill = '#FFFFFF'
    this.circle.stroke = 'none';
    this.width = two.renderer.domElement.width;
    this.angleStep = this.radius / 360;
    this.lines = [];
    for (let i = 0; i < this.radius / 10; i += 1) {
      this.lines[i] = {
        x: this.x,
        y: this.y,
      }
    }
  }

  draw() {
    this.drawLines();
  }
  
  drawLines() {
    xoff = xoff + 0.1;
    var n = noise(xoff);
    for (let i = 0; i < 1; i += 1) {
      let angle = 0;
      const rad = calc.deg2rad(angle);

      const oldX = this.lines[i].x;
      const oldY = this.lines[i].y;

      this.lines[i].x = oldX + (Math.cos(rad) * 0.1) + n;
      this.lines[i].y = oldY + (Math.sin(rad) * 0.1) + n;
      const line = this.two.makeLine(oldX, oldY, this.lines[i].x, this.lines[i].y)
      line.stroke = '#ffffff'
      angle += this.angleStep;
    }
  }
}
