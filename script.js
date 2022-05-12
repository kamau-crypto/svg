export default class createSvg {
    //
    //Get the namespace that defines all our svg elements
    NS;
    //
    //The name of the svg element in the html form
    svg;
    //
    //The X-coordinate and Y-coordinate once the point is clicked on the html and after the conversion to svg coordinates
    pointx;
    pointy;
    //
    //The first SVG circle element created
    circle1;
    //
    //The X-coordinate to circle2
    c2x;
    //
    //The Y-coordinate to circle2
    c2y;
    //
    //The radius of circle2
    rc1;
    //
    //The line identifier:- to mark the highlighting line.
    line;
    //
    //The function constructor
    constructor() {
        //
        this.NS = NS;
        //
        this.svg = svg;
        //
        this.pointx = pointx;
        //
        this.pointy = pointy;
        //
        this.circle1 = circle1;
        //
        this.c2x = c2x;
        //
        this.rc1 = rc1;
        //
        this.c2y = c2y;
        //
        this.line = line;
    }
    //
    //Draw the two circles
    async draw_circle(NS) {
        //
        //
        this.NS = "http://www.w3.org/2000/svg";
        //
        //Get the element that acts as the canvas to all our svg elements
        this.svg = document.querySelector('svg');
        //
        //Create a circle within the SVG element
        this.circle1 = document.createElementNS(this.NS, "circle");
        this.circle1.setAttribute("id", "circle1");
        this.circle1.setAttribute('cx', '150');
        //const c1x =
        parseFloat(this.circle1.getAttribute('cx'));
        this.circle1.setAttribute('cy', '225');
        //const c1y = 
        parseFloat(this.circle1.getAttribute('cy'));
        this.circle1.setAttribute('r', '75');
        //const rc1 = 
        parseFloat(this.circle1.getAttribute('r'));
        this.svg.appendChild(circle1);
        //
        //Create the second circle within the SVG element
        let circle2 = document.createElementNS(this.NS, 'circle');
        circle2.setAttribute("id", "circle2");
        circle2.setAttribute('cx', '450');
        this.c2x = parseFloat(circle2.getAttribute('cx'));
        circle2.setAttribute('cy', '75');
        this.c2y = parseFloat(circle2.getAttribute('cy'));
        circle2.setAttribute('r', '75');
        this.rc1 = parseFloat(circle2.getAttribute('r'));

        svg.appendChild(circle2);
        //
        //Create the line
        this.line = document.createElementNS(this.NS, 'line');
        //
        //return all the cirles' centers and their x and y points.
        //return { svg, c1x, c1y, rc1, c2x, c2y, rc2, circle1, line }
    }
    //
    //This abstract method
    async movement() {
        //
        //Get the point
        await this.showPoint();
        //
        //Move the circle to the defined point
        await this.move_circle();
        //
        //Connect the line
        await this.lineConnect();
    }
    //
    //This is the function that gets the mouse point once a point is clicked and converts the point
    //to svg world coordinates.
    async showPoint() {
        //
        //Get the svg element
        const element = this.svg;
        //
        //Transform the mouse coordinates into real world coordinates once a point
        //is clicked
        const show_point = (e) => {
            //
            //Create an svg point
            const p = element.createSVGPoint();
            //
            //Set the client page's coordinates 
            p.x = e.clientX;
            p.y = e.clientY;
            //
            //convert the screen coordinates to svg coordinates
            const coord = p.matrixTransform(element.getScreenCTM().inverse());
            //
            //alert(`The coordinates of this point are x: ${coord.x} and y: ${coord.y}`);
            this.pointx = coord.x;
            this.pointy = coord.y;
            alert(`the x-coordinate is ${this.pointx}, and the y coordinate is ${this.pointy}`);
            //
            //Return the pointx and pointy
            //return { this: pointx, this: pointy };
        };
        //
        //Add the event listener
        element.addEventListener("click", show_point);
        //await 
        //Get the points returned from show points once they are clicked.
        // const { pointx, pointy } = show_point;
        // //Return the coordinates once they are clicked
        // return { pointx, pointy };
    }
    //
    //MOve the circle to the desired point
    async move_circle() {
        //
        //Destructure the show point method to get the returned coordinates
        //const { pointx, pointy } = await this.showPoint();
        //
        //Get the first circle drawn
        //const { circle1 } = await this.draw_circle();
        //
        //Move the circle to the defined points
        this.circle1.setAttribute("cx", this.pointx);
        this.circle1.setAttribute("cy", this.pointy);
    }
    //
    //The function that uses the points of the circle to draw a line that joins the two circles.
    async lineConnect() {
        //
        //Destructure the show point method to get the returned coordinates
        //const { pointx, pointy } = await this.showPoint();
        //
        //Get all points from the drawn circles
        //const { c2x, c2y, rc1, line } = await this.draw_circle();
        //
        //Obtain the points of the circles
        const c1x = this.pointx;
        const c1y = this.pointy;
        const cx2 = this.c2x;
        const cy2 = this.c2y;
        const radius = this.rc1;
        //
        //Calculate the angle of inclination of the line
        const incX = (cx2 - c1x);
        const incY = (c1y - cy2);
        const theta = Math.atan(incY / incX);
        //
        //The distance from the center of the circle to the point the line joins the circle
        const dx = Math.cos(theta) * radius;
        const dy = Math.sin(theta) * dx;
        //
        //Redraw the line connector with the updated coordinates
        this.line.setAttribute("x1", c1x + dx);
        this.line.setAttribute("y1", c1y - dy);
        this.line.setAttribute("x2", cx2 - dx);
        this.setAttribute("y2", cy2 + dy);
    }
}