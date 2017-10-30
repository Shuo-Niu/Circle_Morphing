let cirPath = [];
let triPath = [];
let spacing = 10; // space of angle between two points
let theta = 0; // for drawing morphing

function polarToCartesian(r, angle) {
    return createVector(r * cos(angle), r * sin(angle));
}

function setup() {
    createCanvas(400, 400);
    angleMode(DEGREES);

    let radius = 100;
    let startA = 0;
    let endA = 120;
    let start = polarToCartesian(radius, startA);
    let end = polarToCartesian(radius, endA);
    for (let a = startA; a < 360; a += spacing) { // initialize cirPath[] and triPath[]
        let cv = polarToCartesian(radius, a); // point determined by radius and angle
        cirPath.push(cv);
        let amt = (a % 120) / (endA - startA);
        let tv = p5.Vector.lerp(start, end, amt); // point is lerp()ed between the start point and the end point
        triPath.push(tv);

        if ((a + spacing) % 120 === 0) {
            startA += 120;
            endA += 120;
            start = polarToCartesian(radius, startA);
            end = polarToCartesian(radius, endA);
        }
    }
}

function draw() {
    background(220);
    translate(width / 2, height / 2); // draw at the middle of the canvas
    rotate(30);
    stroke(0);
    strokeWeight(3);
    noFill();
    let amt = (sin(theta) + 1) / 2; // vary between 0 to 1
    theta += 5;
    beginShape();
    for (let i = 0; i < cirPath.length; i++) {
        let cv = cirPath[i];
        let tv = triPath[i];
        let x = lerp(cv.x, tv.x, amt);
        let y = lerp(cv.y, tv.y, amt);
        vertex(x, y); // point is lerp()ed between cv[i] and tv[i]
    }
    endShape(CLOSE);
}