
var garden = document.getElementById("garden");
var ball = document.getElementById("ball");
var output = document.getElementById("output");

var maxX = garden.clientWidth - ball.clientWidth;
var maxY = garden.clientHeight - ball.clientHeight;


function deviceOrientationListener(event) {
    // var a = event.alpha;
    // var b = event.beta;
    // var c = event.gamma;
    // document.getElementById("alpha").innerText = a;
    // document.getElementById("beta").innerText = b;
    // document.getElementById("gamma").innerText = c;
    console.log(maxX, maxY);

    var x = event.beta;
    var y = event.gamma;

    if (x > 90) {
        x = 90
    }

    if (x < -90) {
        x = -90
    }

    x += 90;
    y += 90;

    ball.style.top = (maxY * y / 180 - 10) + "px";
    document.getElementById("x").innerText = x;
    ball.style.left = (maxX * x / 180 - 10) + "px";
    document.getElementById("y").innerText = y;
}

window.addEventListener('deviceorientation', deviceOrientationListener);
