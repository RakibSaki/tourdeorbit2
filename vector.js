let [PI, TAU, sqrt, sq, cos, sin, tan, acos, asin, atan] = [Math.PI, Math.PI * 2, Math.sqrt, x=>x*x, Math.cos, Math.sin, Math.tan, x => Math.acos(adjustTrig(x)), x => Math.asin(adjustTrig(x)), Math.atan]

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

function adjustTrig(trig) {
    if (1 < trig && trig < 1.01) {
        return 1
    } else if (-1.01 < trig && trig < -1) {
        return -1
    } else {
        return trig
    }
}