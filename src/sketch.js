const Sphere = require('./sphere');

let canvas = undefined;
let env = undefined;
let scale = undefined;
let draw = undefined;
let two = undefined;
let Two = undefined;
let background = undefined;
let circle = undefined;
let canvasWidth;
let canvasHeight;

const MAX_SPHERES = 30;
const spheres = [];

exports.setup = function({ _two, _Two, _env, _scale }){
  env = _env;
  scale = _scale;
  two = _two;
  Two = _Two;
  canvasWidth = two.renderer.domElement.width;
  canvasHeight = two.renderer.domElement.height;
  background = two.makeRectangle(canvasWidth / 2, canvasHeight / 2, canvasWidth, canvasHeight);
  background.fill = '#000';
  background.stroke = 'none'
  createSpheres();
  spheres.forEach(item => item.draw())
  setTimeout(() => {
    env.done();
  }, 500)
}

exports.draw = function() {
  two.update();
  spheres.forEach(item => item.draw())
}

const createSpheres = () => {
  for (let i = 0; i < MAX_SPHERES; i++) {
    const x = Math.random() * canvasWidth;
    const y = Math.random() * canvasHeight;
    const circle = new Sphere({Two, two, scale}, x, y, Math.random() * 50);
    spheres.push(circle);
  }
}