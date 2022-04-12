function show_point() {
    //
    const svg = document.querySelector("svg");
    //
    //Once you click , get the mouse coordinates and convert them to svg element coordinated.
    const show_point = (e) => {
        //
        //
        //Create an svg point
        const p = svg.createSVGPoint();
        //
        //Convert the screen coordinates to svg coordinates
        p.x = e.clientX;
        p.y = e.clientY;
        //
        //convert the screen coordinates to svg coordinates
        const coord = p.matrixTransform(svg.getScreenCTM().inverse());
        const px = coord.x;
        const py = coord.y;
        //
        alert(`The coordinates of this point are x: ${coord.x} and y: ${coord.y}`);
        return coord.x, coord.y;
    }
    //add an event listener to the svg element
    svg.addEventListener("click", show_point);
    //
    add_svg();
    line_connect();
    const points = new show_point();
    const pointX = points.coord.x;
    const pointY = points.coord.y;
    return pointX, pointY;
}
//
//Creating svg elements using javascript code
function add_svg() {
    //
    //Get the svg element
    const svg = document.querySelector("svg");
    //
    //Set the namespace of the elements
    const NS = "http://www.w3.org/2000/svg";
    //const svg = document.createElementNS(NS, "svg");
    //
    //Create a circle within the SVG element
    const circle1 = document.createElementNS(NS, "circle");
    circle1.setAttribute('cx', '150');
    const c1x = parseFloat(circle1.getAttribute('cx'));
    circle1.setAttribute('cy', '225');
    const c1y = parseFloat(circle1.getAttribute('cy'));
    circle1.setAttribute('r', '75');
    const rc1 = parseFloat(circle1.getAttribute('r'));
    svg.appendChild(circle1);
    //
    //Create the second circle within the SVG element
    const circle2 = document.createElementNS(NS, 'circle');
    circle2.setAttribute('cx', '450');
    const c2x = parseFloat(circle2.getAttribute('cx'));
    circle2.setAttribute('cy', '75');
    const c2y = parseFloat(circle2.getAttribute('cy'));
    circle2.setAttribute('r', '75');
    const rc2 = parseFloat(circle2.getAttribute('r'));
    svg.appendChild(circle2);
    //
    return svg, NS, c1x, c1y, c2x, c2y, rc1, rc2;
}
//
//Calculate the coordinates to the line that connects the two circles
function line_connect(c1x, c1y, rc1, c2x, c2y, rc2, svg, NS) {
    //
    //const svg = document.querySelector("svg");
    //
    //Using the circle coordinates, calculate the angle of inclination of the line
    const incX = (c2x - c1x);
    const incY = (c1y - c2y);
    const theta = Math.atan(incY / incX);
    //
    //The distance from the center of the circle to the point the line joins the circle
    const dx = Math.cos(theta) * rc1;
    const dy = Math.sin(theta) * dx;
    //      
    //Create the line connector
    const line = document.createElementNS(NS, 'line');
    //
    //Set the coordinates to the line
    line.setAttribute('id', 'connector');
    line.setAttribute('x1', c1x + dx);
    line.setAttribute('y1', c1y - dy);
    line.setAttribute('x2', c2x - dx);
    line.setAttribute('y2', c2y + dy);
    //
    svg.appendChild(line);
}
