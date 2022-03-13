// this file carries out the physical (and geometric) calculations

// claculate eccentricity from energy and MAGNITUDE of angular momentum of planet and mu for the particular star
function eccentricity(E, h, mu) {
    let sqm1 = 2 * h * h * E / (mu * mu)    // this is (e^2 + 1)
    return Math.sqrt(sqm1 + 1)       // so this is e
}

// tells wether orbit will be elliptic by looking at the eccentricity
function isElliptic(e) {
    return e < 1
}

// calculate angle elapsed in orbit by planet, theta,
// from VECTOR distance between planet and sun, velocity of planet, MAGNITUDE of angular momentum of planet
// eccentricity and mu for the particular star
function angleElapsed(r, v, h, e, mu) {
    let ecthp1 = h * h / (r.mag() * mu)       // this 1 + e.cos(th)
    let c = (ecthp1 - 1) / e        // this is cos(th)
    let th = acos(c)        // so this is th
    if (r.dot(v) > 0) {
        th = TAU - th
    }
    if (!th) {
        console.log(ecthp1, c, r.dot(v), th)
    }
    return th
}

// calculate semi-major axis, a, from energy or planet and mu for the particular star
function semiMajorAxis(E, mu) {
    if (E >= 0) {
        console.log("Orbit is not elliptic; can not calculate semi-major axis")
        return null
    }
    return -mu / (2 * E)
}

// find distance when planet is closest
// from eccentricity, MAGNITUDE of angular velocity and mu for the particular star
function smallestR(e, h, mu) {
    return h * h / (mu * (1 + e))   // smallest value of r occurs when theta is 0
}

// for parabolic or hyperbolic orbits, calculate the value of a
// from eccentricity and smallest value of r
function findA(e, smallestR) {
    if (e < 1) {
        console.log("Orbit is elliptic; try to calculate semi-major axis instead")
        return null
    }
    if (e == 1) {
        console.log("Orbit is parabolic; a is not relevant")
        return null
    }
    let aem1 = smallestR        // smallest value of r is ae - a = a(e-1)
    let a = aem1 / (e-1)
    return a
}

function giveVertices(e, smallestR, h, mu) {
    result = []
    let farAngle = PI - (acos(1 / e)) - 0.01
    for (let th = farAngle; th > -farAngle; th -= 0.05) {
        let farR = sq(h) / (mu * (1 + e * cos(th)))
        let vertex = new Vector(farR, th)
        let [x, y] = [vertex.x, vertex.y]
        result.push([x, y])
    }
    let farR = sq(h) / (mu * (1 + e * cos(-farAngle)))
    let bottomVertex = new Vector(farR, -farAngle)
    result.push([bottomVertex.x, bottomVertex.y])
    return result
}

// calculate semi-minor axis, b, from eccentricity and semi-major axis
function semiMinorAxis(e, a) {
    if (e >= 1) {
        console.log("Orbit is not elliptic; can not calculate semi-minor axis")
        return null
    }
    return sqrt(sq(a) - sq(e*a))
}

// calculate total specific energy from  distance and speed of planet and mu for the particular star
function totalSpecificEnergy(r, v, mu) {
    return (0.5 * v * v) - (mu / r)
}

function angularMomentum(r, v) {
    return r.cross(v)
}