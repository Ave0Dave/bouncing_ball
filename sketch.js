const WIDTH = 700;
const HEIGHT = 700;
const BALL_LIMIT = 10;

let balls = [];
let ball_amount = 0;

let edge = {
  top: 0,
  bottom: HEIGHT,
  left: 0,
  right: WIDTH
};

function setup() {
  createCanvas(HEIGHT, WIDTH);
  balls[0] = new Ball; //todo: fix this horrible workaround
}

function draw() {
  background(204, 235, 255);
  //for (let i = 0; i < balls.length; i++) {
  for (let ball of balls) {
    ball.show();
    ball.move();
    ball.changeColor(HEIGHT, WIDTH);
    ball.bounce();
    ball.drag(mouseX, mouseY);
    ball.stayInsideCanvas();
    for (let other of balls) {
      if (ball != other && ball.intersects(other) && !ball.isbeingdragged && !other.isbeingdragged) { //todo: optimize checking other balls
      }
    }
  }
}

function mousePressed() { //have to be in separate loops becouse of break statement
  for (let ball of balls) {
    ball.createBall();
    break;
  }
  for (let ball of balls) {
    ball.mouseInside(mouseX, mouseY); //if moved to setup() locked boolean doesn't work properly
  }
}

class Ball {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.d = 90;
    this.r = this.d / 2;
    this.speed = {
      x: random(1, 4),
      y: random(1, 4)
    };
    this.color = {
      r: 0,
      g: 10,
      b: 0
    };
  }

  createBall() {
    if (ball_amount < BALL_LIMIT) {
      let ball = new Ball(mouseX, mouseY);
      balls.push(ball);
      ball_amount++;
    }
  }

  show() {
    noStroke();
    fill(this.color.r, this.color.g, this.color.b)
    ellipse(this.x, this.y, this.d, this.d);
  }

  move() {
    this.x += this.speed.x;
    this.y += this.speed.y;
  }

  changeColor(value_1, value_2) {
    this.color.r = map(this.x, 0, value_1, 150, 255);
    this.color.g = map(this.y, 0, value_2, 0, 120);
    this.color.b = map(this.y, 0, value_2, 100, 255);
  }

  bounce() {
    if (this.x >= edge.right - this.d / 2 || this.x <= edge.left + this.d / 2) {
      this.speed.x = this.speed.x * -1; //todo: make bounce() and rebound() one function
    }

    if (this.y <= edge.top + this.d / 2 || this.y >= edge.bottom - this.d / 2) {
      this.speed.y = this.speed.y * -1;
    }
  }

  rebound() {
    this.speed.x = this.speed.x * -1;
    this.speed.y = this.speed.y * -1;
  }

  mouseInside(x, y) { //can't use it as a boolean in drag()??
    let distance = dist(this.x, this.y, x, y);
    this.locked = (distance < this.r);
  }

  drag(x, y) {
    this.isbeingdragged = false;
    if (ball_amount == BALL_LIMIT) {
      for (let ball of balls) {
        if (mouseIsPressed && this.locked) {
          this.x = x;
          this.y = y;
          this.isbeingdragged = true;
          break;
        }
      }
    }
  }

  intersects(other) {
    let distance = dist(this.x, this.y, other.x, other.y);
    return (distance <= this.r + other.r); //todo: fix collision detection
  }

  stayInsideCanvas() {
    if (this.x >= (edge.right - this.d / 2)) {
      this.x = edge.right - this.d / 2;
    }
    if (this.x <= (edge.left + this.d / 2)) {
      this.x = edge.left + this.d / 2;
    }
    if (this.y <= (edge.top + this.d / 2)) {
      this.y = edge.top + this.d / 2;
    }
    if (this.y >= (edge.bottom - this.d / 2)) {
      this.y = edge.bottom - this.d / 2;
    }
  }
}