class BirdGroup {
    constructor(size) {
        // Current alive bird generation
        this.birds = [];
        // Current dead bird generation
        this.deadBirds = [];
        this.bestBird = null;
        this.topScore = 0;
        this.generation = 0;
        this.size = size;
        this.viewing = false;
        for (let i = 0; i < size; i++) {
            this.birds.push(new Bird());
        }
    }

    // Calculates the fitness value for each bird when a new generation is made
    calculateFitness() {
        let sum = 0;
        for (let bird of this.deadBirds) {
            sum += bird.score;
        }
        for (let bird of this.deadBirds) {
            bird.fitness = bird.score / sum;
        }
    }

    // Checks if the bird is colliding with either pipe
    collide(pipe) {
        if (this.birds.length > 0) {
            let x = this.getX();
            let w = this.getWidth();
            if (x + w / 2 > pipe.x && x - w / 2 < pipe.x + pipe.WIDTH) {
                for (let bird of this.birds) {
                    if (bird.pos.y - bird.HEIGHT / 2 < pipe.y1 ||
                        bird.pos.y + bird.HEIGHT / 2 > pipe.y1 + pipe.GAP) {
                        bird.dead = true;
                        bird.score = score.getScore();
                    }
                }
            }
        }
    }

    // Returns the best bird in the alive population
    getBestCurrent() {
        if (this.birds.length > 0) {
            for (let bird of this.birds) {
                if (!bird.dead) return bird;
            }
        } else return null;
    }

    // Returns the best bird in the population
    getBest() {
        let top = 0;
        let best = null;
        for (let bird of this.deadBirds) {
            if (bird.score > top) {
                top = Math.pow(bird.score, 0.5);
                best = bird.brain;
            }
        }
        // Adds the top score to the graph
        graph.addPoint(top);
        // Sets the top score and logs it
        if (top > this.topScore) {
            this.topScore = top;
        }
        return new Bird(best);
    }

    // Returns the width of the bird
    getWidth() {
        if (this.birds[0]) return this.birds[0].WIDTH;
        else return undefined;
    }

    // Returns the x position of the bird
    getX() {
        for (let bird of this.birds) {
            if (!bird.dead) return bird.pos.x;
        }
    }

    // Creates a new generation
    // Calculates fitness and uses selection and mutation process
    newGeneration() {
        // Interface
        let g = myp5.select('#generation');
        this.generation++;
        g.html(this.generation);
        // Reset
        pipes.pipes.length = 0;
        counter = 0;
        this.calculateFitness();
        this.bestBird = this.getBest();
        // Reset score
        score.val = 0;
        // New generation
        this.birds[0] = this.bestBird;
        for (let i = 1; i < this.size * 0.9; i++) {
            this.birds[i] = this.selection();
        }
        for (let i = this.size * 0.9; i < this.size; i++) {
            this.birds[i] = new Bird();
        }
        this.deadBirds.length = 0;
    }

    // Creates a new "generation" of a single bird to loop through while viewing
    newViewingGeneration() {
        let b = new Bird(this.deadBirds[0].brain);
        this.birds[0] = b;
        this.deadBirds.length = 0;
        score.val = 0;
    }

    // Uses the birds fitness values to select a worthy bird
    selection() {
        let i = 0;
        let r = Math.random();
        while (r > 0) {
            r -= this.deadBirds[i].fitness;
            i++;
        }
        i--;
        return new Bird(this.deadBirds[i].brain);
    }

    // Serializes the current best bird brain weights
    serializeBest() {
        if (this.generation > 0) {
            if (!this.bestBird.dead) {
                this.bestBird.brain.serialize();
            } else if (this.birds.length > 0) {
                for (let bird of this.birds) {
                    if (!bird.dead) {
                        bird.brain.serialize();
                        break;
                    }
                }
            } else this.bestBird.brain.serialize();
        }
    }

    // full opacity is optional, enter true to remove bird transparency
    show(full_opacity) {
        for (let bird of this.birds) {
            bird.show(full_opacity);
        }
    }

    update() {
        // New generation
        if (this.birds.length <= 0) {
            if (this.viewing) {
                this.newViewingGeneration();
            } else {
                this.newGeneration();
            }
        }
        let vals = pipes.getValues();
        for (let i = 0; i < this.birds.length; i++) {
            if (this.birds[i].pos.x < 0) {
                this.deadBirds.push(this.birds.splice(i, true)[0]);
                continue;
            }
            if (!this.birds[i].dead) {
                this.birds[i].setInputs(vals);
                this.birds[i].think();
            }
            this.birds[i].update();
        }
    }
}