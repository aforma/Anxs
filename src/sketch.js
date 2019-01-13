const Sphere = require('./sphere');

let ctx = undefined;
let env = undefined;
let scale = undefined;
let draw = undefined;
let two = undefined;
let Two = undefined;
let background = undefined;
let circle = undefined;
let canvasWidth;
let canvasHeight;

const MAX_SPHERES = 50;
const spheres = [];

exports.setup = function({ _context, _canvas, _Two, _env, _scale }){
  env = _env;
  scale = _scale;
  ctx = _context;
  canvasWidth = _canvas.width;
  canvasHeight = _canvas.height;
  ctx.fillStyle = '#000000';
  ctx.rect(0, 0, canvasWidth, canvasHeight);
  ctx.fill()
  createSpheres();
  spheres.forEach(item => item.draw())
  setTimeout(() => {
    env.done();
  }, 60000)
}

exports.draw = function() {
  spheres.forEach(item => item.drawBranches())
}

const createSpheres = () => {
  for (let i = 0; i < MAX_SPHERES; i++) {
    const x = Math.random() * canvasWidth;
    const y = Math.random() * canvasHeight;
    const circle = new Sphere({ctx, scale}, x, y, 1);
    spheres.push(circle);
  }
}