if (window.DeviceOrientationEvent) {
    window.addEventListener("deviceorientation", deviceOrientationListener);
} else {
    document.getElementById("headline").innerText = "test"
}

function deviceOrientationListener(event) {
    document.getElementById("headline").innerText = "works"
}
