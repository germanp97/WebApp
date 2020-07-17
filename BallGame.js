
var garden = document.getElementById("garden");
var ball = document.getElementById("ball");
var output = document.getElementById("output");



function deviceOrientationListener(event) {
    // var a = event.alpha;
    // var b = event.beta;
    // var c = event.gamma;
    // document.getElementById("alpha").innerText = a;
    // document.getElementById("beta").innerText = b;
    // document.getElementById("gamma").innerText = c;
    console.log(event);

    var x = event.beta;
    var y = event.gamma;

    document.getElementById("x").innerText = x;
    document.getElementById("y").innerText = y;
}

window.addEventListener('deviceorientation', deviceOrientationListener);
