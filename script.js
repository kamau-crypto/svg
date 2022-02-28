
function lineConnect(x1, y1, x2, y2) {
    //
    //Define the circle's constants and variables
    //
    //Obtain the points of the circles
    const c1x = 150;
    const c1y = 225;
    const c2x = 450;
    const c2y = 75;
    const radius = 75;
    //
    //Calculate the angle of inclination of the line
    const incX = (c2x - c1x);
    const incY = (c1y - c2y);
    const theta = Math.atan(incY / incX);
    //
    //The distance from the center of the circle to the point the line joins the circle
    const dx = Math.cos(theta) * radius;
    const dy = Math.sin(theta) * dx;
    //
    //Identify the element
    const svgElement = document.getElementById('connector');
    //
    //Isolate the point of intersection of the line with the circles
    //Circle 1,The point x1
    const px1 = parseFloat(svgElement.getAttributeNS(null, 'x1'));
    svgElement.setAttributeNS(null, 'x1', c1x + dx);
    //
    //Circle1, The point y1
    const py1 = parseFloat(svgElement.getAttributeNS(null, 'y1'));
    svgElement.setAttributeNS(null, 'y1', c1y - dy);
    //
    //Circle2, the point x2
    const px2 = parseFloat(svgElement.getAttributeNS(null, 'x2'));
    svgElement.setAttributeNS(null, 'x2', c2x - dx);
    //
    //Circle 2, the point y2
    const py2 = parseFloat(svgElement.getAttributeNS(null, 'y2'));
    svgElement.setAttributeNS(null, 'y2', c2y + dy);
    //
    return px1, py1, px2, py2;

}
