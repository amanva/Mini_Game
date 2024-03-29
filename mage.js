class Mage {

    constructor(game, x, y){
        Object.assign(this, { game, x, y });
        this.game.knight = this;
        this.velocity = { x: 0, y: 0 };
        this.spritesheetMage = assetMangager.getAsset("./wizard.png");
        // this.animator = new Animator(assetMangager.getAsset("./megamanfull.png"), 0, 0, 49, 49, 8, 0.10, 0);
        this.speed = 300;
        this.fallAcc = 200;
        this.facing = 0; 
        this.state = 0;
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
        this.animations[0][0] = new Animator(this.spritesheetMage, 630, 335, 60, 52, 8, 0.20, 84, false, true, false);
        // left
        this.animations[0][1] = new Animator(this.spritesheetMage, 613, 190, 60, 52, 8, 0.20, 84, false, true, false);
        // up
        this.animations[0][2] = new Animator(this.spritesheetMage, 629, 1055, 60, 52, 1, 0.20, 84, false, true, false);
        // dead down
        this.animations[1][3] = new Animator(this.spritesheetMage, 1765, 630, 70, 52, 1, 0.10, 0, false, true, false);
        // shoot
        // this.animations[1][2] = new Animator(this.spritesheetMage, 1205, 1051, 60, 52, 4, 0.2, 84, false, true);

        this.shootAnim = new Animator(this.spritesheetMage, 1205, 1051, 60, 52, 4, 0.05, 84, false, true, false);

        


    };
    updateBB() {
        this.lastBB = this.BB;
        this.BB = new BoundingBox(this.x, this.y, PARAMS.BLOCKWIDTH, PARAMS.BLOCKHEIGHT);
        
    };
    
    update() {
        this.elapsedTime += this.game.clockTick;
        const TICK = this.game.clockTick;
        
        const ACC_RUN = 200;

        // if (this.dead) {
        //     this.velocity.y += RUN_FALL * TICK;
        //     this.y += this.velocity.y * TICK * PARAMS.SCALE;
        // } else {
            // update velocity
            
            this.velocity.y += this.fallAcc * TICK;
            if(this.shoot){
                this.velocity.x = 0;
                if(this.elapsedTime > 0.2 && this.shootAnim.isAlmostDone(TICK)){
                    this.game.addEntityToBegin(new Projectile(this.game, this.x+15, this.y));
                    this.elapsedTime = 0;
                    this.shoot = false;
                    this.game.attack = false;
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
                if(this.game.attack){
                    this.shoot = true;
                 }
            }

            if (this.velocity.x >= ACC_RUN) this.velocity.x = ACC_RUN;
            if (this.velocity.x <= -ACC_RUN) this.velocity.x = -ACC_RUN;
            // this.updateBB();
            // update position
            this.x += this.velocity.x * TICK * PARAMS.SCALE;
            this.y += this.velocity.y * TICK * PARAMS.SCALE;
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
            if(this.x < -20){
                this.x = -20;
            }
            if(this.x >= 750){
                this.x = 750;
            }
            if(this.y >= 600){
                this.y = 600;
            }
            // console.log(this.y);
            // update direction
            if (this.velocity.x < 0) this.facing = 1;
            if (this.velocity.x > 0) this.facing = 0;
            // console.log(this.BB.x + " " + this.BB.y);
            if(this.game.camera.lose){
                this.removeFromWorld = true;
            }
            
    };

    draw(ctx) {
        if(this.shoot){
            // this.animations[1][2].drawFrame(this.game.clockTick, ctx, this.x , this.y, PARAMS.SCALE);
            this.shootAnim.drawFrame(this.game.clockTick, ctx, this.x , this.y, PARAMS.SCALE);
        }
         else {
            this.animations[this.state][this.facing].drawFrame(this.game.clockTick, ctx, this.x , this.y, PARAMS.SCALE);
        }
            // ctx.strokeStyle = 'Red';
            // ctx.strokeRect(this.BB.x, this.BB.y, this.BB.width, this.BB.height);
    };


}