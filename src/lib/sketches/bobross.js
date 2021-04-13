function getRandomPoint(jitter) {
  return Math.random() * jitter - jitter / 2;
}

function getRandomSizePoint(jitter) {
  return Math.random() ** 1.25 * jitter - jitter / 2;
}

function clip(input, min, max) {
  return Math.min(max, Math.max(min, input));
}

function* colorGenerator() {
  const jitter = 2;
  let clr;

  yield (clr = Math.random() * 255);

  while (true) {
    clr += Math.random() * jitter - jitter / 2;
    yield (clr = clip(clr, 0, 255));
  }
}

function* sizeGenerator() {
  let x = Math.random() ** 2 * 150;

  yield {
    x,
    y: x,
  };

  while (true) {
    x = clip(0, x + getRandomSizePoint(10), 1050);

    yield {
      x,
      y: x,
    };
  }
}

const getColorR = colorGenerator();
const getColorG = colorGenerator();
const getColorB = colorGenerator();
const getColorA = colorGenerator();
const getSize = sizeGenerator();

class BobrossSketch {
  paused = false;

  viewWidth = null;

  viewHeight = null;

  getPosition = this.positionGenerator();

  positionXJitter = 0.004;

  positionYJitter = 0.01;

  setup = (sketch, width, height) => () => {
    this.viewWidth = width;
    this.viewHeight = height;
    sketch.createCanvas(this.viewWidth, this.viewHeight);

    this.sketch = sketch;
  };

  draw = (sketch) => () => {
    if (this.paused) {
      return;
    }
    Array.from(Array(100).keys()).map(() => this.drawEllipse(sketch));
  };

  clear = () => {
    this.sketch.clear();
  };

  togglePause = () => {
    this.paused = !this.paused;
  };

  setPositionXJitter = (newPositionXJitter) => {
    this.positionXJitter = newPositionXJitter;
  };

  setPositionYJitter = (newPositionYJitter) => {
    this.positionYJitter = newPositionYJitter;
  };

  drawEllipse = (sketch) => {
    const colorR = getColorR.next().value;
    const colorG = getColorG.next().value;
    const colorB = getColorB.next().value;
    const colorA = getColorA.next().value;
    const colorStroke = colorR * 0.35;

    const { x, y } = this.getPosition.next(this.positionXJitter).value;
    const position = { x: x * this.viewWidth, y: y * this.viewHeight };
    const size = getSize.next().value;

    sketch.stroke(colorStroke);
    sketch.fill(colorR, colorG, colorB, colorA);
    sketch.ellipse(position.x, position.y, size.y, size.x);
  };

  *positionGenerator() {
    let x = Math.random();
    let y = Math.random();
    yield { x, y };

    while (true) {
      const jitterX = this.positionXJitter;
      const jitterY = this.positionYJitter;
      const randomX = getRandomPoint(jitterX);
      const randomY = getRandomPoint(jitterY);
      x = clip(x + randomX, 0, 1);
      y = clip(y + randomY, 0, 1);

      yield {
        x,
        y,
      };
    }
  }
}

export default BobrossSketch;
