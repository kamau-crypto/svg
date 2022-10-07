export default class svg {
    //
    //Get the namespace that defines all our svg elements
    NS = "http://www.w3.org/2000/svg";
    //
    //constructor
    constructor(svg, NS) {
        //
        //super();]
        //
        this.NS = NS

    }
    //
    //Draw the two circles
    async draw_circle() {
        //
        //Get the element that acts as the canvas to all our svg elements
        const svg = document.querySelector('svg');
        //
        //Create a circle within the SVG element
        let circle1 = document.createElementNS(this.NS, "circle");
        circle1.setAttribute('id', 'circle1');
        circle1.setAttribute('cx', '150');
        const c1x = parseFloat(circle1.getAttribute('cx'));
        circle1.setAttribute('cy', '225');
        const c1y = parseFloat(circle1.getAttribute('cy'));
        circle1.setAttribute('r', '75');
        const rc1 = parseFloat(circle1.getAttribute('r'));
        svg.appendChild(circle1);
        //
        //Create the second circle within the SVG element
        let circle2 = document.createElementNS(this.NS, 'circle');
        circle2.setAttribute('id', 'circle2');
        circle2.setAttribute('cx', '450');
        const c2x = parseFloat(circle2.getAttribute('cx'));
        circle2.setAttribute('cy', '75');
        const c2y = parseFloat(circle2.getAttribute('cy'));
        circle2.setAttribute('r', '75');
        const rc2 = parseFloat(circle2.getAttribute('r'));
        svg.appendChild(circle2);
        //      
        //Create the line connector
        const line = document.createElementNS(this.NS, 'line');

        //
        //return all the cirles' centers and their x and y points.
        return { c1x, c1y, rc1, c2x, c2y, rc2, line, circle1, svg }
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
        const { svg } = await this.draw_circle();
        //
        //Transform the mouse coordinates into real world coordinates once a point
        //is clicked
        const show_point = (e) => {
            //
            //Create an svg point
            const p = svg.createSVGPoint();
            //
            //Set the client page's coordinates 
            p.x = e.clientX;
            p.y = e.clientY;
            //
            //convert the screen coordinates to svg coordinates
            const coord = p.matrixTransform(svg.getScreenCTM().inverse());
            //
            //alert(`The coordinates of this point are x: ${coord.x} and y: ${coord.y}`);
            const pointx = coord.x;
            const pointy = coord.y;
            alert(`the x-coordinate is ${pointx}, and the y coordinate is ${pointy}`);
            //
            //Return the pointx and pointy
            return { pointx, pointy };
        }
        //
        //Add the event listener
        svg.addEventListener("click", show_point);
        //
        //Get the points returned from show points once they are clicked.
        const { pointx, pointy } = show_point;
        //Return the coordinates once they are clicked
        return { pointx, pointy };
    }
    //
    //MOve the circle to the desired point
    async move_circle() {
        //
        //Destructure the show point method to get the returned coordinates
        let { pointx, pointy } = await this.showPoint();
        //
        //Get the first circle drawn
        let { circle1 } = await this.draw_circle();
        //
        //Move the circle to the defined points
        circle1.setAttribute("x1", pointx);
        circle1.setAttribute("y1", pointy);
    }
    //
    //The function that uses the points of the circle to draw a line that joins the two circles.
    async lineConnect() {
        //
        //Destructure the show point method to get the returned coordinates
        let { pointx, pointy } = await this.showPoint();
        //
        //Get all points from the drawn circles
        let { c2x, c2y, rc1, line } = await this.draw_circle();
        //
        //Obtain the points of the circles
        const c1x = pointx;
        const c1y = pointy;
        const cx2 = c2x;
        const cy2 = c2y;
        const radius = rc1;
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
        line.setAttribute("x1", c1x + dx);
        line.setAttribute("y1", c1y - dy);
        line.setAttribute("x2", cx2 - dx);
        line.setAttribute("y2", cy2 + dy);
    }
}
