function setup() {
    createCanvas(windowWidth, windowHeight)
    colorMode(HSB, 360, 100, 100, 100)
}

zoom = 1 / 1.5e9    // so that 100 pixels is 1.00 au

function draw() {
    background(0)
    translate(width / 2, height / 2)        // move origin to center of screen
    scale(1, -1)        // make positive y to face up is up
    scale(zoom)         // make astronomical lengths fit to screen
    star.draw()
    planet.draw()
    planet.move()
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}