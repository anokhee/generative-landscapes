let bug1, bug2, bug3, bug4, bug5, bug6;
let star;
let mountainSeed = Math.random() * (0.015);

let heightSeed = Math.random() * (3.45 - 2.75) + 2.75;
let heightSub = .25;

let pixelWidth = 1;

let starCount = 0;
let starSeed = Math.random() * 500;

let moon;

const Y_AXIS = 1;
let skyColor1, skyColor2;


let r = Math.random() * 10;
let g = Math.random() * 10;
let b = Math.random() * 10;

function setup() {
  var canvas = createCanvas(480, 480);
  canvas.parent('sketch-container');
  noStroke();
  skyColor1 = color(r, g, b + 100);
  skyColor2 = color(r + 180, g + 180, b + 50, 150);

  createCanvas(480, 480);
  background(skyColor2);

  star = new Star();
  bug1 = new Mountain(0, heightSeed, 0, 4, mountainSeed, pixelWidth);
  bug2 = new Mountain(0, heightSeed - heightSub, 0, 4, mountainSeed / 1, pixelWidth);
  bug3 = new Mountain(0, heightSeed - (heightSub * 2), 0, 4, mountainSeed / 2, pixelWidth);
  bug4 = new Mountain(0, heightSeed - (heightSub * 3), 0, 4, mountainSeed / 3, pixelWidth);
  bug5 = new Mountain(0, heightSeed - (heightSub * 4), 0, 4, mountainSeed / 4, pixelWidth);
  bug6 = new Mountain(0, heightSeed - (heightSub * 5), 0, 4, mountainSeed / 8, pixelWidth);
  setGradient(0, 0, 480, 480, skyColor1, skyColor2, Y_AXIS);
  noLoop();
}

function draw() {
  noStroke();
  for (i = 0; i < 480; i++) {
    makeStars(500);
  }

  makeStars(random(300));

  fill(r + 100, g + 100, b + 100);
  beginShape();
  vertex(0, 480);
  for (j = 0; j < 480; j++) {
    vertex(bug6.make());
  }
  vertex(480, 480)
  endShape();

  fill(r + 80, g + 80, b + 80);
  beginShape();
  vertex(0, 480);
  for (j = 0; j < 480; j++) {
    vertex(bug5.make());
  }
  vertex(480, 480)
  endShape();

  fill(r + 60, g + 60, b + 60);
  beginShape();
  vertex(0, 480);
  for (j = 0; j < 480; j++) {
    vertex(bug4.make());
  }
  vertex(480, 480)
  endShape();

  fill(r + 40, g + 40, b + 40);
  beginShape();
  vertex(0, 480);
  for (j = 0; j < 480; j++) {
    vertex(bug3.make());
  }
  vertex(480, 480)
  endShape();

  fill(r + 20, g + 20, b + 20);
  beginShape();
  vertex(0, 480);
  for (j = 0; j < 480; j++) {
    vertex(bug2.make());
  }
  vertex(480, 480)
  endShape();

  fill(r, g, b);
  beginShape();
  vertex(0, 480);
  for (j = 0; j < 480; j++) {
    vertex(bug1.make());
  }
  vertex(480, 480)
  endShape();
}

class Mountain {
  constructor(cMin, cMax, nMin, nMax, tI, lI) {
    this.time = Math.random() * 99;
    this.currentMin = cMin;
    this.currentMax = cMax;
    this.newMin = nMin;
    this.newMax = nMax;
    this.timeInterval = tI;
    this.lengthInterval = lI;
    this.mLength = 0;
  }

  make() {
    rectMode(CENTER);
    this.time += this.timeInterval;
    this.mLength += this.lengthInterval;
    var noiseValue = noise(this.time);
    var x = map(noiseValue, this.currentMin, this.currentMax, this.newMin, -windowHeight + this.newMax);
    //rect(this.mLength + pixelWidth, height, pixelWidth, x);
    vertex(this.mLength + pixelWidth, height - (-x));
  }
}

class Star {
  constructor(x, y) {
    this.xPos = x;
    this.yPos = y;
  }

  draw() {
    let randSize = random(3);
    fill(255, 255, 255, random(0, 200));
    ellipse(this.xPos, this.yPos, randSize, randSize);
  }
}

function makeStars(numStars) {
  if (starCount < numStars) {
    let s = new Star(int(random(width)), int(random(height / 1.8)));
    s.draw();
  }
  starCount++;
}

function setGradient(x, y, w, h, c1, c2, axis) {
  noFill();
  if (axis === Y_AXIS) {
    for (let i = y; i <= y + h; i++) {
      let inter = map(i, y, y + h, 0, 1);
      let c = lerpColor(c1, c2, inter);
      stroke(c);
      line(x, i, x + w, i);
    }
  }
}
