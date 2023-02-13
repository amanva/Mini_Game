class SceneManager {
    constructor(game) {
        this.game = game;
        this.game.camera = this;
        this.score = 0;
        this.x = 0;
        this.title = true;
        this.elapsedTime = 0;
        // this.game.addEntity(new Projectile(this.game, 100, 100));
        
        
    };


    update() {
        // console.log(this.game.entities);
        this.elapsedTime += this.game.clockTick;
        if(this.title){
            if(this.game.click){
                
                this.title = false;
                this.game.addEntity(new Mage(this.game, 400, 550));
                this.game.addEntity(new Ground(this.game, 0, 650, 1400, 50));
                this.game.addEntity(new BackGround(this.game, 0, 0, 800, 700));
                // this.game.removeSpecEntity();
            }
        }
        else if(!this.title){
            this.levelOne();
        }
    };
    levelOne(){
        if(this.elapsedTime > 1){
            this.randX = Math.random() * (700 - 5) + 5;
            this.randY = Math.random() * (50 + 200) - 100;
            this.game.addEntityToBegin(new Fruit(this.game, this.randX, -50, 100));
            this.elapsedTime = 0;
        }
    };
    addScore(){
        this.score++;
    }

    draw(ctx) {
        if(this.title){
            ctx.drawImage(assetMangager.getAsset("./title.png"), 0, 0, 800, 700);
        }
        ctx.fillStyle = "White";
        ctx.font = "30px Arial";
        ctx.fillText(("Score:" + this.score), 0, 30);      
        // console.log(this.score);
};

};