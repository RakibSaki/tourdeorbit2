let planet = {
    r: new Vector(1.47e11, Math.PI),
    v: new Vector(2.029e4, Math.PI / 2),
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
        this.v.mult(1.001)
        this.calculateOrbit()
    },
    calculateOrbit() {
        this.E = totalSpecificEnergy(this.r.mag(), this.v.mag(), star.mu)
        this.h = angularMomentum(this.r, this.v)
        this.e = eccentricity(this.E, this.h.mag(), star.mu)
        this.th = angleElapsed(this.r, this.v, this.h.mag(), this.e, star.mu)
        this.smallestR = smallestR(this.e, this.h.mag(), star.mu)
        if (isElliptic(this.e)) {
            this.a = semiMajorAxis(this.E, star.mu)
            this.b = semiMinorAxis(this.e, this.a)
        } else {
            this.a = findA(this.e, this.smallestR)
            this.vertices = giveVertices(this.e, this.smallestR, this.h.mag(), star.mu)
        }
        this.f = this.a * this.e
    },
    drawOrbit() {
        rotate(-this.th - this.r.th())
        noFill()
        strokeWeight(1.5e9)
        let planetPosition = new Vector(this.r.mag(), this.th)
        if (isElliptic(this.e)) {
            translate(-this.f, 0)
            stroke(0, 0, 100, 30)
            // lines from foci to planet
            line(this.f, 0, planetPosition.x + this.f, planetPosition.y)
            line(-this.f, 0, planetPosition.x + this.f, planetPosition.y)
            // directrices
            line(this.a / this.e, -2 * width / (zoom * userZoom), this.a / this.e, 2 * width / (zoom * userZoom))
            line(-this.a / this.e, -2 * width / (zoom * userZoom), -this.a / this.e, 2 * width / (zoom * userZoom))
            stroke(0, 0, 100, 90)
            // path
            ellipse(0, 0, this.a * 2, this.b * 2)
            translate(this.f, 0)
        } else {
            stroke(0, 0, 100, 30)
            // line from planet to star
            line(0, 0, planetPosition.x, planetPosition.y)
            // directrix
            let toDirectrix = this.smallestR * (1 + (1 / this.e))
            line(toDirectrix, -2 * width / (zoom * userZoom), toDirectrix, 2 * width / (zoom * userZoom))
            stroke(0, 0, 100, 90)
            let farAngle = PI - (acos(1 / this.e)) - 0.01
            console.log('farAngle', farAngle)
            let farR = sq(this.h.mag()) / (star.mu * (1 + this.e * cos(farAngle)))
            let topVertex = new Vector(farR, farAngle)
            let bottomVertex = new Vector(farR, -farAngle)
            // path
            // beginShape()
            // vertex(topVertex.x, topVertex.y)
            // // quadraticVertex(-this.f, 0, bottomVertex.x, bottomVertex.y)
            // vertex(this.smallestR,0)
            // vertex(bottomVertex.x, bottomVertex.y)
            // endShape()
            noFill();
            beginShape();
            for (vert of this.vertices) {
                curveVertex(vert[0], vert[1])
            }
            endShape()
        }
        rotate(this.th + this.r.th())
    }
}

planet.calculateOrbit()