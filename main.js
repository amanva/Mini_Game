var assetMangager = new AssetManager();

assetMangager.queueDownload("./knightright.png");
assetMangager.queueDownload("./knightsleft.png");
assetMangager.queueDownload("./layer-5.png");
assetMangager.queueDownload("./Fruit.png");
assetMangager.queueDownload("./wizard.png");
assetMangager.queueDownload("./mageBall.png");
assetMangager.queueDownload("./background.png");

assetMangager.downloadAll(() => {
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
ctx.imageSmoothingEnabled = false;
var gameEngine = new GameEngine();
PARAMS.BLOCKWIDTH = PARAMS.BITWIDTH * PARAMS.SCALE;
PARAMS.BLOCKHEIGHT = PARAMS.BITHEIGHT * PARAMS.SCALE;
PARAMS.CANVAS_WIDTH = canvas.width;
PARAMS.CANVAS_HEIGHT = canvas.height;
// gameEngine.addEntity(new MegaMan(gameEngine, 50, 100));

gameEngine.init(ctx);
gameEngine.addEntity(new SceneManager(gameEngine));
gameEngine.start();

});