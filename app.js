// Pixi is loaded by the <script> tag in index.html as the global `PIXI`,
// so we use PIXI.Application instead of `import { Application } from "pixi.js"`
const app = new PIXI.Application({
    width:500,
    height:500,
    transparent : false,
    antialias : true,
    resizeTo : window   // canvas follows the browser window size, also when you resize it
});

app.renderer.backgroundColor = 0x23395D;
app.renderer.resize(window.innerWidth, window.innerHeight);
app.renderer.view.style.position = "absolute";

document.body.appendChild(app.view);
 
const Graphices = PIXI.Graphics; 
const rectangle = new Graphices();
rectangle.beginFill(0xAA33BB)
.lineStyle(4, 0xffEA00,1)
.drawRect(200, 200, 100, 120)
.endFill();

// nothing shows up until it is added to the stage
app.stage.addChild(rectangle);
 
const poly = new Graphices();
poly.beginFill(0xFF66FF)
.lineStyle(5, 0xFF0000, 1)
.drawPolygon([
  600, 50,
  800, 150,
  900, 300,
  400, 400
])
.endFill();

const circle = new Graphices();
circle.beginFill(0x22AACC)
.lineStyle(4, 0xffd900, 1)
.drawCircle(440, 200, 80)
.endFill();

app.stage.addChild(circle);
app.stage.addChild(poly);

const line = new Graphices();
line.lineStyle(5, 0xFFEA00, 1)
.moveTo(1500, 100)
.lineTo(100, 800)

app.stage.addChild(line);

const torus = new Graphices();
torus.beginFill(0xFFFDDD)
.drawTorus(100, app.screen.height - 120, 80, 100 , 0 , Math.PI * 2)  // y is measured from the canvas height so it always stays on screen
.endFill();

app.stage.addChild(torus);
 

const start = new Graphices();
start.beginFill(0xFF0000)
.drawStar(800, app.screen.height - 120, 5, 80)
.endFill();

app.stage.addChild(start);

const style = new PIXI.TextStyle({
    fontFamily: 'Montserrat',
    fontSize: 36,
    fill : 'deepskyblue',
    stroke: '#ffffff',
    strokeThickness: 6,
    dropShadow: true,
    dropShadowDistance:10,
    dropShadowAngle: Math.PI / 2,
    dropShadowBlur: 4,
    dropShadowColor: '#000000'
})

const myText = new PIXI.Text('Hello World !', style);   // capital T: class names in Pixi always start with a capital letter
app.stage.addChild(myText);

myText.text ="text changed";

myText.style.wordWrap=true;
myText.style.wordWrapWidth=100;
myText.style.align="center";

app.ticker.add(delta => loop(delta));   // runs loop() once per frame (about 60 times a second)

function loop (delta) {
//    char1Sprite.x +=1;
char1Sprite.rotation += 0.01 * delta;   // rotation is in radians, so this is about 1 degree per frame


}

const char1Texture = PIXI.Texture.from('./images/char1.png');
const char1Sprite = new PIXI.Sprite(char1Texture);
app.stage.addChild(char1Sprite);

// char1Sprite.width=500;
// char1Sprite.height=500;
 
// char1Sprite.scale.x = 1.5;
// char1Sprite.scale.y = 2;

// char1Sprite.scale.set(2, 2);   // same as the two lines above

char1Sprite.position.set(800,400);

// char1Sprite.anchor.x=0.5;
// char1Sprite.anchor.y=0.5; 
  // set the anchor point to the center of the sprite (default is top left corner)

  char1Sprite.anchor.set(0.5, 0.5); 
  char1Sprite.buttonMode = true;   // cursor changes to a hand when hovering over the sprite
  char1Sprite.interactive = true;   // sprite can now be clicked on
char1Sprite.on('pointerdown', () => {
    console.log("sprite clicked");
    char1Sprite.scale.x +=0.1;
    char1Sprite.scale.y +=0.1;
}
);

document.addEventListener('keydown', function(e) {
    if(e.key === 'ArrowRight') {
        char1Sprite.x += 10;
    }
    if(e.key === 'ArrowLeft') {
        char1Sprite.x -= 10;
    }
    });

const container = new PIXI.Container();

const char2Sprite = new PIXI.Sprite(PIXI.Texture.from('./images/char2.png'));
container.addChild(char2Sprite);

const char3Sprite = new PIXI.Sprite(PIXI.Texture.from('./images/char3.png'));
container.addChild(char3Sprite);

app.stage.addChild(container);

// Children use coordinates RELATIVE to the container, not to the screen.
// (0,0) is the container's own top-left corner.
char2Sprite.position.set(0, 0);
char3Sprite.position.set(300, 0);   // 300px to the right of char2, same row

// Position the container once and both sprites move together.
// Try changing these numbers, or add  container.scale.set(0.5)  to shrink the whole group.
container.position.set(app.screen.width - 600, 40);

container.x = 200;

console.log(char3Sprite.x);
console.log(char3Sprite.getGlobalPosition());
console.log(container.children); // getGlobalPosition() returns the sprite's position relative to the whole canvas, not just its container

const particleContainer = new PIXI.ParticleContainer(1000, {   // capital P and C, and it is "Particle"
    position: true,
    rotation: true,
    vertices: true,
    tint: true,
    uvs: true
});

// ---- Loading images with the Loader (Pixi v6) ----
// Add everything you need, give each one a name, then call load() ONCE.
// setup() runs after ALL files have finished downloading.
// 

// Loader.add('tileset' , './images/spritesheet.json')
// .load(setup);

// function setup(loader, resources) {
//     const drag11TExture = PIXI.Texture.from('drag11.png');   // the name of the image in the spritesheet, not the filename
//     const drag11Sprite = new PIXI.Sprite(drag11TExture);
//     drag11Sprite.position.set(800, 300);
//     drag11Sprite.scale.set(2,2);
//     app.stage.addChild(drag11Sprite);
// }

Loader.add('tileset' , './images/spritesheet.json')
.load(setup);

function setup(loader, resources) {
    const textures = [];
    for(let i=1; i<=13; i++) {
        const textures = [];
        for(let i =1 ; i<13 ; i++) {
            const texture = PIXI.Texture.from('drag${i}.png');
            textures.push(texture);
        }
        const drag = new PIXI.AnimatedSprite(textures);
         drag11Sprite.position.set(800, 300);
        drag11Sprite.scale.set(2,2);
        app.stage.addChild(drag);
        drag.play();
        drag.animationSpeed = 0.1;
    }
}

const cloudsTexture = PIXI.Texture.from('./images/clouds.png');
const cloudsSprite = new PIXI.TilingSprite(cloudsTexture
    , app.screen.width,
    app.screen.height,
);

cloudsSprite.tileScale.set(0.5, 0.5);   // shrink the image to half size 
app.ticker.add(function(){
    cloudsSprite.tilePosition.x -= 1;   // move the image to the left by 1 pixel every frame
});
app.stage.addChild(cloudsSprite);

const sound = new  Howl({
    src:['./sound/pelimussa.mp3'],
})
sound.play();