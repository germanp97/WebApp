var counter;
var intervalCounter;
var intervalBall;
var maxY = screen.height
var maxX = screen.width
var dx;
var dy;
var x;
var y;
var score;

function startGame() {
    score = 0;
    y = 100;
    counter = 4;
    dy = 3;
    dx = 3
    document.getElementById("startGame").style.display = "none";
    document.getElementById("final-score").style.display = "none";
    intervalCounter = setInterval(timeIt, 1000);
}

function timeIt() {
    counter--;
    document.getElementById("counter").innerHTML = counter;
    document.getElementById("counter").style.display = "inline";
    if (counter == 0) {
        clearInterval(intervalCounter);
        test();
    }
}

function test() {
    var randomNumber = Math.random()
    var randomX = Math.floor(randomNumber * Math.floor(maxX));
    while (randomX == 0) {
        randomNumber = Math.random();
        randomX = randomNumber * maxX;
    }
    document.getElementById("bar").style.display = "inline";
    document.getElementById("counter").style.display = "none";
    document.getElementById("score").innerHTML = "Score: " + score;
    document.getElementById("score").style.display = "inline";
    var canvas = document.getElementById("gameCanvas");
    canvas.width = maxX;
    canvas.height = maxY;
    var canvas = document.getElementById("gameCanvas");
    var context = canvas.getContext('2d');
    x = randomX;
    intervalBall = setInterval(drawBall, 10);
}

function drawBall() {
    var canvas = document.getElementById("gameCanvas");
    var context = canvas.getContext('2d');
    var bar = document.getElementById("bar");
    var rect = bar.getBoundingClientRect();
    var right = rect.right;
    var left = rect.left;
    var top = rect.top;
    var bottom = rect.bottom;
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.beginPath();
    context.arc(x, y, 10, 0, Math.PI * 2, true);
    context.closePath();
    context.fill();
    console.log(y);
    console.log()
    if (y >= $(window).height()) {
        clearInterval(intervalBall);
        reset();
    }
    if (x <= right - 5 && x >= left - 5 && y >= top - 15 && y < bottom - 20) {
        dx = -dx
        dy = -dy;
        score++;
        if (score % 3 == 0 && score != 0) {
            console.log("OH")
            dx--;
            dy--;
        }
        document.getElementById("score").innerHTML = "Score: " + score;
    }
    y += dy;
    x += dx;
    if (x < 0 || x > maxX) dx = -dx
    if (y < 0) dy = -dy;
}

function reset() {
    var canvas = document.getElementById("gameCanvas");
    var context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
    document.getElementById("bar").style.display = "none";
    document.getElementById("startGame").style.display = "inline-block";
    document.getElementById("final-score").style.display = "inline";
    document.getElementById("startGame").innerHTML = "Let's go Again!"
    document.getElementById("final-score").innerHTML = "Your final score is: " + score
    document.getElementById("score").style.display = "none";
}

function handleOrientation(event) {
    var bar = document.getElementById("bar");
    var maxX = screen.width
    var maxY = screen.length
    var boundry = maxX - 64;
    var rotation = event.gamma;
    var pixels = ((rotation / 90) * maxX)
    var position = ((rotation / 90) * maxX) + (maxX / 2)
    if (position > 0 && (position) < boundry) {
        bar.style.left = position + "px";
    }
}

window.addEventListener("deviceorientation", handleOrientation, true);
