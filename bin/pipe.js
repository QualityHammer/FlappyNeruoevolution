// Global constants
const PIPE_HEIGHT = 600;
const PIPE_SPEED = -2;

class Pipe {
    constructor() {
        // Constants
        this.WIDTH = 75;
        this.SPEED = PIPE_SPEED;
        this.GAP = 150;
        // Game variables
        this.y1 = mp.random(mp.height / 7, mp.height * 6 / 7 - this.GAP - GROUND_HEIGHT);
        this.y2 = this.y1 + this.GAP;
        this.x = mp.width;
        this.moving = true;
    }

    // Checks if pipe is offscreen
    offscreen() {
        return (this.x + this.WIDTH < 0);
    }

    show() {
        mp.image(pipe_img_up, this.x, this.y1 - PIPE_HEIGHT, this.WIDTH, PIPE_HEIGHT);
        mp.image(pipe_img_down, this.x, this.y2, this.WIDTH, PIPE_HEIGHT);
    }

    update() {
        if (this.moving) this.x += this.SPEED;
    }
}