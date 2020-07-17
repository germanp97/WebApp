var ball = document.getElementById("ball");
var initialX = null;
var initialY = null;


function deviceOrientationListener(event) {
    // var a = event.alpha;
    // var b = event.beta;
    // var c = event.gamma;
    // document.getElementById("alpha").innerText = a;
    // document.getElementById("beta").innerText = b;
    // document.getElementById("gamma").innerText = c;
    console.log(event);

    var x = event.beta ? event.beta : event.y * 90;
    var y = event.gamma ? event.gamma : event.x * 90;

    if (!initialX && !initialY) {

        initialX = x;
        initialY = y;

    } else {

        var positionX = initialX - x;
        var positionY = initialY - y;

        ball.style.top = (90 + positionX * 5) + 'px';
        ball.style.left = (90 + positionY * 5) + 'px';
    }
}

window.addEventListener('deviceorientation', deviceOrientationListener);
