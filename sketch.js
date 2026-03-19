var period;
var freq;
var radius;
var period;
var radius;
var type;
var mode;
var t = 0;
var x = 0;
var y = 0;
var graphTime = 250;
var trailTime = 0;
var trail = [];
var pauseCheck;

function setup() {
  createCanvas(600, 600);
  type = createSelect();
  type.option('Vertical');
  type.option('Horizontal');
  type.option('Vertical + Horizontal');
  T = createSlider(0.5, 3, 1, 0.05);
  r = createSlider(0.5, 5, 1, 0.5);
  pauseCheck = createCheckbox();
  frameRate(240);
  angleMode(RADIANS);
}

function draw() {
  background(220);
  period = T.value(); 
  text("Period: " + period + " second(s)", 250, 590);
  radius = r.value();
  text("Amplitude: " + radius + "m", 402, 590);
  text("To pause, click the checkbox.", 20, 580);
  mode = type.selected();
  
  r.input(reset);
  T.input(reset);
  type.input(reset);
  
  if(pauseCheck.checked()){
      x = radius * cos(2 * PI * t / period);
      y = -radius * sin(2 * PI * t / period);
      textSize(16);
      text("PAUSED", 60, 596);
      textSize(12);
  } else {
      t += deltaTime / 1000;
      x = radius * cos(2 * PI * t / period);
      y = -radius * sin(2 * PI * t / period);
  }
  
  if (type.selected() == 'Vertical') {
      strokeWeight(2);
      circle(60, 40 * y + 300, 10);
      strokeWeight(1);
      line(50, 300, 70, 300);
      text("center", 7, 304);
      line(50, 300 + 40 * radius, 70, 300 + 40 * radius);
      line(50, 300 - 40 * radius, 70, 300 - 40 * radius);    
      line(80, 300, 90, 300);
      line(80, 300 - 40 * radius, 90, 300 - 40 * radius);
      line(85, 300, 85, 300 - 40 * radius);
      text("amplitude", 95, 303 - 20 * radius);
      line(250, 260 - 40 * radius, 250, 340 + 40 * radius);
      line(250, 300, 550, 300);
      text("y position from center (m)" , 260, 340 + 40 * radius);
      text("time (s)", 555, 303);
      
      if (pauseCheck.checked()) {
          for(var i = 0; i < trail.length; i++){
              point(trail[i].x, trail[i].y);
          }
          circle(graphTime, 300 + 40 * y, 5);
      } else {
          if (graphTime >= 500) {
              graphTime = 250
              trail = [];
          } else {
              graphTime += 100 * deltaTime / 1000
          }

          trail.push({x: graphTime, y: 300 + 40 * y});
          for(var j = 0; j < trail.length; j++){
              point(trail[j].x, trail[j].y);
          }
          circle(graphTime, 300 + 40 * y, 5);
      }
  } else if (type.selected() == "Horizontal") {
      strokeWeight(2);
      circle(40 * x + 300, 100, 10);
      strokeWeight(1);
      line(300, 90, 300, 110);
      text("center", 285, 80);
      line(300 - 40 * radius, 90, 300 - 40 * radius, 110);
      line(300 + 40 * radius, 90, 300 + 40 * radius, 110);
      line(300, 115, 300, 125);
      line(300 + 40 * radius, 115, 300 + 40 * radius, 125);
      line(300, 120, 300 + 40 * radius, 120);
      text("amplitude", 275 + 20 * radius, 137);
      line(120, 260 - 20 * radius, 120, 340 + 20 * radius);
      line(120, 300, 420, 300);
      text("x position from center (m)" , 130, 340 + 20 * radius);
      text("time (s)", 425, 303);

      if (pauseCheck.checked()){
          for(var k = 0; k < trail.length; k++){
              point(trail[k].x, trail[k].y);
          }
          circle(graphTime, 300 - 20 * x, 5);
      } else {
          if (graphTime >= 370) {
              graphTime = 120
              trail = [];
          } else {
              graphTime += 60 * deltaTime / 1000
          }

          trail.push({x: graphTime, y: 300 - 20 * x});
          for(var l = 0; l < trail.length; l++){
              point(trail[l].x, trail[l].y);
          }
          circle(graphTime, 300 - 20 * x, 5);
      }
  } else {
      strokeWeight(2);
      circle(15 * x + 260, 15 * y + 100, 10);
      strokeWeight(3);
      point(260, 100);
      strokeWeight(1);

      line(260, 140 + 15 * radius, 260, 160 + 15 * radius);
      line(260 - 15 * radius, 140 + 15 * radius, 260 - 15 * radius, 160 + 15 * radius);
      line(260 + 15 * radius, 140 + 15 * radius, 260 + 15 * radius, 160 + 15 * radius);
      line(260, 170 + 15 * radius, 260, 180 + 15 * radius);
      line(260 + 15 * radius, 170 + 15 * radius, 260 + 15 * radius, 180 + 15 * radius);
      line(260, 175 + 15 * radius, 260 + 15 * radius, 175 + 15 * radius);
      text("^", 257 + 7.5 * radius, 192 + 15 * radius);
      text("|", 258.5 + 7.5 * radius, 198 + 15 * radius);
      text("amplitude", 234 + 7.5 * radius, 211 + 15 * radius);

      line(300 + 15 * radius, 100, 320 + 15 * radius, 100);
      line(300 + 15 * radius, 100 - 15 * radius, 320 + 15 * radius, 100 - 15 * radius);
      line(300 + 15 * radius, 100 + 15 * radius, 320 + 15 * radius, 100 + 15 * radius);
      line(330 + 15 * radius, 100, 340 + 15 * radius, 100);
      line(330 + 15 * radius, 100 - 15 * radius, 340 + 15 * radius, 100 - 15 * radius);
      line(335 + 15 * radius, 100, 335 + 15 * radius, 100 - 15 * radius);
      text("<", 352 + 15 * radius, 104 - 7.5 * radius);
      text("— amplitude", 359 + 15 * radius, 103.5 - 7.5 * radius);

      line(30, 405 - 15 * radius, 30, 485 + 15 * radius);
      line(30, 445, 230, 445);
      text("y position from center (m)" , 40, 485 + 15 * radius);
      text("time (s)", 235, 448);
    
      line(340, 405 - 15 * radius, 340, 485 + 15 * radius);
      line(340, 445, 540, 445);
      text("x position from center (m)" , 350, 485 + 15 * radius);
      text("time (s)", 545, 448);

      if (pauseCheck.checked()){
          for(var m = 0; m < trail.length; m++){
              point(trail[m].x, trail[m].y);
          }
          circle(graphTime, 445 + 15 * y, 5);
        
          for(var n = 0; n < trail.length; n++){
              point(trail[n].x, trail[n].y);
          }
          circle(graphTime + 310, 445 - 15 * x, 5);
      } else {
          if (graphTime >= 220) {
              graphTime = 30
              trail = [];
          } else {
              graphTime += 110 * deltaTime / 1000
          }

          trail.push({x: graphTime, y: 445 + 15 * y});
          for(var o = 0; o < trail.length; o++){
              point(trail[o].x, trail[o].y);
          }
          circle(graphTime, 445 + 15 * y, 5);
        
          trail.push({x: graphTime + 310, y: 445 - 15 * x});
          for(var p = 0; p < trail.length; p++){
              point(trail[p].x, trail[p].y);
          }
          circle(graphTime + 310, 445 - 15 * x, 5);
      }
  }
}

function reset() {
  trail = [];
  if (type.selected() == 'Vertical') {
      graphTime = 250;
  } else if (type.selected() == 'Horizontal') {
      graphTime = 120;
  } else {
      graphTime = 30;
  }
}