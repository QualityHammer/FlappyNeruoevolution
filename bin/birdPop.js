class BirdPopulation extends Population {
    constructor() {
        super();
    }

    // Checks if the bird is colliding with either pipe
    collide(pipe) {
        if (this.pop.length > 0) {
            let x = this.getX();
            let w = this.getWidth();
            if (x + w / 2 > pipe.x && x - w / 2 < pipe.x + pipe.WIDTH) {
                for (let mem of this.pop) {
                    if (mem.pos.y - mem.HEIGHT / 2 < pipe.y1 ||
                        mem.pos.y + mem.HEIGHT / 2 > pipe.y1 + pipe.GAP) {
                        mem.dead = true;
                        mem.score = score.getScore();
                    }
                }
            }
        }
    }

    // Returns the best bird in the alive population (any bird that is still alive is the best as they all share a score)
    getBestCurrent() {
        if (this.pop.length > 0) {
            for (let mem of this.pop) {
                if (!mem.dead) return mem;
            }
        } else return null;
    }

    // Returns the width of the bird
    getWidth() {
        if (this.pop[0]) return this.pop[0].WIDTH;
        else return undefined;
    }

    // Returns the x position of the bird
    getX() {
        for (let mem of this.pop) {
            if (!mem.dead) return mem.pos.x;
        }
    }

    // Resets everything and sets the fitness values of all the birds and then calls new generation
    newGeneration() {
        // Set fitness
        this.setAllFitness();
        // Reset
        this.reset();
        super.newGeneration();
    }

    // Resets the score and pipes and then creates a new viewing generation
    newViewingGeneration() {
        // Reset
        this.reset();
        super.newViewingGeneration();
    }

    // Resets the score
    reset() {
        pipes.pipes.length = 0;
        counter = 0;
        score.val = 0;
    }

    // full opacity is optional, enter true to remove bird transparency
    show(full_opacity) {
        for (let mem of this.pop) {
            mem.show(full_opacity);
        }
    }

    // Gets the pipe values and then updates the population
    update() {
        for (let mem of this.pop) {
            mem.setInputs(pipes.getValues());
        }
        super.update();
    }
}