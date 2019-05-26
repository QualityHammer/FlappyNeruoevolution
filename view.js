let birds;
let pipes;
let score;
let back, ground, pipe_img, bird_down, bird_mid, bird_up;
let sp0, sp1, sp2, sp3, sp4, sp5, sp6, sp7, sp8, sp9;
const GROUND_HEIGHT = 100;

let net;
let speedSlider;
let span;
let counter = 0;
let deserializedNetwork;
let networkText;

let cnv1 = function (p) {
    // Image loading
    p.preload = function() {
        // Load best neural network
        networkText = p.loadStrings('network.txt');
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
        let canvas = p.createCanvas(600, 800);
        canvas.parent('sketch');
        deserializedNetwork = NeuralNetwork.deserialize(networkText[0]);
        net = new NeuralNetwork(deserializedNetwork);

        // Interfaces
        speedSlider = p.select('#speed-slider');
        span = p.select('#speed');

        // Game objects
        score = new Score();
        pipes = new PipeGroup();
        birds = new BirdGroup(1, true);
        birds.viewing = true;
        birds.birds[0] = new Bird(net);
    }

    p.draw = function() {
        // Speed slider
        let cycles = speedSlider.value();
        span.html(cycles);

        // Logic
        for (let i = 0; i < cycles; i++) {
            pipes.update();
            birds.update();
            score.update();
            counter++;
        }
        // Drawing
        p.image(back, 0, 0, p.width, p.height);
        pipes.show();
        p.image(ground, 0, p.height - GROUND_HEIGHT, p.width, GROUND_HEIGHT);
        birds.show(true);
        score.show();
    }
}

let mp = new p5(cnv1, 'sketch');