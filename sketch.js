let population;
let pipes;
let score;
let back, ground, pipe_img, bird_down, bird_mid, bird_up;
let sp0, sp1, sp2, sp3, sp4, sp5, sp6, sp7, sp8, sp9;
const GROUND_HEIGHT = 100;

let speedSlider;
let span;
let saveButt;
let counter = 0;
let graph;


// Main canvas
let cnv1 = function (p) {
    // Image loading
    p.preload = function() {
        // Directories
        let a = 'assets/';
        let n = a + 'nums/';
        // Game sprites
        back = p.loadImage(a + 'background-day.png');
        ground = p.loadImage(a + 'base.png');
        pipe_img_up = p.loadImage(a + 'pipe-green-up.png');
        pipe_img_down = p.loadImage(a + 'pipe-green-down.png');
        bird_down = p.loadImage(a + 'yellowbird-downflap.png');
        bird_mid = p.loadImage(a + 'yellowbird-midflap.png');
        bird_up = p.loadImage(a + 'yellowbird-upflap.png');
        // Number sprites
        sp0 = p.loadImage(n + '0.png');
        sp1 = p.loadImage(n + '1.png');
        sp2 = p.loadImage(n + '2.png');
        sp3 = p.loadImage(n + '3.png');
        sp4 = p.loadImage(n + '4.png');
        sp5 = p.loadImage(n + '5.png');
        sp6 = p.loadImage(n + '6.png');
        sp7 = p.loadImage(n + '7.png');
        sp8 = p.loadImage(n + '8.png');
        sp9 = p.loadImage(n + '9.png');
    }

    p.setup = function() {
        p.createCanvas(600, 800);

        // Interfaces
        speedSlider = p.select('#speed-slider');
        span = p.select('#speed');
        saveButt = p.select('#save-bird');

        // Game objects
        score = new Score();
        pipes = new PipeGroup();
        population = new BirdPopulation();
        saveButt.mousePressed(serial);
    }

    p.draw = function() {
        // Speed slider
        let cycles = speedSlider.value();
        span.html(cycles);

        // Logic
        for (let i = 0; i < cycles; i++) {
            pipes.update();
            population.update();
            score.update();
            counter++;
        }
        // Drawing
        p.image(back, 0, 0, p.width, p.height);
        pipes.show();
        p.image(ground, 0, p.height - GROUND_HEIGHT, p.width, GROUND_HEIGHT);
        population.show();
        score.show();
    }
}

let mp = new p5(cnv1, 'sketch');

// Secondary canvas
let cnv2 = function(p) {
    p.setup = function() {
        p.createCanvas(600, 600);
        graph = new Graph();
    }

    p.draw = function() {
        p.background(0);
        graph.show();
    }
}

let secondary = new p5(cnv2, 'sketch2');