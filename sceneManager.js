class SceneManager {
    constructor(game) {
        this.game = game;
        this.game.camera = this;
        this.score = 0;
        this.x = 0;
        this.title = true;
        this.elapsedTime = 0;
        this.lives = 3;
        this.once = 0;
        this.lose = false;

    };
    update() {
        this.lose = (this.lives <= 0);
        // console.log(this.game.entities);
        if(this.game.R){
            this.once = 0;
            this.lose = false;
        }
        
        if(!this.lose){
        this.elapsedTime += this.game.clockTick;
        if(this.title){
            if(this.game.click){
                this.game.click = false;
                this.title = false;
                // this.game.removeSpecEntity();
            }
        }
        else if((!this.title)){
            if(this.once === 0){
                this.game.removeEntities();
                this.lives = 3;
                this.score = 0;
                this.game.addEntity(new Mage(this.game, 400, 550));
                this.game.addEntity(new Ground(this.game, 0, 650, 1400, 50));
                this.game.addEntity(new BackGround(this.game, 0, 0, 800, 700));
                this.once++;
            }
            if(this.score <= 50){
            this.levelOne();
            }
            else if(this.score >= 50){
                this.levelTwo();
            }
        }
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
    levelTwo(){
        if(this.elapsedTime > 0.7){
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
        ctx.fillStyle = "White";
        ctx.font = "30px Arial";
        ctx.fillText(("Score:" + this.score), 0, 30);
        ctx.fillText(("Lives:" + this.lives), 700, 30);
        if(this.title){
            ctx.drawImage(assetMangager.getAsset("./title.png"), 0, 0, 800, 700);
        }
        ctx.font = "50px Arial";
        if(this.lose){
            ctx.fillText(("Score:" + this.score), 320, 600);
            ctx.fillText("GAME OVER!", 250, 350);
            ctx.fillText("Press R to restart", 220, 420);
        }
        // console.log(this.score);
};

};