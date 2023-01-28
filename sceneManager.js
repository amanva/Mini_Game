class SceneManager {
    constructor(game) {
        this.game = game;
        this.game.camera = this;
        this.score = 0;
        this.x = 0;
        this.elapsedTime = 0;
        this.mage = new Mage(this.game, 50, 550); 
        this.game.addEntity(this.mage);
        // this.game.addEntity(new Projectile(this.game, 100, 100));
        this.game.addEntity(new Ground(this.game, 0, 650, 1400, 50));
        this.game.addEntity(new BackGround(this.game, 0, 0, 800, 700));
        
    };



    update() {
        // PARAMS.DEBUG = document.getElementById("debug").checked;
        // let midpoint = PARAMS.CANVAS_WIDTH/2 - PARAMS.BLOCKWIDTH/2;

        // this.x = this.knight.x - midpoint;
        this.elapsedTime += this.game.clockTick;

        if(this.elapsedTime > 2){
        this.randX = Math.random() * (700 - 5) + 5;
        this.randY = Math.random() * (50 + 200) - 100;
        this.game.addEntityToBegin(new Fruit(this.game, this.randX, -50));
        this.elapsedTime = 0;
        }
    };

    // addCoin() {
    //     if (this.coins++ === 100) {
    //         this.coins = 0;
    //         this.lives++;
    //     }
    // };
    addScore(){
        this.score++;
    }

    draw(ctx) {
        ctx.fillStyle = "White";
        ctx.font = "30px Arial";
        ctx.fillText(("Score:" + this.score), 0, 30);      
        // console.log(this.score);
};

};