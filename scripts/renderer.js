class Renderer {
    // canvas:              object ({id: __, width: __, height: __})
    // num_curve_sections:  int
    constructor(canvas, num_curve_sections, show_points_flag) {
        this.canvas = document.getElementById(canvas.id);
        this.canvas.width = canvas.width;
        this.canvas.height = canvas.height;
        this.ctx = this.canvas.getContext('2d', {willReadFrequently: true});
        this.slide_idx = 0;
        this.num_curve_sections = num_curve_sections;
        this.show_points = show_points_flag;
    }

    // n:  int
    setNumCurveSections(n) {
        this.num_curve_sections = n;
        this.drawSlide(this.slide_idx);
    }

    // flag:  bool
    showPoints(flag) {
        this.show_points = flag;
        this.drawSlide(this.slide_idx);
    }
    
    // slide_idx:  int
    drawSlide(slide_idx) {
        this.slide_idx = slide_idx;
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        let framebuffer = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);

        switch (this.slide_idx) {
            case 0:
                this.drawSlide0(framebuffer);
                break;
            case 1:
                this.drawSlide1(framebuffer);
                break;
            case 2:
                this.drawSlide2(framebuffer);
                break;
            case 3:
                this.drawSlide3(framebuffer);
                break;
        }

        this.ctx.putImageData(framebuffer, 0, 0);
    }

    // framebuffer:  canvas ctx image data
    drawSlide0(framebuffer) {
        let color = [150, 16, 125, 255];
        this.drawBezierCurve({x: 100, y: 100}, {x:150, y: 300}, {x: 350, y: 300}, {x: 300, y: 100}, this.num_curve_sections, color, framebuffer);
        this.drawBezierCurve({x: 600, y: 100}, {x: 600, y: 500}, {x: 400, y: 500}, {x: 300, y: 500}, this.num_curve_sections, color, framebuffer);
    }

    // framebuffer:  canvas ctx image data
    drawSlide1(framebuffer) {
        let color = [153, 151, 47, 255];
        this.drawCircle({x: 150, y: 150}, 50, this.num_curve_sections, color, framebuffer);  
        this.drawCircle({x: 400, y: 350}, 200, this.num_curve_sections, color, framebuffer);
    }

    // framebuffer:  canvas ctx image data
    drawSlide2(framebuffer) {
        let color = [72, 153, 219, 255];
        this.drawConvexPolygon([{x: 50, y: 100}, {x: 100, y: 300}, {x: 200, y: 200}, {x: 250, y: 50},{x: 250, y: 0}], color, framebuffer)
        this.drawConvexPolygon([{x: 300, y: 400}, {x: 200, y: 450}, {x: 400, y: 200}, {x: 400, y: 100},{x: 550, y: 0},{x: 600, y: 400},{x: 400, y: 450}], color, framebuffer)
    }

    // framebuffer:  canvas ctx image data
    drawSlide3(framebuffer) {
        let color = [63, 234, 208, 255];
        
        // C
        this.drawBezierCurve({x: 70, y: 200}, {x: 25, y: 250}, {x: 25, y: 350}, {x: 70, y: 400}, this.num_curve_sections, color, framebuffer);
        this.drawBezierCurve({x: 70, y: 200}, {x: 100, y: 180}, {x: 120, y: 200}, {x: 130, y: 225}, this.num_curve_sections, color, framebuffer);
        this.drawBezierCurve({x: 70, y: 400}, {x: 90, y: 410}, {x: 115, y: 395}, {x: 130, y: 350}, this.num_curve_sections, color, framebuffer);
        // a
        this.drawCircle({x: 170, y: 220}, 30, this.num_curve_sections, color, framebuffer);
        if (this.show_points) {
            this.drawVertex({x: 200, y: 190}, color, framebuffer)
            this.drawVertex({x: 200, y: 240}, color, framebuffer)
        }
        this.drawLine({x: 200, y: 190}, {x: 200, y: 240}, color, framebuffer);
        //t
        if (this.show_points) {
            this.drawVertex({x: 230, y: 190}, color, framebuffer)
            this.drawVertex({x: 230, y: 260}, color, framebuffer)
            this.drawVertex({x: 210, y: 240}, color, framebuffer)
            this.drawVertex({x: 250, y: 240}, color, framebuffer)
        }
        this.drawLine({x: 230, y: 190}, {x: 230, y: 260}, color, framebuffer);
        this.drawLine({x: 210, y: 240}, {x: 250, y: 240}, color, framebuffer);
        //h
        if (this.show_points) {
            this.drawVertex({x: 260, y: 190}, color, framebuffer)
            this.drawVertex({x: 260, y: 300}, color, framebuffer)
        }
        this.drawLine({x: 260, y: 190}, {x: 260, y: 300}, color, framebuffer);
        this.drawBezierCurve({x: 260, y: 230}, {x: 300, y: 230}, {x: 280, y: 240}, {x: 290, y: 190}, this.num_curve_sections, color, framebuffer);
        //e
        this.drawConvexPolygon([{x: 300, y: 220}, {x: 320, y: 230}, {x: 330, y: 240}, {x: 320, y: 250},{x: 300, y: 240}], color, framebuffer);
        this.drawBezierCurve({x: 300, y: 220}, {x: 300, y: 185}, {x: 320, y: 185}, {x: 330, y: 200}, this.num_curve_sections, color, framebuffer);
        //r
        if (this.show_points) {
            this.drawVertex({x: 340, y: 190}, color, framebuffer)
            this.drawVertex({x: 340, y: 260}, color, framebuffer)
        }
        this.drawLine({x: 340, y: 190}, {x: 340, y: 260}, color, framebuffer);
        this.drawBezierCurve({x: 340, y: 250}, {x: 350, y: 260}, {x: 345, y: 260}, {x: 360, y: 250}, this.num_curve_sections, color, framebuffer);
        //i
        if (this.show_points) {
            this.drawVertex({x: 370, y: 190}, color, framebuffer)
            this.drawVertex({x: 370, y: 260}, color, framebuffer)
        }
        this.drawLine({x: 370, y: 190}, {x: 370, y: 260}, color, framebuffer);
        this.drawCircle({x: 370, y: 280}, 3, this.num_curve_sections, color, framebuffer);
        //n
        if (this.show_points) {
            this.drawVertex({x: 390, y: 190}, color, framebuffer)
            this.drawVertex({x: 390, y: 260}, color, framebuffer)
        }
        this.drawLine({x: 390, y: 190}, {x: 390, y: 260}, color, framebuffer);
        this.drawBezierCurve({x: 390, y: 240}, {x: 410, y: 260}, {x: 430, y: 260}, {x: 420, y: 190}, this.num_curve_sections, color, framebuffer);
        //e
        this.drawConvexPolygon([{x: 440, y: 220}, {x: 460, y: 230}, {x: 470, y: 240}, {x: 460, y: 250}, {x: 440, y: 240}], color, framebuffer);
        this.drawBezierCurve({x: 440, y: 220}, {x: 440, y: 185}, {x: 460, y: 185}, {x: 470, y: 200}, this.num_curve_sections, color, framebuffer);
    
        // smiley face! 
        if (this.show_points) {
            this.drawVertex({x: 565, y: 300}, color, framebuffer)
            this.drawVertex({x: 565, y: 360}, color, framebuffer)
            this.drawVertex({x: 635, y: 300}, color, framebuffer)
            this.drawVertex({x: 635, y: 360}, color, framebuffer)
        }
        this.drawLine({x: 565, y: 300}, {x: 565, y: 360}, color, framebuffer);
        this.drawLine({x: 635, y: 300}, {x: 635, y: 360}, color, framebuffer);
        this.drawBezierCurve({x: 540, y: 260}, {x: 570, y: 185}, {x: 630, y: 185}, {x: 660, y: 260}, this.num_curve_sections, color, framebuffer);
    }

    // p0:           object {x: __, y: __}
    // p1:           object {x: __, y: __}
    // p2:           object {x: __, y: __}
    // p3:           object {x: __, y: __}
    // num_edges:    int
    // color:        array of int [R, G, B, A]
    // framebuffer:  canvas ctx image data
    drawBezierCurve(p0, p1, p2, p3, num_edges, color, framebuffer) {
        let start = p0;
        if (this.show_points){
            this.drawVertex(p1, [100, 100, 100, 255], framebuffer);
            this.drawVertex(p2, [100, 100, 100, 255], framebuffer);
        }
        let x;
        let y;
        for (let t = 0; t <= 1.000001; t = t + 1/num_edges) {
            x = Math.pow((1-t), 3) * p0.x + 3 * Math.pow((1-t), 2) * t*p1.x + 3*(1-t)*Math.pow(t, 2)*p2.x + Math.pow(t, 3)*p3.x;
            y = Math.pow((1-t), 3) * p0.y + 3 * Math.pow((1-t), 2) * t*p1.y + 3*(1-t)*Math.pow(t, 2)*p2.y + Math.pow(t, 3)*p3.y;
            this.drawLine(start, {x:Math.round(x), y:Math.round(y)}, color, framebuffer);
            if (this.show_points){
                this.drawVertex({x:Math.round(x), y:Math.round(y)}, color, framebuffer);
            }
            start = {x:Math.round(x), y:Math.round(y)}; //I want to save start here so that the next point is drawn from the start to the next curve....
        }

    }

    // center:       object {x: __, y: __}
    // radius:       int
    // num_edges:    int
    // color:        array of int [R, G, B, A]
    // framebuffer:  canvas ctx image data
    drawCircle(center, radius, num_edges, color, framebuffer) {
        let x;
        let y;
        let start = {x: center.x+radius, y: center.y};
        let epsilon = .00001
        for (let t = 0; t <= 2*Math.PI+epsilon; t = t+(2*Math.PI/num_edges)) {
            x = center.x + radius *  Math.cos(t);
            y = center.y + radius *  Math.sin(t);
            this.drawLine(start, {x:Math.round(x), y:Math.round(y)}, color, framebuffer);
            if (this.show_points){
                this.drawVertex({x:Math.round(x), y:Math.round(y)}, color, framebuffer);
            }            
            start = {x:Math.round(x), y:Math.round(y)};
        }
    }
    
    // vertex_list:  array of object [{x: __, y: __}, {x: __, y: __}, ..., {x: __, y: __}]
    // color:        array of int [R, G, B, A]
    // framebuffer:  canvas ctx image data
    drawConvexPolygon(vertex_list, color, framebuffer) {
        if (this.show_points){
            this.drawVertex(vertex_list[0], color, framebuffer);
            this.drawVertex(vertex_list[1], color, framebuffer);
        }
        for (let i = 1; i< vertex_list.length-1; i++) {
            this.drawTriangle(vertex_list[0],vertex_list[i],vertex_list[i+1], color, framebuffer)
            if (this.show_points){
                this.drawVertex(vertex_list[i+1], color, framebuffer);
            } 
        }
    }
    
    // v:            object {x: __, y: __}
    // color:        array of int [R, G, B, A]
    // framebuffer:  canvas ctx image data
    drawVertex(v, color, framebuffer) {
        this.drawLine({x: v.x-4, y: v.y-4}, {x:v.x+4, y:v.y+4}, color, framebuffer);
        this.drawLine({x: v.x+4, y: v.y-4}, {x: v.x-4, y: v.y+4}, color, framebuffer);        
    }
    
    /***************************************************************
     ***       Basic Line and Triangle Drawing Routines          ***
     ***       (code provided from in-class activities)          ***
     ***************************************************************/
    pixelIndex(x, y, framebuffer) {
	    return 4 * y * framebuffer.width + 4 * x;
    }
    
    setFramebufferColor(color, x, y, framebuffer) {
	    let p_idx = this.pixelIndex(x, y, framebuffer);
        for (let i = 0; i < 4; i++) {
            framebuffer.data[p_idx + i] = color[i];
        }
    }
    
    swapPoints(a, b) {
        let tmp = {x: a.x, y: a.y};
        a.x = b.x;
        a.y = b.y;
        b.x = tmp.x;
        b.y = tmp.y;
    }

    drawLine(p0, p1, color, framebuffer) {
        if (Math.abs(p1.y - p0.y) <= Math.abs(p1.x - p0.x)) { // |m| <= 1
            if (p0.x < p1.x) {
                this.drawLineLow(p0.x, p0.y, p1.x, p1.y, color, framebuffer);
            }
            else {
                this.drawLineLow(p1.x, p1.y, p0.x, p0.y, color, framebuffer);
            }
        }
        else {                                                // |m| > 1
            if (p0.y < p1.y) {
                this.drawLineHigh(p0.x, p0.y, p1.x, p1.y, color, framebuffer);
            }
            else {
                this.drawLineHigh(p1.x, p1.y, p0.x, p0.y, color, framebuffer);
            }
        }
    }
    
    drawLineLow(x0, y0, x1, y1, color, framebuffer) {
        let A = y1 - y0;
        let B = x0 - x1;
        let iy = 1; // y increment (+1 for positive slope, -1 for negative slop)
        if (A < 0) {
            iy = -1;
            A *= -1;
        }
        let D = 2 * A + B;
        let D0 = 2 * A;
        let D1 = 2 * A + 2 * B;
    
        let y = y0;
        for (let x = x0; x <= x1; x++) {
            this.setFramebufferColor(color, x, y, framebuffer);
            if (D <= 0) {
                D += D0;
            }
            else {
                D += D1;
                y += iy;
            }
        }
    }
    
    drawLineHigh(x0, y0, x1, y1, color, framebuffer) {
        let A = x1 - x0;
        let B = y0 - y1;
        let ix = 1; // x increment (+1 for positive slope, -1 for negative slop)
        if (A < 0) {
            ix = -1;
            A *= -1;
        }
        let D = 2 * A + B;
        let D0 = 2 * A;
        let D1 = 2 * A + 2 * B;
    
        let x = x0;
        for (let y = y0; y <= y1; y++) {
            this.setFramebufferColor(color, x, y, framebuffer);
            if (D <= 0) {
                D += D0;
            }
            else {
                D += D1;
                x += ix;
            }
        }
    }
    
    drawTriangle(p0, p1, p2, color, framebuffer) {
        // Deep copy, then sort points in ascending y order
        p0 = {x: p0.x, y: p0.y};
        p1 = {x: p1.x, y: p1.y};
        p2 = {x: p2.x, y: p2.y};
        if (p1.y < p0.y) this.swapPoints(p0, p1);
        if (p2.y < p0.y) this.swapPoints(p0, p2);
        if (p2.y < p1.y) this.swapPoints(p1, p2);
        
        // Edge coherence triangle algorithm
        // Create initial edge table
        let edge_table = [
            {x: p0.x, inv_slope: (p1.x - p0.x) / (p1.y - p0.y)}, // edge01
            {x: p0.x, inv_slope: (p2.x - p0.x) / (p2.y - p0.y)}, // edge02
            {x: p1.x, inv_slope: (p2.x - p1.x) / (p2.y - p1.y)}  // edge12
        ];
        
        // Do cross product to determine if pt1 is to the right/left of edge02
        let v01 = {x: p1.x - p0.x, y: p1.y - p0.y};
        let v02 = {x: p2.x - p0.x, y: p2.y - p0.y};
        let p1_right = ((v01.x * v02.y) - (v01.y * v02.x)) >= 0;
        
        // Get the left and right edges from the edge table (lower half of triangle)
        let left_edge, right_edge;
        if (p1_right) {
            left_edge = edge_table[1];
            right_edge = edge_table[0];
        }
        else {
            left_edge = edge_table[0];
            right_edge = edge_table[1];
        }
        // Draw horizontal lines (lower half of triangle)
        for (let y = p0.y; y < p1.y; y++) {
            let left_x = parseInt(left_edge.x) + 1;
            let right_x = parseInt(right_edge.x);
            if (left_x <= right_x) { 
                this.drawLine({x: left_x, y: y}, {x: right_x, y: y}, color, framebuffer);
            }
            left_edge.x += left_edge.inv_slope;
            right_edge.x += right_edge.inv_slope;
        }
        
        // Get the left and right edges from the edge table (upper half of triangle) - note only one edge changes
        if (p1_right) {
            right_edge = edge_table[2];
        }
        else {
            left_edge = edge_table[2];
        }
        // Draw horizontal lines (upper half of triangle)
        for (let y = p1.y; y < p2.y; y++) {
            let left_x = parseInt(left_edge.x) + 1;
            let right_x = parseInt(right_edge.x);
            if (left_x <= right_x) {
                this.drawLine({x: left_x, y: y}, {x: right_x, y: y}, color, framebuffer);
            }
            left_edge.x += left_edge.inv_slope;
            right_edge.x += right_edge.inv_slope;
        }
    }
};

export { Renderer };
