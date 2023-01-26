class Fruit{
    constructor(game, x, y){
        Object.assign(this, { game, x, y });
        this.spritesheet = assetMangager.getAsset("./Fruit.png");
        this.animations = [];
        this.state = 0;
        this.speed = 100;
        this.dead = false;
        this.loadAnimations();
        this.updateBB();
    }
    loadAnimations(){
        this.animations[0] = new Animator(this.spritesheet, 0, 0, 16, 16, 1, 0.10, 0, false, true);
        this.animations[1] = new Animator(this.spritesheet, 16, 0, 16, 16, 1, 0.10, 0, false, true);
    };
    updateBB() {
        this.lastBB = this.BB;
        this.BB = new BoundingBox(this.x, this.y, 16 * PARAMS.SCALE, 16 * PARAMS.SCALE);
        
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
                        }
                        that.updateBB();
                    }
            });
        }
    };


    draw(ctx){
        this.animations[this.state].drawFrame(this.game.clockTick, ctx, this.x, this.y, PARAMS.SCALE);
        ctx.strokeStyle = 'Red';
        ctx.strokeRect(this.BB.x, this.BB.y, this.BB.width, this.BB.height);
    };
};3