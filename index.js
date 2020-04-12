let bug1, bug2, bug3, bug4, bug5, bug6;
let star;
let mountainSeed = Math.random() * (0.015 - 0.005) + 0.005;

let heightSeed = Math.random() * (3.25 - 2.75) + 2.75;
let heightSub = .25;

let pixelWidth = 1;

let starCount = 0;
let starSeed = Math.random() * 500;

let moon;
let moonyPos;
let moonRadius;
let moonOffset;
let moonXPos;

const Y_AXIS = 1;
let skyColor1, skyColor2;
var randomBlue = Math.floor(Math.random() * 50);

let r = Math.floor((Math.random() * 180));
let g = Math.floor((Math.random() * 180));
let b = Math.floor((Math.random() * 220));

var body = document.getElementById('body');
var labels = document.getElementsByClassName('color-label');
if ((r + g + b) <= 300) {
  for (i = 0; i < labels.length; i++){
    labels[i].style.color = '#131313';
  }
  body.style.backgroundColor = '#efefef';
} else {
  for (i = 0; i < labels.length; i++){
    labels[i].style.color = '#efefef';
  }
  body.style.backgroundColor = '#131313';
}

let w1;
let w2;
let width = 500; 
let height = 500;

function setup() {
  var canvas = createCanvas(width, height);
  canvas.parent('sketch-container');
  noStroke();
  moonyPos = Math.random() * (height / 2 - height/3) + height/3;
  moonRadius = Math.random() * moonyPos/2;
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

function rgbToHex(r, g, b) {
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

// Make color palette
var color1 = document.getElementById('color-1');
var colorLabel1 = document.getElementById('color-1-label');
color1.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
colorLabel1.innerHTML = rgbToHex(r, g, b);

var color2 = document.getElementById('color-2');
var colorLabel2 = document.getElementById('color-2-label');
color2.style.backgroundColor = `rgb(${r}, ${g}, ${b + 50})`;
colorLabel2.innerHTML = rgbToHex(r, g, b + 50);

var color3 = document.getElementById('color-3');
var colorLabel3 = document.getElementById('color-3-label');
color3.style.backgroundColor = `rgb(${r + 100}, ${g + 100}, ${b + 30})`;
colorLabel3.innerHTML = rgbToHex(r + 100, g + 100, b + 30);

var color4 = document.getElementById('color-4');
var colorLabel4 = document.getElementById('color-4-label');
color4.style.backgroundColor = `rgb(${100 + r}, ${100 + g}, ${randomBlue})`;
colorLabel4.innerHTML = rgbToHex(r + 100, g + 100, randomBlue);

var color5 = document.getElementById('color-5');
var colorLabel5 = document.getElementById('color-5-label');
color5.style.backgroundColor = `rgb(${r + 120}, ${g + 120}, ${b + 120})`;
colorLabel5.innerHTML = rgbToHex(r + 120, g + 120, b + 120);
