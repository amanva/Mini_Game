class Mage {

    constructor(game, x, y){
        Object.assign(this, { game, x, y });
        this.game.knight = this;
        this.velocity = { x: 0, y: 0 };
        this.spritesheetMage = assetMangager.getAsset("./wizard.png");
        // this.animator = new Animator(assetMangager.getAsset("./megamanfull.png"), 0, 0, 49, 49, 8, 0.10, 0);
        this.speed = 200;
        this.fallAcc = 200;
        this.facing = 0; 
        this.state = 0;
        this.playerJump = false;
        this.shoot = false;
        this.elapsedTime = 0;
        this.dead = false;
        this.updateBB();
        this.animations = [];
        this.loadAnimations();
    };
    loadAnimations() {
        for (var i = 0; i < 3; i++) { 
            this.animations.push([]);
            for (var j = 0; j < 4; j++) { // directions
                this.animations[i].push([]);
            }
        }

        // right
        this.animations[0][0] = new Animator(this.spritesheetMage, 630, 335, 60, 52, 8, 0.20, 84, false, true);
        // left
        this.animations[0][1] = new Animator(this.spritesheetMage, 613, 190, 60, 52, 8, 0.20, 84, false, true);
        // up
        this.animations[0][2] = new Animator(this.spritesheetMage, 629, 1055, 60, 52, 1, 0.20, 84, false, true);
        // dead down
        this.animations[1][3] = new Animator(this.spritesheetMage, 1765, 630, 70, 52, 1, 0.10, 0, false, true);
        // shoot
        // this.animations[1][2] = new Animator(this.spritesheetMage, 1205, 1051, 60, 52, 4, 0.2, 84, false, true);

        this.shootAnim = new Animator(this.spritesheetMage, 1205, 1051, 60, 52, 4, 0.05, 84, false, true);

        


    };
    updateBB() {
        this.lastBB = this.BB;
        this.BB = new BoundingBox(this.x, this.y, PARAMS.BLOCKWIDTH, PARAMS.BLOCKHEIGHT);
        
    };
    
    update() {
        this.elapsedTime += this.game.clockTick;
        const TICK = this.game.clockTick;
        
        const ACC_RUN = 153;


        const MAX_FALL = 270;

        // if (this.dead) {
        //     this.velocity.y += RUN_FALL * TICK;
        //     this.y += this.velocity.y * TICK * PARAMS.SCALE;
        // } else {
            // update velocity
            
            this.velocity.y += this.fallAcc * TICK;
            if(this.shoot){
                this.velocity.x = 0;
                if(this.elapsedTime > 0.3 && this.shootAnim.isAlmostDone(TICK)){
                    this.game.addEntityToBegin(new Projectile(this.game, this.x, this.y));
                    this.elapsedTime = 0;
                    this.shoot = false;
                }
                
            }
             else {        
                    if (this.game.left) {
                        this.facing = 1;
                        this.velocity.x -= ACC_RUN;
                    }
                    if (this.game.right) {
                        this.facing = 0;
                        this.velocity.x += ACC_RUN;
                    }  
                    if(!this.game.left && !this.game.right){
                        this.velocity.x = 0;
                    }     
                if(this.game.E){
                    this.shoot = true;
                 }
            }
            if (this.velocity.y >= MAX_FALL) this.velocity.y = MAX_FALL;
            if (this.velocity.y <= -200) this.velocity.y = -200;

            if (this.velocity.x >= ACC_RUN) this.velocity.x = ACC_RUN;
            if (this.velocity.x <= -ACC_RUN) this.velocity.x = -ACC_RUN;
            
            // update position
            this.x += this.velocity.x * TICK * PARAMS.SCALE;
            this.y += this.velocity.y * TICK * PARAMS.SCALE;
            this.updateBB();

            var that = this;
            this.game.entities.forEach(function (entity) {
                if (entity.BB && that.BB.collide(entity.BB)) {
                    if (that.velocity.y > 0) { // falling
                        if ((entity instanceof Ground) && (that.lastBB.bottom) >= entity.BB.top) {
                            that.playerJump = true;
                            that.y = entity.BB.top - PARAMS.BLOCKHEIGHT;
                            that.velocity.y === 0;
                            }
                            that.updateBB();
                        }
                    }
                });

                if(this.velocity.x === 0){
                    this.state = 0;
                    this.facing = 2;
                }
                else if(this.velocity.x < 0){
                    this.facing = 1;
                }
                else if(this.velocity.x > 0){
                    this.facing = 0;
                }
                else{
                    this.state = 0;
                }
            // } else {
            //     this.state = 1;
            //     this.facing = 2;
            // }
            if(this.x < -20){
                this.x = -20;
            }
            if(this.x >= 750){
                this.x = 750;
            }
            if(this.y <= 0){
                this.y = 0;
            }
            // update direction
            if (this.velocity.x < 0) this.facing = 1;
            if (this.velocity.x > 0) this.facing = 0;
            
            
    };

    draw(ctx) {
        if(this.shoot){
            // this.animations[1][2].drawFrame(this.game.clockTick, ctx, this.x , this.y, PARAMS.SCALE);
            this.shootAnim.drawFrame(this.game.clockTick, ctx, this.x , this.y, PARAMS.SCALE);
        }
         else {
            this.animations[this.state][this.facing].drawFrame(this.game.clockTick, ctx, this.x , this.y, PARAMS.SCALE);
        }
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.BB.x, this.BB.y, this.BB.width, this.BB.height);
    };


}