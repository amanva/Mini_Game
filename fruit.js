class Fruit{
    constructor(game, x, y, speed){
        Object.assign(this, { game, x, y, speed});
        this.spritesheet = assetMangager.getAsset("./Fruit.png");
        this.animations = [];
        this.rand = Math.floor(Math.random() * 5);
        this.state = this.rand;
        this.speed = speed;
        this.dead = false;
        this.loadAnimations();
        this.updateBB();
    } 
    loadAnimations(){
        // red apple
        this.animations[0] = new Animator(this.spritesheet, 0, 0, 16, 16, 1, 0.30, 0, false, true, true);
        // purple grape
        this.animations[1] = new Animator(this.spritesheet, 49, 0, 16, 16, 1, 0.30, 0, false, true, true);
        // green banana
        this.animations[2] = new Animator(this.spritesheet, 95, 31, 16, 16, 1, 0.30, 0, false, true, true);
        // green apple
        this.animations[3] = new Animator(this.spritesheet, 16, 0, 16, 16, 1, 0.30, 0, false, true, true);
        // green grape
        this.animations[4] = new Animator(this.spritesheet, 65, 0, 16, 16, 1, 0.30, 3, false, true, true);
    };
    updateBB() {
        this.lastBB = this.BB;
        this.BB = new BoundingBox(this.x+3, this.y+10, 30, 25);
        
    };
    update(){
        if(this.dead){
        this.removeFromWorld = true;
        }
        else{
        const TICK = this.game.clockTick;
        this.y += this.speed * TICK;
        var that = this;
        this.updateBB();
        this.game.entities.forEach(function (entity) {
            if (entity.BB && that.BB.collide(entity.BB)) {
                    if ((entity instanceof Ground) && (that.lastBB.bottom) >= entity.BB.top) {
                            that.dead = true;
                            if(that.game.camera.lives > 0){
                            that.game.camera.lives--;
                            }
                        }
                        that.updateBB();
                    }
            });
        }
    };


    draw(ctx){
        // console.log(this.state);
        this.animations[this.state].drawFrame(this.game.clockTick, ctx, this.x, this.y, 2.5);
        if(debug){
        ctx.strokeStyle = 'Red';
        ctx.strokeRect(this.BB.x, this.BB.y, this.BB.width, this.BB.height);
        }
    };
};3