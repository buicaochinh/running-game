console.clear();
// Create PIXI app
const app = new PIXI.Application({
    width: CANVAS_WIDTH,
    height: CANVAS_HEIGHT,
    backgroundColor: BACKGROUND_COLOR
});
document.body.appendChild(app.view)

//load sprite
const cat = loadCat();
const dog = loadDog();

// Draw line
const line = new PIXI.Graphics();
line.lineStyle(1, 0x000000, 1).moveTo(1400, 100).lineTo(1400, 800);
app.stage.addChild(line);

let v1 = 2;
let v2 = 3;

let firstRoad = randomEnemies();
let secondRoad = randomEnemies();

app.ticker.add((delta) => {
    cat.x += cat.x >= ROAD_END_POINT ? 0 : v1 * delta;
    dog.x += dog.x >= ROAD_END_POINT ? 0 : v2 * delta;
    if (cat.x >= ROAD_END_POINT) cat.stop();
    if (dog.x >= ROAD_END_POINT) dog.stop();
})

// Create a new texture
