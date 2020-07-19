function deviceOrientationListener(event) {
    const bar = document.getElementById('bar');
    const maxX = screen.width;
    const boundary = maxX - 64;
    const gammaAxis = event.gamma;
    const position = ((gammaAxis / 90) * maxX) + (maxX / 2)
    if (position > 0 && (position) < boundary) {
        bar.style.left = position + 'px';
    }
}

window.addEventListener('deviceorientation', deviceOrientationListener);

function startGame() {
    document.getElementById('startButton').style.display = 'none';
    console.log('started')
}
