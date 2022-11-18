class MegaMan {

    constructor(game){
        this.game = game;
        this.animator = new Animator(assetMangager.getAsset("./megamanfull.png"), 0, 0, 50, 51, 8, 0.15,0);
        this.x = 0;
        this.y = 0;
        this.speed = 500;
    };

    update() {
        // this.x += this.speed * this.game.clockTick;
        // if(this.x > 1200){
        //     this.x = 0;
        // }

    };


    draw(ctx) {
        this.animator.drawFrame(this.game.clockTick, ctx, this.x, this.y);

    };


}