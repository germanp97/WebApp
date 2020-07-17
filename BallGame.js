function deviceOrientationListener(event) {
    var ball = document.getElementById("ball");

    var maxX = screen.width;
    var maxY = screen.height;

    var x = event.gamma;
    var y = event.beta;
    var positionX = ((x / 90) * maxX) + (maxX / 2);
    var positionY = ((y / 90) * maxY) + (maxY / 2);

    if (positionX > 0 && positionX < maxX) {
        ball.style.top = positionX + "px";
    }
    if (positionY > 0 && positionY < maxY) {
        ball.style.left = positionY + "px";
    }


}

window.addEventListener('deviceorientation', deviceOrientationListener);
