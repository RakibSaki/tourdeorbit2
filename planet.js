let planet = {
    r: new Vector(1.47e11, Math.PI),
    v: new Vector(2.029e4, Math.PI/2),
    w: 0.001,
    width: 20 * 1.5e9,
    draw() {
        this.drawOrbit()
        fill(100, 50, 50)
        noStroke()
        circle(this.r.x, this.r.y, this.width)
    },
    move() {
        this.r.rotate(this.w)
        this.v.rotate(this.w)
        this.calculateOrbit()
    },
    calculateOrbit() {
        this.E = totalSpecificEnergy(1.47e11, this.v.mag(), star.mu)
        this.h = angularMomentum(this.r, this.v)
        this.e = eccentricity(this.E, this.h.mag(), star.mu)
        this.th = angleElapsed(this.r, this.v, this.h.mag(), this.e, star.mu)
        this.a = semiMajorAxis(this.E, star.mu)
        this.b = semiMinorAxis(this.e, this.a)
        this.f = this.a * this.e
    },
    drawOrbit() {
        rotate(-this.th - this.r.th())
        noFill()
        stroke(0, 0, 100)
        strokeWeight(1.5e9)
        ellipse(-this.f, 0, this.a * 2, this.b * 2)
        rotate(this.th + this.r.th())
    }
}

planet.calculateOrbit()