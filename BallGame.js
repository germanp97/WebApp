function deviceOrientationListener(event) {
    var ball = document.getElementById("ball");
    var garden = document.getElementById("garden");

    var maxX = garden.clientWidth - ball.clientWidth;
    var maxY = garden.clientHeight - ball.clientHeight;

    var x = event.gamma;
    var y = event.beta;

    if (x > 90) {
        x = 90
    }

    if (x < -90) {
        x = -90
    }

    x += 90;
    y += 90;

    ball.style.top = (maxY * y * 1.2 / 180 - 10) + "px";
    ball.style.left = (maxX * x * 1.2 / 180 - 10) + "px";
}

window.addEventListener('deviceorientation', deviceOrientationListener);
