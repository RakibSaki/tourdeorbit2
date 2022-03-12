class Vector extends p5.Vector {
    constructor (distance, angle) {
        super(distance * Math.cos(angle), 1 * distance * Math.sin(angle))
    }
    r() {
        return sqrt(sq(this.x), sq(this.y))
    }
    th() {
        return this.angleBetween(createVector(1, 0))
    }
}