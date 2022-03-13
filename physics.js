// this file carries out the physical (and geometric) calculations

// claculate eccentricity from energy and MAGNITUDE of angular momentum of planet and mu for the particular star
function eccentricity(E, h, mu) {
    let sqm1 = 2 * h * h * E / (mu * mu)    // this is (e^2 + 1)
    return sqrt(sqm1 + 1)       // so this is e
}

// tells wether orbit will be elliptic by looking at the eccentricity
function elliptic(e) {
    return e < 1
}

// calculate angle elapsed in orbit by planet, theta,
// from (MAGNITUDE) distance between planet and sun, MAGNITUDE of angular momentum of planet
// eccentricity and mu for the particular star
function angleElapsed(r, h, e, mu) {
    let ecthp1 = h * h / (r * mu)       // this 1 + e.cos(th)
    let c = (ecthp1 - 1) / e        // this is cos(th)
    let th = acos(c)        // so this is th
}

// calculate semi-major axis, a, from energy or planet and mu for the particular star
function semiMajorAxis(E, mu) {
    if (E >= 0) {
        console.log("Orbit is not elliptic; can not calculate semi-major axis")
        return null
    }
    return -mu / (2 * E)
}