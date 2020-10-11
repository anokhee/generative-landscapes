const canvas = document.getElementById('canvas'),
    ctx = canvas.getContext('2d'),
    w = 500,
    h = 500;
canvas.width = w;
canvas.height = h;
ctx.strokeStyle = `rgba(0, 0, 0, 0)`;

let mtnIterations = Math.floor(Math.random() * (7 - 6) + 6);
let mtnAmplitude = Math.random() * 100;
let mtnWavelength = 10;
let mtnDivisor = 100;
let mtnHeightMax = h / 4;
let mtnHeightMin = h / 3;
let mtnHeight = Math.random() * (mtnHeightMax - mtnHeightMin) + mtnHeightMin;
let baseRGB = [`${Math.floor(Math.random() * 150)}`,
    `${Math.floor(Math.random() * 150)}`,
    `${Math.floor(Math.random() * 150)}`
];

let skyColor1 = [
    Math.floor(parseInt(baseRGB[0]) + Math.random() * (55 - -55) + -55),
    Math.floor(parseInt(baseRGB[1]) + Math.random() * (55 - -55) + -55),
    Math.floor(parseInt(baseRGB[2]) + Math.random() * (100))
];
let skyColor2 = [skyColor1[0] + 120, skyColor1[1] + 120, skyColor1[2] + 40];
setBackground(`rgba(${skyColor1})`, `rgba(${skyColor2})`, w, h);

let overlayBlue = Math.floor(Math.random() * 150);
let whiteOverlay1 = [255, 255, 255, 0];
let whiteOverlay2 = [parseInt(baseRGB[0]) + 200, parseInt(baseRGB[1]) + 200, parseInt(overlayBlue), 0.35];

for (let i = 1; i < mtnIterations; i++) {
    let mtnRh = Math.random() * (70 - 35) + 35;
    ctx.fillStyle = `rgba(${255 - baseRGB[0] - (i * 45)}, ${255 - baseRGB[1] - (i * 45)}, ${255 - baseRGB[2] - (i * 45)}, 1`;
    generateMountainRange(mtnAmplitude * mtnIterations * .1, mtnWavelength * (mtnIterations - i),
        10, mtnDivisor, w, (mtnHeight) + (i * mtnRh), i);
};

function generateMountainRange(amp, wl, octaves, divisor, width, rh, i) {
    ctx.moveTo(0, h);
    ctx.beginPath();
    DrawLine(CombineNoise(GenerateNoise(amp, wl, octaves, divisor, width)), rh);
    ctx.lineTo(w, h);
    ctx.lineTo(0, h);
    ctx.fill();
    ctx.stroke();
    ctx.closePath();

    ctx.beginPath();
    ctx.rect(0, h, w, h - (rh * i) * 2.25);
    let whiteOverlay = ctx.createLinearGradient(0, h, 0, 0);
    whiteOverlay.addColorStop(1, `rgba(${whiteOverlay1})`);
    whiteOverlay.addColorStop(0, `rgba(${whiteOverlay2})`);
    ctx.fillStyle = whiteOverlay;
    ctx.fill();
    ctx.stroke();
}

function setBackground(c1, c2, w, h) {
    let grd = ctx.createLinearGradient(0, h, 0, 0);
    grd.addColorStop(0, c1);
    grd.addColorStop(1, c2);
    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, w, h);
}