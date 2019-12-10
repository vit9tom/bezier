var canvas;
var ctx;
var xa = 275;
var ya = 340;
var xca = 25;
var yca = 65;
var xb = 375;
var yb = 50;
var xcb = 507;
var ycb = 165;
var WIDTH = 700;
var HEIGHT = 400;
var dragok = false;
var pointA = false;
var pointControlA = false;
var pointB = false;
var pointControlB = false;

function rect(x,y,w,h) {
 ctx.beginPath();
 ctx.rect(x,y,w,h);
 ctx.closePath();
 ctx.fill();
}

function clear() {
 ctx.clearRect(0, 0, WIDTH, HEIGHT);
}

function init() {
 canvas = document.getElementById("bezier");
 ctx = canvas.getContext("2d");
 canvas.setAttribute('width', WIDTH);
 canvas.setAttribute('height', HEIGHT);
 return setInterval(draw, 10);
}

function draw() {
 clear();
 ctx.fillStyle = "#FAF7F8";
 rect(0,0,WIDTH,HEIGHT);
 ctx.fillStyle = "#444444";
 rect(xa - 5, ya - 5, 10, 10);
 rect(xb - 5, yb - 5, 10, 10);
 ctx.fillStyle = "#0095cd"; 
 rect(xca - 5, yca - 5, 10, 10);
 rect(xcb - 5, ycb - 5, 10, 10);
 
  lerp(xa, ya, xca, yca);
  lerp(xb, yb, xcb, ycb);
  
  bezier();
}

function lerp(pAx, pAy, pBx, pBy){
  ctx.strokeStyle = "#0095cd";
  ctx.beginPath();
  ctx.moveTo(pAx,pAy);
  ctx.lineTo(pBx,pBy);
  ctx.stroke();
}

function bezier(){
  ctx.strokeStyle ="#000";
  ctx.beginPath();
  ctx.moveTo(xa,ya);
  ctx.bezierCurveTo(xca,yca,xcb,ycb,xb,yb);
  ctx.stroke();
}
function myMove(e){
 if (dragok){
   if (pointA){
     xa = e.pageX - canvas.offsetLeft;
     ya = e.pageY - canvas.offsetTop;
   } else if (pointB){
     xb = e.pageX - canvas.offsetLeft;
     yb = e.pageY - canvas.offsetTop;
   } else if (pointControlA){
     xca = e.pageX - canvas.offsetLeft;
     yca = e.pageY - canvas.offsetTop;
   } else if (pointControlB){
     xcb = e.pageX - canvas.offsetLeft;
     ycb = e.pageY - canvas.offsetTop;
   }
 }
}

function myDown(e){
 if (e.pageX < xa + 5 + canvas.offsetLeft && e.pageX > xa - 5 +
 canvas.offsetLeft && e.pageY < ya + 5 + canvas.offsetTop &&
 e.pageY > ya - 5 + canvas.offsetTop){
  xa = e.pageX - canvas.offsetLeft;
  ya = e.pageY - canvas.offsetTop;
  dragok = true;
  pointA = true;
  canvas.onmousemove = myMove;
 } else if (e.pageX < xb + 5 + canvas.offsetLeft && e.pageX > xb - 5 +
 canvas.offsetLeft && e.pageY < yb + 5 + canvas.offsetTop &&
 e.pageY > yb -5 + canvas.offsetTop){
  xb = e.pageX - canvas.offsetLeft;
  yb = e.pageY - canvas.offsetTop;
  dragok = true;
  pointB = true;
  canvas.onmousemove = myMove;
 } else if (e.pageX < xca + 5 + canvas.offsetLeft && e.pageX > xca - 5 +
 canvas.offsetLeft && e.pageY < yca + 5 + canvas.offsetTop &&
 e.pageY > yca -5 + canvas.offsetTop){
  xca = e.pageX - canvas.offsetLeft;
  yca = e.pageY - canvas.offsetTop;
  dragok = true;
  pointControlA = true;
  canvas.onmousemove = myMove;
 } else if (e.pageX < xcb + 5 + canvas.offsetLeft && e.pageX > xcb - 5 +
 canvas.offsetLeft && e.pageY < ycb + 5 + canvas.offsetTop &&
 e.pageY > ycb -5 + canvas.offsetTop){
  xcb = e.pageX - canvas.offsetLeft;
  ycb = e.pageY - canvas.offsetTop;
  dragok = true;
  pointControlB = true;
  canvas.onmousemove = myMove;
 }
}

function myUp(){
 dragok = false;
 pointA = false;
 pointControlA = false;
 pointB = false;
 pointControlB = false;
 canvas.onmousemove = null;
}

init();
canvas.onmousedown = myDown;
canvas.onmouseup = myUp;