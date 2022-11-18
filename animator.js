class Animator {

    constructor(spritesheet, xStart, yStart, width, height, frameCount, frameDuration, framePadding) {
        Object.assign(this, {spritesheet, xStart, yStart, width, height, frameCount, frameDuration, framePadding});
        this.elapsedTime = 0;
        this.totalTime = frameCount * frameDuration;
    };


    drawFrame(tick, ctx, x, y) {

        this.elapsedTime += tick;
        if(this.elapsedTime > this.totalTime) this.elapsedTime -= this.totalTime;
        const spriteAnimations = [];
        let playerState = 'idle';
        const animationStates = [
            {
                name: 'spawn',
                frames: 8,
            },
            {
                name: 'idle',
                frames: 8,
            },
            {
                name: 'place',
                frames: 8,
            },
            {
                name: 'place2',
                frames: 8,
            },
            {
                name: 'place3',
                frames: 8,
            },
            {
                name: 'place4',
                frames: 8,
            },
            {
                name: 'shoot',
                frames: 8,
            },
            {
                name: 'place5',
                frames: 8,
            },
            {
                name: 'jump',
                frames: 7,
            },
            {
                name: 'shootup',
                frames: 7,
            },
            {
                name: 'place3',
                frames: 8,
            },
            {
                name: 'place3',
                frames: 8,
            },
            {
                name: 'place3',
                frames: 8,
            },
            {
                name: 'place3',
                frames: 8,
            },
            {
                name: 'place3',
                frames: 8,
            },
            {
                name: 'place3',
                frames: 8,
            },

        ];
        animationStates.forEach((State, index) => {
            let frames = {
                loc: [], 
            }
            for(let i = 0; i < State.frames; i++){
                let positionX = this.xStart + (this.width + this.framePadding) * i;
                let positionY = this.yStart + (this.height) * index;
                frames.loc.push({s: positionX, t: positionY});
            }
            spriteAnimations[State.name] = frames;
        });
        let position = Math.floor(this.elapsedTime / this.frameDuration) % spriteAnimations[playerState].loc.length;
        let frameX = position;
        let frameY = spriteAnimations[playerState].loc[position].t;
        ctx.drawImage(this.spritesheet,  
            this.xStart + (this.width + this.framePadding)*frameX, frameY, 
            this.width, this.height, 
            x, y, 
            this.width*2, this.height*2);
            


    };



    isDone() {
        return (this.elapsedTime >= this.totalTime);
    };
    
}