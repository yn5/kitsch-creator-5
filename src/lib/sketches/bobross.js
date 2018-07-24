const minute = 60 * 1000;
const drawingDuration = 0.2 * minute;
const pauseDuration = 0.5 * minute;
let paused = false;
let viewWidth;
let viewHeight;

function getRandomPoint(jitter) {
  return (Math.random() * jitter) - (jitter / 2);
}

function getRandomSizePoint(jitter) {
  return ((Math.random() ** 1.25) * jitter) - (jitter / 2);
}

function clip(input, min, max) {
  return Math.min(max, Math.max(min, input));
}

function pause(ps) {
  paused = !!ps;
}

function* colorGenerator() {
  const jitter = 2;
  let clr;

  yield clr = Math.random() * 255;

  while (true) {
    clr += ((Math.random() * jitter) - (jitter / 2));
    yield clr = clip(clr, 0, 255);
  }
}

function* positionGenerator() {
  const jitterY = 0.01;
  const jitterX = 0.004;
  let x = Math.random();
  let y = Math.random();
  yield { x, y };

  while (true) {
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

function* sizeGenerator() {
  let x = (Math.random() ** 2) * 150;

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
const getPosition = positionGenerator();
const getSize = sizeGenerator();

const drawEllipse = (sketch) => {
  const colorR = getColorR.next().value;
  const colorG = getColorG.next().value;
  const colorB = getColorB.next().value;
  const colorA = getColorA.next().value;
  const colorStroke = colorR * 0.35;

  const { x, y } = getPosition.next().value;
  const position = { x: x * viewWidth, y: y * viewHeight };
  const size = getSize.next().value;

  sketch.stroke(colorStroke);
  sketch.fill(colorR, colorG, colorB, colorA);
  sketch.ellipse(position.x, position.y, size.y, size.x);
};

function togglePause(sketch) {
  if (!paused) {
    sketch.clear();
  }
  setTimeout(() => {
    pause(!paused);
    togglePause(sketch);
  }, paused ? pauseDuration : drawingDuration);
}

function setup(sketch) {
  return () => {
    viewWidth = document.body.offsetWidth;
    viewHeight = document.body.offsetHeight;
    sketch.createCanvas(viewWidth, viewHeight);
    togglePause(sketch);
  };
}

function draw(sketch) {
  return () => {
    if (paused) {
      return;
    }
    Array.from(Array(100).keys()).map(() => drawEllipse(sketch));
  };
}

export default {
  draw,
  setup,
};
