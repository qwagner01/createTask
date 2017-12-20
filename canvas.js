var canvas = document.getElementById("canvas");
var ctx = canvas.getContext('2d');
var mouseX;
var xpos = Math.floor(Math.random() * canvas.width);
var ypos = Math.floor(Math.random() * canvas.height/4);
var xvel = 4;
var yvel = 5;
var s = 0;

window.onload = function() {
    var pad = new Paddle("#FFFFFF",mouseX,canvas.height,canvas.width/10,canvas.height/20);
    var bal = new Ball("FFFFFF",xpos, ypos, canvas.width/30);
    canvas.addEventListener("click", Run);
    canvas.addEventListener('mousemove', reportMousePos, true);
    function reportMousePos(e) {
        mousePos = getMousePos(canvas, e);
        mouseX = mousePos.x;
        mouseY = mousePos.y;
        var message = 'Mouse position: ' + mousePos.x + ',' + mousePos.y;
    }
    function getMousePos(canvas, e) {
        rect = canvas.getBoundingClientRect();
        return {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        };
    }
}

function Run(){
  while (bal.isAlive) {
    Canvas();
  }
  window.cancelRequestAnimationFrame(Canvas);
}

function Paddle(c,x,y,l,h){
	this.c = c; this.l = l; this.h = h;
	this.x = mouseX;
	this.y = canvas.height;
	this.drawPaddle = function(){
	rectMode(CENTER);
	fill(this.c);
	rect(this.x,this.y,this.l,this.h);
 }
}

function Ball(c,x,y,s){
	this.c = c; this.x = x; this.y = y; this.s = s; this.pl = pl; this.ph = ph;

	this.drawBall = function(){
    ctx.fillStyle = this.c;
    ctx.fillRect(this.x,this.y,this.s,this.s);
	}

	this.isAlive = function(){return(this.y<canvas.height)};

	this.play = function(xvel, yvel){
		this.x += xvel; this.y += yvel;
		xvel += .001; yvel += .001;
		if (this.x >= canvas.width){xvel *= -1;}
		if (this.x <= 0){xvel *= -1};
		if ((this.x >= mouseX - this.pl/2) && (this.x <= mouseX + this.pl/2)){
			if ((this.y >=  canvas.height - this.ph) && (this.y <= canvas.height)){
				yvel *= -1;
		}
	}
		if (this.y <= 0){yvel *= -1};
	}
}

function Canvas() {
    window.requestAnimationFrame(Canvas);
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.font = "16px Arial";
    ctx.fillStyle = "#ff0000";
    ctx.fillText("Score: "+s, 8, 20);
    bal.drawBall();
    ctx.fillStyle = "#ffffff";
    ctx.fillRect();
    bal.play(3,3);
}
