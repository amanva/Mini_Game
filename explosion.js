class Explosion{
    constructor(game, x, y){
        Object.assign(this, { game, x, y});
        this.animations = [];
        this.rand = Math.floor(Math.random() * 2);
        this.state = this.rand;
        this.dead = false;
        this.loadAnimations();
        this.updateBB();
    } 
    loadAnimations(){
        // red apple
        this.animations[0] = new Animator(assetMangager.getAsset("./explode.png"), 0, 0, 32, 21, 6, 0.10, 0, false, false, false);
        this.animations[1] = new Animator(assetMangager.getAsset("./explode2.png"), 0, 0, 32, 21, 6, 0.10, 0, false, false, false);
    };
    updateBB() {
        this.lastBB = this.BB;
        this.BB = new BoundingBox(this.x+3, this.y+10, 30, 25);
        
    };
    update(){
        const TICK = this.game.clockTick;
        if(this.animations[0].isAlmostDone(TICK)){
            this.removeFromWorld = true;
        }
    };


    draw(ctx){
        // console.log(this.state);
        this.animations[this.state].drawFrame(this.game.clockTick, ctx, this.x-15, this.y-10, 2.5);
        if(debug){
        ctx.strokeStyle = 'Red';
        ctx.strokeRect(this.BB.x, this.BB.y, this.BB.width, this.BB.height);
        }
    };
};