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

let imgs = [];

function preload() {
  for (let i = 0; i < 4; i++) {
    imgs[i] = loadImage(`images/icon${i}.png`);
  }
}

function setup() {
  createCanvas(HEIGHT, WIDTH);
}

function draw() {
  background(0, 75, 155);
  for (let i = 0; i < balls.length; i++) {
    // for (let ball of balls) {
    balls[i].show();
    balls[i].move();
    balls[i].bounce();
    balls[i].drag(mouseX, mouseY);
    balls[i].stayInsideCanvas();
    for (let j = i + 1; j < balls.length; j++) {
      if (balls[i].intersects(balls[j]) && !balls[i].isbeingdragged && !balls[j].isbeingdragged) {
        balls[i].rebound();
        balls[j].rebound();
      }
    }
  }
}

function mousePressed() {
  Ball.createBall();
  for (let ball of balls) {
    ball.mouseInside(mouseX, mouseY);
  }
}

class Ball {
  constructor(x, y, img) {
    this.x = x;
    this.y = y;
    this.d = 120;
    this.r = this.d / 2;
    this.img = img;
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

  static createBall() {
    let img = random(imgs);
    if (ball_amount < BALL_LIMIT) {
      let ball = new Ball(mouseX, mouseY, img);
      balls.push(ball);
      ball_amount++;
    }
  }

  show() {
    image(this.img, this.x - this.r, this.y - this.r, this.d, this.d);
    // - this.r to center the image
  }

  move() {
    this.x += this.speed.x;
    this.y += this.speed.y;
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

  mouseInside(x, y) {
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
    let distance = dist(this.x + this.speed.x, this.y + this.speed.y, other.x + other.speed.x, other.y + other.speed.y);
    return (distance <= this.r + other.r);
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