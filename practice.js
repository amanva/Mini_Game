const gameEngine = new GameEngine();
const assetMangager = new AssetManager();

assetMangager.queueDownload("./megamanfull.png");

assetMangager.downloadAll(() => {
const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
ctx.imageSmoothingEnabled = false;
gameEngine.addEntity(new MegaMan(gameEngine));

gameEngine.init(ctx);
gameEngine.start();

});