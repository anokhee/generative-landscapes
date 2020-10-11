const canvas = document.getElementById('canvas'),
    ctx = canvas.getContext('2d'),
    w = 500,
    h = 500;
canvas.width = w;
canvas.height = h;
ctx.strokeStyle = `rgba(0, 0, 0, 0)`;

let mtnIterations = 5;
let mtnAmplitude = Math.random() * 100;
let mtnWavelength = 10;
let mtnDivisor = 100;
let mtnHeightMax = h / 4;
let mtnHeightMin = h / 3;
let mtnHeight = Math.random() * (mtnHeightMax - mtnHeightMin) + mtnHeightMin;
let baseRGB = [Math.floor(Math.random() * 250),
    Math.floor(Math.random() * 250),
    Math.floor(Math.random() * 250)
];

let skyColor1 = [
    Math.floor((baseRGB[0]) - 10),
    Math.floor((baseRGB[1]) - 10),
    Math.floor((baseRGB[2]) + 50)
];
let skyColor2 = [skyColor1[0] + 200, skyColor1[1] + 200, skyColor1[2] + 60];
setBackground(`rgba(${skyColor1})`, `rgba(${skyColor2})`, w, h);

for (let i = 1; i < mtnIterations; i++) {
    let mtnRh = Math.random() * (70 - 35) + 35;
    ctx.fillStyle = `rgba(${baseRGB[0] - (35 * i)}, ${baseRGB[1] - (35 * i)}, ${baseRGB[2] - (35 * i)}, 1)`;
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
}

function setBackground(c1, c2, w, h) {
    let grd = ctx.createLinearGradient(0, h, 0, 0);
    grd.addColorStop(0, c1);
    grd.addColorStop(1, c2);
    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, w, h);
}