const settingSprite = ({ sprite, firstX, firstY, width, height, anchor, speed }) => {
    sprite.position.set(firstX, firstY);
    sprite.width = width;
    sprite.height = height;
    sprite.anchor.set(anchor);
    runScreen.addChild(sprite);
    sprite.play()
    sprite.animationSpeed = speed;
    sprite.ready = false;
}

const loadCat = () => {
    const textures = []
    for (let i = 1; i <= 8; i++) textures.push(PIXI.Texture.from(`../assets/cat/Run (${i}).png`))
    let cat = new PIXI.AnimatedSprite(textures)
    let param = {
        sprite: cat,
        firstX: 50,
        firstY: app.screen.height / 2 - 64,
        width: 64,
        height: 64,
        anchor: 0.5,
        speed: 0.2
    }
    settingSprite(param)
    return cat;
}

const loadDog = () => {
    const textures = []
    for (let i = 1; i <= 8; i++) textures.push(PIXI.Texture.from(`../assets/dog/Run (${i}).png`))
    let dog = new PIXI.AnimatedSprite(textures)
    let param = {
        sprite: dog,
        firstX: 50,
        firstY: app.screen.height / 2 + 64,
        width: 64,
        height: 64,
        anchor: 0.5,
        speed: 0.2
    }
    settingSprite(param)
    return dog;
}
