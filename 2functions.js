xhistory = [];
yhistory = [];

framerate = 30;

first = true;

window.addEventListener("error", function(e) {
  if (location.hostname !== "") {createP('<p style="color:red">' + e.message + '</p>');}
});

var Y_INIT;

function setup() {
  createCanvas(750, 500);

  frameRate(framerate);

  xhistory[0] = x;
  yhistory[0] = y;
  Y_INIT = y;

  vxinit = vx;
  vyinit = vy;
    
  graph1 = new Graph();
  graph1.colorFunction = color(255,0,0);
  graph1. xTitle = "time";

  graph2 = new Graph();
  graph2.colorFunction = color(255,0,0);
  graph2. xTitle = "time";
  graph2.m_y = 75;

  this.focus();
}

// Size of the blob
var r = 40;

var isrunning = false;
var showarrows = false;
var driftisfixed = -1; // -1 is ?, 1 is true, 0 is false
var isvxeverneg = -1; // -1 is ?, 1 is true, 0 is false
var canmoveinposy = -1; // -1 is ?, 1 is true, 0 is false
var canmoveinnegy = -1;
var isvyeverneg = -1; 
var showpath = -1;
var showgraph = -1;
var xold;
var yold;
var vxold;
var vyold;
var drawpointhasrun = false;
var displayhasrun = false;
var graphwarning = false;

iterations = 0;

// Draw the blob and other stuff
function display() {
    background(250);
    textSize(12);
    textStyle(NORMAL);

    // clear all messages to the dom
    removeElements();

     if ( x - xold < 0 ) isvxeverneg = 1;
     wrapEdges();
  
     if (keyIsDown(LEFT_ARROW) & vx >= 0 & keyIsDown(RIGHT_ARROW) === false )  isvxeverneg = 0;
  
    if ((drawpointhasrun === true) & (displayhasrun === false)) {
     print("Warning: Add graphics like drawPoint AFTER display(); not before!"); 
     showpath = 0;
    }
  
  if (showpath === -1 & (drawpointhasrun === true) & (displayhasrun === true) ) {
     showpath = 1;
    }
  
  if (graphwarning)  {
    showgraph = 0;
//   print("Warning: graph commands should not be inside of for loop!"); 
  }

    if (graphwarning)  {
   createP('<p style="color:red"> Warning: graph commands should NOT be inside of for loop! </p>'); 
  }
    
  
    strokeWeight(10);
    var tri_width=7;
  
    if (iterations%5 == 1) {  
    append(xhistory,x);
    append(yhistory,y);
    }

    iterations += 1;   
  
    if ( abs(vx) > 0  |  abs(vy) > 0 ) {
     isrunning = true; 
    }
  
    MaxLength = 50;
  	if (xhistory.length > MaxLength) {
    xhistory = subset(xhistory,xhistory.length-MaxLength,xhistory.length);
    yhistory = subset(yhistory,yhistory.length-MaxLength,yhistory.length);  
    }  
  
    fill(0,0,0); //If more text is written elsewhere make sure the default is black
    stroke(0,0,0); // If more lines are drawn elsewhere make sure the default is black
    strokeWeight(0);
  
		textSize(20);
	  strokeWeight(1);
 
    xold = x;
    yold = y;
    vxold = vx;
    vyold = vy;
    displayhasrun = true;
}

function wrapEdges() {
    var buffer = r*2;
    if (x > width +  buffer) { 
    x = -buffer;
  isvxeverneg = -1;
    }
  
    else if (x <    -buffer) x = width+buffer;
    //if (y > height + buffer) y = -buffer;
    //else if (y <    -buffer) y = height+buffer;

}

function drawBox( _x,  _y, _vx, _vy){
    ellipseMode(RADIUS);
    strokeWeight(2);
    //    fill(255);
    noFill();
    stroke(0);
    rect(_x, height - _y, r, r);  
  
    //strokeWeight(2);
    point(_x+r/2,height-_y+r/2);

    strokeWeight(10);
    var tri_width=7;

    // Draw velocity arrow
    var v_scaling=5.0;
    stroke(255,0,0); // makes the line red
    strokeWeight(3); // makes the line thicker

    if ( ((_vx !== 0) || (_vy !== 0)) && showarrows) {
        drawLine(_x,_y,_x+v_scaling*_vx,_y+v_scaling*_vy);
        var vel_angle = -atan2(_vy,_vx);
        fill(255,0,0); // makes the triangle red
        drawTriangle(_x+v_scaling*_vx+sin(vel_angle)*tri_width/2,_y+v_scaling*_vy+cos(vel_angle)*tri_width/2,_x+v_scaling*_vx-sin(vel_angle)*tri_width/2,_y+v_scaling*_vy-cos(vel_angle)*tri_width/2,_x+v_scaling*_vx+cos(vel_angle)*10,_y+v_scaling*_vy-sin(vel_angle)*10);
    }
  
    fill(0,0,0); //If more text is written elsewhere make sure the default is black
    stroke(0,0,0); // If more lines are drawn elsewhere make sure the default is black
    strokeWeight(0);

}

function drawEllipse( _x,  _y,  _w,  _h){
  ellipse(_x, height - _y, _w, _h);  
}

function drawLine( _x1,  _y1,  _x2,  _y2){
  strokeWeight(2);
  line(_x1, height - _y1, _x2, height - _y2);  
//  strokeWeight(0);
}

function drawPoint( _x,  _y){
    strokeWeight(2);
    stroke(0);
    point(_x, height - _y);  
    strokeWeight(0);
    drawpointhasrun = true;
}

function drawQuad( _x1,  _y1,  _x2,  _y2,  _x3,  _y3,  _x4,  _y4){
  quad(_x1, height - _y1, _x2, height - _y2, _x3, height - _y3, _x4, height - _y4);  
}

function drawRect( _x,  _y,  _w,  _h){
  rect(_x, height - _y, _w, _h);  
}

function drawRect( _x,  _y,  _w,  _h,  _r){
  rect(_x, height - _y, _w, _h, _r);  
}

function drawRect( _x,  _y,  _w,  _h,  _tl,  _tr,  _br,  _bl){
  rect(_x, height - _y, _w, _h, _tl, _tr, _br, _bl);  
}

function drawTriangle( _x1,  _y1,  _x2,  _y2,  _x3,  _y3){
  triangle(_x1, height - _y1, _x2, height - _y2, _x3, height - _y3);
}

function drawText( _str,  _x, _y){
    if (isNumeric(_str)){
        _str = round(100*_str)/100;
    }
    textSize(20);  
    strokeWeight(1);
    text(_str, _x, height- _y);
}

function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

function Graph() {
  
  this.m_x = 450;
  this.m_y = 290;
  this.frameCount = 0;
  
  m_size_x = 200;
  m_size_y = 200;
  
  fontSize = 25;
  
  this.DataArray = [];
  this.PlotArray = [];
  
  this.colorFunction = color(0,0,0);

  this.xTitle = "";
  this.yTitle = "";
  
  this.minY = 0;
  this.maxY = 0;
  
  this.increaseMarginFactor = 1.4;
  
  this.display = function() {
    this.setTitle();
    this.setAxes();
    this.calcPlotArray();
    this.drawPoints();
    //print(this.DataArray);
    this.frameCount = frameCount;
  }
  
  this.setTitle = function (){
    textSize(fontSize);
    fill(0,0,0);
    noStroke();
    text(this.xTitle, (this.m_x + m_size_x - this.xTitle.length*fontSize/2), (this.m_y + m_size_y/2 + 25));
    text(this.yTitle, (this.m_x - 25),(this.m_y + fontSize));    
  }
  
  this.setAxes = function() {
    stroke(0);
    strokeWeight(2);
//      line(this.m_x,this.m_y,this.m_x,this.m_y+m_size_y);
      line(this.m_x,this.m_y,this.m_x,this.m_y+m_size_y);
//            line(this.m_x,this.m_y-m_size_y,this.m_x,this.m_y);
    line(this.m_x,this.m_y+m_size_y/2,this.m_x+m_size_x,this.m_y+m_size_y/2);
  }
  
  this.addPoint = function( newpoint ) {
    if (this.frameCount == frameCount) {
    // print("Warning!");
     graphwarning = true;
    }
    
  showgraph = 1;
  if (iterations%2 === 0) {
    if (isrunning) {
      append(this.DataArray, newpoint); 
    }
  }

       MaxLength = 200;
  	if (this.DataArray.length > MaxLength) {
    this.DataArray = subset(this.DataArray,this.DataArray.length-MaxLength,this.DataArray.length);
     }  
      
  }
  
  this.calcPlotArray = function() {

//   this.minY = 0; 
   this.minY = this.increaseMarginFactor*min(this.DataArray);
   this.maxY = this.increaseMarginFactor*max(this.DataArray);

      if (abs(this.maxY) > abs(this.minY))  {
          this.minY = -this.maxY;
      } else {
          this.maxY = -this.minY;
      }
      
  // this.PlotArray = m_size_y*this.DataArray/this.maxY;
    //this.PlotArray = this.DataArray;
    for(var i = 0; i < this.DataArray.length ; i++){
//	this.PlotArray[i] = m_size_y*this.DataArray[i]/this.maxY;
	this.PlotArray[i] = 0.5*m_size_y*(this.DataArray[i]-0.5*(this.maxY+this.minY))/(0.5*abs(this.maxY-this.minY));
    }
  }

  this.drawPoints = function() {
   for (var i = 1; i < this.PlotArray.length ; i++) {
    //print(i);
    xi = m_size_x*i/this.PlotArray.length;
    xi_previous = m_size_x*(i-1)/this.PlotArray.length;
     //print(xi);
     strokeWeight(2);
     //stroke(0);
    stroke(this.colorFunction);
//    point(this.m_x+xi,this.m_y+m_size_y-this.PlotArray[i]);
     line(this.m_x+xi,this.m_y+m_size_y/2-this.PlotArray[i],this.m_x+xi_previous,this.m_y+m_size_y/2-this.PlotArray[i-1]);
     stroke(0);
   }
  }
}