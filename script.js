/** @type {HTMLCanvasElement} */

const canvas = document.getElementById('myCanvas2');
const ctx = canvas.getContext('2d');
CANVAS_WIDTH = canvas.width = 500;
CANVAS_HEIGHT = canvas.height = 800;
const enemyArray = [];
let gFrame = 0;
// ene = {
//     x: 10,
//     y: 50,
//     width: 200,
//     height: 200,
// }
class Enemy {
    constructor(){
        this.image = new Image();
        this.image.src = 'enemy2.png';
        this.speed = Math.random() * 4 + 1;
        this.spriteWidth = 266;
        this.spriteHeight = 188;
        this.width = this.spriteWidth/2.5;
        this.height = this.spriteHeight/2.5;
        this.x = Math.random() * (canvas.width - this.width);
        this.y = Math.random() * (canvas.height - this.height);
        this.frame = 0;
        this.flapspeed = Math.floor(Math.random() * 3 + 1);
        this.angle = 0;
        this.angleSpeed = Math.random() * 2 + 0.5;
        this.curve = Math.random() * 200 + 50;




        
    }
    update(){
        this.x = this.curve * Math.sin(this.angle * Math.PI/100) + (canvas.
        width/2 - this.width/2);
            
        this.y = this.curve * Math.cos(this.angle * Math.PI/180)+ (canvas.
        height/2 - this.height/2);
        if(this.x + this.width < 0){
            this.x = canvas.width;
        }
        this.angle += this.angleSpeed;
        if(gFrame % this.flapspeed === 0){
        this.frame > 4 ? this.frame = 0 : this.frame++;
        }
    }
    draw(){
        ctx.drawImage(this.image, this.frame * this.spriteWidth, 0, this.spriteWidth, 
        this.spriteHeight, this.x, this.y, this.width, this.height);

    }
};

for(let i = 0; i < 10; i++){
    enemyArray.push(new Enemy());
}
const ene = new Enemy();
function animate(){
    ctx.clearRect(0,0,CANVAS_WIDTH, CANVAS_HEIGHT);
    ene.x++;
    ene.y++;
    enemyArray.forEach(enemy => {
        enemy.update();
        enemy.draw();
    }); 
    gFrame++;
    requestAnimationFrame(animate);
}
animate();