//Testing GitHub

const WIDTH = 500;
const HEIGHT = 500;
const BALL_LIMIT = 20;

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
}

function mousePressed() {
  createBall();
}

function draw() {
  background(0);
  for (let i = 0; i < balls.length; i++) {
    balls[i].color.r = map(balls[i].x, 0, WIDTH, 150, 255);
    balls[i].color.g = map(balls[i].y, 0, HEIGHT, 0, 120);
    balls[i].color.b = map(balls[i].y, 0, HEIGHT, 100, 255);

    balls[i].show();
    balls[i].move();
    balls[i].bounce();
  }
}

class Ball {
  constructor(x, y, s_x, s_y) {
    this.x = x;
    this.y = y;
    this.d = 50;
    this.speed = {
      x: s_x,
      y: s_y
    };
    this.color = {
      r: 0,
      g: 10,
      b: 0
    };
  }

  show() {
    noStroke();
    fill(this.color.r, this.color.g, this.color.b);
    ellipse(this.x, this.y, this.d, this.d);
  }

  move() {
    this.x += this.speed.x;
    this.y += this.speed.y;
  }

  bounce() {
    if (this.x >= edge.right - this.d / 2 || this.x <= edge.left + this.d / 2) {
      this.speed.x = this.speed.x * -1;
    }

    if (this.y <= edge.top + this.d / 2 || this.y >= edge.bottom - this.d / 2) {
      this.speed.y = this.speed.y * -1;
    }
  }
}

function createBall() {
  if (ball_amount <= BALL_LIMIT) {
    let s_x = random(2, 7);
    let s_y = random(2, 7);

    let ball = new Ball(mouseX, mouseY, s_x, s_y);
    balls.push(ball);
    ball_amount += 1;
  }
}