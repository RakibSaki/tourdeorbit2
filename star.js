let star = {
    mass: 1.9891e30,
    width: 50 * 1.5e9,
    mu: 1.9891e30 * 6.67408e-11,
    draw() {
        fill(0, 0, 100)
        noStroke()
        circle(0, 0, this.width)
    }
}