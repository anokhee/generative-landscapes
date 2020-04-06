let bug1, bug2, bug3, bug4, bug5, bug6;
let star;
let mountainSeed = Math.random() * (0.015 - 0.005) + 0.005;

let heightSeed = Math.random() * (3.25 - 2.75) + 2.75;
let heightSub = .25;

let pixelWidth = 1;

let starCount = 0;
let starSeed = Math.random() * 500;

let moon;
let moonyPos = Math.random() * (480/2.5);
let moonRadius = Math.random() * moonyPos;
let moonOffset = Math.random() * moonRadius;
let moonXPos = Math.random() * ((480 - moonRadius * 4) - (moonRadius * 4)) + moonRadius * 4;

const Y_AXIS = 1;
let skyColor1, skyColor2;

let r = Math.floor((Math.random() * 180));
let g = Math.floor((Math.random() * 180));
let b = Math.floor((Math.random() * 220));

var body = document.getElementById('body');
if ((r + g + b) <= 300) {
  body.style.backgroundColor = '#efefef';
}

console.log(`
1. ${r}, ${g}, ${b}
2. ${r}, ${g}, ${b + 50}
3. ${r + 100}, ${g + 100}, ${b + 30}
4. ${200 + r}, ${200 + g}, ${Math.floor(Math.random() * 180)}
5. ${r + 120}, ${g + 120}, ${b + 120}`);


let w1;
let w2;

function setup() {
  var canvas = createCanvas(480, 480);
  canvas.parent('sketch-container');
  noStroke();
  skyColor1 = color(r - 10, g - 10, b + 50);
  skyColor2 = color(r + 200, g + 200, b + 60, 50);

  w1 = color(255, 255, 255, 0);
  w2 = color(200 + r, 200 + g, Math.random() * 50, 75);

  createCanvas(480, 480);
  background(skyColor1);
  

  // Make moon
  fill(255, 255, 255, Math.random() * ((255 - 200) + 200));
  ellipse(moonXPos, moonyPos, moonRadius);
  fill(skyColor1);
  ellipse(moonXPos + moonOffset, moonyPos, moonRadius);

  star = new Star();
  bug0 = new Mountain(0, 9, 0, 4, .008, pixelWidth * 2);
  bug00 = new Mountain(0, 15, 0, 10, .10, pixelWidth * 2);

  bug1 = new Mountain(0, heightSeed, 0, 4, mountainSeed, pixelWidth);
  bug2 = new Mountain(0, heightSeed - heightSub, 0, 4, mountainSeed / 1, pixelWidth);
  bug3 = new Mountain(0, heightSeed - (heightSub * 1.5), 0, 4, mountainSeed / 2, pixelWidth);
  bug4 = new Mountain(0, heightSeed - (heightSub * 2), 0, 4, mountainSeed / 3, pixelWidth);
  bug5 = new Mountain(0, heightSeed - (heightSub * 2.5), 0, 4, mountainSeed / 4, pixelWidth);
  bug6 = new Mountain(0, heightSeed - (heightSub * 3), 0, 4, mountainSeed / 8, pixelWidth);
  setGradient(0, 0, 480, 480, skyColor1, skyColor2, Y_AXIS);
  noLoop();
}

function draw() {
  noStroke();
  for (i = 0; i < 480; i++) {
    makeStars(Math.random() * 1000);
  }

  makeStars(Math.random()*(500));

  noStroke();
  fill(r + 60, g + 60, b + 60, 200);
  beginShape();
  vertex(0, 480);
  for (j = 0; j < 480; j++) {
    vertex(bug6.make());
  }
  vertex(480, 480)
  endShape();


  fill(r + 40, g + 40, b + 40);
  beginShape();
  vertex(0, 480);
  for (j = 0; j < 480; j++) {
    vertex(bug5.make());
  }
  vertex(480, 480)
  endShape();

  setGradient(0, 480 - 500, 480, 500, w1, w2, Y_AXIS);
  noStroke();

  // Mountain set 4

  fill(r + 20, g + 20, b + 20);
  beginShape();
  vertex(0, 480);
  for (j = 0; j < 480; j++) {
    vertex(bug4.make());
  }
  vertex(480, 480)
  endShape();

  setGradient(0, 480 - 400, 480, 400, w1, w2, Y_AXIS);
  noStroke();

  // Mountain set 3

  fill(r, g, b);
  beginShape();
  vertex(0, 480);
  for (j = 0; j < 480; j++) {
    vertex(bug3.make());
  }
  vertex(480, 480)
  endShape();

  setGradient(0, 480 - 300, 480, 300, w1, w2, Y_AXIS);
  noStroke();

  // Mountain set 2

  fill(r - 20, g - 20, b - 20);
  beginShape();
  vertex(0, 480);
  for (j = 0; j < 480; j++) {
    vertex(bug2.make());
  }
  vertex(480, 480)
  endShape();

  setGradient(0, 480 - 200, 480, 200, w1, w2, Y_AXIS);
  noStroke();

  // Mountain set 1 

  fill(r - 40, g - 40, b - 40);
  beginShape();
  vertex(0, 480);
  for (j = 0; j < 480; j++) {
    vertex(bug1.make());
  }
  vertex(480, 480)
  endShape();

  setGradient(0, 480 - 100, 480, 100, w1, w2, Y_AXIS);
  noStroke();
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

// Make color palette
var color1 = document.getElementById('color-1');
color1.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;

var color2 = document.getElementById('color-2');
color2.style.backgroundColor = `rgb(${r}, ${g}, ${b + 50})`;

var color3 = document.getElementById('color-3');
color3.style.backgroundColor = `rgb(${r + 100}, ${g + 100}, ${b + 30})`;

var color4 = document.getElementById('color-4');
color4.style.backgroundColor = `rgb(${100 + r}, ${100 + g}, ${Math.floor(Math.random() * 180)}`;

var color5 = document.getElementById('color-5');
color5.style.backgroundColor = `rgb(${r + 120}, ${g + 120}, ${b + 120})`;
