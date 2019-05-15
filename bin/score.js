class Score {
    constructor() {
        this.START = mp.createVector(25, 25);
        this.val = 0;
        this.pos = mp.createVector(25, 25);
    }

    // Returns the current score squared
    getScore() {
        return this.val;
    }

    show() {
        let s = this.val.toString();
        for (let i = 0; i < s.length; i++) {
            if (s[i] === '0') {
                mp.image(sp0, this.pos.x, this.pos.y);
            } else if (s[i] === '1') {
                mp.image(sp1, this.pos.x, this.pos.y);
            } else if (s[i] === '2') {
                mp.image(sp2, this.pos.x, this.pos.y);
            } else if (s[i] === '3') {
                mp.image(sp3, this.pos.x, this.pos.y);
            } else if (s[i] === '4') {
                mp.image(sp4, this.pos.x, this.pos.y);
            } else if (s[i] === '5') {
                mp.image(sp5, this.pos.x, this.pos.y);
            } else if (s[i] === '6') {
                mp.image(sp6, this.pos.x, this.pos.y);
            } else if (s[i] === '7') {
                mp.image(sp7, this.pos.x, this.pos.y);
            } else if (s[i] === '8') {
                mp.image(sp8, this.pos.x, this.pos.y);
            } else if (s[i] === '9') {
                mp.image(sp9, this.pos.x, this.pos.y);
            }
            this.pos.x += sp0.width + this.START.x / 6;
        }
        this.pos.set(this.START);
    }

    update() {
        // Score increaser
        if (counter % 15 === 0) this.val += 1;
    }
}