//Solo Pong by Quinn Wagner

float xpos;
float ypos;
float xvel;
float yvel;
int i = 0;

void setup(){
  size (800,400);
  fill (0);
  noCursor();
  smooth();

  frameRate = 120;
  xpos = random(0,800);//where ball spawns in x
  ypos = random(0,100);//where ball spawns in y
  xvel = 6;//starting speed
  yvel = 6;//starting speed


} //end of setup

void draw(){

  background(0);
  fill (255);
  ellipse (xpos, ypos, 20,20);//ball
  rectMode(CENTER);
  fill (255);
  rect(mouseX,380, 60,10);//paddle
  xpos += xvel;
  ypos += yvel;


fill(225,0,0);
 textSize(20);
text("Press E For Easy",330,200);

fill(225,0,0);
 textSize(20);
text("Score"+i,370,220);

fill(225,0,0);
 textSize(20);
text("Press H For Hard",328,180);

   if (keyPressed) {
    if (key == 'e' || key == 'h'){
 i=0;//reset score
 start();//reset game
  }
 }

 checkdifficulty();
} //end of draw

void checkdifficulty(){
  if (key == 'h'){//parameters for hard game

  if (xpos >= width)
  {
    xvel = random(-8,-12);
  }
  if (xpos < 0)
  {
    xvel = random(8,12);
  }
  if (ypos < 0)
  {
    yvel = random(8,12);
  }
  if (xpos >= pmouseX-40 && xpos <= pmouseX+40)
  {

  if (ypos >= 380  && ypos <= 400)
  {
    yvel = random(-8,-12);
    i++;
  }
  }
  }

    else{//parameters for easy/default game

  if (xpos >= width)
  {
    xvel = -6;
  }
  if (xpos < 0)
  {
    xvel = 6;
  }
  if (ypos < 0)
  {
    yvel = 6;
  }
  if (xpos >= pmouseX-40 && xpos <= pmouseX+40)
  {

  if (ypos >= 380  && ypos <= 400)
  {
    yvel = -6;
    i++;
  }
  }

}
} //end of checkdifficulty

void start(){
  frameRate = 120;
  xpos = random(0,800);//where ball spawns in x
  ypos = random(0,100);//where ball spawns in y
  xvel = 6;//starting speed
  yvel = 6;//starting speed
}
