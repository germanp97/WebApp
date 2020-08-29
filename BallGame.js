var canvas;
var ctx;
var x;
var y;
var paddleX;
var ballRadius = 10;
var dx = 2;
var dy = -2;
var paddleHeight = 10;
var paddleWidth = 75;
var rightPressed = false;
var leftPressed = false;
var brickRowCount = 6;
var brickColumnCount = 3;
var brickWidth = 45;
var brickHeight = 20;
var brickPadding = 7;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;
var score = 0;
var counter;
var intervalCounter;
var interval;


function startGame() {
    counter = 4;
    document.getElementById("startGame").style.display = "none";
    document.getElementById("final-score").style.display = "none";
    intervalCounter = setInterval(timeIt, 1000);
}

function timeIt() {
    counter--;
    document.getElementById("counter").innerHTML = counter;
    document.getElementById("counter").style.display = "inline";
    if (counter === 0) {
        clearInterval(intervalCounter);
        interval = setInterval(draw, 10);
    }
}


document.addEventListener('DOMContentLoaded', function () {
    canvas = document.getElementById("myCanvas");
    canvas.width = screen.width;
    canvas.height = screen.height * 0.8;
    ctx = canvas.getContext("2d");
    x = canvas.width / 2;
    y = canvas.height - 30;
    paddleX = (canvas.width - paddleWidth) / 2
});

var bricks = [];
for (var c = 0; c < brickColumnCount; c++) {
    bricks[c] = [];
    for (var r = 0; r < brickRowCount; r++) {
        bricks[c][r] = {x: 0, y: 0, status: 1};
    }
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
    if (e.key === "Right" || e.key === "ArrowRight") {
        rightPressed = true;
    } else if (e.key === "Left" || e.key === "ArrowLeft") {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if (e.key === "Right" || e.key === "ArrowRight") {
        rightPressed = false;
    } else if (e.key === "Left" || e.key === "ArrowLeft") {
        leftPressed = false;
    }
}

function handleOrientation(event) {
    var rotation = event.gamma;
    var position = ((rotation / 90) * canvas.width) + (canvas.width / 2);
    if(position > 0 && (position) < canvas.width) {
        paddleX = position;
    }
}

function collisionDetection() {
    for (var c = 0; c < brickColumnCount; c++) {
        for (var r = 0; r < brickRowCount; r++) {
            var b = bricks[c][r];
            if (b.status === 1) {
                if (x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
                    dy = -dy;
                    b.status = 0;
                    score++;
                    if (score === brickRowCount * brickColumnCount) {
                        ctx.clearRect(0, 0, canvas.width, canvas.height);
                        document.getElementById("restartGame").style.display = "inline-block";
                        document.getElementById("final-score").innerHTML = "You Won! Your final score is: " + score;
                        document.getElementById("final-score").style.display = "inline";
                    }
                }
            }
        }
    }
}

function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function drawBricks() {
    for (var c = 0; c < brickColumnCount; c++) {
        for (var r = 0; r < brickRowCount; r++) {
            if (bricks[c][r].status === 1) {
                var brickX = (r * (brickWidth + brickPadding)) + brickOffsetLeft;
                var brickY = (c * (brickHeight + brickPadding)) + brickOffsetTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                ctx.fillStyle = "#0095DD";
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}

function drawScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Score: " + score, 8, 20);
}

function draw() {
    document.getElementById("counter").style.display = "none";
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBricks();
    drawBall();
    drawPaddle();
    drawScore();
    collisionDetection();

    if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
        dx = -dx;
    }
    if (y + dy < ballRadius) {
        dy = -dy;
    } else if (y + dy > canvas.height - ballRadius) {
        if (x > paddleX && x < paddleX + paddleWidth) {
            dy = -dy;
        } else {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            document.getElementById("restartGame").style.display = "inline-block";
            document.getElementById("final-score").innerHTML = "Game Over! Your final score is: " + score;
            document.getElementById("final-score").style.display = "inline";
        }
    }

    if (rightPressed && paddleX < canvas.width - paddleWidth) {
        paddleX += 7;
    } else if (leftPressed && paddleX > 0) {
        paddleX -= 7;
    }

    x += dx;
    y += dy;
}

function restart() {
    document.location.reload();
    clearInterval(interval);
}

window.addEventListener("deviceorientation", handleOrientation, true);

