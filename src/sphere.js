const noise = require('@giuliandrimba/noise');
const calc = require('@doublepi/calc')

let xoff = 0;

module.exports = class Sphere {
  constructor({ two, Two, scale }, x, y, radius) {
    this.two = two;
    this.Two = Two;
    this.x = x;
    this.scale = scale;
    this.y = y;
    this.radius = radius;
    this.total = 10;
    this.branchX = x;
    this.branchY = y;
    this.circle = two.makeCircle(x, y, scale(radius));
    this.circle.fill = '#FFFFFF'
    this.circle.stroke = 'none';
    this.width = two.renderer.domElement.width;
    this.angleStep = 360 / this.total;
    this.lines = [];
    for (let i = 0; i < this.total; i += 1) {
      this.lines[i] = {
        x: this.x,
        y: this.y,
        line: this.two.makeCurve(this.x, this.y, this.x + 1,this.y + 1, true)
      }
    }
  }

  draw() {
    this.drawLines();
  }
  
  drawLines() {
    xoff = xoff + this.scale(0.001);
    var n = noise(xoff) * this.x + this.y;
    let angle = 0;
    for (let i = 0; i < this.total; i += 1) {
      const rad = calc.deg2rad(angle + n);

      const oldX = this.lines[i].x;
      const oldY = this.lines[i].y;

      this.lines[i].x = oldX + (Math.cos(rad));
      this.lines[i].y = oldY + (Math.sin(rad));
      const point = this.makePoint(this.lines[i].x, this.lines[i].y);
      this.lines[i].line.vertices.push(point);
      this.lines[i].line.noFill().stroke = '#ffffff'
      angle += this.angleStep;
    }
  }

  makePoint(x, y) {
    var v = new this.Two.Vector(x, y);
    v.position = new this.Two.Vector().copy(v);

    return v;
  }
}
