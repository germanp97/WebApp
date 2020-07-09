if (window.DeviceOrientationEvent) {
    window.addEventListener("deviceorientation", deviceOrientationListener);
} else {
    alert("Sorry, your browser doesn't support Device Orientation");
}

function deviceOrientationListener(event) {
    alert("it works");
}
