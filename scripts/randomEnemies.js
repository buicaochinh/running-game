const randomEnemies = () => {
    const roadEnemies = []
    for (let i = 0; i < 6; i++) {
        roadEnemies.push({
            id: Math.floor((Math.floor(Math.random() * 1024) * Math.random()) % 6),
            pos: 300 + i*150
        })
    }
    return roadEnemies
}

const renderEnemy = (id, posX, posY) => {
    const enemy = new PIXI.Sprite(PIXI.Texture.WHITE)
    enemy.anchor.set(0.5)
    enemy.position.set(posX, posY)
    enemy.tint = '0x000000'
    runScreen.addChild(enemy)
}
