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
    let th = thFromR(r.mag(), e, h.mag(), mu)
    if (r.dot(v) > 0) {
        th = TAU - th
        console.log('planet is moving away')
    }
    if (h.z > 0) {
        th = TAU - th
        console.log('rotating anti-clockwise')
    }
    return th
}

// give r from th
function rFromTh(th, e, h, mu) {
    return h * h / (mu * (1 + (e * cos(th))))
}

// give th from r
function thFromR(r, e, h, mu) {
    let ecthp1 = h * h / (r * mu)       // this 1 + e.cos(th)
    let c = (ecthp1 - 1) / e        // this is cos(th)
    return acos(c)        // so this is th
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
    return rFromTh(0, e, h, mu)   // smallest value of r occurs when theta is 0
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
    let a = aem1 / (e - 1)
    return a
}

// calculate semi-minor axis, b, from eccentricity and semi-major axis
function semiMinorAxis(e, a) {
    if (e >= 1) {
        console.log("Orbit is not elliptic; can not calculate semi-minor axis")
        return null
    }
    return sqrt(sq(a) - sq(e * a))
}

// calculate total specific energy from  distance and speed of planet and mu for the particular star
function totalSpecificEnergy(r, v, mu) {
    return (0.5 * v * v) - (mu / r)
}

function angularMomentum(r, v) {
    return r.cross(v)
}

// calculate path of hyperbolic or parabolic orbit from
// maximum dimension of screen - width or height
// zooming from meters to pixels
// and mu for the particular star
function calculateHyperbolicPath(planet, maxVisible, zoom, mu) {
    // do nothing if orbit is not hyperbolic or parabolic
    if (isElliptic(planet.e)) {
        return
    }
    planet.pathPoints = []
    // maximum visible distance
    let farR = maxVisible / zoom
    let h = planet.h.mag()  // since about to use h.mag() so many times
    // path is not visibl if closest distance between planet and sun is greater than maximum visible distance
    if (farR < smallestR(planet.e, h, mu)) {
        return
    }
    let farAngle = thFromR(farR, planet.e, h, mu)
    for (let [th, i] = [farAngle, 0]; i <= 100; [th, i] = [th - (farAngle / 50), i+1]) {
        let r = rFromTh(th, planet.e, h, mu)
        let point = new Vector(r, th)
        planet.pathPoints.push([point.x, point.y])
    }
}