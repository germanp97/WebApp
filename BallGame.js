if (window.DeviceOrientationEvent) {
    window.addEventListener("deviceorientation", deviceOrientationListener);
} else {
    document.getElementById("headline").innerText = "test"
}

function deviceOrientationListener(event) {
    var a = event.alpha;
    var b = event.beta;
    var c = event.gamma;
    document.getElementById("alpha").innerText = a;
    document.getElementById("beta").innerText = b;
    document.getElementById("gamma").innerText = c;

}
