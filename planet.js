let planet = {
    r: new Vector(1.47e11, Math.PI),
    v: new Vector(2.029e4, 1.7 * Math.PI/2),
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
        this.smallestR = smallestR(this.e, this.h.mag(), star.mu)
        if (isElliptic(this.e)) {
            this.a = semiMajorAxis(this.E, star.mu)
            this.b = semiMinorAxis(this.e, this.a)
        } else {
            this.a = findA(this.e)
        }
        this.f = this.a * this.e
    },
    drawOrbit() {
        rotate(-this.th - this.r.th())
        translate(-this.f, 0)
        noFill()
        strokeWeight(1.5e9)
        let planetPosition = new Vector(this.r.mag(), this.th)
        stroke(0, 0, 100, 30)
        // lines from foci to planet
        line(-this.f, 0, planetPosition.x + this.f, planetPosition.y)
        line(this.f, 0, planetPosition.x + this.f, planetPosition.y)
        // directrices
        line(this.a / this.e, -2 * width / (zoom * userZoom), this.a / this.e, 2 * width / (zoom * userZoom))
        line(-this.a / this.e, -2 * width / (zoom * userZoom), -this.a / this.e, 2 * width / (zoom * userZoom))
        stroke(0, 0, 100, 90)
        ellipse(0, 0, this.a * 2, this.b * 2)
        translate(this.f, 0)
        rotate(this.th + this.r.th())
    }
}

planet.calculateOrbit()