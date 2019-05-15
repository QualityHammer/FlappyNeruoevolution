class Player {
    // Both parameters are optional
    // brain is for creating a new player with a seperate neural network
    // if noMutate is true, it skips the mutation process. This is for viewing purposes or for keeping a good neural network
    // enter the fitness if you want it to 
    constructor(brain, noMutate) {
        // Constants
        this.GRAV = 0.6;
        this.LIFT = -25;
        this.WIDTH = bird_mid.width;
        this.HEIGHT = bird_mid.height;
        // Game variables
        this.pos = mp.createVector(mp.width / 5, mp.height / 2);
        this.vel = 0;
        this.action = 0;
        this.dead = false;
        this.fallRotation = -mp.PI / 6;
        this.score = 0;
        this.fitness = 0;

        // Neuroevolution
        this.inputs = [];
        if (brain) {
            this.brain = brain.copy();
            if (!noMutate) this.brain.mutate(mutation);
        } else {
            this.brain = new NeuralNetwork(5, 5, 1);
        }
    }

    // Moves animation forward
    animate() {
        // Image animator
        if (cnv1.frameCount % 10 === 0 && !this.dead) {
            this.action += 1;
            if (this.action > 3) {
                this.action = 0;
            }
        }
    }

    // Limits player to screen height
    boundries() {
        // Limiting
        if (this.pos.y > mp.height - GROUND_HEIGHT) {
            this.pos.y = mp.height - GROUND_HEIGHT;
            this.dead = true;
            this.score = score.getScore();
            this.vel = 0;
        } else if (this.pos.y < 0) {
            this.pos.y = 0;
            this.vel = 0;
        }
    }

    // Gets the players y position and velocity
    setPlayerInputs() {
        this.inputs[3] = this.pos.y;
        this.inputs[4] = this.vel;
    }

    // Makes bird jump
    jump() {
        if (!this.dead) this.vel += this.LIFT;
    }

    // Used for setting pipe inputs externally
    setInputs(inputs) {
        this.inputs = inputs;
    }

    // Sets the score of this bird
    setScore(score) {
        this.score = score;
    }

    // full opacity is optional, enter true to remove bird transparency
    show(full_opacity) {
        mp.push();
        mp.translate(this.pos.x, this.pos.y);
        // Rotation
        if (this.vel < 7) {
            if (!this.dead) this.fallRotation = -mp.PI / 6;
            mp.rotate(this.fallRotation);
        } else if (this.vel <= 25) {
            if (!this.dead) {
                this.fallRotation += mp.PI / 8;
                this.fallRotation = mp.constrain(this.fallRotation, -mp.PI / 6, mp.PI / 2);
            }
            mp.rotate(this.fallRotation);
        } else {
            mp.rotate(mp.PI / 2);
        }
        if (!full_opacity) mp.tint(255, 120);
        // Image display
        if (this.action === 0 || this.action === 2) {
            mp.image(bird_mid, -this.WIDTH / 2, -this.HEIGHT / 2);
        } else if (this.action === 1) {
            mp.image(bird_down, -this.WIDTH / 2, -this.HEIGHT / 2);
        } else if (this.action === 3) {
            mp.image(bird_up, -this.WIDTH / 2, -this.HEIGHT / 2);
        }
        mp.pop();
        this.animate();
    }

    // Neural network
    think() {
        // Neural network guess
        this.setPlayerInputs();
        let outputs = this.brain.predict(this.inputs);
        if (outputs > 0.5) {
            this.jump();
        }
    }

    update() {
        // Physics
        this.vel += this.GRAV;
        if (this.vel < 0) this.vel *= 0.9;
        if (this.vel < -25) this.vel = -25;
        this.pos.y += this.vel;
        if (this.dead) this.pos.x += PIPE_SPEED;
        this.boundries();
    }
}