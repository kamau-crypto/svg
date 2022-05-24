//
//The svg class that suppoerts the drawing of two circles and adding 
export default class create_svg {
    svg;
    circle1;
    //
    //Get the namespace that defines all our svg elements
    NS = "http://www.w3.org/2000/svg";
    //
    //These are the specifications for the first circle
    c1 = { x: 150, y: 225, r: 75 };
    //
    //The speficications for the second circle
    c2 = { x: 450, y: 75, r: 75 };
    //
    //The line identifier:- to mark the highlighting line.
    line = document.createElementNS(this.NS, 'line');
    //
    //The X-coordinate and Y-coordinate once the point is clicked on the html and after the conversion to svg coordinates
    //public points;
    //
    //The function constructor
    constructor(
    //
    //The name of the svg element in the html form
    svg = document.querySelector('svg'), 
    //
    //The first SVG circle element created
    circle1) {
        this.svg = svg;
        this.circle1 = circle1;
        //
        //Add the event listener to the svg
        this.svg.onclick = (e) => {
            //
            //Create an svg point
            const p = this.svg.createSVGPoint();
            //
            //Set the client page's coordinates 
            p.x = e.clientX;
            p.y = e.clientY;
            //
            //Transform the mouse corrdinates to real world coordinates
            const p2 = create_svg.transform_coordinates(p);
            //
            //Move the circle once the point is clicked
            this.move_circle(p2);
            //
            //Move the line after the circle has moved
            this.move_line(p2);
        };
    }
    //
    //The function that uses the points of the circle to draw a line that joins the two circles.
    static lineConnect(
    //
    c1, 
    //
    c2) {
        //
        //Calculate the angle of inclination of the line
        const incX = (c2.x - c1.x);
        const incY = (c1.y - c2.y);
        const theta = Math.atan(incY / incX);
        //
        //The distance from the center of the circle to the point the line joins the circle
        const dx = Math.cos(theta) * c2.r;
        const dy = Math.sin(theta) * dx;
        //
        //Compact the line coordinates into an array of objects
        const p1 = { x1: c1.x + dx, y1: c1.y - dy };
        const p2 = { x2: c2.x - dx, y2: c2.y + dy };
        return { p1, p2 };
    }
    //
    //This is the function that gets the mouse point once a point is clicked and converts the point
    //to svg world coordinates.
    static transform_coordinates(p) {
        //
        //Ge the element to transform the coordinates to
        const element = document.querySelector('svg');
        //
        //convert the screen coordinates to svg coordinates
        const coord = p.matrixTransform(element.getScreenCTM().inverse());
        //
        return coord;
    }
    //
    //Draw the two circles
    draw_circle() {
        //
        //Create a circle within the SVG element
        this.circle1 = document.createElementNS(this.NS, "circle");
        this.circle1.setAttribute("id", "circle1");
        this.circle1.setAttribute('cx', (this.c1.x).toString());
        this.circle1.setAttribute('cy', (this.c1.y).toString());
        this.circle1.setAttribute('r', (this.c1.r).toString());
        this.svg.appendChild(this.circle1);
        //
        //Create the second circle within the SVG element
        let circle2 = document.createElementNS(this.NS, 'circle');
        circle2.setAttribute("id", "circle2");
        circle2.setAttribute('cx', (this.c2.x).toString());
        circle2.setAttribute('cy', (this.c2.y).toString());
        circle2.setAttribute('r', (this.c2.r).toString());
        this.svg.appendChild(circle2);
        //
        //Create the line
        const { p1, p2 } = create_svg.lineConnect(this.c1, this.c2);
        this.line.setAttribute("id", "connector");
        this.line.setAttribute("x1", (p1.x1).toString());
        this.line.setAttribute("y1", (p1.y1).toString());
        this.line.setAttribute("x2", (p2.x2).toString());
        this.line.setAttribute("y2", (p2.y2).toString());
        this.svg.appendChild(this.line);
    }
    //
    //Move the circle to the desired point
    move_circle(p) {
        //
        //Move the circle to the defined points
        this.circle1.setAttribute("cx", (p.x).toString());
        this.circle1.setAttribute("cy", (p.y).toString());
    }
    //
    //Move the line with respect to the new clicked point.
    move_line(p) {
        const { p1, p2 } = create_svg.lineConnect(p, this.c2);
        this.line.setAttribute("x1", (p1.x1).toString());
        this.line.setAttribute("y1", (p1.y1).toString());
        this.line.setAttribute("x2", (p2.x2).toString());
        this.line.setAttribute("y2", (p2.y2).toString());
    }
}
