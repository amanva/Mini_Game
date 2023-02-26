class Projectile{
    constructor(game, x, y) {
        Object.assign(this, { game, x, y});

        this.spritesheet = assetMangager.getAsset("./mageBall.png");
        this.speed = 400;
        this.animations = [];
        this.hit = false;
        this.shot = {x: this.game.click.x, y: this.game.click.y};
        var dist = distanceBetween(this, this.shot);
        this.velocity = { x: (this.shot.x - this.x) / dist * this.speed, y: (this.shot.y - this.y) / dist * this.speed};
        this.animations.push(new Animator(this.spritesheet, 175, 255, 6, 6, 1, 0.1, 0, false, true, false));

        this.updateBB();
    };
    updateBB() {
        this.lastBB = this.BB;
        this.BB = new BoundingBox(this.x+5, this.y+5, 20, 20);
        
    };
    update(){
        const TICK = this.game.clockTick;

        this.x += this.velocity.x * TICK * 1.3;
        this.y += this.velocity.y * TICK * 1.3;
        this.updateBB();
        var that = this;
        this.game.entities.forEach(function (entity) {
            if (entity.BB && that.BB.collide(entity.BB)) {
                if ((entity instanceof Fruit) && that.BB.collide(entity.BB) && !that.hit) {
                   that.hit = true;
                   that.game.camera.score++;
                   that.removeFromWorld = true;
                   entity.removeFromWorld = true;
                   that.game.addEntityToBegin(new Explosion(that.game, entity.x, entity.y));
                }
                if(entity instanceof Ground && that.BB.collide(entity.BB)) {
                    that.removeFromWorld = true;
                }
                    }
            });
            
            if(this.y < 0){
                this.removeFromWorld = true;                
            }
            if(this.x < -10){
                this.removeFromWorld = true; 
            }

            if(this.x > 800){
                this.removeFromWorld = true;  
            }
        
    };

    draw(ctx){
        this.animations[0].drawFrame(this.game.clockTick, ctx, this.x, this.y, 4);
        if(debug){
        this.BB.draw(ctx);
        }
    };
    
};
function distanceBetween(first, second) {
    return Math.sqrt((second.x - first.x) * (second.x - first.x) + (second.y - first.y) * (second.y - first.y));
};