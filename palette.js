
function rgbToHex(r, g, b) {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  }
  
  // Make color palette
  var color1 = document.getElementById('color-1');
  var colorLabel1 = document.getElementById('color-1-label');
  color1.style.backgroundColor = rgbToHex(r, g, b);
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
  
  function copyStringToClipboard (e) {
    const rgb = e.target.style.backgroundColor;
    const splitRGB = rgb.replace(/^(rgb|rgba)\(/, '').replace(/\)$/, '').replace(/\s/g, '').split(',');
    const [r, g, b] = splitRGB;
    const hex = rgbToHex(parseInt(r), parseInt(g), parseInt(b));
    navigator.clipboard.writeText(hex);
  
    event.target.firstElementChild.innerHTML = 'Copied!';
  }
  
  function outFunc(e) {
    event.target.firstElementChild.innerHTML = 'Copy';
  }