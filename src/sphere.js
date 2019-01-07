const noise = require('@giuliandrimba/noise');
const calc = require('@doublepi/calc')

let xoff = 0;

module.exports = class Sphere {
  constructor({ two, scale }, x, y, radius) {
    this.two = two;
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.total = 1;
    this.branchX = x;
    this.branchY = y;
    this.circle = two.makeCircle(x, y, scale(radius));
    this.circle.fill = '#FFFFFF'
    this.circle.stroke = 'none';
    this.width = two.renderer.domElement.width;
    this.angleStep = this.radius / this.total;
    this.lines = [];
    for (let i = 0; i < this.total; i += 1) {
      this.lines[i] = {
        x: this.x,
        y: this.y,
        line: this.two.makeLine(this.x, this.y, this.x,this.y)
      }
    }
  }

  draw() {
    this.drawLines();
  }
  
  drawLines() {
    xoff = xoff + 0.001;
    var n = noise(xoff) * this.x + this.y;
    let angle = 0;
    for (let i = 0; i < this.total; i += 1) {
      const rad = calc.deg2rad(angle + n);

      const oldX = this.lines[i].x;
      const oldY = this.lines[i].y;

      this.lines[i].x = oldX + (Math.cos(rad));
      this.lines[i].y = oldY + (Math.sin(rad));
      const line = this.two.makeLine(oldX, oldY, this.lines[i].x, this.lines[i].y)
      line.stroke = '#ffffff'
      angle += this.angleStep;
    }
  }
}
