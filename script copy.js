//
//Draw two circles. Have a line connector that connects both circles using the line connector function
//Use the move point function to move the circles from one point to the next.
export default class createSvg {
    //
    //The function constructor
    constructor() {
        //
        //Get the namespace that defines all our svg elements
        this.NS = "http://www.w3.org/2000/svg";
        //
        //The name of the svg element in the html form
        this.svg = document.querySelector('svg');
        //
        //The X-coordinate and Y-coordinate once the point is clicked on the html and after the conversion to svg coordinates
        this.points;
        //
        //The first SVG circle element created
        this.circle1;
        //
        //These are the specifications for the first circle
        this.c1 = { x: 150, y: 225, r: 75 };
        //
        //These are the specifications for circle 2
        this.c2 = { x: 450, y: 75, r: 75 };
        //
        //The line identifier:- to mark the highlighting line.
        this.line;
    }
    //
    //Draw the two circles
    async draw_circle() {
        //
        //Create a circle within the SVG element
        this.circle1 = document.createElementNS(this.NS, "circle");
        this.circle1.setAttribute("id", "circle1");
        this.circle1.setAttribute('cx', this.c1.x);
        this.circle1.setAttribute('cy', this.c1.y);
        this.circle1.setAttribute('r', this.c1.r);
        this.svg.appendChild(this.circle1);
        //
        //Create the second circle within the SVG element
        let circle2 = document.createElementNS(this.NS, 'circle');
        circle2.setAttribute("id", "circle2");
        circle2.setAttribute('cx', this.c2.x);
        circle2.setAttribute('cy', this.c2.y);
        circle2.setAttribute('r', this.c2.r);
        this.svg.appendChild(circle2);
        //
        //Create the line
        const { p1, p2 } = await this.lineConnect();
        const line = document.createElementNS(this.NS, 'line');
        line.setAttribute("id", "connector");
        line.setAttribute("x1", p1.x1);
        line.setAttribute("y1", p1.y1);
        line.setAttribute("x2", p2.x2);
        line.setAttribute("y2", p2.y2);
        this.svg.appendChild(line);
    }
    //
    //The function that uses the points of the circle to draw a line that joins the two circles.
    async lineConnect() {
        //
        //Obtain the points of the circles
        const c1x = this.c1.x;
        const c1y = this.c1.y;
        const cx2 = this.c2.x;
        const cy2 = this.c2.y;
        const radius = this.c1.r;
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
        //Compact the line coordinates into an array of objects
        const p1 = { x1: c1x + dx, y1: c1y - dy }
        const p2 = { x2: cx2 - dx, y2: cy2 + dy }
        return { p1, p2 }
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
        //await this.lineConnect();
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
            //An object of the returned x and y coordinates
            this.points = { x: coord.x, y: coord.y };
        }
        //
        //Add the event listener
        element.addEventListener("click", show_point);
    }
    //
    //Move the circle to the desired point
    async move_circle() {
        //
        //Move the circle to the defined points
        this.circle1.setAttribute("cx", this.points.x);
        this.circle1.setAttribute("cy", this.points.y);
    }

}