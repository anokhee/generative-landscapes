let width = 470;
let height = 470;

var bug1, bug2, bug3, bug4, bug5, bug6;
var star;
var mountainSeed = Math.random() * (0.015 - 0.005) + 0.005;
var heightSeed = Math.random() * (height * .005 - 2.75) + 2.75;
var heightSub = .25;

var pixelWidth = 1;

var starCount = 0;
var starSeed = Math.random() * 500;

var moon;
var moonyPos;
var moonRadius;
var moonOffset;
var moonXPos;

var Y_AXIS = 1;
var skyColor1, skyColor2;
var randomBlue = Math.floor(Math.random() * 150);

var r = Math.floor((Math.random() * 200));
var g = Math.floor((Math.random() * 200));
var b = Math.floor((Math.random() * 220));
var w1;
var w2;

var body = document.getElementById('body');
var labels = document.getElementsByClassName('color-label');
var button = document.getElementById('btn');
if ((r + g + b) <= 300) {
  for (i = 0; i < labels.length; i++) {
    labels[i].style.color = '#131313';
  }
  body.style.backgroundColor = '#efefef';
  button.style.color = '#131313';
  button.style.border = '1px solid #131313';
} else {
  for (i = 0; i < labels.length; i++) {
    labels[i].style.color = '#efefef';
  }
  body.style.backgroundColor = '#131313';
}


function setup() {
  var canvas = createCanvas(width, height);
  canvas.parent('sketch-container');
  noStroke();
  moonyPos = Math.random() * (height / 2 - height / 3) + height / 3;
  moonRadius = Math.random() * moonyPos / 2;
  moonOffset = Math.random() * moonRadius;
  moonXPos = (Math.random() * ((width - moonRadius) - (moonRadius)) + moonRadius);
  skyColor1 = color(r - 10, g - 10, b + 50);
  skyColor2 = color(r + 200, g + 200, b + 60, 50);

  w1 = color(255, 255, 255, 0);
  w2 = color(200 + r, 200 + g, randomBlue, 75);

  createCanvas(width, height);
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
  setGradient(0, 0, width, height, skyColor1, skyColor2, Y_AXIS);
  noLoop();
}

function draw() {
  noStroke();
  for (i = 0; i < width; i++) {
    makeStars(Math.random() * 1000);
  }

  makeStars(Math.random() * (500));

  noStroke();
  fill(r + 50, g + 50, b + 50);
  beginShape();
  vertex(0, height);
  for (j = 0; j < width; j++) {
    vertex(bug6.make());
  }
  vertex(width, height)
  endShape();

  setGradient(0, height - 600, width, 600, w1, w2, Y_AXIS);
  noStroke();


  fill(r + 40, g + 40, b + 40);
  beginShape();
  vertex(0, height);
  for (j = 0; j < width; j++) {
    vertex(bug5.make());
  }
  vertex(width, height)
  endShape();

  setGradient(0, height - 500, width, 500, w1, w2, Y_AXIS);
  noStroke();

  // Mountain set 4

  fill(r + 20, g + 20, b + 20);
  beginShape();
  vertex(0, height);
  for (j = 0; j < width; j++) {
    vertex(bug4.make());
  }
  vertex(width, height)
  endShape();

  setGradient(0, height - 400, width, 400, w1, w2, Y_AXIS);
  noStroke();

  // Mountain set 3

  fill(r, g, b);
  beginShape();
  vertex(0, height);
  for (j = 0; j < width; j++) {
    vertex(bug3.make());
  }
  vertex(width, height)
  endShape();

  setGradient(0, height - 300, width, 300, w1, w2, Y_AXIS);
  noStroke();

  // Mountain set 2

  fill(r - 20, g - 20, b - 20);
  beginShape();
  vertex(0, height);
  for (j = 0; j < width; j++) {
    vertex(bug2.make());
  }
  vertex(width, height)
  endShape();

  setGradient(0, height - 200, width, 200, w1, w2, Y_AXIS);
  noStroke();

  // Mountain set 1 

  fill(r - 40, g - 40, b - 40);
  beginShape();
  vertex(0, height);
  for (j = 0; j < width; j++) {
    vertex(bug1.make());
  }
  vertex(width, height)
  endShape();

  setGradient(0, height - 100, width, 100, w1, w2, Y_AXIS);
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
    vertex(this.mLength + pixelWidth, height - (-x));
  }
}

class Star {
  constructor(x, y) {
    this.xPos = x;
    this.yPos = y;
  }

  draw() {
    var randSize = random(3);
    fill(255, 255, 255, random(0, 200));
    ellipse(this.xPos, this.yPos, randSize, randSize);
  }
}

function makeStars(numStars) {
  if (starCount < numStars) {
    var s = new Star(int(random(width)), int(random(height / 1.8)));
    s.draw();
  }
  starCount++;
}

function setGradient(x, y, w, h, c1, c2, axis) {
  noFill();
  if (axis === Y_AXIS) {
    for (var i = y; i <= y + h; i++) {
      var inter = map(i, y, y + h, 0, 1);
      var c = lerpColor(c1, c2, inter);
      stroke(c);
      line(x, i, x + w, i);
    }
  }
}
