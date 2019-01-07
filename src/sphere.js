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
    this.total = 40;
    this.branchX = x;
    this.branchY = y;
    this.circle = two.makeCircle(x, y, scale(radius));
    this.circle.fill = '#FFFFFF'
    this.circle.stroke = 'none';
    this.width = two.renderer.domElement.width;
    this.angleStep = 360 / this.total;
    this.lines = [];
    const curveX = Math.random() * this.scale(100)
    const curveY = Math.random() * this.scale(100)
    for (let i = 0; i < this.total; i += 1) {
      const v1 = this.makePoint(this.x, this.y);
      const l = this.two.makeCurve([v1, v1], true);
      l.linewidth = 1;
      l.noFill().stroke = '#ffffff'
      l.vertices.forEach(v => {
        v.addSelf(l.translation);
      })
      l.translation.clear();
      this.lines[i] = {
        x: this.x,
        y: this.y,
        line: l
      }
    }
  }

  draw() {
    this.drawLines();
  }
  
  drawLines() {
    xoff = xoff + this.scale(0.01);
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
      angle += this.angleStep;
    }
  }

  makePoint(x, y) {
    var v = new this.Two.Vector(x, y);
    v.position = new this.Two.Vector().copy(v);

    return v;
  }
}
