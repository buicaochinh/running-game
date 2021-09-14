// constants
const ROAD_END_POINT = 1200;
const CANVAS_HEIGHT = 750;
const CANVAS_WIDTH = 1250;

const Screen = {
    START: 'start',
    ROOM: 'room',
    RUN: 'run'
}

// game objects
let app;
let player;
let competitor;

// screen
let startScreen;
let roomScreen;
let runScreen;

let currentScreen = Screen.ROOM;


let runScreenManager = {
    backButton: null,
    backGround: null,
    playerEnemies: [],
    competitorEnemies: [],

    createEnemies() {
        this.playerEnemies = randomEnemies();
        this.competitorEnemies = randomEnemies();
    },

    createBackground(texture) {
        let tiling = new PIXI.TilingSprite(texture, 1250, 750);
        tiling.position.set(0, 0);
        runScreen.addChild(tiling);
        this.backGround = tiling;
    },

    drawBackButton() {
        const backButton = new PIXI.Graphics();
        const backText = new PIXI.Text("Back");
        backButton.beginFill(0xeb9634)
        backButton.drawRect(0, 0, 100, 50);
        backButton.endFill()
        backButton.position.set(20, 20);
        backText.anchor.set(0.5);
        backText.position.set(50, 25);

        backButton.interactive = true;
        backButton.buttonMode = true;
        backButton.on('pointerup', () => changeScreen(Screen.ROOM))
        // add to screen
        backButton.addChild(backText)
        runScreen.addChild(backButton)
        this.backButton = backButton;
    },

    drawEnermies() {
        for (i = 0; i < 6; i++) {
            renderEnemy(this.playerEnemies[i].id, this.playerEnemies[i].pos, runScreen.height / 2 + 64)
            renderEnemy(this.competitorEnemies[i].id, this.competitorEnemies[i].pos, runScreen.height / 2 - 64)
        }
    },

    status() {
        console.log(this)
    }
}

let startScreenManager = {
    playButton: null,
    backGround: null,
    createBackground(texture) {
        let tiling = new PIXI.TilingSprite(texture, app.screen.width, app.screen.height)
        tiling.position.set(0, 0)
        tiling.tint = '0x555555'
        startScreen.addChild(tiling);
        this.backGround = tiling
    },

    drawPlayButton() {
        const playButton = new PIXI.Graphics();
        playButton.beginFill(0x34b7eb)
        playButton.drawRect(0, 0, 200, 50)
        playButton.endFill()
        playButton.position.set(3 * app.screen.width / 4, app.screen.height / 2 - 100)

        const playText = new PIXI.Text("Play");
        playText.anchor.set(0.5);
        playText.position.set(100, 25);
        playButton.addChild(playText);

        playButton.interactive = true;
        playButton.buttonMode = true;

        playButton.on('pointerup', () => changeScreen(Screen.ROOM))
            startScreen.addChild(playButton);
    }
}

let roomScreenManager = {
    backButton: null,
    backGround: null,
    drawBackButton() {
        const backButton = new PIXI.Graphics();
        const backText = new PIXI.Text("Back");
        backButton.beginFill(0xeb9634)
        backButton.drawRect(0, 0, 100, 50);
        backButton.endFill()
        backButton.position.set(20, 20);
        backText.anchor.set(0.5);
        backText.position.set(50, 25);

        backButton.interactive = true;
        backButton.buttonMode = true;
        backButton.on('pointerup', () => changeScreen(Screen.START))
        // add to screen
        backButton.addChild(backText)
        roomScreen.addChild(backButton)
        this.backButton = backButton;
    },

    createBackground(texture) {
        let tiling = new PIXI.TilingSprite(texture, app.screen.width, app.screen.height)
        tiling.position.set(0, 0);
        tiling.tileScale.set(0.125, 0.125);
        roomScreen.addChild(tiling);
        this.backGround = tiling;
    },

    drawARoom() {
        const room = new PIXI.Graphics()
        room.beginFill(0x555555)
        room.drawRect(0, 0, 200, 200);
        room.endFill()
        room.position.set(25, 100);
        roomScreen.addChild(room);
        const textures = []
        for (let i = 1; i <= 8; i++) textures.push(PIXI.Texture.from(`../assets/cat/Run (${i}).png`))
        let roomInfo = new PIXI.AnimatedSprite(textures)
        let param = {
            sprite: roomInfo,
            firstX: room.width / 2,
            firstY: room.height / 2,
            width: 128,
            height: 128,
            anchor: 0.5,
            speed: 0.2
        }
        settingSprite(param)
        room.addChild(roomInfo)

        room.interactive = true;
        room.buttonMode = true;

        room.on('pointerup', () => changeScreen(Screen.RUN))
    },

    status() {
        console.log(this)
    }
}

function changeScreen(screen) {
    currentScreen = screen;
    switch (currentScreen) {
        case Screen.START:
            startScreen.visible = true;
            roomScreen.visible = false;
            runScreen.visible = false;
            break;
        case Screen.ROOM:
            startScreen.visible = false;
            roomScreen.visible = true;
            runScreen.visible = false;
            break;
        case Screen.RUN:
            startScreen.visible = false;
            roomScreen.visible = false;
            runScreen.visible = true;
            break;
        default:
            startScreen.visible = true;
            roomScreen.visible = false;
            runScreen.visible = false;
    }
}

window.onload = () => {
    app = new PIXI.Application({
        width: CANVAS_WIDTH,
        height: CANVAS_HEIGHT,
    });
    document.getElementById("game-frame").appendChild(app.view)

    startScreen = new PIXI.Container();
    roomScreen = new PIXI.Container();
    runScreen = new PIXI.Container();

    app.stage.addChild(startScreen);
    app.stage.addChild(roomScreen);
    app.stage.addChild(runScreen);

    app.loader.baseUrl = 'assets'
    app.loader
        .add('runBackground', 'map.png')
        .add('roomBackground', 'roomBg.png')
    app.loader.onComplete.add(initRunGame)
    app.loader.load()

    changeScreen(currentScreen)

    // random enemies
    runScreenManager.createEnemies();

    function gameLoop() {
        let v1 = 2;
        let v2 = 2;
        if (player.ready === true && competitor.ready === true) {
            competitor.x += competitor.x >= ROAD_END_POINT ? 0 : v1;
            player.x += player.x >= ROAD_END_POINT ? 0 : v2;
            if (competitor.x >= ROAD_END_POINT) competitor.stop();
            if (player.x >= ROAD_END_POINT) player.stop();
        }
    }

    function initRunGame() {
        createStartScreen();
        createRoomScreen();
        createRunScreen();
    }

    function createStartScreen() {
        startScreenManager.createBackground(PIXI.Texture.WHITE)
        startScreenManager.drawPlayButton()
    }

    function createRoomScreen() {
        roomScreenManager.createBackground(app.loader.resources['roomBackground'].texture)
        roomScreenManager.drawBackButton()
        roomScreenManager.drawARoom()
    }

    function createRunScreen() {
        runScreenManager.createBackground(app.loader.resources['runBackground'].texture)
        runScreenManager.drawBackButton();
        competitor = loadCat();
        player = loadDog();
        runScreenManager.drawEnermies();
        runScreenManager.status();
        app.ticker.add(gameLoop)
    }
}
