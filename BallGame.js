var ball = document.getElementById("ball");

function deviceOrientationListener(event) {
    // var a = event.alpha;
    // var b = event.beta;
    // var c = event.gamma;
    // document.getElementById("alpha").innerText = a;
    // document.getElementById("beta").innerText = b;
    // document.getElementById("gamma").innerText = c;
    console.log(event);

    var x = Math.round(event.beta);
    var y = Math.round(event.gamma);

    if (x > 90) {
        x = 90
    }

    if (x < -90) {
        x = -90
    }

    x += 90;
    y += 90;

    ball.style.top = (500 * y / 180 - 10) + "px";
    document.getElementById("x").innerText = (500 * y / 180 - 10).toString();
    ball.style.left = (500 * x / 180 - 10) + "px";
    document.getElementById("y").innerText = (500 * x / 180 - 10).toString();
}

window.addEventListener('deviceorientation', deviceOrientationListener);
