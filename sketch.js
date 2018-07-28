//Testing GitHub

const width = 500;
const heigth = 500;

var ball = {
	x: width/2,
	y: heigth/2,
	d: 50,
	speed: {x: 3, y: 4},
	col: {r : 0, g: 10, b: 0}
};

var edge = {
	top: 0,
	bottom: heigth,
	left: 0,
	right: width
};

function display() {
	noStroke();
	fill(ball.col.r, ball.col.g, ball.col.b);
	ellipse(ball.x, ball.y, ball.d, ball.d);
}

function bounce() {
	if (ball.x >= edge.right - ball.d/2 || ball.x <= edge.left + ball.d/2) {
		ball.speed.x = ball.speed.x * -1;
	}
	 if (ball.y <= edge.top + ball.d/2 || ball.y >= edge.bottom - ball.d/2) {
	 	 ball.speed.y = ball.speed.y * -1;
	}
}

function move() {
	ball.x += ball.speed.x;
	ball.y += ball.speed.y;
}

function setup() {
	createCanvas(heigth, width);
}

function draw() {
	background(0);

	ball.col.r = map(ball.x, 0, width, 150, 255);
	ball.col.b = map(ball.y, 0, heigth, 100, 255);

	display();
	move();
	bounce();

}
