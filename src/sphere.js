const noise = require('@giuliandrimba/noise');

let xoff = 0;

module.exports = class Sphere {
  constructor({ two, scale }, x, y, radius) {
    this.two = two;
    this.x = x;
    this.y = y;
    this.branchX = x;
    this.branchY = y;
    this.circle = two.makeCircle(x, y, scale(radius));
    this.circle.fill = '#FFFFFF'
    this.circle.stroke = 'none';
    this.width = two.renderer.domElement.width;
  }

  draw() {
    xoff = xoff + 0.001;
    var n = noise(xoff) * this.width;
    const line = this.two.makeLine(this.branchX + n * 2, this.branchY, this.branchX + n, this.branchY + n)
    line.stroke = '#ffffff'
  }
}
