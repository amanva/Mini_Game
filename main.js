var assetMangager = new AssetManager();
var gameEngine = new GameEngine();
// var scene_Manager = new SceneManager(gameEngine);
assetMangager.queueDownload("./cursor.png");
assetMangager.queueDownload("./layer-5.png");
assetMangager.queueDownload("./Fruit.png");
assetMangager.queueDownload("./wizard.png");
assetMangager.queueDownload("./mageBall.png");
assetMangager.queueDownload("./background.png");
assetMangager.queueDownload("./explode.png");
assetMangager.queueDownload("./explode2.png");
assetMangager.queueDownload("./title.png");

assetMangager.queueDownload("./back.wav");
assetMangager.queueDownload("./splat.mp3");

assetMangager.downloadAll(() => {
assetMangager.autoRepeat("./back.wav");
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
ctx.imageSmoothingEnabled = false;
PARAMS.BLOCKWIDTH = PARAMS.BITWIDTH * PARAMS.SCALE;
PARAMS.BLOCKHEIGHT = PARAMS.BITHEIGHT * PARAMS.SCALE;
PARAMS.CANVAS_WIDTH = canvas.width;
PARAMS.CANVAS_HEIGHT = canvas.height;

gameEngine.init(ctx);
new SceneManager(gameEngine);
gameEngine.start();

});