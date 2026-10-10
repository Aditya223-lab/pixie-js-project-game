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

