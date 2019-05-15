class Bird {
    // Both parameters are optional
    // brain is for creating a new bird with a seperate neural network
    // if noMutate is true, it skips the mutation process. This is for viewing purposes
    constructor(brain, noMutate) {
        // Constants
        this.GRAV = 0.6;
        this.LIFT = -25;
        this.WIDTH = bird_mid.width;
        this.HEIGHT = bird_mid.height;
        // Game variables
        this.pos = myp5.createVector(myp5.width / 5, myp5.height / 2);
        this.vel = 0;
        this.action = 0;
        this.dead = false;
        this.fallRotation = -myp5.PI / 6;

        // Neuroevolution
        if (brain) {
            this.brain = brain.copy();
            if (!noMutate) this.brain.mutate(mutation);
        } else {
            this.brain = new NeuralNetwork(5, 5, 1);
        }
        this.score = 0;
        this.fitness = 0;
        this.inputs = [];
    }

    // Makes bird jump
    jump() {
        if (!this.dead) this.vel += this.LIFT;
    }

    // Sets the score of this bird
    setScore(score) {
        this.score = score;
    }

    // Used for setting pipe inputs externally
    setInputs(inputs) {
        this.inputs = inputs;
    }
    
    // Gets the players y position and velocity
    getPlayerValues() {
        this.inputs[3] = this.pos.y;
        this.inputs[4] = this.vel;
    }

    // full opacity is optional, enter true to remove bird transparency
    show(full_opacity) {
        myp5.push();
        myp5.translate(this.pos.x, this.pos.y);
        // Rotation
        if (this.vel < 7) {
            if (!this.dead) this.fallRotation = -myp5.PI / 6;
            myp5.rotate(this.fallRotation);
        } else if (this.vel <= 25) {
            if (!this.dead) {
                this.fallRotation += myp5.PI / 8;
                this.fallRotation = myp5.constrain(this.fallRotation, -myp5.PI / 6, myp5.PI / 2);
            }
            myp5.rotate(this.fallRotation);
        } else {
            myp5.rotate(myp5.PI / 2);
        }
        if (!full_opacity) myp5.tint(255, 120);
        // Image display
        if (this.action === 0 || this.action === 2) {
            myp5.image(bird_mid, -this.WIDTH / 2, -this.HEIGHT / 2);
        } else if (this.action === 1) {
            myp5.image(bird_down, -this.WIDTH / 2, -this.HEIGHT / 2);
        } else if (this.action === 3) {
            myp5.image(bird_up, -this.WIDTH / 2, -this.HEIGHT / 2);
        }
        myp5.pop();
        // Image animator
        if (cnv1.frameCount % 10 === 0 && !this.dead) {
            this.action += 1;
            if (this.action > 3) {
                this.action = 0;
            }
        }
    }

    // Neural network
    think() {
        // if (inputs) {
            // Get bird inputs
            // inputs[3] = this.pos.y;
            // inputs[4] = this.vel;
            this.getPlayerValues()
            // Neural network guess
            let outputs = this.brain.predict(this.inputs);
            if (outputs > 0.5) {
                this.jump();
            }
        // }
    }

    update() {
        // Physics
        this.vel += this.GRAV;
        if (this.vel < 0) this.vel *= 0.9;
        if (this.vel < -25) this.vel = -25;
        this.pos.y += this.vel;
        if (this.dead) this.pos.x += PIPE_SPEED;

        // Limiting
        if (this.pos.y > myp5.height - GROUND_HEIGHT) {
            this.pos.y = myp5.height - GROUND_HEIGHT;
            this.dead = true;
            this.score = score.getScore();
            this.vel = 0;
        } else if (this.pos.y < 0) {
            this.pos.y = 0;
            this.vel = 0;
        }
    }
}