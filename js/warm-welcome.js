/*****************

A warm welcome
Sylvain Tran

This is about studying velocity and speed more deeply.
What can we do with motion? What things can be moved
in a non-usual way?

Click Me When I'm Visible

Click the rogue ellipse while it's visible!

******************/

// preload()
//
// Description of preload
let x = 0;
let y = 0;
let vx = 0;
let vy = 0;
let speed = 2;
let fillColor = 0;
let radius = 50;

// Handles corner collisions
function handleCollisions(x, y) {
  if(x <= 0 + radius && y <= 0 + radius)
  {
    vx = vy = speed;
  }
  if(x >= 500 - radius && y >= 500 - radius)
  {
    vx = vy = -speed;
  }
}

// dist
//
// distance calculation
function dist(x1,y1,x2,y2)
{
  return sqrt(sq(x2-x1) + sq(y2 - y1));
}
// mousePressed
//
// Handles mouse press with something funny and cool
function mousePressed()
{
  dist(x,y,mouseX,mouseY);
  // If the mouse is on the circle
  if(dist(x,y,mouseX,mouseY) < radius)
  {
    // Flip the velocities
    vx = -vx;
    vy = -vy;
  }
}

// preload
//
// Preloads the assets
function preload() {

}

// setup
//
// Setups the canvas and initializes the ellipse in the centre
// The velocities are initialized too.
function setup() {
  createCanvas(250,250);
  x = width/2;
  y = height/2;
  vx = -speed;
  vy = -speed;
  // For radius vs. dist calculations, we want to ellipse's origin to be the ellipse's center
  ellipseMode(CENTER);
}

//new p5(sketch, 'canvas__sketches--01');

// draw
//
// Draws the ellipse in motion
function draw() {
  clear();
  x = x + vx;
  y = y + vy;
  fillColor += vx;
  fill(fillColor);
  ellipse(x,y,radius,radius);
  // Wraps around the origin and the max canvas size
  handleCollisions(x, y);
}
