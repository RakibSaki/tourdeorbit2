planet = {
    position: new Vector(1.47e11, Math.PI),
    w: 0.001,
    width: 20 * 1.5e9,
    draw() {
        fill(100, 50, 50)
        noStroke()
        circle(this.position.x, this.position.y, this.width)
    },
    move() {
        this.position.rotate(this.w)
    }
}