class PipeGroup {
    constructor() {
        this.pipes = [];
    }

    // Returns the closest pipe that hasn't yet passed the bird group
    getClosest() {
        for (let pipe of this.pipes) {
            if (pipe.x + pipe.WIDTH > population.getX() - population.getWidth()) {
                return pipe;
            }
        }
    }

    // Returns the needed values of the closest pipe
    getValues() {
        try {
            let p = this.getClosest();
            let data = [p.x, p.y1, p.y2];
            return data;
        } catch(err) {}
    }

    show() {
        for (let pipe of this.pipes) {
            pipe.show();
        }
    }

    update() {
        // Adds new pipe every 120 frames
        if (counter % 120 === 0 || this.pipes.length === 0) this.pipes.push(new Pipe());
        // Updates each pipe in group
        for (let i = this.pipes.length - 1; i >= 0; i--) {
            this.pipes[i].update();
            // Deletes pipe if it goes offscreen
            if (this.pipes[i].offscreen()) this.pipes.splice(i, 1);
            // Collision
            population.collide(this.pipes[i]);
        }
    }
}