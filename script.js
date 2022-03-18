function setup() {
    createCanvas(windowWidth, windowHeight)
    populateBackgroundStars(width, height)
    calculateHyperbolic()
    colorMode(HSB, 360, 100, 100, 100)
}

zoom = 1 / 1.5e9    // so that 100 pixels is 1.00 au
userZoom = 1        // zoom by user by clicking buttons

let timescale = 365.25 * 24 * 3600 / 10000   // 10 seconds shows 1 year

let lastmillis = 0

function draw() {
    background(0)
    translate(width / 2, height / 2)        // move origin to center of screen
    scale(1, -1)        // make positive y to face up is up
    scale(userZoom)
    backgroundStars.draw()
    scale(zoom)         // make astronomical lengths fit to screen
    strokeWeight(1 / (userZoom * zoom))
    planet.drawVelocityDirection()
    planet.draw()
    star.draw()
    planet.move((millis() - lastmillis) * timescale)
    lastmillis = millis()
    calculateHyperbolic()
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    populateBackgroundStars(width, height)
    calculateHyperbolic()
}

function calculateHyperbolic() {
    calculateHyperbolicPath(planet, sqrt(sq(width) + sq(height)), zoom * userZoom, star.mu)
}