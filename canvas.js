var canvas = document.getElementById("canvas");
var ctx = canvas.getContext('2d');
var score = 0;
var xpos = Math.floor(Math.random() * canvas.width);
var ypos = Math.floor(Math.random() * canvas.height/4);
var right = 1; var down = 1; var left = -1; var up = -1;
var xvel = right; var yvel = down;
var mouseX; var mouseY;

window.onload = function() {
  // loadScreen();
  canvas.addEventListener("click", Canvas);
  canvas.addEventListener('mousemove', reportMousePos, false);
}

function Paddle(c,x,y,l,h){
	this.c = c;this.l = l;this.h = h;
  this.x = x - this.l/2;
  this.y = y - this.h/2;
  this.displayVals = function(){console.log(this);}
	this.drawPaddle = function(){
	ctx.fillStyle = this.c;
	ctx.fillRect(this.x,this.y,this.l,this.h);
 }
}

function Ball(c,x,y,s,pl,ph){
	this.c = c; this.s = s; this.pl = pl; this.ph = ph;
  this.x = x - this.s/2;
  this.y = y - this.s/2;
  this.displayVals = function() {console.log(this);}
	this.drawBall = function(){
    ctx.fillStyle = this.c;
    ctx.fillRect(this.x,this.y,this.s,this.s);
	}
	this.isAlive = this.y<canvas.height;
	this.play = function(){
		if (this.x >= canvas.width - this.s){xvel = left}
    if (this.x <= 0 + this.s){xvel = right}
		if ((this.x > mouseX - this.pl/2) && (this.x < mouseX + this.pl/2)){
			if ((this.y > canvas.height - this.ph) && (this.y < canvas.height)){
				yvel = up;
				score++;
		}
	 }
		if (this.y <= 0){yvel = down};
	}
}

function move(){
  xpos += xvel; ypos += yvel;
  down += .001; up -= .001;
  right += .001; left -= .001;
}

function Canvas() {
  window.requestAnimationFrame(Canvas);
    var pad = new Paddle("#FFFFFF",mouseX,canvas.height,canvas.width/10,canvas.height/20);
    var bal = new Ball("#FFFFFF",xpos, ypos, canvas.width/80,pad.l,pad.h);
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.font = "8px Arial";
    ctx.fillStyle = "#ff0000";
    ctx.fillText("Score: "+score, canvas.width/20, canvas.height/12);
	  pad.drawPaddle();
	  bal.drawBall();
    move();
    bal.play();


    if(!bal.isAlive){
      window.cancelAnimationFrame(Canvas);
    }
}

function reportMousePos(e) {
    mousePos = getMousePos(canvas, e); //give the heavy lifting to another function
    mouseX = mousePos.x;
    mouseY = mousePos.y;
    var message = 'Mouse position: ' + mousePos.x + ',' + mousePos.y;
    // console.log(message);

}

//define a helper function to do the "heavy lifting" of calculating the mouse coordinates
function getMousePos(canvas, e) {
  var rect = canvas.getBoundingClientRect(), // abs. size of element
    scaleX = canvas.width / rect.width,    // relationship bitmap vs. element for X
    scaleY = canvas.height / rect.height;  // relationship bitmap vs. element for Y

return {
  x: (e.clientX - rect.left) * scaleX,   // scale mouse coordinates after they have
  y: (e.clientY - rect.top) * scaleY     // been adjusted to be relative to element
 }
}

function loadScreen(){
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.font = "8px Arial";
  ctx.fillStyle = "#000000";
  ctx.fillText("Click to Start", window.width/2, window.height/2);
}
