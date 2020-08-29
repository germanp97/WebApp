// const maxY = screen.height;
// const maxX = screen.width;
//
// let counter;
// let intervalCounter;
// let intervalBall;
// let dx;
// let dy;
// let x;
// let y;
// let score;
//
// function startGame() {
//     score = 0;
//     y = 100;
//     counter = 4;
//     dy = 3;
//     dx = 3
//     console.log(document.getElementById("startGame").style);
//     document.getElementById("startGame").style.display = "none";
//     document.getElementById("final-score").style.display = "none";
//     intervalCounter = setInterval(timeIt, 1000);
// }
//
// function timeIt() {
//     counter--;
//     document.getElementById("counter").innerHTML = counter;
//     document.getElementById("counter").style.display = "inline";
//     if (counter === 0) {
//         clearInterval(intervalCounter);
//         start();
//     }
// }
//
// function start() {
//     let randomNumber = Math.random()
//     let randomX = Math.floor( randomNumber * Math.floor(maxX));
//     while(randomX === 0) {
//         randomNumber = Math.random();
//         randomX = randomNumber * maxX;
//     }
//     document.getElementById("bar").style.display = "inline";
//     document.getElementById("counter").style.display = "none";
//     document.getElementById("score").innerHTML = "Score: " + score;
//     document.getElementById("score").style.display = "inline";
//     var canvas = document.getElementById("ball");
//     canvas.width = maxX;
//     canvas.height = maxY;
//     x = randomX;
//     intervalBall = setInterval(drawBall, 10);
// }
//
// function drawBall() {
//     var canvas = document.getElementById("ball");
//     var context = canvas.getContext('2d');
//     var bar = document.getElementById("bar");
//     var rect = bar.getBoundingClientRect();
//     var right = rect.right;
//     var left = rect.left;
//     var top = rect.top;
//     var bottom = rect.bottom;
//     context.clearRect(0, 0, canvas.width, canvas.height);
//     context.beginPath();
//     context.arc(x, y,10,0,Math.PI*2,true);
//     context.closePath();
//     context.fillStyle = "red";
//     context.fill();
//     console.log(y);
//     console.log()
//     if (y >= $(window).height()) {
//         clearInterval(intervalBall);
//         reset();
//     }
//     if(x <= right - 5 && x >= left - 5 && y >= top - 15 && y < bottom - 20) {
//         dx=-dx
//         dy=-dy;
//         score++;
//         if(score % 3 === 0 && score !== 0) {
//             dx--;
//             dy--;
//         }
//         document.getElementById("score").innerHTML = "Score: " + score;
//     }
//     y+=dy;
//     x+=dx;
//     if (x < 0 || x > maxX) dx=-dx
//     if (y < 0 ) dy=-dy;
// }
//
// function reset() {
//     var canvas = document.getElementById("ball");
//     var context = canvas.getContext('2d');
//     context.clearRect(0, 0, canvas.width, canvas.height);
//     document.getElementById("bar").style.display = "none";
//     document.getElementById("startGame").style.display = "inline-block";
//     document.getElementById("final-score").style.display = "inline";
//     document.getElementById("startGame").innerHTML = "Let's go Again!"
//     document.getElementById("final-score").innerHTML = "Your final score is: " + score
//     document.getElementById("score").style.display = "none";
// }
//
//
//

// window.addEventListener("deviceorientation", handleOrientation, true);

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
var brickRowCount = 5;
var brickColumnCount = 3;
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;
var score = 0;

document.addEventListener('DOMContentLoaded', function () {
    canvas = document.getElementById("myCanvas");
    canvas.width = screen.width;
    canvas.height = screen.height;
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
document.addEventListener("mousemove", mouseMoveHandler, false);

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
// function handleOrientation(event) {
//     var bar = document.getElementById("bar");
//     var maxX = screen.width
//     var boundry = maxX - 100;
//     var rotation = event.gamma;
//     var position = ((rotation / 90) * maxX) + (maxX / 2)
//     if(position > 0 && (position) < boundry) {
//         bar.style.left = position + "px";
//     }
// }

function mouseMoveHandler(event) {
    var relativeX = event.clientX - canvas.offsetLeft;
    if (relativeX > 0 && relativeX < canvas.width) {
        paddleX = relativeX - paddleWidth / 2;
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
                        alert("YOU WIN, CONGRATS!");
                        document.location.reload();
                        clearInterval(interval); // Needed for Chrome to end game
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
            alert("GAME OVER");
            document.location.reload();
            clearInterval(interval); // Needed for Chrome to end game
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

var interval = setInterval(draw, 10);

