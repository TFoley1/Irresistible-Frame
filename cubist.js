class Square {
    constructor() {
        this.x = random(0,100);
        this.y = random(0,100);
        this.w = random(20,40);
        this.xVel = random(2,6);
        // this.yVel = random(2,6);
        this.angle = 0;
    }

    move() {
        this.x = this.x + this.xVel;
        //this.y = this.y + this.yVel;
        this.angle += (frameCount/60) * 0.1;
        if (this.x >= width - this.w || this.x <= 0 + this.w) {
            this.xVel*= -1
            if (this.xVel >= 0) {
                this.xVel -= random(0,2)
            }
            if (this.xVel <= 0) {
                this.xVel += random(0,2)
            }
        }
    }

    show() {
        // Draw the square
        push();
        translate(this.x,height/2); // Move to the square's position
        angleMode(DEGREES)
        rotate(this.angle); // Apply rotation
        rectMode(CENTER); // Draw the rectangle from its center
        //fill(200, 50, 100);
        noStroke();
        rect(0, 0, this.w, this.w); 
        pop(); 
    }

    setSize(width) {
        this.w = width;
    }
}