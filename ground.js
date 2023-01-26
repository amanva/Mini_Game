class Ground {
    constructor(game, x, y, w, h) {
        Object.assign(this, { game, x, y, w, h});

        this.spritesheet = assetMangager.getAsset("./layer-5.png");

        this.BB = new BoundingBox(this.x+60, this.y, this.w, this.h);
        // this.leftBB = new BoundingBox(this.x, this.y, PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH * 2)
        // this.rightBB = new BoundingBox(this.x + this.w - PARAMS.BLOCKWIDTH, this.y, PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH * 2)
    };

    update() {
    };
    draw(ctx) {
        ctx.drawImage(this.spritesheet,this.x ,this.y, this.w, this.h);
        ctx.strokeStyle = 'Red';
        ctx.strokeRect(this.BB.x, this.BB.y, this.BB.width, this.BB.height);
    };
};


class BackGround {
    constructor(game, x, y, w, h) {
        Object.assign(this, { game, x, y, w, h});

        this.spritesheet = assetMangager.getAsset("./background.png");


    };

    update() {
    };
    draw(ctx) {
        ctx.drawImage(this.spritesheet,this.x ,this.y, this.w, this.h);
    };
};
