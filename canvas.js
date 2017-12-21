var canvas = document.getElementById("canvas");
var ctx = canvas.getContext('2d');
var s = 0;
var xpos = Math.floor(Math.random() * canvas.width);
var ypos = Math.floor(Math.random() * canvas.height/4);
var xvel = 4;
var yvel = 5;
var mouseX;
var mouseY;


window.onload = function() {
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
  // console.log(this.x+this.l/2);
 }
}

function Ball(c,x,y,s,pl,ph){
	this.c = c; this.x = x; this.y = y; this.s = s; this.pl = pl; this.ph = ph;
  this.displayVals = function() {console.log(this);}
	this.drawBall = function(){
    		ctx.fillStyle = this.c;
    		ctx.fillRect(this.x,this.y,this.s,this.s);
	}

	this.isAlive = function(){return this.y<canvas.height;}

	this.play = function(xvel, yvel){
		this.x += xvel; this.y += yvel;
		xvel += .001; yvel += .001;
		if (this.x >= canvas.width){xvel *= -1;};
		if (this.x <= 0){xvel *= -1};
		if ((this.x >= mouseX - this.pl/2) && (this.x <= mouseX + this.pl/2)){
			if ((this.y >=  canvas.height - this.ph) && (this.y <= canvas.height)){
				yvel *= -1;
				s++;
		}
	}
		if (this.y <= 0){yvel *= -1};
	}
}

function Canvas() {
    var pad = new Paddle("#FFFFFF",mouseX,canvas.height,canvas.width/10,canvas.height/20);
    var bal = new Ball("FFFFFF",xpos, ypos, canvas.width/100,pad.l,pad.h);
    console.log(mouseX);
    window.requestAnimationFrame(Canvas);
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.font = "8px Arial";
    ctx.fillStyle = "#ff0000";
    ctx.fillText("Score: "+s, 8, 20);
	  pad.drawPaddle();
	  bal.drawBall();
    bal.play(3,3);
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
    rect = canvas.getBoundingClientRect();
    return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
    };
 };
